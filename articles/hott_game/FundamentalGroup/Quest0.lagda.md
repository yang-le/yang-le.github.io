@[TOC]()

# Quest 0 -

<!--
```agda
module FundamentalGroup.Quest0 where

open import Cubical.Data.Empty using (⊥) public
open import Cubical.Data.Unit renaming (Unit to ⊤) public
open import Cubical.Data.Bool hiding (elim) public
open import Cubical.Foundations.Prelude
     renaming (subst to endPt; transport to pathToFun) public
open import Cubical.Foundations.Isomorphism renaming (Iso to _≅_) public
open import Cubical.Foundations.Path public
open import Cubical.HITs.S1 public
```
-->

```agda
Refl : base ≡ base
Refl = λ i → base

Flip : Bool → Bool
Flip false = true
Flip true = false

flipIso : Bool ≅ Bool
flipIso = iso Flip Flip rightInv leftInv where

  rightInv : section Flip Flip
  rightInv false = refl
  rightInv true = refl

  leftInv : retract Flip Flip
  leftInv false = refl
  leftInv true = refl

flipPath : Bool ≡ Bool
flipPath = isoToPath flipIso

doubleCover : S¹ → Type
doubleCover base = Bool
doubleCover (loop i) = flipPath i

endPtOfTrue : base ≡ base → doubleCover base
endPtOfTrue p = endPt doubleCover p true

Refl≢loop : Refl ≡ loop → ⊥
Refl≢loop p = true≢false (cong endPtOfTrue p)
```
