---
layout: post
title:  "【Unity3D】Unity游戏编程基础学习笔记2"
categories: Unity3D
tags: unity3d game notes C#
author: Tandy
---

* content
{:toc}

这篇博客主要是学习coursera上面Unity游戏编程基础第三周课程过程中的一些笔记

![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498625091335&di=7ff3f507fe3632acc059239d4fb9a60a&imgtype=0&src=http%3A%2F%2Fwww.qianjunyouxi.com%2Fueditor%2Fphp%2Fupload%2Fimage%2F20151008%2F1444309444853389.jpg)





## 关于课程
 
- 介绍Unity编程语言：C#编程
- 本来想直接跳过这一节的，但是还是快速过了一遍，就当是复习面向对象了，C#的大部分语法和C++是一样的，很多太基本的重复性的内容我这里直接略过了 

## 集成开发环境
常用的IDE有
- MonoDevelop：Unity自带
- Visual Studio：尽在windows平台运行

## C#基本语法

### 基本语法结构
- 基本同C++
- 变量名的第一个字符必须是字母、“_”或“@”

### 变量与表达式
- 基本同C++
- 数组的声明：
```
    <baseType>[] <name>	
    int[] intArray = {1, 2, 3};
```
- 多维数组的声明：
```
    <baseType>[,,....,] <name>
    int[,] myArray = new[2,3] { {0,1,2},{2,4,6} };
```
### 流程控制
- 基本同C++
- ref与out关键字
	- 引用类型这种保存内存中数据地址的传址方式，也可以运用于函数调用过程中的参数传递。
	- 我们可以通过ref与out关键字来修饰函数的参数，使被调用函数对参数的修改，能够被调用者接收到
![][1]

## 面向对象编程与类

### 面向对象的含义

- 对象的内容
	- 属性和字段
	- 方法
- 对象的声明周期
	- 构造阶段
	- 使用阶段
	- 析构阶段

- 以对象为中心的编程思想，模块的思想：
	- 将所有事物抽象化为对象（一切皆对象）；
	- 实现对象的相关代码；
	- 使用时调用对象的属性字段和方法；

- 面向对象的特点：
	- 代码长度增加
	- 代码可维护性好
	- 代码复用性高

- 类与对象
	- C#中，我们使用类来表示对象
	- 类表示一类对象的抽象
	- 类的实例表示某个具体的对象

![][2]

### 面向对象的技术

#### 封装
- 封装是将抽象得到的数据和行为相结合，形成一个有机的整体，也就是将数据与操作数据的方法相结合，形成“类”；
- 封装通过访问修饰符，隐藏对象的私有属性和实现细节，仅对外公开接口，进而提高了对象的安全性和稳定性。

- 访问修饰符包括：

![][3]

#### 继承

- 继承允许新定义的类使用现有类的所有功能，并在无需重新编写原来的类的情况下对这些功能进行扩展。
- 被继承的类被称为父类（基类），继承的类被称为子类（派生类）

#### 接口

- 接口是定义了某些特定功能的集合，它封装一组未实现的方法和属性。
- 一旦定义了接口，就可以在类中实现它。这样，该类就支持接口所指定的所有属性和成员。
- 接口不能单独存在，不能实例化；
- 接口中只能声明方法和属性，实现过程必须在实现接口的类中完成。
- 接口的定义
	interface <interfaceName>
	{
		<funtion definition>
	}
 
![][4]

#### 多态

- 多态允许子类的对象对父类的引用进行赋值。此种情况下，我们可以通过父类的引用，调用子类从父类处继承或重写的方法。
- 多态还包括接口的多态

![][5]

### 类的定义与使用

#### 类定义

![][6]

#### 抽象类

- 抽象类不能被实例化，只能继承，可以包含抽象成员

![][7]

#### 类继承

- 继承的父类必须放在实现的接口之前

#### 属性

- 属性是C#中独有的类成员，它的作用是提供一种灵活和安全的方式来访问、修改类中的私有字段。

![][8]

#### base和this关键字

```c#
public class MyBaseClass{
	public virtual void MyFunc(){
		Console.WriteLine (1);
	}
}
public class MyClass:MyBaseClass{
	public override void MyFunc(){
		Console.WriteLine (2);
	}
	public void DoBaseFunc(){
		base.MyFunc ();
	}
	public void DoThisFunc(){
		this.MyFunc ();
	}
}
namespace HelloUnity
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			MyClass myClass = new MyClass ();
			Console.Write ("MyFunc:");
			myClass.MyFunc ();
			Console.Write ("DoBaseFunc:");
			myClass.DoBaseFunc ();
			Console.Write ("DoThisFunc");
			myClass.DoThisFunc ();
		}
	}
}
```

运行结果

![][9]

## 总结

- 这次课程的内容相对简单，C#的语法和C++基本上一样，顺便回顾了一下面向对象
 

## 参考资料

- [基于Unity引擎的游戏开发基础](https://www.coursera.org/learn/unity-yinqing-youxi-kaifa/home/info)


[1]: {{ site.baseurl }}/images/201706/137.png
[2]: {{ site.baseurl }}/images/201706/138.png
[3]: {{ site.baseurl }}/images/201706/139.png
[4]: {{ site.baseurl }}/images/201706/140.png
[5]: {{ site.baseurl }}/images/201706/141.png
[6]: {{ site.baseurl }}/images/201706/142.png
[7]: {{ site.baseurl }}/images/201706/143.png
[8]: {{ site.baseurl }}/images/201706/144.png
[9]: {{ site.baseurl }}/images/201706/145.png

