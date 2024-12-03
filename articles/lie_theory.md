# 李群和李代数

## 李群

李群是一个群，同时也是一个光滑流形，且群乘法和逆元操作都是光滑映射。李群的维度定义为这个流形的维度。

例子：考虑光滑$n$维流形$\R^n$，定义群乘法为矢量加法。这被称为$n$维平移群，是一个交换（阿贝尔）李群。

例子：考虑复平面上的单位圆周$S^1 := \{z \in \Complex \mid |z| = 1\}$. 群乘法取复数乘法。这被称为酉群，也是一个交换李群，记为$\mathrm U(1)$.

例子：考虑所有从$\R^n$到其自身的线性映射$\mathrm{GL}(n, \R) := \{\phi : \R^n \to \R^n \mid \det\phi \ne 0\}$. 注意到在线性映射$\phi$和$\R^{n^2}$之间存在一个双射，因此这可以被看作一个$n^2$维的流形。条件$\det\phi \ne 0$被称为开集条件，它保证了$\mathrm{GL}(n, \R)$可以被视同于$\R^{n^2}$的一个开子集。群乘法取映射的复合。这个李群叫做一般线性群。

例子：令$V$是一个$n$维的实矢量空间。双线性映射$(\bullet, \bullet) : V \times V \to \R$被称为一个伪内积，若它是对称的和非退化的：

- $\forall v, w \in V, (v, w) = (w, v)$
- $(\forall w \in V, (v, w) = 0) \Rightarrow v = 0$

一般的内积满足比非退化更强的条件，叫做正定性，即$\forall v \in V, (v, v) \ge 0$且$(v, v) = 0 \Rightarrow v = 0$.

给定一个$V$上的对称的双线性映射，总可以找到一个基$\{e_a\}$满足$(e_a, e_a) = \pm 1$和$(e_a, e_b) = 0$. 如果我们得到$p$个$+1$和$q$个$-1$（当然，$p + q = n$），则序对$(p, q)$称为这个映射的signature.正定的映射要求signature为$(n, 0)$，虽然在相对论中我们要求signature为$(n-1, 1)$. 有定理说明$V$上有多少种不同的signature，就有多少种不同的伪内积。

我们定义
$$\mathrm O(p, q) := \{\phi : V \to V \mid \forall v, w \in V, (\phi(v), \phi(w)) = (v, w)\}$$
为$V$上所有保伪内积的线性映射的集合，并定义群乘法为映射复合，则其成为一个李群，称为关于这个伪内积的正交群。它实际上是$\mathrm{GL}(p + q, \R)$的李子群。

正交群的例子有洛伦兹群$\mathrm O(3, 1)$，三维旋转群$\mathrm O(3, 0)$.

设$G$和$H$是李群，映射$\phi : G \to H$被称为李群同态如果它是一个群同态，同时是一个光滑映射。它被称为李群同构如果它是一个群同构，同时也是一个微分同胚。

## 左平移映射

李群的每一个群元，都有一个关联的特殊映射，叫做这个群元的左平移映射。另外请注意以下内容可以同等地应用到右平移映射上。

具体来说，设$G$是一个李群，$g \in G$，$g$的左平移映射$l_g : G \to G$定义为$l_g(h) = gh$. 实际上，可以证明左平移映射是一个微分同胚。

由于$l_g$是微分同胚，我们就有一个良定义的（矢量场的）推前映射
$$l_{g*} : \Gamma(TG) \to \Gamma(TG)$$

定义为$(l_{g*}X)(gh) := l_{g*}(X(h))$，其中$(l_{g*}v)f := v(f\circ l_g)$是（矢量的）推前映射的定义，$\Gamma(TG)$是$G$的切丛的截面（$G$上的矢量场）的集合。注意到矢量场$X$不过是$G$上的光滑函数之间的映射，因此对于任意的$f \in C^\infty(G)$我们有
$$(l_{g*}X)f := X(f \circ l_g)$$

