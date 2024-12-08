@[TOC]

## 介绍

群公理：
群是带有乘法（对称的复合）的集合，其乘法满足
- 结合律 $(ab)c = a(bc)$
- 有恒等元（平凡对称）$1a = a1 = a$
- 有逆元 $a^{-1}a = aa^{-1} = 1$

群论的目标
- 分类所有的群（在同构的意义下）

  几乎是不可能的任务，但我们至少可以尝试分类那些有趣的群

- 分类一个群可表为某对象之对称性的所有方式，这称为表示论
    - 置换表示
    - 线性表示

我们如何知道群没有其他公理了呢？
实际上，任何满足上述三个公理的集合一定是某对象的一个对称性，这被称为凯莱定理。

## 凯莱定理

看待一个群有两种方式：
- 群是某对象的对称性的集合（具体群）
- 群是满足上述三公理的集合（抽象群）

由具体群到抽象群的过程，已被群公理所表述。
由抽象群到具体群，则可由凯莱定理来表述。

为了表述凯莱定理，我们需要引入群作用的概念。
群$G$于集合$S$上的左作用是一个映射$\alpha_L: G\times S \to S$，满足
- $\alpha_L(gh, s) = \alpha_L(g, \alpha_L(h, s))$
- $\alpha_L(1, s) = s$

当$G$作用于其自身（$S = G$）时，我们定义左平移作用$l_g(s) = gs$，这显然满足上述两个条件。于是$G$是$G$的所有置换的一个子群。具体来说：
- $\forall g \in G$，左平移映射$l_g: G \to G$是$G$的一个置换（双射）
- 映射$g \mapsto l_g$是一个单同态$G \to \mathrm{Sym}(G)$，所以它定义了一个从$G$到$\mathrm{Sym}(G)$的子群的同构

类似地，我们可以定义右作用$\alpha_R: S\times G \to S$，满足
- $\alpha_R(s, gh) = \alpha_R(\alpha_R(s, g), h)$
- $\alpha_R(s, 1) = s$

我们定义右平移作用$r_g(s) = sg$. 注意左平移一般不同于右平移，因为给定群$G$的两个元素$s, g$，一般来说$sg \ne gs$. 如果$sg = gs$我们称这两个元素是交换的。如果群$G$的任意两个元素都是交换的，我们就称群$G$是交换的或阿贝尔的。

注意$G$于其自身的左作用保持$G$的右作用，即
$$l_g(r_h(s)) = g(sh) = (gs)h = r_h(l_g(s))$$
或者说下图是交换的
<script type="text/tikz">
  \usetikzlibrary{cd}
  \begin{document}
  \begin{tikzcd}
                    & s \arrow[r, "r_h"] \arrow[ld, "l_g"'] & sh \arrow[ld, "l_g"] \\
    gs \arrow[r, "r_h"] & gsh                                   &                     
  \end{tikzcd}
  \end{document}
</script>

于是我们可以将$G$看作是带有额外结构（右作用）的一个对象（$G$视作集合）的所有对称性（在左作用下不变）。
另一方面，假设$f$是$G$的保持右作用的一个对称性，则$f(s) = f(1s) = f(1)s$. 即$f$不外就是左乘$f(1)$，因此是$G$的一个元素。

注意$G$的这个对称性不保持群乘法，即一般情况下$g(ab) \ne g(a)g(b)$.

总之，群的公理抓住了“对象的对称性”这一概念。即给定某对象，存在一个以其对称性为元素的群；给定一个群，也存在一个对象在该群的作用下保持不变。实际上，我们有八种群于其自身的作用，如下表所述

| 左作用（$l_g$） | 右作用（$r_g$） | 说明 |
| ----- | ----- | --- |
| $s$ | $s$ | 平凡作用 |
| $gs$ | $sg$ | 平移作用 |
| $sg^{-1}$ | $g^{-1}s$ | 不常见，没有名字？ |
| $gsg^{-1}$ | $g^{-1}sg$ | 自伴/共轭作用 |

读者可以验证，以上八种作用均符合左/右作用的定义。

## 群同态

群同态是一个映射$f: G \to H$，满足$f(ab) = f(a)f(b)$. 注意这蕴含$f(1) = 1$以及$f(a^{-1}) = (f(a))^{-1}$. 如果同态是一个双射，我们就称其为同构。如果同构是从$G$到其自身，我们就称之为自同构。自同构描述了群自身的对称性。此外同态$f$的核$\ker(f)$定义为$\{a \in G | f(a) = 1\}$. 以下给出一些群同态的例子。

- $\exp : (\R, +) \to \R^*$

    $\exp(x) = 1 + x + x^2 / 2 + \cdots$称为指数映射。

    这里我们用$(\R, +)$表示群$\R$上的乘法定义为实数加法。此外$\R^*$将$\R$中的$0$排除在外。我们有$\exp(x + y) = \exp(x)\exp(y)$，因此指数映射是一个同态。这个同态不是满射，因此它不是同构。但存在一个从$(\R, +)$到$\R^+$的同构$\exp : (\R, +) \to \R^+$，其逆称为对数映射。

- $\det : \mathrm{GL}_n(\R) \to \R^*$

    我们有$\det(AB) = \det(A)\det(B)$，因此行列式是一个同态。$\ker(\det) = \mathrm{SL}_n(\R)$.
    $\mathrm{GL}_n(\R)$称为$\R$上的一般线性群，而$\mathrm{SL}_n(\R)$称为$\R$上的特殊线性群。

- $f: \Z/4\Z \to (\Z/5\Z)^*$

    $f(a) = 2^a (\mathrm{mod} 5)$

    这可以看作指数映射在有限域上的情形，现在$f$是一个同构。
    
    注：$\Z/4\Z \simeq (\Z/5\Z)^*$中的元素是$\Z/5\Z$的自同态。
    例如：$g \mapsto 2g$是$\Z/5\Z$的一个自同态，其逆为$g \mapsto 3g$，因为$2\cdot 3g = 6g = g$.

- $f: \R \to \mathrm{S}^1$

    $f(\theta) = (\cos\theta, \sin\theta)$

    $\mathrm{S}^1$上的乘法定义为$(x_1, y_1)(x_2, y_2) = (x_1x_2 - y_1y_2, x_1y_2 + x_2y_1)$.
    于是我们有$f(\theta_1 + \theta_2) = f(\theta_1)f(\theta_2)$. $\ker(f) = 2\pi k, k \in \Z$.

- 从正八面体的旋转（24阶）到$S_3$（正八面体的3条对角线的置换，6阶）的映射

    其核为3个关于对角线的180度旋转加上平凡对称性。
