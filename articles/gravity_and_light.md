# 拓扑空间

允许定义函数连续性的最弱的结构，即拓扑。

设$M$是一个集合，一个拓扑$\mathscr O$是其幂集的子集，$\mathscr O \subset \mathscr P(M)$满足

- $\empty \in \mathscr O, M \in \mathscr O$
- $U \in \mathscr O, V \in \mathscr O \Rightarrow U \cap V \in \mathscr O$
- $U_\alpha \in \mathscr O \Rightarrow (\bigcup_{\alpha \in A}U_\alpha) \in \mathscr O$

其中$A$为下标集合，可以是不可数集。

离散拓扑 $\mathscr O_\mathrm{discrete} := \mathscr P(M)$

混沌拓扑 $\mathscr O_\mathrm{chaotic} := \{\empty, M\}$

令$M = \R^d$，定义其上的标准拓扑$$\mathscr O_\mathrm{standard} := \{U | \forall p \in U, \exist r \in \R^+, B_r(p) \subset U\}$$
其中$B_r(p) = \{(q_1, \dots, q_n) | \sum_{i = 1}^d(q_i - p_i)^2 < r^2\}$

设$M$为一个集合，$\mathscr O$为其上的一个拓扑，则我们称$(M, \mathscr O)$为一个拓扑空间。称$U \in \mathscr O$为（$M$的）一个开（子）集。称$A \subset M$为闭（子）集，若其补集$M - A$为开（子）集。$M$的子集可以非开非闭，也可以即开又闭。

## 连续映射

映射$f: M \to N$.
- surjective 满射，$N$中的每个元素都被映射覆盖
- injective 单射，$N$中的每个元素至多被映射覆盖一次
- bijective 双射，即是单射也是满射

设$(M, \mathscr O_M)$和$(N, \mathscr O_N)$为拓扑空间。映射$f: M \to N$称为（关于拓扑$\mathscr O_M$和$\mathscr O_N$）连续的，若$\forall V \in \mathscr O_N, \mathrm{preimg}_f(V) \in \mathscr O_M$，其中$\mathrm{preimg}_f(V) := \{m \in M | f(m) \in V\}$. 换言之，若（$N$中）所有开集的原像也都是（$M$中的）开集。

可以证明连续映射的复合也是连续映射。

有很多方法可以从一个给定的拓扑空间（父结构）继承拓扑，其中物理上很重要的一种方法如下：

设$(M, \mathscr O_M)$为一个拓扑空间，$S \subset M$，我们定义子集拓扑$\mathscr O|_S \subset \mathscr P(S)$为
$$\mathscr O|_S := \{U \cap S | U \in \mathscr O_M\}$$

进一步地，设映射$f: M \to N$为连续映射，则可以证明映射$f|_S : S \to N$（关于拓扑$\mathscr O|_S$和$\mathscr O_N$）也是连续的。

# 拓扑流形

存在太多的拓扑空间，我们甚至无法分类它们。在关于时空的物理学中，我们可以仅考虑那些可以被charted的拓扑空间，就像地球表面被charted到一本atlas（图册）中那样。这些特殊的拓扑空间，我们称之为拓扑流形。

我们称一个拓扑空间$(M, \mathscr O)$为一个$d$维拓扑流形，若在$M$中任意一点$p$都存在$p$的一个开邻域$U \in \mathscr O$，且存在一个可逆的（关于$\mathscr O$和$\R^d$上的标准拓扑的）连续映射$x : U \to \R^d$，其逆$x^{-1}$也是连续的。

我们称$(U, x)$为（拓扑流形$(M, \mathscr O)$的）一张图（chart）。称其中的$x$为图映射（chart map）。称$\mathscr A := \{(U_\alpha, x_\alpha) | \alpha \in A\}$为（拓扑流形$(M, \mathscr O)$的）一本图册（atlas），若$M = \bigcup_{\alpha \in A}U_\alpha$.

$x$可以看作是$d$个映射的元组$x = (x^1, x^2, \dots, x^d)$，其中每一个$x^i : U \to \R$称为坐标映射。若$p \in U$，则称$x^1(p)$为点$p$关于图$(U, x)$的第一坐标。类似地，我们有第二坐标，第三坐标等等。