根据这个定义，我们可以证明，$l_{g*}\circ l_{h*} = l_{gh*}, ~ \forall g, h \in G$.

## 左不变矢量场

在李的理论中，我们通常对一般的矢量场不感兴趣，而主要关注那些在由左平移诱导的推前映射下不变的矢量场。设$G$是一个李群，矢量场$X \in \Gamma(TG)$被称为是左不变的，如果$\forall g \in G, ~ l_{g*}X = X$. 换言之，$\forall g, h \in G, ~ l_{g*}(X(h)) = X(gh)$.
此式左边作用于$f$是$X(h)(f\circ l_g) = X(f\circ l_g)(h)$，而此式右边作用于$f$是$X(f)(gh) = X(f)(l_g(h))$，于是我们看到
$$X(f\circ l_g) = X(f)\circ l_g$$
这也可以当作是左不变矢量场的定义。

我们记李群$G$上所有的左不变矢量场为$L(G)$. 我们知道$G$上的所有光滑矢量场$\Gamma(TG)$是一个$C^\infty(G)$-模，作为它的子集，可以证明$L(G)$是一个子模。特别地，它是一个$\R$-矢量子空间。
我们将会看到，虽然作为矢量空间$\Gamma(TG)$是无穷维的，但$L(G)$将是一个有限维矢量空间。

## 李群的李代数

我们称一个$K$-矢量空间$(L, +, \cdot)$为一个李代数，如果其上带有一个李括号$[\bullet, \bullet]$，满足：
- 它是双线性的
- 它是反称的 $[x, y] = -[y, x]$
- 它满足雅可比恒等式 $[x, [y, z]] + [y, [z, x]] + [z, [x, y]] = 0$

例子：$\Gamma(TG)$作为$\R$-矢量空间，定义其李括号为对易子$[X, Y] = XY - YX$. 则其成为一个无穷维（抽象）李代数。

我们还可以证明：
- $L(G)$是$\Gamma(TG)$的一个李子代数
- $L(G)$线性同构于$G$的单位元处的切空间$T_eG$
- 推论：$\dim L(G) = \dim T_eG = \dim G$

为了证明第二点，我们定义线性同构映射$\eta : T_eG \to L(G)$为$\eta(A)|_g := l_{g*}A, \forall g \in G$.
- 因为$l_{h*}(\eta(A)|_g) = l_{h*}(l_{g*}A) = l_{hg*} A = \eta(A)|_{hg}$，这就说明$\eta(A)$是一个左不变矢量场。
- 推前映射是线性的
- 若$\eta(A) = \eta(B) \Rightarrow \eta(A)|_e = \eta(B)|_e$，注意到$l_{e*}$是恒等映射，我们就有$A = B$. 于是$\eta$是单射。
- $\forall X \in L(G), X|_g = X|_{ge} = l_{g*}(X|_e) = \eta(X|_e)|_g, \forall g \in G$，即$\eta(X|_e) = X, \forall X \in L(G)$. 于是$\eta$是满射。

为了使得$T_eG$也成为一个李代数，我们要求$\eta$保李括号，即
$$\eta([A, B]) = [\eta(A), \eta(B)]$$
于是我们定义$T_eG$上的李括号为
$$[A, B] := \eta^{-1}([\eta(A), \eta(B)]) = [\eta(A), \eta(B)]|_e$$
于是现在$L(G)$李代数同构于$T_eG$.

我们称$L(G)$（或$T_eG$）为李群$G$的李代数，记为$\mathfrak{g}$.

## 复李代数的分类

若$\mathfrak a, \mathfrak b$是$K$上的李代数$(\mathfrak l, [\bullet , \bullet])$的李子代数，则我们定义
$$[\mathfrak a, \mathfrak b] := \mathrm{span}_K(\{[x, y] \in \mathfrak l | x \in \mathfrak a \land y \in \mathfrak b\})$$

