@[TOC](爱因斯坦场方程之Schwarzschild真空解)

# 爱因斯坦场方程之Schwarzschild真空解

## 李导数和Killing矢量场

### 推拉映射
设$\phi$是流形间的光滑映射，其拉回映射$\phi^*$定义为
$$(\phi^*f)|_p = f|_{\phi(p)}$$
其推前映射$\phi_*$定义为
$$(\phi_*v)|_{\phi(p)}(f) = v|_p(\phi^*f)$$
拉回映射的定义可以推广到$(0, l)$型张量场，只需定义
$$(\phi^*T)_{a_1\cdots a_l}|_p(v_1)^{a_1}\cdots(v_l)^{a_l} = T_{a_1\cdots a_l}|_{\phi(p)}(\phi_*v_1)^{a_1}\cdots(\phi_*v_l)^{a_l}$$
类似地，推前映射的推广为
$$(\phi_*T)^{a_1\cdots a_k}|_{\phi(p)}(\omega^1)_{a_1}\cdots(\omega^k)_{a_k} = T^{a_1\cdots a_k}|_p(\phi^*\omega^1)_{a_1}\cdots(\phi^*\omega^k)_{a_k}$$
进一步的推广给出
$$(\phi_*T)^{a_1\cdots a_k}{}_{b_1\cdots b_l}|_{\phi(p)}(\omega^1)_{a_1}\cdots(\omega^k)_{a_k}(v_1)^{b_1}\cdots(v_l)^{b_l} = T^{a_1\cdots a_k}{}_{b_1\cdots b_l}|_p(\phi^*\omega^1)_{a_1}\cdots(\phi^*\omega^k)_{a_k}(\phi_*^{-1}v)^{b_1}\cdots(\phi_*^{-1}v)^{b_l}$$
和
$$(\phi^*T)^{a_1\cdots a_k}{}_{b_1\cdots b_l}|_p(\omega^1)_{a_1}\cdots(\omega^k)_{a_k}(v_1)^{b_1}\cdots(v_l)^{b_l} = T^{a_1\cdots a_k}{}_{b_1\cdots b_l}|_{\phi(p)}(\phi^{-1*}\omega^1)_{a_1}\cdots(\phi^{-1*}\omega^k)_{a_k}(\phi_*v)^{b_1}\cdots(\phi_*v)^{b_l}$$

### 李导数
我们知道光滑矢量场对应单参微分同胚群，也就是说我们考虑该矢量场的积分曲线，然后定义$\phi_t(p)$为位于过$p$点的积分曲线上，与$p$点的参数值差$t$的点。对于映射$\phi_t$，我们可以考虑其拉回$\phi^*_t$，李导数在此基础上定义为
$$\mathscr L_vT^{a_1\cdots a_k}{}_{b_1\cdots b_l} = \lim_{t\to 0}\frac{1}{t}(\phi^*_tT^{a_1\cdots a_k}{}_{b_1\cdots b_l} - T^{a_1\cdots a_k}{}_{b_1\cdots b_l})$$

以积分曲线为$x^1$坐标线的坐标系叫做矢量场的适配坐标系。可以证明，李导数就是对适配坐标系的$x^1$坐标的导数。由此又可以证明$[v, u]^\mu = (dx^\mu)_a(v^b\partial_bu^a - u^b\partial_bv^a) = v^b\partial_bu^\mu = v(u^\mu) = \frac{\partial u^\mu}{\partial x^1} = (\mathscr L_vu)^\mu$. 类似地可以证明
$$\mathscr L_vT^{a_1\cdots a_k}{}_{b_1\cdots b_l} = v^c\nabla_cT^{a_1\cdots a_k}{}_{b_1\cdots b_l} - \sum_{i = 1}^kT^{a_1\cdots a_k}{}_{b_1\cdots b_l}\nabla_cv^{a_i} + \sum_{j = 1}^lT^{a_1\cdots a_k}{}_{b_1\cdots b_l}\nabla_{b_j}v^c$$

