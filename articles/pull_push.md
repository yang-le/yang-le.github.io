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

对任意的$l$-形式场，拉回映射都可仿照上图定义。我们已经看到，对函数（标量场）的拉回其实就是$0$-形式场的拉回。

推前映射也可做相应的推广，对任意的$(k, 0)$型张量，推前映射可仿照下图定义：

<script type="text/tikz">
    \usepackage{amsfonts}
    \usetikzlibrary{cd}
    \begin{document}
    \begin{tikzcd}
    T^*_pM \arrow[d, "T"'] & T^*_pN \arrow[l, "\phi^*"'] \arrow[ld, "\phi_*T"] \\
    \mathbb R              &                                                  
    \end{tikzcd}
    \end{document}
</script>

我们也已经看到，对矢量的推前就是$k = 1$时的情形。

需要说明的是，根据定义$\phi_*$是把$M$中一点$p$处的$(k, 0)$型张量$\mapsto$其像点$\phi(p)$处的$(k, 0)$型张量。如果$M$上有一个张量场，它至多被推前到$\phi[M]$. 如果$\phi$不是满射，则$N$上存在未定义张量的点；如果$\phi$不是单射，则$N$上就会存在一个点上有多个张量的情况。
然而，如果$\phi$是微分同胚，上述困难就不复存在了，推前映射$\phi_*$就可看作是把$M$上的$(k, 0)$型张量场$\mapsto N$上的同型张量场。进一步地，由于$\phi^{-1}$的存在，其拉回$\phi^{-1*}$可看作对形式场的推前$\phi_*$.

<script type="text/tikz">
    \usepackage{amsfonts}
    \usetikzlibrary{cd}
    \begin{document}
    \begin{tikzcd}
    T_{\phi^{-1}(q)}M \arrow[rd, "\omega"'] & T_qN \arrow[l, "\phi^{-1}_*"'] \arrow[d, "\phi_*\omega"] \\
                                            & \mathbb R                                               
    \end{tikzcd}
    \end{document}
</script>

于是推前映射对所有类型的张量场就都有了定义。同理，拉回映射也可以推广到所有类型的张量场。推广后它们仍为线性映射，且互为彼此的逆。
