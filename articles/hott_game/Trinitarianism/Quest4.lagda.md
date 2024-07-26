# Quest 4 - 路径和相等

<!--
```agda
module Trinitarianism.Quest4 where

open import Cubical.Foundations.Prelude using
  (Level; Type; _≡_; J; JRefl; refl; i1; i0; I; cong) public

open import Cubical.Foundations.Isomorphism renaming (Iso to _≅_) public

private
  variable
    A B : Type
    x y z w : A
```
-->

目前我们一直没有提到过“相等”；我们也从来没有说过两个类型或两个项“相同”意味着什么。但是，在[圆的基础群]()中，通过创建从一个空间到另一个的一条路径（通常是通过同构）我们提到了两个空间看上去相同是什么意思。实际上我们就用这个作为我们（内涵）相等的*定义*。

下面我们会经常使用几何视角，但也会在合适的时候转换视角。

::: info 宇宙等级
在解答里我们总是使用 `Type u`，但这里我们就只写个 `Type`。使用任意一个宇宙并没有什么概念上的不同，但实践中我们想要尽可能的一般化。

我们仅使用 `Type`，并在出现问题的时候意识到为什么它不够一般化。这是很有用的。
:::

## 恒等类型

### 构造

给定 `A : Type` 和 `x y : A` 我们有一个类型 `Id x y : Type`， 称为 `x` 到 `y` 的*恒等类型*。

