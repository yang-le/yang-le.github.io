
@[TOC]
# 网络设备驱动
## 为什么从网络设备入手？
不为什么。
## loopback 设备
我们要探访的第一个目的地位于源码目录的`drivers/net/loopback.c`。200行左右的代码量很适合作为第一个分析的目标。执行
```shell
ifconfig lo
```
你就可以看到这个设备的信息。没错，它就是将所有发出数据包再发给自己的"回环"接口，网络地址`127.0.0.1`。一起来看看这是怎么实现的吧。
### 向网络命名空间注册
从代码的最后一段可以看到，该设备通过`pernet_operations`结构进行注册，其初始化函数为`loopback_net_init()`函数。
```c
/* Registered in net/core/dev.c */
struct pernet_operations __net_initdata loopback_net_ops = {
	.init = loopback_net_init,
};
```
从注释看到，该结构体是在`net/core/dev.c`进行注册的，过去看一下，果不其然
```c
	if (register_pernet_device(&loopback_net_ops))
		goto out;
```
这里调用了`register_pernet_device()`函数对该设备进行注册，之所以能够直接访问到`loopback_net_ops`这个结构体，是因为该变量在`include/linux/netdevice.h`有一个声明
```c
extern struct pernet_operations __net_initdata loopback_net_ops;
```
关于该接口的更详细的说明可以参考代码注释,其中涉及到网络命名空间[^1]，我也还不是很明白所以就不详细说了。现在我们只需要知道系统初始化时会调用到这个函数就可以了。
### 初始化
#### 分配
每个网络设备都由一个`net_device`结构进行描述。所以，初始化会涉及到这个结构的创建和设置。该结构必须使用`alloc_netdev_mqs()`或相关函数进行分配[^2]。代码中使用的是`alloc_netdev()`这个函数
```c
dev = alloc_netdev(0, "lo", NET_NAME_UNKNOWN, loopback_setup);
```
其定义为
```c
#define alloc_netdev(sizeof_priv, name, name_assign_type, setup) \
	alloc_netdev_mqs(sizeof_priv, name, name_assign_type, setup, 1, 1)
```
可以看到，其`name`参数就是我们在`ifconfig`命令中看到的名字`lo`，表示"loop-back"。
`setup`参数是用来初始化`net_device`结构的回调函数，主要是进行钩子函数的注册。
#### 设备注册
分配完成后，需要向系统注册该设备，只需调用`register_netdev()`函数即可。顺便说一下，`register_netdev()`的反函数是`unregister_netdev()`，类似地`alloc_netdev()`的反函数是`free_netdev()`。初始化函数的其余部分涉及到更新网络命名空间相关的一些变量和检查，这里就略过了。
### 钩子函数
网络设备行使收发网络数据包功能的关键，在于`net_device`结构中的`net_device_ops`这个指针。该指针指向一系列的"钩子函数"，分别负责不同的设备管理功能。代码中对这些钩子的注释非常详细，我们现在只看一下`loopback.c`要用到的几个。它们分别是
- `ndo_init()`
- `ndo_start_xmit()`
- `ndo_get_stats64()`
- `ndo_set_mac_address()`
#### ndo_init()
仅在网络设备被注册时调用一次。网络设备可用此来进行任何后续阶段的初始化或验证。函数返回的错误码将回传给`register_netdev()`。
#### ndo_start_xmit()
当数据包需要被发送时调用。返回`NETDEV_TX_OK`。也可以返回`NETDEV_TX_BUSY`，但在这之前你应该停掉发送队列；这是为过时的设备和诡异的边界条件准备的返回值，但是如果你决定返回`NETDEV_TX_BUSY`，网络栈还是会做很多无意义的动作。该函数是**必须**的，不可以为`NULL`。
该函数更新数据包的时间戳`skb_tx_timestamp()`，取下数据包`skb_orphan()`，并将其送入接收队列`netif_rx()`。关于`sk_buff`的资料[^3]好像不是很多，所以只好结合代码注释进行理解。
#### ndo_get_stats64()
当用户想要获取网络设备使用统计信息时调用。函数必须更新`rtnl_link_stats64`结构。
为了保证统计数据的一致性，代码中使用`include/linux/u64_stat_sync.h`完成了统计相关的功能，头文件中的注释很详细[^4]，可自行参考。
#### ndo_set_mac_address()
当 MAC 地址需要改变时调用，如果不定义该接口，MAC地址将不能改变。
*[MAC]:Media Access Control
## e100
To be continued...

# 参考资料
除了代码中神秘的注释之外，以下资料可供理解参考
- 关于 [Kernel Networking](https://wiki.linuxfoundation.org/networking/start) 的维基百科
- [Kernel Documentation](https://github.com/torvalds/linux/tree/master/Documentation/networking) 中关于网络的部分
- [Linux Device Drivers](https://lwn.net/Kernel/LDD3/) 中关于网络设备的部分

[^1]:[Network namespaces](https://lwn.net/Articles/219794/)
[^2]:[netdevices.txt](https://github.com/torvalds/linux/blob/master/Documentation/networking/netdevices.txt)
[^3]:[sk_buff](https://wiki.linuxfoundation.org/networking/sk_buff)
[^4]:也请参考`include/linux/seqlock.h`中的注释。