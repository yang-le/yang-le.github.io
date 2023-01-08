@[TOC](黎曼曲率张量漫谈)

# 黎曼曲率张量漫谈

## 导数算符
称从$(k, l)$型张量场到$(k, l + 1)$型张量场的映射$\nabla$为(无挠)导数算符，如果它满足如下条件：
1. 具有线性性
2. 满足莱布尼兹率
3. 与张量积可交换
4. $v(f) = v^a\nabla_af$
5. 无挠性： $\nabla_a\nabla_bf = \nabla_b\nabla_af$

根据$df$的定义$df(v) = v(f)$不难看出，$\nabla_af = (df)_a$. 于是对于$(0, 0)$型张量场来说，不同的导数算符的作用结果是一样的，$\tilde\nabla_a(f) = \nabla_af = (df)_a$. 对于$(0, 1)$型张量场来说，通常不同的导数算符作用的结果不一样，但我们可以考虑两导数算符的差，这表现为一个$(1, 2)$型张量即$(\tilde\nabla_a - \nabla_a)\omega_b = C^c{}_{ab}\omega_c$，于是有
$$\nabla_a\omega_b = \tilde\nabla_a\omega_b - C^c{}_{ab}\omega_c$$
另外根据导数算符的无挠性，容易证明$C$的如下对称性
$$C^c{}_{ab} = C^c{}_{ba}$$
对于$(1, 0)$型张量场，我们考虑式子$\nabla_a(\omega_bv^b) = \omega_b\nabla_av^b + v^b\nabla_a\omega_b = \omega_b\nabla_av^b + v^b(\tilde\nabla_a\omega_b - C^c{}_{ab}\omega_c)$，另一方面$\tilde\nabla_a(\omega_bv^b) = \omega_b\tilde\nabla_av^b + v^b\tilde\nabla_a\omega_b$. 由这两式相等我们就得到$\omega_b\nabla_av^b = \omega_b\tilde\nabla_av^b + C^c{}_{ab}v^b\omega_c = \omega_b\tilde\nabla_av^b + C^b{}_{ac}v^c\omega_b$，于是
$$\nabla_av^b = \tilde\nabla_av^b + C^b{}_{ac}v^c$$
类似地，$\nabla_a$与$\tilde\nabla_a$之差作用于任一$(k, l)$型张量场$T$的结果可以表示为$k + l$项，每项都含有$C^c{}_{ab}$，与$T$的上指标缩并的$k$项前面为$+$号，与$T$的下指标缩并的$l$项前面为$-$号。
### Christoffel符号
考虑对坐标$x^\mu$求偏导数的算符$\partial_\mu$，它虽然可以看作$\tilde\nabla_a$的特例，但其定义依赖于坐标系。我们把与坐标系无关的那些$\tilde\nabla_a$称为协变导数算符，$\partial_\mu$显然不在此列。类似地，体现$\nabla_a$与$\partial_a$区别的张量场$C^c{}_{ab}$称为$\nabla_a$在该坐标系的Christoffel符号，记作$\Gamma^c{}_{ab}$. 我们有
$$v^\nu{}_{;\mu} = v^\nu{}_{,\mu} + \Gamma^\nu{}_{\mu\sigma}v^\sigma, ~ \omega_{\nu;\mu} = \omega_{\nu,\mu} - \Gamma^\sigma{}_{\mu\nu}\omega_\sigma$$
其中逗号表示求偏导数，分号表示求协变导数。
### 与度规适配的导数算符
导数算符$\nabla_a$称为与$g_{bc}$相适配的，如果$\nabla_ag_{bc} = 0$. 可以证明，这样的$\nabla_a$是唯一的。为此，我们可以展开$\nabla_ag_{bc}$，即
$$\nabla_ag_{bc} = \tilde\nabla_ag_{bc} - C^d{}_{ab}g_{dc} - C^d{}_{ac}g_{bd} = \tilde\nabla_ag_{bc} - C_{cab} - C_{bac}$$
故由$\nabla_ag_{bc} = 0$得
$$C_{cab} + C_{bac} = \tilde\nabla_ag_{bc}$$
同理
$$C_{cba} + C_{abc} = \tilde\nabla_bg_{ac} \\ C_{bca} + C_{acb} = \tilde\nabla_cg_{ab}$$
前两式相加减第三式，并注意到$C_{cab} = C_{cba}$得
$$2C_{cab} = \tilde\nabla_ag_{bc} + \tilde\nabla_bg_{ac} - \tilde\nabla_cg_{ab}$$
于是
$$C^c{}_{ab} = \frac{1}{2}g^{cd}(\tilde\nabla_ag_{bd} + \tilde\nabla_bg_{ad} - \tilde\nabla_dg_{ab})$$
假设$\nabla'_a$也满足$\nabla'_ag_{bc} = 0$，代入上式就有$C^c{}_{ab} = 0$，这说明$\nabla'_a$和$\nabla_a$没有区别。


