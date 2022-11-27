@[TOC](氢原子的薛定谔方程)
# 氢原子的薛定谔方程
## 分离变量
定态薛定谔方程的一般形式为
$$H\Psi = E\Psi$$
其中$H$为哈密顿算符，其在坐标表象下的形式为
$$H = -\frac{\hbar^2}{2m_e}\nabla^2 + V(r)$$
代入一般形式，并[在球坐标下展开拉普拉斯算子](?article=laplacian_in_spherical_coordinate_system)，得
$$\frac{1}{r^2}\frac{\partial}{\partial r}(r^2\frac{\partial\Psi}{\partial r}) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial \theta}(\sin\theta\frac{\partial\Psi}{\partial \theta}) + \frac{1}{r^2\sin^2\theta}\frac{\partial^2\Psi}{\partial\varphi^2} - \frac{2m_e}{\hbar^2}[V(r) - E]\Psi = 0$$
假设$\Psi(r, \theta, \varphi)$可以分解为径向和角向两部分的积，即
$$\Psi(r, \theta, \varphi) = R(r)Y(\theta, \varphi)$$
代入上式就有
$$\frac{1}{R}\frac{d}{dr}(r^2\frac{dR}{dr}) + \frac{1}{Y}\frac{1}{\sin\theta}\frac{\partial}{\partial \theta}(\sin\theta\frac{\partial Y}{\partial \theta}) + \frac{1}{Y}\frac{1}{\sin^2\theta}\frac{\partial^2 Y}{\partial\varphi^2} - \frac{2m_e}{\hbar^2}[V(r) - E]r^2= 0$$
于是有
$$\frac{1}{R}\frac{d}{dr}(r^2\frac{dR}{dr}) - \frac{2m_e}{\hbar^2}[V(r) - E]r^2 = -\frac{1}{Y}[\frac{1}{\sin\theta}\frac{\partial}{\partial \theta}(\sin\theta\frac{\partial Y}{\partial \theta}) + \frac{1}{\sin^2\theta}\frac{\partial^2 Y}{\partial\varphi^2}]$$
记此值为$\beta$，就有
$$\left\{\begin{aligned}
& \frac{d^2R}{dr^2} + \frac{2}{r}\frac{dR}{dr} + \frac{2m_e}{\hbar^2}[E - V(r) - \frac{\hbar^2}{2m_e}\frac{\beta}{r^2}]R = 0 \\
& \frac{1}{\sin\theta}\frac{\partial}{\partial \theta}(\sin\theta\frac{\partial Y}{\partial \theta}) + \frac{1}{\sin^2\theta}\frac{\partial^2 Y}{\partial\varphi^2} = -\beta Y
\end{aligned}\right .$$
如果进一步假定$Y(\theta, \varphi) = \Theta(\theta)\Phi(\varphi)$，上式可以继续分解为
$$\frac{1}{\Theta}\sin\theta\frac{d}{d\theta}(\sin\theta\frac{d\Theta}{d\theta}) +\beta\sin^2\theta = -\frac{1}{\Phi}\frac{d^2\Phi}{d\varphi^2}$$
记此值为$\alpha$，就有
$$\left\{\begin{aligned}
& \sin\theta\frac{d}{d\theta}(\sin\theta\frac{d\Theta}{d\theta}) + [\beta\sin^2\theta - \alpha]\Theta = 0 \\
& \frac{d^2\Phi}{d\varphi^2} + \alpha\Phi = 0
\end{aligned}\right .$$
至此，我们将原偏微分方程拆分为了三个常微分方程。

## $\Phi$的解
$\Phi$的特征解的为$\Phi = ce^{i\sqrt\alpha\varphi}$
根据$\Phi$的周期性条件$\Phi(0) = \Phi(2\pi)$，我们有$\sqrt\alpha = m$，其中$m \in \Z$称为磁量子数。
另外，根据归一化条件需要有
$$\int_0^{2\pi}|\Phi(\varphi)|^2d\varphi = \int_0^{2\pi}c^2d\varphi = 1$$
所以$c = \frac{1}{\sqrt{2\pi}}$，于是
$$\Phi = \frac{1}{\sqrt{2\pi}}e^{im\varphi}$$

## $\Theta$的解
现在关于$\Theta$的方程可以写为
$$\sin\theta\frac{d}{d\theta}(\sin\theta\frac{d\Theta}{d\theta}) + [\beta\sin^2\theta - m^2]\Theta = 0$$
令$w = \cos\theta$，则$\frac{d}{d\theta} = -\sin\theta\frac{d}{dw}$，记$\Theta(\theta) = P(w)$，代入上式得
$$\frac{d}{dw}[(1 - w^2)\frac{dP}{dw}] + (\beta - \frac{m^2}{1 - w^2})P = 0$$
这被称为关联勒让德方程。
当$m = 0$时，上式简化为
$$(1 - w^2)\frac{d^2P}{dw^2} - 2w\frac{dP}{dw} + \beta P = 0$$
这被称为勒让德方程。
让我们考虑该方程的级数解，为此，我们设$P(w) = \sum_{l = 0}^\infty a_lw^l$，其中$l \in \N$称为角量子数。代入上式得
$$(1 - w^2)\sum_{l = 0}^\infty l(l - 1)a_lw^{l - 2} -2w\sum_{l = 0}^\infty la_lw^{l - 1} + \beta\sum_{l = 0}^\infty a_lw^l = 0$$
整理得
$$\sum_{l = 0}^\infty[(l + 2)(l + 1)a_{l + 2} - (l^2 + l - \beta)a_l]w^l = 0$$
这就要求
$$(l + 2)(l + 1)a_{l + 2} = (l^2 + l - \beta)a_l$$
于是
$$\begin{aligned}
& a_2 = \frac{-\beta}{2}a_0, ~ a_4 = \frac{6 - \beta}{12}a_2, ~ a_6 = \frac{20 - \beta}{30}a_4, ~ \cdots \\
& a_3 = \frac{2 - \beta}{6}a_1, ~ a_5 = \frac{12 - \beta}{20}a_3, ~ a_7 = \frac{20 - \beta}{42}a_5, ~ \cdots
\end{aligned}$$
代入$P$的表达式得
$$\begin {aligned}
P(w) = & a_0(1 + \frac{-\beta}{2}w^2 + \frac{6 - \beta}{12}\frac{-\beta}{2}w^4 + \frac{20 - \beta}{30}\frac{6 - \beta}{12}\frac{-\beta}{2}w^6 + \cdots) + \\
& a_1(w + \frac{2 - \beta}{6}w^3 + \frac{12 - \beta}{20}\frac{2 - \beta}{6}w^5 + \frac{20 - \beta}{42}\frac{12 - \beta}{20}\frac{2 - \beta}{6}w^7 + \cdots)
\end{aligned}$$
为使多项式$P(w)$收敛，须有
$$\lim_{l \to \infty}\frac{a_{l + 2}}{a_l}w^2 = \lim_{l \to \infty}\frac{l^2 + l - \beta}{(l + 2)(l + 1)}w^2 < 1$$
对所有$w$成立。但$w \in [-1, 1]$，因此$\beta = l(l + 1)$，且$a_0a_1 = 0$。我们还要求P(1) = 1，在此条件下可以解出所有的系数，此时称$P$为勒让德多项式。显然不同的$l$对应不同的多项式，前几个勒让德多项式为
$$\begin {aligned}
P_0 &= 1 \\
P_1 &= x \\
P_2 &= \frac{1}{2}(3x^2 - 1) \\
P_3 &= \frac{1}{2}(5x^3 - 3x) \\
P_4 &= \frac{1}{8}(35x^4 - 30x^2 + 3) \\
P_5 &= \frac{1}{8}(63x^5 - 70x^3 + 15) \\
P_6 &= \frac{1}{16}(231x^6 - 315x^4 + 105x^2 - 5) \\
\cdots
\end{aligned}$$
其通项公式可以表示为
$$P_l(x) = \frac{1}{2^ll!}\frac{d^l}{dx^l}(x^2 - 1)^l$$

类似地，当$m \neq 0$时的解称为关联勒让德多项式，当$m > 0$时，其定义为
$$\begin {aligned}
P_l^m(x) &= (-1)^m(1 - x^2)^\frac{m}{2}\frac{d^m}{dx^m}P_l(x) \\
P_l^{-m}(x) &= (-1)^m\frac{(l - m)!}{(l + m)!}P_l^m
\end{aligned}$$
容易看出，$P_l = P_l^0$，且$|m| \le l$。此外，
$$\int_{0}^{\pi}|P_l^m(\cos\theta)|^2\sin\theta d\theta = \int_{-1}^1|P_l^m(x)|^2dx = \frac{2}{2l + 1}\frac{(l + m)!}{(l - m)!}$$
故其归一化系数为$\sqrt{\frac{2l + 1}{2}\frac{(l - m)!}{(l + m)!}}$,

通常将$\Theta$的解和$\Phi$的解合并起来，记为
$$Y_l^m(\theta, \varphi) = \sqrt{\frac{2l + 1}{4\pi}\frac{(l - m)!}{(l + m)!}}P_l^m(\cos\theta)e^{im\varphi}$$
该函数称为球谐函数。

## $R$的解
将$V(r) = -\frac{e^2}{4\pi\epsilon_0r}$及$\beta = l(l + 1)$代入原式，得
$$\frac{d^2R}{dr^2} + \frac{2}{r}\frac{dR}{dr} + [\frac{2m_e}{\hbar^2}(E + \frac{e^2}{4\pi\epsilon_0r}) - \frac{l(l + 1)}{r^2}]R = 0$$
当$r \to \infty$时，上述方程简化为
$$\frac{d^2R}{dr^2} + \frac{2m_e}{\hbar^2}ER = 0$$
注意到$E \leq 0$(等号在无穷远处取得)，可写出该方程的解为
$$R(r) = Ae^{\frac{\sqrt{-2m_eE}}{\hbar}r} + Be^{-\frac{\sqrt{-2m_eE}}{\hbar}r}$$
这里须令$A = 0$以使方程不至发散，因此
$$R(r) = Be^{-\frac{\sqrt{-2m_eE}}{\hbar}r}$$
现在我们令$\rho = \frac{2r}{\hbar}\sqrt{-2m_eE}$，并猜测$R(r)$的形式为$R(r) = F(\rho)e^{-\frac{\rho}{2}}$，代入原方程就得到
$$\frac{d^2F}{d\rho^2} + (\frac{2}{\rho} - 1)\frac{dF}{d\rho} + [\frac{n - 1}{\rho} - \frac{l(l + 1)}{\rho^2}]F = 0$$
其中
$$n = \frac{1}{4\pi\epsilon_0}\frac{m_ee^2}{\hbar\sqrt{-2m_eE}}$$
我们可假设$F(\rho) = \rho^sL(\rho)$，通过取$s \ge 0$为合适的值使上式不至在$\rho \to 0$时发散。代入得
$$\rho^2\frac{d^2L}{d\rho^2} + [(2s + 2)\rho - \rho^2]\frac{dL}{d\rho} + [s(s - 1) + 2s + (n - 1 - s)\rho - l(l +1) ]L = 0$$
当$\rho \to 0$时，须有$s(s - 1) + 2s - l(l + 1) = 0$。解得$s= l$，代回原式有
$$\rho\frac{d^2L}{d\rho^2}  + (2l + 2 - \rho)\frac{dL}{d\rho} + (n - 1 - l)L = 0$$
为求其级数解，我们设$L(\rho) = \sum_{k = 0}^{\infty}a_k\rho^k$，代入上式就有
$$\sum_{k = 0}^{\infty}[a_{k + 1}(k + 1)(k + 2l + 2) + a_k(n - 1 - l - k)]\rho^k = 0$$
因此
$$\frac{a_{k + 1}}{a_k} = \frac{1 + l + k - n}{(k + 1)(k + 2l + 2)}$$
注意到$k \to \infty$时$\frac{a_{k + 1}}{a_k} = \frac{1}{k}$，此时$L \sim e^\rho$，而$R \sim \rho^se^\frac{\rho}{2}$，当$r \to \infty$时发散。所以必须有
$$n = k + l + 1$$
我们记$n_r = k \in \N$称为径向量子数，$n \in \N^+$称为主量子数，$n \ge l + 1$。由此又可得到如下关系
$$E = -\frac{m_ee^4}{2(4\pi\epsilon_0\hbar)^2}\frac{1}{n^2} = -\frac{m_ee^4}{8h^2\epsilon_0^2}\frac{1}{n^2}$$
这就是玻尔能级公式，而
$$\rho = \frac{m_ee^2}{4\pi\epsilon_0\hbar^2}\frac{2r}{n} = \frac{2r}{a_0n}$$
其中
$$a_0 = \frac{4\pi\epsilon_0\hbar^2}{m_ee^2}$$
为氢原子的玻尔半径。

记$N = n - 1 - l$，$a = 2l + 1$，就有
$$a_1 = \frac{0 - N}{1(a + 1)}a_0, ~ a_2 = \frac{1 - N}{2(a + 2)}a_1, ~ a_3 = \frac{2 - N}{3(a + 3)}a_2, ~ \cdots$$
于是
$$a_k = (-1)^k\frac{a!N!}{(N - k)!k!(a + k)!}a_0$$
我们还要求$L(0) = \frac{(N + a)!}{a!N!} = \binom{N + a}{a}$，于是就有
$$L_N^a(\rho) = \sum_{k = 0}^{N}(-1)^k\frac{(N + a)!}{(N - k)!k!(a + k)!}\rho^k = \sum_{k = 0}^{N}\frac{(-1)^k}{k!}\binom{N + a}{k + a}\rho^k$$
这被称为关联拉盖尔多项式。当$a = 0$时，$L_N = L_N^0$又被称为拉盖尔多项式。于是方程的解就可以表示为
$$R(\rho) = e^{-\frac{\rho}{2}}\rho^lL_{n - 1 - l}^{2l + 1}(\rho)$$
关于$L_N^a$的一个重要的积分是
$$\int_0^\infty e^{-x}x^{a + 1}[L_N^a(x)]^2dx = \frac{(2N + a + 1)(N + a)!}{N!}$$
由此可知
$$\int_0^\infty R^2(\rho)r^2dr = (\frac{a_0n}{2})^3\int_0^\infty e^{-\rho}\rho^{2l + 2}[L_{n - 1 - l}^{2l + 1}(\rho)]^2d\rho = (\frac{a_0n}{2})^3\frac{2n(n + l)!}{(n - 1 - l)!}$$
于是其归一化系数为$\sqrt{(\frac{2}{a_0n})^3\frac{(n - 1 - l)!}{2n(n + l)!}}$.
## 小结
通过上述计算我们知道，氢原子的波函数可以表示为
$$\Psi(r, \theta, \varphi) = \sqrt{(\frac{2}{a_0n})^3\frac{(n - 1 - l)!}{2n(n + l)!}}e^{-\frac{r}{a_0n}}(\frac{2r}{a_0n})^lL_{n - 1 - l}^{2l + 1}(\frac{2r}{a_0n})Y_l^m(\theta, \varphi)$$
其中$a_0 = \frac{4\pi\epsilon_0\hbar^2}{m_ee^2}$为玻尔半径，$m$为磁量子数，$l$为角量子数，$n$为主量子数，且满足$|m| \le l < n$. 于是能级$E_n$的简并度为
$$D_n = \sum_{l = 0}^{n - 1}(2l + 1) = n^2$$
$\Psi(r, \theta, \varphi)$还满足归一化条件
$$\int_0^\infty\int_0^\pi\int_0^{2\pi}\Psi^2(r, \theta, \varphi)r^2\sin\theta d\varphi d\theta  dr = 1$$

我们可以求一下基态(n = 1, l = m = 0)时的波函数，代入$\Psi$的表达式就有
$$\Psi_{100} = \sqrt\frac{1}{\pi a_0^3}e^{-\frac{r}{a_0}}$$
于是电子出现在半径为$r$的球壳附近的概率为
$$dP = 4\pi r^2\Psi_{100}^2d r$$
其概率密度为
$$f(r) = \frac{dP}{dr} = 4\pi r^2\Psi_{100}^2 = \frac{4r^2}{a_0^3}e^{-\frac{2r}{a_0}}$$
满足$f(0) = 0$，这说明电子出现在原子核附近的概率为零。我们还可以求得$f(r)$在$r = a_0$时取得最大值，这说明玻尔半径附近的球壳正是电子出现概率最大的地方。
