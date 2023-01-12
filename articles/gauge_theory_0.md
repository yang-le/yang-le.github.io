@[TOC](规范场论初步)

# 规范场论初步
## 整体规范不变性
整体规范变换是指不依赖时空坐标的变换。
### 变换群是阿贝尔群的情况
在标量场的规范变换
$$\phi(\theta) = \mathrm e^{-iq\theta}\phi_0, ~ \bar\phi(\theta) = \mathrm e^{iq\theta}\bar\phi_0$$
下，拉格朗日密度不变。也就是说，对于
$$\mathscr L = -[(\partial^a\bar\phi)\partial_a\phi + m^2\phi\bar\phi]$$
有
$$0 = \frac{d\mathscr L}{d\theta} = \frac{\partial \mathscr L}{\partial \phi}\frac{d\phi}{d\theta} + \frac{\partial \mathscr L}{\partial(\partial_a\phi)}\frac{d(\partial_a\phi)}{d\theta} + \frac{\partial \mathscr L}{\partial \bar\phi}\frac{d\bar\phi}{d\theta} + \frac{\partial \mathscr L}{\partial(\partial_a\bar\phi)}\frac{d(\partial_a\bar\phi)}{d\theta}$$
容易验证其中$\frac{d\phi}{d\theta} = -iq\phi, ~ \frac{d(\partial_a\phi)}{d\theta} = -iq\partial_a\phi$，再代入拉格朗日方程就得到
$$\frac{d\mathscr L}{d\theta} = -iq\partial_a[\phi\frac{\partial \mathscr L}{\partial(\partial_a\phi)} - \bar\phi\frac{\partial \mathscr L}{\partial(\partial_a\bar\phi)}] = iq\partial_a(\phi\partial^a\bar\phi - \bar\phi\partial^a\phi)$$
记
$$J^a = ieq(\phi\partial^a\bar\phi - \bar\phi\partial^a\phi)$$
则有$0 = \partial_aJ^a$，可见$J^a$就是对应的守恒流。
所有这样的变换的集合$\{\mathrm e^{-iq\theta} | \theta \in \R \}$是酉群$U(1)$，显然是阿贝尔群。
### 变换群是非阿贝尔群的情况
考虑同位旋变换
$$\begin{bmatrix}
\phi'_1 \\
\phi'_2
\end{bmatrix} = U \begin{bmatrix}
\phi_1 \\
\phi_2
\end{bmatrix}$$
其中$U$为一复矩阵，$\phi = \begin{bmatrix}
\phi_1 \\
\phi_2
\end{bmatrix}$为核子的同位旋态波函数。在改变换下，系统的拉格朗日量仍是不变的。由归一化条件$\phi^\dagger\phi = 1 = \phi'^\dagger\phi' = (U\phi)^\dagger(U\phi) = \phi^\dagger U^\dagger U\phi$，这就要求$U^\dagger U = I$，所以$U \in U(2)$是酉群，但$U(2)$是非阿贝尔的。又$1 = \det(I) = \det(U^\dagger U) = |\det U|^2$，所以$\det U = \mathrm e^{i\alpha}, ~ \alpha \in \R$. 以下为讨论方便起见，我们假定$\det U = 1$，于是$U \in SU(2)$，这不会影响问题的实质。注意到$SU(2)$的群元可由其李代数$\mathfrak{su}(2)$的指数映射给出，即
$$U(\vec\theta) = \mathrm e^{-\frac{i}{2}\vec\tau\cdot\vec\theta}$$
其中$\vec\tau$为三个泡利矩阵，$\vec\theta \in \R^3$为三个实系数。
一般来说，规范场论总是涉及一个李群（内部变换群）$G$和一个（或多个）矩阵李群$\hat G$，且$\rho \colon G \to \hat G$是$G$的表示。群元$g \in G$总可以借指数映射表示为
$$g = \exp(\theta^\mu e_\mu)$$
其中$e_\mu$是李代数$\mathfrak g$的一组基矢，$\theta^\mu$为对应的实系数。以$V$代表$\rho$的表示空间，$\dim V = N$，则$\hat G$中的元素就可以表示为$N \times N$的矩阵。以$\mathfrak{\hat g}$代表$\hat G$的李代数，则同态$\rho$在恒等元$e \in G$处的推前映射$\rho_* \colon \mathfrak g \to \mathfrak{\hat g}$是李代数同态。记$U(\vec\theta) = \rho(g) \in \hat G$，则有
$$U(\vec\theta) = \exp[\rho_*(\theta^\mu e_\mu)] = \exp(\theta^\mu\rho_*e_\mu)$$
我们引入记号$-iL_\mu \equiv \rho_*e_\mu \in \mathfrak{\hat g}$，就有
$$U(\vec\theta) = \mathrm e^{-iL_\mu\theta^\mu}$$
相应的规范变换就推广为
$$\phi = U(\vec\theta)\phi_0, ~ \bar\phi = \bar\phi_0U(\vec\theta)^{-1}$$
注意阿贝尔群的情况是现在情况的特例，只要令$\vec L = q$就回到阿贝尔群的情况。
规范变换的例子有
李群     | 表示空间维度 | 物理含义
-------- | -----| -----
$U(1)$| 1 | 电荷守恒
$SU(2)$  | 2 | 核子同位旋守恒
$SU(2)$  | 3 | $\pi$介子($\pi^+, \pi^-, \pi^0$)
$SU(3)$  | 3 | 夸克的味(u, d, s)
## 局域规范不变性
局域性原理认为一个特定物体只能与其周围的物质发生相互作用，这导致我们考虑变换的参数$\theta$依赖时空坐标的情况。
### 变换群是阿贝尔群的情况
如果变换参数$\theta$依赖时空坐标$x$，那么容易看出此时的拉格朗日密度$\mathscr L_0 = -[(\partial^\mu\bar\phi)\partial_\mu\phi + m^2\phi\bar\phi]$在如下的局域规范变换下
$$\phi(x) = \mathrm e^{-iq\theta(x)}\phi_0(x), ~ \bar\phi(x) = \mathrm e^{iq\theta(x)}\bar\phi_0(x)$$
无法再保持不变。实际上
$$\partial_\mu\phi(x) = \mathrm e^{-iq\theta(x)}\partial_\mu\phi_0(x) - iq\phi(x)\partial_\mu\theta(x) \\
\partial^\mu\bar\phi(x) = \mathrm e^{iq\theta(x)}\partial^\mu\bar\phi_0(x) + iq\bar\phi(x)\partial^\mu\theta(x) $$
解决此问题的办法是修改拉格朗日密度为
$$\mathscr L_1 = -[(\overline{D^\mu\phi})D_\mu\phi + m^2\phi\bar\phi]$$
其中
$$D_a = \partial_a - ieqA_a$$
称为协变导数算符，基本电荷$e$在这里作为耦合常数。在容易看出，为了保证拉格朗日密度在局域规范变换下的不变性，我们需要有
$$D_\mu'\phi(x) = (\partial_a - ieqA'_\mu)\phi(x) = \mathrm e^{-iq\theta(x)}D_\mu\phi_0(x)$$
这就要求
$$A'_\mu = A_\mu - \frac{1}{e}\partial_\mu\theta(x)$$
而这不过就是电磁4势的规范变换式。从物理角度考虑，既然复标量粒子带电，我们就需要考虑其与电磁场耦合后的总拉格朗日密度
$$\mathscr L = \mathscr L_0 + \mathscr L_{int} + \mathscr L_{EM} = \mathscr L_1 + \mathscr L_{EM}$$
其中$\mathscr L_{EM} = -\frac{1}{16\pi}F^{\mu\nu}F_{\mu\nu}$是电磁场，$\mathscr L_{int} = J^\mu A_\mu - e^2q^2\phi(x)\bar\phi(x)A^\mu A_\mu$表示$\phi$与电磁场的相互作用对整体拉格朗日密度的贡献。因为$\frac{\partial\mathscr L}{\partial \bar\phi} = -(ieqA_\mu\partial^\mu\phi + e^2q^2A_\mu A^\mu\phi + m^2\phi), ~ \frac{\partial\mathscr L}{\partial(\partial_\mu\bar\phi)} = ieqA^\mu\phi - \partial^\mu\phi$，$\mathscr L$对$\bar\phi$的拉格朗日方程就给出
$$[(D^\mu\phi)D_\mu\phi - m^2]\phi = 0$$
当$A^\mu = 0$时这就回到Klein-Gordon方程。又$\frac{\partial\mathscr L}{\partial A_\mu} = ieq\phi\partial^\mu\bar\phi - ieq\bar\phi\partial^\mu\phi - 2e^2q^2A^\mu\phi\bar\phi, ~ \frac{\partial\mathscr L}{\partial(\partial_\nu A_\mu)} = -\frac{1}{4\pi}(\partial^\nu A^\mu - \partial^\mu A^\nu)$，并注意到$\partial_\nu A^\nu = 0$. [如果$\partial_\nu A^\nu \ne 0$，我们可以选择这样的参数$\theta$，使得$\partial_\nu(A^\nu - \partial^\nu\theta) = 0$]。$\mathscr L$对$A_\mu$的拉格朗日方程就给出
$$\partial_\nu\partial^\nu A^\mu = 4\pi[-ieq(\phi\partial^\mu\bar\phi - \bar\phi\partial^\mu\phi) + 2e^2q^2\phi\bar\phi A^\mu] = -4\pi ieq(\phi\overline{D^\mu\phi} - \bar\phi D^\mu\phi)$$
记
$$J_A^\mu = ieq(\phi\overline{D^\mu\phi} - \bar\phi D^\mu\phi)$$
就容易看出$\partial_\mu J_A^\mu = -\frac{1}{4\pi}\partial_\nu\partial^\nu\partial_\mu A^\mu = 0$，因此$J_A^\mu$是现在的新的守恒流。
### 变换群是非阿贝尔群的情况
以下将把上述讨论推广到非阿贝尔群的情况。此时局域规范变换是
$$\phi(x) = U(\vec\theta(x))\phi_0(x), ~ \bar\phi(x) = \bar\phi_0(x)U(\vec\theta(x))^{-1}$$
前述讨论的推广概述有二：
1. 多分量复粒子场$\phi(x)$也伴有$R = \dim G$（$G$为内部变换群）个附加场，称为规范场或杨-米尔斯场，相应地有$R$个规范4势，是闵可夫斯基时空中的$R$个余矢场$\{A^r_a \mid  r = 1, \dots, R \}$，其分量记作$A^r_\mu(x)$.
2. 全系统的总拉格朗日密度$\mathscr L$也可表为
$$\mathscr L = \mathscr L_1 + \mathscr L_{YM}$$
其中$\mathscr L_{YM}$是杨-米尔斯场的拉格朗日密度，$\mathscr L_1$则取如下形式
$$\mathscr L_1 = \mathscr L_0(\phi(x), D_\mu\phi(x); \bar\phi(x), \overline{D_\mu\phi(x)})$$
其中协变导数算符$D_\mu$的定义为
$$D_\mu = \partial_\mu - ikL_rA^r_\mu(x)$$
这里耦合常数取$k$.

