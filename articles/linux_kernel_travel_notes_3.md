@[TOC]
## 设备模型
### 设备
在最底层，Linux系统中的每一个设备都用`device`结构的一个实例来表示。
结构中比较重要的成员包括
- `parent` 该设备的"父"设备
- `init_name` 设备名称
- `bus` 设备所属的总线
- `driver` 设备的驱动程序
- `driver_data` 由驱动使用的私有数据
- `devt` 设备号
- `class` 设备所属的类
- `groups` 设备的属性组
- `release` 析构函数

可以使用`device_create()` / `device_create_with_groups()`创建设备。
相应地，应使用`device_destroy()`来销毁设备。

使用`device_lock()` / `device_lock_interruptible()` / `device_trylock()`来锁定设备。
相应地使用`device_unlock()`解锁设备。

使用`device_for_each_child()` / `device_for_each_child_reverse()`来遍历子设备。
使用`device_find_child()`来查找符合特定条件的子设备。
使用`dev_name()` / `dev_set_name()`来取得或设定设备的名字。
使用`dev_get_drvdata()` / `dev_set_drvdata()`来取得或设定驱动私有数据。
使用`device_add_groups()` / `device_add_group()`来增加属性组。
相应地，使用`device_remove_groups()` / `device_remove_group()`可移除属性组。

通常只需要使用`device_register()` / `device_unregister()`对设备进行注册和移除。
`device_is_registered()`可以判断设备是否已经被注册。

#### 字符设备
字符设备用`cdev`结构表示。其成员包括
- `owner` 所属模块
- `ops` 文件操作回调函数集
- `dev` 设备编号
- `count` 次设备号个数

首先应使用`alloc_chrdev_region()`为设备分配编号。
然后使用`cdev_alloc()`创建`cdev`结构，并使用`cdev_init()`初始化之。
使用`cdev_add()`向系统添加该设备。
移除时，应使用`cdev_del()`，并使用`unregister_chrdev_region()`释放分配的编号。

