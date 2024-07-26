@[TOC](依赖类型)

# Quest 1 - 依赖类型

<!--
```agda
module Trinitarianism.Quest1 where

open import Cubical.Core.Everything public
open import Cubical.Data.Unit public renaming (Unit to ⊤)
open import Cubical.Data.Empty public using (⊥)
open import Cubical.Data.Nat public hiding (isEven)
```
-->

在数学研究中我们需要能够表达和“证明”数学声明。例如：

::: info 声明
存在一个是偶数的自然数
:::

本关的目标是定义一个自然数是偶数到底是什么意思。

## 谓词 / 依赖构造 / 丛

这要求谓词的概念。一般来说类型 `A : Type` 上的谓词是类型 `A → Type` 的一个项。例如

```agda
isEven : ℕ → Type
isEven zero = ⊤
isEven (suc zero) = ⊥
isEven (suc (suc n)) = isEven n
```

这是说“要定义 `ℕ` 上的函数，只需分*情形*定义在 `zero` 和 `suc n` 上即可，因为它们是 `ℕ` 仅有的构造器”。这有着如下的解释：
- 命题逻辑的角度，这是*数学归纳原理*。
- 范畴论的角度，这是自然数对象的泛性质。

## 丛的解释

`isEven : ℕ → Type` 的解释是
- 命题逻辑：我们已经提及了，`isEven` 是 `ℕ` 上的谓词。
- 作为构造：`isEven` 是*依赖构造*。特别地，`isEven n` 要么是 `⊤` 要么是 `⊥`, 这依赖于 `n : ℕ`。
- 几何地：视作从空间 `ℕ` 到空间的空间 `Type` 的映射，`isEven` 给 `ℕ` 中的每一个点 `n` 赋予一个空间 `isEven n`。
![isEven](https://thehottgameguide.readthedocs.io/en/latest/_images/isEven.png)
我们说 `isEven` 是 `ℕ` 上的*空间丛*，或者就简称 `ℕ` 上的丛。位于每一个 `n` 上方的空间 `isEven n` 称作 `n` 上的*纤维*。在这个特别的例子里纤维要么是空要么是单例。
    ::: warning 注意
    在上图中，我们未加说明地将 `ℕ` 画成了“不连通”的点，即*离散*空间。参见[后文]()以了解为什么这是合理的。
    :::
- 范畴论：`isEven` 是俯范畴 `Type↓ℕ` 中的一个对象。

一般地给定一个类型 `A : Type`，`A` 上的一个*依赖类型* `F` 是项 `F : A → Type`。这可以画成一族由空间 `A` 参数化的空间。
![丛](https://thehottgameguide.readthedocs.io/en/latest/_images/generalBundle.png)

## 使用三一性

我们从不同的视角引入了新的想法，每个都有其优点
- 视类型为命题通常是最熟悉的视角，因此它为其他两个视角提供了指引。但当前的数学范式使用“证明无关性”（两个同一命题的证明总是“相同”的），这和HoTT*不*兼容。我们稍后展开来讲。
- 视类型为构造符合“数据”是重要的，且应该保留的观点。
- 视类型为对象/空间允许我们画图，因此可以几何直觉引导我们穿越语法的迷雾。

对于每个新引进的想法，要确保它从证明论，类型论和范畴论/几何的角度都是合理的。
