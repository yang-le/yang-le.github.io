@[TOC](线性引力论和牛顿极限)

# 线性引力论
众所周知的爱因斯坦场方程
$$R_{ab} - \frac{1}{2}Rg_{ab} = 8\pi T_{ab}$$
是个高度非线性的二阶偏微分方程组，求解一般是很困难的。但在某些限定条件下，方程可以得到简化。
## 弱场条件
所谓弱场条件，是指时空度规$g_{ab}$接近闵氏度规$\eta_{ab}$. 用式子表示就是
$$g_{ab} = \eta_{ab} + \gamma_{ab}$$
其中$\gamma_{\mu\nu}$的2阶项小到可以忽略。为满足$g^{ab}g_{bc} = \delta^a{}_c$，我们需要令
$$g^{ab} = \eta^{ab} - \gamma^{ab}$$
设$\partial_a$是与$\eta_{ab}$适配的导数算符，则Christoffel符号的表达式
$$\Gamma^c{}_{ab} = \frac{1}{2}g^{cd}(\partial_ag_{bd} + \partial_bg_{ad} - \partial_dg_{ab})$$
在上述条件下就对应于
$$\Gamma^c{}_{ab} = \frac{1}{2}\eta^{cd}(\partial_a\gamma_{bd} + \partial_b\gamma_{ad} - \partial_d\gamma_{ab})$$
下面计算上述条件下黎曼张量的表达式
$$R_{abc}{}^d = -2\partial_{[a}\Gamma^d{}_{b]c} + 2\Gamma^e{}_{c[a}\Gamma^d{}_{b]e}$$
首先$\Gamma^e{}_{c[a}\Gamma^d{}_{b]e}$是二阶项，因此可以忽略。而$-2\partial_{a}\Gamma^d{}_{bc} = -\eta^{de}(\partial_a\partial_b\gamma_{ce} + \partial_c\partial_a\gamma_{be} - \partial_e\partial_a\gamma_{bc})$，取反称后第一项为0，于是就有线性黎曼张量
$$R_{abc}{}^d = \partial^d\partial_{[a}\gamma_{b]c} - \partial_c\partial_{[a}\gamma_{b]}{}^d$$
其中$\partial^d \equiv \eta^{de}\partial_e$. 而里线性奇张量就表示为
$$\begin{aligned}
R_{ac} &= \partial^b\partial_{[a}\gamma_{b]c} - \partial_c\partial_{[a}\gamma_{b]}{}^b \\
&= \frac{1}{2}\partial^b\partial_a\gamma_{bc} - \frac{1}{2}\partial^b\partial_b\gamma_{ac} - \frac{1}{2}\partial_c\partial_a\gamma_b{}^b + \frac{1}{2}\partial_c\partial_b\gamma_a{}^b \\
& = \partial^b\partial_{(a}\gamma_{c)b} - \frac{1}{2}\partial^b\partial_b\gamma_{ac} - \frac{1}{2}\partial_a\partial_c\gamma
\end{aligned}$$
其中最后一步用到$\partial_b\gamma_a{}^b = \partial^b\gamma_{ab}$以及$\gamma_{ab}$的对称性，$\gamma \equiv \gamma_a{}^a$. 此时标量曲率
$$\begin{aligned}
R &= \frac{1}{2}\partial^b\partial_a\gamma^a{}_b  + \frac{1}{2}\partial^b\partial^a\gamma_{ab} - \frac{1}{2}\partial^b\partial_b\gamma - \frac{1}{2}\partial_a\partial^a\gamma \\
&= \partial^a\partial^b\gamma_{ab} - \partial^a\partial_a\gamma
\end{aligned}$$
于是我们得到线性爱因斯坦场方程
$$\partial^c\partial_{(a}\gamma_{b)c} - \frac{1}{2}\partial^c\partial_c\gamma_{ab} - \frac{1}{2}\partial_a\partial_b\gamma - \frac{1}{2}\eta_{ab}(\partial^c\partial^d\gamma_{cd} - \partial^c\partial_c\gamma) = 8\pi T_{ab}$$
令$\bar\gamma_{ab} = \gamma_{ab} - \frac{1}{2}\eta_{ab}\gamma$，上式还可以继续化简为
$$\begin{aligned}
8\pi T_{ab} &= \partial^c\partial_{(a}\bar\gamma_{b)c} + \textcolor{blue}{\frac{1}{2}\partial^c\partial_{(a}\eta_{b)c}\gamma} - \frac{1}{2}\partial^c\partial_c\bar\gamma_{ab} - \textcolor{red}{\frac{1}{4}\partial^c\partial_c\eta_{ab}\gamma} - \textcolor{blue}{\frac{1}{2}\partial_a\partial_b\gamma} - \frac{1}{2}\eta_{ab}(\partial^c\partial^d\bar\gamma_{cd} + \textcolor{red}{\frac{1}{2}\partial^c\partial^d\eta_{cd}\gamma - \partial^c\partial_c\gamma}) \\
&= \partial^c\partial_{(a}\bar\gamma_{b)c} - \frac{1}{2}\partial^c\partial_c\bar\gamma_{ab} - \frac{1}{2}\eta_{ab}\partial^c\partial^d\bar\gamma_{cd}
\end{aligned}$$
用$\partial^b$作用到上式，得
$$
8\pi\partial^bT_{ab} =\frac{1}{2}\partial^c\partial_a\partial^b\bar\gamma_{bc} + \frac{1}{2}\partial^c\partial_b\partial^b\bar\gamma_{ac} - \frac{1}{2}\partial^b\partial^c\partial_c\bar\gamma_{ab} - \frac{1}{2}\partial_a\partial^c\partial^d\bar\gamma_{cd} = 0
$$
这表明线性引力论中能动张量的散度为零，从而保证了各种守恒律。
## 规范变换
令$\tilde\gamma_{ab} \equiv \gamma_{ab} + 2\partial_{(a}\xi_{b)}$，因为
$$\partial^d\partial_a\partial_{(b}\xi_{c)} - \partial^d\partial_b\partial_{(a}\xi_{c)} - \partial_c\partial_a\partial_{(b}\xi_{e)}\eta^{ed} + \partial_c\partial_b\partial_{(a}\xi_{e)}\eta^{ed} = 0$$
容易发现$\tilde\gamma_{ab}$与$\gamma_{ab}$对应相同的线性黎曼曲率张量，因此若$\gamma_{ab}$是线性爱因斯坦场方程的解，则$\tilde\gamma_{ab}$也是。这被称作线性引力论的规范变换。现在我们做这样一种规范变换，使得$\partial^b\bar\gamma_{ab} = 0$. 如果$\bar\gamma_{ab}$不满足此条件，由
$$\begin{aligned}
\partial^b\tilde{\bar\gamma}_{ab} &= \partial^b\tilde\gamma_{ab} - \frac{1}{2}\eta_{ab}\tilde\gamma \\
&= \partial^b\gamma_{ab} + \textcolor{red}{\partial^b\partial_a\xi_b} + \partial^b\partial_b\xi_a - \frac{1}{2}\partial^b\eta_{ab}\eta^{cd}(\gamma_{cd} + \textcolor{red}{\partial_c\xi_d + \partial_d\xi_c}) \\
&= \partial^b\bar\gamma_{ab} +  \partial^b\partial_b\xi_a
\end{aligned}$$
可知我们只需找一个$\xi$满足
$$-\partial^b\bar\gamma_{ab} =  \partial^b\partial_b\xi_a$$
即可使$\partial^b\tilde{\bar\gamma}_{ab} = 0$. 而给定$\bar\gamma_{ab}$后这个方程是非齐次波动方程，它的解总是存在的。此时线性爱因斯坦方程就进一步简化为
$$\partial^c\partial_c\bar\gamma_{ab} = -16\pi T_{ab}$$

