@[TOC]()

# Quest 5 -

<!--
```agda
module Trinitarianism.Quest5 where

open import Cubical.Foundations.Prelude
  hiding (funExt; sym; _∎; _∙_; fst; snd) public
open import Cubical.HITs.S1 using (S¹; base; loop) public
open import Cubical.Foundations.Isomorphism renaming (Iso to _≅_) public
open import Cubical.Foundations.Path public
open import Cubical.Data.Bool hiding (elim) public
--open import Trinitarianism.Quest4 public
open import FundamentalGroup.Quest0 public
```
-->

```agda

PathD : {A0 A1 : Type} (A : A0 ≡ A1) (x : A0) (y : A1) → Type
PathD A x y = pathToFun A x ≡ y

syntax PathD A x y = x ≡ y along A

outOfS¹P : (B : S¹ → Type) → (b : B base) → PathP (λ i → B (loop i)) b b
         → (x : S¹) → B x

outOfS¹P B b p base = b
outOfS¹P B b p (loop i) = p i

outOfS¹D : (B : S¹ → Type) → (b : B base) → b ≡ b along (λ i → B (loop i))
         → (x : S¹) → B x

outOfS¹D B b p x = outOfS¹P B b (_≅_.inv (PathPIsoPath (λ i → B (loop i)) b b) p) x

example : (x : S¹) → doubleCover x → doubleCover x
example base = Flip
example (loop i) = p i where

  lem : (x : Bool) → pathToFun (λ i → flipPath i → flipPath i) Flip x ≡ Flip x
  lem false = refl
  lem true = refl

  p : PathP (λ i → flipPath i → flipPath i) Flip Flip
  p = _≅_.inv (PathPIsoPath (λ i → flipPath i → flipPath i) Flip Flip) (funExt lem)

example' : (x : S¹) → doubleCover x → doubleCover x
example' = outOfS¹D (λ x → doubleCover x → doubleCover x) Flip (funExt lem) where

  lem : (x : Bool) → pathToFun (λ i → flipPath i → flipPath i) Flip x ≡ Flip x
  lem false = refl
  lem true = refl

outOfS¹DBase : (B : S¹ → Type) → (b : B base) → (p : b ≡ b along (λ i → B (loop i)))
             → outOfS¹D B b p base ≡ b

outOfS¹DBase B b p = refl

pathToFun→ : {A0 A1 B0 B1 : Type} {A : A0 ≡ A1} {B : B0 ≡ B1} (f : A0 → B0)
           → pathToFun (λ i → A i → B i) f ≡ λ a1 → pathToFun B (f (pathToFun (sym A) a1))

pathToFun→ {A0} {A1} {B0} {B1} {A} {B} f = {!!}

```
