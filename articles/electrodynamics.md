@[TOC](电动力学)
# 静场的情况
## 库仑定律（1785）
$$\vec{F} = {1 \over {4\pi\epsilon_0}}{qQ\over{r^2}}\vec{\hat{r}}$$
其中$\vec{\hat{r}}$为单位矢量。其中$\epsilon_0$为真空电容率，其大小为$8.8542 \times 10^{-12} F \cdot m^{-1}$
## 高斯定理
$$\oiint\vec{E}\cdot \rm d\vec{S} = {1\over{\epsilon_0}}\sum q_i = {1\over{\epsilon_0}}\iiint\rho \rm dV$$
其中，$\vec{E} := {\vec{F} \over {q}}$
## 静电场环路定理
$$\oint\vec{E}\cdot \rm d\vec{l} = 0$$
## 磁场的高斯定理
$$\oiint\vec{B}\cdot \rm d\vec{S} = 0$$
# 非静场的情况
## 毕奥-萨伐尔定律
$$\rm d\vec{B} = {\mu_0\over{4\pi}}{I\rm d\vec{l}\times \vec{\hat{r}}\over r^2}$$
其中，$\mu_0$为真空磁导率，其值为$4\pi\times10^{-7}H\cdot m^{-1}$
## 安培环路定理
$$\oint\vec{B}\cdot \rm d\vec{l} = \mu_0\sum I_i$$
## 电流的连续性方程
$$\oiint\vec{j}\cdot \rm d\vec{S} = -{\rm dQ\over \rm dt}$$
其中$\vec{j}$为电流密度， $\oiint\vec{j}\cdot \rm d\vec{S} = 0$称为恒定电流条件。其微分形式为
$$\vec\nabla\cdot\vec j = -\frac{\partial \rho}{\partial t}$$
## 位移电流 全电流安培环路定理
$$\oint\vec{B}\cdot \rm d\vec{l} = \mu_0\iint(\vec{j} + \epsilon_0{\partial\vec{E} \over {\partial t}})\cdot \rm d\vec{S}$$
## 电磁感应定律
$$\oint\vec{E}\cdot \rm d\vec{l} = - {\rm d\over \rm dt}\iint\vec{B}\cdot \rm d\vec{S}$$

# 洛伦兹力
$$\vec{F} = q(\vec{E} + \vec{v}\times\vec{B})$$
## 安培定律
$$\vec{F} = I\vec{l}\times\vec{B}$$
安培定律是洛伦兹[^1]磁场力的宏观体现，实际上，$\vec{F} = I\vec{l}\times\vec{B} = It{\vec{l}\over t}\times\vec{B} = q\vec{v}\times\vec{B}$
[^1]:荷兰物理学家亨德里克·洛伦兹 (Hendrik Lorentz)
# 麦克斯韦方程组
## 斯托克斯定理
$$\iiint\vec\nabla\cdot\vec{A} \rm dV = \oiint\vec{A}\cdot \rm d\vec{S}$$
$$\iint\vec\nabla\times\vec{A}\cdot\rm d\vec{S} = \oint\vec{A}\cdot\rm d\vec{l}$$
## 积分形式
高斯电场定理$$ \oiint\vec{E}\cdot \rm d\vec{S} = {1\over{\epsilon_0}}\iiint\rho \rm dV$$
高斯磁场定理$$\oiint\vec{B}\cdot \rm d\vec{S} = 0$$
法拉第定律$$\oint\vec{E}\cdot \rm d\vec{l} = -\iint{\partial\vec{B}\over\partial t}\cdot \rm d\vec{S}$$
安培-麦克斯韦定律$$\oint\vec{B}\cdot \rm d\vec{l} = \mu_0\iint(\vec{j} + \epsilon_0{\partial\vec{E} \over {\partial t}})\cdot \rm d \vec{S}$$
## 微分形式
高斯电场定理$$\vec\nabla\cdot\vec{E} = {\rho \over \epsilon_0}$$
高斯磁场定理$$\vec\nabla\cdot\vec{B} = 0$$
法拉第定律$$\vec\nabla\times\vec{E} = -{\partial\vec{B}\over\partial t}$$
安培-麦克斯韦定律$$\vec\nabla\times\vec{B} = \mu_0(\vec{j} + \epsilon_0{\partial\vec{E} \over {\partial t}})$$