# 牛顿极限
## 低速条件
所谓低速条件，具体来说是指：
1. 因为速度很小，所以动量密度很小可以忽略。此外3维应力与质量密度比较也可以忽略(例如地心压强只有密度的$10^{-10}$倍)。于是能动张量$T_{ab}$可以在某个惯性坐标系中表示为
$$T_{ab} \simeq \rho(dt)_a(dt)_b$$
2. 因为速度很小，此引力源导致的时空几何变化缓慢，故
$$\frac{\partial \bar\gamma_{\mu\nu}}{\partial t} \simeq 0$$
3. 因为速度很小，其4速近似于惯性观者的四速$T^a \equiv (\frac{\partial}{\partial t})^a$，即
$$U^a \simeq T^a$$

在上述条件下，线性爱因斯坦方程就简化为
$$\begin{aligned}
\nabla^2\bar\gamma_{00} &= -16\pi\rho \\
\nabla^2\bar\gamma_{0i} &= 0 \\
\nabla^2\bar\gamma_{ij} &= 0
\end{aligned}$$
后两式的解为常数，可以借助规范变换把这常数变为0，因此$\bar\gamma_{\mu\nu}$的唯一非零分量为$\bar\gamma_{00}$. 今令
$$\phi = -\frac{1}{4}\bar\gamma_{00}$$
上述方程就成为牛顿引力论中的泊松方程
$$\nabla^2\phi = 4\pi\rho$$
上述结论也可以用张量等式表达为
$$\bar\gamma_{ab} = \bar\gamma_{00}(dt)_a(dt)_b = -4\phi(dt)_a(dt)_b$$
于是
$$\bar\gamma = \eta^{ab}\bar\gamma_{ab} = \bar\gamma_{00}\eta^{ab}(dt)_a(dt)_b = -\bar\gamma_{00} = 4\phi$$
而
$$\gamma = \eta^{ab}\gamma_{ab} = \eta^{ab}\bar\gamma_{ab} + \frac{1}{2}\eta^{ab}\eta_{ab}\gamma = \bar\gamma + 2\gamma$$
故$\gamma = -\bar\gamma$，于是我们求得
$$\gamma_{ab} = \bar\gamma_{ab} - \frac{1}{2}\eta_{ab}\bar\gamma = -\phi[4(dt)_a(dt)_b + 2\eta_{ab}]$$

