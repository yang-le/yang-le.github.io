@[TOC](黎曼的zeta函数)

# $\Gamma$函数
考虑如下等式
$$\sum^{\infin}_{k=0}x^k = 1 + x +x^2 + \cdots = \frac{1}{1-x}$$
而恰有
$$ \int_0^{\infin}e^{-(1-x)t}\rm dt = [-\frac{1}{1-x}e^{-(1-x)t}]_0^{\infin} = \frac{1}{1-x}$$
所以
$$\sum^{\infin}_{k=0}x^k = \int_0^{\infin}e^{-(1-x)t}\rm dt$$
对$e^{xt}$使用泰勒展开
$$\int_0^{\infin}e^{-(1-x)t}\rm dt = \int_0^{\infin}e^{-t}\sum_{k=0}^{\infin}\frac{(xt)^k}{k!}\rm dt$$
把$e^{-t}$乘到求和号里面，再交换积分和求和的次序，就有
$$\sum^{\infin}_{k=0}x^k =\sum_{k=0}^{\infin}\int_0^{\infin}e^{-t}t^k\rm dt\frac{x^k}{k!}$$
对比系数，我们得到
$$k! = \int_0^{\infin}t^ke^{-t}\rm dt$$
实际上，欧拉曾经考虑过与此相关的两个(积分)函数，现在称为第一类欧拉积分的$\Beta$函数
$$\Beta(a, b) = \int_0^1x^{a-1}(1-x)^{b-1}\rm dx$$
和现在称为第二类欧拉积分的Gamma函数
$$\Gamma(a) = \int_0^{\infin}x^{a-1}e^{-x}\rm dx$$
使用分部积分，很容易证明
$$\Gamma(a) = (a-1)\Gamma(a-1)$$
加之$\Gamma(1) = 1$，用归纳法就可以得出
$$\Gamma(n) = (n -1)! ~ \forall n \in \N$$
## 余元公式
$$\Gamma(s)\Gamma(1-s)=\frac{\pi}{\sin(s\pi)}$$
根据[两类欧拉积分](https://zhuanlan.zhihu.com/p/63225812)的关系，这也就是说
$$\Beta(s, 1-s) = \frac{\pi}{\sin(s\pi)}$$
做换元$x \to \frac{y}{1+y}$，就有
$$\Beta(s, 1-s) = \int_0^\infin\frac{y^{s-1}}{1+y}\rm dy$$
然后使用柯西积分公式(或者留数定理)就可以证明。
# $\zeta$函数
黎曼的$\zeta$函数定义为
$$\zeta(s) = \sum_{n = 1}^\infin \frac{1}{n^s}$$
我们对$\Gamma$函数做一个变换$x \to nx$，就有
$$\Gamma(s)=n^s\int_0^\infin x^{s-1}e^{-nx}\rm dx$$
移项并在两边求和
$$\sum_{n = 1}^\infin\frac{1}{n^s}\Gamma(s) = \int_0^\infin x^{s-1}\sum_{n = 1}^\infin e^{-nx}\rm dx = \int_0^\infin\frac{x^{s-1}}{e^x -1}\rm dx$$
所以
$$\zeta(s) =\frac{1}{\Gamma(s)}\int_0^\infin\frac{x^{s-1}}{e^x -1}\rm dx$$
这称为$\zeta$函数的第一积分表示。
## $\eta$函数
Dirichlet研究过一个与此非常类似的函数，称为Dirichlet $\eta$函数，定义如下
$$\eta(s) = \sum_{n = 1}^\infty\frac{(-1)^{n-1}}{n^s}$$
注意到这个函数可按正负(奇偶)拆成两个级数
$$\eta(s) = \sum_{n = 1}^\infty\frac{1}{(2n - 1)^s} - \sum_{n = 1}^\infty\frac{1}{(2n)^s} = (1 - \frac{1}{2^s})\zeta(s) - \frac{1}{2^s}\zeta(s) = (1 - \frac{1}{2^{s-1}})\zeta(s)$$
这可当作$\zeta(s)$的一种定义，即
$$\zeta(s) = \frac{1}{1 - 2^{1 -s}}\eta(s)$$
根据莱布尼茨判别法，$\eta(s)$在$s > 0$是收敛的，这就扩展了$\zeta(s)$的定义域$s > 1$.

## 解析延拓
现考虑将$\zeta$函数定义为复变函数，将上述积分中的$x$简单地换为$z$，并选择Hankel围道进行积分，经过一番化简之后，发现并不能与原定义相容。实际上，应当考虑如下稍作修改后的复积分
$$\int_H\frac{(-z)^{s-1}}{e^z - 1}\rm dz$$
式中$(-z)^{s-1}$应理解为$e^{(s-1)\ln(-z)}$，根据复对数的定义，$\ln(-z) = \ln|-z| + i\arg(-z)$。当Hankel围道无限趋近于正实轴时
$$\lim_{y \to 0} \ln|-z| = \lim_{y \to 0} \ln|-(x + iy)| = \ln x$$
而其中幅角一项就要分两种情况考虑，不难看出
$$\lim_{y \to 0^+} \arg(-z) = -\pi$$
而
$$\lim_{y \to 0^-} \arg(-z) = \pi$$
另外，对于Hankel围道的半圆形部分，注意到$e^{(s-1)\theta i}$是有限的，就有
$$\lim_{z\to 0}\int_C\frac{(-z)^{s-1}}{e^z - 1}\rm dz =-\lim_{z\to 0}\int_C(-z)^{s-2}\rm dz = \lim_{r\to 0}[\frac{r^{s-1}e^{(s-1)\theta i}}{s - 1}]_{-\pi\over2}^{\pi\over2} = 0$$
其中$r$为$-z$的模，$\theta$为$-z$的幅角。因此
$$\int_H\frac{(-z)^{s-1}}{e^z - 1}\rm dz = e^{-(s-1)\pi i}\int_{\infin}^0\frac{x^{s-1}}{e^x-1}\rm dx + e^{(s-1)\pi i}\int_{0}^\infin\frac{x^{s-1}}{e^x-1}\rm dx = [e^{(s-1)\pi i} - e^{-(s-1)\pi i}]\int_{0}^\infin\frac{x^{s-1}}{e^x-1}\rm dx$$
使用欧拉公式，有
$$[e^{(s-1)\pi i} - e^{-(s-1)\pi i}] = 2i\sin[(s-1)\pi] = -2i\sin(s\pi)$$
而根据余元公式，就有
$$\int_H\frac{(-z)^{s-1}}{e^z - 1}\rm dz =\frac{-2\pi i}{\Gamma(s)\Gamma(1-s)}\int_{0}^\infin\frac{x^{s-1}}{e^x-1}\rm dx$$
因此
$$\zeta(s) = -\frac{\Gamma(1-s)}{2\pi i}\int_H\frac{(-z)^{s-1}}{e^z - 1}\rm dz$$
这就把$\zeta(s)$的定义扩展到了整个复平面上。上式也称为$\zeta$函数的第三积分表示。
### $\zeta$的特殊值
当$s = -n, (n = 0, 1, 2, \dots)$时我们可以根据上述积分表示得到
$$\begin{aligned}
\zeta(-n) &= \frac{\Gamma(1+n)}{2\pi i}\int_H\frac{(-z)^{-n - 1}}{e^z - 1}\rm dz \\
&= \frac{\Gamma(1+n)}{2\pi i}\int_H(\sum_m\frac{B_mz^m}{m!})(-z)^{-n-2}\rm dz \\
&= \frac{\Gamma(1+n)}{2\pi i}\sum_m\frac{B_m}{m!}(-1)^n\int_Hz^{m-n-2}\rm dz \\
&= \Gamma(1+n)\sum_m\frac{B_m}{m!}(-1)^n Res[z^{m-n-2}, 0]
\end{aligned}$$
其中$B_n$为伯努利数，定义为
$$\frac{x}{e^x - 1} = \sum_{n = 0}^\infty\frac{B_nx^n}{n!}$$
留数$Res[z^{m-n-2}, 0] = \lim_{z \to 0}z^{m - n - 1}$仅当$m = n + 1$时为$1$，因此
$$\zeta(-n) = (-1)^n\frac{B_{n + 1}}{n + 1}$$
## 函数方程
黎曼注意到这个积分还可以有另一种方法计算，也就是按负方向围绕Hankel围道的余集，注意到对于模趋于无穷大的$z$，上述积分是无穷小的。因此这两个围道积分所得的结果是相等的。在这个围道的内部，仅当$z = \pm2n\pi i$时，被积函数存在极点。因此这个积分可以使用留数定理来进行计算，也就是
$$\int_{H^*}\frac{(-z)^{s-1}}{e^z - 1}\rm dz = -2\pi i\sum_{n \in \Z} Res[\frac{(-z)^{s-1}}{e^z - 1}, 2n\pi i]$$
注意到$z \to 2n\pi i$时，$e^z -1$与$z - 2n\pi i$是等价的无穷小，据此可以得出
$$Res[\frac{(-z)^{s-1}}{e^z - 1}, 2n\pi i] = \lim_{z \to 2n\pi i}(z- 2n\pi i)\frac{(-z)^{s-1}}{e^z - 1} = (-2n\pi i)^{s-1}$$
将这些都带入到第三积分表示中，有
$$\zeta(s) = -\frac{\Gamma(1-s)}{2\pi i}\int_H\frac{(-z)^{s-1}}{e^z - 1}\rm dz = \Gamma(1-s)\sum_{n \in \Z}(-2n\pi i)^{s-1}$$
而
$$\sum_{n \in \Z}(-2n\pi i)^{s-1} = (-2\pi i)^{s-1}\sum_{n \in \Z}n^{s-1} = (-2\pi i)^{s-1}[1 + (-1)^{s-1}]\zeta(1-s) = (2\pi)^{s-1}[(-i)^{s-1}+i^{s-1}]\zeta(1-s)$$
又根据欧拉公式可得
$$(-i)^{s-1}+i^{s-1} = e^{i(s-1)\frac{-\pi}{2}} + e^{i(s-1)\frac{\pi}{2}} = 2\cos[(s-1)\frac{\pi}{2}]=2\sin(\frac{s\pi}{2})$$
所以
$$\zeta(s) =2\Gamma(1-s)(2\pi)^{s-1}\sin(\frac{s\pi}{2})\zeta(1-s)$$
这就是黎曼$\zeta$函数所满足的函数方程。
