@[TOC](黎曼的zeta函数)

本篇是黎曼$\zeta$函数系列的第二篇，传送门在此[书接上回](?article=riemann_zeta_function)，让我们继续出发。
如果你已读完本篇，请移步[第三篇](?article=riemann_zeta_function_2)。

# 欧拉乘积公式
著名的欧拉乘积公式
$$\zeta(s) = \sum_{n = 1}^\infin \frac{1}{n^s} = \prod_p\frac{1}{1 - \frac{1}{p^s}}$$
揭开了素数分布秘密的一角。证明思路如下，由
$$\zeta(s) = \frac{1}{1^s} + \frac{1}{2^s} + \frac{1}{3^s} + \cdots$$
两边乘以$\frac{1}{2^s}$就得到
$$\frac{1}{2^s}\zeta(s) = \frac{1}{2^s} + \frac{1}{4^s} + \frac{1}{6^s} + \cdots$$
两式相减得（减掉所有2的倍数项）
$$(1 - \frac{1}{2^s})\zeta(s) = \frac{1}{1^s} + \frac{1}{3^s} + \frac{1}{5^s} + \cdots$$
两边乘以$\frac{1}{3^s}$就得到
$$\frac{1}{3^s}(1 - \frac{1}{2^s})\zeta(s) = \frac{1}{3^s} + \frac{1}{9^s} + \frac{1}{15^s} + \cdots$$
再相减就得到（减掉所有3的倍数项）
$$(1 - \frac{1}{3^s})(1 - \frac{1}{2^s})\zeta(s) = \frac{1}{1^s} + \frac{1}{5^s} + \frac{1}{7^s} + \cdots$$
两边乘以$\frac{1}{5^s}$再相减（减掉所有5的倍数项），如此这般下去，干掉右边所有得项，最终得到
$$\cdots(1 - \frac{1}{5^s})(1 - \frac{1}{3^s})(1 - \frac{1}{2^s})\zeta(s) = 1$$
不难发现，乘到左边的项都是素数项，所以就有
$$\zeta(s) = \prod_p\frac{1}{1 - \frac{1}{p^s}}$$
## Möbius函数
让我们尝试展开上式的右侧，得到
$$\frac{1}{\zeta(s)} = (1 - \frac{1}{2^s})(1 - \frac{1}{3^s})(1 - \frac{1}{5^s})(1 - \frac{1}{7^s})\cdots \\
= 1 - \frac{1}{2^s} - \frac{1}{3^s} - \frac{1}{5^s} + \frac{1}{6^s} - \frac{1}{7^s} + \cdots
$$
如果把这个级数写成Dirichlet级数
$$\frac{1}{\zeta(s)} = \sum_n\frac{a_n}{n^s}$$
的形式，就会有当$n$为偶数个不同素数乘积时$a_n = 1$，当$n$为奇数个不同素数乘积时$a_n = -1$，而当$n$可被某一素数的平方整除时$a_n = 0$. 我们就定义这样的$a_n$为Möbius函数，记为$\mu(n)$，于是
$$\frac{1}{\zeta(s)} = \sum_n\frac{\mu(n)}{n^s}$$
容易验证Möbius函数是积性函数，也就是说$\mu(1) = 1$，且当$a, ~ b$互质时，$\mu(ab) = \mu(a)\mu(b)$.
## 素数定理
欧拉注意到，当$s = 1$时，$\zeta(1)$为调和级数，其以对数方式发散。实际上
$$\ln(x) = \int_1^x\frac{1}{t}dt$$
为了干掉连乘积，两边取对数就有
$$\ln(\sum_n\frac{1}{n}) = -\sum_p\ln(1 - \frac{1}{p})$$
为了展开$\ln(1 - \frac{1}{p})$为幂级数，我们记$q = \frac{1}{p}$，显然$\ln(1 - q)$可以在$q = 0$处展开，因为其$n$阶导数在$q = 0$处为$-(n - 1)!$，于是
$$-\ln(1 - q) = q + \frac{1}{2}q^2 + \frac{1}{3}q^3 + \cdots$$
代入原式就得到
$$\ln(\sum_n\frac{1}{n}) = -\sum_p\ln(1 - \frac{1}{p}) = \sum_p(\frac{1}{p} + \frac{1}{2p^2} + \frac{1}{3p^3} + \cdots)$$
上式右边除第一项外是收敛的，为了看出这一点，只需注意到
$$\sum_{k = 2}^\infty(\frac{1}{2k^2} + \frac{1}{3k^3} + \cdots) = -\sum_{k = 2}^\infty[\frac{1}{k} + \ln(1 - \frac{1}{k})] = 1 - \sum_{k = 1}^\infty\frac{1}{k} + \ln\prod_{k = 2}^\infty\frac{k}{k - 1} = 1 - \lim_{n \to \infty}[\sum_{k = 1}^n\frac{1}{k} - \ln(n)] = 1 - \gamma$$
其中$\gamma$为Euler-Mascheroni常数。于是
$$\sum_p\frac{1}{p} \sim \ln(\sum_n\frac{1}{n}) \sim \ln\ln(n)$$
或者更确切地说
$$\sum_{p < N}\frac{1}{p} \sim \ln\ln(N)$$
更进一步地，上式左边似乎可以改写为积分的形式$\int^N\frac{1}{x}dx$，但实际上并非所有的$x$都是素数，我们需要修改这个积分为
$$\int^N\frac{1}{x}\rho(x)dx$$
其中$\rho(x)$给出在$x$附近单位区间内存在素数的概率。如果注意到$\ln\ln(N) = \int^N\frac{1}{x\ln(x)}dx$，就有
$$\rho(x) \sim \frac{1}{\ln(x)}$$
于是$x$以内的素数个数$\pi(x)$可以表示为
$$\pi(x) = \int\rho(x)dx \sim \int\frac{1}{\ln(x)}dx \sim \frac{x}{\ln(x)}$$
这就是素数定理。
# Dirichlet卷积
## 数论函数
函数$f \colon \Z^+ \to \mathbb C$被称为数论函数，每一个数论函数均可被视为一个复数序列。
## Dirichlet卷积的定义
对于数论函数$f, ~ g$，其Dirichlet卷积定义为
$$(f * g)(n) = \sum_{d \mid n}f(d)g(\frac{n}{d})$$
可以验证，所有数论函数的集合以Dirichlet卷积为乘法构成一个阿贝尔幺半群。
> 实际上这个阿贝尔幺半群是一个整环（无零因子阿贝尔幺环），也就是说
> - 数论函数对普通加法构成阿贝尔群
> - 非零数论函数对卷积构成阿贝尔幺半群（即无零因子阿贝尔幺半群）
> - 卷积对加法有分配律

