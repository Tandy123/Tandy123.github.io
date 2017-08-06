---
layout: post
title:  "【Unity3D】OnApplicationPause与OnApplicationFocus"
categories: Unity3D
tags: unity3d game notes summary wwise
author: Tandy
---

* content
{:toc}

这篇博客主要讲解Unity中和强制暂停有关的两个函数OnApplicationPause与OnApplicationFocus

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498625091335&di=7ff3f507fe3632acc059239d4fb9a60a&imgtype=0&src=http%3A%2F%2Fwww.qianjunyouxi.com%2Fueditor%2Fphp%2Fupload%2Fimage%2F20151008%2F1444309444853389.jpg)






## 写在前面

- 在Unity手机游戏的开发中，偶然遇到一个问题，发现遇到需要输入内容的时候，手机的背景音乐停止了，这样的情况一定程度上影响了用户的体验。

- 一开始去看Unity里面的OnApplcationPause，猜测是不是这个东西被调用了，导致出现全屏键盘的时候，游戏变为后台运行，但是加了日志之后发现，调出全屏输入法的时候，程序并没有进到OnApplcationPause里面，瞬间懵逼了，而且遇到非全屏输入的时候，音乐也停了，说明程序并没有转为后台运行。、

## 源码分析

无奈求助技术大佬Arik，果然一下就找到了问题的关键，因为当前的声音引擎用的是wWise，在wWise底层的代码里，有这样一段代码：

```c
#if !UNITY_EDITOR && !UNITY_WIIU
	//On the WiiU, it seems Unity has a bug and never calls OnApplicationFocus(true).  This leaves us in "suspended mode".  So commented out for now.
	void OnApplicationPause(bool pauseStatus) 
	{
		if (ms_Instance != null)
		{
			if ( !pauseStatus )
			{
				AkSoundEngine.WakeupFromSuspend();
			}
			else
			{
				AkSoundEngine.Suspend();  
			}
			AkSoundEngine.RenderAudio();
		}        
	}
	
    void OnApplicationFocus(bool focus)
    {
        if (ms_Instance != null)
        {
            if ( focus )
            {
                AkSoundEngine.WakeupFromSuspend();
            }
            else
            {
				AkSoundEngine.Suspend();           
            }
            AkSoundEngine.RenderAudio();
        }
    }
#endif
```

- 这里的关键信息是注释：翻译一下，就是说，在WiiU中，Unity天生有一个bug，就是永远也无法执行OnApplicationFocus(true)，即把程序切到后台让声音进入暂停模式，所以这里注释掉了。

## 深入探索

- 上面的注释其实也是看得一知半解，不过这里提供了一个关键函数：OnApplicationFocus，上网查了一下，发现这个函数和OnApplicationPause还是有些区别的：

	- OnApplicationPause，当程序暂停；
	- OnApplicationFocus，当程序获得或失去焦点；

	- 强制暂停时，先 OnApplicationPause，后 OnApplicationFocus；
	- 重新“启动”手机时，先OnApplicationFocus，后 OnApplicationPause；

- 看了这些有个大概的了解，不过最给力的还是unity的官方文档，下面是原文，看标注的那句话就够了：

![Markdown](http://i1.ciimg.com/599048/5ac2b435c2bc2342.png)

- 最后，直接把wwise里重写的OnApplicationFocus函数注释掉，不知道有没有更好的解决办法，欢迎交流

## 写在后面

- 顺便简单调研了一下，发现市面上大部分的手游都存在这个问题，包括王者荣耀和轩辕传奇这样的大作，不过光明大陆里面没有发现这个问题。

- 声音这个东西虽然不涉及什么太复杂的逻辑，但是细究下去还是有不少需要注意的细节问题，加油！

## 参考资料

- [Unity-API-MonoBehaviour.OnApplicationFocus(bool)](https://docs.unity3d.com/ScriptReference/MonoBehaviour.OnApplicationFocus.html)
- [Unity3d OnApplicationPause与OnApplicationFocus](http://blog.csdn.net/jbjwpzyl3611421/article/details/12780219)
- [Unity Application 前后台切换调用关系](http://blog.csdn.net/aa4790139/article/details/48087877)

