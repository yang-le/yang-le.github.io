@[TOC](黎曼的zeta函数)

本篇是黎曼$\zeta$函数系列的第三篇，传送门在此[书接上回](?article=riemann_zeta_function_1)，让我们继续出发。

# 对$J(x)$的计算
上回说到，$J(x)$经过一次分部积分后的结果为
$$J(x) = -\frac{1}{2\pi i}\frac{1}{\ln x}\int_{a - i\infty}^{a + i\infty}x^zd\frac{\ln\zeta(z)}{z}$$
其中
$$\ln\zeta(s) = \ln\xi(0) + \sum_\rho\ln(1 - \frac{s}{\rho}) - \ln\Gamma(\frac{s}{2} + 1) + \frac{s}{2}\ln\pi - \ln(s -1)$$
黎曼注意到除$\ln\xi(0)$外，其余项均可表达为类似
$$F(\beta) = \frac{1}{2\pi i}\frac{1}{\ln x}\int_{a - i\infty}^{a + i\infty}x^sd\frac{\ln(\frac{s}{\beta} - 1)}{s}$$
的形式，例如$F(1)$对应$\ln(s - 1)$。现在的技巧是我们先求$F'(\beta)$，这给出
$$F'(\beta) = \frac{1}{2\pi i}\frac{1}{\ln x}\int_{a - i\infty}^{a + i\infty}x^sd\frac{1}{(\beta - s)\beta}$$
我们像上面一样如法炮制，做一次分部积分就得到
$$\beta F'(\beta) = -\frac{1}{2\pi i}\int_{a - i\infty}^{a + i\infty}\frac{x^s}{\beta - s}ds$$
令$z = -s$，可以看出上式是一个Mellin逆变换的表达式，做逆变换的函数是
$$\varphi(z) = -\frac{1}{\beta + z}$$
注意到
$$-\frac{1}{\beta + z} = \int_1^\infty x^{z - 1}x^\beta dx$$
是对应的Mellin变换，就有
$$F'(\beta) = \frac{x^\beta}{\beta}$$
如果$\Re(\beta) < 0$，就有
$$F'(\beta) = \int_\infty^x x^{\beta - 1}dx, ~ F(\beta) = \int_\infty^x \frac{x^{\beta - 1}}{\ln x}dx + C$$
若$\Re(\beta) > 0$则有
$$F'(\beta) = \int_0^x x^{\beta - 1}dx, ~ F(\beta) = \int_0^x \frac{x^{\beta - 1}}{\ln x}dx + C$$
## 积分常数的确定
### $\Re(\beta) > 0$的情况
记
$$G(\beta) = \int_0^x \frac{x^{\beta - 1}}{\ln x}dx$$
我们做换元$u = \ln x$，得到
$$G(\beta) = \int_{-\infty}^{\ln x}\frac{e^{u\beta}}{u}du$$
把这个积分放到复平面上，由于$u = 0$时被积函数没有定义，我们考虑在上半平面上的积分
$$G(\beta) = \int_{-\infty + i\delta}^{\ln x + i\delta}\frac{e^{u\beta}}{u}du + \int^{\ln x}_{\ln x + i\delta}\frac{e^{u\beta}}{u}du$$
其中$\delta > 0$. 对于上面第一个积分我们做换元$u = v + i\delta$，而对第二个积分我们做换元$u = \ln x + iw$，并将$\beta = \sigma + i\tau$代入，得到
$$G(\beta) = e^{i\sigma\delta}e^{-\delta\tau}\int_{-\infty}^{\ln x}\frac{e^{\beta v}}{v + i\delta}dv - ix^\beta\int_0^\delta\frac{e^{-w\tau}e^{i\sigma w}}{\ln x + iw}dw$$
考虑$\tau$趋于正无穷时有$e^{-\delta\tau} = 0$和$e^{-w\tau} = 0$，而其余项均在有限范围内，就有
$$\lim_{\tau \to \infty}G(\sigma + i\tau) = 0$$

