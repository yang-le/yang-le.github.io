@[TOC](作用量漫谈)

# 作用量漫谈

## 最小作用量原理
最小作用量原理基本上是说我们这个宇宙总是选择某种“最经济”的方式运行，表现在物理规律上，就是有一个称为作用量的东西，正确的物理规律总是使得这个作用量取最小值。因此这个作用量必须是个标量。
> 向量和张量不能比较大小，除非先引入一个映射将其转换为标量。

此外，常(函)数作用量意义通常不大，因为常(函)数取最小值通常不能给出什么有用的信息。
考虑最简单的自由粒子的运动，唯一能想到的符合上述要求的量就是运动路径的长度，最多差一个常数因子，此时作用量就可以表示为
$$S = -\alpha\int_a^bds$$
这可能也是作用量用$S$代表的一个原因。为了能使得$S$有最小值，$\alpha$必须为一个正数。
推广到高维情形时，我们可以定义作用量为
$$S = \int\mathscr L dx^\mu$$
其中$\mathscr L$称为拉格朗日密度，基本上就是高维的作用量"密度"的概念。

### 与度规适配的体元
上式仅在洛伦兹变换下才有意义，因为洛伦兹变换的行列式$|\Lambda|$为$1$，因而$dx^\mu$不会随参考系的变换改变。但在更一般的弯曲时空的情形，就需要考虑用$\sqrt{-g}dx^\mu$来代替$dx^\mu$，其中$g$为度规的行列式。这个东西称为与度规适配的体元，是坐标变换下的不变量。
> 要看出这一点，只需注意到对于变换$x \mapsto x', ~ d^4x' = |\frac{\partial x'}{\partial x}|d^4x$，这是多元微积分的换元规则。而$g'_{\mu\nu} = \frac{\partial x^\rho}{\partial x'^\mu}\frac{\partial x^\sigma}{\partial x'^\nu}g_{\rho\sigma}$，两边取行列式就有$g'(x') = |\frac{\partial x'}{\partial x}|^{-2}g(x)$.

因此，我们的作用量现在就可以写为
$$S = \int\mathscr {\tilde L} \sqrt{-g}dx^\mu = \int\mathscr L dx^\mu$$

## 拉格朗日方程
一般的拉格朗日密度为广义坐标$q^i(t)$及其时空导数的函数，但在场论的情形，$q^i(t)$应该推广为场量$\phi(x, t)$。所以拉格朗日密度是场量及其时空导数的函数
$$\mathscr L = \mathscr L(\phi, \partial_a\phi)$$
最小作用量原理给出
$$\begin{aligned}
0 = \delta S &= \int \delta\mathscr L dx^\mu = \int [\frac{\partial \mathscr L}{\partial \phi}\delta\phi + \frac{\partial \mathscr L}{\partial (\partial_a\phi)}\delta(\partial_a\phi)]dx^\mu \\
& = \int [\frac{\partial \mathscr L}{\partial \phi}\delta\phi + \frac{\partial \mathscr L}{\partial (\partial_a\phi)}\partial_a(\delta\phi)]dx^\mu \\
& = \int [\frac{\partial \mathscr L}{\partial \phi}\delta\phi + \partial_a(\frac{\partial \mathscr L}{\partial (\partial_a\phi)}\delta\phi) - \delta\phi\partial_a\frac{\partial \mathscr L}{\partial (\partial_a\phi)}]dx^\mu \\
& = \int \partial_a(\frac{\partial \mathscr L}{\partial (\partial_a\phi)}\delta\phi)dx^\mu + \int (\frac{\partial \mathscr L}{\partial \phi} - \partial_a\frac{\partial \mathscr L}{\partial (\partial_a\phi)})\delta\phi dx^\mu
\end{aligned}$$
根据高斯公式
$$\int_U \partial_a(\frac{\partial \mathscr L}{\partial (\partial_a\phi)}\delta\phi) = \int_{\partial U}\frac{\partial \mathscr L}{\partial (\partial_a\phi)}\delta\phi$$
而在全时空$U$的无限远边界$\partial U$上，我们要求$\delta\phi = 0$. 于是就有
$$\frac{\partial \mathscr L}{\partial \phi} - \partial_a\frac{\partial \mathscr L}{\partial (\partial_a\phi)} = 0$$
这被称为拉格朗日方程。
## 诺特定理
本节推导需要读者了解[李导数和Killing矢量场](https://blog.csdn.net/weixin_41871524/article/details/128363527#Killing_1)的性质。
如上所述，拉格朗日密度$\mathscr L$是$\phi, ~ \partial_a\phi, ~ g_{ab}$三者的函数。考虑光滑矢量场$\xi^a$生成的单参微分同胚族$f_\lambda$（其中$f_0$代表恒等映射），其诱导的拉回映射把$\phi, ~ \partial_a\phi, ~ g_{ab}$变为新场
$$\phi_\lambda \equiv f^*_\lambda\phi, ~ (\partial_a\phi)_\lambda \equiv f^*_\lambda(\partial_a\phi), ~ (g_{ab})_\lambda \equiv f^*_\lambda g_{ab}$$
相应的$\mathscr L$就变为
$$\mathscr L_\lambda \equiv \mathscr L(\phi_\lambda, (\partial_a\phi)_\lambda, (g_{ab})_\lambda)$$
且有
$$f^*_\lambda(\partial_a\phi) = \partial'_a(f^*_\lambda\phi)$$
其中$\partial'_a$是与$(g_{ab})_\lambda$适配的导数算符，即$\partial'_a(g_{bc})_\lambda = 0$.
不难证明上述诸量的变分实际上对应的是其沿$\xi^a$的李导数$L_\xi$，因为
$$\delta\phi = \frac{d\phi_\lambda}{d\lambda}|_{\lambda = 0} = \lim_{\lambda \to 0}\frac{1}{\lambda}(f^*_\lambda\phi - \phi) = L_\xi\phi$$
类似地$\delta(\partial_a\phi) = L_\xi(\partial_a\phi), ~ \delta g_{ab} = L_\xi g_{ab}$. 特别地，因为$\mathscr L$是标量场，所以
$$\delta\mathscr L = L_\xi\mathscr L = \xi^a\partial_a\mathscr L$$
而$\delta \mathscr L$可以展开
$$\delta \mathscr L = \frac{\partial \mathscr L}{\partial \phi}L_\xi\phi + \frac{\partial \mathscr L}{\partial (\partial_a\phi)}L_\xi(\partial_a\phi) + \frac{\partial \mathscr L}{\partial g_{ab}}L_\xi g_{ab}$$
再将拉格朗日方程代入就得到
$$\xi^a\partial_a\mathscr L = (\partial_a\frac{\partial \mathscr L}{\partial (\partial_a\phi)})L_\xi\phi + \frac{\partial \mathscr L}{\partial (\partial_a\phi)}L_\xi(\partial_a\phi) + \frac{\partial \mathscr L}{\partial g_{ab}}L_\xi g_{ab}$$
为考察对称性导致的守恒流，我们可令$\xi^a$为Killing矢量场，此时就有$L_\xi g_{ab} = 0$以及$(g_{bc})_\lambda = g_{bc}$，后者又导致$\partial'_a = \partial_a$，于是
$$L_\xi(\partial_a\phi) = \lim_{\lambda \to 0}[f^*_\lambda(\partial_a\phi) - \partial_a\phi] = \lim_{\lambda \to 0}[\partial_a(f^*_\lambda\phi) - \partial_a\phi] = \partial_a(L_\xi\phi)$$
前一个式子就简化为
$$\xi^a\partial_a\mathscr L = (\partial_a\frac{\partial \mathscr L}{\partial (\partial_a\phi)})L_\xi\phi + \frac{\partial \mathscr L}{\partial (\partial_a\phi)}\partial_a(L_\xi\phi) = \partial_a(\frac{\partial \mathscr L}{\partial (\partial_a\phi)}L_\xi\phi)$$
注意到$\partial_a\xi^a = g^{(ab)}\partial_{[a}\xi_{b]} = 0$，就有
$$\partial_a(\xi^a\mathscr L) = \partial_a(\frac{\partial \mathscr L}{\partial (\partial_a\phi)}L_\xi\phi)$$
于是矢量场
$$J^a \equiv \frac{\partial \mathscr L}{\partial (\partial_a\phi)}L_\xi\phi - \xi^a\mathscr L$$
满足连续性方程$\partial_aJ^a = 0$，因而代表某种守恒流密度。
### 正则能动张量
定义$S^{ab} = -\frac{\partial \mathscr L}{\partial (\partial_a\phi)}\partial^b\phi + g^{ab}\mathscr L$，则
$$S^{ab}\xi_b = -\frac{\partial \mathscr L}{\partial (\partial_a\phi)}\xi_b\partial^b\phi + \xi^a\mathscr L$$
当$\xi^a$为时空平移，即$\xi^a = (\frac{\partial}{\partial x^\mu})^a$时，因为$\partial_a\xi^b = 0$，不难证明$L_\xi\phi = \xi^a\partial_a\phi$，所以
$$S^{ab}\xi_b = -J^a$$
两边求导得$\partial_aS^{ab}\xi_b = -\partial_aJ^a = 0$，所以
$$\partial_aS^{ab} = 0$$
因为时空平移对应的是能量和动量，$S^{ab}$称为正则能动张量。
为了看出这一点，我们可以将对应的Killing矢量场代入$J^a$的表达式。例如，当$\xi^a = (\frac{\partial}{\partial t})^a$时，取适配坐标系就有
$$J^a \equiv \frac{\partial \mathscr L}{\partial (\partial_a\phi)}\dot\phi - (\frac{\partial}{\partial t})^a\mathscr L$$
因此
$$J^0 = \frac{\partial \mathscr L}{\partial \dot\phi}\dot\phi - \mathscr L$$
这正是系统的哈密顿密度。类似地，当$\xi^a = (\frac{\partial}{\partial x})^a$时，
$$J^a \equiv \frac{\partial \mathscr L}{\partial (\partial_a\phi)}\frac{\partial\phi}{\partial x} - (\frac{\partial}{\partial x})^a\mathscr L$$
因此
$$J^0 = \frac{\partial \mathscr L}{\partial \dot\phi}\frac{\partial\phi}{\partial x}$$
注意$-J^0$恰好就是系统的物理动量密度，其中$\pi = \frac{\partial \mathscr L}{\partial \dot\phi}$称为共轭动量密度。
## 常见的作用量
### 自由粒子
根据狭义相对论，$ds^2 = -(c^2 - v^2)dt^2$，因此自由粒子的作用量就可以写为
$$S = -\int_{t_1}^{t_2}\alpha c\sqrt{1 - \frac{v^2}{c^2}}dt$$
为了得到$\alpha$的表达式，考虑在$v$远小于$c$时有$\frac{1}{2}mv^2 = L = -\alpha c\sqrt{1 - \frac{v^2}{c^2}}$。把$L$展开为$v$的幂级数（得在$v = 0$处展开到二阶导数，因为一阶导数为0）并略去高次项可得
$$L = -\alpha c + \frac{\alpha v^2}{2c}$$
其中$-\alpha c$为常数，不影响运动方程，对比就可以发现$\alpha = mc$，因而作用量的最终表达式就是
$$S = -\int_{t_1}^{t_2}mc^2\sqrt{1 - \frac{v^2}{c^2}}dt$$
相应的拉格朗日量是$L = -mc^2\sqrt{1 - \frac{v^2}{c^2}}$. 拉格朗日方程是
$$\frac{d}{dt}\frac{\partial L}{\partial v} = 0$$
代入$L$的表达式就得到运动方程
$$mv'(1 - \frac{v^2}{c^2})^{-\frac{3}{2}} = 0$$
与$f = ma\gamma^3$对比，可以看出这就是粒子受力为零时的运动方程。
### 标量场
因为$\mathscr L = \mathscr L(\phi, \partial_a\phi)$，用$\phi$和$\partial_a\phi$能构造出的最简单的标量有这样的形式$(\partial^a\phi)\partial_a\phi + f(\phi)$，其中$f(\phi)$是$\phi$的任一函数。实际发现符合物理情况的$\mathscr L$是
$$\mathscr L = -\frac{1}{2}[(\partial^a\phi)\partial_a\phi + m^2\phi^2]$$
代入拉格朗日方程给出
$$\partial_a\partial^a\phi - m^2\phi = 0$$
这就是著名的Klein-Gordon方程。
> Klein-Gordon方程是为了解决薛定谔方程的非协变性而导出，因薛定谔方程
> $$i\hbar\frac{\partial}{\partial t}\Psi = H\Psi = [-\frac{\hbar^2}{2m}\nabla^2+ V(r)]\Psi$$
> 左边是对时间的一阶导数，而右边是对空间的二阶导数，时空坐标不平权。因此就考虑把方程左边也改成对时间的二阶导数，恰好我们有狭义相对论中的能量-动量关系$E^2 = m^2c^4 + p^2c^2$，算符化之后就是
> $$-\hbar^2\frac{\partial^2}{\partial t^2}\phi = -\hbar^2\nabla^2c^2\phi + m^2c^4\phi$$
> 下面使用自然单位制$c = \hbar = 1$，上式就简化为
> $$(-\frac{\partial^2}{\partial t^2} + \nabla^2)\phi - m^2\phi = 0$$

我们还可以取$\phi$为复标量场，即令
$$\phi = \frac{1}{\sqrt 2}(\phi_1 + i\phi_2)$$
其中$\phi_1, ~ \phi_2$为两个实标量场，$\phi$的拉格朗日密度为两者的对应拉格朗日密度之和，即
$$\mathscr L(\phi, \partial_a\phi; \bar\phi, \partial_a\bar\phi) = -[(\partial^a\bar\phi)\partial_a\phi + m^2\phi\bar\phi]$$
容易验证上述密度代入拉格朗日方程分别给出$\phi$和$\bar\phi$的Klein-Gordon方程。
请注意如果我们取如下的变换
$$\phi' = e^{-iq\theta}\phi, ~ \bar\phi' = e^{iq\theta}\bar\phi$$
则对应的拉格朗日密度是不变的，这被称为规范变换。
### 电磁场
电磁场的场量是电磁4势$A_\nu$，与标量场类似，其构造的标量有这样的形式$(\partial^\mu A^\nu)\partial_\mu A_\nu + f(A_\nu)$，实际发现符合物理情况的$\mathscr L$是
$$\mathscr L = -\frac{1}{4\pi}(\partial^{[\mu} A^{\nu]})\partial_\mu A_\nu = -\frac{1}{16\pi}F^{\mu\nu}F_{\mu\nu}$$
其中$F_{\mu\nu} = 2\partial_{[\mu} A_{\nu]}$，注意到$\frac{\partial \mathscr L}{\partial A_\nu} = 0$和$\frac{\partial \mathscr L}{\partial (\partial_\mu A_\nu)} = -\frac{1}{2\pi}\partial^{[\mu} A^{\nu]} = -\frac{1}{4\pi}F^{\mu\nu}$，就有
$$-\frac{1}{4\pi}\partial_\mu F^{\mu\nu} = 0$$
这正是无源麦克斯韦方程。为了得到有源麦克斯韦方程，我们只需添加一项将$\mathscr L$修改为
$$\mathscr L = -\frac{1}{16\pi}F^{\mu\nu}F_{\mu\nu} + J^\nu A_\nu$$
之后我们会知道，$J^\nu$实际上就是前述标量场的守恒流。
### 引力场
引力的场量为度规$g_{ab}$，仿照前面的讨论，我们考虑由$g$的二阶导数组成的标量，最合适的人选莫过于黎曼曲率张量(缩并而得的标量)。实际上，能够给出爱因斯坦场方程的拉格朗日密度如下
$$\mathscr L = \sqrt{-g}R$$
其中$R$为标量曲率，对应的作用量被称为爱因斯坦-希尔伯特作用量。拉格朗日方程在这里似乎不太好算，让我们直接计算作用量的变分，也就等价于计算$\delta\mathscr L = R\delta\sqrt{-g} + \sqrt{-g}\delta R = R\delta\sqrt{-g} + \sqrt{-g}R_{ab}\delta g^{ab} + \sqrt{-g}g^{ab}\delta R_{ab}$. 我们一项一项来算，首先注意到$g$是$g_{ab}$的行列式，也就是说$g = g_{\mu\nu}A^{\mu\nu}$，其中$A^{\mu\nu}$是$g_{\mu\nu}$的代数余子式。而$\frac{A^{\mu\nu}}{g} = (g_{\mu\nu})^{-1} = g^{\mu\nu}$，所以
$$\frac{\partial g}{\partial g_{\mu\nu}} = gg^{\mu\nu}$$
而
$$\delta g = \frac{\partial g}{\partial g_{ab}}\delta g_{ab} = gg^{ab}\delta g_{ab}$$
由这些就不难得出
$$\delta\sqrt{-g} = \frac{1}{2}\sqrt{-g}g^{ab}\delta g_{ab}$$
然后我们想确认下$\delta g_{ab}$和$\delta g^{ab}$的关系，由$\delta^a{}_b = g^{ac}g_{cb}$两边取变分可得$0 = g^{ac}\delta g_{cb} + g_{cb}\delta g^{ac}$，再与$g_{ad}$缩并得
$$\delta g_{db} = -g_{ad}g_{cb}\delta g^{ac}$$
换言之
$$\delta g^{ab} = -g^{ac}g^{bd}\delta g_{cd}$$
代入$\delta\mathscr L$整理一下就得到
$$\delta\mathscr L = \sqrt{-g}[-(R^{ab} - \frac{1}{2}g^{ab}R)\delta g_{ab} + g^{ab}\delta R_{ab}]$$
接下来是计算$\delta R_{ab}$，回忆下
$$R_{\mu\nu\sigma}{}^\rho = \Gamma^\rho{}_{\mu\sigma,\nu} - \Gamma^\rho{}_{\nu\sigma,\mu} + \Gamma^\lambda{}_{\sigma\mu}\Gamma^\rho{}_{\nu\lambda} - \Gamma^\lambda{}_{\sigma\nu}\Gamma^\rho{}_{\mu\lambda}$$
对上式变分给出
$$\delta R_{\mu\nu\sigma}{}^\rho = \delta\Gamma^\rho{}_{\mu\sigma,\nu} - \delta\Gamma^\rho{}_{\nu\sigma,\mu} + \Gamma^\rho{}_{\nu\lambda}\delta\Gamma^\lambda{}_{\sigma\mu} + \Gamma^\lambda{}_{\sigma\mu}\delta\Gamma^\rho{}_{\nu\lambda} - \Gamma^\lambda{}_{\sigma\nu}\delta\Gamma^\rho{}_{\mu\lambda} - \Gamma^\rho{}_{\mu\lambda}\delta\Gamma^\lambda{}_{\sigma\nu}$$
注意到协变导数和偏导数的关系
$$ \delta\Gamma^\rho{}_{\mu\sigma;\nu} =  \delta\Gamma^\rho{}_{\mu\sigma,\nu} + \Gamma^\rho{}_{\nu\lambda} \delta\Gamma^\lambda{}_{\mu\sigma} - \Gamma^\lambda{}_{\nu\mu} \delta\Gamma^\rho{}_{\lambda\sigma} - \Gamma^\lambda{}_{\nu\sigma} \delta\Gamma^\rho{}_{\mu\lambda}$$
就容易验证
$$\delta R_{\mu\nu\sigma}{}^\rho = \delta\Gamma^\rho{}_{\mu\sigma;\nu} - \delta\Gamma^\rho{}_{\nu\sigma;\mu}$$
以下换回抽象指标，里奇张量的变分就简单地缩并得到
$$\delta R_{ab}= \delta\Gamma^c{}_{ab;c} - \delta\Gamma^c{}_{cb;a}$$
注意到$\nabla_cg^{ab} = 0$，就有
$$g^{ab}\delta R_{ab} = \nabla_c(g^{ab}\delta\Gamma^c{}_{ab} - g^{bc}\delta\Gamma^d{}_{db})$$
是全微分项，在求积分得作用量时根据高斯定理其等于被微分项在无穷远边界处的积分，我们认为其为零。综上就有
$$0 = \delta S = \int\delta\mathscr L = \int-(R^{ab} - \frac{1}{2}g^{ab}R)\sqrt{-g}\delta g_{ab}$$
这就给出爱因斯坦场方程
$$R^{ab} - \frac{1}{2}g^{ab}R = 0$$
