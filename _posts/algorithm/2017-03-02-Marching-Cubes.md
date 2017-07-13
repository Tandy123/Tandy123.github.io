---
layout: post
title:  "【算法】Marching Cubes算法理解"
categories: Algorithm
tags:  algorithm 3d graphics cbct volume cuda
author: Tandy
---

* content
{:toc}

关于Marching Cubes的等值面提取算法的一些整理，并且自己写了一个简单的Demo




## 背景知识
- Marching Cubes算法是三维离散数据场中提取等值面的经典算法，其主要应用于医学领域的可视化场景，例如CT扫描和MRI扫描的3D重建等。


#### 等值面
- 空间中所有具有某个相同值的点的集合，可以类比为地形图里的等高线。
	
	{(x,y,z)\|f(x,y,z)=c},c是常数

![Markdown](http://i1.buimg.com/599048/fe56dbaa307c01b7.jpg)

![Markdown](http://i1.buimg.com/599048/f7ddd3e247eb0aef.jpg)

#### Marching Cubes
- 算法的基本思想是逐个处理数据场中的立方体（体素），分离出与等值面相交的立方体，采用插值计算出等值面与立方体边的交点。根据立方体每一顶点与等值面的相对位置，将等值面与立方体边的交点按一定方式连接生成等值面，作为等值面在该立方体内的一个逼近表示。之所以这样，是由于Marching Cubes有个基本假设：沿六面体边的数据场呈连续性变化。也就是讲，如果一条边的两个顶点分别大于或小于等值面的值，则在该条边上有且仅有一点是这条边与等值面的交点。
- 直观地说，就是用许多小正方体去对空间进行切分，然后用小正方体内部的平面来近似表示当前的等值面。显然，小正方体的数量越多，逼近的效果越好，随之带来的是计算的代价。

![Markdown](http://i1.buimg.com/599048/65585096106aa307.gif)

![Markdown](http://i1.buimg.com/599048/6de0e04a0a1fa3dd.gif)

- 小正方体内部的平面可以小立方体和等值面的相交情况来确定

![Markdown](http://i1.buimg.com/599048/f9348312f31f7c3a.png)

- 对于每个小正方体来说，每个顶点两种情况（大于或小于）当前等值面的值，8个顶点共256种情况，考虑到旋转对称性，从新分类后可得15种基本模式

![Markdown](http://i1.buimg.com/599048/90127bc18769d1ff.jpg)

## Marching Cubes编程实现

1. 将原始数据经过预处理之后,读入指定的数组中;
2. 从网格数据体中提取一个单元体,成为当前单元体"同时获取该单元体的所有信息,例如8个顶点的值,坐标位置等;
3. 将当前单元体8个顶点的函数值与给定等值面值C进行比较,得到该单元体的状态表;(edgeTable、triTable)
4. 根据当前单元体的状态表索引,找出与等值面相交的单元体棱边,并采用线性插值的方法,计算出各个交点的位置坐标;
5. 利用中心差分法,求出当前单元体8个顶点的法向量,在采用线性插值的方法,得到三角面片各个顶点的法向
6. 根据各个三角面片顶点的坐标,顶点法向量进行等值面图象的绘制.


## 实现效果

- 利用CUDA写了一个简单的Demo，通过调整等值面的阈值，可以得到不同的表面模型。

![Markdown](http://i1.buimg.com/599048/94e313f3b8ff3fde.gif)

![Markdown](http://i1.buimg.com/599048/85f2b91bfe33a366.gif)

## 总结

- Marching Cubes等值面提取算法在原理和实现上都比较简单直观
- 经典的Marching Cubes算法还存在一些问题：
	- 缺陷一：拓扑连接二义性，如下图所示
	- 缺陷二：效率低下，需要借助分层结构和并行计算

![Markdown](http://i1.buimg.com/599048/8f8e2d014d58c73c.png)

- 该算法的发展：Marching Tetrahedrons

![Markdown](http://i1.buimg.com/599048/e89c355c7c6ba7fd.png)

## 参考

- [Lorensen W E, Cline H E. Marching cubes: A high resolution 3D surface construction algorithm[J]. Acm Siggraph Computer Graphics, 1987, 21(4):163-169.](http://delivery.acm.org/10.1145/40000/37422/p163-lorensen.pdf?ip=222.205.63.156&id=37422&acc=ACTIVE%20SERVICE&key=BF85BBA5741FDC6E%2E0E9E463C2E5391F8%2E4D4702B0C3E38B35%2E4D4702B0C3E38B35&CFID=959800319&CFTOKEN=23644207&__acm__=1499931476_74b38892dfdf93d0d75e0f44b196e18e)
- [Marching cubes](https://en.wikipedia.org/wiki/Marching_cubes)
- [MarchingCubes算法提取等值面的基本原理](http://malagis.com/marching-cubes-algorithm.html)