以下验证相关性质，首先，根据定义，如果我们记$b \equiv \frac{n}{d}$，就容易看出
$$(f * g)(n) = \sum_{d \mid n}f(d)g(\frac{n}{d}) = \sum_{b \mid n}g(b)f(\frac{n}{b}) = (g*f)(n)$$
而注意到这个交换律我们就有
$$((f * g) * h)(n) = \sum_{m \mid n}[\sum_{d \mid m}f(d)g(\frac{m}{d})]h(\frac{n}{m}) = \sum_{m \mid n}h(m)\sum_{d \mid \frac{n}{m}}f(d)g(\frac{n}{dm}) \\
= \sum_{md = n}h(m)f(d)g(\frac{n}{dm}) = \sum_{d \mid n}f(d)\sum_{m \mid \frac{n}{d}}h(m)g(\frac{n}{dm})
$$
而
$$(f * (g * h))(n) = \sum_{d \mid n}f(d)\sum_{m \mid \frac{n}{d}}g(m)h(\frac{n}{dm}) = \sum_{d \mid n}f(d)\sum_{m \mid \frac{n}{d}}h(m)g(\frac{n}{dm})$$
这就证明了结合律。
## Dirichlet卷积的例子
- $(1 * 1)(n) = \sum_{k \mid n}1 = d(n)$，其中$d$为除数函数，其值等于$n$的正因子个数。
- $(1 * \mu)(n) = \sum_{d \mid n}\mu(d) = 1_{\{1\}}(n) = [n = 1] = \epsilon(n)$，其中$1_A$为指示函数，$\epsilon$为Dirichlet卷积的单位元。
> 证明
> $(1 * \mu)(1) = 1$是显然的。当$n > 1$时，根据算数基本定理，我们可将$n$唯一分解为素数幂的乘积。$n = \prod^m_{k = 1}p_k^{a_k}$。现在设$d$的分解为$d = \prod^m_{k = 1}p_k^{b_k}, ~ 0 \le b_k \le a_k$，注意到如果$b_k \ge 2$就有$\mu(d) = 0$，因此
> $$\begin{aligned}
> (1 * \mu)(n) &= \sum_{b_k = 0, ~ 1}\mu(p_1^{b_1}p_2^{b_2}\cdots p_m^{b_m}) \\
> &= \sum_{b_k = 0, ~ 1}\mu(p_1^{b_1})\mu(p_2^{b_2})\cdots\mu(p_m^{b_m}) \\
> &= \sum_{b_k = 0, ~ 1}(-1)^{b_1 + b_2 + \cdots + b_m} \\
> &= \sum_s^m\binom{m}{s}(-1)^s \\
> &= (1 - 1)^m = 0
> \end{aligned}$$
> 其中最后一步是二项式定理。综合两种情况就得到要证的结果。
- $(\epsilon * f)(n) = f(n)$
## Möbius反演定理
$$g = (1 * f) \iff f = (\mu * g)$$
两边同时对$\mu$卷积，或者同时对$1$卷积即可证明。
## 广义Möbius反演
设数论函数$\alpha(n), ~ \beta(n)$满足$(\alpha * \beta)(n) = \epsilon(n)$，$F, ~ G$是定义在$[1, +\infty)$上的函数，我们有
$$G(x) = \sum_{1 \le n \le x}z(n)\alpha(n)F(\frac{x}{n}) \iff F(x) = \sum_{1 \le n \le x}z(n)\beta(n)G(\frac{x}{n})$$
其中$z(n)$为一完全积性函数，即$z(1) = 1$且$z(nm) = z(n)z(m)$.
> 证明
> $$\begin{aligned}
> \sum_{1 \le n \le x}z(n)\beta(n)G(\frac{x}{n}) &= \sum_{1 \le n \le x}z(n)\beta(n)\sum_{1 \le m \le \frac{x}{n}}z(m)\alpha(m)F(\frac{x}{nm}) \\
> &= \sum_{1 \le n \le x}\beta(n)\sum_{1 \le m \le \frac{x}{n}}\alpha(m)\sum_{1\le r\le x}[r = mn]z(r)F(\frac{x}{r}) \\
> &= \sum_{1\le r\le x}z(r)F(\frac{x}{r})\sum_{1 \le n \le x}\sum_{1 \le m \le \frac{x}{n}}[r = mn]\alpha(m)\beta(n) \\
> &= \sum_{1\le r\le x}z(r)F(\frac{x}{r})\sum_{m \mid r}\alpha(m)\beta(\frac{r}{m}) \\
> &= \sum_{1\le r\le x}z(r)F(\frac{x}{r})\epsilon(r) = F(x)
> \end{aligned}$$

