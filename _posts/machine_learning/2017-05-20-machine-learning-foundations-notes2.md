---
layout:     post
title:      "【机器学习】机器学习基石学习笔记2：PLA算法"
date:       2017-05-20 12:01:00
categories: MachineLearning
tags:  machine-learning notes PLA
author: Tandy
---

* content
{:toc}

这篇博客主要是学习国立台湾大学林轩田的机器学习课程过程中的一些笔记






### 关于课程

- 本次课从以下几个方面介绍了如何运用机器学习来做决定（是/否）
	- 感知器假说集合
	- 感知器学习算法（PLA）
	- PLA的证明
	- 不可分的数据

### 感知器

- 下图中的H是假说集合

![][1]

- 感知器（Perceptron）是一种简单的假说集合，对上述公式进行如下简化操作

![][2]

- 用二维上的点来解释高维空间的感知器，其中的线表示h（假说，感知器），点表示x（输入），圈或叉表示y（是/否），这里的感知器相当于是线性分类器

![][3]

### PLA算法

- 接下来要做的就是从假说集合里找到一个最合适的假说作为感知器，即找个一条线可以很好地将圈和叉进行分类

![][4]

- PLA：Perceptron Learning Algorithm（知错能改演算法），核心就是不断更新直到不再犯错

![][5]

- 简单的循环PLA：其循环是不断遍历feature vector，找到错误的点（Yn和当前Wt*Xn不符合），然后校正Wt，那么为什么要这样校正？因为这样可以保证Wt越来越靠近perfect直线Wf（ps.暂时没想到正向思维是如何得到这个式子的）课程像大多数课本一样，用逆向思维给予介绍，就是在给定这样能够做的情况下去证明，即证明为什么这样做可以不断接近目标，以及最终一定会停止？

![][6]

### PLA终止证明

- 前提条件：假设数据集D是夏宁可分的，这里列举了集中非线性可分的情况

![][7]

- 证明wt和wf的內积越来越大，可能应为二者越来越接近，然而不够充分，因为长度也会影响內积

![][8]

- 接下来证明二者在标准化之后也会越来越接近

![][9]

- 上面两页ppt有点复杂，而且缺少了最后一步的推导，网上有个清晰版的推导过程，自己试着推了一遍，一点没毛病

![][10]
![][11]

- 最终的结论说明，二者单位化之后的內积确实在变大，但是因为內积最大为1，所以最终结果就是慢慢接近，证毕


### 非线性可分的情况
 
#### PLA的问题

- 前面的证明都是基于一个前提：数据一定要是线性可分的，一定存在wf，什么时候停是由wf决定的，而wf又是未知的，所以没法确定何时会终止

![][12]

#### Pocket Algorithm

- 对于非线性可分的数据，即有噪音的数据，这里退而求其次，去寻找犯错最小的分类器，然而这时一个NP-hard问题

![][13]

- 这里改用基于随机的贪心算法的办法来解决，就是Pocket PLA

![][14]

- 课堂测验：在线性可分的情况下，贪心会比较慢，但二者的找的线的效果是一样的，都不会有错误

![][15]

### 总结

- 线性可分数据使用PLA
- 非线性可分数据使用Pocket

![][16]


[1]: {{ site.baseurl }}/images/201706/14.png
[2]: {{ site.baseurl }}/images/201706/15.png
[3]: {{ site.baseurl }}/images/201706/16.png
[4]: {{ site.baseurl }}/images/201706/17.png
[5]: {{ site.baseurl }}/images/201706/18.png
[6]: {{ site.baseurl }}/images/201706/19.png
[7]: {{ site.baseurl }}/images/201706/20.png
[8]: {{ site.baseurl }}/images/201706/21.png
[9]: {{ site.baseurl }}/images/201706/22.png
[10]: {{ site.baseurl }}/images/201706/23.png
[11]: {{ site.baseurl }}/images/201706/24.png
[12]: {{ site.baseurl }}/images/201706/25.png
[13]: {{ site.baseurl }}/images/201706/26.png
[14]: {{ site.baseurl }}/images/201706/27.png
[15]: {{ site.baseurl }}/images/201706/28.png
[16]: {{ site.baseurl }}/images/201706/29.png

### 参考资料

- [Machine Learning Foundations](http://www.csie.ntu.edu.tw/~htlin/mooc/)

- [机器学习定义及PLA算法](http://www.cnblogs.com/HappyAngel/p/3456762.html)