```agda
data Id {A : Type} : (x y : A) → Type where
  rfl : {x : A} → Id x x
```
这个构造要求（隐式）参数 `A : Type`，然后对每一对点 `x y : A` 它返回一个空间 `Id x y` 解释如下：
- `Id x y` 是命题“`x` （内涵地）等于 `y`”且对每一个 `x`，我们有一个证明 `rfl x` 表示“`x` （内涵地）等于其自身”。（因此这个名字 `rfl`，是*reflexivity*的缩写）
- 当 `x` 和 `y` 是相同的配方时，构造 `Id x y` 的唯一配方即被给出
- `Id x y` 是从 `x` 到 `y` 的路径空间，即该空间中的点是 `A` 中从 `x` 到 `y` 的路径。对 `A` 中的每一个点 `x`，在 `x` 处有常路径 `rfl x`。
- `Id` 是 `A × A` 上的丛，对角映射 `A → A × A` 将 `x ↦ (x , x)` 可经由 `Id → A × A` 分解（视 `Id` 为总空间 `Σ (A × A) Id`）。
![](https://thehottgameguide.readthedocs.io/en/latest/_images/idType.png)

我们推荐你首先尝试使用 `rfl` 的显式参数版本 `rfl : (x : A) → Id x x`，以便搞清楚其中到底发生了什么，但我们下面将使用 `rfl` 的隐式参数版本 `rfl : {x : A} → Id x x`。

::: info 内涵相等和外延相等
在第一种观点下我们使用了“内涵”这个词因为还有一个“外延相等”的观念我们想要区分开来。简单来说 `x` 和 `y`
是外延相等的如果计算机相信它们是相同的项，即它们经简化（正规化）得到的符号的字符串是完全相同的。

如果两个项是外延相等的则它们内涵相等，此时它们内涵相等的证明就是 `rfl`。但是，拥有 `p : Id x y` 的证明并不足以使计算机将 `x` 识别为与 `y` 相同的项。
:::

### 对称性

要使 `Id` 成为相等的一个好的定义它必须至少是一个等价关系。它是自反的因为其定义中含有 `rfl`。我们现在说明它是对称的。

假定我们有一个空间 `A`，点 `x y : A` 以及相等性的证明/配方/路径 `p : Id x y`。可以考虑将 `Id x y` 视作构造来考虑如何推进。

```agda
idSym : (A : Type) (x y : A) → Id x y → Id y x
idSym A x .x rfl = rfl
```
这里我们使用了[dot patterns](https://agda.readthedocs.io/en/latest/language/function-definitions.html#dot-patterns)，解释如下
- 如果 `x` 和 `y` 根据证明 `p` 是相等的而我们想要说明关于 `x` `y` 和 `p` 的某些性质，那么只要考虑它们是外延相等的情形即可；即 `y` 在字面意义上就是项 `x` 且 `p` 是 `rfl`。
- 我们所拥有的关于构造 `Id x y` 的唯一配方是 `rfl`，所以我们应该尝试归约到这种情形。
- 要构造从 `Id` 发出的映射，将其视作总空间，只需考虑对角映射。
![](https://thehottgameguide.readthedocs.io/en/latest/_images/idRec.png)

::: info 几何视角
我们还没有从几何视角论证此证明。这是因为直觉上要构造从路径空间发出的映射只需考虑常路径这件事并非那么明显。我们后面将单独讨论这一几何属性。
:::

这里我们可以使用隐式参数，所以从现在起我们将使用下面的这个版本：

```agda
Sym : Id x y → Id y x
Sym rfl = rfl
```

### 传递性

现在尝试形式化（然后证明）同一声明的如下解释
- `Id` 是传递的，即如果 `Id x y` 和 `Id y z` 同时成立，那么 `Id x z` 也成立。
- `Id x y` 和 `Id y z` 的配方可以用来构成 `Id x z` 的配方。
- 路径可以被连接起来。

```agda
idTrans : (A : Type) (x y z : A) → Id x y → Id y z → Id x z
idTrans A x y z rfl rfl = rfl
```
你可能想隐式化某些参数。我们也可以引进一个表示连接的记号：

```agda
_*_ : Id x y → Id y z → Id x z
rfl * rfl = rfl
```
后面我们就使用 `_*_`。

### 广群运算律

恒等类型还满足某些进一步的性质，你可以形式化并证明它们。你可能注意到它们看起来几乎就像是群的公理，除了稍微大一点——例如并非仅有一个恒等元（`refl` 在该空间的每个点上都成立）。

- 在左边或右边连接 `rfl` 等于什么都没做
```agda
rfl* : (p : Id x y) → Id (rfl * p) p
rfl* rfl = rfl

*rfl : (p : Id x y) → Id (p * rfl) p
*rfl rfl = rfl
```

- 在一个路径 `p` 的左边或右边连接 `Sym p` 可以得到 `rfl`
```agda
sym* : (p : Id x y) → Id (Sym p * p) rfl
sym* rfl = rfl

*sym : (p : Id x y) → Id (p * Sym p) rfl
*sym rfl = rfl
```
- 连接操作满足结合律
```agda
Assoc : (p : Id x y) → (q : Id y z) → (r : Id z w)
      → Id ((p * q) * r) (p * (q * r))

Assoc rfl rfl rfl = rfl
```

这些公理说明任何类型都是一个广群，其结构如上。这和类型的几何观点符合得很好：在经典同伦论中任何空间都有一个广群结构且任何广群都可被嵌入一个空间中。

### 递归器 —— `Id`的映出属性

我们想要抽出我们映出恒等类型的方法：
::: info Id的映出属性
假定一个空间 `A` 和一个点 `x : A`。给定“从 `x` 出发的路径的空间”上的丛 `M : (y : A) (p : Id x y) → Type`，为了做出映射 `{y : A} (p : Id x y) → M y p`，我们只需给出一个 `M x refl` 中的点。传统上这称为 `Id` 的“递归器”。（我们还没有几何地证明它。）
:::

例如，要证明 `*Sym : {A : Type} {x y : A} (p : Id x y) → Id (p * Sym p) rfl`，我们会选择我们的丛 `M` 为 `λ y p → Id (p * Sym p) rfl`，将每一个 `y : A` 和 `p : Id x y` 带入从 `(p * Sym p)` 到 `Id x x` 中 `rfl` 的路径空间。我们前面证明这个声明时，`agda` 算出了 `M` 应该是什么于是只要求我们提供 `M x rfl` 情形下的证明。

现在形式化这个映出属性，我们称之为 `outOfId`。

```agda
outOfId : (M : (y : A) → Id x y → Type) → M x rfl
        → {y : A} (p : Id x y) → M y p

outOfId M m rfl = m
```
注意我们已经在 `M` 的类型中用了符号 `y`，但它实际上只是一个局部变量且不会出现在括号外。我们让最后一个 `y` 是隐式参数，因为 `p` 包含了 `y` 的数据。

这个证明当然只需要考虑路径 `p` 的各种情形，就像我们正尝试抽出的想法一样。

## 路径空间

如果你刚从[圆的基本群]()那里过来，你可能会奇怪为什么我们还没有提到路径空间 `x ≡ y`。原因是虽然 `≡` 和 `Id` 意在表达同样的想法，`Id` 的实现要来得简单——我们已经写下它了；而 `≡` 是“外延”的，且仅存在于 `cubical agda` 中。在这个部分我们将说明这两者作为空间是“相同”的，即同构，在这之后我们将只使用 `≡` 作为相等和路径的记号（就像[cubical library]()的风格那样）。

我们断言路径空间满足如下三条公理（我们稍后会再加入一个（泛等公理））：
- 如果 `x` 是某空间中的一个点那么 `refl` 是 `x ≡ x` 的一个证明。
- 映出属性，称为 `J`：

      J : (M : (y : A) → x ≡ y → Type) → M x refl
        → {y : A} (p : x ≡ y) → M y p

  这看上去与 `outOfId` 完全一样。
- 映出属性作用于 `refl`：

      JRefl : (M : (y : A) → x ≡ y → Type) (h : M x refl)
        → J M h refl ≡ h

  这是说如果我们把 `refl` 喂给 `J M h` 它确实能给我们想要的——与 `h` 相等的某个东西。不幸的是，虽然（给定正确的 `M` 和 `h`）`outOfId M h rfl` 将与 `h` *外延*相等，但 `J M h refl` 却不能*外延*相等于 `h`，但这是 `cubical agda` 的问题而不是HoTT的。

### 路径 v.s. `Id`

::: info 目标
给定两个点 `x y : A`，路径类型 `x ≡ y` 同构于 `Id x y`。我们将在[基本群的第0关]()介绍同构。
:::

所以我们要尝试说明

    Path≅Id : (x ≡ y) ≅ (Id x y)
    Path≅Id = {!!}

这涉及到很多小的步骤，我们来分开说明。

要做一个同构，我们需要正反两个方向的映射。

正向的映射我们需要使用 `J` ——路径空间的映出属性。反向映射我们可以使用 `outOfId` 或者就直接对路径分情况讨论。

```agda
Path→Id : x ≡ y → Id x y
Path→Id {A} {x} = J (λ y p → Id x y) rfl

Id→Path : Id x y → x ≡ y
Id→Path rfl = refl
```
对于第一个，为了表述我们的动机我们需要隐式参数 `A` 和 `x`。

检查 `rightInv` 的目标我们应该能看到它要求一个 `Path→Id (λ _ → x) ≡ rfl` 中的点，也就是 `Path→Id refl ≡ rfl`。`agda` 知道 `Id→Path rfl` 就是 `refl` （它们外延相等），所以它直接问我们要归约后版本的证明而不是 `Path→Id (Id→Path rfl) ≡ rfl` 中的点。（我们在头脑将 `(λ _ → x)` 归约为 `refl` 但 `agda` 做得正好相反。）

我们将上述结果抽取为引理：

```agda
Path→IdRefl : Path→Id (refl {x = x}) ≡ rfl
Path→IdRefl {x = x} = JRefl (λ y p → Id x y) rfl
```
既然 `Path→Id` 用了 `J`，这里我们唯一能做的就是使用 `JRefl`。

因为 `section Path→Id Id→Path` 需要一个 `p : Id xy` 我们就给它一个 `p` 然后分情况讨论。当然它实际上就是 `rfl`。

而 `retract Path→Id Id→Path` 需要一个 `p : x ≡ y` 我们直接使用 `J`。

```agda
Path≅Id : (x ≡ y) ≅ (Id x y)
Path≅Id = iso Path→Id Id→Path rightInv leftInv where

  rightInv : section (Path→Id {A} {x} {y}) Id→Path
  rightInv rfl = Path→IdRefl

  leftInv : retract (Path→Id {A} {x} {y}) Id→Path
  leftInv = J (λ y p → Id→Path (Path→Id p) ≡ p) (cong' Id→Path Path→IdRefl) where
```
对于 `leftInv`，给出正确的动机我们需要知道 `retract` 说了什么（`Path→Id` 的左逆是 `Path` 上的恒等映射）。填入动机后检查目标，我们应该看到它要求一个 `Id→Path (Path→Id refl) ≡ refl` 中的点。看起来好像我们可以使用我们的引理 `Path→IdRefl : Path→Id refl ≡ rfl` 直接将 `Path→Id refl` 替换为 `rfl` —— 但我们还没有证明关于路径的任何事情！我们现在这么做：如果 `f : A → B` 是一个函数（我们现在的情况下是 `Id→Path`）那么如果它的两个输入是相同的 `x ≡ y` 则它的输出也应如此 `f x ≡ f y`。

我们可以直接使用 `J` 或者通过 `Id` 来证明这一结论。（我们称其为 `cong'` 以免与库中的版本冲突）

```agda
    cong' : {B : Type} (f : A → B) (p : x ≡ y) → f x ≡ f y
    cong' {x = x} f = J (λ y p → f x ≡ f y) refl
```
从这之后我们就直接用库中的 `cong` 了，不过你也可以尝试继续使用你自己的版本。现在使用 `cong` 我们就可以定义 `leftInv`。注意外延地看 `Id→Path rfl` 和 `refl` 相同，我们只需要说明 `Id→Path (Path→Id refl) ≡ Id→Path rfl`。

如果两个空间是同构的那么它们共享相同的属性，在这个意义下得出这两个类型同构的结论是一个接受它们“相同”的一个很好的理由，因为同构理应和其他的构造友好地交互。我们将在[第三部分]()展开这一点。

```agda
id : A → A
id x = x

sym : x ≡ y → y ≡ x
sym {A} {x} = J (λ y _ → y ≡ x ) refl

symRefl : sym {x = x} refl ≡ refl
symRefl {A} {x} = JRefl (λ y _ → y ≡ x) refl

_∙_ : x ≡ y → y ≡ z → x ≡ z
_∙_ {A} {x} {y} {z} = J (λ y _ → y ≡ z → x ≡ z) id

transRefl : _∙_ {A} {x} {x} {z} refl ≡ λ x → x
transRefl {A} {x} {z} = JRefl (λ y _ → y ≡ z → x ≡ z) id

refl∙refl : refl {x = x} ∙ refl ≡ refl
refl∙refl = cong (λ f → f refl) transRefl

refl∙ : (p : x ≡ y) → refl ∙ p ≡ p
refl∙ = J (λ _ p → refl ∙ p ≡ p) refl∙refl

∙refl : (p : x ≡ y) → p ∙ refl ≡ p
∙refl = J (λ _ p → p ∙ refl ≡ p) refl∙refl

sym∙ : (p : x ≡ y) → sym p ∙ p ≡ refl
sym∙ = J (λ _ p → sym p ∙ p ≡ refl) (∙refl (sym refl) ∙ symRefl)

∙sym : (p : x ≡ y) → p ∙ sym p ≡ refl
∙sym = J (λ _ p → p ∙ sym p ≡ refl) (refl∙ (sym refl) ∙ symRefl)

assoc : {A : Type} {w x : A} (p : w ≡ x) {y z : A} (q : x ≡ y) (r : y ≡ z)
      → (p ∙ q) ∙ r ≡ p ∙ (q ∙ r)

assoc {A} = J (λ x p → {y z : A} (q : x ≡ y) (r : y ≡ z) → (p ∙ q) ∙ r ≡ p ∙ (q ∙ r))
              (λ q r → (cong (λ x → x ∙ r) (refl∙ q)) ∙ sym (refl∙ (q ∙ r)))

_≡⟨_⟩_ : (x : A) → x ≡ y → y ≡ z → x ≡ z
_ ≡⟨ x≡y ⟩ y≡z = x≡y ∙ y≡z

_∎ : (x : A) → x ≡ x
_ ∎ = refl

infixr 30 _∙_
infix  3 _∎
infixr 2 _≡⟨_⟩_

pathToFun : A ≡ B → A → B
pathToFun {A} = J (λ y _ → A → y) id

pathToFunRefl : pathToFun {A} refl ≡ id
pathToFunRefl {A} = JRefl (λ y _ → A → y) id

pathToFunReflx : (x : A) → pathToFun {A} refl x ≡ x
pathToFunReflx x = cong (λ f → f x) pathToFunRefl

endPt : (B : A → Type) (p : x ≡ y) → B x → B y
endPt {x = x} B = J (λ y p → B x → B y) id

endPtRefl : (B : A → Type) → endPt {x = x} B refl ≡ id
endPtRefl {x = x} B = JRefl (λ y p → B x → B y) id

endPt' : (B : A → Type) (p : x ≡ y) → B x → B y
endPt' B p = pathToFun (cong B p)

funExt : {B : A → Type} {f g : (a : A) → B a}
       → ((a : A) → f a ≡ g a) → f ≡ g

funExt h = λ i a → h a i

funExtIso : {B : A → Type} {f g : (a : A) → B a}
          → ((a : A) → f a ≡ g a) ≅ (f ≡ g)

funExtIso = iso funExt (λ p a → cong (λ f → f a) p) rightInv leftInv where

  rightInv : section funExt (λ p a i → p i a)
  rightInv h = refl

  leftInv : retract funExt (λ p a i → p i a)
  leftInv h = refl

open import Agda.Builtin.Sigma

_×_ : (A B : Type) → Type
A × B = Σ A (λ _ → B)

Path× : (x y : A × B) → (x ≡ y) ≅ ((x .fst ≡ y .fst) × (x .snd ≡ y .snd))
Path× (a0 , b0) (a1 , b1) = {!!}

```