李代数$\mathfrak l$称为是阿贝尔的，若
$$\forall x, y \in \mathfrak l: [x, y] = 0$$
等价地，$[\mathfrak l, \mathfrak l] = 0$，其中$0$是平凡李代数$\{0\}$.

李代数$\mathfrak l$的李子代数$\mathfrak i$称为它的一个理想，若$[\mathfrak i, \mathfrak l] \sube \mathfrak i$. 即
$$\forall x \in \mathfrak i: \forall y \in \mathfrak l: [x, y] \in \mathfrak i$$
$0$和$\mathfrak l$称为$\mathfrak l$的平凡理想。

称一个李代数$\mathfrak l$是
- 单的，若它是非阿贝尔的且它不包含非平凡理想
- 半单的，若它可以表示为单李代数的直和

称李代数$\mathfrak l$的李子代数$\mathfrak l' := [\mathfrak l, \mathfrak l]$为$\mathfrak l$的导出李子代数。李子代数的序列
$$\mathfrak l \supe  \mathfrak l' \supe \mathfrak l'' \supe \cdots \supe \mathfrak l^{(n)} \supe \cdots$$
称为$\mathfrak l$的导出序列。李代数$\mathfrak l$称为可解的，若其导出序列最终达到$0$，即$\exist k \in N: \mathfrak l^{(k)} = 0$.

### Levi分解

定理：（Levi）
每个有限维复李代数$(\mathfrak l, [\bullet , \bullet])$都可以按如下方式分解：
$$\mathfrak l = \mathfrak r \oplus_S (\mathfrak l_1 \oplus \dots \oplus \mathfrak l_n)$$
其中：
- $\mathfrak r$是一个可解的李代数
- $\mathfrak l_1, \dots, \mathfrak l_n$是单李代数
- $\mathfrak l_1 \oplus \mathfrak l_2$是李代数直和，满足$[\mathfrak l_1, \mathfrak l_2] = 0$
- $\mathfrak r \oplus_S \mathfrak l$是李代数半直和，满足$[\mathfrak r, \mathfrak l] \sube \mathfrak r$

时至今日，一般的可解李代数的分类仍是一个未完全解决的问题。但有限维的，复单李代数的分类已完全解决。

### 伴随映射和基灵形式

设$\mathfrak l$是$K$上的一个李代数，且$x \in \mathfrak l$。关于$x$的伴随映射是如下的$K$-线性映射
$$\mathrm{ad}_x : \mathfrak l \to \mathfrak l$$
其中$\mathrm{ad}_x(y) := [x, y]$.

$\mathfrak l$上的基灵形式是一个$K$-双线性映射$\kappa: \mathfrak l \times \mathfrak l \to K$，其定义为
$$\kappa(x, y) := \mathrm{tr}(\mathrm{ad}_x \circ \mathrm{ad}_y)$$

注意和一般的“形式”不同的是，基灵形式并不是反称的，而是对称的，即
$$\forall x, y \in \mathfrak l: \kappa(x, y) = \kappa(y, x)$$

可以证明一个李代数是半单的，当且仅当它的基灵形式是非退化的。因此，若$\mathfrak l$是一个半单李代数，则基灵形式是其上的一个伪内积。

我们称一个线性映射$\phi: V \to V$关于$V$上的一个伪内积$B$为对称的，若
$$\forall v, w \in V, B(\phi(v), w) = B(v, \phi(w))$$
称其为关于该伪内积$B$是反称的，若
$$\forall v, w \in V, B(\phi(v), w) = -B(v, \phi(w))$$

可以证明，（在半单李代数的情况）伴随映射关于基灵形式是反称的。

为了进行计算，在$\mathfrak l$上引入一组基$\{e_i\}$将是有用的。设$\mathfrak l$是$K$上的一个李代数，$\{e_i\}$是其基，我们有
$$[e_i, e_j] = C^k{}_{ij}e_k$$
其中$C^k{}_{ij} \in K$. 这些数字$C^k{}_{ij}$称为$\mathfrak l$关于基$\{e_i\}$的结构常数。

