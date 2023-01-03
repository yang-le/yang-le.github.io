@[TOC](爱因斯坦场方程之Reissner-Nordstrom解)

# 爱因斯坦场方程之Reissner-Nordstrom解

## 一点电动力学
磁场是无源的，因此可以表示为旋度场，我们记
$$\vec B = \vec \nabla \times \vec A$$
并称$\vec A$为磁矢势。再代入$\vec\nabla\times\vec{E} = -{\partial\vec{B}\over\partial t}$，就有
$$\vec\nabla\times\vec{E} = -{\partial\over\partial t}(\vec \nabla \times \vec A) = -\vec \nabla \times{\partial\vec A\over\partial t}$$
也即
$$\vec \nabla \times(\vec E + {\partial\vec A\over\partial t}) = 0$$
这个无旋场又可以表示为梯度，记
$$\vec E + {\partial\vec A\over\partial t} = -\vec\nabla\phi$$
并称$\phi$为电磁场的标势。电磁4势定义为
$$A_a = (-\frac{\phi}{c}, \vec A)$$
电磁张量定义为
$$F_{ab} = (dA)_{ab}$$
容易看出，给$A_a$加上任一函数的梯度不改变$F_{ab}$的数值，也就是说若令$\tilde A_a = A_a + \nabla_a\chi$，则$d\tilde A_a = dA_a + d(d\chi) = dA_a$。这被称为电磁4势的规范自由性。

麦克斯韦方程组可表示为
$$\begin{array}{ll}
dF &= 0\\
^*d^*F &= \mu_0J
\end{array}$$

电磁能动张量的表达式(使用几何高斯单位制$c = G = \varepsilon_0 = 1$)为
$$T_{ab} = \frac{1}{4\pi}(F_{ac}F_b{}^c - \frac{1}{4}g_{ab}F_{cd}F^{cd})$$

## 静态球对称电磁场
回忆一下，静态球对称的Schwarzschild度规的表达式为
$$ds^2 = -e^{2\alpha(r)}dt^2 + e^{2\beta(r)}dr^2 + r^2d\theta^2 + r^2\sin^2\theta d\varphi^2$$
考虑静态球对称电磁4势，不难确信其在球坐标中分量不显含$t, \theta, \varphi$而仅与$r$坐标有关。而且由于球对称性，$A_a$的第$2, 3$分量$A_2, A_3$应为常数。注意到
$$\tilde A_1 = (\frac{\partial}{\partial r})^a(A_a + \nabla_a\chi) = A_1 + \frac{\partial\chi}{\partial r}$$
因此我们可以通过选择适当的$\chi$使得$A_1$为零。综上，非零的$F_{\mu\nu}$就只剩下
$$-F_{01} = F_{10} = \partial_1A_0 = \frac{dA_0}{dr}$$

由此可得非零的电磁能动张量为
$$\begin{aligned}
T_{00} &= \frac{1}{4\pi}[F_{01}F_0{}^1 - \frac{1}{4}g_{00}(F_{01}F^{01} + F_{10}F^{10})] = \frac{1}{4\pi}(F_{01}F_0{}^1 - \frac{1}{2}g_{00}F_{10}F^{10}) = \frac{1}{4\pi}[g^{11}(F_{01})^2 - \frac{1}{2}g_{00}g^{00}g^{11}(F_{10})^2] = \frac{1}{8\pi}g^{11}(F_{10})^2 = \frac{1}{8\pi}e^{-2\beta}(F_{10})^2 \\
T_{11} &= \frac{1}{4\pi}[F_{10}F_1{}^0 - \frac{1}{4}g_{11}(F_{01}F^{01} + F_{10}F^{10})] = \frac{1}{4\pi}(F_{10}F_1{}^0 - \frac{1}{2}g_{11}F_{10}F^{10}) = \frac{1}{4\pi}[g^{00}(F_{10})^2 - \frac{1}{2}g_{11}g^{00}g^{11}(F_{10})^2] = \frac{1}{8\pi}g^{00}(F_{10})^2 = -\frac{1}{8\pi}e^{-2\alpha}(F_{10})^2 \\
T_{22} &= \frac{1}{4\pi}(-\frac{1}{2}g_{22}F_{10}F^{10}) = -\frac{1}{8\pi}g_{22}F_{10}F^{10} = -\frac{1}{8\pi}g^{00}g^{11}g_{22}(F_{10})^2 = \frac{1}{8\pi}e^{-2(\alpha + \beta)}r^2(F_{10})^2 \\
T_{33} &= \frac{1}{4\pi}(-\frac{1}{2}g_{33}F_{10}F^{10}) = -\frac{1}{8\pi}g_{33}F_{10}F^{10} = -\frac{1}{8\pi}g^{00}g^{11}g_{33}(F_{10})^2 = \frac{1}{8\pi}e^{-2(\alpha + \beta)}r^2\sin^2\theta(F_{10})^2
\end{aligned}$$