## 黎曼曲率张量
导数算符$\nabla_a$的黎曼曲率张量场$R_{abc}{}^d$由下式定义
$$(\nabla_a\nabla_b - \nabla_b\nabla_a)\omega_c = R_{abc}{}^d\omega_d$$
由此定义可以看出，欧氏空间和闵氏空间的黎曼曲率张量场为零。黎曼张量场为零的度规称为平直度规，欧式空间和闵氏空间都称为平直空间。

使用与[导数算符](#导数算符)小节中同样的讨论方法，不难证明
$$(\nabla_a\nabla_b - \nabla_b\nabla_a)v^c = -R_{abd}{}^cv^d$$
以及其对张量的对应结论，即导数算符$\nabla_a$的对易子$(\nabla_a\nabla_b - \nabla_b\nabla_a)$作用于任一$(k, l)$型张量场$T$的结果可以表示为$k + l$项，每项都含有$R_{abc}{}^d$，与$T$的上指标缩并的$k$项前面为$-$号，与$T$的下指标缩并的$l$项前面为$+$号。

黎曼曲率张量有以下性质：
1. $R_{abc}{}^d = -R_{bac}{}^d$
2. 循环恒等式：$R_{[abc]}{}^d = 0$
3. 比安基恒等式：$\nabla_{[a}R_{bc]d}{}^e = 0$

如果存在度规场$g_{ab}$满足$\nabla_ag_{bc} = 0$，则可定义$R_{abcd} \equiv g_{de}R_{abc}{}^e$，且$R_{abcd}$还满足

4. $R_{abcd} = -R_{abdc}$
5. $R_{abcd} = R_{cdab}$

通常来说，$n$维空间中黎曼曲率张量的分量共有$n^4$个。但由于上述性质，其中独立的分量个数仅为$\frac{n^2(n^2 - 1)}{12}$个。

### 里奇张量
黎曼曲率张量可以通过缩并求迹，原则上应该有$\binom{4}{2} = 6$个迹，但同样由于上述性质，其中只有$1$个独立，我们称这个迹$R_{ac} \equiv R_{abc}{}^b$为里奇张量。容易证明$R_{ac} = R_{ca}$. 里奇张量还可以借助度规再求迹，我们称为标量曲率$R \equiv g^{ac}R_{ac}$.

### 外尔张量
对于维数$n \ge 3$的广义黎曼空间，外尔张量$C_{abcd}$是黎曼曲率张量的无迹部分，定义如下
$$C_{abcd} = R_{abcd} - \frac{2}{n - 2}(g_{a[c}R_{d]b} - g_{b[c}R_{d]a}) + \frac{2}{(n - 1)(n - 2)}Rg_{a[c}g_{d]b}$$
外尔张量有如下性质：
$$C_{abcd} = -C_{bacd} = -C_{abdc} = C_{cdab}, ~ C_{[abc]d} = 0$$

### 爱因斯坦张量
有了里奇张量和标量曲率，我们就可以定义爱因斯坦张量
$$G_{ab} \equiv R_{ab} - \frac{1}{2}Rg_{ab}$$
可以证明，$G_{ab}$满足如下性质
$$g^{ac}\nabla_cG_{ab} = 0$$

## 计算黎曼曲率张量
### 用度规计算
根据与度规适配的导数算符的性质，有
$$\Gamma^\sigma{}_{\mu\nu} = \frac{1}{2}g^{\sigma\rho}(g_{\rho\mu,\nu} + g_{\nu\rho,\mu} - g_{\mu\nu,\rho})$$
$\Gamma^\sigma{}_{\mu\nu}$应有$n^3$个分量，但由于$\Gamma^\sigma{}_{\mu\nu} = \Gamma^\sigma{}_{\nu\mu}$，这些分量中只有$\frac{n^2(n + 1)}{2}$个独立。

由黎曼张量的定义$R_{abc}{}^d\omega_d = 2\nabla_{[a}\nabla_{b]}\omega_c$，我们将等号右边展开，因为
$$\begin{aligned}
\nabla_a(\nabla_b\omega_c) &= \partial_a(\nabla_b\omega_c) - \Gamma^d{}_{ab}\nabla_d\omega_c - \Gamma^d{}_{ac}\nabla_b\omega_d \\
&= \partial_a(\partial_b\omega_c - \Gamma^e{}_{bc}\omega_e) - \Gamma^d{}_{ab}\nabla_d\omega_c - \Gamma^d{}_{ac}(\partial_b\omega_d - \Gamma^e{}_{bd}\omega_e) \\
&= \partial_a\partial_b\omega_c - \Gamma^e{}_{bc}\partial_a\omega_e - \omega_e\partial_a\Gamma^e{}_{bc} - \Gamma^d{}_{ab}\nabla_d\omega_c - \Gamma^d{}_{ac}\partial_b\omega_d + \Gamma^d{}_{ac}\Gamma^e{}_{bd}\omega_e
\end{aligned}$$
对$a,b$取反称化，并注意到$\partial_{[a}\partial_{b]}\omega_c = 0, \Gamma^d{}_{[ab]} = \Gamma^d{}_{[(ab)]} = 0$，便得
$$\begin{aligned}
R_{abc}{}^d\omega_d &= 2(- \Gamma^e{}_{c[b}\partial_{a]}\omega_e - \omega_e\partial_{[a}\Gamma^e{}_{b]c} - \Gamma^d{}_{c[a}\partial_{b]}\omega_d + \Gamma^d{}_{c[a}\Gamma^e{}_{b]d}\omega_e) \\
&= -2\omega_e\partial_{[a}\Gamma^e{}_{b]c} + 2\Gamma^d{}_{c[a}\Gamma^e{}_{b]d}\omega_e
\end{aligned}$$
故
$$R_{abc}{}^d = -2\partial_{[a}\Gamma^d{}_{b]c} + 2\Gamma^e{}_{c[a}\Gamma^d{}_{b]e}$$
其坐标分量为
$$R_{\mu\nu\sigma}{}^\rho = \Gamma^\rho{}_{\mu\sigma,\nu} - \Gamma^\rho{}_{\nu\sigma,\mu} + \Gamma^\lambda{}_{\sigma\mu}\Gamma^\rho{}_{\nu\lambda} - \Gamma^\lambda{}_{\sigma\nu}\Gamma^\rho{}_{\mu\lambda}$$
进而可以得到里奇张量的坐标分量表达式为
$$R_{\mu\sigma} =R_{\mu\nu\sigma}{}^\nu = \Gamma^\nu{}_{\mu\sigma,\nu} - \Gamma^\nu{}_{\nu\sigma,\mu} + \Gamma^\lambda{}_{\sigma\mu}\Gamma^\nu{}_{\nu\lambda} - \Gamma^\lambda{}_{\sigma\nu}\Gamma^\nu{}_{\mu\lambda} $$
#### 关于缩并Christoffel符号
计算中经常遇到如$\Gamma^\mu{}_{\mu\sigma}$这样的表达式，下面简单介绍相关结果。首先
$$\Gamma^\mu{}_{\mu\sigma} = \frac{1}{2}g^{\mu\rho}(g_{\rho\mu,\sigma} + g_{\sigma\rho,\mu} - g_{\mu\sigma,\rho}) = \frac{1}{2}g^{\mu\rho}g_{\rho\mu,\sigma} + g^{\mu\rho}g_{\sigma[\rho,\mu]} = \frac{1}{2}g^{\mu\rho}g_{\rho\mu,\sigma}$$
另一方面，$g_{\mu\rho}$的行列式$g$可用其余子式$A^{\mu\rho}$展开，$g = g_{\mu\rho}A^{\mu\rho}$，而$A^{\mu\rho} = gg^{\mu\rho}$，故
$$\frac{\partial g}{\partial g_{\mu\rho}} = gg^{\mu\rho}$$
注意到
$$g_{,\sigma} = \frac{\partial g}{\partial g_{\mu\rho}}g_{\mu\rho,\sigma} = gg^{\mu\rho}g_{\mu\rho,\sigma}$$
就有
$$\Gamma^\mu{}_{\mu\sigma} = \frac{1}{2g}g_{,\sigma} = \frac{1}{\sqrt{-g}}\frac{\partial \sqrt{-g}}{\partial x^\sigma}$$
由此结果，我们就可以计算类似$\nabla_av^a = \partial_av^a + \Gamma^a{}_{ab}v^b$这样的表达式，结果就是
$$\nabla_av^a = \frac{1}{\sqrt{-g}}\frac{\partial (\sqrt{-g}v^\sigma)}{\partial x^\sigma}$$
### 用(刚性)标架计算
设$\{(e_\mu)^a\}$是任一基底场，其中第$\mu$基矢场$(e_\mu)^a$沿第$\tau$基矢场$(e_\tau)^a$的导数$(e_\tau)^b\nabla_b(e_\mu)^a$可用基底场展开：
$$(e_\tau)^b\nabla_b(e_\mu)^a = \gamma^\sigma{}_{\mu\tau}(e_\sigma)^a$$
其中展开系数$\gamma^\sigma{}_{\mu\tau}$称为联络系数。上式与对偶基矢$(e^\nu)_a$缩并给出$\gamma^\sigma{}_{\mu\tau}$的显式表达式为：
$$\gamma^\nu{}_{\mu\tau} = (e^\nu)_a(e_\tau)^b\nabla_b(e_\mu)^a$$
定义联络1形式为：
$$(\omega_\mu{}^\nu)_a = -\gamma^\nu{}_{\mu\tau}(e^\tau)^a$$
代入$\gamma^\sigma{}_{\mu\tau}$的显式表达式得
$$(\omega_\mu{}^\nu)_a = -(e^\nu)_c\nabla_a(e_\mu)^c = (e_\mu)^c\nabla_a(e^\nu)_c$$
根据楔积和外微分的定义，我们容易算出
$$\begin{aligned}
-(e^\mu)_a \wedge (\omega_\mu{}^\nu)_b &= -(e^\mu)_a \wedge [(e_\mu)^c\nabla_b(e^\nu)_c] = -2(e^\mu)_{[a}(e_\mu)^c\nabla_{b]}(e^\nu)_c \\
&= -2\delta^c{}_{[a}\nabla_{b]}(e^\nu)_c = -2\nabla_{[b}(e^\nu)_{a]} = (de^\nu)_{ab}
\end{aligned}$$
既然$(\omega_\mu{}^\nu)_b$和对偶基底$(e^\mu)_a$都是1形式，我们就可以去掉抽象下标$a$而分别记作$\omega_\mu{}^\nu$和$e^\mu$，它们之间的上述关系被称为嘉当第一结构方程：
$$de^\nu = -e^\mu \wedge \omega_\mu{}^\nu$$
定义曲率2形式为：
$$R_{ab\mu}{}^\nu = R_{abc}{}^d(e_\mu)^c(e^\nu)_d$$
去掉抽象指标可简记为$R_\mu{}^\nu$.根据$R_{abc}{}^d$的定义，有$R_{ab\mu}{}^\nu = 2(e_\mu)^c\nabla_{[a}\nabla_{b]}(e^\nu)_c$，而
$$\begin{aligned}
(e_\mu)^c\nabla_a\nabla_b(e^\nu)_c &= \nabla_a[(e_\mu)^c\nabla_b(e^\nu)_c] - [\nabla_a(e_\mu)^c]\nabla_b(e^\nu)_c \\
&=\nabla_a(\omega_\mu{}^\nu)_b - [\nabla_a(e_\mu)^c](e^\lambda)_c(e_\lambda)^d\nabla_b(e^\nu)_d \\
&= \nabla_a(\omega_\mu{}^\nu)_b + (\omega_\mu{}^\lambda)_a(\omega_\lambda{}^\nu)_b
\end{aligned}$$
因此$R_{ab\mu}{}^\nu = 2\nabla_{[a}(\omega_\mu{}^\nu)_{b]} + 2(\omega_\mu{}^\lambda)_{[a}(\omega_\lambda{}^\nu)_{b]} = (d\omega_\mu{}^\nu)_{ab} + (\omega_\mu{}^\lambda \wedge \omega_\lambda{}^\nu)_{ab}$. 这被称为嘉当第二结构方程：
$$R_\mu{}^\nu = d\omega_\mu{}^\nu + \omega_\mu{}^\lambda \wedge \omega_\lambda{}^\nu$$
根据此方程，在$\omega_\mu{}^\nu$已经求得的情况下，只要再做外微分和楔积便可求得$R_\mu{}^\nu$. 若要得到曲率的全部分量，只需用如下公式求缩并
$$R_{\rho\sigma\mu}{}^\nu = R_{ab\mu}{}^\nu(e_\rho)^a(e_\sigma)^b$$
$g_{\mu\nu}$为常数(即$\nabla_ag_{\mu\nu} = 0$)的标架称为刚性标架，对于刚性标架我们有
$$\begin{aligned}
(\omega_{\mu\nu})_a &= g_{\nu\sigma}(e_\mu)^c\nabla_a(e^\sigma)_c = (e_\mu)^c\nabla_a(e_\nu)_c \\
&= \nabla_a[(e_\mu)^c(e_\nu)_c] - (e_\nu)_c\nabla_a(e_\mu)^c = \nabla_a[g_{bc}(e_\mu)^c(e_\nu)^b] - (e_\nu)_c\nabla_a(e_\mu)^c \\
&= \nabla_ag_{\nu\mu} - (e_\nu)_c\nabla_a(e_\mu)^c = -(\omega_{\nu\mu})_a
\end{aligned}$$
这表明对刚性标架而言，联络1形式关于其编号指标$\mu, \nu$为反称，这使得独立的联络1形式的坐标分量个数从$n^2$减为$\frac{n(n - 1)}{2}$. $\omega_{\mu\nu\rho} = (\omega_{\mu\nu})_a(e_\rho)^a$在计算中的地位类似于坐标基底中的$\Gamma^\sigma{}_{\nu\tau}$，被称为里奇旋转系数，也有$n^3$个分量，但只有$\frac{n^2(n - 1)}{2}$个独立，少于$\Gamma^\sigma{}_{\nu\tau}$的$\frac{n^2(n + 1)}{2}$.

下面我们引入符号:
$$\Lambda_{\mu\nu\rho} = [(e_\nu)_{\lambda,\tau} - (e_\nu)_{\tau,\lambda}](e_\mu)^\lambda(e_\rho)^\tau$$
由$\Gamma^\sigma{}_{\nu\tau} = \Gamma^\sigma{}_{\tau\nu}$可得$(e_\nu)_{\lambda,\tau} - (e_\nu)_{\tau,\lambda} = (e_\nu)_{\lambda;\tau} - (e_\nu)_{\tau;\lambda}$，故
$$\begin{aligned}
\Lambda_{\mu\nu\rho} &= [\nabla_a(e_\nu)_b - \nabla_b(e_\nu)_a](\frac{\partial}{\partial x^\tau})^a(\frac{\partial}{\partial x^\lambda})^b(e_\mu)^\lambda(e_\rho)^\tau = [\nabla_a(e_\nu)_b - \nabla_b(e_\nu)_a](e_\mu)^b(e_\rho)^a \\
&= [(e_\nu)_a\nabla_b(e_\rho)^a](e_\mu)^b - [(e_\nu)_b\nabla_a(e_\mu)^b](e_\rho)^a = \omega_{\nu\rho\mu} - \omega_{\nu\mu\rho} \\
& = \omega_{\mu\nu\rho} - \omega_{\rho\nu\mu}
\end{aligned}$$
由此就不难得到$\omega_{\mu\nu\rho}$的显式表达式
$$\omega_{\mu\nu\rho} = \frac{1}{2}(\Lambda_{\mu\nu\rho} + \Lambda_{\rho\mu\nu} - \Lambda_{\nu\rho\mu})$$

### 用Newman-Penrose形式计算
本节我们使用$(+, -, -, -)$号差。设$p$是4维时空$(M, g_{ab})$的一点，$\{(e_\mu)^a\}$是$p$点的一个正交归一标架，定义$p$点的4个特殊矢量如下：
$$l^a = \frac{1}{\sqrt 2}[(e_0)^a + (e_1)^a], ~ n^a = \frac{1}{\sqrt 2}[(e_0)^a - (e_1)^a] \\
m^a = \frac{1}{\sqrt 2}[(e_2)^a + i(e_3)^a], ~ \bar m^a = \frac{1}{\sqrt 2}[(e_2)^a - i(e_3)^a]
$$
容易验证$l_al^a = n_an^a = m_am^a = \bar m_a\bar m^a = 0$，即它们都是类光矢量。这4个矢量构成$p$点的一个基底，称为$p$点的一个类光标架。以下以$\{(\varepsilon_\mu)^a\}$代表类光标架，并规定其编号为
$$(\varepsilon_1)^a = l^a, ~ (\varepsilon_2)^a = n^a, ~ (\varepsilon_3)^a = m^a, ~ (\varepsilon_4)^a = \bar m^a$$
相应的对偶基矢为
$$(\varepsilon^1)_a = n_a, ~ (\varepsilon^2)_a = l_a, ~ (\varepsilon^3)_a = -\bar m_a, ~ (\varepsilon^4)_a = -m^a$$
不难看出类光标架中任意两个基矢的内积只有以下两对非零：
$$l^an_a = 1, ~ m^a\bar m_a = -1$$
因此度规$g_{ab}$及其逆$g^{ab}$在该标架的分量$g_{\mu\nu}$和$g^{\mu\nu}$组成的矩阵为
$$(g_{\mu\nu}) = \begin{bmatrix}
0 &1 &0 &0 \\
1 &0 &0 &0 \\
0 &0 &0 &-1 \\
0 &0 &-1 &0
\end{bmatrix} = (g^{\mu\nu})$$
这表明类光标架是刚性标架。与上节类似，联络1形式可以表示为
$$(\omega_\mu{}^\nu)_a = (\varepsilon_\mu)^c\nabla_a(\varepsilon^\nu)_c$$
同样地
$$(\omega_{\mu\nu})_a = (\varepsilon_\mu)^b\nabla_a(\varepsilon_\nu)_b = -(\omega_{\nu\mu})_a$$
相应的里奇旋转系数为$\omega_{\mu\nu\rho} = (\omega_{\mu\nu})_a(\varepsilon_\rho)^a$. 黎曼曲率张量的计算过程与上节一样，只是其中的$(e_\mu)^a$现在应理解为$(\varepsilon_\mu)^a$.

由于$\varepsilon_3$和$\varepsilon_4$的共轭性，容易证明交换3、4下标就得到对应量的共轭，例如$\omega_{421} = \bar\omega_{321}, ~ \omega_{14} = \bar\omega_{13}, ~ R_{24} = \bar R_{23}$等。这导致24个复$\omega_{\mu\nu\rho}$中只有12个是独立的，以12个不带指标的希腊字母表示它们为
$$\begin{aligned}
&\kappa = -\omega_{311}, ~ \rho = -\omega_{314}, ~ &\varepsilon = \frac{1}{2}(\omega_{211} - \omega_{341}) \\
&\sigma = -\omega_{313}, ~ \mu = \omega_{243}, ~ &\gamma = \frac{1}{2}(\omega_{212} - \omega_{342}) \\
&\lambda = \omega_{244}, ~ \tau = -\omega_{312}, ~ &\alpha = \frac{1}{2}(\omega_{214} - \omega_{344}) \\
&\nu = \omega_{242}, ~ \pi = \omega_{241}, ~ &\beta = \frac{1}{2}(\omega_{213} - \omega_{343})
\end{aligned}$$
这12个希腊字母称为自旋系数。又引入4个求导符号
$$D = l^a\nabla_a, ~ \Delta = n^a\nabla_a, ~ \delta = m^a\nabla_a, ~ \bar\delta = \bar m^a\nabla_a$$
它们之间满足如下的对易关系：
$$\begin{aligned}
\Delta D-D\Delta&=(\gamma+\bar{\gamma})D+(\varepsilon+\bar{\varepsilon})\Delta-(\bar{\tau}+\pi)\delta-(\tau+\bar{\pi})\bar{\delta} \\
\delta D-D\delta&=(\bar{\alpha}+\beta-\bar{\pi})D+\kappa\Delta-(\bar{\rho}+\varepsilon-\bar{\varepsilon})\delta-\sigma\bar{\delta} \\
\delta\Delta-\Delta\delta&=-\bar{\nu}D+(\tau-\bar{\alpha}-\beta)\Delta+(\mu-\gamma+\bar{\gamma})\delta+\bar{\lambda}\bar{\delta} \\
\bar{\delta}\delta-\delta\bar{\delta}&=(\bar{\mu}-\mu)D+(\bar{\rho}-\rho)\Delta+(\alpha-\bar{\beta})\delta-(\bar{\alpha}-\beta)\bar{\delta}
\end{aligned}$$
外尔张量有10个实的独立分量，用5个复数代表，定义为
$$\Psi_0 = -C_{1313}, ~ \Psi_1 = -C_{1213}, ~ \Psi_2 = -C_{1342}, ~ \Psi_3 = -C_{1242}, ~ \Psi_4 = -C_{2424}$$
里奇张量有10个，其中$R_{11}, ~ R_{12}, ~R_{22}$显然为实数，$R_{34} = R_{43} = \bar R_{34}$也是实数，由此定义以下四个实数
$$\Phi_{00} = -\frac{1}{2}R_{11}, ~ \Phi_{11} = -\frac{1}{4}(R_{12} + R_{34}), ~ \Phi_{22} = -\frac{1}{2}R_{22}, ~ \Lambda = \frac{1}{12}(R_{12} - R_{34})$$
其余6个分量为复数，分别为
$$\Phi_{01} = -\frac{1}{2}R_{13}, ~ \Phi_{10} = -\frac{1}{2}R_{14}, ~ \Phi_{02} = -\frac{1}{2}R_{33}, ~ \Phi_{20} = -\frac{1}{2}R_{44}, ~ \Phi_{12} = -\frac{1}{2}R_{23}, ~ \Phi_{21} = -\frac{1}{2}R_{24}$$
易见$\Phi$构成一个厄米矩阵。由这些符号，我们可以写出黎曼曲率张量的分量表达式
$$\begin{aligned}
D\rho -\bar{\delta}\kappa&=(\rho^2+\sigma\bar{\sigma})+(\varepsilon+\bar{\varepsilon})\rho-\bar{\kappa}\tau-\kappa(3\alpha+\bar{\beta}-\pi)+\Phi_{00}, ~ [R_{1314}] \\
D\sigma-\delta\kappa&=(\rho+\bar{\rho})\sigma+(3\varepsilon-\bar{\varepsilon})\sigma-(\tau-\bar{\pi}+\bar{\alpha}+3\beta)\kappa+\Psi_0, ~ [R_{1313}] \\
D\tau-\Delta\kappa&=(\tau+\bar{\pi})\rho+(\bar{\tau}+\pi)\sigma+(\varepsilon-\bar{\varepsilon})\tau-(3\gamma+\bar{\gamma})\kappa+\Psi_1+\Phi_{01}, ~ [R_{1312}] \\
D\alpha-\bar{\delta}\varepsilon&=(\rho+\bar{\varepsilon}-2\varepsilon)\alpha+\beta\bar{\sigma}-\bar{\beta}\varepsilon-\kappa\lambda-\bar{\kappa}\gamma+(\varepsilon+\rho)\pi+\Phi_{10}, ~  [\frac{1}{2}(R_{3414} - R_{1214})] \\
D\beta-\delta\varepsilon&=(\alpha+\pi)\sigma+(\bar{\rho}-\bar{\varepsilon})\beta-(\mu+\gamma)\kappa-(\bar{\alpha}-\bar{\pi})\varepsilon+\Psi_1, ~ [\frac{1}{2}(R_{1213} - R_{3413})] \\
D\gamma-\Delta\varepsilon&=(\tau+\bar{\pi})\alpha+(\bar{\tau}+\pi)\beta-(\varepsilon+\bar{\varepsilon})\gamma-(\gamma+\bar{\gamma})\varepsilon+\tau\pi-\nu\kappa+\Psi_2+\Phi_{11}-\Lambda, ~ [\frac{1}{2}(R_{1212} - R_{3412})] \\
D\lambda-\bar{\delta}\pi&=(\rho\lambda+\bar{\sigma}\mu)+\pi^2+(\alpha-\bar{\beta})\pi-\nu\bar{\kappa}-(3\varepsilon-\bar{\varepsilon})\lambda+\Phi_{20}, ~ [R_{2441}] \\
D\mu-\delta\pi&=(\bar{\rho}\mu+\sigma\lambda)+\pi\bar{\pi}-(\varepsilon+\bar{\varepsilon})\mu-(\bar{\alpha}-\beta)\pi-\nu\kappa+\Psi_2+2\Lambda, ~ [R_{2431}] \\
D\nu-\Delta\pi&=(\pi+\bar{\tau})\mu+(\bar{\pi}+\tau)\lambda+(\gamma-\bar{\gamma})\pi-(3\varepsilon+\bar{\varepsilon})\nu+\Psi_3+\Phi_{21}, ~ [R_{2421}] \\
\Delta\lambda-\bar{\delta}\nu&=-(\mu+\bar{\mu})\lambda-(3\gamma-\bar{\gamma})\lambda+(3\alpha+\bar{\beta}+\pi-\bar{\tau})\nu-\Psi_4, ~ [R_{2442}] \\
\delta\rho-\bar{\delta}\sigma&=\rho(\bar{\alpha}+\beta)-\sigma(3\alpha-\bar{\beta})+(\rho-\bar{\rho})\tau+(\mu-\bar{\mu})\kappa-\Psi_1+\Phi_{01}, ~ [R_{3143}] \\
\delta\alpha-\bar{\delta}\beta&=(\mu\rho-\lambda\sigma)+\alpha\bar{\alpha}+\beta\bar{\beta}-2\alpha\beta+\gamma(\rho-\bar{\rho})+\varepsilon(\mu-\bar{\mu})-\Psi_2+\Phi_{11}+\Lambda, ~ [\frac{1}{2}(R_{1234} - R_{3434})] \\
\delta\lambda-\bar{\delta}\mu&=(\rho-\bar{\rho})\nu+(\mu-\bar{\mu})\pi+(\alpha+\bar{\beta})\mu+(\bar\alpha-3\beta)\lambda-\Psi_3+\Phi_{21}, ~ [R_{2443}] \\
\delta\nu-\Delta\mu&=(\mu^2+\lambda\bar{\lambda})+(\gamma+\bar{\gamma})\mu-\bar{\nu}\pi+(\tau-3\beta-\bar{\alpha})\nu+\Phi_{22}, ~ [R_{2423}] \\
\delta\gamma-\Delta\beta&=(\tau-\bar{\alpha}-\beta)\gamma+\mu\tau-\sigma\nu-\varepsilon\bar{\nu}-(\gamma-\bar{\gamma}-\mu)\beta+\alpha\bar{\lambda}+\Phi_{12}, ~ [\frac{1}{2}(R_{1232} - R_{3432})] \\
\delta\tau-\Delta\sigma&=(\mu\sigma+\bar{\lambda}\rho)+(\tau+\beta-\bar{\alpha})\tau-(3\gamma-\bar{\gamma})\sigma-\kappa\bar{\nu}+\Phi_{02}, ~  [R_{1332}] \\
\Delta\rho-\bar{\delta}\tau&=-(\rho\bar{\mu}+\sigma\lambda)+(\bar{\beta}-\alpha-\bar{\tau})\tau+(\gamma+\bar{\gamma})\rho+\nu\kappa-\Psi_2-2\Lambda, ~ [R_{1324}] \\
\Delta\alpha-\bar{\delta}\gamma&=(\rho+\varepsilon)\nu-(\tau+\beta)\lambda+(\bar{\gamma}-\bar{\mu})\alpha+(\bar{\beta}-\bar{\tau})\gamma-\Psi_3, ~ [\frac{1}{2}(R_{1242} - R_{3442})]
\end{aligned}$$
以及比安基恒等式：
$$\begin{aligned}
-\bar\delta\Psi_0 + D \Psi_1 + (4\alpha - \pi)\Psi_0 - 2(2\rho + \varepsilon)\Psi_1 + 3\kappa\Psi_2 + R_a = 0, ~ R_{13[13,4]} = 0 \\
\bar\delta\Psi_1 - D \Psi_2 -\lambda\Psi_0 + 2(\pi - \alpha)\Psi_1 + 3\rho\Psi_2 - 2\kappa\Psi_3 + R_b = 0, ~ R_{13[21,4]} = 0 \\
-\bar\delta\Psi_2 + D \Psi_3 + 2\lambda\Psi_1 - 3\pi\Psi_2 + 2(\epsilon - \rho)\Psi_3 + \kappa\Psi_4 + R_c = 0, ~ R_{42[13,4]} = 0 \\
\bar\delta\Psi_3 - D \Psi_4  - 3\lambda\Psi_2 + 2(2\pi + \alpha)\Psi_3 - (4\epsilon- \rho)\Psi_4 + R_d = 0, ~ R_{42[21,4]} = 0 \\
-\Delta\Psi_0 + \delta\Psi_1 + 4(\gamma - \mu)\Psi_0 - 2(2\tau + \beta)\Psi_1 + 3\sigma\Psi_2 + R_e = 0, ~ R_{13[13,2]} = 0 \\
-\Delta\Psi_1 + \delta\Psi_2 + \nu\Psi_0 - 2(\gamma- \mu)\Psi_1 - 3\tau\Psi_2 + 2\sigma\Psi_3 + R_f = 0, ~ R_{13[43,2]} = 0 \\
-\Delta\Psi_2 + \delta\Psi_3 + 2\nu\Psi_1 - 3\mu\Psi_2 + 2(\beta - \tau)\Psi_3 + \sigma\Psi_4 + R_g = 0, ~ R_{42[13,2]} = 0 \\
-\Delta\Psi_3 + \delta\Psi_4 + 3\nu\Psi_2 - 2(\gamma - 2\mu)\Psi_3 - (\tau - 4\beta)\Psi_4 + R_h = 0, ~ R_{42[43,2]} = 0
\end{aligned}$$
其中
$$\begin{aligned}
R_a &= -D\Phi_{01} + \delta\Phi_{00} + 2(\bar\rho + \epsilon)\Phi_{01} + 2\sigma\Phi_{10} - 2\kappa\Phi_{11} - \bar\kappa\Phi_{02} + (\bar\pi - 2\bar\alpha - 2\beta)\Phi_{00} \\
R_b &= - \Delta\Phi_{00} + \bar\delta\Phi_{01} - 2(\bar\tau + \alpha)\Phi_{01} + 2\rho\Phi_{11} - 2\tau\Phi_{10} + \bar\sigma\Phi_{02} - (\bar\mu - 2\bar\gamma -2\gamma)\Phi_{00} - 2D\Lambda \\
R_c &= -D\Phi_{21} + \delta\Phi_{20} + 2(\bar\rho - \epsilon)\Phi_{21} + 2\pi\Phi_{11} - 2\mu\Phi_{10} - \bar\kappa\Phi_{22} + (\bar\pi - 2\bar\alpha + 2\beta)\Phi_{20} -2\bar\delta\Lambda \\
R_d &= - \Delta\Phi_{20} + \bar\delta\Phi_{21} - 2(\bar\tau - \alpha)\Phi_{21} + 2\nu\Phi_{10} - 2\lambda\Phi_{11} + \bar\sigma\Phi_{22} - (\bar\mu - 2\bar\gamma + 2\gamma)\Phi_{20} \\
R_e &= -D\Phi_{02} + \delta\Phi_{01} + 2(\bar\pi - \beta)\Phi_{01} + 2\sigma\Phi_{11} - 2\kappa\Phi_{12} - \bar\lambda\Phi_{00} + (\bar\rho  - 2\bar\varepsilon + 2\varepsilon)\Phi_{02} \\
R_f &= \Delta\Phi_{01} - \bar\delta\Phi_{02} + 2(\bar\mu - \gamma)\Phi_{01} + 2\tau\Phi_{11} - 2\rho\Phi_{12} - \bar\nu\Phi_{00} + (\bar\tau - 2\bar\beta + 2\alpha)\Phi_{02} + 2\delta\Lambda \\
R_g &= -D\Phi_{22} + \delta\Phi_{21} + 2(\bar\pi + \beta)\Phi_{21} + 2\pi\Phi_{12} - 2\mu\Phi_{11} - \bar\lambda\Phi_{20} + (\bar\rho  - 2\bar\varepsilon - 2\varepsilon)\Phi_{22} - 2\Delta\Lambda \\
R_h &= \Delta\Phi_{21} - \bar\delta\Phi_{22} + 2(\bar\mu + \gamma)\Phi_{21} + 2\lambda\Phi_{12} - 2\nu\Phi_{11} - \bar\nu\Phi_{20} + (\bar\tau - 2\bar\beta - 2\alpha)\Phi_{22}
\end{aligned}$$
