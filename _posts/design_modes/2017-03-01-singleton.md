---
layout: post
title:  "【设计模式】单例模式"
categories: Design Mode
tags:  design-mode singleton
author: Tandy
---

* content
{:toc}

关于单例模式的总结，主要参考Head First 设计模式》这本书




## 定义

单例模式：确保一个类只有一个实例，并提供一个全局访问点

## 作用

有一些对象我们只需要一个，比方说：线程池、缓存、对话框、处理偏好设置和注册表的对象、日志对象，充当打印机、显卡等设备的驱动程序对象。

## 对比全局变量

单例模式和全局变量很像，但是如果用全局变量，就要一开始就创建好对象，万一这个对象非常耗费资源，而程序在这次执行的过程中又一直没有用它，就很浪费了。

## 代码实现

- 关键词：双重加锁（同步锁比较费时间）

### java版

- 参考《Head First 设计模式》P189

```java
public class Singleton{
	private volatile static Singleton uniqueInstance;
	private Singleton(){}
	public static Singleton getInstance(){
		if(uniqueInstance == null){//第一把锁
			synchronized(Singleton.class){//第二把锁：同步锁
				uniqueInstance = new Singleton();
			}
		}
	}
}
```
注意：第一句中的volatile关键词确保：当uniqueInstance变量被初始化成Singleton实例时，多个线程正确地处理uniqueInstance变量

### C#版

- 参考《剑指Offer》单例模式的C#完美实现

```java
 public sealed class Singleton3//sealed表示不能作为其他类的基类
{
    private Singleton3()
    {
    }
    private static object syncObj = new object();//这个类用来加锁
    private static Singleton3 instance = null;
    public static Singleton3 Instance
    {
        get
        {
            if (instance == null)//加锁比较费时，所以只有当instance没被创建出来时，才进行加锁操作
            {
                lock (syncObj)
                {
                    if (instance == null)
                        instance = new Singleton3();
                }
            }

            return instance;
        }
    }
}
```

## 更多

[深入浅出单实例Singleton设计模式](http://blog.csdn.net/haoel/article/details/4028232)