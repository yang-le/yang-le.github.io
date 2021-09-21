```{=org}
#+PROPERTY: header-args :exports both
```
# 简介

## 新的工具

### 从0累加到n的lisp实现

``` {.commonlisp org-language="lisp"}
(defun sum (n)
  (let ((s 0))
    (dotimes (i n s)
      (incf s i))))
```

``` {.commonlisp org-language="lisp"}
(sum 5)
```

### 从0累加到n的c实现

``` {.c org-language="C"}
int sum(int n) {
    int i, s = 0;
    for (i = 0; i < n; ++i)
        s += i;
    return (s);
}
```

``` {.c org-language="C"}
printf("%d", sum(5));
```

### 一个lisp闭包的例子

``` {.commonlisp org-language="lisp"}
(defun addn (n)
  #'(lambda (x)
      (+ x n)))
```

``` {.commonlisp org-language="lisp"}
(funcall (addn 3) 2)
```

## 新的技术

## 新的方法

# 欢迎来到Lisp

## 形式

### 最简单的lisp表达式

``` {.commonlisp org-language="lisp"}
1
```

### 加法函数

``` {.commonlisp org-language="lisp"}
(+)
```

``` {.commonlisp org-language="lisp"}
(+ 2)
```

``` {.commonlisp org-language="lisp"}
(+ 2 3)
```

``` {.commonlisp org-language="lisp"}
(+ 2 3 4)
```

### 略复杂的表达式

``` {.commonlisp org-language="lisp"}
(/ (- 7 1) (- 4 2))
```

## 求值

### 引用

``` {.commonlisp org-language="lisp"}
(quote (+ 3 5))
```

``` {.commonlisp org-language="lisp"}
'(+ 3 5)
```

## 数据

### 符号

``` {.commonlisp org-language="lisp"}
'Artichoke
```

### 列表

1.  一个例子

    ``` {.commonlisp org-language="lisp"}
    '(my 3 "Sons")
    ```

2.  引用保护了整个表达式（包括内部的子表达式）被求值

    ``` {.commonlisp org-language="lisp"}
    '(the list (a b c) has 3 elements)
    ```

3.  可以调用list创建列表

    ``` {.commonlisp org-language="lisp"}
    (list 'my (+ 2 1) "Sons")
    ```

4.  被引用的列表被视为数据，未被引用的列表被视为函数调用

    ``` {.commonlisp org-language="lisp"}
    (list '(+ 2 1) (+ 2 1))
    ```

5.  表示空表的两种方法

    ``` {.commonlisp org-language="lisp"}
    ()
    ```

    ``` {.commonlisp org-language="lisp"}
    nil
    ```

## 列表操作

### cons

1.  例子

    ``` {.commonlisp org-language="lisp"}
    (cons 'a '(b c d))
    ```

2.  list可以用cons实现

    ``` {.commonlisp org-language="lisp"}
    (cons 'a (cons 'b nil))
    ```

    ``` {.commonlisp org-language="lisp"}
    (list 'a 'b)
    ```

### car和cdr

1.  例子

    ``` {.commonlisp org-language="lisp"}
    (car '(a b c))
    ```

    ``` {.commonlisp org-language="lisp"}
    (cdr '(a b c))
    ```

2.  混合使用

    ``` {.commonlisp org-language="lisp"}
    (car (cdr (cdr '(a b c d))))
    ```

3.  简写

    ``` {.commonlisp org-language="lisp"}
    (third '(a b c d))
    ```

    ``` {.commonlisp org-language="lisp"}
    (caddr '(a b c d))
    ```

## 真与假

### listp

``` {.commonlisp org-language="lisp"}
(listp '(a b c))
```

``` {.commonlisp org-language="lisp"}
(listp 27)
```

### null 和 not

null用来判断一个列表是否为空

``` {.commonlisp org-language="lisp"}
(null nil)
```

not用来判断一个逻辑条件是否为假

``` {.commonlisp org-language="lisp"}
(not nil)
```

### if

``` {.commonlisp org-language="lisp"}
(if t 'exp1 'exp2)
```

``` {.commonlisp org-language="lisp"}
(if nil 'exp1 'exp2)
```

如果忽略if的最后一个参数,默认值为nil.

``` {.commonlisp org-language="lisp"}
(if nil 'exp)
```

另外,任何不是nil的东西,都会被if视为t.

``` {.commonlisp org-language="lisp"}
(if 0 'exp)
```

### and 和 or

and和or都是短路操作符

``` {.commonlisp org-language="lisp"}
(and nil (+ 1 2))
```

``` {.commonlisp org-language="lisp"}
(and t (+ 1 2))
```

``` {.commonlisp org-language="lisp"}
(or t (+ 1 2))
```

## 函数

### defun

``` {.commonlisp org-language="lisp"}
(defun our-third (x)
  (car (cdr (cdr x))))
```

``` {.commonlisp org-language="lisp"}
(our-third '(a b c d))
```

## 递归

``` {.commonlisp org-language="lisp"}
(defun our-member (obj lst)
  (if (null lst)
      nil
      (if (eql (car lst) obj)
          lst
          (our-member obj (cdr lst)))))
```

``` {.commonlisp org-language="lisp"}
(our-member 'b '(a b c))
```