对应于李括号的反称性质，我们有$C^k{}_{ij} = -C^k{}_{ji}$. 我们现在可以将伴随映射和基灵形式以分量的形式表示出来。设$\{\epsilon^i\}$是对应的对偶基，我们有
$$\begin{align*}
(\mathrm{ad}_{e_i})^k{}_j :&= \epsilon^k(\mathrm{ad}_{e_i}(e_j)) \\
&= \epsilon^k([e_i, e_j]) \\
&= \epsilon^kC^m{}_{ij}e_m \\
&= C^m{}_{ij}\epsilon^k(e_m) \\
&= C^k{}_{ij}
\end{align*}$$
而
$$\begin{align*}
\kappa_{ij} :&= \kappa(e_i, e_j) \\
&= \mathrm{tr}(\mathrm{ad}_{e_i} \circ \mathrm{ad}_{e_j}) \\
&= (\mathrm{ad}_{e_i} \circ \mathrm{ad}_{e_j})^k{}_k \\
&= (\mathrm{ad}_{e_i})^k{}_m(\mathrm{ad}_{e_j})^m{}_k \\
&= C^k{}_{im}C^m{}_{jk}
\end{align*}$$
其中我们对线性映射和其对应的矩阵使用了相同的记号。

### 单根和外尔群

设$\mathfrak l$是一个$d$维的李代数，它的一个嘉当子代数$\mathfrak h$是$\mathfrak l$的一个极大子代数，若$\mathfrak h$存在一组基$\{h_1, \dots, h_m\}$，可被扩展为$\mathfrak l$的一组基$\{h_1, \dots, h_m, e_1, \dots, e_{d-m}\}$，满足$e_1, \dots, e_{d-m}$是$\mathrm{ad}$的本征矢量，即
$$\forall h \in \mathfrak h: \exist \lambda_\alpha(h) \in \mathbb C: \mathrm{ad}_h(e_\alpha) = \lambda_\alpha(h)e_\alpha$$
其中$1 \le \alpha \le d - m$. 这组基$\{h_1, \dots, h_m, e_1, \dots, e_{d-m}\}$被称为$\mathfrak l$的一个嘉当-外尔基。

定理：设$\mathfrak l$是一个有限维的半单复李代数。则
- $\mathfrak l$具有一个嘉当子代数
- $\mathfrak l$所有的嘉当子代数有相同的维度，称为$\mathfrak l$的秩
- $\mathfrak l$的任一嘉当子代数都是阿贝尔的

注意到$\mathrm{ad}$是双线性的，也就是说$\lambda_\alpha: \mathfrak h \to \mathbb C$是线性映射，即$\lambda_\alpha \in \mathfrak h^*$.

我们称映射$\lambda_1, \dots, \lambda_{d - m} \in \mathfrak h^*$为$\mathfrak l$的根。它们的集合$\Phi := \{\lambda_1, \dots, \lambda_{d - m}\} \sube \mathfrak h^*$称为根集。

可以证明，若$\lambda_\alpha$是零映射，我们将有$e_\alpha \in \mathfrak h$. 因此，$0 \notin \Phi$. 此外，由伴随映射关于基灵形式的反称性我们有
$$\lambda \in \Phi \Rightarrow -\lambda \in \Phi$$
因此$\Phi$不是线性独立的。

我们定义单根的集合$\Pi \sub \Phi$，满足
- $\Pi = \{\pi_1, \dots, \pi_f\}$是$\mathfrak h^*$的一个线性独立的子集
- $\forall \lambda \in \Phi: \exist n_1, \dots, n_f \in \N: \lambda = \pm\sum_{i = 1}^fn_i\pi_i$