我们当然希望$D_\mu$仍能够按照如下方式变换，即
$$D_\mu'\phi(x) = U(\vec\theta(x))D_\mu\phi_0(x)$$
这将保证$\mathscr L_1$的规范不变性，展开上式左边得到
$$\begin{aligned}
D_\mu'\phi(x) &= \partial_\mu[U(\vec\theta(x))\phi_0(x)] - ikL_rA'^r_\mu(x)U(\vec\theta(x))\phi_0(x) \\
&= \phi_0(x)\partial_\mu U(\vec\theta(x)) + U(\vec\theta(x))\partial_\mu\phi_0(x) - ikL_rA'^r_\mu(x)U(\vec\theta(x))\phi_0(x)
\end{aligned}$$
而上式右边是
$$U(\vec\theta(x))D_\mu\phi_0(x) = U(\vec\theta(x))\partial_\mu\phi_0(x) - ikU(\vec\theta(x))L_rA^r_\mu(x)\phi_0(x)$$
于是只要下式成立
$$\phi_0(x)\partial_\mu U(\vec\theta(x)) - ikL_rA'^r_\mu(x)U(\vec\theta(x))\phi_0(x) = - ikU(\vec\theta(x))L_rA^r_\mu(x)\phi_0(x)$$
即
$$- iL_rA'^r_\mu(x) = - iU(\vec\theta(x))L_rA^r_\mu(x)U^{-1}(\vec\theta(x)) - \frac{1}{k}[\partial_\mu U(\vec\theta(x))]U^{-1}(\vec\theta(x))$$
记$\hat A_\mu(x) = - iL_rA^r_\mu(x)$，上式还可以简化为
$$\hat A'_\mu(x) = U(\vec\theta(x))\hat A_\mu(x)U^{-1}(\vec\theta(x)) - \frac{1}{k}[\partial_\mu U(\vec\theta(x))]U^{-1}(\vec\theta(x))$$
从而当$U(\vec\theta(x)) = \mathrm e^{-iq\theta(x)}$时，上式就回到$A'_\mu = A_\mu - \frac{1}{e}\partial_\mu\theta(x)$
我们还需要给出$\mathscr L_{YM}$的定义，为此可以仿照$\hat A_\mu(x)$，记$\hat F_{\mu\nu}(x) = -iL_rF^r_{\mu\nu}(x)$，并定义
$$\hat F_{\mu\nu}(x) = \partial_\mu\hat A_\nu(x) - \partial_\nu\hat A_\mu(x) + k[\hat A_\mu(x), \hat A_\nu(x)]$$
其中$[\hat A_\mu(x), \hat A_\nu(x)]$是李代数元$\hat A_\mu(x), ~ \hat A_\nu(x)$的李括号。这等价于是说
$$F^r_{\mu\nu}(x) = \partial_\mu A^r_\nu(x) - \partial_\nu  A^r_\mu(x) + kC^r_{st}A^s_\mu(x)A^t_\nu(x)$$
其中$C^r_{st}$是$G$的李代数$\mathfrak g$在基底$\{e_r\}$下的结构常数，$r, s, t = 1, \dots, R$. 可以证明，$\hat F_{\mu\nu}(x)$的变换关系为
$$\hat F'_{\mu\nu}(x) = U(\vec\theta(x))\hat F_\mu(x)U^{-1}(\vec\theta(x))$$
现在$\mathscr L_{YM}$就定义为
$$\mathscr L_{YM} = -\frac{1}{16\pi}\sum^R_{r = 1}F^r_{\mu\nu}(x)F^{r\mu\nu}(x)$$
可以证明该拉格朗日量是规范不变的。