## 图迁移映射

考虑两个图$(U, x)$和$(V, y)$，$U \cap V \ne \empty$。称$y\circ x^{-1}$为（从$x(U\cap V)$到$y(U\cap V)$的）图迁移映射。
它们包含了如何拼接图册中的图的信息。

## 流形思想

我们经常想要（或者实际上不得不）通过真实世界对象的图表示（chart representative），而不是真实世界对象自身（例如曲线$\gamma: \R \to M$），判断适当的条件，来定义其性质（例如连续性）。
其优点是我们可以很方便的用微积分来分析它们。但需要注意的是这样定义的性质不应在图/坐标变换下改变。换言之，该性质应该是独立于图/坐标的选择的。

例如，曲线$\gamma$在图$(U, x)$下的表示为$x \circ\gamma$，我们假定该表示已经满足了我们要求的性质。然而同样的曲线在图$(U, y)$下的表示$y \circ\gamma$也应该满足这个性质。而$y \circ\gamma = (y\circ x^{-1})\circ (x\circ\gamma)$不过是图迁移映射与前一个表示的复合。
这相当于是要求图迁移映射也满足我们想要的性质，且该性质在映射的复合下是被保持的。

# 多重线性代数

我们不会给空间（时间）装备一个矢量空间结构。（毕竟，我们不知道$5 \cdot \text{巴黎}$或者$\text{巴黎}+\text{维也纳}$是多少）
但是，光滑流形的切空间却是自然地带有一个矢量空间结构。
这里我们先学习矢量空间的抽象概念有以下两点好处：

1. 为了构造$T_pM$，我们需要一个中介的矢量空间$C^{\infty}(M)$
2. 张量技术在一个抽象的设定下是最容易理解的

## 矢量空间

我们称$(V, +, \cdot)$为一个矢量空间，其中

- $V$是一个集合
- $+ : V \times V \to V$称为矢量加法
- $\cdot : \R \times V \to V$称为标量乘法

满足（CAN I ADD U）八个条件：

- $+$是交换的
- $+$是结合的
- $+$存在零元
- $+$存在逆
- $\cdot$是结合的
- $\cdot$对标量加法是分配的
- $\cdot$对矢量加法是分配的
- $\cdot$存在幺元

我们通常（非正式地）称矢量空间中的元素为矢量。

例子：
我们定义$P := \{p : (-1, 1) \to \R | p(x) = \sum_{n=0}^N p_nx^n\}$
问$\square \in P$是矢量吗？其中$\square(x) = x^2$. 

目前还不是。但如果我们定义$+ : P \times P \to P$为$(p + q)(x) := p(x) +_\R q(x)$以及$\cdot : \R \times P \to P$为$(\lambda\cdot p)(x) := \lambda \cdot_\R p(x)$.则$(P, +, \cdot)$就成为一个矢量空间，$\square$就成为$P$中的一个矢量了。

## 线性映射

线性映射是保持矢量空间性质的映射。
设$(V, +_V, \cdot_V)$和$(W, +_W, \cdot_W)$是两个矢量空间，我们称映射
$\varphi : V \to W$为线性的，如果：

- $\varphi(v +_V \tilde v) = \varphi(v) +_W \varphi(\tilde v)$
- $\varphi(\lambda \cdot_V v) = \lambda \cdot_W \varphi(v)$

微分算子$D : P \to P$是线性映射的一个例子，其中$D(p) := p'$.

线性映射的复合还是线性映射。

例子：考虑所有从$V$到$W$的线性映射的集合$\mathrm{Hom}(V, W) := \{\varphi : V \to W\}$. 我们可以增强其为一个矢量空间，只要定义
$\oplus : \mathrm{Hom}(V, W) \times \mathrm{Hom}(V, W) \to \mathrm{Hom}(V, W)$为$(\varphi \oplus \psi)(v) := \varphi(v) +_W \psi(v)$以及
$\odot : \R \times \mathrm{Hom}(V, W) \to \mathrm{Hom}(V, W)$为$(\lambda\odot\varphi)(v) := \lambda \cdot_W \varphi(v)$.
可以验证，这样定义的$(\mathrm{Hom}(V, W), \oplus, \odot)$是一个矢量空间。
特别地，$\mathrm{Hom}(P, P)$也是一个矢量空间。于是我们可以知道，混合阶的微分算子，比如$(5\odot\delta) \oplus (\delta\circ\delta)$也是线性的。

