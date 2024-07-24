# Quest 2 - Sigma类型

<!--
```agda
module Trinitarianism.Quest2 where

open import Cubical.Core.Everything public
open import Cubical.Data.Unit public renaming (Unit to ⊤)
open import Cubical.Data.Empty public using (⊥)
open import Cubical.Data.Nat public hiding (isEven)
open import Trinitarianism.Quest1 public
```
-->

我们仍在尝试表达和“证明”

::: info 声明
存在一个是偶数的自然数
:::

我们将在本关结尾达成这一目标。

## 存在 / 依赖对 / 丛的总空间

前面我们已经定义了 `isEven`。剩下的是要写下“存在”。在数学中我们可能这么写
$$\exist x \in \N, ~ \text{isEven} ~ x$$
在 `agda` 中记号是

    Σ ℕ isEven

这被称作*Sigma类型*，它有三种解释：
- 命题“存在一个偶自然数”
- 构造“同时持有自然数 `n` 以及 `isEven n` 的配方”
- `ℕ` 上的丛 `isEven` 的总空间，也就是把所有的纤维放在一起的空间。画图来看是这样的（紫色背景部分）
![isEven丛](https://thehottgameguide.readthedocs.io/en/latest/_images/isEvenBundle.png)
它也可被看作是偶自然数子集，因为纤维要么是空的，要么是单例。（我们称之为亚单例丛）。

## 构造Sigma类型的项

构造该类型的项有三种解释：
- （给出一个关于存在偶自然数的证明相当于给出）一个自然数 `n : ℕ` 和一个关于 `n` 是偶数的证明 `hn : isEven n`。
- 将配方 `n : ℕ` 和 `hn : isEven n` 配成一对。
- （给出总空间中的一个点就是给出）一个点 `n : ℕ` 以及位于其上方纤维中的一个点 `hn : isEven n`。

现在你可以证明存在一个偶自然数了。

```agda
ExistsEvenNatural : Σ ℕ isEven
ExistsEvenNatural = zero , tt
```
一般来说当 `A : Type` 是一个类型且 `B : A → Type` 是 `A` 上的一个谓词/依赖构造/丛的时候，我们可以写出Sigma类型 `Σ A B` 其项是序对 `a , b`，其中`a : A` 且 `b : B a`。在 `B` 不依赖于 `a : A` 的特殊情形下，即对于某个 `C : Type` 形如 `λ a → C` 时，`Σ A B` 就是
- 命题“`A` 且 `C`”因为给这个命题一个证明就是给 `A` 一个证明并给 `C` 一个证明
- 一个配方 `a : A` 和一个配方 `c : C`
- `B` 现在是*平凡丛*，因为纤维 `B a` 关于 `a : A` 是恒常不变的。换言之它仅仅是一个*积* `Σ A B ≅ A × C`。因此，也称Sigma类型为*依赖积*，但我们会避免使用这个术语。

```agda
_×_ : Type → Type → Type
A × C = Σ A (λ a → C)
```
`agda` 支持记号 `_×_` (不带空格)，也就是说现在你可以写 `A × C` 了(带空格)。

## 使用Sigma类型的项

有两个方法可以使用Sigma类型的项。我们可以使用 `fst` 提取第一部分或者使用 `snd` 提取第二部分。给定 `x : Σ A B` 对于 `fst` 和 `snd` 我们有三种解释：
- 将 `x` 视作存在性的证明。`fst x` 提供了存在的证据，`snd x` 提供了证据 `fst x` 满足期望属性的证明。
- 将 `x` 视作配方。`fst` 提取该配方的第一部分，`snd` 提取第二部分。
- 将 `x` 视作丛的总空间中的点。`fst x` 是底空间中的点，`x`位于其上；`snd x` 是 `x` 所代表的纤维中的点。特别是你可以将 `fst` 解释为从总空间到底空间的投影，它坍缩了纤维。

例如要定义一个输入为偶自然数并返回其除以二的映射，我们可以这样做

```agda
div2 : Σ ℕ isEven → ℕ
div2 (zero , snd₁) = zero
div2 (suc (suc fst₁) , snd₁) = suc (div2 (fst₁ , snd₁))
```

*重要发现*：声明“存在一个偶自然数”的两个证明 `2 , tt` 和 `36 , tt` 在任何意义上都不“相同”，因为如果它们“相同”那么我们将有 `div2 (2 , tt)` 和 `div2 (36 , tt)` “相同”，因此 `1` 就和 `18` “相同”。

::: info “相同”
它们“相同”吗？什么是“相同”？
:::

## 重言式 / 柯里化 / 笛卡尔闭

注意我们已经为你*假定*(`postulate`)了类型 `A, B, C`。

```agda
private
  postulate
    A B C : Type
```
一般来说，你可以用它在你的 `agda` 文件中引入新的常量。`private` 确保 `A, B, C` 只能在这个 `agda` 文件内部使用。
::: info 提示
`agda` 是空格和缩进敏感的，即 `private` 将应用于任何在它之下且缩进两个空格的内容。
:::

本节中，你将构造如下函数。

```agda
uncurry : (A → B → C) → (A × B → C)
uncurry f x = f (fst x) (snd x)

curry : (A × B → C) → (A → B → C)
curry f a b = f (a , b)
```
这些有如下解释：
- `uncurry` 是证明如果“`A` 蕴含（`B` 蕴含 `C`）”，那么“（`A` 且 `B`）蕴含 `C`”。反向的证明是 `curry`。
- [柯里化](https://en.wikipedia.org/wiki/Currying)
- 这是*adjunction*的一个常见的例子。
