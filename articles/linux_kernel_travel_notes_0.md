@[TOC]
## 出发前的准备
### 下载内核源码
查看系统内核版本
```shell
uname -r
```
我的内核版本为4.18.0-15-generic，安装适合当前系统版本的源码
```shell
sudo apt install linux-source-4.18.0
```
安装后的源码在/usr/src/linux-source-4.18.0.tar.bz2，将其解压到合适的目录下，如
```shell
tar xf /usr/src/linux-source-4.18.0.tar.bz2 -C ~
```
将源码解压到自己的home目录下。

### 下载vscode
[下载传送门](https://code.visualstudio.com/Download)
双击下载到的.deb包按照提示进行安装即可，执行
```shell
code
```
即可打开安装好的vscode

### 加载源码到vscode中
按<kbd>Ctrl</kbd>+<kbd>K</kbd><kbd>Ctrl</kbd>+<kbd>O</kbd>
选择刚才解压的文件夹进行加载

## Hello World
我们的第一个内核模块代码`hello.c`如下所示[^1]
```c
#include <linux/init.h>
#include <linux/module.h>

MODULE_LICENSE("Dual BSD/GPL");

static int __init hello_init(void)
{
	printk(KERN_ALERT "Hello, world\n");
	return 0;
}

static void __exit hello_exit(void)
{
	printk(KERN_ALERT "Goodbye\n");
}

module_init(hello_init);
module_exit(hello_exit);
```
Makefile如下
```makefile
ifneq ($(KERNELRELEASE),)
	obj-m := hello.o
else
	KERNELDIR ?= /lib/modules/$(shell uname -r)/build
	PWD := $(shell pwd)
default:
	$(MAKE) -C $(KERNELDIR) M=$(PWD) modules
endif
```
执行
```shell
make
```
命令，可编译出模块`hello.ko`，执行
```shell
sudo insmod ./hello.ko
```
将该模块加载进内核。执行
```shell
lsmod
```
可以看到我们刚刚加载的模块，名称为`hello`。执行
```shell
sudo rmmod hello
```
可以卸载该模块。最后，执行
```shell
dmesg
```
可以看到我们的hello模块打印的log。

[^1]:[Building and Running Modules](https://lwn.net/images/pdf/LDD3/ch02.pdf)
