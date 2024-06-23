@[TOC](同伦类型论)

# 同伦类型论：数学的泛等基础

泛等基础纲领

高等研究院

本书可从 https://homotopytypetheory.org/book/ 处自由获取。

## 声明

除高等研究院的慷慨支持外，本书的一些作者部分或全部地受到以下机构的支持和资助：

- 高等研究院成员协会：资助给高等研究院
- 斯洛文尼亚共和国研究活动局：P1–0294, N1–0011
- （美国）空军科学研究办公室：FA9550-11-1-0143, 以及 FA9550-12-1-0370

    本资料部分基于空军科学研究办公室于上述奖项下支持的工作。本出版物中表达的任何意见，发现及结论或建议均出自作者，并不一定反映空军科学研究办公室的观点。
- （英国）工程与物理科学研究委员会：EP/G034109/1, EP/G03298X/1
- 欧盟第七框架计划，资助协议第243847号(数学)
- （美国）国家科学基金会：DMS-1001191, DMS-1100938, CCF-1116703, 以及 DMS-1128155

    本资料部分基于国家科学基金会于上述奖项下支持的工作。本资料中表达的任何意见，发现及结论或建议均出自作者，并不一定反映国家科学基金会的观点。
- 西蒙尼基金：资助给高等研究院

# 序

## 高等研究院泛等基础特别年

2012-13高等研究院数学系举办了数学的泛等基础特别年，活动由Steve Awodey, Thierry Coquand以及Vladimir Voevodsky组织。以下为正式参与者。

<pre>
 Peter Aczel            Eric Finster        Alvaro Pelayo
 Benedikt Ahrens        Daniel Grayson      Andrew Polonsky
 Thorsten Altenkirch    HugoHerbelin        Michael Shulman
 Steve Awodey           André Joyal         Matthieu Sozeau
 Bruno Barras           Dan Licata          Bas Spitters
 Andrej Bauer           Peter Lumsdaine     Benno van den Berg
 Yves Bertot            Assia Mahboubi      Vladimir Voevodsky
 Marc Bezem             Per Martin-Löf      Michael Warren
 Thierry Coquand        Sergey Melikhov     Noam Zeilberger
</pre>

还有如下学生，他们的参与同样有价值

<pre>
 Carlo Angiuli          Guillaume Brunerie  Egbert Rijke
 Anthony Bordg          Chris Kapulkin      Kristina Sojakova
</pre>

此外，如下短期或长期的访问学者，包括访问学生，他们对本特别年的贡献也是至关重要的。

<pre>
 Jeremy Avigad          Richard Garner      Nuo Li
 Cyril Cohen            Georges Gonthier    Zhaohui Luo
 Robert Constable       Thomas Hales        Michael Nahas
 Pierre-Louis Curien    Robert Harper       Erik Palmgren
 Peter Dybjer           Martin Hofmann      Emily Riehl
 Martín Escardó         Pieter Hofstra      Dana Scott
 Kuen-Bang Hou          Joachim Kock        Philip Scott
 Nicola Gambino         Nicolai Kraus       Sergei Soloviev
</pre>

## 关于本书

我们本没打算写书。当前的工作源于我们发展一种新风格的“非正式类型论”的集体尝试，作为可被机器检查的正式证明的补充，它可被人类阅读和理解。泛等基础与一种可被计算机证明助手实现的数学基础的想法紧密相关。虽然这种形式化不是本书的一部分，但这里所展现的大多数资料实际上都首先是在证明助手内完全形式化之后，再经过“非形式化”才得以呈现在您面前的——这与正式数学中通行的做法截然相反。

上述诸位都对本特别年——因此也对这本书——有所贡献，无论是想法、词句或者是行动上的。这种风行整年的合作精神真的是超乎寻常。

特别要感谢高等研究院，没有其支持本书显然无法问世。互相激励、欣赏以及合作已被证明对这个新的数学分支的创立是一种理想的环境。愿这种独特氛围能在本书以及在这个新的研究领域的未来发展中留下些许痕迹。

<p align="right">
泛等基础纲领<br/>
高等研究院<br/>
普林斯顿，2013年4月
</p>