## 拉格朗日公式
$$\vec a\times(\vec b\times \vec c) = \vec b (\vec a \cdot \vec c) - \vec c (\vec a \cdot \vec b)$$

## 势场形式
由高斯磁场定律，数学上可以知道存在一个$\vec A$满足
$$\vec B = \vec \nabla \times \vec A$$
物理上将$\vec A$称为电磁场的矢势。由此，法拉第定律可以写为
$$\vec\nabla\times\vec{E} = -{\partial\over\partial t}(\vec \nabla \times \vec A) = -\vec \nabla \times{\partial\vec A\over\partial t}$$即$\vec \nabla \times(\vec E + {\partial\vec A\over\partial t}) = 0$，数学上可以知道存在一个$\phi$满足$\vec E + {\partial\vec A\over\partial t} = -\vec\nabla\phi$，因此
$$\vec E = -\vec\nabla\phi - {\partial\vec A\over\partial t}$$
物理上将$\phi$称为电磁场的标势。这样，安培-麦克斯韦定律就可以写为
$$\vec\nabla\times(\vec\nabla\times\vec A) = \vec\nabla(\vec\nabla\cdot\vec A) - \vec\nabla^2\vec A = \mu_0\vec j - \mu_0\epsilon_0\vec\nabla{\partial\phi \over \partial t} - \mu_0\epsilon_0{\partial^2\vec A \over \partial t^2}$$
整理可得
$$\nabla^2\vec A - \mu_0\epsilon_0{\partial^2\vec A \over \partial t^2} = -\mu_0\vec j + \vec\nabla(\vec\nabla\cdot\vec A + \mu_0\epsilon_0{\partial\phi \over \partial t})$$
作规范变换
$$\begin{array}{ll}
\vec A' &= \vec A + \vec\nabla\chi \\
\vec \phi' &= \vec \phi - {\partial\chi \over \partial t}
\end{array}$$
使得
$$\vec\nabla\cdot\vec A' + \mu_0\epsilon_0{\partial\phi' \over \partial t} = 0$$
这被称为Lorenz[^2]规范。据此，有
$$\nabla^2\vec A - \mu_0\epsilon_0{\partial^2\vec A \over \partial t^2} = -\mu_0\vec j$$
[^2]:丹麦物理学家路德维希·洛伦茨(Ludvig Lorenz)

