@[TOC](狭义相对论)
## 洛伦兹变换
根据光速不变假设，有
$$\frac{ds}{dt} = \frac{ds'}{dt'} = c$$

也就是说$-c^2dt^2 + ds^2 = 0$对任何惯性参考系都成立。其中$ds^2 = dx^2 + dy^2 + dz^2$。为了简便起见，我们只考虑沿$x$轴运动的情况。我们可以把光速不变假设写为
$$\begin{pmatrix}dt & dx\end{pmatrix}\begin{pmatrix}-c^2 & 0 \\ 0 & 1\end{pmatrix}\begin{pmatrix}dt \\ dx\end{pmatrix} = 0$$

考虑到空间是各向同性和均匀的，可以证明在此条件下惯性系之间的变换一定是线性变换。我们记这个变换为$\Lambda$，即
$$\begin{pmatrix}t' \\ x'\end{pmatrix} = \Lambda\begin{pmatrix}t \\ x\end{pmatrix}$$

那么容易看出$\Lambda$必须满足如下条件
$$\Lambda^T\begin{pmatrix}-c^2 & 0 \\ 0 & 1\end{pmatrix}\Lambda = \begin{pmatrix}-c^2 & 0 \\ 0 & 1\end{pmatrix}$$

由此可以得到$\Lambda$的各元素应该满足如下方程
$$\begin{array}{ll}
\Lambda_{21}^2 & = (\Lambda_{11}^2 - 1)c^2 \\
\Lambda_{22}^2 & = \Lambda_{12}^2c^2 + 1 \\
\Lambda_{21}\Lambda_{22} & = \Lambda_{11}\Lambda_{12}c^2
\end{array}$$

接下来考虑$S'$系相对于$S$系以速度$v$做匀速运动的情形 ，对于$S'$系的原点有
$$\begin{pmatrix}t' \\ 0\end{pmatrix} = \Lambda\begin{pmatrix}t \\ vt\end{pmatrix}$$
类似地，对$S$系的原点有
$$\begin{pmatrix}t' \\ -vt'\end{pmatrix} = \Lambda\begin{pmatrix}t \\ 0\end{pmatrix}$$
由这两个条件可以得出$\Lambda$各元素还应满足如下方程
$$\begin{array}{ll}
\Lambda_{11} & = \Lambda_{22}\\
\Lambda_{12} & = -v\Lambda_{11}
\end{array}$$

由上述五个方程，可知$\Lambda$可以写成如下形式
$$\Lambda = \gamma\begin{pmatrix}1 & -\frac{v}{c^2} \\ -v & 1\end{pmatrix}$$
其中
$$\gamma = \frac{1}{\sqrt{1 - (\frac{v}{c})^2}}， v < c$$

因此，洛伦兹变换就是
$$\begin{array}{ll}
t' & = \gamma(t - vx/c^2) \\
x' &= \gamma(x -vt)
\end{array}$$

我们稍作变形，这样可以使洛伦兹变换看起来更加对称
$$\begin{pmatrix}ct' \\ x'\end{pmatrix} = \gamma\begin{pmatrix}1 & -\frac{v}{c} \\ -\frac{v}{c} & 1\end{pmatrix}\begin{pmatrix}ct \\ x\end{pmatrix}$$

### “尺缩”效应
根据$dx' = \gamma(dx - vdt)$，当dt = 0时，就有$dx' = \gamma dx$。换句话说，一个静止的观者，观察一把运动着的原长度为$dx'$的尺子，其结果为$dx$。显然有$dx < dx'$。

## 闵可夫斯基空间
闵可夫斯基空间是一种四维矢量空间，其中的坐标以$\{x^0, x^1, x^2, x^3\}$来表示。其中$\{x^0 = ct\}$为类时坐标，$\{x^1, x^2, x^3\}$为类空坐标。其中矢量模长的平方定义为$ds^2 = -(dx^0)^2 + (dx^1)^2 + (dx^2)^2 + (dx^3)^2$。其与$t$的关系为
$$ds^2 = -(c^2 - v^2)dt^2$$
不难看出，以速度$c$运动的物体，其矢量模长平方为0，称为类光矢量。而小于速度$c$运动的物体，其矢量模长平方为负，称为类时矢量。另外，模长平方大于0的矢量，称为类空矢量。前面说的光速不变假设，在这里可以推广为洛伦兹变换保持闵可夫斯基空间中的向量模长不变。这一点不难通过计算验证，也可以通过
$$|\Lambda| = 1$$
得出。质点的运动表现为闵可夫斯基空间中的曲线。而运动相关的物理量，则可由闵可夫斯基空间中的标量，矢量，张量等予以表示。