### Killing矢量场
$(M, g_{ab})$上的矢量场$\xi^a$称为Killing矢量场，若它给出的单参微分同胚群是单参等度规群，即$\phi^*g_{ab} = g_{ab}$. 按李导数的定义，这等价于$\mathscr L_\xi g_{ab} = 0$. 也就是说，如果$\frac{\partial g_{\mu\nu}}{\partial x^1} = 0$，则$(\frac{\partial}{\partial x^1})^a$就是Killing矢量场。而$0 = \mathscr L_\xi g_{ab} = \xi^c\nabla_cg_{ab} + g_{cb}\nabla_a\xi^c + g_{ac}\nabla_b\xi^c = \nabla_a\xi_b + \nabla_b\xi_a$. 这被称为Killing方程
$$\nabla_{(a}\xi_{b)} = 0$$

## 静态球对称时空
称时空$(M, g_{ab})$为稳态的，如果它存在类时的Killing矢量场。根据Killing矢量场的定义，有$\frac{\partial g_{\mu\nu}}{\partial t} = (\mathscr L_\xi g)_{\mu\nu} = 0$. 故稳态时空的度规具有时间平移不变性。
$(M, g_{ab})$中的矢量场$v^a$称为超曲面正交的，如果$M$中每一点都存在与$v^a$正交的超曲面。
时空$(M, g_{ab})$称为静态的，如果它存在超曲面正交的类时Killing矢量场。静态度规具有时间反射不变性。
坐标系称为时轴正交的，如果类时坐标基矢与类空坐标基矢正交，此时稳态时空的线元表达式就可以简化为
$$ds^2 = g_{00}(x^1, x^2, x^3)dt^2 + g_{ij}(x^1, x^2, x^3)dx^idy^j$$
使用[雅可比行列式](?article=coordinate_transformation#计算方法)求欧氏空间中的[球坐标系](?article=laplacian_in_spherical_coordinate_system)中的度规可得
$$ds^2 = dr^2 + r^2d\theta^2 + r^2\sin^2\theta d\varphi^2$$
> 这里需要用到的雅可比矩阵为$\frac{\partial (x, y, z)}{\partial (r, \theta, \varphi)}$，代入$G = J^TJ$即可求出度规。

度规不含$\varphi$，由此容易看出$\xi_1^a = (\frac{\partial}{\partial \varphi})^a$是Killing矢量场。由于球对称性，不难相信$g_{00}, g_{11}$也不显含$\theta$和$\varphi$. 综上就得到静态球对称度规的一般形式
$$ds^2 = g_{00}(r)dt^2 + g_{11}(r)dr^2 + r^2d\theta^2 + r^2\sin^2\theta d\varphi^2$$
为方便起见，我们把$g_{00}、g_{11}$分别记作$-e^{2A(r)}, e^{2B(r)}$.

### Schwarzschild真空解
下面我们就可以求此度规的曲率。首先上述度规是正交的，但不归一，其归一形式应为
$$ds^2 = -(e^Adt)^2 + (e^Bdr)^2 + (rd\theta)^2 + (r\sin\theta d\varphi)^2$$
也就是其正交归一坐标基底为
$$(e_0)^a = e^{-A}(\frac{\partial}{\partial t})^a, (e_1)^a = e^{-B}(\frac{\partial}{\partial r})^a, (e_2)^a = r^{-1}(\frac{\partial}{\partial \theta})^a, (e_3)^a = (r\sin\theta)^{-1}(\frac{\partial}{\partial \varphi})^a$$
对应的对偶基矢为
$$(e^0)_a = e^A(dt)_a, (e^1)_a = e^B(dr)_a, (e^2)_a = r(d\theta)_a, (e^3)_a = r\sin\theta(d\varphi)_a$$
现在求上述基矢的外微分，以下略去抽象指标，并根据嘉当第一结构方程就有
$$
de^0 = e^AA'dr\wedge dt = A'e^{-B}e^1\wedge e^0 = -e^1\wedge\omega_1{}^0 - e^2\wedge\omega_2{}^0 - e^3\wedge\omega_3{}^0 \\
de^1 = e^Bdr\wedge dr = 0 = -e^0\wedge\omega_0{}^1 - e^2\wedge\omega_2{}^1 - e^3\wedge\omega_3{}^1\\
de^2 = drd\theta = r^{-1}e^{-B}e^1\wedge e^2 = -e^0\wedge\omega_0{}^2 - e^1\wedge\omega_1{}^2 - e^3\wedge\omega_3{}^2 \\
de^3 = (dr\sin\theta + r\cos\theta d\theta)d\varphi = r^{-1}e^{-B}e^1\wedge e^3 + r^{-1}\cot\theta e^2\wedge e^3 = -e^0\wedge\omega_0{}^3 - e^1\wedge\omega_1{}^3 - e^2\wedge\omega_2{}^3
$$
上述方程最简单的非零解为
$$
\omega_1{}^0 = -A'e^{-B}e^0 = -A'e^{A - B}dt \\
\omega_1{}^2 = -r^{-1}e^{-B}e^2 = -e^{-B}d\theta \\
\omega_1{}^3 = -r^{-1}e^{-B}e^3 = -e^{-B}\sin\theta d\varphi \\
\omega_2{}^3 = -r^{-1}\cot\theta e^3 = -\cos\theta d\varphi
$$
然后用嘉当第二结构方程求曲率2形式，也即
$$\begin{aligned}
R_0{}^1 &= d\omega_0{}^1 = [A''e^{A - B} + A'(A' - B')e^{A - B}]dr \wedge dt = e^{-2B}(A'' - A'B' + A'^2)e^0\wedge e^1 \\
R_0{}^2 &= \omega_0{}^1 \wedge \omega_1{}^2 = A'e^{A - 2B}dt \wedge d\theta = r^{-1}A'e^{-2B}e^0\wedge e^2 \\
R_0{}^3 &= \omega_0{}^1 \wedge \omega_1{}^3 = A'e^{A - 2B}\sin\theta dt \wedge d\varphi = r^{-1}A'e^{-2B}e^0\wedge e^3 \\
R_1{}^2 &= d\omega_1{}^2 + \omega_1{}^3 \wedge \omega_3{}^2 = B'e^{-B}dr\wedge d\theta = r^{-1}B'e^{-2B} e^1 \wedge e^2 \\
R_1{}^3 &= d\omega_1{}^3 + \omega_1{}^2 \wedge \omega_2{}^3 = (B'e^{-B}\sin\theta dr - e^{-B}\cos\theta d\theta) \wedge d\varphi + e^{-B}\cos\theta d\theta \wedge d\varphi = r^{-1}B'e^{-2B}e^1 \wedge e^3 \\
R_2{}^3 &= d\omega_2{}^3 + \omega_2{}^1 \wedge \omega_1{}^3 + \omega_2{}^3 \wedge \omega_3{}^1 = \sin\theta d\theta \wedge d\varphi - e^{-2B}\sin\theta d\theta \wedge d\varphi = r^{-2}(1 - e^{-2B}) e^2 \wedge e^3
\end{aligned}$$
根据曲率形式的定义$R_\mu{}^\nu = \frac{1}{2}R_{\rho\sigma\mu}{}^\nu e^\rho \wedge e^\sigma$，对于$R_0{}^1$来说，因为它的形式中仅含$e^0\wedge e^1$，因此$R_0{}^1 = \frac{1}{2}(R_{010}{}^1e^0 \wedge e^1 + R_{100}{}^1 e^1 \wedge e^0) = R_{010}{}^1e^0 \wedge e^1$，所以就有
$$\begin{aligned}
R_{010}{}^1 &= e^{-2B}(A'' - A'B' + A'^2) \\
R_{020}{}^2 &=  R_{030}{}^3 = r^{-1}A'e^{-2B} \\
R_{121}{}^2 &= R_{131}{}^3 = r^{-1}B'e^{-2B}  \\
R_{232}{}^3 &= r^{-2}(1 - e^{-2B})
\end{aligned}$$
故
$$\begin{aligned}
R_{00} &= R_{010}{}^1 + R_{020}{}^2 + R_{030}{}^3 = e^{-2B}(A'' - A'B' + A'^2 + 2r^{-1}A') \\
R_{11} &= R_{101}{}^0 + R_{121}{}^2 + R_{131}{}^3 = e^{-2B}(-A'' + A'B' - A'^2 + 2r^{-1}B') \\
R_{22} &= R_{202}{}^0 + R_{212}{}^1 + R_{232}{}^3 = e^{-2B}[r^{-1}(B' - A') - r^{-2}] + r^{-2} \\
R_{33} &= R_{303}{}^0 + R_{313}{}^1 + R_{323}{}^2 = R_{22}
\end{aligned}$$
以上是正交归一基底下的里奇张量的表达式，如果不习惯的话，也可以用张量的变换法则
$$R'_{\mu\nu} = \frac{\partial x^\rho}{\partial x^\mu}\frac{\partial x^\sigma}{\partial x^\nu}R_{\rho\sigma}$$
变换回球坐标系下，其结果就是
$$\begin{aligned}
R_{00} &= e^{2(A - B)}(A'' - A'B' + A'^2 + 2r^{-1}A') \\
R_{11} &= -A'' + A'B' - A'^2 + 2r^{-1}B' \\
R_{22} &= -e^{-2B}[1 + r(A' - B')] + 1 \\
R_{33} &= -\{e^{-2B}[1 + r(A' - B')] - 1\}\sin^2\theta
\end{aligned}$$

爱因斯坦场方程为
$$R_{ab} - \frac{1}{2}Rg_{ab} = 8\pi T_{ab}$$
我们令$T_{ab} = 0$以便考虑其在真空下的表达式，$R_{ab} - \frac{1}{2}Rg_{ab} = 0$，两边求迹(注意$g^{ab}g_{ab} = \delta^a{}_a$，其迹为$4$)就有$R - 2R = 0$，于是真空爱因斯坦场方程就是
$$R_{ab} = 0$$
再结合前述结果，给出如下方程
$$
A'' - A'B' + A'^2 + 2r^{-1}A' = 0 \\
A'' - A'B' + A'^2 - 2r^{-1}B' = 0 \\
-e^{-2B}[1 + r(A' - B')] + 1 = 0
$$
由前两个方程可以得到$A' = -B'$，因此$A = -B + \alpha$. 再代入第三个方程得
$$1 - 2rB' = e^{2B}$$
这是可分离变量的方程，通过分离变量，得到
$$\frac{2B'}{1 - e^{2B}} = \frac{1}{r}$$
记$x = e^{2B}$，则$dx = 2xdB$，两边积分就有
$$\int\frac{2}{1 - x}dB = \int\frac{2}{1 - x}\frac{1}{2x}dx = \int(\frac{1}{1 - x} + \frac{1}{x})dx= \ln r$$
于是
$$-\ln(1 - x) + \ln x + \ln C = \ln\frac{Cx}{1 - x}= \ln r$$
解得
$$x = e^{2B} = (1 + \frac{C}{r})^{-1}$$
代回原度规表达式得
$$ds^2 = -(1 + \frac{C}{r})e^{2\alpha}dt^2 + (1 + \frac{C}{r})^{-1}dr^2 + r^2d\theta^2 + r^2\sin^2\theta d\varphi^2$$
考虑新坐标$\hat t = e^\alpha t$，并仍将其记作$t$，上式就可以简化为
$$ds^2 = -(1 + \frac{C}{r})dt^2 + (1 + \frac{C}{r})^{-1}dr^2 + r^2d\theta^2 + r^2\sin^2\theta d\varphi^2$$
这就是Schwarzschild度规。注意到当$r \to \infty$时，上述度规自然就变成闵可夫斯基度规的球坐标形式，这说明Schwarzschild度规是渐进平直的。

为了得出$C$的具体表达式，注意到一阶近似下有$(1 + \frac{C}{r})^{-1} = (1 - \frac{C}{r})$，于是上式就近似为
$$ds^2 = -dt^2 + dr^2 + r^2d\theta^2 + r^2\sin^2\theta d\varphi^2 - \frac{C}{r}(dt^2 + dr^2)$$
而一阶近似下$g_{ab} = \eta_{ab} + \gamma_{ab}$，也就是说$\gamma_{00} = -\frac{C}{r}$，根据[牛顿极限](?article=linearized_theory_of_gravity#测地线方程)的结果，就有$\phi = \frac{C}{2r}$. 而在牛顿引力论中，$\phi = -\frac{M}{r}$，于是$C = -2M$，这样就算是得到了Schwarzschild度规的最终表达式
$$ds^2 = -(1 - \frac{2M}{r})dt^2 + (1 - \frac{2M}{r})^{-1}dr^2 + r^2d\theta^2 + r^2\sin^2\theta d\varphi^2$$
其中$M$是星体质量。
