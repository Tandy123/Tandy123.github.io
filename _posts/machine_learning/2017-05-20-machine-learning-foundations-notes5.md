---
layout:     post
title:      "【机器学习】机器学习基石学习笔记5：训练和测试"
date:       2017-05-20 12:04:00
categories: MachineLearning
tags:  machine-learning notes Machine-Learning-Foundations
author: Tandy
---

* content
{:toc}

这篇博客主要是学习国立台湾大学林轩田的机器学习课程过程中的一些笔记






## 课程大纲

- 回顾与预备
- 有效的直线数量
- 有效的假说数量
- 突破点（Break point）

## 回顾流程

- 首先回顾一下上一章学过的内容，学习在何种情况下是可行的：训练样本和测试样本满足同分布，假设空间有限，并且训练数据足够大，其学习流程图如图所示。

![][1]

- 在训练样本集（in-sample）中，可以求得一个最佳的假设g，该假设最大可能的接近目标函数f，但是在训练样本集之外的其他样本（out-of-sample）中，假设g和目标函数f可能差别很远。

### 回顾第一章

- 介绍了存在一个未知的目标函数f，机器学习的任务是找出一个假设函数g，使得假设g和目标函数f很接近，用第四章的概念可以解释为在测试时的错误率接近零。

![][2]

### 回顾第二章

- 介绍了在训练时使假设函数g和目标函数f很接近就可以了，用第四章的概念可以解释为训练时的错误率接近零。

![][3]

### 回顾第三章

- 介绍了一种机器学习最基础、最核心的方法：使用批量的数据和监督式的学习来做二元分类。

![][4]

### 回顾第四章

- 介绍了在假设空间不是太多，即假设函数有限的情况下，训练时的错误率和测试时的错误率很接近。

![][5]

### 两个关键问题

- 我们如何确保Ein和Eout很接近
- 我们如何确保Ein很小

- 作者在这里先用一个有限的M来代替无限的M
	- 当M很小时：Ein和Eout接近，但是不一定能选到以好的g，因为选择太少了
	- 当M很大时：Ein和Eout不接近，但是很可能能选到以好的g，因为选择很多

![][6]

- 显然M限大的时候是不好的，接下里解决这个问题，需要寻找一个小于无限大M的替代值，并且这个值还和假设空间有关系，接下来讨论如何在M为无限大时，保证Ein和Eout接近。

![][7]

## 线的有效数量

- 第四章的结尾求出了在有限假设空间中Ein和Eout和接近的概率的上限，当时使用的是联合上限（union bound），实际不等式的上界被放大了太多。假设在假设空间中包含无限多的假设函数，则此上限为无穷大，而真正合理的上界是不应该大于1。
- 造成这一问题的原因是联合上界过于宽松了。两个集合的或集写成两个集合相加的形式时，一定要减去它俩的交集。
- 两个假设函数出现完全相同坏数据的可能性很大，即存在很多重叠，接下来就是想办法找到这些重叠

![][8]

### 回到PLA的例子

- 作者通过列列举2-4个二维点的二元分类的例子，总结出结论：有效的线的数量是有限的

![][9]

- 因此，学习的可能性也是有限的

![][10]

## 假说的有效数量

### 二分类
- 二分类（dichotomy）指的是能够得出不同X分类的假设的个数。例子是对全体直线，假设数据集大小是N，那么其实最多dichotomy就是2^N，而不是前面说的无限个。
- 二分类（dichotomy）和假说H的对比

![][11]

### 成长函数

![][12]

- 接下来介绍几种不同机器学习的成长函数

- 在一维空间中考虑，positive ray

![][13]

- 考虑positive ray itervals

![][14]

- 在凸集合中考虑

![][15]

- 小测验：考虑正反射线，2(n-1)+2 = 2n种

![][16]

## 突破点(Break Point)

- 小结之前的成长函数

![][17]

- 更希望得到一种多项式（polynomial）形式的成长函数，而不是指数（exponential）形式的，

![][18]

- 能否找出一种规律将表中二维感知器的成长函数也写成多项式形式的呢？于是提出了一个新的概念，突破点（break point）。

![][19]

- 列举各种情况下的突破点

![][20]

### 神奇的结论
- 通过上述情况可以得到很明显的一个性质（通过数学归纳法），如果k为break point，那么k+1，k+2，...等之后所有新加入的数据都为break point

![][21]

## 总结

- 可以想象得到，M并不是无限的，而是由Growth Function决定的，如果它是多项式级别的话，可以认为机器是可以学习的。

![][22]


[1]: {{ site.baseurl }}/images/201706/65.png
[2]: {{ site.baseurl }}/images/201706/66.png
[3]: {{ site.baseurl }}/images/201706/67.png
[4]: {{ site.baseurl }}/images/201706/68.png
[5]: {{ site.baseurl }}/images/201706/69.png
[6]: {{ site.baseurl }}/images/201706/70.png
[7]: {{ site.baseurl }}/images/201706/71.png
[8]: {{ site.baseurl }}/images/201706/72.png
[9]: {{ site.baseurl }}/images/201706/73.png
[10]: {{ site.baseurl }}/images/201706/74.png
[11]: {{ site.baseurl }}/images/201706/75.png
[12]: {{ site.baseurl }}/images/201706/76.png
[13]: {{ site.baseurl }}/images/201706/77.png
[14]: {{ site.baseurl }}/images/201706/78.png
[15]: {{ site.baseurl }}/images/201706/79.png
[16]: {{ site.baseurl }}/images/201706/80.png
[17]: {{ site.baseurl }}/images/201706/81.png
[18]: {{ site.baseurl }}/images/201706/82.png
[19]: {{ site.baseurl }}/images/201706/83.png
[20]: {{ site.baseurl }}/images/201706/84.png
[21]: {{ site.baseurl }}/images/201706/85.png
[22]: {{ site.baseurl }}/images/201706/86.png

## 参考资料

- [Machine Learning Foundations](http://www.csie.ntu.edu.tw/~htlin/mooc/)

- [Training versus Testing](http://www.cnblogs.com/HappyAngel/p/3594867.html)

- [在何时可以使用机器学习(5)](http://www.cnblogs.com/ymingjingr/p/4285358.html)


