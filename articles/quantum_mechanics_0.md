@[TOC](量子力学之基本假设)

# 量子力学之基本假设

## 态的叠加原理
物质的波粒二象性使人们相信，经典力学的运动规律，甚至于**其概念都不足以给我们提供对原子事件的描述**。
科学所研究的只是可观察的事物，同时，只有让对象于某种外界影响相互作用，我们才能观察它。这样，观察的动作必然地要伴随着对所观察的对象的某些干扰。
某些哲学上的想法认为物质是无限可分的，然而为了建立关于物质终极结构的理论，我们需要给大小以绝对的含义，因此必须假定：**对我们观察力的精细程度和对伴随着的干扰的微小程度有一个限度。这个限度是事物本质中所固有的，观察者方面改进技术或提高技巧，都不可能超越这个限度。**
如果系统是小的，我们不能在观察它时而不产生严重的干扰，因此，我们不能期望在我们的观察结果之间找到任何因果性的联系。在计算观察出的结果时就有不可避免的不确定性出现，一般说来，理论使我们能够算出的只是，当进行观察时能获得某个特定结果的几率。

**叠加形成的态所具有的中间性质，是通过由观察得出特定结果的几率处于原来两个态的相应几率的中间而表现出来，而不是观察结果本身处于原来两个态的相应结果的中间。**

关于光子的偏振和干涉的态叠加和几率解释并未让所有人满意。他们的主要问题在于

 1. 光子能够同时处于两种状态的想法很奇怪，而且，这个奇怪的想法并没有给予基本的单个光子过程以任何令人满意的图像。
 2. 按照传统的波动光学也能得到对偏振和干涉的同样的理解。这种奇怪的想法似乎并无用处。
 
 狄拉克对这两个问题的回答是
 
 1. 物理科学的主要目的并不是提供图像，而是以公式表达那些支配现象的规律，并利用这些规律去发现新的现象。
 2. 偏振和干涉的实验还比较简单，因此可以与初等理论联系起来。量子力学可以给出在更复杂情况下的描述方法，对于这些简单的情况也能适用。

### 数学表述
态的这种叠加性质，最明显的是可以用数学中的矢量来表示。事实上，必须使用无限维空间中的矢量，才足以表达一般力学系统。与系统的态相联系的矢量称为“右矢”，用符号$\ket{}$来表示。态A就记作$\ket A$。
我们假定，**在一特定时刻力学系统的每一个态相应于一右矢量，其相应关系是这样的：一态是由于某些其他态的叠加而得，当且仅当它相应的右矢量能表示为与这些其他态相应的诸右矢量的线性组合。**
另外，我们还要假定，一个态与其自身叠加不能形成任何新的态，而只能仍得到原来的态。因为
$$c_1\ket A + c_2\ket A = (c_1 + c_2)\ket A$$
因此，除了$c_1 + c_2 = 0$的这种情况，所得的态必须与原来的态相同。于是我们得出结论：**如果相应于一个态的右矢量乘以任何不为零的复数，则得到的右矢量相应于同一态。**
这样，一个态是由一个右矢量的方向所确定的，其长度则是无关紧要的。力学系统的所有的态与右矢量的一切可能方向，是一一对应的，而在右矢量$\ket A$与右矢量$-\ket A$的方向之间也没有任何区别。
考虑如下式子
$$c_1\ket A + c_2\ket B = \ket R$$
可以看出如果$c_1, c_2$乘以相同的因子，则右矢量$\ket R$不变，因此右矢量$\ket R$仅由两个系数的比决定。两个复数的比对应于一个复数(或者说两个实参量)，因此该叠加态的自由度为2。
物理上，一般的偏振态需要用两个参量来描述，一般的平移态也是要用两个参量来描述(振幅比和相位差)。这表明了在上述式子中允许复系数的必要性。因为如果这些系数仅限于实数，那么叠加态将只有一个自由度。