## 对偶矢量空间

设$(V, +, \cdot)$为一个矢量空间，考虑集合$V^* := \{\varphi : V \to \R\} = \mathrm{Hom}(V, \R)$，即所有从$V$到$\R$的线性映射。由前述内容可知，$(V^*, \oplus, \odot)$是矢量空间，称为$V$的对偶矢量空间。
其中的元素$\varphi \in V^*$称为余矢。

例子：$I : P \to \R$其中$I(p) := \int_0^1p(x)\mathrm dx$.可以验证$I \in P^*$为一个余矢。

## 张量

设$(V, +, \cdot)$为一个矢量空间，所谓$(r, s)$型张量是一个多重线性映射
$T: (V^*)^r \times V^s \to \R$.

考虑$(1, 1)$型张量$T : V^* \times V \to \R$. 我们定义线性映射$\phi_T : V \to (V^*)^*$为$\phi_T(v) = T(\bullet, v)$.
注意当$V$是有限维时，$(V^*)^* = V$.于是$(1, 1)$型张量也可以看作是从$V$到$V$的线性映射。同样地，它也可以看作是从$V^*$到$V^*$的线性映射。

例子：$g : P^2 \to R$其中$g(p, q) := \int_{-1}^1 p(x)q(x)\mathrm dx$是一个$(0, 2)$型张量。

例子：余矢是$(0, 1)$型张量。矢量是$(1, 0)$型张量。

## 基

矢量空间$V$的子集$B$称为基，若$\forall v \in V$存在唯一的$b_1, b_2, \dots, b_n \in B$和唯一的$v^1, v^2, \dots, v^n \in \R$，使得$v = v^1b_1 + \cdots + v^nb_n$.
如果$B$是有限集合，我们称其中元素的个数为矢量空间$V$的维度$d = \dim V$.

若$V$是有限维矢量空间，且其上已经选取了基$\{e_1, \dots, e_n\}$，我们就可以唯一地将$v$关联到$(v^1, \dots, v^n)$.这称为$v$关于所选的基的分量，满足$v = v^1e_1 + \cdots + v^ne_n$.

## 对偶基

我们可以为对偶矢量空间任选其他的基，不过更加经济的做法是要求一旦$V$的基$\{e_1, \dots, e_n\}$被选定，我们就要求其对偶空间$V^*$的基$\{\epsilon^1, \dots, \epsilon^n\}$满足$\epsilon^a(e_b) = \delta^a_b$.
这将唯一地决定$\{\epsilon^1, \dots, \epsilon^n\}$，称为对偶空间的对偶基。

例子：考虑三次多项式集合$P$，我们选取其基为$e_i = x^i, i = 0,1,2,3$。则对偶基就是$\epsilon^i = \frac{1}{i!}D^i|_{x = 0}$.

## 张量的分量

设$T$是有限维矢量空间$V$上的一个$(r, s)$型张量，$\dim V = n$，我们定义$(r + s)^n$个实数$T^{i_1\dots i_r}{}_{j_1\dots j_s} := T(\epsilon^{i_1}, \dots, \epsilon^{i_r}, e_{j_1}, \dots, e_{j_s})$. 这被称为这个张量关于其选定的基的分量。其中$i_1, \dots, i_r, j_1, \dots, j_s \in \{1, \dots, n\}$， $\{e_1, \dots, e_n\}$是$V$的被选定的基，$\{\epsilon^1, \dots, \epsilon^n\}$是对应的对偶基。
可以验证这和前面定义的矢量的分量是相容的。

# 微分流形

为了定义曲线/函数或者更一般的流形间的映射的可微性，我们可以选择一个图$(U, x)$.
例如对于曲线$\gamma : \R \to U$，我们可以通过$x\circ\gamma$的可微性来定义$\gamma$的可微性。
但这样的定义应该是与图的选择无关的，如果我们考虑另一个图$(U, y)$，则$y\circ\gamma$也应该可微。
前面提到过，这就要求图迁移映射$y\circ x^{-1}$是可微的。