``` {.commonlisp org-language="lisp"}
(our-member 'z '(a b c))
```

## 阅读Lisp

## 输入输出

### format

``` {.commonlisp org-language="lisp" results="output"}
(format t "~A plus ~A equals ~A. ~%" 2 3 (+ 2 3))
```

### read

``` {.commonlisp org-language="lisp"}
(defun askem (string)
  (format t "~A" string)
  (read))
```

``` {.commonlisp org-language="lisp"}
(askem "How old are you?")
```

## 变量

### 局部变量

``` {.commonlisp org-language="lisp"}
(let ((x 1) (y 2))
  (+ x y))
```

### 全局变量

``` {.commonlisp org-language="lisp"}
(defparameter *glob* 99)
```

### 全局常量

``` {.commonlisp org-language="lisp"}
(defconstant limit (+ *glob* 1))
```

### 全局量的检查

``` {.commonlisp org-language="lisp"}
(boundp '*glob*)
```

## 赋值

### 例子 {#例子-2}

``` {.commonlisp org-language="lisp"}
(setf *glob* 98)
```

``` {.commonlisp org-language="lisp"}
(let ((n 10))
  (setf n 2)
  n)
```

### 使用setf创建全局变量

``` {.commonlisp org-language="lisp"}
(setf x (list 'a 'b 'c))
```

### 设定任意位置上的内容

``` {.commonlisp org-language="lisp"}
(setf (car x) 'n)
x
```

### 多个参数调用setf

``` {.commonlisp org-language="lisp"}
(setf a 'b c 'd e 'f)
(list a c e)
```

## 函数式编程

函数式编程本质上意味着避免使用如setf一类的函数

## 迭代

### do

``` {.commonlisp org-language="lisp"}
(defun show-squares (start end)
  (do ((i start (+ i 1)))
      ((> i end) 'done)
    (format t "~A ~A~%" i (* i i))))
```

``` {.commonlisp org-language="lisp" results="output"}
(show-squares 2 5)
```

### dolist

``` {.commonlisp org-language="lisp"}
(defun our-length (lst)
  (let ((len 0))
    (dolist (obj lst)
      (setf len (+ len 1)))
    len))
```

``` {.commonlisp org-language="lisp"}
(our-length '(a b c))
```

## 函数作为对象

### sharp quote

\'是quote的缩写,而#\'是function的缩写

### apply和funcall

``` {.commonlisp org-language="lisp"}
(apply #'+ '(1 2 3))
```

``` {.commonlisp org-language="lisp"}
(funcall #'+ 1 2 3)
```

### lambda符号

``` {.commonlisp org-language="lisp"}
((lambda (x) (+ x 100)) 1)
```

``` {.commonlisp org-language="lisp"}
(funcall #'(lambda (x) (+ x 100)) 1)
```

## 类型

### typep

``` {.commonlisp org-language="lisp"}
(typep 27 'integer)
```

## 展望

## 习题

### 描述下列表达式求值之结果

``` {.commonlisp org-language="lisp"}
(+ (- 5 1) (+ 3 7))
```

``` {.commonlisp org-language="lisp"}
(list 1 (+ 2 3))
```

``` {.commonlisp org-language="lisp"}
(if (listp 1) (+ 1 2) (+ 3 4))
```

``` {.commonlisp org-language="lisp"}
(list (and (listp 3) t) (+ 1 2))
```

### 给出三种不同表示(a b c)的cons表达式

``` {.commonlisp org-language="lisp"}
(cons 'a '(b c))
(cons 'a (cons 'b '(c)))
(cons 'a (cons 'b (cons 'c '())))
```

### 使用car和cdr定义一个函数,返回一个列表的第四个元素

``` {.commonlisp org-language="lisp"}
(defun my-forth (lst)
  (car (cdr (cdr (cdr lst)))))
```

``` {.commonlisp org-language="lisp"}
(my-forth '(1 2 3 4 5))
```

### 定义一个函数,接受两个实参,返回两者当中较大的那个

``` {.commonlisp org-language="lisp"}
(defun my-max (a b)
  (if (> a b) a b))
```

``` {.commonlisp org-language="lisp"}
(my-max -1 3)
```

### 这些函数做了什么

``` {.commonlisp org-language="lisp"}
(defun enigma (x)
  (and (not (null x))
       (or (null (car x))
           (enigma (cdr x)))))
```

该函数判断一个表中是否有为nil的元素,例如

``` {.commonlisp org-language="lisp"}
(enigma '(2 () 3))
```

``` {.commonlisp org-language="lisp"}
(defun mystery (x y)
  (if (null y)
      nil
      (if (eql (car y) x)
          0
          (let ((z (mystery x (cdr y))))
            (and z (+ z 1))))))
```

该函数返回表y中第一次出现x的位置,例如

``` {.commonlisp org-language="lisp"}
(mystery '1 '(2 3 1 4))
```

### 下列表达式,x该是什么,才会得到相同结果

``` {.commonlisp org-language="lisp"}
(car (x (cdr '(a (b c) d))))
```

``` {.commonlisp org-language="lisp"}
(x 13 (/ 1 0))
```

``` {.commonlisp org-language="lisp"}
(x #'list 1 nil)
```

### 定义一个函数,接受一个列表作为参数,如果列表中有一个元素是列表,就返回真
