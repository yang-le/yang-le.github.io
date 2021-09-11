@[TOC]
# 网络设备驱动
上一篇分析的loopback是所谓的"伪设备"，即它不对应真实世界中的硬件，而只是一种软件抽象。今天我们来看一个真实硬件设备的驱动程序，它就是Intel 8255x 10/100 Mbps网卡，对应的内核文件是`drivers/net/ethernet/intel/e100.c`。
## e100
8255x是一系列网卡的统称，包括82557, 82558, 82559, 82550,82551。以82557为例，其硬件模块图如下所示
![82557硬件模块图](https://img-blog.csdnimg.cn/20190424144000257.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3MTUyNA==,size_16,color_FFFFFF,t_70)
可以看到，该型网卡主要由三部分组成：
- MAC, 即图中标有82557的部分，是核心部件
- PHY, 即物理层接口设备，与核心部件之间以 MII 连接
- EEPROM, 用来存储相关节点地址和 PCI 配置参数等信息
### PCI接口
来到代码的最末，可以看到模块的初始化函数中只是简单的进行了PCI驱动信息的注册。
在`pci_driver`结构中，最重要的两个成员分别是`id_table`和`probe`。前者列出了设备支持的PCI标识信息，后者为当系统发现有匹配的PCI设备插入时所调用的函数。
`id_table`中包含以下成员:`vendor`, `device`, `subvendor`, `subdevice`, `class`, `class_mask`, `driver_data`。对于Intel的这款网卡来说，`vendor`为`0x8086`表示Intel，`class`为`0x0200`表示以太网设备。代码中定义了宏
```c
#define INTEL_8255X_ETHERNET_DEVICE(device_id, ich) {\
	PCI_VENDOR_ID_INTEL, device_id, PCI_ANY_ID, PCI_ANY_ID, \
	PCI_CLASS_NETWORK_ETHERNET << 8, 0xFFFF00, ich }
```
来辅助`id_table`信息的填充。从代码可以看到，在这个表里注册的设备可真多呀[^1]。可不要忘了使用`MODULE_DEVICE_TABLE()`导出我们的设备列表。

在`probe`函数中，除了之前说过的对`net_device`结构的填充之外，还要进行PCI相关的初始化操作，关于这部分，可参考内核文档[^2]。主要的API包括:
- `pci_enable_device()` / `pci_disable_device()`
- `pci_request_regions()` / `pci_release_region()`
- `pci_set_dma_mask()`
- `pci_iomap()` / `pci_iounmap()`

说到`pci_iomap()`，就不得不提及PCI配置空间。每个PCI设备都至少有256字节的地址空间,其中前64字节是标准化的，我们现在就来看一下这块网卡的配置空间的情况。
![PCI配置空间](https://img-blog.csdnimg.cn/20190424164259369.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3MTUyNA==,size_16,color_FFFFFF,t_70)
为什么说`pci_iomap()`跟这个配置空间有关呢。注意图中用红框框起来的部分，那就是所谓的基地址，共有6个，官方名称为`PCI_BASE_ADDREESS_0`到`PCI_BASE_ADDREESS_5`。而
```c
extern void __iomem *pci_iomap(struct pci_dev *dev, int bar, unsigned long max);
```
`pci_iomap()`这个函数的第二个参数`bar`，指的就是要将这6个地址中的哪一个映射出来。注意代码中当`use_io`这个参数为0时，`bar`为0，否则`bar`为1。
```c
MODULE_PARM_DESC(use_io, "Force use of i/o access mode");
```
而图中`PCI_BASE_ADDREESS_1`的位置对应的恰好是CSR **I/O** Mapped Base Address Register。是不是很合理？

### CSR
8255x网卡是通过共享内存地址空间来与CPU进行交互的。该地址空间分为三部分：
- CSR, 控制/状态寄存器
- CBL, 命令块列表
- RFA, 接收帧区域

CSR位于网卡中，而另外两个只是内存中的数据结构。CSR的前8个字节有一个名字，叫作 SCB。SCB是8255x与CPU交换状态和控制信息的中转站。驱动程序通过向SCB中写入命令来控制命令单元 CU 和接收单元 RU 的状态。设备也会更新SCB中的状态字来标示CU和RU状态的变化，并通过中断告知驱动。而且，SCB还保存着指向CBL和RFA的指针，整体的结构如下图所示。更详细的信息，请参考硬件手册[^3]。
![8255x地址空间](https://img-blog.csdnimg.cn/20190424171511498.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3MTUyNA==,size_16,color_FFFFFF,t_70)
对网卡的以下控制是通过设定SCB实现的
- 发送Command Block `e100_exec_cb()`
- 硬件初始化 `e100_hw_init()`
- 更新统计信息 `e100_update_stats()`
- 启动RU `e100_start_receiver()`
- 开关网卡中断 `e100_enable_irq()` / `e100_disable_irq()`

CSR支持的其他功能还有
- 硬件重置 `e100_hw_reset()`
- 设备自检 `e100_self_test()`
- EEPROM读写 `e100_eeprom_write()` / `e100_eeprom_read()`
- PHY控制 `mdio_ctrl_hw()`

对于CBL和RFA，为了收发性能考量，如果设备支持，则应将它们创建为DMA缓冲区。
#### 啥是DMA？能吃吗？
不能。

DMA 是一种硬件机制，它允许外围设备和内存之间直接传输它们的I/O数据，而不需要CPU的参与。使用这种机制可以大大提高与设备通信的吞吐量。
可以通过`pci_set_dma_mask()` / `dma_set_mask()`来查询设备是否支持DMA。

有两篇内核文档[^4][^5]对DMA API提供了详细的说明，以下仅对代码中用到的内容作简要介绍。
##### 一致DMA映射
使用`pci_alloc_consistent()` / `dma_alloc_coherent()`建立一致DMA映射。
在代码中，`e100_alloc()`使用该函数为存放自检结果，统计数据及dump信息创建了DMA缓冲区。

`dma_alloc_coherent()`创建的缓冲区的最小大小为单个页，如果驱动需要多个比页小的缓冲区，那么DMA池会是更好的选择。使用`dma_pool_create()`可创建DMA池。随后，使用`dma_pool_alloc()`从池中进行缓冲区分配。
在代码中，CBL就是以DMA池的形式分配的。

一致DMA映射的开销通常是比较大的，对于那些存在于驱动程序整个生命周期中的数据结构，可以考虑使用这种方法。
##### 流式DMA映射
对于单独或者临时性的操作，建议使用流式DMA映射。

调用 `pci_map_single()` / `dma_map_single()`可创建流式DMA映射。
因为上述调用可能失败并返回错误，应当调用`pci_dma_mapping_error()` / `dma_mapping_error()`来检测可能的错误。

最后，如果你想多次使用同一缓冲区并在两次DMA传输之间改变了数据，缓冲区就需要在CPU和设备之间进行同步。调用`pci_dma_sync_single_for_cpu()` / `dma_sync_single_for_cpu()`将数据同步到CPU侧，调用`pci_dma_sync_single_for_device()` / `dma_sync_single_for_device()`将数据同步到设备侧。

在代码中对于RFA区域使用了流式DMA映射。
#### Command Block
对网卡的以下控制是通过发送Command Block实现的
- 地址设定 `e100_set_mac_address()`
- 多播设定 `e100_set_multicast_list()`
- 数据包发送 `e100_xmit_frame()`
- 加载微码 `e100_load_ucode_wait()`
- 获取设备寄存器信息 `e100_get_regs()`
- 各种配置设定 `e100_configure()`

##### 数据包发送
`e100_xmit_frame()`会调用`e100_exec_cb()`来发送一个 TCB。后者将调用`e100_xmit_prepare()`将`sk_buff`挂到TCB上。

### 中断处理
在调用`pci_enable_device()`之后，PCI设备的中断号就保存在`pdev->irq`中了。
代码中调用了`request_irq()`为该中断安装了中断处理程序`e100_intr()`。
有很多事件都会触发中断，在代码中我们关心的主要有以下两种:
- Command Block发送完成
- RU接收到新的数据包

代码中对这些事件的实际处理是由NAPI完成的。
#### NAPI
NAPI[^6]是一种新的旨在提高高速网络性能的API，它将传统的一次中断接收一个数据包改为一次中断后通过轮询接收多个数据包。其调用的大致流程是：
1. 注册轮询函数
```c
	netif_napi_add(netdev, &nic->napi, e100_poll, E100_NAPI_WEIGHT);
```
2. 在中断处理函数中关掉中断，并调用`napi_schedule()`，或者等价地
```c
	if (likely(napi_schedule_prep(&nic->napi))) {
		e100_disable_irq(nic);
		__napi_schedule(&nic->napi);
	}
```
3. 在轮询函数中调用`netif_receive_skb()`，这是由`e100_rx_clean()`函数完成的。
4. 如果上一步未能完全处理完数据包，调用`napi_complete()`停止轮询并再次打开中断。

实际的轮询函数还对发送队列进行了清理，整个轮询函数如下
```c
static int e100_poll(struct napi_struct *napi, int budget)
{
	struct nic *nic = container_of(napi, struct nic, napi);
	unsigned int work_done = 0;

	e100_rx_clean(nic, &work_done, budget);
	e100_tx_clean(nic);

	/* If budget not fully consumed, exit the polling mode */
	if (work_done < budget) {
		napi_complete_done(napi, work_done);
		e100_enable_irq(nic);
	}

	return work_done;
}
```
##### 数据包接收
在`e100_rx_clean()`中使用一个循环对每一个数据包进行接收处理。
```c
	/* Indicate newly arrived packets */
	for (rx = nic->rx_to_clean; rx->skb; rx = nic->rx_to_clean = rx->next) {
		err = e100_rx_indicate(nic, rx, work_done, work_to_do);
		/* Hit quota or no more to clean */
		if (-EAGAIN == err || -ENODATA == err)
			break;
	}
```
其中`e100_rx_indicate()`函数检查每个数据包的状态，去掉包头的无用数据，最终调用`netif_receive_skb()`转交给上层代码。

*[MAC]:Media Access Controller
*[PHY]:Physical Layer
*[EEPROM]:Electrically Erasable Programmable Read Only Memory
*[PCI]:Peripheral Component Interconnect
*[MII]:Media Independent Interface
*[CSR]:Control/Status Registers
*[CBL]:Command Block List
*[RFA]:Receive Frame Area
*[SCB]:System Control Block
*[CU]:Command Unit
*[RU]:Receive Unit
*[TCB]:Transmit Command Block
*[DMA]:Direct Memory Access

[^1]:[PCI设备标识](https://raw.githubusercontent.com/pciutils/pciids/master/pci.ids)
[^2]:[How To Write Linux PCI Drivers](https://github.com/torvalds/linux/blob/master/Documentation/PCI/pci.txt)
[^3]:[Intel 8255x 10/100 Mbps Ethernet Controller Family, Open Source Software Developers Manual](https://sourceforge.net/projects/e1000/files/8255x%20Developer%20Manual/)
[^4]:[Dynamic DMA mapping Guide](https://github.com/torvalds/linux/blob/master/Documentation/DMA-API-HOWTO.txt)
[^5]:[Dynamic DMA mapping using the generic device](https://github.com/torvalds/linux/blob/master/Documentation/DMA-API.txt)
[^6]:[NAPI](https://wiki.linuxfoundation.org/networking/napi)