# 一个简单的 RISC-V CPU 设计与实现
之前写的[RISCV五级流水CPU设计](https://yang-le.github.io/?article=riscv_five_stage_pipeline_cpu_design)不够详细，本篇算是一个补充。

## RISC-V 指令集介绍
- 除压缩扩展外，所有指令均为32bits长
- 压缩扩展指令为16bits长

### RV32I 基础整数指令集
- 32个32bits通用寄存器，x0 - x31
    - x0 零寄存器 zero
    - x1 返回地址 ra
    - x2 栈指针 sp
    - x3 全局指针 gp
    - x4 线程指针 tp
    - x5 - x7 临时寄存器 t0 - t2
    - x8 保存寄存器 s0 帧指针 fp
    - x9 保存寄存器 s1
    - x10 - x17 参数寄存器 a0 - a7
    - x18 - x27 保存寄存器 s2 - s11
    - x28 - x31 临时寄存器 t3 - t6
- 32bits的PC寄存器
![在这里插入图片描述](https://img-blog.csdnimg.cn/1b1e00731c0047d582d828a9214c2560.png#pic_center)
- 4类/6种指令类型
    - 用于寄存器-寄存器操作的R型
    - 用于寄存器-立即数操作的I型
    - 用于STORE操作的S型
        - 用于分支操作的B型
    - 用于立即数操作的U型
        - 用于跳转操作的J型
![在这里插入图片描述](https://img-blog.csdnimg.cn/c44500d4c53945758fc0551482a37cc3.png#pic_center)
- 整数计算指令
    - I型指令
        - ADDI 相加指令
        - SLTI[U] (无符号)比较指令
        - ANDI、ORI、XORI 逻辑运算指令
        - SLLI、SRLI、SRAI 逻辑和算数位移指令
    - U型指令
        - LUI 加载立即数高20位
        - AUIPC 令PC增加立即数高20位并将结果存入寄存器
    - R型指令
        - ADD
        - SLT[U]
        - AND、OR、XOR
        - SLL、SRL、SRA
        - SUB 相减指令
- 控制转移指令
    - I型指令
        - JALR JAL的寄存器寻址版本
    - J型指令
        - JAL 跳转并将下一指令地址存入寄存器
    - B型指令
        - BEQ、BNE 相等/不相等跳转
        - BLT[U] (无符号)小于跳转
        - BGE[U] (无符号)大于等于跳转
- 访存指令
    - I型指令
        - LW、LH[U]、LB[U]
    - S型指令
        - SW、SH、SB
- 其他指令
    - FENCE 内存屏障 I型
    - ECALL、EBREAK 环境调用和断点 I型

### RV64I 基础整数指令集
- 所有寄存器扩展到64bits
- 增加如下指令
    - ADDIW、ADDW
    - SLLI、SRLI、SRAI的位移量扩展到6bits
    - SLLIW、SRLIW、SRAIW
    - SLL、SRL、SRA的位移量扩展到6bits
    - SLLW、SRLW、SUBW、SRAW
    - LD、LWU、SD

### M 整数乘除标准扩展
- 乘法指令
    - MUL 乘法低32位
    - MULH 乘法高32位，有符号
    - MULHU 乘法高32位，无符号
    - MULHSU 乘法高32位，有符号乘无符号
    - MULW MUL的符号扩展版本
- 除法指令
    - DIV[U] (无符号)除法
    - REM[U] (无符号)取余
    - DIV[U]W、REM[U]W 符号扩展版本

### C 压缩指令标准扩展
![在这里插入图片描述](https://img-blog.csdnimg.cn/49b1da94dd46457e9d10169d43755d6a.png#pic_center)
- 只用到11个寄存器
    - zero
    - ra
    - sp
    - s0 - s1
    - a0 - a5
- 9种指令类型
    - 寄存器 CR型
    - 立即数 CI型
    - 栈存储 CSS型
    - 宽立即数 CIW型
    - 加载 CL型
    - 存储 CS型
    - 算数 CA型
    - 分支 CB型
    - 跳转 CJ型
- 每个指令都有等价的32bits指令与之对应
- 访存指令
    - 基于sp的访存
        - C.LWSP lw rd, offset(sp)
        - C.LDSP ld rd, offset(sp)
        - C.SWSP sw rs2, offset(sp)
        - C.SDSP sd rs2, offset(sp)
    - 基于寄存器的访存
        - C.LW lw rd, offset(s1)
        - C.LD ld rd, offset(s1)
        - C.SW sw rs2, offset(s1)
        - C.SD sd rs2, offset(s1)
- 控制转移指令
    - C.J jal zero, offset
    - C.JAL jal x1, offset
    - C.JR jalr zero, 0(rs1)
    - C.JALR jalr x1, 0(rs1)
    - C.BEQZ beq rs1, zero, offset
    - C.BNEZ bne rs1, zero, offset
- 整数计算指令
    - 整数常数生成
        - C.LI addi rd, zero, imm
        - C.LUI lui rd, nzimm
    - 整数寄存器-立即数操作
        - C.ADDI addi rd, rd, nzimm
        - C.ADDIW addiw rd, rd, imm
        - C.ADDI16SP addi sp, sp, nzimm
        - C.ADDI4SPN addi rd, sp, nzuimm
        - C.SLLI slli rd, rd, shamt
        - C.SRLI srli rd, rd, shamt
        - C.SRAI srai rd, rd, shamt
        - C.ANDI andi rd, rd, imm
        - C.MV add rd, zero, rs2
        - C.ADD add rd, rd, rs2
        - C.AND and rd, rd, rs2
        - C.OR or rd, rd, rs2
        - C.XOR xor rd, rd, rs2
        - C.SUB sub rd, rd, rs2
        - C.ADDW addw rd, rd, rs2
        - C.SUBW subw rd, rd, rs2
- 其他
    - C.NOP nop
    - C.EBREAK ebreak

### CSR
- RISC-V有12bits的CSR空间，即最多4096个控制和状态寄存器
- 最常用的8个CSR
    - mtev 中断向量
    - mepc 异常指令(下一)地址
    - mcause 异常原因
    - mie 中断使能
    - mip 中断队列
    - mtval 中断附加信息
    - mscratch 中断暂存
    - mstatus 中断状态
- CSR指令
    - CSRRW[I] CSR读&写
    - CSRRS[I] CSR读&置位
    - CSRRC[I] CSR读&清除

## Verilog 硬件描述语言实现

### 基本的想法

用时序逻辑分割组合逻辑

### 流水线
- 取指
    - 中断的情况
        - 如果进入中断处理，下一地址由CSR给出
        - 如果没有中断发生，则进行正常地址生成
    - 地址生成
        - JAL可前后跳转各1MB范围，需要将当前pc加上跳转偏移作为目标地址，并将下一条指令存储到指定寄存器中
        - JALR则是将一个指定寄存器加上跳转偏移作为目标地址，并将下一条指令存储到指定寄存器中
        - 分支指令将当前pc加上跳转偏移作为目标地址，可前后跳转各4KB范围。
        - 其他情况下则正常取下一条地址(+4，压缩指令是+2)。
![在这里插入图片描述](https://img-blog.csdnimg.cn/1fe16577ebd44318ae8534caef9e57e1.png#pic_center)
- 译码
    - 如果是压缩指令，先转换为对应的32bits指令
    - 判断指令类型，分离寄存器和立即数
![在这里插入图片描述](https://img-blog.csdnimg.cn/4b9a0c2d055444b787c3de9b05b24901.png#pic_center)
    - 产生控制信号
        - ALU操作码
        - 是否是跳转/分支指令
        - 是否需要pc/立即数参与运算
        - 是否是访存指令
        - 是否是CSR指令
        - 是否是中断(返回)相关指令
        - 是否是非法指令
        - (RV64)是否为32bits操作
    - 访问通用寄存器
- 执行
    - 确定参与运算的数据来源
        - pc寄存器
        - 指令中的立即数
        - 通用寄存器
        - 访存或回写转发
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/ab6069dfe558484cb4f86a0f5a5aad4c.png#pic_center) 
    - 进行CSR操作
        - 非对齐访存检测
        - 执行中断处理
        - 执行CSR指令

- 访存
    - load 把正确的数据从正确的位置上取出来
    - store 把正确的数据放到正确的位置上
- 回写
    - 将ALU计算结果写回通用寄存器
    - 将load数据写回通用寄存器

### 流水线寄存器
- 取指-解码寄存器
    - 暂存指令
    - 暂存指令地址(pc)
- 解码-执行寄存器
    - 暂存pc
    - 暂存立即数
    - 暂存通用寄存器地址
    - 暂存通用寄存器数据
    - 暂存各种控制信号
- 执行-访存寄存器
    - 暂存控制信号
    - 暂存访存需要的寄存器地址(rd)和数据(rs2)
    - 暂存访存地址(ALU结果)
- 访存-回写寄存器
    - 暂存回写地址(rd)
    - 暂存回写数据(load/ALU结果)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c08b4f802533464885949814191f0163.png#pic_center)
### 流水线冒险
- 结构冒险 硬件不支持在同一时刻执行多个指令的组合，例如不支持同时读写的内存或寄存器。
- 数据冒险 执行指令需要的数据还未准备好。
    - 转发 从其他指令的执行过程中转移数据给当前指令
    - 气泡 暂停流水线以等待数据
![在这里插入图片描述](https://img-blog.csdnimg.cn/351b076721d341618f5ddb3c2014fc12.png#pic_center)
- 控制冒险 也称分支冒险，当前取得的指令并不是下一个要执行的指令
    - 分支冒险需要插入两个周期的气泡

## 本项目受以下项目启发
- https://github.com/YosysHQ/picorv32
- https://gitee.com/liangkangnan/tinyriscv
- https://hdlbits.01xz.net/wiki/Main_Page

## RISC-V官方项目
- https://github.com/riscv/riscv-isa-manual
- https://github.com/riscv-non-isa/riscv-arch-test
- https://github.com/riscv-software-src/opensbi

## 参考资料
- Computer Organization and Design The Hardware/Software Interface: RISC-V Edition David A. Patterson, John L. Hennessy
- RISC-V 手册 一本开源指令集的指南 DAVID PATTERSON, ANDREW WATERMAN
- The RISC-V Instruction Set Manual Volume I: Unprivileged ISA Andrew Waterman, Krste Asanovic
- The RISC-V Instruction Set Manual Volume II: Privileged Architecture Andrew Waterman, Krste Asanovic, John Hauser