### 左矢和右矢
在数学上，左矢量定义为右矢量的对偶，记作$\bra{}$。除此之外，我们还要假定：**在左矢量与右矢量之间有一一对应关系，使得相应于$\ket A + \ket{A'}$的左矢量是相应于$\ket A$的左矢量与相应于$\ket{A'}$的左矢量之和，而相应于$c\ket A$的左矢量则是相应于$\ket A$的左矢量乘以$\bar c$，$\bar c$是$c$的共轭复数。** 这样，相应于$\ket A$的左矢量将写成$\bra A$。

我们的左矢量和右矢量是复量，因为他们能乘以复数，而所得的量仍具有与前相同的性质，但是它们是一种特殊的复量，不能分成实部与虚部。左矢量与其共轭(右矢量)是不同性质的，不能加在一起。为表示这一区别，我们称复数之类的能够分成实部与虚部的复量为“共轭复量”，而称左矢、右矢之类的不能分成实部与虚部的复量为“共轭虚量”。

由于左矢量与右矢量之间是一一对应的，**在特定的时刻，我们力学系统的任何态也可以用一左矢量的方向来确定，就像用一右矢量的方向来确定一样。** 事实上，整个理论在本质上在左矢量与右矢量之间是对称的。

右矢量$\ket A$与左矢量$\bra B$的标量积记作$\braket{B|A}$，我们还规定
$$\braket{B|A} = \overline{\braket{A|B}}$$
如果在其中令$\ket B = \ket A$，我们就发现数$\braket{A|A}$应该是实数。我们进一步规定，除$\ket A = 0$时外，
$$\braket{A|A} > 0$$

右矢量$\ket A$的长度定义为$\sqrt{\braket{A|A}}$。当我们有一态，而希望建立一个左矢量或右矢量与之相应时，这时只是这个矢量的方向是已知的，这个矢量本身则还差一个数字因子未决定。选择这个数字因子使矢量的长度为1常常是方便的。这个程序就称为归一化，而如此选择的矢量称为已归一化的。即令如此，这矢量还未完全决定，因为我们还能用模量为1的任何复数乘它而不会改变其长度，也即能用$e^{i\gamma}$形式的任意数去乘它而不会改变其长度，其中$\gamma$是实数。我们称这个数为相因子。

## 可观察量

### 线性算符
前面已经假定，矢量的方向相应于力学系统在某一特定时刻的状态。现在我们进一步假定，线性算符相应于在那个时刻的力学变量。线性算符的共轭算符相应于力学变量的共轭复量。自共轭算符称为实线性算符，相应于实数的力学变量。

### 本征值与本征矢量
考虑方程
$$\alpha\ket P = a\ket P$$
其中$\alpha$是线性算符，而$a$是一个数。这个方程通常的表现形式是：$\alpha$为已知的线性算符，数$a$和右矢量$\ket P$是我们要求的未知量。如果找到这样的数$a$和右矢量$\ket P$满足上述方程，我们就称$a$为线性算符$\alpha$的一个本征值，称$\ket P$为线性算符$\alpha$的一个本征右矢。并称$\ket P$是属于本征值$a$的。不难看出，若$\ket P$是本征右矢，则它一定属于唯一的$a$；反过来，对于一个本征值$a$，则可以有多个本征右矢属于该本征值。事实上，这些本征右矢可以是相关的，也可以是不相关的，它们构成的空间称为本征子空间。

量子力学中，特别关注实线性算符的本征值和本征矢量。有三个重要结果:
1. 实线性算符的本征值全部是实数。
2. 联系于实线性算符的本征右矢的本征值，都同时是联系于其本征左矢的本征值。
3. 实线性算符的任意本征右矢的共轭虚量，都是属于同一本征值的本征左矢；反之亦然。

关于本征值和本征矢量，我们还有如下的**正交性定理**：
**实力学变量的两个本征矢量，如果属于不同的本征值，则它们是正交的。**

