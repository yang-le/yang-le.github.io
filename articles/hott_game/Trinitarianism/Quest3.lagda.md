@[TOC](Pi类型)

# Quest 3 - Pi类型

<!--
```agda
module Trinitarianism.Quest3 where

open import Cubical.Core.Everything public
open import Cubical.Data.Unit public renaming (Unit to ⊤)
open import Cubical.Data.Empty public using (⊥)
open import Cubical.Data.Nat public hiding (_+_ ; isEven)

isEven : ℕ → Type
isEven zero = ⊤
isEven (suc zero) = ⊥
isEven (suc (suc n)) = isEven n

_×_ : Type → Type → Type
A × C = Σ A (λ a → C)

private
  postulate
    A B C : Type
```
-->

我们将试着形式化和证明如下声明。

::: info 声明
两个偶自然数的和是偶自然数。
:::

## 定义加法

要达成目标我们必须定义自然数上的 `+`。加法输入两个自然数并输出一个自然数，因此它应该有类型 `ℕ → ℕ → ℕ`。

```agda
_+_ : ℕ → ℕ → ℕ
zero + m = m
suc n + m = suc (n + m)
```

## 声明

现在我们在 `agda` 中做偶自然数的和是偶数的声明。该声明应该具有形式 `(x y : A) → B` 其中 `A` 表示偶自然数子集，而 `B` 表达了“`x` 与 `y` 的和”是偶数。

给定 `x y : Σ ℕ isEven` 我们想要展示它们的和（实际上是它们的第一分量的和）是偶数，所以我们应该给出 `isEven (x .fst + y .fst)`

::: info 提示
`x .fst` 是 `fst x` 的另一种记号。对于所有的Sigma类型这都是成立的。
:::

这有三种解释：
- 对所有的偶自然数 `x` 和 `y`，它们的和是偶数
- `isEven (x .fst + y .fst)` 是依赖于两个配方 `x` 和 `y` 的构造。给定 `Σ ℕ isEven` 的两个配方 `x` 和 `y`，我们分解出它们的第一分量，应用转换 `_+_`，形成了 `isEven` 的配方，即结果。
- `isEven (_ .fst + _ .fst)` 是范畴积 `Σ ℕ isEven × Σ ℕ isEven` 上的丛，`SumEvenIsEven` 是丛的*截面*。这意味着对 `Σ ℕ isEven × Σ ℕ isEven` 中的每一个点 `(x , y)`，它给出了纤维 `isEven (x .fst + y .fst)` 中的一个点。

更一般地给定 `A : Type` 和 `B : A → Type` 我们可以形成Pi类型 `(x : A) → B x : Type`（在其他语言中可能记作 `Π (x : ℕ), isEven n`），解释为：
- 命题“对所有的 `x : A`，我们有 `B x`”，且Pi类型的每一个项都是 `bx : B x` 的*证明的收集*，每个 `x : A` 都有一个证明。
- `(x : A) → B x` 的配方是通过转换每一个 `x : A` 到 `B x` 的某个配方得到的。实际上函数类型 `A → B` 是当类型 `B x` 不依赖于 `x` 时的特殊情形。因此Pi类型也被称为*依赖*函数类型。注意Sigma类型的项是序对 `(a , b)` 而依赖函数类型的项是由 `a : A` 索引的序对 `(a , b)` 的收集。
- 给定丛 `B : A → Type`，我们有总空间 `Σ A B`，其装备有一个投影 `fst : Σ A B → A`。`(x : A) → B x` 的项是这个投影的一个截面。

现在是时候证明这个声明了。玩的开心！

```agda
SumEvenIsEven : (x y : Σ ℕ isEven) → isEven (fst x + fst y)
SumEvenIsEven (zero , x₂) (y₁ , y₂) = y₂
SumEvenIsEven (suc (suc x₁) , x₂) (y₁ , y₂) = SumEvenIsEven (x₁ , x₂) (y₁ , y₂)
```

## 注记

我们的证明 `SumEvenIsEven` 依赖于 `_+_` 的显式定义，这意味着如果我们想要在别人的加法定义上使用我们的证明，则可能行不通。

::: info 重要问题
但是我们的 `_+_` 和别人的 `_+'_` 计算的是同样的值。`_+_` 和 `_+'_` “相同”吗？什么是“相同”？
:::

## `isEven` 的确定性

尝试在 `agda` 中表达和证明声明

::: info 问题声明
每个自然数是偶数或不是偶数。
:::

我们来总结一下这里需要什么：
- 类型 `A ⊕ B` (输入法为 `\oplus`) 的定义，解释为
  - 命题“`A` 或 `B`”
  - 两种配方的构造 `left : A → A ⊕ B` 和 `right : B → A ⊕ B`
  - 两个空间的不交和
  - 两个对象 `A` 和 `B` 的余积。该类型需要两个参数 `A : Type` 和 `B : Type`
    ```agda
    data _⊕_ (A : Type) (B : Type) : Type where
      left : A → A ⊕ B
      right : B → A ⊕ B
    ```
- 否定的定义。可以这样考虑
  - 对于两个类型 `A : Type` 和 `B : Type` 定义 `A ↔ B : Type`
  - 证明对于任意的 `A : Type` 我们有 `(A ↔ ⊥) ↔ (A → ⊥)`
  - 定义 `¬ : Type → Type` 为 `λ A → (A → ⊥)`
  ```agda
  _↔_ : Type → Type → Type
  A ↔ B = (A → B) × (B → A)

  _ : (A ↔ ⊥) ↔ (A → ⊥)
  _ = (λ x x₁ → fst x x₁) , λ x → x , λ ()

  ¬_ : Type → Type
  ¬ A = A → ⊥
  ```
- 形式化并证明以上声明
  ```agda
  isEvenDecidable : (x : ℕ) → isEven x ⊕ (¬ isEven x)
  isEvenDecidable zero = left tt
  isEvenDecidable (suc zero) = right λ ()
  isEvenDecidable (suc (suc x)) = isEvenDecidable x
  ```
