@[TOC](谈谈外微分)

# 谈谈外微分

## 外微分的定义
对于多重积分，我们希望换元法依然可用。例如，设$x = x(u, v), y = y(u, v)$，那么二重积分的换元公式是这样的
$$\iint f(x, y) dxdy = \iint f(x, y) |J(u, v)| dudv$$
其中
$$J(u, v) = \frac{\partial (x, y)}{\partial (u, v)} = \begin{vmatrix}
\frac{\partial x}{\partial u} &\frac{\partial x}{\partial v} \\
\frac{\partial y}{\partial u} &\frac{\partial y}{\partial v}
\end{vmatrix}$$
是雅可比行列式，这并不“自然”。如果我们规定$dudu = dvdv = 0, ~ dudv = -dvdu$，那么上式仍可以由换元法“自然”地得到，因为$dx = \frac{\partial x}{\partial u}du + \frac{\partial x}{\partial v}dv, ~ dy = \frac{\partial y}{\partial u}du + \frac{\partial y}{\partial v}dv$，所以
$$dxdy = (\frac{\partial x}{\partial u}\frac{\partial y}{\partial v} - \frac{\partial x}{\partial v}\frac{\partial y}{\partial u}) dudv$$

这其中最重要的一点就是$dudv$这个乘积是不满足交换律的，而是满足反交换律。这被推广为微分形式的楔积(或称外积)。用张量的语言说，一个$(0, l)$型的张量被称为一个$l$形式，如果它是全反称的。一个$l$形式$\omega$和一个$m$形式$\mu$的楔积是一个$l + m$形式，其定义为
$$(\omega\wedge\mu)_{a_1\cdots a_lb_1\cdots b_m} = \frac{(l + m)!}{l!m!}\omega_{[a_1\cdots a_l}\mu_{b_1\cdots b_m]}$$
容易看出，对于$1$形式来说，$\omega\wedge\mu = -\mu\wedge\omega$。

同时，上述普通微分算符也被推广为外微分算符，具体来说外微分算符$d$是从$l$形式到$l + 1$形式的映射，其定义为
$$d(\omega)_{ba_1\cdots a_l} = (l + 1)\nabla_{[b}\omega_{a_1\cdots a_l]}$$
其中$\nabla_b$可以是任一导数算符。可见，对于$0$形式$f$来说，$df$就是$f$的外微分。

形式场$\omega$称为闭的，如果$d\omega = 0$；形式场$\omega$称为恰当的，如果存在$\mu$使得$\omega = d\mu$。关于外微分算符最重要的一个定理恐怕就是，恰当形式一定是闭的，也即
$$d\circ d = 0$$
反之，闭形式不一定是恰当的，但一定是局部恰当的。

## Hodge对偶
可以证明$n$维矢量空间中的$l$形式的全体是$\binom{n}{l}$维的。据此可在$l$形式和$n - l$形式之间建立一个同构映射，被称为Hodge star，其定义如下
$$^*\omega_{a_1\cdots a_{n - l}} = \frac{1}{l!}\omega^{b_1\cdots b_l}\varepsilon_{b_1\cdots b_la_1\cdots a_{n - l}}$$

## 梯度、旋度和散度
场论中的这几个概念都可以用外微分和Hodge对偶表示，例如容易看出$\vec\nabla f = df$. 另外，$dA = 2\nabla_{[b}A_{a]}$，那么
$$^*dA = \nabla^{[b}A^{a]}\varepsilon_{bac} = \frac{1}{2}\varepsilon_{bac}(\nabla^bA^a - \nabla^aA^b) = \varepsilon_{bac}\nabla^bA^a = \vec\nabla\times \vec A$$
类似地，$^*A = A^a\varepsilon_{abc}, ~ d^*A = 3\partial_{[d}A^a\varepsilon_{bc]a}$，因此
$$^*d^*A = \frac{3}{3!}\partial^{[d}A_a\varepsilon^{bc]a}\varepsilon_{bcd} = \frac{1}{2}\partial^dA_a2!\delta^a{}_d = \partial_a A^a = \vec\nabla\cdot \vec A$$

设$A = df$，则$^*dA = \vec\nabla\times \vec A = 0$，这说明梯度场一定是无旋的。反之，无旋场一定可以局部地表示为梯度场。
设$B = ^*dA$，则$^*d^*B = \vec\nabla\cdot \vec B = 0$，这说明旋度场一定是无散的。反之，无散场一定可以局部地表示为旋度场。