我们还可以通过求解(无源)麦克斯韦方程组把$F_{10}$求出来。第一个方程由于$F = dA$自然满足，对于第二个方程，因为$^*F = \frac{1}{2}F^{ab}\varepsilon_{abcd}, ~ d^*F = \frac{3}{2}\nabla_{[e}F^{ab}\varepsilon_{cd]ab}$，所以
$$^*d^*F = \frac{1}{3!}\frac{3}{2}\nabla^{[e}F_{ab}\varepsilon^{cd]ab}\varepsilon_{cdef} = \frac{1}{4}\nabla^{[e}F_{ab}\delta^a{}_e\delta^{b]}{}_f2!2! = \nabla^eF_{ef}$$
我们取其分量形式为
$$F^{\mu\nu}{}_{;\mu} = 0$$
又
$$F^{\mu\nu}{}_{;\mu} = F^{\mu\nu}{}_{,\mu} + \Gamma^\mu{}_{\mu\sigma}F^{\sigma\nu} + \Gamma^\nu{}_{\mu\rho}F^{\mu\rho}$$
注意到最后一项为零(因子一为对称，一为反称)，而
$$\Gamma^\mu{}_{\mu\sigma} = \frac{1}{\sqrt{|g|}}\frac{\partial\sqrt{|g|}}{\partial x^\sigma}$$
其中$g$是分量$g_{\mu\nu}$对应的矩阵的行列式，所以就有
$$0 = F^{\mu\nu}{}_{;\mu} =  \frac{1}{\sqrt{-g}}\frac{\partial(\sqrt{-g}F^{\mu\nu})}{\partial x^\mu}$$
其中，$\sqrt{-g} = \sqrt{|g|} = e^{\alpha + \beta}r^2\sin\theta$，而要求的$F_{10} = g_{00}g_{11}F^{10}$. 这个方程给出
$$\frac{d}{dr}[e^{-(\alpha + \beta)}r^2F_{10}] = 0$$
解得
$$F_{10} = \frac{Q}{r^2}e^{\alpha + \beta}$$