令$\alpha = 1, ~ \beta = \mu$，我们就有广义Möbius反演
$$G(x) = \sum_{1 \le n \le x}z(n)F(\frac{x}{n}) \iff F(x) = \sum_{1 \le n \le x}z(n)\mu(n)G(\frac{x}{n})$$
类似地，我们有
$$G(x) = \sum_{1 \le n \le x}z(n)F(\sqrt[n]x) \iff F(x) = \sum_{1 \le n \le x}z(n)\mu(n)G(\sqrt[n]x)$$
证明是完全类似的。
# 黎曼的发展
黎曼也是从
$$\ln\zeta(s) = \sum_p\sum_n\frac{1}{np^{ns}}$$
入手，可以证明$\ln\zeta(s)$在复平面上$\Re(s) > 0$的区域是绝对收敛的。定义
$$J(x) = \pi(x) + \frac{1}{2}\pi(\sqrt x) + \frac{1}{3}\pi(\sqrt[3] x) + \cdots = \sum_n[\frac{1}{n}\pi(\sqrt[n]x)]$$
称为黎曼素数计数函数。显然$J(0) = 0$，而后其每越过一个素数就增加$1$，每越过一个素数的平方就增加$\frac{1}{2}$，如此这般。在其不连续的点上，其值用$J(x) = \frac{1}{2}[J(x^-) + J(x^+)]$定义。可以看出，$J(x)$和$\pi(x)$之间的关系正是由上面提到的广义Möbius反演所联系
$$\pi(x) = \sum_n[\frac{\mu(x)}{n}J(\sqrt[n]x)]$$
借此函数，上式就可以表为积分形式，因为
$$\sum_p\sum_n\frac{1}{np^{ns}} = \int_0^\infty\sum_n\frac{1}{nx^{ns}}\rho(x)dx =  \int_0^\infty t^{-s}\sum_n\frac{1}{n}d\pi(\sqrt[n]t) = \int_0^\infty t^{-s}dJ(t)$$
其中第二个等号处使用换元$x = \sqrt[n]t$. 再进行一次分部积分便得
$$\ln\zeta(s) = s\int_0^\infty J(x)x^{-s - 1}dx$$
## Mellin 变换
Mellin变换的定义是
$$\{\mathcal Mf\}(s) = \varphi(s) = \int_0^\infty x^{s-1}f(x)dx$$
其逆变换为
$$\{\mathcal M^{-1}\varphi\}(x) = f(x) = \frac{1}{2\pi i}\int_{c - i\infty}^{c + i\infty}x^{-s}\varphi(s)ds$$
根据上述定义就有
$$\frac{\ln\zeta(s)}{s} = \{\mathcal MJ\}(-s)$$
于是根据逆变换得到
$$J(x) = \frac{1}{2\pi i}\int_{a - i\infty}^{a + i\infty}\frac{\ln\zeta(z)}{z}x^zdz$$
其中$z = -s, ~ a = -c$为大于$1$的实数。这就将$\zeta$函数和素数分布规律$J$明确地联系了起来。
## 辅助函数$\xi$
定义
$$\xi(s) = \frac{1}{2}s(s-1)\pi^{-\frac{s}{2}}\Gamma(\frac{s}{2})\zeta(s)$$
我们将函数方程
$$\zeta(s) = 2\Gamma(1-s)(2\pi)^{s-1}\sin\frac{s\pi}{2}\zeta(1-s)$$
代入上式，可得
$$\xi(s) = \frac{1}{2}s(s-1)\pi^{\frac{s-1}{2}}2^s\frac{1}{\sqrt\pi}\Gamma(\frac{s}{2})\Gamma(1-s)\sin\frac{s\pi}{2}\zeta(1-s)$$
注意到
$$\Gamma(\frac{s}{2})\Gamma(\frac{s}{2} + \frac{1}{2}) = 2^{1 - s}\sqrt\pi\Gamma(s)$$
以及
$$\Gamma(s)\Gamma(1-s) = \frac{\pi}{\sin(s\pi)}$$
就有
$$\begin{aligned}
\xi(s) &= \frac{1}{2}s(s-1)\pi^{\frac{s-1}{2}}2\Gamma(s)\Gamma(1-s)\frac{1}{\Gamma(\frac{s}{2} + \frac{1}{2})}\sin\frac{s\pi}{2}\zeta(1-s)\\
&= \frac{1}{2}s(s-1)\pi^{\frac{s-1}{2}}\frac{\pi}{\cos\frac{s\pi}{2}}\frac{1}{\Gamma(\frac{s}{2} + \frac{1}{2})}\zeta(1-s) \\
&= \frac{1}{2}s(s-1)\pi^{\frac{s-1}{2}}\frac{\pi}{\cos\frac{s\pi}{2}}\frac{\sin(\frac{s\pi}{2} + \frac{\pi}{2})}{\pi}\Gamma(\frac{1-s}{2})\zeta(1-s) \\
&=  \frac{1}{2}s(s-1)\pi^{\frac{s-1}{2}}\Gamma(\frac{1-s}{2})\zeta(1-s) \\
&= \xi(1-s)
\end{aligned}$$
### 因子分解
$$\xi(s) = \prod_\rho\ (\rho - s) = \xi(0)\prod_\rho\ (1 - \frac{s}{\rho})$$
其中$\rho$是$\xi$的零点。利用这个分解式和$\xi(s)$的定义，不难得到
$$\ln\zeta(s) = \ln\xi(0) + \sum_\rho\ln(1 - \frac{s}{\rho}) - \ln\Gamma(\frac{s}{2} + 1) + \frac{s}{2}\ln\pi - \ln(s -1)$$
做此分解的目的，是为了计算$J(x)$，但将上式直接代入
$$J(x) = \frac{1}{2\pi i}\int_{a - i\infty}^{a + i\infty}\frac{\ln\zeta(z)}{z}x^zdz$$
所得的单项积分并不收敛，为此黎曼又做了一次分部积分，得到
$$J(x) = -\frac{1}{2\pi i}\frac{1}{\ln x}\int_{a - i\infty}^{a + i\infty}x^zd\frac{\ln\zeta(z)}{z}$$
> 要注意$dx^z = (\ln x)x^zdz$，另外$x^z$在$z$的实部有限时其模长也是有限的，也就是说
> $$\lim_{z \to a + i\infty}\frac{\ln\zeta(z)}{z}x^z = \lim_{z \to a - i\infty}\frac{\ln\zeta(z)}{z}x^z = 0$$
