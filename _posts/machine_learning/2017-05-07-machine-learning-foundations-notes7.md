---
layout:     post
title:      "【机器学习】机器学习基石学习笔记7：VC维"
date:       2017-05-07 12:07:00
categories: MachineLearning
tags:  machine-learning notes Machine-Learning-Foundations vc-dimension
author: Tandy
---

* content
{:toc}

这篇博客主要是学习国立台湾大学林轩田的机器学习课程过程中的一些笔记






## 课程大纲

- VC维的定义
- 感知器的VC维
- VC维的直觉
- 解释VC维

## VC维的定义

### 回顾

- 首先回顾上一章的内容：一般化 = 泛化 = 举一反三（举：训练，反：测试）
- Ein接近Eout的条件：成长函数有一线曙光，并且N足够大

![][1]

- 我们的成长函数有突破点——>存在上限函数——>上限函数是一个多项式，最高次方是k-1次

![][2]

- 观察例子发现，上限函数直接用N的k-1次方就行

![][3]

- 结合上一章的VC上限，我们可以得到学习的条件：
	- 假设空间的成长函数需要一个突破点k（好的假设空间H）
	- 输入数据样本N足够的大（好的输入样本集D）
	- 需要有个好的演算法A能够找到一个Ein足够小的g（好的算法A）

![][4]
![][5]

### VC维

- 定义：最大的非突破点

![][6]

- 举例说明，好的VC维是有限的，是能够保证寻找到的近似假设g满足Ein接近Eout

![][7]

- 由VC维保证机器可以学习的流程图，即使在最坏的情况也可以确保

![][8]

## 感知器的VC维

- 这一节讨论的是PLA能否处理维数大于二维的数据，先举几个例子：

![][9]

- 接下来证明d维感知器的VC维：Dvc = d + 1，可以将它分为两块证明
	- 证明 Dvc >= d+1：证明存在d+1数量的某一数据集可以完全二分
	- 证明 Dvc <= d+1：证明任何d+2数量的数据集都不可以完全二分


![][10]

![][11]

## VC维的直觉

- VC维的直觉：假设空间H的自由度，也就是说Dvc本质上大体上是H的分类能力

![][12]

- 举例子更加形象说明VC维的直觉：有多少个可以调的旋钮

![][13]

- 类比之前的M，同样需要在Ein小和坏事情发生的概率小之间的权衡

![][14]


## 解释VC维

- 通过一个图表来观察VC维到底给出了哪些重要信息？显然，VC维可以表示模型复杂度
	- 1 Dvc越高 -> Ein下降（shatter能力变强）-> model complexity的penalty提高，导致Eout先降后升
	- 2 Dvc越低 -> Ein升高 -> model complexity的penalty降低，Eout最终也是会上升
- 所以最好情况的Eout是我们选取Dvc在中间的情况，这样Ein和penalty都不高，即最终的Eout也不会太高。

![][15]

- VC维除了表示模型复杂度之外还可以表示样本的复杂度（sample complexity）

![][16]

- 解释VC维为什么宽松？然而了解VC限制的重点其实也并不是它的约束宽松与否，而是它给予我们的哲学启示

![][17]

## 总结

- 本章主要描述了VC维并给出了较为直观的解释，我们不能盲目增加VC维也不能太低，而应该去中间值，这样既保证Ein不高也保证model complexity的penalty不高。

![][18]


[1]: {{ site.baseurl }}/images/201706/107.png
[2]: {{ site.baseurl }}/images/201706/108.png
[3]: {{ site.baseurl }}/images/201706/109.png
[4]: {{ site.baseurl }}/images/201706/110.png
[5]: {{ site.baseurl }}/images/201706/111.png
[6]: {{ site.baseurl }}/images/201706/112.png
[7]: {{ site.baseurl }}/images/201706/113.png
[8]: {{ site.baseurl }}/images/201706/114.png
[9]: {{ site.baseurl }}/images/201706/115.png
[10]: {{ site.baseurl }}/images/201706/116.png
[11]: {{ site.baseurl }}/images/201706/117.png
[12]: {{ site.baseurl }}/images/201706/118.png
[13]: {{ site.baseurl }}/images/201706/119.png
[14]: {{ site.baseurl }}/images/201706/120.png
[15]: {{ site.baseurl }}/images/201706/121.png
[16]: {{ site.baseurl }}/images/201706/122.png
[17]: {{ site.baseurl }}/images/201706/123.png
[18]: {{ site.baseurl }}/images/201706/124.png

## 参考资料

- [Machine Learning Foundations](http://www.csie.ntu.edu.tw/~htlin/mooc/)

- [The VC Dimension](http://www.cnblogs.com/HappyAngel/p/3633989.html)

- [在何时可以使用机器学习(7)](http://www.cnblogs.com/ymingjingr/p/4300092.html)


