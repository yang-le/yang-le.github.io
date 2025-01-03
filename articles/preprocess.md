# 基础

## 宏展开的规则

### 规则1

预处理器会用宏的内容替换宏的名字，替换的顺序是从左至右的

``` {.c org-language="C"}
#define SIMPLE_DEFINITION REPLACEMENT
```

### 规则2

宏函数的参数被替换到宏体内时，会被完全地展开;
除非参数被字符串化(使用'#')或者被与其他标识符粘连(使用\"##\")。
替换完成后，整个宏体，包括被替换的参数，会被再次扫描和展开。
结果就是，宏函数的参数需要被扫描两次才会完全展开。

``` {.c org-language="C"}
#define MACRO(params) STUFF_TO_REPLACE_MACRO_WITH
```

让我们来考虑一个简单的例子，看看宏是如何展开的

``` {.c org-language="C"}
#define MULTIPLY(x, y) x * y
MULTIPLY(x, y) // 被展开为 x * y

MULTIPLY(x, MULTIPLY(y, z)) // 被展开为 x * y * z
// 展开的过程是这样的
// (1) 展开参数 -> MULTIPLY(x, y * z)
// (2) 替换宏体 -> x * y * z

MULTIPLY(x + y, z) // 被展开为 x + y * z
MULTIPLY((x + y), z) // 被展开为 (x + y) * z
```

### 规则3

宏函数仅当其后有括号时才会被展开。

事情从这里开始变得有趣起来，例如

``` {.c org-language="C"}
#define EMPTY() // 这个宏什么都不做
#define EVAL(...) __VA_ARGS__ // 这个宏用来做参数的展开
#define HELLO() "Hello World"

HELLO() // 如你所愿，这个宏被展开为"Hello World"

HELLO EMPTY() () // 由于规则3, 这个宏被展开为 HELLO () 而不是 "Hello World"

EVAL ( HELLO EMPTY() () ) // 这个宏被展开为"Hello World"
// 基于规则2
// 首先是参数被展开，如前一个例子所述，参数被展开为 HELLO ()
// 然后是第二遍扫描，这次HELLO ()被展开为"Hello World"
```

如果你明白了，尝试理解下面的例子

``` {.c org-language="C"}
HELLO() // "Hello World"
HELLO EMPTY() () // HELLO ()
HELLO EMPTY EMPTY() () () // HELLO EMPTY () ()

EVAL(HELLO EMPTY () ()) // "Hello World"
EVAL(HELLO EMPTY EMPTY() () ()) // HELLO ()
EVAL(EVAL(HELLO EMPTY EMPTY() () ())) // "Hello World"
```

### 规则4

当宏名出现在该宏的定义中时，该宏名会被原样输出，不会被展开

``` {.c org-language="C"}
#define RECURSE(x) x RECURSE(x)
RECURSE(x) // 被展开为 x RECURSE(x)

EVAL(RECURESE(x)) // 仍然被展开为 x RECURSE(x)

#define MUTA() a MUTB()
#define MUTB() b MUTA()

MUTA() // 被展开为 a b MUTA()
```

## 展开和延迟宏调用

通过展开和延迟宏调用，我们可以做很多技巧性的东西，首先来看一些例子

``` {.c org-language="C"}
#define FOO(x, y) x y
#define BAR() x, y

FOO(BAR()) // 这个宏调用会报错，因为FOO需要两个参数，但我们只传给他一个

DEFER(FOO) (BAR()) // 延迟对FOO的调用，展开的结果为FOO(x, y)

EVAL(DEFER(FOO) (BAR())) // 展开为 x y
```

DEFER的实现实际上很简单，通过在宏名和其参数之间加入EMPTY()，我们就可以阻止其首先被展开。

``` {.c org-language="C"}
#define DEFER(...) __VA_ARGS__ EMPTY()
```

DEFER两次通常也是很有用的，称之为OBSTRUCT

``` {.c org-language="C"}
#define OBSTRUCT(...) __VA_ARGS__ DEFER(EMPTY)()
```

## 递归

根据规则4,似乎我们无法在宏函数中实现递归;但通过一些技巧，我们仍然可以在一定程度上实现它

``` {.c org-language="C"}
#define RECURSE(x) x DEFER(RECURSE_INDIRECT) () (x)
#define RECURSE_INDIRECT() RECURSE

RECURSE(x) //被展开为 x RECURSE_INDIRECT() (x)

EVAL(RECURSE(x)) //被展开为 x x RECURSE_INDIRECT() (x)
// 这相当于将x RECURSE_INDIRECT() (x)再展开一次
// 首先RECURSE_INDIRECT()被展开为RECURSE，然后RECURSE与其后紧随的(x)构成宏函数调用
// 因此又被展开为 x RECURSE_INDIRECT() (x)，加上最前面的x，最终结果为
// x x RECURSE_INDIRECT() (x)

EVAL(EVAL(RECURSE(x))) //被展开为 x x x RECURSE_INDIRECT() (x)
```

要注意的是，INDIRECT宏一定\*不要\*直接调用其替代的那个原始宏。
否则在某一时刻，INDIRECT宏就会出现在其展开式中，而这将阻止该宏被再次展开。例如

``` {.c org-language="C"}
#define RECURSE(x) x DEFER(RECURSE_INDIRECT)(x)
#define RECURSE_INDIRECT(x) RECURSE(x)

RECURSE(x) //被展开为 x RECURSE_INDIRECT(x)

EVAL(RECURSE(x)) //被展开为 x x RECURSE_INDIRECT(x)
EVAL(EVAL(RECURSE(x))) // 抱歉，仍然会被展开为 x x RECURSE_INDIRECT(x)
// 这里的RECURSE_INDIRECT展开式中出现了其自身
// 因此不会被再次展开了
```

# 进阶概念

## 模式匹配初步

### 使用CAT和宏名的模式匹配

一般的形式下，我们令我们的宏调用一个粘连版本的宏;其参数就是我们想要匹配的值。

例如，我们可以按照如下的方法实现AND

``` {.c org-language="C"}
#define CAT(x. y) PRIMITIVE_CAT(x, y)
#define PRIMITIVE_CAT(x, y) x ## y

#define AND(x, y) CAT(AND_, CAT(x, y))
#define AND_00 0
#define AND_10 0
#define AND_01 0
#define AND_11 1

AND(0, 0) // 0
AND(0, 1) // 0
AND(1, 0) // 0
AND(1, 1) // 1
```

### If 条件

If条件是一个用模式匹配来返回函数的例子。
我们用1和0来表示TRUE和FALSE。我们的IF宏只需简单地返回对应的函数即可。

``` {.c org-language="C"}
#define IF(value) CAT(IF_, value)
#define IF_1(true, ...) true
#define IF_0(true, ...) __VA_ARGS__

IF(1) (a, b) // a
IF(0) (a, b) // b

IF(1) (a) // a
IF(0) (a) // return nothing
```

### 模式查找

现在，我们的模式匹配有两个问题。
第一个发生在没有有效的模式可被匹配时，例如

``` {.c org-language="C"}
AND(1, 2) // 展开为AND_12
```

第二个问题是我们需要写出所有可能的输入/输出组合。 我们知道AND(x,
y)等于1当且仅当x和y都等于1。因此其他三组模式是冗余的。

为了解决这些问题，我们需要知道一个给定的模式是否存在。
如果这个模式存在，我们就返回其值;否则，我们就返回一个默认值。

(方法一) 这里的想法是，我们令我们的宏在通常情况下返回默认值。
但是，在匹配到模式的时候，我们需要在宏展开之前更新其返回值。
这样就可以区分这两种情况。举例来说

``` {.c org-language="C"}
#define EAT(...) // 这个宏“吃掉”其所有的参数

// 默认情况下，我们返回0
#define IS_MATCH(val) (CAT(IS_MATCH_, val), 0)

// 除非在MATCH的情况下，我们返回1，并把原来的0吃掉
#define IS_MATCH_MATCH IS_MATCH_MATCH, 1) EAT (

IS_MATCH(MATCH) // 展开为(IS_MATCH_MATCH, 1)
IS_MATCH(OTHER) // 展开为(IS_MATCH_OTHER, 0)

#define SECOND(a, b, ...) b
#define _IS_MATCH(val) EVAL(SECOND IS_MATCH(val))

_IS_MATCH(MATCH) // 返回1
_IS_MATCH(OTHER) // 返回0
```

(方法二) 利用可变参数，使其在不同的情况下展开为不同数量的参数。
其核心逻辑如下

``` {.c org-language="C"}
#define CHECK_N(x, n, ...) n
#define CHECK(...) CHECK_N(__VA_ARGS__, 0,)
#define MATCH ~, 1,

CHECK(MATCH) // 展开为1
CHECK(OTHER) // 展开为0
```

### 使用模式匹配默认值

好了，现在我们能够区分一个模式是否存在匹配了。让我们做完剩下的事情

``` {.c org-language="C"}
#define BIT_AND_11 MATCH
#define BIT_AND(x, y) _IS_MATCH(CAT(AND_, CAT(x, y)))

BIT_AND(0, 0) // 0
BIT_AND(0, 1) // 0
BIT_AND(1, 0) // 0
BIT_AND(1, 1) // 1

#define NOT_0 MATCH
#define NOT(x) _IS_MATCH(CAT(NOT_, x))

NOT(0) // 1
NOT(1) // 0

#define BIT_OR_00 MATCH
#define BIT_OR(x, y) NOT(_IS_MATCH(CAT(OR_, CAT(x, y))))

BIT_OR(0, 0) // 0
BIT_OR(0, 1) // 1
BIT_OR(1, 0) // 1
BIT_OR(1, 1) // 1
```

注意我们再也不需要列举所有的输入/输出值了。不过，
目前我们的逻辑运算仍然有些需要解决的问题，例如

``` {.c org-language="C"}
BIT_AND(2, 1) // 返回0，但我们希望返回1
NOT(-1) // 报错，因为不能把NOT_和-粘连起来;但我们希望返回0
```

因为我们的逻辑运算仅在二进制范围内是有效的。
要解决上面的问题，我们需要把参数先转换到二进制范围内。

即我们需要一个宏，该宏永远返回1，除非宏的参数是0。

``` {.c org-language="C"}
#define BOOL(x) NOT(NOT(x))
BOOL(32) // 1
BOOL(1)  // 1
BOOL(0)  // 0
BOOL(a)  // 1

#define AND(x, y) BIT_AND(BOOL(x), BOOL(y))
#define OR(x, y) BIT_OR(BOOL(x), BOOL(y))
```

在进行运算前，先将参数BOOL一下，然后再进行运算，这就解决了第一个问题。

至于第二个问题...，目前貌似没有很好的办法，我们暂且认为是无效参数错误。

判断一个宏的参数是否在括号中通常是很有用的，利用前面的工具，我们很容易实现这个目的

``` {.c org-language="C"}
#define IS_ENCLOSED_TEST(...) MATCH
#define IS_ENCLOSED(x, ...) _IS_MATCH(IS_ENCLOSED_TEST x)
IS_ENCLOSED(Foo, Bar)   // 0
IS_ENCLOSED((Foo, Bar)) // 1
```

### 一个略复杂一些的CAT

CAT的一个问题是，当你尝试诸如CAT(pattern, (x,
y))的操作时，预处理器会抱怨说不能将pattern和括号粘连在一起。
而利用前面的一些技术，我们可以绕过这一限制。

``` {.c org-language="C"}
#define CAT_1(a, b) a b
#define CAT_0(a, b) a ## b
#define NEW_CAT(a, b) CAT(CAT_, IS_ENCLOSED(b)) (a, b)
```

## 算术和循环

预处理器并不支持算数运算。当我说"不支持"时，我的意思是，如果你这样定义加法

``` {.c org-language="C"}
#define ADD(a, b) a + b
ADD(1, 2) // 返回 1 + 2
```

这不是我们想要的，我们希望ADD(1, 2)最好能返回3。然而这是可能的吗？

现在让我们尝试来实现一些基本的算数，例如加减等等。
在此基础上，我们最终将实现简单的循环操作。

### 计数

至少有两种方法来实现一定范围内的计数操作。

方法一是利用前面定义的逻辑操作实现一个全加器。
通过把十进制数字转换为二进制数字，然后用全加器完成算数运算，然后再转换回十进制表示。

方法二是先定义增1和减1操作，再利用递归实现加法和减法。
我们先来看看这种方式

``` {.c org-language="C"}
#define INC_N2 N1 // -2 增1 为 -1
#define INC_N1 0  // -1 增1 为 0
#define INC_0  1
#define INC_1  2
#define INC_2  N2 // 让我们的计数系统回绕

#define INC(n) CAT(INC_, n)

#define DEC_N2 2  // 让我们的计数系统回绕
#define DEC_N1 N2
#define DEC_0  N1
#define DEC_1  0
#define DEC_2  1

#define DEC(n) CAT(DEC_, n)
```

上面定义的模式很容易用脚本来生成，
这样我们就可以将计算范围扩展到其他特定的区间，例如 -1024 ～ 1024。

关键部分来了，使用递归定义，我们可以这样实现加法：

ADD(a, 0) = a

ADD(a, b) = ADD(a + 1, b -1)

也就是通过减少b，递归地调用ADD，直到b为0，我们就得出了最终的结果。
这提示我们写出如下的宏

``` {.c org-language="C"}
#define ADD(a, b) IF(BOOL(b)) (ADD(INC(a), DEC(b)), a)
```

然而很遗憾，这个方法有些问题。
如前面所说，因为在ADD的定义中又出现了ADD本身，这个宏不会被递归地展开下去。
不过，通过引入一个间接调用，我们可以绕过这个问题

``` {.c org-language="C"}
```
