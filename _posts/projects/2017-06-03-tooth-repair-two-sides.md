---
layout:     post
title:      "【数字几何处理】牙齿侧面修复"
date:       2017-06-03 12:00:00
categories: polygon-mesh-processing
tags:  polygon-mesh-processing mesh teeth hole-filling 
author: Tandy
---

* content
{:toc}

这是一个利用切分洞和经典补洞算法实现的三维牙齿网格数据侧面修复的Demo：

![]({{ site.baseurl }}/images/demos/tooth_repair2.gif)




## 背景

从原始的牙颌三维模型上切割下来的牙齿三维数据，由于邻牙和牙龈遮挡的原因，在牙缝区域以及牙根区域存在缺失，这样的数据是不利于之后的牙齿模拟矫治方案的生成的，这里需要对牙齿进行修复操作

## 流程
- 导入待修复的牙齿数据
- 对进行切割，构造bridge，将侧面部分单独切分出来
- 对bridge进行形变平滑操作
- 选中对应的洞进行填补
- 对临界区域进行局部平滑

## 算法
### 构造bridge
- 这个思路是还是比较直观的，因为想要部分补洞，就必须把补的部分提取出来，bridge可以作为一个分界线，将需要补的部分独立出来。
直接拉直线构造bridge效果并不是太好，需要进行一定的修饰，主要是有细分、形变和平滑操作

	- 先是对bridge按照一定的步长进行细分，这里的步长参考原始网格边界点的密度，计算方法如下,这里的边界点密度density就可以作为细分bridge的步长  
<img src="http://chart.googleapis.com/chart?cht=tx&chl=\Large density=\frac{Blength}{Vn}" style="border:none;">  
这里的Blength表示边界长度，Vn表示边界点的数量，边界点密度density就可以作为细分bridge的步长

	- 形变操作通过bridge上的每个顶点沿着法向移动一定的距离来实现，这个距离时利用一个简单的二次函数来确定的，直观地体现就是两端补洞，越靠近两端移动距离越小，靠近中间移动距离大。

	- 最后平滑是对两端连接区域进行laplacian平滑操作，是的bridge和原始网格的边界过度更加自然。

- 构造bridge的效果如下

![]({{ site.baseurl }}/images/demos/tooth_repair3.gif)

### 补洞算法
- 参考论文1：《Filling Holes in Meshes》，经典的四步补洞法：
	- 识别洞
	- 对洞进行三角化
	- 网格细分
	- 光顺
![]({{ site.baseurl }}/images/demos/holefilling.png)

- 参考论文2：《A lightweight approach to repairing digitized polygon meshes》，在上篇论文的基础上，加入了一下修正和改进：
	- 几何修正
	- 去除自相交的网格
![]({{ site.baseurl }}/images/demos/holefilling2.png)

- 补洞的效果如下
![]({{ site.baseurl }}/images/demos/tooth_repair4.gif)

### Laplacian平滑
- 主要参考论文：《Laplacian Surface Editing》，[详细介绍](![]({{ site.baseurl }}/images/demos/holefilling2.png))

- 这里我加了一下选点的交互进去，这样用户就可以根据自己需求对指定的区域进行平滑操作
![]({{ site.baseurl }}/images/demos/tooth_repair5.gif)

## 完整视频演示
- YouTube

<div style="max-width:10000px; margin:0 auto 10px;" >
<div 
style="position: relative; 
width:100%;
padding-bottom:56.25%; 
height:0;">
<iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"  src="https://www.youtube.com/embed/8lgq0SQ37Os" frameborder="0" allowfullscreen></iframe>
</div>
</div>

- 视频看不了，试试下面的

[![点这里播放视频]({{ site.baseurl }}/images/demos/tooth_repair2.png)](http://player.youku.com/embed/XMjgwNjYzNTU2OA==)

<div style="max-width:10000px; margin:0 auto 10px;" >
<div 
style="position: relative; 
width:100%;
padding-bottom:56.25%; 
height:0;">
<iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"  src="http://player.youku.com/embed/XMjgwNjYzNTU2OA==" frameborder="0" allowfullscreen></iframe>
</div>
</div>