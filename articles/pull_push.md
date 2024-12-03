# 推拉弹唱

最简单的拉回映射定义如下

<script type="text/tikz">
    \usepackage{amsfonts}
    \usetikzlibrary{cd}
    \begin{document}
    \begin{tikzcd}
    M \arrow[r, "\phi"] \arrow[rd, "\phi^*f"'] & N \arrow[d, "f"] \\
                                            & \mathbb R       
    \end{tikzcd}
    \end{document}
</script>

其中$\phi: M \to N$是流形间的映射，$\phi^*$可以看作是把标量场$f$从$N$拉回到$M$，是场$\mapsto$场。

最简单的推前映射定义如下

<script type="text/tikz">
    \usepackage{amsfonts}
    \usetikzlibrary{cd}
    \begin{document}
    \begin{tikzcd}
    C^\infty(M) \arrow[d, "v"'] & C^\infty(N) \arrow[l, "\phi^*"'] \arrow[l] \arrow[ld, "\phi_*v"] \\
    \mathbb R                   &                                                                 
    \end{tikzcd}
    \end{document}
</script>

这里涉及到流形$M$上一点$p \in M$处的切空间$T_pM$中切矢$v$的定义。考虑用方向导数来定义，那么就要求$v : C^\infty(M) \to \R$是一个线性映射，此外要满足莱布尼茨律$v(fg) = f|_pv(g) + g|_pv(f)$. 对应地，余切空间$T^*_pM$中的余矢$\omega : T_pM \to \R$也是一个线性映射。

一般来说，设$V$是$\R$上的有限维矢量空间，其对偶空间$V^*$中的元素就是所有$\omega : V \to \R$. $V$和$V^*$是同构的，同构映射可从$V$的一个基底到$V^*$的一个基底（即$V$的一个对偶基底）的双射构造。显然这样的同构映射依赖于基底的选择。然而如果我们考虑$V$的对偶空间的对偶空间$V^{**}$，则存在一个同构$v \mapsto v^{**}$，定义为$v^{**}(\omega) := \omega(v), ~ \forall \omega \in V^*$. 这个同构与基底的选择无关，称为自然同构。

此外$f$自然地诱导出$M$上的一个对偶矢量场$\mathrm df$，定义为$\mathrm df|_p(v) := v(f)$. 于是$v(f) = v^{**}(\mathrm df|_p)$. 即在$p$点的局部看，$f$可等同于$p$点的切空间$T_pM$到$\R$的映射$\mathrm df|_p$.

需要说明的是，根据定义$\phi_*$是把$M$中一点$p$处的矢量$\mapsto$其像点$\phi(p)$处的矢量。

现在拉回映射可自然地推广到对偶矢量的情形，其定义如下

<script type="text/tikz">
    \usepackage{amsfonts}
    \usetikzlibrary{cd}
    \begin{document}
    \begin{tikzcd}
    T_pM \arrow[r, "\phi_*"] \arrow[rd, "\phi^*\omega"'] & T_{\phi(p)}N \arrow[d, "\omega"] \\
                                                        & \mathbb R               
    \end{tikzcd}
    \end{document}
</script>

- 拉回对$(0, l)$型张量场的定义
- 推前对$(k, 0)$型张量的定义
- 何时可把推前$\phi_*$定义为场$\mapsto$场的映射？
- 拉回/推前映射对$(k, l)$型张量场的定义以及它们的关系