现在为了计算$F(\beta)$的极限，我们记
$$H(\beta) = \frac{1}{2\pi i}\frac{1}{\ln x}\int_{a - i\infty}^{a + i\infty}x^sd\frac{\ln(1 - \frac{s}{\beta})}{s}$$
于是
$$H(\beta) - F(\beta) = \frac{1}{2\pi i}\frac{1}{\ln x}\int_{a - i\infty}^{a + i\infty}x^sd\frac{i\pi}{s}$$
分部积分给出
$$H(\beta) - F(\beta) = -\frac{1}{2\pi i}\int_{a - i\infty}^{a + i\infty}x^s\frac{i\pi}{s}ds$$
在前面得出的Mellin变换的结果
$$x^\beta = \beta F'(\beta) = -\frac{1}{2\pi i}\int_{a - i\infty}^{a + i\infty}\frac{x^s}{\beta - s}ds$$
中令$\beta = 0$得到
$$1 = \frac{1}{2\pi i}\int_{a - i\infty}^{a + i\infty}\frac{x^s}{s}ds$$
于是
$$H(\beta) - F(\beta) = -i\pi$$
然而$H(\beta)$的极限是容易得出的，因为
$$H(\beta) = \frac{1}{2\pi i}\frac{1}{\ln x}\int_{a - i\infty}^{a + i\infty}x^s[-\frac{\ln(1 - \frac{s}{\beta})}{s^2} + \frac{1}{\beta(s - \beta)} - \frac{1}{\beta s}]ds$$
后两项的积分结果仍可以利用前面的Mellin变换给出，其结果是$\frac{x^\beta}{\beta} - \frac{1}{\beta}$，于是其极限为零。对第一项使用勒贝格控制收敛定理，发现我们可以交换积分和极限的顺序，其结果也为零。总之我们最终得到
$$\lim_{\tau \to \infty}H(\sigma + i\tau) = 0, ~ \lim_{\tau \to \infty}F(\sigma + i\tau) = i\pi$$
于是我们要求的积分常数就是$i\pi$. 而
$$\begin{aligned}
F(1) &= \int_0^x \frac{1}{\ln x}dx + i\pi \\
&= \int_0^{1 - \epsilon} \frac{1}{\ln x}dx + \int_{1 - \epsilon}^{1 + \epsilon} \frac{x - 1}{\ln x}\frac{1}{x - 1}dx + \int_{1 + \epsilon}^x \frac{1}{\ln x}dx + i\pi \\
&= \int_0^{1 - \epsilon} \frac{1}{\ln x}dx + \int_{1 + \epsilon}^x \frac{1}{\ln x}dx \\
&= \mathrm{li}(x)
\end{aligned}$$
> 注意到$\lim_{\epsilon \to 0}\frac{x - 1}{\ln x} = 1$（洛必达法则），就有
> $$\int_{1 - \epsilon}^{1 + \epsilon} \frac{x - 1}{\ln x}\frac{1}{x - 1}dx = \int_{1 - \epsilon}^{1 + \epsilon}\frac{1}{x - 1}dx = \ln(\epsilon) - \ln(-\epsilon) = -i\pi$$
> 上述所有带$\epsilon$的表达式均令其从正向趋于零。

## $\sum_\rho\ln(1 - \frac{s}{\rho})$项的计算
将此求和项逐项积分得到$-\sum H(\rho)$，前面我们已经证明$H(\rho) = G(\rho)$，但逐项积分后的结果是条件收敛的，需要将$\rho$和$1 - \rho$进行配对并按$\Im(\rho)$从小到大的顺序求和，这给出
$$-\sum_{\Im(\rho) > 0}(\int_0^x \frac{x^{\rho- 1}}{\ln x}dx + \int_0^x \frac{x^{-\rho}}{\ln x}dx)$$
做变量代换$t = x^\beta$，即$\ln t = \beta\ln x, ~ dt = \beta x^{\beta- 1}dx$，就有
$$\int_0^x \frac{x^{\beta- 1}}{\ln x}dx = \int_0^t\frac{1}{\ln t}dt = \mathrm{li}(x^\beta) \pm i\pi$$
其中正负号与积分经过上半平面或下半平面有关。由此得到最终的结果是
$$-\sum_{\Im(\rho) > 0}[\mathrm{li}(x^\rho) + \mathrm{li}(x^{1-\rho})]$$

