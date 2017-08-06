---
layout: post
title:  "【Unity3D】Unity脚本生命周期"
categories: Unity3D
tags: unity3d game notes summary
author: Tandy
---

* content
{:toc}

这篇博客主要总结一下Unity脚本的生命周期

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498625091335&di=7ff3f507fe3632acc059239d4fb9a60a&imgtype=0&src=http%3A%2F%2Fwww.qianjunyouxi.com%2Fueditor%2Fphp%2Fupload%2Fimage%2F20151008%2F1444309444853389.jpg)






## Awake()和Start()

- Awake()在MonoBehavior创建后就立刻调用，在脚本实例的整个生命周期中，Awake函数仅执行一次；如果游戏对象（即gameObject）的初始状态为关闭状态，那么运行程序，Awake函数不会执行；如果游戏对象的初始状态为开启状态，那么Awake函数会执行；值得注意的一点是，Awake函数的执行与否与脚本实例的状态（启用或禁用）并没有关系，而是与脚本实例所绑定的游戏对象的开关状态有关。如果重新加载场景，那么场景内Awake函数的执行情况重新遵循上述两点。

- Start()将在MonoBehavior创建后在该帧Update()第一次执行前被调用；Start()函数只在脚本实例被启用时才会执行；Start函数总是在Awake函数之后执行。如果游戏对象开启了，对象上绑定的脚本实例被禁用了，那么Start函数不会执行。这是Start函数的特点，只有在脚本实例被启用时它才会执行，并且Start函数只会在脚本实例首次被开启时才会执行。如果是已经开启过的脚本实例被关闭后再次开启，那么Start函数不会再次执行。

- 一般开发中都是在Awake函数中获取游戏对象或者脚本实例的信息，然后在Start函数中进行一些获取之后的初始化设置。

- Awake、OnEnable、Start,都是游戏开始运行前就调用的方法。
- GameObject的Activity为true，脚本的enable为true时，其先后顺序为：Awake、OnEnable、Start；
- GameObject的Activity为true，脚本的enable为false时,只运行Awake；
- GameObject的Activity为false时，以上都不调用，OnDisable()被调用；

- 注意：这里会进行一个判断，如果Start方法还没有被执行，则会被执行一次，如果已经被执行了，则不会再被执行。这是个什么意思呢？我们可以在某个脚本中将组件禁用this.enable=false，再启用时会转到OnEnable处执行，这时继续向下走，发现Start执行过了，将不再被执行。比如说：第一次启用时，将怪物的初始位置定在了(0,0,0)点，然后怪物可能会发生了位置的变换，后来被禁用了，再次启用时，不会让怪物又回到初始的(0,0,0)位置。

## 其他函数

- OnDestory:物体被删除时调用。
- Update：当MonoBehaviour启用时,其Update在每一帧被调用；
- LateUpdate：当Behaviour启用时，其LateUpdate在每一帧被调用
- FixedUpdate:这个函数会在每个固定的物理时间片被调用一次.这是放置游戏基本物理行为代码的地方。UPDATE之后调用。
- Reset：Reset是在用户点击检视面板的Reset按钮或者首次添加该组件时被调用.此函数只在编辑模式下被调用.Reset最常用于在检视面板中给定一个最常用的默认值.
- OnGui:这个函数会每帧调用好几次（每个事件一次），GUI显示函数只能在OnGui中调用。
- OnBecameVisible：可以使用OnBecameVisible()和OnBecameVisible(),来控制物体的update()函数的执行以减少开销

## 完整流程

![](http://img.blog.csdn.net/20150819133318605?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

![](http://img.blog.csdn.net/20140119212730296?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcWl0aWFuNjc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 参考
- [http://blog.csdn.net/cxihu/article/details/47049355](http://blog.csdn.net/cxihu/article/details/47049355)
- [http://blog.csdn.net/qitian67/article/details/18516503](http://blog.csdn.net/qitian67/article/details/18516503)