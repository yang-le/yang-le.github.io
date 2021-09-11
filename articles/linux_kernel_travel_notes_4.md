@[TOC]
## TTY子系统
### 为什么是TTY
因为
> There are dark areas of the kernel where only the bravest hackers dare to tread.  Places where the code is twisted, the requirements are complex, and everything depends on ancient code which has seen little change over the years because even the most qualified developers fear the consequences. Arguably, no part of the kernel is darker and scarier than the serial terminal (TTY) code.
-- Jonathan Corbet[^1], July, 2009

> oh, wonderful! Alan[^2], you are a true wizard :-) The tty layer is one of the very few pieces of kernel code that scares the hell out of me :-)
-- Ingo Molnar[^3], July, 2007

### 青铜时代
![tty核心概览](https://img-blog.csdnimg.cn/20190620223540911.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3MTUyNA==,size_16,color_FFFFFF,t_70)
从上图可以看到，内核的tty子系统由tty核心，tty线路规程和tty驱动组成。我们不妨从tty驱动开始说起。

#### TTY 驱动程序
TTY驱动程序由`tty_driver`结构所表示。
应使用`tty_alloc_driver()`来分配该结构。
使用`tty_set_operations()`设定驱动的操作函数。
然后，使用`tty_register_driver()`向TTY核心注册我们的驱动。
如此，当用户打开TTY设备，并向其中写入数据时，TTY核心就能够调用到我们刚刚注册的操作函数。TTY驱动程序也负责把从硬件获取的任何数据传递给TTY核心。
释放时，分别使用 `tty_unregister_driver()` 和 `put_tty_driver()`。

#### TTY核心
TTY核心的本质是一个标准的字符设备驱动，作为接口被TTY驱动程序所使用。这使得TTY驱动程序把重点放在处理流入或流出设备的数据上，而不必考虑太多与用户空间交互的任务。

`tty_register_driver()`会调用`tty_register_device()`向TTY核心添加设备，后者进一步调用了`tty_cdev_add()`向系统注册了一个字符设备。在这个函数中，我们发现，字符设备的操作函数集被设定为`tty_fops`。在其中的`tty_open()`函数中，通过调用`tty_open_by_driver()`创建了`tty_struct`结构，并将相关成员赋值，特别是
- 将`tty_driver`中的`ops`成员复制给了`tty_struct`。
- 调用`tty_ldisc_init()`对线路规程进行了赋值。

至此，`tty_driver`基本上完成了它的使命，后续的读写操作等可以顺理成章地使用`tty_struct`结构体进行了。因此，`tty_struct`可能是其中最重要的数据结构，无论是底层的驱动操作函数，还是线路规程都可以从中取得。下表简要列出了核心支持的操作函数及其实现概要。
|文件操作| 实现概要 |
|--|--|
| tty_open() | 调用`tty_ldisc_open()` 和 `tty->ops->open` |
| tty_read()| 调用`ld->ops->read` |
| tty_write()| 调用`ld->ops->write`，后者调用了`tty->ops->write` |
| tty_poll()| 调用`ld->ops->poll` |
| tty_ioctl()| 调用`tty->ops->ioctl` 和 `ld->ops->ioctl` |
| tty_release()| 调用`tty->ops->close`和`tty_ldisc_release()` |

##### TTY 端口
你可能会问，为什么没有`read()`函数。那么`tty_port`可能就是你要找的答案。`tty_insert_flip_string()` / `tty_insert_flip_char()`可以将驱动接收到的数据通过`tty_port`插入缓冲区，而`tty_flip_buffer_push()`则将它们推向上层。

#### TTY线路规程
线路规程做的是幕后工作，TTY驱动程序甚至不会意识到线路规程的存在。我想甚至开发者也几乎很少涉及线路规程的修改，因为内核已经为我们提供了将近30种已实现好线路规程[^4]。对于通常的串口来说，使用的是N_TTY这个规程。因此，出入TTY驱动的数据其实已经默默地被线路规程倒过一手了。

### 白银时代
但是TTY驱动的开发还是过于复杂，为此，在2.6版本之后，一个专门的TTY驱动`serial_core`被加入进来，用以简化串口驱动的开发工作。于是，画风变成了这样。


![serial core架构](https://img-blog.csdnimg.cn/2019062721215827.PNG?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3MTUyNA==,size_16,color_FFFFFF,t_70)
#### Serial驱动程序
Serial驱动程序由`uart_driver`结构表示。
简单地使用`uart_register_driver() ` / `uart_unregister_driver()`进行注册即可。

##### UART端口
与TTY端口仅表示上行数据流不同的是，Serial驱动程序似乎倾向于使用端口来表示对出入硬件的双向数据流的管理。而且，一个驱动程序可以有多个端口。这使得`uart_port`成为`serial core`的核心数据结构。

使用`uart_add_one_port()`添加一个端口，使用`uart_remove_one_port() `移除一个端口。
为串口增加电源管理也是引入`serial_core`的目的之一，`uart_suspend_port()` / `uart_resume_port()`显然是为此目的而存在。

#### Serial核心
Serial核心实现了TTY驱动所要求的操作函数。特别值得一提的是在`uart_install()`函数中，将`uart_state`结构保存进了`tty->driver_data`，这使得后续的函数得以方便地获取`uart_port`及相关结构。

### 黄金时代
T.B.D. `serdev`
P.S.: 这里本来是要写serdev的，六月份就写到这了，但后来一直没有时间把这一部分写完，先发出来吧，拖得实在是太久了。

## 参考资料
- [A tempest in a tty pot](https://lwn.net/Articles/343828/)
- [Linux serial drivers](https://bootlin.com/doc/legacy/serial-drivers/linux-serial-drivers.pdf)
- [The Serial Device Bus](https://events.static.linuxfound.org/sites/events/files/slides/serdev-elce-2017-1.pdf)


[^1]: https://www.linux.com/news/30-linux-kernel-developers-30-weeks-jonathan-corbet
[^2]: https://www.linux.com/news/30-linux-kernel-developers-30-weeks-alan-cox
[^3]: https://blog.csdn.net/zhoupengtrim/article/details/8574276
[^4]: https://elixir.bootlin.com/linux/latest/source/include/uapi/linux/tty.h