为证明此定理，设$\ket{\xi'}$和$\ket{\xi''}$是实力学变量$\xi$的两个相应于本征值$\xi'$和$\xi''$的本征右矢。我们就有
$$\xi\ket{\xi'} = \xi'\ket{\xi'}, ~ \xi\ket{\xi''} = \xi''\ket{\xi''}$$
取第一式的共轭虚量，我们得到$\bra{\xi'}\xi = \xi'\bra{\xi'}$，用$\ket{\xi''}$右乘给出
$$\braket{\xi'|\xi|\xi''}= \xi'\braket{\xi'|\xi''}$$
而用$\bra{\xi'}$左乘第二式得
$$\braket{\xi'|\xi|\xi''}= \xi''\braket{\xi'|\xi''}$$
上述两式相减，得
$$(\xi' - \xi'')\braket{\xi'|\xi''} = 0$$
因此，如果$\xi' \neq \xi''$，就必须有$\braket{\xi'|\xi''} = 0$，即这两个本征矢量是正交的。

相应于本征矢量的态称为本征态。

### 可观察量
如果力学系统是处于实力学变量$\xi$的本征态，属于本征值$\xi'$，那么，对$\xi$的测量就一定给出结果为数$\xi'$。反过来，如果系统处于这样的态，在其中对实力学变量$\xi$的测量肯定给出一特定结果，那么，这个态就是$\xi$的本征态，而测量的结果就是$\xi$的本征值，这个本征态是属于此本征值的。

从物理的连续性来看，如果我们在第一次测量$\xi$后，立即进行同一个力学变量$\xi$的测量，那么第二次测量的结果必然与第一次的结果一样。这就是说，在第一次测量作过以后，系统处于力学变量$\xi$的本征态。因此，测量总是使系统突变到所测量的力学变量的本征态。

由此可以推断，对于处于任意态的力学系统，测量一实的力学变量的任何结果，都是其本征值之一，反之，实力学变量的本征值的集合，就恰恰是测量此力学变量的各种可能结果。

我们还要假定，如果对处于一特定态的系统测量了某一实力学变量$\xi$，则该系统因为测量而可能突变到的那些态是这样的，即原来的态与它们是相关的。由于原来的态可以是任意的态，因此可以得出结论，任意的态都是与$\xi$的本征值相关的。换句话说，$\xi$的本征态组成一完全集，即任意的态均可由其线性表出。

**如果一个实变量的本征态组成完全集，我们就称之为可观察量。** 结合上面的假定，可测量的量的本征值就构成完全集，因此，任何可测量的量都是可观察量。那么问题来了，是不是每个可观察的量都能够测量呢？理论上，是的。但实际上，要设计出能测量某一特定可观察量的仪器，可能是很困难的事情。

现在我们考察一下可观察量需要满足的一些数学上的条件。前面说，任意态均可由可观察量的本征态线性表出，这可以表示为
$$\ket P = \int\ket{\xi'}d\xi'$$
其中，$\ket{\xi'}$是相应于本征值$\xi'$的本征态，积分在所有本征值可取到的区间上进行。考虑两个右矢$\ket X$与$\ket Y$，它们能表示为可观察量$\xi$的本征右矢的积分:
$$\ket X = \int\ket{\xi'}d\xi', ~ \ket Y = \int\ket{\xi''}d\xi''$$
那么就有
$$\braket{X|Y} = \iint\braket{\xi'|\xi''}d\xi'd\xi''$$
根据前面的正交性定理，被积函数$\braket{\xi'|\xi''}$在积分的全部范围里，除了一点$\xi' = \xi''$之外，全部为零。如果被积函数在这一点是有限的，则上述积分为零。但是$\braket{X|Y}$一般不为零，因此，一般地$\braket{\xi'|\xi''}$必须为这样的无穷大，使得上式不为零而成为有限值。

在上式中取$\ket X = \ket Y$，我们得到的结果是一般地$\braket{\xi'|\xi'}$是无穷大。现在我们规定，如果$\ket{\xi'} \ne 0$，则
$$\int\braket{\xi'|\xi'}d\xi' > 0$$

### 可观察量的函数
可观察量的函数定义为满足下式的线性算符：
$$f(\xi)\ket{\xi'} = f(\xi')\ket{\xi'}$$
对$\xi$的每一个本征右矢$\ket{\xi'}$都成立，其中$f(\xi')$对于每一个本征值$\xi'$都是数。此外，对上式作共轭，得到
$$\bra{\xi'}\overline{f(\xi)} = \bar f(\xi')\bra{\xi'}$$
可观察量的函数的共轭复量以此定义。用任意右矢$\ket P$右乘此方程，一方面
$$\bra{\xi'}\overline{f(\xi)}\ket P = \bar f(\xi')\braket{\xi'|P} = \int\bar f(\xi')\braket{\xi'|\xi''}d\xi''$$
另一方面，因为$\bar f(\xi)\ket P = \bar f(\xi')\ket P$，所以
$$\braket{\xi'|\bar f(\xi)|P} = \bar f(\xi'')\braket{\xi'|P} = \int \bar f(\xi'')\braket{\xi'|\xi''}d\xi''$$
应用正交性定理，可以看出上述被积函数在$\xi' \neq \xi''$时都为零。因此上述两积分相等，即
$$\bra{\xi'}\overline{f(\xi)}\ket P = \braket{\xi'|\bar f(\xi)|P}$$
又因为$\bra{\xi'}$和$\ket P$是任意的，就有
$$\overline{f(\xi)} = \bar f(\xi)$$
即线性算符$f(\xi)$的共轭复量是$\xi$的共轭复函数$\bar f$。

作为推论，如果$f(\xi')$是$\xi'$的实函数，$f(\xi)$就是实线性算符。由$f(\xi)$的定义可知$\xi$的每个本征态也都是$f(\xi)$的本征态，故它的本征态组成一完全集，即$f(\xi)$也是可观察量。用上述定义，**我们就能给可观察量的任意函数$f$以意义，只要实变函数$f(x)$的存在区域包括这个可观察量的全部本征值。** 

## 与物理的联系
如果对处于相应于$\ket X$的态的系统，测量可观察量$\xi$很多次，则所得全部结果的平均值将为$\braket{x|\xi|x}$，只要$\ket X$是归一化的。

在一般情况下，我们不能说可观察量对一特定态有值，但是我们能说它对这个态有一个平均值。我们还可以进一步说，对这个态可观察量有任一指定值的几率。因为按照上述假定，$f(\xi)$的平均值应为$\braket{x|f(\xi)|x}$。现在我们取$f(\xi) = \delta_{\xi a}$，可以看出，这个定义作为可观察量的函数是有意义的。而$\delta_{\xi a}$的平均值恰好就是$\xi = a$的几率。因此
$$P_{\xi = a} = \braket{x|\delta_{\xi a}|x}$$

根据上式，我们可以得到测量本征态一定给出本征值的假定和上述假定是相容的，而且实际上可由后者推出。因为根据可观察量函数的定义
$$\delta_{\xi a}\ket{\xi'} = \delta_{\xi' a}\ket{\xi'}$$
所以$P_{\xi = a} = \braket{\xi'|\delta_{\xi' a}|\xi'}$，当$a \neq \xi'$时一定为零；而当$a = \xi'$时，由于$\ket{\xi'}$是归一化的，所以为1。

如果测量$\xi$可能的结果是在一个范围内连续的，那么上述结论应表示如下
$$P_{\xi = a}da = \braket{x|\chi(\xi;a)|x}$$
其中$\chi(\xi;a)$的定义为，如果$\xi$在$a$到$a + da$之间为1，否则为0。

## 对易性与相容性
一个态可以同时是两个可观察量的本征态。假设这个态为$\ket A$，那么就有
$$\xi\ket A = \xi'\ket A, ~ \eta\ket A = \eta'\ket A$$
因此$\xi\eta\ket A = \xi'\eta\ket A = \eta\xi'\ket A = \eta\xi\ket A$，即
$$(\xi\eta - \eta\xi)\ket A = 0$$
这个结果提示，如果$\xi\eta - \eta\xi$，即这两个可观察量是对易的，那么共同本征态就一定存在。而且可以证明，这共同的本征态还不止一个，而是可以组成一个完全集。

假定$\xi$与$\eta$为两个对易的可观察量。现在我们将说明，$\xi$的每一个本征右矢同时也是$\eta$的本征矢量。注意到可对易条件，$(\eta - \eta')\ket{\xi'}$就满足
$$\xi(\eta - \eta')\ket{\xi'} = (\eta - \eta')\xi'\ket{\xi'} = \xi'(\eta - \eta')\ket{\xi'}$$
这说明它是$\xi$的本征右矢。考虑$\ket{\eta'}$的展开，即
$$\ket{\eta'} = \int\ket{\xi'}d\xi'$$
因为
$$0 = (\eta - \eta')\ket{\eta'} = \int(\eta - \eta')\ket{\xi'}d\xi'$$
本征右矢的积分为0，除非每个本征右矢都是0，因此就有
$$(\eta - \eta')\ket{\xi'} = 0$$
也就是说，$\ket{\xi'}$是$\xi$的本征右矢，同时也是$\eta$的本征右矢。既然$\ket{\eta'}$可以展开为两者共同的本征右矢的组合，而任意右矢又都能展开为$\ket{\eta'}$的组合，所以任意右矢就都能展开成两者共同的本征右矢的组合。因此，共同本征态组成一个完全集。

上述定理的逆为，如果$\xi$与$\eta$是两个这样的可观察量，它们的共同本征态组成一完全集，则$\xi$与$\eta$对易。证明如下，假设$\ket{\xi'\eta'}$是一组成完全集的共同本征右矢，则
$$(\xi\eta - \eta\xi)\ket{\xi'\eta'} = (\xi'\eta' - \eta'\xi')\ket{\xi'\eta'} = 0$$
而任意右矢$\ket P$可以展开成$\ket{\xi'\eta'}$的组合，因此
$$(\xi\eta - \eta\xi)\ket P = 0$$
所以$\xi\eta - \eta\xi = 0$，这样就完成了证明。

总之，我们有这样的等价条件，**即$\xi$与$\eta$对易，当且仅当它们的共同本征态组成一完全集。**

套用正交性定理的证明过程，类似地可以证明，一组对易的可观察量$\xi,\eta,\cdots$的两个本征矢量$\ket{\xi'\eta'\cdots}$和$\ket{\xi''\eta''\cdots}$也满足如下关系
$$(\xi'\eta'\cdots - \xi''\eta''\cdots)\braket{\xi'\eta'\cdots|\xi''\eta''\cdots} = 0$$
因此，如果它们所属的两组本征值有任意一点不同，即$\xi'\eta'\cdots \neq \xi''\eta''\cdots$则这两个本征矢量是正交的。

一般来说，我们对处于特定态的系统进行观察，就不能不干扰这个态，不能不妨碍对它进行第二次观察。我们因而不能给两个同时进行的观察以任何意义。然而，在两个同时进行的观察是对易的情况下，前面所述的关于可观察量的函数的结论及其于物理的联系，均可以容易地推广过来。此时，两次观察应当被看成是互不干涉的，或者说，是**相容的**。因此，现在说一组对易的可观察量同时有值是有意义的，并且，我们还能给出同时测量一组对易可观察量而得到一组特定结果的几率的含义。**从普遍理论的观点来看，任意两个或更多的对易可观察量，可以当成单个的可观察量，对它们的测量结果包括两个或更多的数。** 对它们进行这样的测量而肯定得出特定结果的那些态，都是共同本征态。