可以证明，在有限维半单复李代数的情况下，这样的一个单根的集合总是存在的。且它构成$\mathfrak h^*$的一组基，即$\mathrm{span}_{\mathbb C}(\Pi) = \mathfrak h^*$. 于是我们有$|\Pi| = \dim \mathfrak h^* = \dim \mathfrak h$. 注意，一般情况下，$\Pi$并非唯一的。

现在我们想要在$\mathfrak h^*$上也定义一个伪内积。我们知道$K$上的有限维矢量空间$V$上的一个伪内积$B(\bullet,\bullet)$可以诱导一个线性同构$i : V \to V^*$，定义为$i(v) :=B(v, \bullet)$. 我们可以此来定义$V^*$上的伪内积
$$B^*: V^* \times V^* \to K$$
定义为$B^*(\phi, \psi) = B(i^{-1}(\phi), i^{-1}(\psi))$. 考虑$\kappa$在$\mathfrak h$上的限制，即$\kappa|_{\mathfrak h} : \mathfrak h \times \mathfrak h \to K$. 可以证明它仍是一个伪内积。现在我们可以定义
$$\kappa^*: \mathfrak h^* \times \mathfrak h^* \to \mathbb C$$
其中$\kappa^*(\mu, \nu) := \kappa(i^{-1}(\mu), i^{-1}(\nu))$.

现在我们定义$\mathfrak h^*_\R := \mathrm{span}_\R(\Pi)$，注意到$\Phi \sube \mathrm{span}_{\pm\N}(\Pi)$于是我们有
$$\Pi \sube \Phi \sube \mathfrak h^*_\R \sube \mathfrak h^*$$

将$\kappa^*$限制到$\mathfrak h^*_\R$导致如下神奇的结果。

定理：
- $\forall \alpha, \beta \in \mathfrak h^*_\R, \kappa^*(\alpha, \beta) \in \R$
- $\kappa^* : \mathfrak h^*_\R \times \mathfrak h^*_\R \to \R$是$\mathfrak h^*_\R$上的一个内积

就是说，将$\kappa^*$限制到$\mathfrak h^*_\R$之后，非但没有将其削弱，$\kappa^*$的非退化性反而增强为了正定性。于是我们现在$\mathfrak h^*_\R$上就拥有了一个合适的实内积，我们可以用其来计算诸如长度和角度等等。特别是，我们可以计算单根的长度和它们之间的角度了。

根集$\Phi$对我们的分类至关重要，我们能由某一给定的单根的集合$\Pi$将其准确复原吗？这导致如下的定义：

对任一$\lambda \in \Phi$我们定义
$$S_\lambda : \mathfrak h^*_\R \to \mathfrak h^*_\R$$
其中
$$S_\lambda(\mu) := \mu - 2\frac{\kappa^*(\lambda, \mu)}{\kappa^*(\lambda, \lambda)}\lambda$$
映射$S_\lambda$被称作外尔变换，且如下的集合
$$W := \{S_\lambda | \lambda \in \Phi\}$$
在映射复合下形成一个群，称作外尔群。关于外尔群，我们有如下的

定理：
- 外尔群由$\Pi$中的单根生成，即
    $$\forall w \in W: \exist \pi_1, \dots, \pi_n \in \Pi: w = S_{\pi_1} \circ S_{\pi_2} \circ \cdots \circ S_{\pi_n}$$
- 每个根都可由单根经外尔群的作用产生，即
    $$\forall \lambda \in \Phi: \exist \pi \in \Pi: \exist w \in W: \lambda = w(\pi)$$
- 外尔群置换根，即
    $$\forall \lambda \in \Phi: \forall w \in W: w(\lambda) \in \Phi$$

### 邓肯图和嘉当分类