## 测地线方程
如果曲线切矢沿线平移，则称该曲线为测地线，即
$$T^b\nabla_aT^a = 0$$
该方程称为测地线方程。选取坐标系后，上述方程可以表达为
$$T^b(\partial_bT^a + \Gamma^a{}_{bc}T^c) = 0$$
写成分量形式就是
$$\frac{dT^\mu}{dt} + \Gamma^\mu{}_{\nu\sigma}T^\nu T^\sigma = 0$$
设$x = x(t)$是上述曲线的参数式，则上式又可以改写为
$$\frac{d^2x^\mu}{dt^2} + \Gamma^\mu{}_{\nu\sigma}\frac{dx^\nu}{dt}\frac{dx^\sigma}{dt} = 0$$

此方程在低速条件下近似为
$$\frac{d^2x^\mu}{dt^2} = -\Gamma^\mu{}_{00}$$
注意到$\gamma_{00} = -2\phi, ~ \gamma_{j0} = \bar\gamma_{j0} + \frac{1}{2}\eta_{j0}\gamma = 0$，考虑$\Gamma^\mu{}_{00}$的分量，就有
$$
\Gamma^0{}_{00} = \frac{1}{2}\eta^{00}(\gamma_{00,0} + \gamma_{00,0} - \gamma_{00,0}) = -\frac{1}{2}\frac{\partial\gamma_{00}}{\partial t} \simeq 0 \\
\Gamma^i{}_{00} = \frac{1}{2}\eta^{ij}(\gamma_{j0,0} + \gamma_{0j,0} - \gamma_{00,j}) \simeq -\frac{1}{2}\eta^{ij}\gamma_{00,j} = -\frac{1}{2}\frac{\partial\gamma_{00}}{\partial x^i}
$$
于是测地线方程近似为
$$\vec a = \frac{d^2x^i}{dt^2} = -\frac{\partial\phi}{\partial x^i} = -\vec\nabla\phi$$
这正是牛顿引力论中只受引力的质点的运动方程。

由$g_{00} = \eta_{00} + \gamma_{00} = -(1 + 2\phi)$得
$$\phi = -\frac{1}{2}(1 + g_{00})$$
这反映了牛顿近似下度规分量$g_{00}$同牛顿引力势的密切关系。
