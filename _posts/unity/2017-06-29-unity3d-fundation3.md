---
layout: post
title:  "【Unity3D】Unity游戏编程基础学习笔记3"
categories: Unity3D
tags: unity3d game notes C# script
author: Tandy
---

* content
{:toc}

这篇博客主要是学习coursera上面Unity游戏编程基础第四周课程过程中的一些笔记

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498625091335&di=7ff3f507fe3632acc059239d4fb9a60a&imgtype=0&src=http%3A%2F%2Fwww.qianjunyouxi.com%2Fueditor%2Fphp%2Fupload%2Fimage%2F20151008%2F1444309444853389.jpg)





## 关于课程

这次课程包含以下内容 

- 使用C#编写脚本
- 完成项目2《慕课英雄》第三人称简易版
- 改进项目2《慕课英雄》第三人称简易版



## 使用C#编写脚本

### 脚本的基本概念

- 交互是游戏开发中必不可少的概念，他使玩家能够根据自己的意愿改变游戏场景中的某些元素和行为。
- 交互包括玩家通过输入系统与游戏场景进行互动，也包括游戏场景中游戏对象之间的交互。
- 开发者实现游戏交互功能的主要手段，实现交互的主要工具是脚本。

### 脚本的声明周期

- Reset():脚本编辑阶段执行，脚本绑定到游戏对象上执行一次  
![Markdown](http://i2.kiimg.com/599048/a06c288d4f065ced.png)

- Awake():当脚本链接的游戏对象被激活时执行（无论该脚本组件是否启用）  
![awake](http://i2.kiimg.com/599048/c08344b7ed9adb3c.png)

- Start():当脚本启用时进行检查。若场景中该Start()函数从未执行，OnEnable()函数执行后执行一次。否则，不执行Start()函数。（即每个Start()函数在每个场景中只执行一次。）  
![Start](http://i2.kiimg.com/599048/73a26c151b448243.png)

- FixedUpdate():每隔固定时间执行一次，常用于物理模拟，如作用力的添加等。
![Markdown](http://i1.buimg.com/599048/5d9aa34b1c1406ab.png)

- OnTriggerXXX():每隔固定时刻检测一次，包括OnTriggerEnter()、OnTriggerStay()、OnTriggerExit()函数，分别用于有物体进入、停留、离开Trigger（触发器）范围时执行。  
![Markdown](http://i1.buimg.com/599048/06c2681c68402cd7.png)

- OnCollisionXXX():每隔固定时间检测一次，包括OnCollisionEnter()、OnCollisionStay()、OnCollisionExit()函数，分别用于有物体进入、停留、离开Collider（碰撞体）范围时执行。    
![Markdown](http://i1.buimg.com/599048/2999d38c71877847.png)

- OnMouseXXX():输入阶段，用于响应鼠标的输入事件。  
![Markdown](http://i1.buimg.com/599048/922cbbbbe23bedd2.png)

- Update():每帧执行一次，常用于游戏逻辑等相关行为的执行。  
![Markdown](http://i1.buimg.com/599048/039c39f72f88a020.png)

- LateUpdate():每帧执行一次，在Update()函数后执行。举例：第三人称游戏的摄像机跟随，Update()中执行玩家角色移动，LateUpdate()中执行摄像机跟随玩家，能防止摄像机的抖动事件。  
![Markdown](http://i1.buimg.com/599048/199549e497878c0d.png)

- OnGUI():每帧执行多次，绘制Unity的图形用户界面。  
![Markdown](http://i1.buimg.com/599048/341c93393b43a541.png)

- 在脚本禁用前，循环执行红色椭圆内的函数序列。  
![Markdown](http://i1.buimg.com/599048/81c755ffab5507c0.png)

- OnDisable():当改脚本禁用时执行一次。当脚本启用时跳至OnEnable()函数执行阶段，并继续循环执行直至脚本禁用。  
![Markdown](http://i1.buimg.com/599048/35fd9dccf527a5fe.png)

- OnDestroy():该脚本被移除时执行。  
![Markdown](http://i1.buimg.com/599048/73641b386559e709.png)

### 脚本之间的执行顺序
- Unity脚本之间的默认执行顺序：以堆栈的方式，先设置、后执行。
- 注意几点内容：
	- 未在MonoManager进行脚本设置，则脚本优先级默认为0（Default Time）。
	- 对于优先级相等的脚本，则采用默认的“先设置，后执行”执行方式。
	- 优先级只表示脚本的执行顺序，并不表示脚本执行时间的延迟（即优先级=100不表示延迟100ms执行）。

## 项目2《慕课英雄》第三人称简易版

### 地形系统
- Unity拥有功能强大且晚上的地形编辑器，支持以笔刷绘制的方式，实时绘制多种地形；同时，还提供地表元素绘制工具，绘制树木、草坪、石头等地表元素。
#### 地形系统编辑工具
- Raise/Lower Terrain 工具  
![Markdown](http://i4.piimg.com/599048/1edeca86c9471ff8.png)

- Paint Height 工具  
![Markdown](http://i4.piimg.com/599048/686912f05d616e5a.png)

- Smooth Height 工具  
![Markdown](http://i4.piimg.com/599048/2f348f0cdd735f20.png)

- Paint Texture 工具  
![Markdown](http://i1.buimg.com/599048/b09d8a70780ab52e.png)

- Place Trees 工具  
![Markdown](http://i1.buimg.com/599048/39f1c5875bece995.png)

- Paint Details 工具  
![Markdown](http://i1.buimg.com/599048/1908ae470d71dc46.png)

- Terrain Setting 工具  

#### 实战效果
- 用Unity3D树林夜景  
![Markdown](http://i1.buimg.com/599048/63ae5e0c7b26f602.png)

### 动画系统

#### Mecanim动画系统
- Mecanim是Unity一个丰富且精密的动画系统，他提供了：
	- 为人形角色提供的简易工作流和动画创建能力。
	- Retargeting（动画重定向）功能，即把动画从一个角色模型应用到另一个角色模型上。
	- 针对Animation Clips(动画片段)的简单工作流。
	- 一个用于管理动画间复杂交互作用的可视化编程工具。
	- 通过不同逻辑来控制不同身体部位运动的能力。

#### 动画片段
- Animation Clip（动画片段）是Unity中最小的动画构造模块，用于表示一段独立的动画效果，例如行走、奔跑、跳跃。  
![Markdown](http://i2.kiimg.com/599048/2e5ed0d3d5f35db6.png)
- 通常，我们要根据需要分割动画片段，并对Animation Clip进行首尾一致检查。

#### 角色替身
- 人形骨架是在游戏中普遍采用的一种骨架结构，Unity为其提供了一个特别的工作流和一整套扩展的工具集。
- 由于人形骨架结构的相似性，开发者可以将人形动画效果从一个人形骨架映射到另一个人形骨架，实现动画重定向功能。
- 创建动画的一个基本步骤就是建立一个从Mecanim系统的简化人形骨架结到用户实际提供的骨架结构的映射，这种映射关系被称为Avatar（角色替身）。
- Unity中的动画类型包括：
	- Humanoid
	- Generic
	- Legacy
	- None
- 利用Avatar可以实现人形动画的重定向  
![Markdown](http://i2.kiimg.com/599048/abdc9ea39dbe44df.png)

- 实战效果
这里我对一个Teddy熊的动画片段进行了分割，并实现了人形动画的重定向
![Markdown](http://i2.kiimg.com/599048/bab05c86503de61d.png)

#### 动画状态机
- 在射击类游戏中，我们使用键盘操作控制角色的行为，例如WSAD控制角色移动，空格控制角色跳跃
- 角色的行为影响动画的播放，例如角色在移动时播放移动动画，在跳跃时播放跳跃动画，这涉及到动画片段的播放和切换。
- 在Unity中，我们使用Animation State Machine（动画状态机），控制角色动画片段的播放与切换。
- 这里有几个关键词：
	- 状态：每个状态都对应一个动画；
	- 状态过渡：改变角色所处的状态；
	- 参数：状态过渡时与限制条件相关的参数。

![Markdown](http://i1.buimg.com/599048/e725c79a3057e079.png)

#### 动画层与身体遮罩
- 以射击类游戏为例，我们要实现“奔跑时射击”、“跳跃时射击”、“行走时射击”、“下蹲时射击”等功能。
- 一种方法是分别为它们制作不同的动画。
- 另一种方法就是将“奔跑”、“跳跃”等动画与“射击”动画结合起来。身体的下半部分使用“奔跑”动画，上半部分使用“射击”动画。
- Animation Layer（动画层）&Avatar Mask（身体遮罩）用于合成身体不同部位的动画。  
- 身体遮罩可以使得开发者选择性地启用或者禁用人形角色的相关关节，以控制动画片段对人形角色的影响：启用的关节受动画的控制而产生动作，禁用的关节不受动画的控制。  
![Markdown](http://i1.buimg.com/599048/b623fd6126382fdb.png)


### 游戏逻辑

#### 玩家与敌人设置

- 玩家的移动控制  
![Markdown](http://i1.buimg.com/599048/795ff0365ea227cd.png)
![Markdown](http://i1.buimg.com/599048/ccc1f851ef746def.png)
- 玩家的生命值与射击
- 敌人的追踪逻辑  
![Markdown](http://i1.buimg.com/599048/8717c78b0354ada6.png)
- 敌人的生命值、分数与攻击
![Markdown](http://i2.kiimg.com/599048/b4d2738c4250e8de.png)
#### 游戏管理

- 游戏管理器
	- 管理游戏状态（游戏进行中/胜利/失败）
	- 管理玩家积分
	- 管理场景中对象之间的交互
	- 显示游戏状态（玩家生命值与玩家得分）  

![Markdown](http://i4.piimg.com/599048/e2c4ab6521d9e628.png)

- 敌人的自动生成
	- 在给定地点动态生成敌人
	- 每次生成敌人的时间间隔是随机的。

## 游戏改进
根据课程要求，完成了以下的改进：
- 制作更高难度的游戏场景：复制当前场景level1以创建新场景level2，在新场景level2中，通过“提高玩家胜利的目标得分”、“提高敌人血量”、“提高敌人攻击力”、“降低玩家攻击力”、“降低玩家血量”等方式，提高游戏难度。
- 制作游戏胜利和失败场景：新建场景levelSuccess和场景levelFail，分别用于展现游戏胜利或者游戏失败的简单效果。在levelSuccess场景中，创建一个面向摄像机的平面Plane，为其绑定一张笑脸贴图，表示游戏胜利。在levelFail场景中，创建一个面向摄像机的平面Plane，为其绑定一张哭脸贴图，表示游戏失败。
- 实现场景的切换：修改游戏管理器脚本，更改场景切换的相关代码，以实现以下功能：游戏开始时，玩家首先进入level1场景。如果在level1中取得胜利，则进入level2场景。如果在level2 中也取得胜利，则进入levelSuccess场景，表示游戏胜利。如果玩家在level1或者level2场景中死亡，则进入levelFail场景，表示游戏失败。
	- 注：实现场景切换需要将场景导入 build settings ，然后调用SceneManager.LoadScene (newLevel)实现。
- 修改敌人的追踪脚本，使其具备巡逻行为：当敌人与玩家的距离超过某个阈值（50米）时，敌人为游荡状态，在场景中随机行走，比如，每5-10秒随机改变一次运动方向。当敌人与玩家的距离小于某个阈值（50米）时，敌人为追踪状态，此时敌人向玩家移动，当距离小于攻击距离时，则发动攻击。
	- 这里增加了一个巡逻距离，并通过transform.Rotate(0.0f,Random.Range (0.0f, 360.0f),0.0f)实现绕y轴随机转向。
- 为游戏添加背景音乐： 给场景level1与level2添加合适的背景音乐，以烘托游戏气氛。
- [最终版游戏下载链接](http://pan.baidu.com/s/1nvuRWLj)第一次做游戏，求轻喷。
- 游戏截图
![Markdown](http://i2.kiimg.com/599048/7cbdb54b6f39d9e6.png)

## 总结

- 这次课程的内容包括以下几点
	- 构造游戏类型
	- 管理玩家角色、敌人角色的动画
	- 实现玩家角色、敌人角色的移动
	- 实现敌人角色追踪、攻击功能
	- 添加游戏管理、敌人自动生成功能
- 这次课程内容较多，后期还要好好消化一下，争取把这个demo做得更加完善，加油！

## 一些资源
- [Unity官方脚本API](https://docs.unity3d.com/ScriptReference/index.html)
- [Unity脚本编程中常用的API](https://d18ky98rnyall9.cloudfront.net/_01520555953e2f168371f59bfedb9cdb_Unity__API__.pdf?Expires=1498867200&Signature=fDRlTNTjqpCZ6O3UlUK5kCCbcGtQokPlWAlWskRn3GO3XPyrPaW1FmtMJh9~hV2C5DuPmrDy-mpU-utKXj0Ot6~KbyvjcRK5aAJnYEsqplHdRMdjMFI8Y3ccmQv31GF1yUdrNg1ZE1jRsSg-ji~w-rlg4iGe6vKQ-s-zmD8iqRA_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)

## 参考资料

- [基于Unity引擎的游戏开发基础](https://www.coursera.org/learn/unity-yinqing-youxi-kaifa/home/info)