## $\ln\Gamma(\frac{s}{2} + 1)$项的计算
利用$\Gamma$函数的另一个等价定义
$$\Gamma(z) = \frac{1}{z}\prod_{n = 1}^\infty[\frac{1}{1 + \frac{z}{n}}(1 + \frac{1}{n})^z]$$
我们可以得到
$$\ln\Gamma(\frac{s}{2} + 1) = \ln[\frac{s}{2}\Gamma(\frac{s}{2})] = \sum_{n = 1}^\infty[-\ln(1 + \frac{s}{2n}) + \frac{s}{2}\ln(1 + \frac{1}{n})]$$
将上式代入积分得
$$-\sum_{n = 1}^\infty\frac{1}{2\pi i}\frac{1}{\ln x}\int_{a - i\infty}^{a + i\infty}x^zd\frac{\ln(1 + \frac{s}{2n})}{s} = -\sum_{n = 1}^\infty H(-2n)$$
### $\Re(\beta) < 0$的情况
前面对$H(\beta)$的讨论集中在$\Re(\beta) > 0$的情况，为了得到$\Re(\beta) < 0$的情况，我们设
$$E(\beta) = \int_\infty^x \frac{t^{\beta - 1}}{\ln t}dt$$
结合前面关于$F(\beta)$的结论我们有$E'(\beta) = F'(\beta) = H'(\beta)$，于是$E(\beta)$和$H(\beta)$至多相差一个常数。而当$\beta \to -\infty$时$E(\beta)$和$H(\beta)$都趋于零，于是这个常数为零，即$E(\beta) = H(\beta)$. 于是上述积分就可表示为
$$-\sum_{n = 1}^\infty H(-2n) = -\sum_{n = 1}^\infty E(-2n) = \sum_{n = 1}^\infty\int^\infty_x \frac{t^{-2n - 1}}{\ln t}dt = \int^\infty_x \frac{\sum_{n = 1}^\infty t^{-2n}}{t\ln t}dt = \int^\infty_x \frac{1}{t(t^2 - 1)\ln t}dt$$

## 其余项的计算
对于$\ln\xi(0)$，代入后做一次分部积分，然后利用前面$\beta = 0$时得到的结果容易算出这项为$\ln\xi(0)$. 因为$\xi(0) = (0 - 1)\pi^0\Gamma(1)\zeta(0) = -\zeta(0) = -B_1 = \frac{1}{2}$，于是该项的数值结果就是$-\ln2$.

而对于$\frac{s}{2}\ln\pi$代入后容易看出其结果为0.

现在我们就完成了$\ln\zeta(s)$分解式中各项积分的计算，现小结如下
$\ln\zeta(s)$分解式中的项     |  对应的积分结果
-------- | -----
$\ln\xi(0)$  | $\ln\xi(0) = -\ln2$
$\sum_\rho\ln(1 - \frac{s}{\rho})$  | $-\sum_{\Im(\rho) > 0}[\mathrm{li}(x^\rho) + \mathrm{li}(x^{1-\rho})]$
$- \ln\Gamma(\frac{s}{2} + 1)$  | $\int^\infty_x \frac{1}{t(t^2 - 1)\ln t}dt$
$\frac{s}{2}\ln\pi$ | $0$
$- \ln(s -1)$ | $\mathrm{li}(x)$

最终我们得到$J(x)$的精确表达式为
$$J(x) = \mathrm{li}(x) - \sum_{\Im(\rho) > 0}[\mathrm{li}(x^\rho) + \mathrm{li}(x^{1-\rho})] + \int^\infty_x \frac{1}{t(t^2 - 1)\ln t}dt - \ln2$$
