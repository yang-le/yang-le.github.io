
## $\in$-关系

集合论构建于这样的假设之上，即有一个基本的关系（即一个二变量的谓词），记作$\in$. 集合论并不直接定义$\in$是什么，也不直接定义集合是什么，而是给出了关于$\in$和集合的九个公理，也正是这九个公理完整地定义了$\in$和集合。

## 集合论的Zermelo-Fraenkel公理

### 外延公理

$$\forall x: \forall y: (\forall z: (z \in x \Leftrightarrow z \in y) \Rightarrow \forall w: (x \in w \Leftrightarrow y \in w))$$

我们定义$x = y$为

$$\forall z: (z \in x \Leftrightarrow z \in y) \land \forall w: (x \in w \Leftrightarrow y \in w)$$

于是外延公理也可以写为

$$\forall x: \forall y: (\forall z: (z \in x \Leftrightarrow z \in y) \Rightarrow x = y)$$

意为两个集合相等（是同一集合），若它们有相同的元素。

### 空集公理

$$\exist x: \neg\exist y: y \in x$$

或以$\notin$符号表示为

$$\exist x: \forall y: y \notin x$$

意为存在这样的集合，它不包含任何元素。结合外延公理，我们可以证明，这样的集合是唯一的，称之为空集，记作$\empty$.

::: info 定理
空集是唯一的。

证明：设$x$和$x'$都是空集，则$y \in x$为假，这就意味着$y \in x \Rightarrow y \in x'$为真。注意到这个结论是不依赖于$y$的，即
$$\forall y: y \in x \Rightarrow y \in x'$$
类似地，我们有
$$\forall y: y \in x' \Rightarrow y \in x$$
即
$$\forall y: y \in x \Leftrightarrow y \in x'$$
根据外延公理，我们就有$x = x'$.
:::

### 配对公理

$$\forall x: \forall y: \exist z: \forall u: (u \in z \Leftrightarrow (u = x \lor u = y))$$

意为对于任意的$x$和$y$，存在一个集合$z$恰以$x$和$y$为其元素，我们记作$\{x, y\}$. 根据定义，我们有$\{x, y\} = \{y, x\}$，于是这个对是无序的。同样可以使用外延公理证明，这样的集合也是唯一的，我们称之为$x$和$y$的（无序）对。

我们将集合$\{x, x\}$简写为$\{x\}$，称为包含$x$的单元素集。

对集公理还允许我们定义$(x, y) := \{\{x\}, \{x, y\}\}$，称为$x$和$y$的序对。注意这个定义满足条件
$$(a, b) = (c, d) \Leftrightarrow a = c \land b = d$$

有序$n$-元组可被递归地定义如下：
$$(a_1, \dots, a_n) := ((a_1, \dots, a_{n - 1}), a_n)$$

> 对集公理并非独立于其他公理。实际上，它可由替换公理模式应用于任给的二元素或多元素集合得到。而这样一个二元素集合（例如$\{\empty, \{\empty\}\}$）的存在性，可由空集公理和幂集公理或无穷公理得到。

### 并集公理

$$\forall x: \exist u: \forall y: (y \in u \Leftrightarrow \exist s : (y \in s \land s \in x))$$

对任意的集合$x$，都存在一个集合$u$，它恰以集合$x$的元素($s$)的元素($y$)为其元素。记作$u = \bigcup x$.

### 替换公理模式

$$\forall m: (\forall x: \exist!y: x \in m \Rightarrow R(x, y)) \Rightarrow \exist n: \forall y: (y \in n \Leftrightarrow \exist x: (x \in m \land R(x, y)))$$

我们称关系$R$是一个泛函关系，若$\forall x: \exist!y : R(x, y)$. 其中$\exist!$表示存在且唯一。设$m$是一个集合，$m$在$R$下的像由所有满足$\exist x: (x \in m \land R(x, y))$的那些$y$构成。记作$\mathrm{im}_R(m)$.
替换公理模式保证这个像是一个合法的集合。

替换公理模式可以简单地记为

$$\forall m: \exist n: \forall y: (y \in n \Leftrightarrow \exist x: (x \in m \land R(x, y)))$$

其中$R$是一个泛函关系。所以替换公理模式并不是一个公理，而是依赖于$R$的一族公理，因此称为公理模式。

::: info 定理
设$P(x)$是一个谓词，$m$是一个集合，则所有使得$P(y)$为真的$y \in m$构成一个集合，记为
$$\{y \in m | P(y)\}$$

证明：
为了简单起见，我们将
$$\forall x \in y: P(x)$$
定义为
$$\forall x: (x \in y \Rightarrow P(x))$$
并将
$$\exist x \in y: P(x)$$
定义为
$$\exist x: (x \in y \land P(x))$$