## 电磁真空场方程
容易验证$T_{\mu\nu}$是无迹的，即$g^{\mu\nu}T_{\mu\nu} = 0$. 于是$R = 0$，爱因斯坦场方程就可表示为
$$R_{\mu\nu} = 8\pi T_{\mu\nu}$$
结合我们求得的$T_{\mu\nu}$和$R_{\mu\nu}$
$$
R_{00} = e^{2(\alpha - \beta)}(\alpha'' - \alpha'\beta' + \alpha'^2 + 2r^{-1}\alpha') \\
R_{11} = -\alpha'' + \alpha'\beta' - \alpha'^2 + 2r^{-1}\beta' \\
R_{22} = -e^{-2\beta}[1 + r(\alpha' - \beta')] + 1 \\
R_{33} = -\{e^{-2\beta}[1 + r(\alpha' - \beta')] - 1\}\sin^2\theta
$$
就给出如下方程
$$
e^{2(\alpha - \beta)}(\alpha'' - \alpha'\beta' + \alpha'^2 - 2r^{-1}\alpha') = e^{-2\beta}(F_{10})^2 \\
-\alpha'' + \alpha'\beta' - \alpha'^2 + 2r^{-1}\beta' = -e^{-2\alpha}(F_{10})^2 \\
-e^{-2\beta}[1 + r(\alpha' - \beta')] + 1 = e^{-2(\alpha + \beta)}r^2(F_{10})^2
$$
前两个方程给出$\alpha' = -\beta'$，即$\alpha = -\beta + \gamma$，代入第三个方程得
$$1 - \frac{Q^2}{r^2} = e^{-2\beta}(1 - 2\beta'r)$$
解得
$$e^{-2\beta} = 1 + \frac{Q^2}{r^2} + \frac{C}{r}$$
于是$e^{2\alpha} = e^{-2\beta}e^{2\gamma}$，代入原度规表达式就有
$$ds^2 = -(1 + \frac{Q^2}{r^2} + \frac{C}{r})e^{2\gamma}dt^2 + (1 + \frac{Q^2}{r^2} + \frac{C}{r})^{-1}dr^2 + r^2d\theta^2 + r^2\sin^2\theta d\varphi^2$$
考虑新坐标$\hat t = e^\gamma t$，并仍将其记作$t$，上式就简化为
$$ds^2 = -(1 + \frac{Q^2}{r^2} + \frac{C}{r})dt^2 + (1 + \frac{Q^2}{r^2} + \frac{C}{r})^{-1}dr^2 + r^2d\theta^2 + r^2\sin^2\theta d\varphi^2$$
这就相当于取$\alpha = -\beta$，在此条件下就有
$$F_{10} = \frac{Q}{r^2}e^{\alpha + \beta} = \frac{Q}{r^2}$$
注意到$F_{10}$实际上就对应于径向场强$\frac{q}{r^2}$，于是$Q$的含义就是星体所带的电荷。另外，当$Q = 0$时，我们的度规应回到Schwarzschild度规，因此$C = -2M$。最终Reissner-Nordstrom度规可以表示为
$$ds^2 = -(1 - \frac{2M}{r} + \frac{Q^2}{r^2})dt^2 + (1 - \frac{2M}{r} + \frac{Q^2}{r^2})^{-1}dr^2 + r^2d\theta^2 + r^2\sin^2\theta d\varphi^2$$
相应的电磁场和电磁4势为
$$F_{ab} = -\frac{Q}{r^2}(dt)_a\wedge(dr)_b, ~ A_{a} = \frac{Q}{r}(dt)_a$$

## 那个方程究竟是怎么解的
我是说这个方程
$$1 - \frac{Q^2}{r^2} = e^{-2\beta}(1 - 2\beta'r)$$
首先把方程形式改写一下
$$(1 - e^{-2\beta} - \frac{Q^2}{r^2})dr + 2e^{-2\beta}rd\beta = 0$$
所谓恰当方程，指方程可以表达为某个函数的全微分的形式
$$du = \frac{\partial u}{\partial r}dr + \frac{\partial u}{\partial \beta}d\beta = 0$$
此时应有
$$\frac{\partial u}{\partial r\partial \beta} = \frac{\partial u}{\partial \beta \partial r}$$
令$M = 1 - e^{-2\beta} - \frac{Q^2}{r^2}, ~ N = 2e^{-2\beta}r$，容易看出$\frac{\partial M}{\partial \beta} = \frac{\partial N}{\partial r}$，因此该方程确实是一个恰当方程。我们有
$$u = \int Nd\beta = -re^{-2\beta}  + \phi(r)$$
其中$\phi(r)$是积分常数，又
$$M = \frac{\partial u}{\partial r} = -e^{-2\beta} + \frac{d\phi(r)}{dr}$$
所以$\frac{d\phi(r)}{dr} = 1 - \frac{Q^2}{r^2}, ~ \phi(r) = r + \frac{Q^2}{r} + C_1$，代回$u$的表达式就得到
$$u= -re^{-2\beta} + r + \frac{Q^2}{r} + C_1$$
原方程$du = 0$的解就是$u = C_2$，所以
$$e^{-2\beta} = 1 + \frac{Q^2}{r^2} + \frac{C}{r}$$

### 第二种方法
若能看出
$$1 - \frac{Q^2}{r^2} = (re^{-2\beta})'$$
则
$$(1 - \frac{Q^2}{r^2})dr = d(re^{-2\beta})$$
两边积分就有
$$r + \frac{Q^2}{r} + C = re^{-2\beta}$$
