---
layout: post
title:  "【Unity3D】Unity游戏编程基础学习笔记1"
categories: Unity3D
tags: unity3d game notes
author: Tandy
---

* content
{:toc}

这篇博客主要是学习coursera上面Unity游戏编程基础第一、二周课程过程中的一些笔记

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498625091335&di=7ff3f507fe3632acc059239d4fb9a60a&imgtype=0&src=http%3A%2F%2Fwww.qianjunyouxi.com%2Fueditor%2Fphp%2Fupload%2Fimage%2F20151008%2F1444309444853389.jpg)





## 关于课程
 
- 该课程是复旦大学软件学的姜忠鼎老师主讲，姜老师也是我浙大CAD出来的。
- 附上[课程链接](https://www.coursera.org/learn/unity-yinqing-youxi-kaifa/home/welcome)

## 关于游戏


### 游戏开发技术

![][1]

### 游戏引擎

#### 游戏引擎介绍
- 游戏引擎是一些已编写完成的可编辑的游戏系统，或者一些可编辑实时图像应用的核心组件
- 这些系统为游戏开发者提供游戏研发所需的多种工具，开发者能够快速地实现游戏逻辑，无需从零开始编写代码。
- 游戏引擎就好比赛车引擎

![][2]

#### 游戏引擎功能
游戏引擎的功能模块包括：
- 游戏中的实时光影绘制
- 动画系统
- 物理模拟系统
- 游戏场景渲染机制
- 网络通信、AI系统
- 平台移植功能

![][3]

#### 主流游戏引擎
- Unity引擎
- Unreal虚幻引擎
- CryEngine引擎

## Unity基本概念

### 游戏对象
- 游戏场景中存在的物体都可以称为游戏对象，包括场景中的物体、环境元素、特效等等

### 预制件(Prefab)
- 用于管理游戏场景中多个相同的游戏对象（比如项目1中的多米诺骨牌），用预制件的好处包括
	- 方便进行相同游戏对象的创建
	- 相同游戏对象的修改可以批量进行

### 物理系统基础
物理系统组件包括：
- 刚体
- 恒定力
- 碰撞体

### 图形系统基础

#### 渲染
- 网格过滤器
	- 网格过滤器存放游戏对象的网格信息，并把网格信息传递到网格渲染器中，最后将网格渲染到屏幕中，此组件的目的主要用于确定模型的形状和尺寸。
- 网格渲染器
	- 网格渲染器从网格过滤器中获取几何形状，用于渲染场景中的模型。
- 网格过滤器和网格渲染器必须成对使用，缺少任意一个都会导致游戏对象渲染失败。

#### 材质
- 呈现物体表面的颜色、质感特性，材质在网格渲染器中设置

#### 着色器
- 着色器主要用于图像的渲染过程，它具有可编辑性，不受显卡的固定管线限制，可以实现丰富的图像效果。这极大地提高了图像的品质。
- 我们可以使用着色器语言来编写相应的着色器脚本，以实现头像渲染的不同效果
- 几种常见的着色器模式：
	- 透明效果  
![][4]
	- 淡入淡出效果
![][5]
	- 透明与不透明效果
![][6]

### 光源

#### 光源类型
- 方向光：模拟极远处的光照，如地球上的太阳光
- 点光源：模拟光源向四周发出均匀的光线，例如日常生活中的灯泡
- 聚光灯：模拟光源向某个方向发出圆锥体光线，例如手电筒、路灯
- 面光源：无法模拟实时光照，用于光照烘焙

### 摄像机
在Unity的场景中，必须有一个摄像机用于绘制场景，引擎对摄像机可以看到的游戏世界中的空间区域进行渲染，生成最终的游戏画面。

#### 类型
- 根据视角不同
	- 第一人称  
![][7]
	- 第三人称  
![][8]
- 根据个数
	- 单人模式
	- 多人模式

#### 摄像机清除标记
- Skybox（预设）：以天空盒最为摄像机的清除标记
![][9]
- Solid Color（纯色背景）：以某种颜色作为摄像机的清除标记
![][10]
- Depth Only（仅深度，用于多个摄像机的同时绘制）：以深度较低的摄像机渲染的图案作为该摄像机的清除标记
![][11]
![][12]
- Don't Clear：不清除，摄像机的清除标记为上次渲染过的图像
![][13]

#### 摄像机投影方式
- Perspective(透视)
- Orthgraphic(正交)

### 音频基础

#### 音频监听
- 音频监听（AudioListener）采集场景当中的声音并播放
- 摄像机对象中预置了AudioListener组件，我们也可以通过添加组件的方式，给游戏对象添加音频监听组件。
- 当场景中存在多个AudioListener时，Unity编辑器会随机选择其中一个AudioListener生效，其余均保持静默

### 项目构建
当Unity项目制作完毕，需要对Unity项目进行构建，才能使Unity项目脱离Unity编辑器独立运行

#### 项目构建的步骤
1. 把场景添加到构建列表
2. 选择项目发布的平台
3. 设置平台参数
4. 生成游戏项目

## 项目总结
- 完成了第一个小项目：多米诺骨牌

<div style="max-width:10000px; margin:0 auto 10px;" >
<div 
style="position: relative; 
width:100%;
padding-bottom:56.25%; 
height:0;">
<iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"  src="http://player.youku.com/embed/XMjg1NDU3NzQxNg==" frameborder="0" allowfullscreen></iframe>
</div>
</div>

- 前两周的学习主要对一些基本概念进行介绍，关于脚本的编写并没有深入讲，通过一个具体的项目，熟悉了Unity的基本操作，后面会有更多有意思的项目，加油！

## 小技巧
- Unity工程中的Library可以删除，只要保留Asset和ProjectSetting，下次导入的时候就会自动生成Library
 
## 一些资源
- 以下包含了一些图形和声音资源制作工具的下载链接，包含工业标准软件，商用软件以及免费软件。
	- 位图制作软件
	  1. [Adobe Photoshop](https://www.adobe.com/cn/products/photoshop.html)
	  2. [Corel Painter](http://www.painterartist.com/rw/product/paint-program/)
	  3. [Corel Draw](http://www.corel.com/cn/)
	  4. Windows画图程序 (windows系统自带)
	  5. [Pixlr (免费)](https://pixlr.com/)
	  6. [GIMP (免费)](http://www.gimp.org/)
	- 矢量图制作软件
	  1. [Corel Draw](http://www.corel.com/cn/)
	  2. [Adobe Illustrator](https://www.adobe.com/cn/products/illustrator.html)
	  3. [Vector Magic](http://vectormagic.com/home/)
	  4. [Free Hand](http://thefreehand.com/)
	- 3D图形软件
	  1. [Autodesk Maya](http://www.autodesk.com.cn/products/maya/overview)
	  2. [Autodesk 3dsmax](http://www.autodesk.com.cn/products/3ds-max/overview)
	  3. [Sketch](https://www.sketchup.com/)
	  4. [Blender (免费)](https://www.blender.org/)
	- 音频制作软件
	  1. [Adobe Audition](https://www.adobe.com/content/dotcom/cn/products/audition.html)
	  2. [Sony Sound Forge](http://www.sonycreativesoftware.com/soundforgesoftware)
	  3. [Sony Acid](http://www.sonycreativesoftware.com/acidsoftware)
	  4. [Audacity (免费)](http://www.audacityteam.org/)
	  5. [Apple Logic Pro](https://www.apple.com/cn/logic-pro/)
	  6. [Apple GarageBand (免费)](http://www.apple.com/cn/support/mac-apps/garageband/)
	
- 下面是一些提供图形与音频资源的网站，其中部分提供免费资源，部分提供付费资源。
	- 位图与矢量图：
	  1. [Unity Asset Store](https://www.assetstore.unity3d.com/)
	  2. [昵图网](http://www.nipic.com/)
	  3. [千图网](http://www.58pic.com/)
	  4. [站酷](http://www.zcool.com.cn/)
	- 3D图形：
	  1. [Unity Asset Store](https://www.assetstore.unity3d.com/)
	  2. [Cg模型网](http://www.cgmodel.cn/)
	  3. [站长素材](http://sc.chinaz.com/3D/)
	  4. [3D溜溜网](http://www.3d66.com/)
	  5. [www.creativecrash.com](http://www.creativecrash.com/)
	  6. [sketchfab.com](http://sketchfab.com/)
	- 数字音频与音乐
	  1. [Unity Asset Store](https://www.assetstore.unity3d.com/)
	  2. [站长素材](http://sc.chinaz.com/yinxiao/)
	  3. [音效网](http://www.yinxiao.com/)
	  4. [www.newgrounds.com](http://www.newgrounds.com/)
	  5. [incompetech.com](http://incompetech.com/)
- 下面是一些UNITY官方资料的链接，供大家参考：
	1. [Unity官方教程](http://unity3d.com/cn/learn/tutorials)
	2. [Unity官方用户手册](http://docs.unity3d.com/Manual/index.html)
	3. [Unity官方脚本API](http://docs.unity3d.com/ScriptReference/index.html)
	4. [Unity中文论坛](http://forum.china.unity3d.com/forum.php)
	5. [Unity官方资源商店](https://www.assetstore.unity3d.com/en/)

## 参考资料

- [基于Unity引擎的游戏开发基础](https://www.coursera.org/learn/unity-yinqing-youxi-kaifa/home/info)
- [与Unity3D一起玩游戏开发](http://v.youku.com/v_show/id_XMTM0ODU2MTM5Ng==.html?firsttime=896)
- [Unity User Manual ](https://docs.unity3d.com/Manual/index.html)

[1]: {{ site.baseurl }}/images/201706/124.png
[2]: {{ site.baseurl }}/images/201706/125.png
[3]: {{ site.baseurl }}/images/201706/126.png
[4]: {{ site.baseurl }}/images/201706/127.png
[5]: {{ site.baseurl }}/images/201706/128.png
[6]: {{ site.baseurl }}/images/201706/129.png
[7]: {{ site.baseurl }}/images/201706/130.png
[8]: {{ site.baseurl }}/images/201706/131.png
[9]: {{ site.baseurl }}/images/201706/132.png
[10]: {{ site.baseurl }}/images/201706/133.png
[11]: {{ site.baseurl }}/images/201706/134.png
[12]: {{ site.baseurl }}/images/201706/135.png
[13]: {{ site.baseurl }}/images/201706/136.png