### 固有时和“钟慢”效应
闵可夫斯基空间中的线长(为取时间单位，需除以$c$)称为固有时，其定义为
$$d\tau = \frac{1}{c}\sqrt{-ds^2}$$

根据上述定义可得$dt = \gamma d\tau$，因此惯性观者在本惯性系内的固有时等于其坐标时。一个质点运动固有时$d\tau$时间，在与其一起运动的观者看来，其坐标时为$dt'$；但在外界看来，其经过的时间为$dt = \gamma d\tau = \gamma dt'$。显然有$dt > dt'$。

## 4-矢量
### 4-速度
由于"钟慢"效应，速度就不再具有绝对意义。然而固有时在洛伦兹变换下不变，因此可以考虑重新将速度定义为$\frac{ds}{d\tau}$。将各分量展开写就是
$$V = (\frac{cdt}{d\tau}, \frac{dx}{d\tau}, \frac{dy}{d\tau}, \frac{dz}{d\tau}) = \gamma(c, \dot x, \dot y, \dot z)$$
称为4-速度，可以看出4-速度和普通速度的关系为
$$V = \gamma(c, \vec v) = c\gamma(1, \vec u)$$
且满足$V^2 = -c^2$。

### 4-动量
$$P = mV = (\gamma mc, \gamma m\vec v) = c\gamma(m, m\vec u)$$
其中$\vec p = \gamma m\vec v$称为相对论性动量。

#### 质能方程
我们知道对质点做功可以增加其动能，即
$$dE_k = fdx = dp\frac{dx}{dt} = mvd(\gamma v)$$
其中$vd(\gamma v) = \frac{1}{2}\gamma dv^2 + v^2d\gamma$，而
$$d\gamma = \frac{1}{2c^2}\gamma^3dv^2$$
代入上式，就有
$$vd(\gamma v) = (\frac{c^2}{\gamma^2} + v^2)d\gamma = c^2d\gamma$$
因此
$$dE_k = mc^2d\gamma$$
两边积分，即
$$\int_0^vdE_k = E_k(v) - E_k(0) = E_k(v) = \int_0^vmc^2d\gamma = \gamma(v) mc^2 - \gamma(0)mc^2$$
换言之，
$$\gamma(v)mc^2 = E_k(v) + mc^2$$
其中方程左边是以速度$v$运动的物体所具有的总能量，它等于物体的动能$E_k(v)$加上物体本身所具有的能量$mc^2$。这就是著名的质能方程
$$E = mc^2$$

#### 能量-动量关系
4维表述下的能量-动量有个有趣的关系式
$$E^2 = m^2c^4 + p^2c^2$$
它实际上和$V^2 = -c^2$等价。因为$V^2 = -c^2 \iff ||(\gamma c, \gamma v)||^2 = -c^2 \iff ||(\gamma mc^2, \gamma mvc)||^2 = -m^2c^4 \iff ||(E, pc)||^2 = -m^2c^4 \iff m^2c^4 + (pc)^2 = E^2$

### 4-加速度
$$A = \frac{dV}{d\tau} = (\gamma\dot\gamma c, \gamma^2\vec a + \gamma\dot\gamma \vec v) = c\gamma(\dot\gamma, \gamma \dot{\vec u} + \dot\gamma\vec u)$$
其中$\vec a$就是通常意义下的加速度
$$\dot\gamma = \frac{d\gamma}{dt} = \frac{\gamma^3}{c^2}\vec v\cdot\vec a = \gamma^3\vec u\dot{\vec u}$$
在与物体共同移动的惯性系中，因$\gamma = 1, \dot\gamma = 0$，就有
$$A = (0, a)$$

### 4-力
$$F = \frac{dP}{d\tau} = mA = (\frac{\gamma}{c}\vec f\cdot\vec v, \gamma \vec f) = \gamma(\vec f\cdot\vec u, \vec f)$$
其中$f$的定义为
$$\vec f = \frac{d\vec p}{dt} = \gamma^3m\vec a$$

### 常用计算结论
|表达式| 结果 |
|--|--|
| $\dot\gamma = \frac{d\gamma}{dt}$ | $\gamma^3\vec u\dot{\vec u} = \frac{\vec f\cdot\vec u}{mc}$ |
| $\frac{dt}{d\tau}$ | $\gamma$ |
| $\dot\gamma\vec u + \gamma\dot{\vec u} = \frac{d(\gamma\vec u)}{dt}$ | $\gamma^3\dot{\vec u} = \frac{f}{mc}$ |
