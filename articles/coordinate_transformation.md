@[TOC](坐标变换)

# 坐标变换
## 切矢和切空间
从流形$M$到$R$的映射
$$f \colon M \to \R$$
称为$M$上的函数或$M$上的标量场。
从流形$M$上的全体光滑函数的集合$\mathscr F_M$到$\R$的映射
$$v \colon \mathscr F_M \to \R$$
称为点$p \in M$的一个矢量，若$\forall f, g \in \mathscr F_M; ~ \alpha, \beta \in \R$有
$$\begin{array}{ll}
v(\alpha f + \beta g) = \alpha v(f) + \beta v(g) \\
v(fg) = v(f)g|_p + f|_pv(g)
\end{array}$$
设$I$为$\R$的一个区间，映射
$$C \colon I \to M$$
称为$M$上的一条曲线。对任一$t \in I$，有唯一的点$C(t) \in M$与之对应。$t$称为曲线的参数。
设$C(t)$是$M$上的曲线，则线上$C(t_0)$点的切于$C(t)$的切矢$T$是$C(t_0)$点的矢量，定义为
$$T(f) := \frac{d(f \circ C)}{dt}|_{t_0}, ~ \forall f \in \mathscr F_M$$
常把$C(t_0)$点的切于$C(t)$的切矢$T$记作$\frac{\partial}{\partial t}|_{C(t_0)}$。
$M$中$p$点所有矢量的集合$V_p$是$n$维矢量空间($n$是$M$的维数)。其中任一元素均可视为过$p$点的某曲线的切矢，因此$p$点的矢量也称为切矢量，$V_p$则称为$p$点的切空间。
## 坐标线和坐标基底
设$O$为一坐标系，$x^\mu$为其坐标，则$O$的子集
$$\{p \in O | x^2(p) = const, \cdots, x^n(p) = const \}$$
是以$x^1$为参数的一条曲线(改变$x^2, \cdots, x^n$的常数值则得另一曲线)，称为$x^1$坐标线。
过点$p$的$x^\mu$坐标线的切矢称为点$p$的一个坐标基矢，记作$\frac{\partial}{\partial x^\mu}|_p$。点$p$所有的坐标基矢的集合
$$\{\frac{\partial}{\partial x^1}, \cdots, \frac{\partial}{\partial x^n}\}$$
称为$V_p$的一个坐标基底。对于任一$v \in V_p$，总可以用$V_p$的一个坐标基底线性表出，记作
$$v = v^\mu\frac{\partial}{\partial x^\mu}$$
其中的系数$v^\mu$称为$v$的坐标分量。
### 坐标基矢的变换
设$\{x^\mu\}$和$\{x'^\nu\}$是两个坐标系，其交集$O$非空。$\phi\colon x^\mu \mapsto x'^\nu$是两者之间的坐标变换。根据坐标基矢的定义
$$\frac{\partial}{\partial x^\mu}(f) := \frac{\partial f(x)}{\partial x^\mu} = \frac{\partial f(x')}{\partial x'^\nu}\frac{\partial x'^\nu}{\partial x^\mu} = D\phi\frac{\partial}{\partial x'^\nu}(f), ~ \forall f \in \mathscr F_O$$
其中$D\phi := \frac{\partial x'^\nu}{\partial x^\mu}$称为变换$\phi$的雅可比矩阵，在无需指明具体变换时也记作$J$。
### 推前映射
注意到正是$\phi$把函数$f(x)$映射到$f(x') = \phi(f(x))$，我们就可以考虑两者坐标基矢之间的关系。记
$$\phi_*\frac{\partial f(x)}{\partial x^\mu} \equiv \frac{\partial\phi(f(x))}{\partial x^\mu} = J\frac{\partial f(x')}{\partial x'^\nu}$$
并称$\phi_*$为推前映射，它把一个坐标基矢映射为另一个坐标系下的矢量。由于$f$是任意选取的，我们就有
$$\phi_*\frac{\partial}{\partial x^\mu} = J\frac{\partial}{\partial x'^\nu}$$
可见坐标基矢的推前在新坐标系下的分量就是坐标变换的雅可比矩阵，其本质无非就是复合函数求导的链式法则。
设$v = v^\mu e_\mu$，因为$e_\mu$做推前映射后变为$Je'_\nu$，所以$v$相应地也被推前为$v^\nu J e'_\nu = Jv^\nu e'_\nu = Jv$。
## 对偶矢量和对偶基底
设$V$是$\R$上的有限维矢量空间。线性映射
$$\omega \colon V \to \R$$
称为$V$上的对偶矢量。$V$上全体对偶矢量的集合称为$V$的对偶空间，记作$V^*$。
设$\{e_\mu\}$是$V$的一组基矢，用下式定义$V^*$中的$n$个特别元素$e^1, \cdots, e^n$：
$$e^\mu(e_\nu) := \delta^\mu{}_\nu$$
可以证明$\{e^\mu\}$是$V^*$的一个基底，叫做$\{e_\mu\}$的对偶基底。
设$f \in \mathscr F_M$，$f$自然诱导出$M$上的一个对偶矢量场，记作$df$，定义如下:
$$df|_p(v) := v(f), ~ \forall v \in V_p$$
容易验证，$d(fg) = (df)g + f(dg)$。
设$O$是一坐标系，则第$\mu$个坐标$x^\mu$可以看作$O$上的函数，于是$dx^\mu$是定义在$O$上的对偶矢量场。设$p \in O, ~ \partial / \partial x^\nu$是$V_p$的第$\nu$个坐标基矢，则由上述定义可知在$p$点有
$$dx^\mu(\frac{\partial}{\partial x^\nu}) = \frac{\partial}{\partial x^\nu}(x^\mu) = \delta^\mu{}_\nu$$
因此，$\{dx^\mu\}$正是与坐标基底$\{\partial / \partial x^\mu\}$对应的对偶坐标基底。同样地，$O$上任一对偶矢量$\omega$可借$\{dx^\mu\}$展开。实际上，如果记$\omega_\mu \equiv \omega(\partial / \partial x^\mu)$，则容易证明
$$\omega = \omega_\mu dx^\mu$$
其中$\omega_\mu$称为$\omega$在该系的坐标分量。设$f$是$O$上的光滑函数，则不难证明$df$可用对偶坐标基底$\{dx^\mu\}$展开如下:
$$df = \frac{\partial f(x)}{\partial x^\mu}dx^\mu, ~ \forall f \in \mathscr F_O$$
这实际上就是全微分的链式法则。注意这里的$\frac{\partial f(x)}{\partial x^\mu}$是$\frac{\partial}{\partial x^\mu}(f)$的简写，不可理解为$\frac{\partial}{\partial x^\mu}$和$f(x)$的张量积。
## 度规张量
定义矢量空间$V$上的一个$(k, l)$型张量为一个多重线性映射
$$T \colon {V^*}^k \times V^l \to \R$$
度规$g$是$V$上的一个对称、非退化的$(0, 2)$型张量，即
$$g \colon V\times V \to \R$$
$g$也可以借$V$的任一对偶基底$\{e^\mu\}$展开，记$g_{\mu\nu} \equiv g(e_\mu, e_\nu)$，则容易证明
$$g = g_{\mu\nu}e^\mu e^\nu$$
### 线元
我们知道如果把曲线无限放大，那么曲线就和它的切线无限接近。因此我们可以把曲线长度表示为其切矢长度的积分
$$l = \int||\frac{\partial}{\partial t}||dt = \int\sqrt{|g(\frac{\partial}{\partial t}, \frac{\partial}{\partial t})|}dt$$
其中$g(\frac{\partial}{\partial t}, \frac{\partial}{\partial t})$可以在坐标系中展开为
$$g(\frac{\partial}{\partial t}, \frac{\partial}{\partial t}) = g(\frac{dx^\mu}{dt}\frac{\partial}{\partial x^\mu}, \frac{dx^\nu}{dt}\frac{\partial}{\partial x^\nu}) = g(\frac{\partial}{\partial x^\mu}, \frac{\partial}{\partial x^\nu})\frac{dx^\mu}{dt}\frac{dx^\nu}{dt} = g_{\mu\nu}\frac{dx^\mu}{dt}\frac{dx^\nu}{dt}$$
因此就有
$$dl = \sqrt{|g_{\mu\nu}dx^\mu dx^\nu|}$$
根号下的这个$g$的展开式我们记作
$$(ds)^2 = g_{\mu\nu}dx^\mu dx^\nu$$
称为线元，也叫第一基本形式。
### 计算方法
* 使用直角坐标系中的度规展开，例如
$$g(\frac{\partial}{\partial r}, \frac{\partial}{\partial \varphi}) = \delta_{\mu\nu}dx^\mu dx^\nu\frac{\partial}{\partial x^\alpha}\frac{\partial x^\alpha}{\partial r}\frac{\partial}{\partial x^\beta}\frac{\partial x^\beta}{\partial \varphi} = \delta_{\alpha\beta}\frac{\partial x^\alpha}{\partial r}\frac{\partial x^\beta}{\partial \varphi}$$
* 使用雅可比矩阵计算
考虑$g(u, v)$，其中$u, v$是两个矢量。假设某个坐标变换对应的推前映射把$u, v$映射为$Ju, Jv$，因为坐标变换不会改变坐标上的对象，可以认为只是一种"背景"的变化，因此$u^TGv = (Ju)^TG'Jv = u^T(J^TG'J)v$。如果坐标变换的目标坐标系是直角坐标系，也即$G'$为单位阵，就有$G = J^TJ$是原来坐标系的度规。这与上面的方法本质上是等价的。
## 参考链接
- [https://zhuanlan.zhihu.com/p/149863110](https://zhuanlan.zhihu.com/p/149863110)
- [https://zhuanlan.zhihu.com/p/194241346](https://zhuanlan.zhihu.com/p/194241346)
- [difference-between-the-jacobian-matrix-and-the-metric-tensor](https://math.stackexchange.com/questions/923675/difference-between-the-jacobian-matrix-and-the-metric-tensor/956352)
- [what-is-a-pullback-of-a-metric-and-how-does-it-work](https://math.stackexchange.com/questions/2849050/what-is-a-pullback-of-a-metric-and-how-does-it-work/2849081)