同样地，高斯电场定理可以写为
$$-\vec\nabla\cdot(\vec\nabla\phi + {\partial\vec A\over\partial t}) = -\vec\nabla^2\phi - {\partial \over \partial t}(\vec\nabla\cdot\vec A)={\rho \over \epsilon_0}$$
根据Lorenz规范，就有
$$\vec\nabla^2\phi - \mu_0\epsilon_0{\partial^2\phi \over \partial t^2} = -{\rho \over \epsilon_0}$$
引入达朗贝尔算子$\Box^2 = -\frac{1}{c^2}\frac{\partial^2}{\partial t^2} + \vec\nabla^2$，麦克斯韦方程组的势场形式可以表示为
$$\begin{array}{ll}
\vec B &= \vec \nabla \times \vec A \\
\vec E &= -\vec\nabla\phi - {\partial\vec A\over\partial t} \\
\Box^2\vec A &= -\mu_0\vec j \\
\Box^2\phi &= -{\rho \over \epsilon_0}
\end{array}$$
## 协变形式
### 四维势场
定义电磁4-势为
$$A_a = (-\frac{\phi}{c}, \vec A)$$
则洛伦兹规范可以表示为
$$\partial_a A^a = A^a{}_{,a} = 0$$
其中
$$\partial_a = (\frac{1}{c}\frac{\partial}{\partial t}, \vec\nabla)$$
定义4-电流密度为
$$J^a = (c\rho, \vec j)$$
借此，电流的连续性方程可以简洁地表示为
$$\partial_a J^a = J^a{}_{,a} = 0$$
$A_a$和$J^a$两者之间的关系构成麦克斯韦方程组的四维势场形式，即
$$\partial^a\partial_aA_b = \Box^2A_b = -\mu_0J_b = -\mu_0\eta_{ab}J^a$$
只要注意到闵可夫斯基度规的符号，就可以验证这与前一节的势场方程是等价的。
### 电磁张量
再考察一下$A_a$和$\vec E$、$\vec B$的关系，不难得出如下的结论
$$\begin{array}{ll}
-\frac{E_x}{c} &= \partial_tA_x - \partial_xA_t \\
-\frac{E_y}{c} &= \partial_tA_y - \partial_yA_t \\
-\frac{E_z}{c} &= \partial_tA_z - \partial_zA_t \\
B_x &= \partial_yA_z - \partial_zA_y \\
-B_y &= \partial_xA_z - \partial_zA_x \\
B_z &= \partial_xA_y - \partial_yA_x
\end{array}$$
这启发我们定义如下的二阶、反称、协变张量
$$F_{ab} = \partial_aA_b - \partial_bA_a$$
称为电磁张量，其分量形式为
$$F_{\mu\nu} = \begin{bmatrix}
0 &-\frac{E_x}{c} &-\frac{E_y}{c} &-\frac{E_z}{c} \\
\frac{E_x}{c} &0 &B_z &-B_y \\
\frac{E_y}{c} &-B_z &0 &B_x \\
\frac{E_z}{c} &B_y &-B_x &0
\end{bmatrix}$$
使用电磁张量，麦克斯韦方程组可以简洁地表述为
$$\begin{array}{lll}
\partial_bF^{ab} &= F^{ab}{}_{,b} &= \mu_0J^a \\
\partial_{[c}F_{ab]} &= F_{[ab,c]} &= 0
\end{array}$$
我们对上式两边求导可得
$$\Box^2F_{ab} = \partial^c\partial_cF_{ab} = -\partial^c\partial_bF_{ca} -\partial^c\partial_aF_{bc}$$
注意到$\partial^cF_{ca} = -\partial^cF_{ac} = -u_0J_a$，就有
$$\Box^2F_{ab} = -\mu_0(\partial_aJ_b - \partial_bJ_a) = 2\mu_0J_{[a,b]}$$
在无源($J^a = 0$)的情况下，上述方程就是波动方程
$$\Box^2F_{ab} = 0$$
### 外微分形式
电磁张量的Hodge对偶为
$$^*F_{\mu\nu} = \begin{bmatrix}
0 & B_x & B_y & B_z \\
-B_x & 0 & \frac{E_z}{c} & -\frac{E_y}{c} \\
-B_y & -\frac{E_z}{c} & 0 & \frac{E_x}{c} \\
-B_z & \frac{E_y}{c} & -\frac{E_x}{c} & 0
\end{bmatrix}$$
借此，麦克斯韦方程可表示为
$$\begin{array}{ll}
dF &= 0\\
^*d^*F &= \mu_0J
\end{array}$$

