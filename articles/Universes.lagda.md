# 使用Agda的数学泛等基础介绍

## 宇宙

我们来定义本讲义中使用的类型宇宙的记号，这与[标准Agda记号](https://agda.readthedocs.io/en/latest/language/universe-levels.html)不同，但比较接近于HoTT/UF中的记号。

不熟悉Agda的读者应该在阅读[MLTT in Agda]()和[HoTT/UF in Agda]()之后再尝试理解。

```agda
{-# OPTIONS --without-K --exact-split --safe --auto-inline #-}

module Universes where

open import Agda.Primitive public
 renaming (
            Level to Universe -- 我们将称之为Universes而不是Levels
          ; lzero to 𝓤₀       -- 我们的第一个宇宙称为𝓤₀
          ; lsuc to _⁺        -- 𝓤之后的宇宙是𝓤 ⁺
          ; Setω to 𝓤ω        -- 有一个宇宙𝓤ω，它严格大于𝓤₀, 𝓤₁, ⋯ , 𝓤ₙ, ⋯
          )
 using    (_⊔_)               -- 两个宇宙的最小上界，例如𝓤₀ ⊔ 𝓤₁是𝓤₁
```
`Universe`的元素是宇宙的名称。给定一个名称`𝓤`，其对应的宇宙本身我们在此讲义中写作`𝓤 ̇`，注意右上角是一个几乎看不见的点上标。

实际上我们需要定义这个记号，因为传统上在Agda中如果我们使用`ℓ`表示宇宙级别，那么`Set ℓ`就是所有级别为`ℓ`的类型的类型。然而，对于泛等基础来说这个记号不好，因为并非所有的类型都是集合。术语“级别”也不好，因为在泛等类型论中h级别指代的是相等的复杂度而不是大小。

以下应该是本讲义中唯一使用Agda关键字`Set`的地方。
```agda
Type = λ ℓ → Set ℓ

_̇ : (𝓤 : Universe) → Type (𝓤 ⁺)
𝓤 ̇ = Type 𝓤
```
这是在说给定宇宙级别`𝓤`后，我们就得到类型宇宙`𝓤`，它居住在下下个类型宇宙`𝓤 ⁺`。所以点上标记号只是（前缀）`Type`的（后缀）缩写，而后者只是`Set`的缩写，在Agda中意味着类型。

我们命名一些初始宇宙
```agda
𝓤₁ = 𝓤₀ ⁺
𝓤₂ = 𝓤₁ ⁺
𝓤₃ = 𝓤₂ ⁺
```
为了记号上的方便，我们也定义
```agda
_⁺⁺ : Universe → Universe
𝓤 ⁺⁺ = 𝓤 ⁺ ⁺
```
以下定义有时是有用的
```agda
universe-of : {𝓤 : Universe} (X : 𝓤  ̇) → Universe
universe-of {𝓤} X = 𝓤
```
词缀
```agda
infix 1 _̇
```
