---
layout: post
title:  "利用向量解释克莱姆法则"
categories: Math
tags:  math linear-algebra
author: Tandy
---

* content
{:toc}
克莱姆法则在解线性方程组中应用比较多，我们往往是从线性方程组反推克莱姆法，本文尝试利用向量来解释二维情况下的克莱姆法则




# 克莱姆法则
- 首先回顾一下克莱姆法则：

如果线性方程组  
![]({{ site.baseurl }}/images/201710/1.png)
的系数行列式不等于零，即  
![]({{ site.baseurl }}/images/201710/2.png)
那么线性方程组(1)有解，并且解是唯一的，解可以表示为  
![]({{ site.baseurl }}/images/201710/3.png)
其中Dj是把系数行列式D中第j列的元素用方程组右端的常数项代替后所得到的n阶行列式，即
![]({{ site.baseurl }}/images/201710/4.png)

---

# 行列式的几何意义
我们通常认为行列式是在研究线性方程组的时候被提出来的，然而从图像的角度，认为行列式是向量相乘的另一种方法，对于二维向量a和b，行列式|ab|表示由a和b形成的平行四边形的面积（有正负）  
![]({{ site.baseurl }}/images/201710/10.png)

---

# 二维情况下的克莱姆法则

在二维空间中，可以将一个向量表示为另外两个向量的线性组合，例如，将向量c表示为向量a和b的线性组合：
![]({{ site.baseurl }}/images/201710/5.png)
![]({{ site.baseurl }}/images/201710/9.png)

从图中可以看出  
![]({{ site.baseurl }}/images/201710/6.png)
上式成立的原因是，这些平行四边形只是做了一些等面积的拉伸，从上式可以求出bc：  
![]({{ site.baseurl }}/images/201710/7.png)
同样可以得出另一个参数：  
![]({{ site.baseurl }}/images/201710/8.png)
这就是二维情况下的克莱姆法则
