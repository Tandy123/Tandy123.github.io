---
layout: post
title:  "负数取模怎么算"
categories: Math
tags:  math module
author: Tandy
---

* content
{:toc}

做题的时候遇到负数取模的情况总是会搞不清楚，这里总结一下，下次不要再忘记了。




## 整数除法取整

考虑这样一个计算题：18 除以 5，要得到一个整数结果，究竟应该是 3 还是 4？这就是一个问题了。计算机上有几种对于结果取整的方法：

- 向上取整，向+∞方向取最接近精确值的整数，也就是取比实际结果稍大的最小整数，也叫 Ceiling 取整。这种取整方式下，17 / 10 = 2，5 / 2 = 3, -9 / 4 = -2。
- 向下取整，向-∞方向取最接近精确值的整数，也就是取比实际结果稍小的最大整数，也叫 Floor 取整。这种取整方式下，17 / 10 = 1，5 / 2 = 2, -9 / 4 = -3。
- 向零取整，向0方向取最接近精确值的整数，换言之就是舍去小数部分，因此又称截断取整（Truncate）。这种取整方式下，17 / 10 = 1，5 / 2 = 2, -9 / 4 = -2。

## 取模怎么算

- 取模运算实际上是计算两数相除以后的余数。假设 q 是 a、b 相除产生的商(quotient)，r 是相应的余数(remainder)，那么在几乎所有的计算系统中，都满足：
```
a = b x q + r，其中 |r|<|a|。
```
- 因此 r 有两个选择，一个为正，一个为负;相应的，q 也有两个选择。如果a、b 都是正数的话，那么一般的编程语言中，r 为正数；或者如果 a、b 都是负数的话，一般 r 为负数。但是如果 a、b 一正一负的话，不同的语言则会根据除法的不同结果而使得 r 的结果也不同，但是一般 r 的计算方法都会满足：
```
r = a - (a / b) x b
```
- 这样的的写法也可以做到准确倒计时，同时也比较简洁。不需要隔段时间再去同步一次服务端时间。

## 计算机怎么算

- 计算机怎么算，并不是一个好回答的问题，因为不同语言里面，对于整数除法取整的处理方式并不一样。

- C/Java 的处理方式

	- 大多数语言的处理方式都与 C/Java 一致，采用了 truncate 除法。所以在 C/Java 语言中:
		- -17 % 10 的计算结果如下：r = (-17) - (-17 / 10) x 10 = (-17) - (-1 x 10) = -7
		- 17 % -10 的计算结果如下：r = 17 - (17 / -10) x (-10) = (17) - (-1 x -10) = 7
		- -17 % -10 的计算结果如下：r = (-17) - (-17 / -10) x (-10) = (-17) - (1 x -10) = -7


- Python 的处理方式

	- Python 语言除法采用的是 floor 除法，所以对 Python 程序员来讲：
	
		- -17 % 10 的计算结果如下：r = (-17) - (-17 / 10) x 10 = (-17) - (-2 x 10) = 3
		- 17 % -10 的计算结果如下：r = 17 - (17 / -10) x (-10) = (17) - (-2 x -10) = －3
		- -17 % -10 的计算结果如下：r = (-17) - (-17 / -10) x (-10) = (-17) - (1 x -10) = -7

	- 据说，Python 3.x 中「/」运算符的意义发生了变化，「/」产生的结果将不会再进行取整，相应的「//」运算符的结果才会进行取整。

- Common Lisp 的处理方式

	- Common Lisp 的特殊操作符「/」的结果是分数，因此不会存在截尾的问题。但是 Common Lisp 提供了 TRUNCATE 函数和 FLOOR 函数分别对应上述的两种除法。相应的，Common Lisp 的 REM 函数类似于 C/Java 语言中的取模运算；而 MOD 函数类似于 Python 语言中的取模运算。
	- 例如，在 Clojure 这门 Lisp 方言中，(rem -17 10) = -7，(mod -17 10) = 3