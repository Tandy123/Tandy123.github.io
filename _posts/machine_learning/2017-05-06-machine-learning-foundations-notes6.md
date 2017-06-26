---
layout:     post
title:      "【机器学习】机器学习基石学习笔记6：举一反三"
date:       2017-05-06 12:05:00
categories: MachineLearning
tags:  machine-learning notes Machine-Learning-Foundations
author: Tandy
---

* content
{:toc}

这篇博客主要是学习国立台湾大学林轩田的机器学习课程过程中的一些笔记






## 课程大纲

- 突破点的限制
- 上限函数的基本情形
- 上限函数的归纳情形
- 一种形象化的证明

## 突破点的限制

- 首先回顾突破点（即不能满足完全分类情形的样本点个数）和成长函数

![][1]

- 通过举例说明可以得到一个函数B，给定N和k可以确定该系列假设能够得到的最大的mh(N)，那么新的目标便是证明B(N,k) <= Poly(N)。这便是本章的主要目标。

![][2]

## 上限函数的基本情形

- 上限函数定义为在最小突破点为k时，表示成长函数最大值的函数。它的性质可以不用关心到底使用的是何种假设空间，只需要知道突破点便可以得到一个上限函数来对成长函数做约束。

![][3]

- 列表枚举各种上限函数，稍微解释一下：
	- 当突破点是1是，表示1个点都不能shatter，所以最多只能一个
	- 当突破点的个数大于N时，此时突破点有没有都没有区别，最多可以产生2^N种
	- 当N=k时，最多产生2^N-1

![][4]

## 上限函数的归纳情形

### 证明过程

- 这里的证明过程比较巧妙，要证明的结论是B(N,k)<=B(N-1,k)+B(N-1,k-1)
- 首先，以B(4,3)为例，可以列出所有的情况如下：

![][5]

- 作者在这里对所有的情况进行了一个分类，分为橙色和紫色的部分，其中橙色的都是前三个两两一样，第四个不同，紫色则是剩下的情况

![][6]

- 橙色部分和紫色部分的前三个单独提出来，种类分别用alpha和beta表示，这样总数=2*alpha+beta，有前面的设定可以得到，任意三个点不能shatter，所有alpha+beta<=B(3,3)

![][7]

- 单独看橙色的部分，由于第四个点已经shatter了，这样前三个点还必须保证两两不shatter，即alpha<=B(3.2)

![][8]

- 由此得出B(4,3)和B(3,x)的关系

![][9]

- 综上，我们得到了最终的结论

![][10]

- 进一步推导（数学归纳法），可以得到，详细证明见这篇[博客](http://www.cnblogs.com/ymingjingr/p/4290983.html)

![][11]

## 一种形象化的证明

- 这一节的内容确实比较难，我想之后看完了大部分的课程在过来回顾一下吧，现在直接上结论

- 下面是一个在机器学习领域很著名的理论——V-C上界制（Vapnik-Chervonenkis bound）

![][12]


## 总结

- 本章的结论很明显，即时假设看起来是无穷的，只要存在breaking point，那么growth function便是多项式级别，假设的数量是限定的，我们只要保证Ein足够小，那么N大以及breaking point存在可以保证该假设具有较好的泛化性。

![][13]


[1]: {{ site.baseurl }}/images/201706/95.png
[2]: {{ site.baseurl }}/images/201706/96.png
[3]: {{ site.baseurl }}/images/201706/97.png
[4]: {{ site.baseurl }}/images/201706/98.png
[5]: {{ site.baseurl }}/images/201706/99.png
[6]: {{ site.baseurl }}/images/201706/100.png
[7]: {{ site.baseurl }}/images/201706/101.png
[8]: {{ site.baseurl }}/images/201706/102.png
[9]: {{ site.baseurl }}/images/201706/103.png
[10]: {{ site.baseurl }}/images/201706/104.png
[11]: {{ site.baseurl }}/images/201706/105.png
[12]: {{ site.baseurl }}/images/201706/106.png
[13]: {{ site.baseurl }}/images/201706/107.png

## 参考资料

- [Machine Learning Foundations](http://www.csie.ntu.edu.tw/~htlin/mooc/)

- [Theory of Generalization](http://www.cnblogs.com/HappyAngel/p/3622333.html)

- [在何时可以使用机器学习(6)](http://www.cnblogs.com/ymingjingr/p/4290983.html)


