@[TOC](电动力学)

# 基本定义
电流定义为电荷的变化率
$$I = \frac{dq}{dt}$$
电荷密度
$$\rho = \frac{q}{V}$$
电流密度
$$j = \frac{I}{S}$$
连续方程
$$\oiint j\cdot dS = -\frac{dq}{dt}$$
其微分形式为
$$\nabla\cdot j = -\frac{\partial\rho}{\partial t}$$
# 基本方程
## 库伦定律
$$F_c = k_c \frac{qq'}{r^2}$$
电场强度
$$E = \frac{F_c}{q'} = k_c \frac{q}{r^2}$$
考虑$E$在球壳上的积分
$$\oiint E\cdot dS = 4\pi r^2k_c \frac{q}{r^2} = 4\pi k_c\iiint\rho dV$$
而根据高斯公式
$$\oiint E\cdot dS = \iiint\nabla\cdot EdV$$
所以有
$$\nabla\cdot E = 4\pi k_c\rho$$
## 安培定律
两根距离为$d$平行导线，其中一根在单位长度上受到的作用力为
$$\frac{dF_a}{dl} = 2k_a\frac{II'}{d}$$
这里系数前面的$2$只是为了方便而引入。对比库伦定律和安培定律，容易看出$k_c / k_a$的量纲为速度平方的量纲。通过实验测量可以得到$k_c / k_a = c^2$.

磁感应强度定义为单位电流对上式的贡献(乘一个系数$\alpha$)
$$B = 2k_a\alpha\frac{I}{d}$$
这里也可以算出$E / B$的量纲为速度除以$\alpha$的量纲。考虑$B$在以其中一根导线为圆心，$d$为半径的圆周上的积分
$$\oint Bdl = 2k_a\alpha\frac{I}{d}2\pi d = 4\pi k_a\alpha\iint jdS$$
而根据斯托克斯定理
$$\oint Bdl = \iint\nabla\times BdS$$
于是
$$\nabla\times B = 4\pi k_a\alpha j$$
旋度的散度为零，因此$\nabla\cdot j = 0$. 而电流密度$j_q$满足连续性方程，一般情况下不满足$\nabla\cdot j_q = 0$. 于是考虑将$j$分解为两项之和，$j = j_q + j_d$，结合前述两条件就有
$$\nabla\cdot j_d = \frac{d\rho}{dt}$$
写成积分形式就是
$$\oiint j_d\cdot dS = \frac{dq}{dt}$$
将$\frac{\partial E}{\partial t}$代入上式就有
$$4\pi r^2j_d = \frac{r^2}{k_c}\frac{\partial E}{\partial t}$$
于是
$$\nabla\times B = 4\pi k_a\alpha j_q + \frac{k_a}{k_c}\alpha\frac{\partial E}{\partial t}$$
## 法拉第定律
$$\nabla\times E = -k_f\frac{\partial B}{\partial t}$$

## 磁荷不存在
$$\nabla\cdot B = 0$$

# 麦克斯韦方程组
综上所述，我们现在就可以写出著名的麦克斯韦方程组
$$\left\{\begin{aligned}
& \nabla\cdot E = 4\pi k_c\rho \\
& \nabla\times B = 4\pi k_a\alpha j_q + \frac{k_a}{k_c}\alpha\frac{\partial E}{\partial t} \\
& \nabla\times E = -k_f\frac{\partial B}{\partial t} \\
& \nabla\cdot B = 0
\end{aligned}\right .$$
因为$\nabla\times(\nabla\times E) = \nabla(\nabla\cdot E) - \nabla^2E = -k_f\frac{\partial}{\partial t}(\nabla\times B)$，对于无源场有$\nabla\cdot E = 0$以及$\nabla\times B = \frac{k_a}{k_c}\alpha\frac{\partial E}{\partial t}$，代入前式就有
$$\nabla^2E = \frac{\alpha k_ak_f}{k_c}\frac{\partial^2E}{\partial t^2}$$
这是波动方程，而$\frac{\alpha k_ak_f}{k_c}$就是波速平方的倒数。实验测得该数值为$\frac{1}{c^2}$，结合前面的实验数据就有$\alpha k_f = 1$. 于是麦克斯韦方程就可以简化为
$$\left\{\begin{aligned}
& \nabla\cdot E = 4\pi c^2k_a\rho \\
& \nabla\times E = -k_f\frac{\partial B}{\partial t} \\
& \nabla\times B = 4\pi \frac{k_a}{k_f}j_q + \frac{1}{c^2k_f}\frac{\partial E}{\partial t} \\
& \nabla\cdot B = 0
\end{aligned}\right .$$
## 介质中的麦克斯韦方程组
我们定义介质中的场强如下
$$
D = \epsilon_0E + aP \\
H = \frac{1}{\mu_0}B - bM
$$
其中$P$为电偶极矩贡献的电极化强度，对电场有增强作用；$M$为磁矩贡献的磁化强度，对磁场有削弱作用。要求$a, b$为无量纲值，这样可确保$D$与$P$，$H$与$M$量纲一致。$\epsilon_0$称为真空电容率，$\mu_0$称为真空导磁率。于是我们得到介质中的麦克斯韦方程组
$$\left\{\begin{aligned}
& \nabla\cdot D = 4\pi c^2k_a\epsilon_0\rho \\
& \nabla\times E = -k_f\frac{\partial B}{\partial t} \\
& \nabla\times H = 4\pi \frac{k_a}{\mu_0k_f}j_q + \frac{1}{\mu_0\epsilon_0c^2k_f}\frac{\partial D}{\partial t} \\
& \nabla\cdot B = 0
\end{aligned}\right .$$
# 电磁单位制
## 国际单位制
| 系数 | 值 | 量纲 |
|--|--|--|
| $k_a$ | $10^{-7}$ | $[m][l][t]^{-2}[I]^{-2}$ |
| $k_f$ | $1$ | $1$ |
| $\epsilon_0$ | $\frac{10^7}{4\pi c^2}$ | $[m]^{-1}[l]^{-3}[t]^4[I]^2$ |
| $\mu_0$ | $4\pi\times 10^{-7}$ | $[m][l][t]^{-2}[I]^{-2}$ |
| $a$ | $1$ | $1$ |
| $b$ | $1$ | $1$ |

此时
$$
D = \epsilon_0E + P \\
H = \frac{1}{\mu_0}B - M
$$
$E / B$的量纲为速度的量纲。而麦克斯韦方程组表现为
$$\left\{\begin{aligned}
& \nabla\cdot E = \frac{1}{\epsilon_0}\rho \\
& \nabla\times E = -\frac{\partial B}{\partial t} \\
& \nabla\times B = \mu_0(j_q + \epsilon_0\frac{\partial E}{\partial t}) \\
& \nabla\cdot B = 0
\end{aligned}\right .$$
以及
$$\left\{\begin{aligned}
& \nabla\cdot D = \rho \\
& \nabla\times E = -\frac{\partial B}{\partial t} \\
& \nabla\times H = j_q + \frac{\partial D}{\partial t} \\
& \nabla\cdot B = 0
\end{aligned}\right .$$

## 高斯单位制
| 系数 | 值 | 量纲 |
|--|--|--|
| $k_a$ | $c^{-2}$ | $[c]^{-2}$ |
| $k_f$ | $c^{-1}$ | $[c]^{-1}$ |
| $\epsilon_0$ | $1$ | $1$ |
| $\mu_0$ | $1$ | $1$ |
| $a$ | $4\pi$ | $1$ |
| $b$ | $4\pi$ | $1$ |

此时
$$
D = E + 4\pi P \\
H = B - 4\pi M
$$
$E / B$的量纲为$1$。而麦克斯韦方程组表现为
$$\left\{\begin{aligned}
& \nabla\cdot E = 4\pi\rho \\
& \nabla\times E = -\frac{1}{c}\frac{\partial B}{\partial t} \\
& \nabla\times B = \frac{1}{c}(4\pi j_q + \frac{\partial E}{\partial t}) \\
& \nabla\cdot B = 0
\end{aligned}\right .$$