现在我们考虑任意的两个单根$\pi_i, \pi_j \in \Pi$，外尔群于其上的作用为
$$S_{\pi_i}(\pi_j) := \pi_j - 2\frac{\kappa^*(\pi_i, \pi_j)}{\kappa^*(\pi_i, \pi_i)}\pi_i$$
既然$S_{\pi_i}(\pi_j) \in \Phi$，而$\Phi \sube \mathrm{span}_{\pm\N}(\Pi)$，那么对所有的$1 \le i \ne j \le |\Pi|$我们必须有
$$- 2\frac{\kappa^*(\pi_i, \pi_j)}{\kappa^*(\pi_i, \pi_i)} \in \N$$
于是我们有如下的定义：

一个李代数的嘉当矩阵是一个$r \times r$的矩阵（$r = |\Pi|$），其元素为
$$C_{ij} := 2\frac{\kappa^*(\pi_i, \pi_j)}{\kappa^*(\pi_i, \pi_i)}$$

请勿将此与结构常数$C^k{}_{ij}$混淆。显然我们有$C_{ii} = 2$.
即在对角线上，此矩阵的元素为$2$；而在非对角线上，此矩阵的元素为某些非正的整数。
另外，请注意嘉当矩阵不是对称阵；但如果$C_{ij} = 0$，则我们有$C_{ji} = 0$.

关于嘉当矩阵，我们有如下的

定理：每一个有限维的单复李代数都对应于一个唯一的嘉当矩阵，反之亦然。

于是分类所有的有限维单复李代数的问题就转化为寻找所有的嘉当矩阵的问题。
而这个问题又进一步地转化为确定所有的不等价的邓肯图的问题。
为此我们引入如下的定义：

给定一个嘉当矩阵$C$，它的bond number定义为
$$n_{ij} := C_{ij}C_{ji}$$
注意这里没有求和，上式展开如下
$$\begin{align*}
n_{ij} &= 4\frac{\kappa^*(\pi_i, \pi_j)}{\kappa^*(\pi_i, \pi_i)}\frac{\kappa^*(\pi_j, \pi_i)}{\kappa^*(\pi_j, \pi_j)} \\
&= 4\left(\frac{\kappa^*(\pi_i, \pi_j)}{|\pi_i||\pi_j|}\right)^2 \\
&= 4\cos^2\varphi
\end{align*}$$
其中$\varphi$是$\pi_i$和$\pi_j$的夹角。若$i \ne j$，这个夹角既不是零也不是$180\degree$，因此$0 \le \cos^2\varphi < 1$，于是
$$n_{ij} \in \{0, 1, 2, 3\}$$
又$C_{ij}$的非对角线上的元素为非正整数，唯一的可能性就是

| $C_{ij}$ | $C_{ji}$ | $n_{ij}$ |
|----------|----------|----------|
| 0        | 0        | 0        |
| -1       | -1       | 1        |
| -1       | -2       | 2        |
| -2       | -1       | 2        |
| -1       | -3       | 3        |
| -3       | -1       | 3        |

注意在$n_{ij} = 2$或$3$的情况，相应的单根长度是不同的，即要么$|\pi_i| < |\pi_j|$，要么$|\pi_i| > |\pi_j|$.
实际上可以证明，单李代数的根至多有两种不同的长度。
嘉当矩阵的这种冗余性可以很好地由邓肯图反映出来，我们将在此详述其构造方法。

关联于某个嘉当矩阵的一个邓肯图可以按照下述方法构造：
- 对应于每一个单根$\pi_i \in \Pi$，用一个圈来表示
- 在表示$\pi_i$和$\pi_j$的圈之间画$n_{ij}$条线
- 对于$n_{ij} = 2$或$3$的情况，在线上画一个箭头，从较长的根指向较短的根

邓肯图完全刻画了任意的单根集合，由单根集我们可以通过外尔变换重构整个根集。
有了根集我们就可以构造嘉当-外尔基。

现在我们终于可以阐述如下的分类定理了：