# 电磁波
## 波动方程
$${1\over v^2}{\partial^2 f \over \partial t^2} = \vec\nabla^2f$$
## 无源电磁场
对法拉第定律两边求旋度
$$\vec\nabla\times(\vec\nabla\times\vec{E}) = \vec\nabla(\vec\nabla\cdot\vec{E}) - \vec\nabla^2 \vec E = -{\partial\over\partial t}(\vec\nabla\times\vec{B})$$
而对于无源场，$\vec\nabla\cdot\vec{E} = 0$，$\vec\nabla\times\vec{B} = \mu_0\epsilon_0{\partial\vec{E} \over {\partial t}}$所以
$$\vec\nabla^2 \vec E = \mu_0\epsilon_0{\partial^2\vec{E} \over {\partial t^2}}$$
同理可得
$$\vec\nabla^2 \vec B = \mu_0\epsilon_0{\partial^2\vec{B} \over {\partial t^2}}$$
与波动方程对照，有${1 \over v^2} = \mu_0\epsilon_0$，因此
$$v = {1 \over \sqrt{\mu_0\epsilon_0}} = 2.9979 \times 10^8 m / s = c$$
这就是真空中的光速。
# 电磁场
## 几个重要公式
$$\vec\nabla\cdot(\vec A \times \vec B) = \vec B\cdot(\vec\nabla\times \vec A) - \vec A \times(\vec\nabla\times\vec B)$$
$$\vec\nabla(\vec A\cdot \vec B) = \vec A\times(\vec \nabla \times \vec B) + \vec B\times(\vec \nabla \times \vec A) + (\vec A \cdot \vec\nabla)\vec B + (\vec B \cdot \vec \nabla)\vec A$$
当$\vec A = \vec B$时就有
$$\vec A \times(\vec \nabla\times \vec A) = {1\over 2}\vec\nabla\vec A^2 - (\vec A\cdot\vec \nabla)\vec A$$
参考[Nabla算符的运算律以及常用公式](https://zhuanlan.zhihu.com/p/52834609)
## 能量（密度）和能流（密度）
做功为系统增加能量，能量的变化率就是做功的功率。在电磁场中，仅电场力对带电体做功，因此功率为
$$\iiint\vec E\rho \rm dV\cdot\vec u = \iiint\vec E\cdot\vec j\rm dV$$
而$\vec E\cdot \vec j = \vec E \cdot ({1 \over \mu_0}\vec\nabla\times\vec B) - \vec E\cdot\epsilon_0{\partial \vec E \over \partial t} = {1 \over \mu_0}\vec\nabla\cdot(\vec B \times \vec E) + {1 \over \mu_0}\vec B \times(\vec \nabla\times\vec E) - \vec E\cdot\epsilon_0{\partial \vec E \over \partial t} = -{1 \over \mu_0}\vec\nabla\cdot(\vec E \times \vec B) - {1 \over \mu_0}\vec B\cdot{\partial \vec B \over \partial t} - \vec E\cdot\epsilon_0{\partial \vec E \over \partial t} = -{\partial \over \partial t}({\epsilon_0\vec E^2 + {1 \over \mu_0}\vec B^2 \over 2}) -{1 \over \mu_0}\vec\nabla\cdot(\vec E \times \vec B)$，带入上式并使用高斯定理，有
$$\iiint\vec E\rho \rm dV\cdot\vec u = -{\rm d \over \rm dt}\iiint({\mu_0\epsilon_0\vec E^2 + \vec B^2 \over 2\mu_0})\rm dV - \oiint{1 \over \mu_0}(\vec E \times \vec B)\cdot\rm d\vec S$$
物理上称${\mu_0\epsilon_0\vec E^2 + \vec B^2 \over 2\mu_0}$为电磁场的能量密度，$\vec S = {1 \over \mu_0}(\vec E \times \vec B)$为电磁场的能流密度矢量，也叫坡印廷矢量。
## 动量（密度）和动量流（密度）
根据牛顿第二定律，物体受到的力等于其动量的变化率。在电磁场中，物体受到的力为
$$\iiint(\rho\rm dV)(\vec E + \vec u \times \vec B) = \iiint(\vec E\rho + \vec j \times \vec B)\rm dV$$
而$\vec E\rho + \vec j \times \vec B = \epsilon_0\vec E(\vec\nabla\cdot\vec E) - {1\over \mu_0}\vec B\times(\vec\nabla\times \vec B) + \epsilon_0\vec B\times{\partial \vec E \over \partial t}$
考虑到${\partial \over \partial t}(\vec E \times \vec B) = \vec E \times {\partial \vec B \over \partial t} - \vec B \times {\partial \vec E \over \partial t}$，代入前面就有$\vec E\rho + \vec j \times \vec B = \epsilon_0\vec E(\vec\nabla\cdot\vec E) - {1\over \mu_0}\vec B\times(\vec\nabla\times \vec B) - \epsilon_0\vec E\times(\vec \nabla\times\vec E) - \epsilon_0{\partial \over \partial t}(\vec E \times \vec B)$，整理得
$$\vec E\rho + \vec j \times \vec B = \epsilon_0[\vec E(\vec\nabla\cdot\vec E) - \vec E\times(\vec \nabla\times\vec E)] + {1 \over \mu_0}[\vec B(\vec\nabla\cdot\vec B) - \vec B\times(\vec \nabla\times\vec B)] - \epsilon_0{\partial \over \partial t}(\vec E \times \vec B)$$
利用前面的公式，将上式变形为
$$\vec E\rho + \vec j \times \vec B = \epsilon_0[\vec E(\vec\nabla\cdot\vec E) + (\vec E\cdot\vec \nabla)\vec E -  {1\over 2}\vec\nabla\vec E^2] + {1 \over \mu_0}[\vec B(\vec\nabla\cdot\vec B) + (\vec B\cdot\vec \nabla)\vec B -  {1\over 2}\vec\nabla\vec B^2]  - \epsilon_0{\partial \over \partial t}(\vec E \times \vec B)$$
如果使用张量记号，上式可化简为
$$\vec E\rho + \vec j \times \vec B = \vec\nabla\cdot[\epsilon_0(E_aE_b - {1\over 2}\delta_{ab}E^2) + {1\over \mu_0}(B_aB_b - {1\over 2}\delta_{ab}B^2)]- \epsilon_0{\partial \over \partial t}(\vec E \times \vec B)$$
引入麦克斯韦应力张量
$$\sigma_{ab} := \epsilon_0(E_aE_b - {1\over 2}\delta_{ab}E^2) + {1\over \mu_0}(B_aB_b - {1\over 2}\delta_{ab}B^2)$$
就有
$$\iiint(\rho\rm dV)(\vec E + \vec u \times \vec B) = -{\rm d \over \rm dt}\iiint\epsilon_0(\vec E \times \vec B)\rm dV + \oiint \sigma_{ab}\cdot\rm d\vec S$$
物理上称$\epsilon_0(\vec E \times \vec B)$为电磁场的动量密度，$\sigma_{ab}$为电磁场的动量流密度张量。
## 能动张量
能动张量是一个二阶张量$T_{ab}$，用来描述4-动量的$a$分量通过$b$坐标平面的通量。其中$T_{00}$代表能量密度，$T_{0i}$代表能量通过$i$坐标平面的通量，它等于$T_{i0}$即动量的第$i$分量之密度。而$T_{ij}$就是动量的第$i$分量通过$j$坐标平面的通量，也就是动量流密度。具体到电磁场，其分量如下
$$T_{\mu\nu} = \begin{bmatrix}
\frac{1}{2}(\epsilon_0E^2 + \frac{1}{\mu_0}B^2) & \frac{S_x}{c} & \frac{S_y}{c} & \frac{S_z}{c} \\
\frac{S_x}{c} & -\sigma_{xx} & -\sigma_{xy} & -\sigma_{xz} \\
\frac{S_y}{c} & -\sigma_{yx} & -\sigma_{yy} & -\sigma_{yz} \\
\frac{S_z}{c} & -\sigma_{zx} & -\sigma_{zy} & -\sigma_{zz}
\end{bmatrix} = -\frac{1}{2\mu_0}(F_{\mu\sigma}F^\sigma{}_\nu + {}^*F_{\mu\sigma}{}^*F^\sigma{}_\nu)$$
可以看出电磁能动张量$T$是对称的无迹($T^a{}_a = 0$)张量。使用该张量，前述两个积分等式可以简洁地表述为
$$T^{ab}{}_{,b} + F^{ab}J_b = 0$$
其中$F^{ab}J_b$为4-洛伦兹力密度。能量动量守恒定律也可借此表述为
$$T^{ab}{}_{,b} = 0$$
能动张量在广义相对论中具有重要作用。