证明分两种情况：

1. 若$\neg(\exist y \in m: P(y))$，我们定义$\{y \in m | P(y)\}$为$\empty$，根据空集公理，它是一个集合。
2. 若$\exist\hat y \in m : P(\hat y)$，则令$R$为如下的泛函关系
$$R(x, y) \Leftrightarrow (P(x) \land x = y) \lor (\neg P(x) \land \hat y = y) $$
换言之，若$P(x)$为真，$R$将选出$x$；否则选出$\hat y$。于是$\{y \in m | P(y)\}$就是$\mathrm{im}_R(m)$，根据替换公理模式，它是一个集合，证毕。
:::

该定理被称为受限概括原理（公理模式），Principle of Restricted Comprehension（PRC），分类（分离）公理模式。
某些版本的ZFC不包含空集公理，而是使用该分离公理模式来定义空集。

请勿将此和无限制概括原理（Principle of Universal Comprehension）混淆，后者声称对任意谓词$P, \{y | P(y)\}$是一个集合，而这被罗素证明是（逻辑上）不相容的。
注意其中的$y \in m$使得集合$\{y \in m | P(y)\}$所含的元素不会超过$m$本身。

现在我们可以定义集合的交$\bigcap x$为
$$\{a \in \bigcup x | \forall b \in x : a \in b\}$$
若$a, b \in x$且$\bigcap x = \empty$，则称$a$和$b$是不交的。

定义$x \sube y$为$\forall a \in x: a \in y$，现在设$u$和$m$是集合，且满足$u \sube m$，我们定义$u$相对于$m$的补$m \setminus u$为
$$\{x \in m | x \notin  u\}$$

此外若$x \sube y$且$x \neq y$我们就记$x \sub y$.

### 幂集公理

$$\forall x: \exist y: \forall a: (a \in y \Leftrightarrow a \sube x)$$

设$x$为一集合，则存在一个集合$y$，它恰以$x$的子集为其元素，称为$x$的幂集，记作$\mathcal P(x)$.

历史上曾将幂集定义为$\{y | y \sube m\}$，为了以这种风格定义幂集，我们必须事先说明$y$所在的集合以将其限制。
但是，在仅基于前述公理的限定下这是不可能的；实际上，我们别无他法而只能为幂集的存在性专门增加一个公理。

### 无穷公理

$$\exist x: \empty \in x \land (\forall y \in x: y \cup \{y\} \in x)$$

存在这样一个集合$x$，它包含空集作为其元素，且若$y$是它的元素，则$y \cup \{y\}$也必是它的元素。
这样的集合有时也叫做归纳集合，其中$y \cup \{y\}$叫做$y$的后继。无穷公理允许这样的集合存在。

这个集合$x$实际上就是自然数集$\N$，所以无穷公理也相当于是说存在这样一个集合，它包含所有的自然数。
此外，我们还可以定义$\R$为$\mathcal P(\N)$，可以证明它和实数集是（集合）同构的。
无穷公理和幂集公理保证了自然数集和实数集的存在性。

### 正则公理

$$\forall x: (\exist a: (a \in x) \Rightarrow \exist y: (y \in x \land \neg\exist z: (z \in y \land z\in x)))$$

每个非空集合$x$都包含一个元素$y$，满足$y$与$x$不相交。以现代的记号写就是

$$\forall x: (x \ne \empty \Rightarrow \exist y: (y \in x \land y \cap x = \empty))$$

这个公理也称基础公理。它的一个应用是用来证明满足$x \in x$这样的集合是不存在的。若我们假设存在这样的集合，则根据对集公理我们有$\{x\}$也是一个集合，于是根据$x \in \{x\}$和$x \in x$我们就有$x \cap \{x\} = x$. 而对$\{x\}$使用正则公理我们应该有$x \cap \{x\} = \empty$. 但根据我们的假设$x$为非空，这就导致了矛盾。

### 选择公理

$$\forall x: ((\empty \notin x \land \forall a, b \in x: a \cap b = \empty) \Rightarrow \exist y: \forall a\in x: \exist!b \in a: b \in y)$$

设$x$的元素为两两互不相交的非空集合，则存在一个集合$y$，它恰好包含$x$中的每个元素（集合）的一个元素。
换言之，存在一个从$x$到$\bigcup x$的映射$f$，满足$\forall a \in x: f(a) \in a$. 而$y$则定义为$x$在这个映射下的像$f[x]$。
这个映射被称为选择函数，选择公理声明这样的选择函数是存在的。
