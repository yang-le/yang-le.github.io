@[TOC](RISCV五级流水CPU设计)

## 代码
所有代码已上传至[我的github](https://github.com/yang-le/riscv_cpu)，欢迎访问。
代码仍在施工中。

## 流水线设计
寄存器    | 取指 | 译码 | 执行 | 访存 | 回写
-------- | ----- | ----- | ----- | ----- | -----
pc_reg  | ↗ | → | ↘ |  | 
inst_reg  | ↗ | ↘ |  |  | 
rd_addr_reg  | | ↗ | → | → |  ↘ 
rs1_addr_reg | | ↗ |  ↘ 
rs2_addr_reg | | ↗ |  ↘ 
rs1_reg | | ↗ |  ↘ 
rs2_reg | | ↗ | → |  ↘ 
imm_reg | | ↗ |  ↘ 
alu_reg |  | | ↗ | ↗→ |  ↘ 

信号   | 取指 | 译码 | 执行 | 访存 | 回写
-------- | ----- | ----- | ----- | ----- | -----
alu_op  | | ↗ | ↘ 
s_pc  | | ↗ | ↘ 
s_imm  | | ↗ |↘ 
s_jalr  |  | ↗ |↘
s_branch  |  | ↗ | ↘
s_branch_zero  |  | ↗ | ↘
s_csr |  | ↗ | ↘
s_csri |  | ↗ | ↘
s_csrsc | | ↗ | ↘
s_jump |  | ↗ | ↘
s_store |  | ↗  | → | ↘
s_load |  | ↗  | → | ↘ | 
funct3|  | ↗  | → | ↘ | 

### 取指
取指阶段的任务包括PC更新和指令取得。向下一级传递的内容如下：

寄存器     | 说明
-------- | -----
pc_reg  | 程序计数器
inst_reg  | 指令寄存器

### 译码
译码阶段的任务包括指令解码和寄存器访问。向下一级传递的内容如下：

寄存器     | 说明
-------- | -----
pc_reg  | 程序计数器
rd_addr_reg  | rd寄存器地址
rs1_addr_reg  | rs1寄存器地址(用于csr指令及转发判断)
rs2_addr_reg  | rs2寄存器地址(用于转发判断)
rs1_reg  | rs1寄存器
rs2_reg  | rs2寄存器
imm_reg  | 立即数寄存器
ctrl_reg| 控制信号寄存器

控制信号如下：

信号     | 说明
-------- | -----
alu_op  | alu操作(4bits)
s_pc  | 程序计数器选通
s_imm  |立即数选通
s_jalr  | 解码出jarl指令
s_branch  | 解码出branch指令
s_branch_zero  | 解码出branch指令且分支条件为0
s_csr | 解码出csr指令
s_csri | 解码出csri指令
s_csrsc | 解码出csr[s\|c]指令
s_jump | 解码出jump指令
s_store | 解码出store指令
s_load | 解码出load指令
funct3| 用于区分load指令子类别

### 执行
执行阶段进行alu操作，地址生成和csr更新。向下一级传递的内容如下：

寄存器     | 说明
-------- | -----
rd_addr_reg  | rd寄存器地址
rs2_reg  | rs2寄存器(存放store数据)
alu_reg | 执行结果寄存器
ctrl_reg| 控制信号寄存器
控制信号如下：

信号     | 说明
-------- | -----
s_store | 执行store指令
s_load | 执行load指令
funct3| 用于区分load指令子类别

#### ALU
rs1端口输入如下

信号     | rs1
-------- | -----
ex_csri | rs1寄存器地址(用于csr指令)
ex_s_pc | 程序计数器
- | 来自转发部件

rs2端口输入如下

信号     | rs2
-------- | -----
ex_csr | csr寄存器输出
ex_s_imm | 立即数寄存器
- | 来自转发部件

操作码定义如下

操作码     | 功能
-------- | -----
ALU_ADD | 加法
ALU_SUB | 减法
ALU_CMP | 有符号比较(rs1 < rs2 则置1)
ALU_UCMP | 无符号比较(rs1 < rs2 则置1)
ALU_AND | 按位与
ALU_OR | 按位或
ALU_XOR | 按位异或
ALU_SLL | 逻辑左移
ALU_SRL | 逻辑右移
ALU_SRA | 算数右移

若打开乘除法模块，还会额外支持如下操作码

操作码     | 功能
-------- | -----
ALU_MUL | 带符号乘法，返回低位
ALU_MULH | 带符号乘法，返回高位
ALU_MULHSU | 带符号乘以无符号，返回高位
ALU_MULHU | 无符号乘法，返回高位
ALU_DIV | 带符号除法
ALU_DIVU | 无符号除法
ALU_REM | 带符号取余
ALU_REMU | 无符号取余

#### 地址生成
地址生成的逻辑如下

指令     | npc(用于pc更新) | next_pc(用于回写)
-------- | ----- | -----
JAL | alu输出 | pc + 4
JALR | alu输出，清除最低位 | pc + 4
BRANCH(跳转) | pc + imm | -
BRANCH(未跳转) | pc + 4 | -

### 访存
访存阶段进行内存读写。向下一级传递的内容如下：

寄存器     | 说明
-------- | -----
rd_reg  | rd寄存器地址
alu_reg | 执行结果(内存数据)寄存器

### 回写
回写阶段进行寄存器回写。

## 转发部件
从访存阶段转发，蓝色为转发通道

![从访存阶段转发](https://img-blog.csdnimg.cn/20210519213604447.png#pic_center)

从回写阶段转发

![从回写阶段转发](https://img-blog.csdnimg.cn/20210519213735492.png#pic_center)

转发部件确定执行阶段需要用到的寄存器来源，它可能将访存或回写阶段的结果转发至执行阶段。
若两者皆可用，优先转发访存阶段的结果。

从寄存器读写端口转发

![从寄存器读写端口转发](https://img-blog.csdnimg.cn/20210606165831273.png#pic_center)

## 冒险检测
load时产生冒险，黄色为气泡，灰色为暂停。

![load时产生冒险](https://img-blog.csdnimg.cn/202105192138257.png#pic_center)

分支/跳转时产生冒险

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210519214028133.png#pic_center)

用于检测流水线是否出现冒险情况，如果是，则暂停流水线和(或)插入气泡。具体信号如下

阶段/类型  | Load冒险 | 分支/跳转冒险
-------- | ----- | -----
PC | 暂停 | --
IF_ID | 暂停 | 气泡
ID_EX | 气泡 | 气泡

## Cache
Cache代码正在施工中。