#### 块设备
T.B.D.
#### 网络设备
请参考[Linux 内核游记 (1)](https://blog.csdn.net/weixin_41871524/article/details/89477547)。
### 驱动程序
设备模型跟踪所有系统所知道的设备。进行跟踪的主要原因是让驱动程序核心协调驱动程序与新设备之间的关系。驱动程序由`device_driver`结构定义。
结构中比较重要的成员包括
- `name` 名字
- `bus` 所属总线
- `owner` 所属模块
- `of_match_table` open firmware 匹配表
- `acpi_match_table` ACPI 匹配表
- `probe` 当设备和驱动绑定时，调用的回调函数
- `remove` 当设备和驱动解绑时，调用的回调函数
- `shutdown` 设备关闭时调用的回调函数
- `suspend` 设备休眠时调用的回调函数
- `resume` 设备被唤醒时调用的回调函数
- `groups` 属性组

`driver_for_each_device()` 用来遍历设备。
`driver_find_device()` 用来查找符合特定条件的设备。
`driver_add_groups()` / `driver_remove_groups()` 用来添加和移除属性组。
`driver_find()` 使用名字来查找特定的驱动。

最后`driver_register()` / `driver_unregister()` 仍然是这里最常用的函数。

### 总线
总线是处理器与一个或多个设备之间的通道。在设备模型中，所有的设备都通过总线相连 。
在Linux设备模型中，用`bus_type`结构表示总线。
结构中比较重要的成员包括
- `name` 名字
- `bus_groups` 总线属性组
- `dev_groups` 设备属性组
- `drv_groups` 驱动属性组
- `match` 如果给定的设备与驱动匹配，该回调函数返回值为正，否则为0。
- `probe` 设备添加到总线时的回调函数
- `remove` 设备从总线移除时的回调函数
- `offline` 设备被热拔除时的回调函数
- `online` 设备从offline状态恢复时的回调函数
- `suspend` 设备休眠时的回调函数
- `resume` 设备唤醒时的回调函数
- `num_vf` 用来查询设备的虚拟功能个数
- `dma_configure` 用来设置设备的DMA配置

`bus_for_each_dev()` / `bus_for_each_drv()` 可遍历设备 / 驱动。
`bus_find_device()` 可查找设备。
`bus_find_device_by_name()` 使用名字查找设备。
`bus_add_device()` / `bus_remove_device()` 向总线添加或移除设备。
`bus_add_driver()` / `bus_remove_driver()` 向总线添加或移除驱动。

当然，还有最常用的`bus_register()` / `bus_unregister()` 注册或移除总线。

### 类
类是一个设备的高层视图，它抽象出了低层的实现细节。例如驱动程序看到的是SCSI磁盘和ATA磁盘，但是在类的层次上，它们都是磁盘而已。类由`class`结构表示。
结构中比较重要的成员包括
- `name` 名字
- `owner` 所属模块
- `class_groups` 类属性组
- `dev_groups` 设备属性组
- `class_release` 类析构函数
- `dev_release` 设备析构函数

使用`class_register()` / `class_unregister()` 注册/移除类。
使用`class_create()` / `class_destroy()` 创建/销毁类。
使用`class_for_each_device()` 遍历设备。
使用`class_find_device()` 查找设备。

#### 类接口
类接口是一个奇葩的概念。可以把它理解成一种设备加入或者离开时获得信息的触发机制。
类接口由`class_interface`结构表示，其中的成员包括
- `node` 链表节点
- `class` 所对应的类
- `add_dev` 设备加入时的回调函数
- `remove_dev` 设备离开时的回调函数

只有两个函数可用于类接口，注册函数`class_interface_register()`以及移除函数`class_interface_unregister()`。

### 属性
几乎在Linux设备模型的每一层都提供了添加属性的函数。属性由`attribute`结构表示，其成员包括
- `name` 属性名
- `mode` 属性权限

设备、驱动、总线和类的属性结构分别是`device_attribute`、`driver_attribute`、`bus_attribute`和`class_attribute`。其成员包括
- `attr` `attribute`结构
- `show` 显示回调函数
- `store` 存储回调函数

为了方便属性的创建，内核提供了如下的宏
- `XXX_ATTR_RW` 创建可读可写属性
- `XXX_ATTR_RO` 创建只读属性
- `XXX_ATTR_WO` 创建只写属性

可使用如下函数向设备、驱动、总线或类添加 / 删除属性
- `xxx_create_file()` 创建属性文件
- `xxx_remove_file()` 移除属性文件

#### 属性组
多个属性可以组成属性组，这样就可以利用前面提到的属性组相关函数来一次性添加多个属性。属性组由`attribute_group`结构表示。其主要成员包括
- `name` 属性组名称(可选)
- `attrs` 指向属性数组指针，以NULL结尾

内核提供了`ATTRIBUTE_GROUPS`宏以简化属性组的创建。例如，如下代码创建了仅含一个只读属性`type`的属性组`gnss`
```c
static ssize_t type_show(struct device *dev, struct device_attribute *attr,
				char *buf)
{
	struct gnss_device *gdev = to_gnss_device(dev);

	return sprintf(buf, "%s\n", gnss_type_name(gdev));
}
static DEVICE_ATTR_RO(type);

static struct attribute *gnss_attrs[] = {
	&dev_attr_type.attr,
	NULL,
};
ATTRIBUTE_GROUPS(gnss);
```
## 参考资料
关于设备模型这部分的资料真的是很少，即使英文资料大多也是比较旧的，并不能反映内核的最新状态。如果有朋友知道关于这方面的比较新的资料，欢迎在下方评论留言。除阅读内核代码之外，个人认为，目前最好的资料仍然是经典的：
- [Linux Device Drivers](https://lwn.net/Kernel/LDD3/) 中关于设备模型和字符设备的部分
- [内核文档](https://github.com/torvalds/linux/blob/master/Documentation/driver-model) 中关于设备模型的部分