定理：（Killing, Cartan）任何有限维单复李代数都可从其单根的集合$\Pi$重构出来，后者仅有如下几种形式：
- 4族无穷多的集族 $A_n, n \ge 1, ~ B_n, n \ge 2, ~ C_n, n \ge 3, ~ D_n, n \ge 4$
<script type="text/tikz">
    \begin{document}
    \begin{tikzpicture}[scale=.4]
    \draw (-1,0) node[anchor=east]  {$A_n$};
    \foreach \x in {0,...,5}
    \draw[xshift=\x cm,thick] (\x cm,0) circle (.3cm);
    \draw[dotted,thick] (0.3 cm,0) -- +(1.4 cm,0);
    \foreach \y in {1.15,...,4.15}
    \draw[xshift=\y cm,thick] (\y cm,0) -- +(1.4 cm,0);
    \end{tikzpicture}
    \end{document}
</script>
<br>
<script type="text/tikz">
    \begin{document}
    \begin{tikzpicture}[scale=.4]
    \draw (-1,0) node[anchor=east]  {$B_n$};
    \foreach \x in {0,...,4}
    \draw[xshift=\x cm,thick] (\x cm,0) circle (.3cm);
    \draw[xshift=5 cm,thick] (5 cm, 0) circle (.3 cm);
    \draw[dotted,thick] (0.3 cm,0) -- +(1.4 cm,0);
    \foreach \y in {1.15,...,3.15}
    \draw[xshift=\y cm,thick] (\y cm,0) -- +(1.4 cm,0);
    \draw[thick] (8.3 cm, .1 cm) -- +(1.4 cm,0);
    \draw[thick] (8.3 cm, -.1 cm) -- +(1.4 cm,0);
    \draw(9,0) --++(120:0.4) (9,0) --++(-120:0.4);
    \end{tikzpicture}
    \end{document}
</script>
<br>
<script type="text/tikz">
    \begin{document}
    \begin{tikzpicture}[scale=.4]
    \draw (-1,0) node[anchor=east]  {$C_n$};
    \foreach \x in {0,...,4}
    \draw[xshift=\x cm,thick] (\x cm,0) circle (.3cm);
    \draw[xshift=5 cm,thick] (5 cm, 0) circle (.3 cm);
    \draw[dotted,thick] (0.3 cm,0) -- +(1.4 cm,0);
    \foreach \y in {1.15,...,3.15}
    \draw[xshift=\y cm,thick] (\y cm,0) -- +(1.4 cm,0);
    \draw[thick] (8.3 cm, .1 cm) -- +(1.4 cm,0);
    \draw[thick] (8.3 cm, -.1 cm) -- +(1.4 cm,0);
    \draw(9,0) --++(60:0.4) (9,0) --++(-60:0.4);
    \end{tikzpicture}
    \end{document}
</script>
<br>
<script type="text/tikz">
    \begin{document}
    \begin{tikzpicture}[scale=.4]
    \draw (-1,0) node[anchor=east]  {$D_n$};
    \foreach \x in {0,...,4}
    \draw[xshift=\x cm,thick] (\x cm,0) circle (.3cm);
    \draw[xshift=8 cm,thick] (30: 17 mm) circle (.3cm);
    \draw[xshift=8 cm,thick] (-30: 17 mm) circle (.3cm);
    \draw[dotted,thick] (0.3 cm,0) -- +(1.4 cm,0);
    \foreach \y in {1.15,...,3.15}
    \draw[xshift=\y cm,thick] (\y cm,0) -- +(1.4 cm,0);
    \draw[xshift=8 cm,thick] (30: 3 mm) -- (30: 14 mm);
    \draw[xshift=8 cm,thick] (-30: 3 mm) -- (-30: 14 mm);
    \end{tikzpicture}
    \end{document}
</script>

