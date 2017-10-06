---
layout: post
title:  "【C++】一些让人抓狂的概念"
categories: C++
tags:  c++ program
author: Tandy
---

* content
{:toc}

指针数组&数组指针、常量指针&指针常量、函数指针&指针函数




## 数组指针&指针数组

### 数组指针

- 定义 int (*p)[n];

- ()优先级高，首先说明p是一个指针，指向一个整型的一维数组，这个一维数组的长度是n，也可以说是p的步长。也就是说执行p+1时，p要跨过n个整型数据的长度。

- 如要将二维数组赋给一指针，应这样赋值：

	int a[3][4];
	int (*p)[4]; //该语句是定义一个数组指针，指向含4个元素的一维数组。
	p=a;        //将该二维数组的首地址赋给p，也就是a[0]或&a[0][0]
	p++;       //该语句执行过后，也就是p=p+1;p跨过行a[0][]指向了行a[1][]

所以数组指针也称指向一维数组的指针，亦称行指针。

### 指针数组

- 定义 int *p[n];

- []优先级高，先与p结合成为一个数组，再由int\*说明这是一个整型指针数组，它有n个指针类型的数组元素。这里执行p+1时，则p指向下一个数组元素，这样赋值是错误的：p=a；因为p是个不可知的表示，只存在p[0]、p[1]、p[2]...p[n-1],而且它们分别是指针变量可以用来存放变量地址。但可以这样 \*p=a; 这里\*p表示指针数组第一个元素的值，a的首地址的值。
如要将二维数组赋给一指针数组:

	int *p[3];
	int a[3][4];
	p++; //该语句表示p数组指向下一个数组元素。注：此数组每一个元素都是一个指针
	for(i=0;i<3;i++)
		p[i]=a[i]

这里int *p[3] 表示一个一维数组内存放着三个指针变量，分别是p[0]、p[1]、p[2]
所以要分别赋值。

## 常量指针&指针常量

### 常量指针

- 常量是形容词，指针是名词，常量指针本质是指针，常量修饰它，表示这个指针乃是一个指向常量的指针（变量）。

- 指针指向的对象是常量，那么这个对象不能被更改。

- 在C/C++中，常量指针是这样声明的：

    const int *p;
    int const *p;

### 指针常量

- 指针是形容词，常量是名词。指针常量的本质是一个常量，而用指针修饰它，那么说明这个常量的值应该是一个指针。

- 指针常量的值是指针，这个值因为是常量，所以不能被赋值。

- 在C/C++中，指针常量这样声明：

	int a;
	int *const b = &a; //const放在指针声明操作符的右侧

### 指向常量的指针常量

- 顾名思议，指向常量的指针常量就是一个常量，且它指向的对象也是一个常量。

- 因为是一个指针常量，那么它指向的对象当然是一个指针对象，而它又指向常量，说明它指向的对象不能变化。

- 在C/C++中，这么声明：

    const int a = 25;
    const int * const b = &a;

## 指针函数&函数指针

### 指针函数

- 先看下面的函数声明，注意，此函数有返回值，返回值为int *，即返回值是指针类型的。
	int *f(int a, int b);  
- 上面的函数声明又可以写成如下形式：
	int* f(int a, int b);

### 函数指针

- 顾名思义，函数指针说的就是一个指针，但这个指针指向的函数，不是普通的基本数据类型或者类对象。
- 函数指针的定义如下：
	int (*f)(int a, int b); // 声明函数指针  
- 通过与1中指针函数的定义对比可以看到，函数指针与指针函数的最大区别是函数指针的函数名是一个指针，即函数名前面有一个指针类型的标志型号“*”。
- 当然，函数指针的返回值也可以是指针。

#### 举例

```c++
#include<stdio.h>
float add(float x,float y)
{return (x+y);}
float sub(float x,float y)
{return (x-y);}
float mul(float x,float y)
{return (x*y);}
float div(float x,float y)
{return (x/y);}

float result(float x,float y,float(*pf)(float,float))
{
    float s;
    s=(*pf)(x,y);
    return s;
}

void main()
{
    float a,b,s;
    char op;
    printf("please select your operation (input +,-,*or/)\n");
    scanf("%c",&op);
    printf("please input the two operand\n");
    scanf("%f %f",&a,&b);
    switch(op)
   {
    case '+':s=result(a,b,add);break;
    case '-':s=result(a,b,sub);break;
    case '*':s=result(a,b,mul);break;
    case '/':s=result(a,b,div);break;
    }
    printf("the operation is :%f%c%f=%f\n",a,op,b,s);
}
```

#### 作用

- 通俗解释：

你有了一只手（函数指针），可以用来装备并切换武器打怪，比如可以装备刀子，或者装备棍子。当你的武器只有一种或者比较少的时候，可能这只手切换武器的功能不常用到。当到了后期，你的武器多了，那你因为有了这只能装备并切换武器的手，而可以更有效率的打怪。

- 正规解释：

便于分层设计、利于系统抽象、降低耦合度以及使接口与实现分开

- 参考资料 

[函数指针的好处、作用](http://blog.csdn.net/wujiangguizhen/article/details/17153495)