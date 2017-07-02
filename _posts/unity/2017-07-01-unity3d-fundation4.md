7/2/2017 2:07:29 PM ---
layout: post
title:  "【Unity3D】Unity游戏编程基础学习笔记4"
categories: Unity3D
tags: unity3d game notes
author: Tandy
---

* content
{:toc}

这篇博客主要是学习coursera上面Unity游戏编程基础最后一周课程过程中的一些笔记

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498625091335&di=7ff3f507fe3632acc059239d4fb9a60a&imgtype=0&src=http%3A%2F%2Fwww.qianjunyouxi.com%2Fueditor%2Fphp%2Fupload%2Fimage%2F20151008%2F1444309444853389.jpg)





## 关于课程

这次课程包含以下内容 

- 慕课英雄 MOOC HERO（第一人称射击完整版）概述
- 游戏人称变换
- 图形用户界面与移动平台界面（uGUI：PC & 移动平台）
- 粒子系统（Particle System）与线渲染器（Line Renderer）
- 物品收集（Pickup）、游戏胜利与失败画面
- 慕课英雄 MOOC HERO（第一人称射击完整版）总结

## 慕课英雄 MOOC HERO（第一人称射击完整版）概述
- 第一人称射击视角  
![Markdown](http://i2.kiimg.com/599048/781add04d9367b5b.png)
- uGUI制作游戏开始界面  
![Markdown](http://i2.kiimg.com/599048/c07654ae75189944.png)
- uGUI制作游戏进行界面  
![Markdown](http://i2.kiimg.com/599048/f1b7bd715d01e6a6.png)
- uGUI制作游戏结束界面  
![Markdown](http://i2.kiimg.com/599048/895d66a815c0c375.png)
- 粒子系统制作粒子特效  
![Markdown](http://i2.kiimg.com/599048/7cac9db32d16be07.png)
- 线渲染器制作激光特效  
![Markdown](http://i2.kiimg.com/599048/46fd76436bd51698.png)
- 物品收集功能实现  
![Markdown](http://i2.kiimg.com/599048/7e106e2b521d4c4d.png)
- 游戏胜利与失败画面  
![Markdown](http://i2.kiimg.com/599048/730e3a05f13f8048.png)

接下来详细讲解各个部分的实现

## 游戏人称变换

- 第三人称和第一人称的摄像机行为对比
  
| 摄像机行为 		| 《慕课英雄》第三人称简易版	| 《慕课英雄》第一人称完整版	|
| :-: 			|:-:					| :-:					|
| 视角      		| 第三人称       		| 第一人称 				|
| 摄像机位置 		| 玩家背后空中    		|   玩家眼睛位置			|
| 摄像机朝向  	| 随玩家朝向变化  		|    随鼠标平移而变化		|

- 具体实现中，用一个空碰撞体的来模拟玩家的位置，下图分别表示第三人称视角和第一人称视角的摄像机位置：  
![Markdown](http://i4.piimg.com/599048/8cd9215068858e64.png)

- 第三人称视角效果图如下  
![Markdown](http://i4.piimg.com/599048/57d30db7e7254ce1.png)

## 图形用户界面与移动平台界面

### uGUI
- GUI是图形用户界面的简称，是一种人与计算机通信的界面显示格式。它允许用户使用鼠标等输入设备操作屏幕上的图标或者菜单选项，以选择命令、调用文件、启动程序或执行其他一些日常任务。
- 在游戏的开发过程中，游戏界面设计具有非常重要的作用，玩家打开游戏后第一个接触的游戏元素，通常就是游戏的GUI，游戏GUI是否友好、美观，很大程度上影响了玩家的游戏体验。
- 很传统的GUI系统相比，uGUI具有以下优势：
	- 与Unity引擎紧密的结合
	- 灵活、快速、可视化编程技术
	- 更加强大与易用的屏幕自适应能力
	- 全新的布局系统
	- 简单易用的UI控件
	- 强大的事件处理系统
- Reset():脚本编辑阶段执行，脚本绑定到游戏对象上执行一次  

### Canvas与EventSystem
- Canvas是uGUI控件的容器，uGUI控件必须是Canvas的子对象；
- EventSystem是事件处理系统，用于处理与响应用户与uGUI的交互。
- 注意：Canvas的绘制顺序是靠上的对象先绘制，Canvas的Sort Order值越小越先绘制。  

### Anchor（锚点）
- 锚点是一种相对定位技术，每个控件都有各自的锚点。我们可以先将锚点设置在屏幕的某个位置，然后设置其相对锚点的位置，这样可以方便地控制uGUI控件的位置。

### 控件
- uGUI的常用控件包括以下几种：
	- Text
	- Image
	- Button
	- InputField
	- Slider
	- Toggle

#### Button事件
- Button事件的设置流程：
	- 编写Button按钮触发的事件函数（注意：访问修饰符为public的函数才可以被Button按钮调用）；
	- 将包含函数的脚本添加到场景的任意一个游戏对象中；
	- 在Button组件的OnClick中添加事件函数。

#### InputField
- 在Unity中创建的InputField控件是复合控件，包括输入栏背景图案、输入栏组件、输入栏提示文本以及输入栏可编辑文本。

#### Slider
- 在Unity中创建的Slider控件是复合控件，它包含滑动条背景、滑动条填充图案、滑动块手柄。

#### Toggle
- Toggle表示开关控件，它包含勾选框背景、勾选图案以及Toggle文本信息。

### 游戏开始、进行、结束界面制作
- 开始界面  
![Markdown](http://i2.kiimg.com/599048/21cc203cd38ab363.png)
- 进行界面  
![Markdown](http://i2.kiimg.com/599048/2255a85476683b7d.png)
- 结束界面  
![Markdown](http://i2.kiimg.com/599048/b6d9ab41971756ed.png)

在跟着教程操作的中遇到几个问题：
- 教程里没有提到设置僵尸预制件的标签为Enemy，不设置的话会报错
- 警告：There are no audio listeners in the scene.原因是在启动预览游戏时，把声音关掉了，后面就一直保留了这个设置，重新从开始界面进入游戏，在选项里面把声音打开就行了
- 报错：Scene 'GameStart'(-1) couldn't be loaded...原因：自己太粗心了，把场景的名称写错了，这样导致程序找不到对应的场景

### 移动平台UI设置
- 移动平台触摸控制的实现方法：
	- 方法一：使用Input移动端输入函数，完成移动端输入的读取；
	- 方法二：用Cross Platform Input资源包快速实现跨平台输入UI。

#### Cross Platform input
- Cross Platform Input是Unity Standard Assets中的跨平台输入控制资源，它包含移动端常用的控制UI与控制脚本。
- 开发者可以使用这些资源实现移动端控制UI的开发。
- 使用Cross Platform Input制作移动端控制UI的流程如下：  
![Markdown](http://i2.kiimg.com/599048/fd657ec3f754db89.png)

- 用移动平台的UI进行玩家控制的最终效果如下图所示  
![Markdown](http://i2.kiimg.com/599048/bc02a0998549e70b.png)

- 注意：在添加移动端控件的时候要注意控件的顺序，不然可能导致某些控件被遮挡而无法使用  
![Markdown](http://i2.kiimg.com/599048/57cb38b6d7a835a9.png)


## 粒子系统与线渲染器
### 粒子系统（Particle System）
- 粒子是在三维空间中的二维图像，用于表现如爆炸、烟、火、水等效果。
- Unity中的Shuriken粒子系统采用模块化的管理方式，使用个性化的粒子模块配合粒子曲线编辑器，使用户更容易创作出各种缤纷复杂的粒子效果。
- 下面是用粒子做的一个简易喷泉  
![Markdown](http://i4.piimg.com/599048/8064accad055da82.png)

### 线渲染器
- 线渲染器（Line Renderer），使用一组3D点，在相邻两点之间使用材质绘制一条线，在项目中模拟激光的效果。  
![Markdown](http://i2.kiimg.com/599048/46fd76436bd51698.png)
- 注意：由于透视的原因，枪械激光会粗细不均匀，这里，我们采用调大末端高度来解决  
![Markdown](http://i1.buimg.com/599048/7c76f4be8b187c3b.png)
- 激光末端位置的确定采用以下规则：
	- 玩家开枪击中物体，我们将枪械激光的末端位置，设置为玩家开枪击中物体的位置。
	- 玩家开枪未击中物体，我们将枪械激光的末端位置，设置为子弹攻击失效的位置。


## 物品收集与游戏胜利失败画面

### 物品收集
- 物品中的血瓶可以使玩家会血，其收集的逻辑如下：  
![Markdown](http://i2.kiimg.com/599048/67e046371fe0cea2.png)

### 游戏胜利与失败画面

- 当玩家获得指定的分数后，游戏结束，此时将游戏进入胜利画面：
	- 删除场景中的敌人与玩家枪械；
	- 游戏结束摄像机从玩家视角逐渐平移到天空，俯视地面。

- 当玩家生命值小于等于零时，游戏结束，此时将进入游戏失败画面：
	- 删除场景中的敌人与玩家枪械；
	- 游戏结束摄像机从主角视角逐渐平移到天空，俯视地面；
	- 屏幕瞬间变黑，然后逐渐恢复正常；
	- 敌人排成一行欢呼的效果。

## 项目总结

- 这次课程实现了《慕课英雄》第一人称完整版的制作，主要内容包括以下几点
	- 游戏人称变换
	- 图形用户界面与移动平台界面（uGUI：PC & 移动平台）
	- 粒子系统（Particle System）与线渲染器（Line Renderer）
	- 物品收集（Pickup）、游戏胜利与失败画面
- 这次的内容干货满满，一定要好好消化，附上最终实现的游戏效果


## 参考资料

- [基于Unity引擎的游戏开发基础](https://www.coursera.org/learn/unity-yinqing-youxi-kaifa/home/info)