- 5个例外集合 $E_6, E_7, E_8, F_4, G_2$
<script type="text/tikz">
    \begin{document}
    \begin{tikzpicture}[scale=.4]
    \draw (-1,0) node[anchor=east]  {$G_2$};
    \draw[thick] (0 ,0) circle (.3 cm);
    \draw[thick] (2 cm,0) circle (.3 cm);
    \draw[thick] (30: 3mm) -- +(1.5 cm, 0);
    \draw[thick] (0: 3 mm) -- +(1.4 cm, 0);
    \draw[thick] (-30: 3 mm) -- +(1.5 cm, 0);
    \draw(1,0) --++(120:0.4) (1,0) --++(-120:0.4);
    \end{tikzpicture}
    \end{document}
</script>
<br>
<script type="text/tikz">
    \begin{document}
    \begin{tikzpicture}[scale=.4]
    \draw (-3,0) node[anchor=east]  {$F_4$};
    \draw[thick] (-2 cm ,0) circle (.3 cm);
    \draw[thick] (0 ,0) circle (.3 cm);
    \draw[thick] (2 cm,0) circle (.3 cm);
    \draw[thick] (4 cm,0) circle (.3 cm);
    \draw[thick] (15: 3mm) -- +(1.5 cm, 0);
    \draw[xshift=-2 cm,thick] (0: 3 mm) -- +(1.4 cm, 0);
    \draw[thick] (-15: 3 mm) -- +(1.5 cm, 0);
    \draw[xshift=2 cm,thick] (0: 3 mm) -- +(1.4 cm, 0);
    \draw(1,0) --++(120:0.4) (1,0) --++(-120:0.4);
    \end{tikzpicture}
    \end{document}
</script>
<br>
<script type="text/tikz">
    \begin{document}
    \begin{tikzpicture}[scale=.4]
    \draw (-1,1) node[anchor=east]  {$E_6$};
    \foreach \x in {0,...,4}
    \draw[thick,xshift=\x cm] (\x cm,0) circle (3 mm);
    \foreach \y in {0,...,3}
    \draw[thick,xshift=\y cm] (\y cm,0) ++(.3 cm, 0) -- +(14 mm,0);
    \draw[thick] (4 cm,2 cm) circle (3 mm);
    \draw[thick] (4 cm, 3mm) -- +(0, 1.4 cm);
    \end{tikzpicture}
    \end{document}
</script>
<br>
<script type="text/tikz">
    \begin{document}
    \begin{tikzpicture}[scale=.4]
    \draw (-1,1) node[anchor=east]  {$E_7$};
    \foreach \x in {0,...,5}
    \draw[thick,xshift=\x cm] (\x cm,0) circle (3 mm);
    \foreach \y in {0,...,4}
    \draw[thick,xshift=\y cm] (\y cm,0) ++(.3 cm, 0) -- +(14 mm,0);
    \draw[thick] (4 cm,2 cm) circle (3 mm);
    \draw[thick] (4 cm, 3mm) -- +(0, 1.4 cm);
    \end{tikzpicture}
    \end{document}
</script>
<br>
<script type="text/tikz">
    \begin{document}
    \begin{tikzpicture}[scale=.4]
    \draw (-1,1) node[anchor=east]  {$E_8$};
    \foreach \x in {0,...,6}
    \draw[thick,xshift=\x cm] (\x cm,0) circle (3 mm);
    \foreach \y in {0,...,5}
    \draw[thick,xshift=\y cm] (\y cm,0) ++(.3 cm, 0) -- +(14 mm,0);
    \draw[thick] (4 cm,2 cm) circle (3 mm);
    \draw[thick] (4 cm, 3mm) -- +(0, 1.4 cm);
    \end{tikzpicture}
    \end{document}
</script>

除此之外就没有其他了。这些是所有可能的（连通）邓肯图。

这4族单根对应的李代数称为典型李代数，5个例外集合对应的李代数称为例外李代数。现在，我们终于完成了对所有有限维单复李代数的分类。
有限维半单李代数是单李代数的直和，它们对应于非连通的邓肯图，其连通分量就是上面列出的这些。
