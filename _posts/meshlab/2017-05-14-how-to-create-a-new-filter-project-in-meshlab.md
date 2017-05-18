---
layout: post
title: 【Meshlab开发】创建一个新的filter插件
categories: Meshlab
tags:  Meshlab 3d
author: Tandy
---

* content
{:toc}

关于meshlab上的开发基本上都是基于插件的形式，两种主要的插件edit和filter，今天介绍一下filter插件的创建过程



## 目的

- 为了实现一个像下图那样的根选项

	![]({{ site.baseurl }}/images/201705/23.png)

## 具体实现

- 首先，在interface.h中添加如下：（注：编码不要重复）

	![]({{ site.baseurl }}/images/201705/24.png)

- 在mainwindow.h中添加如下：

	![]({{ site.baseurl }}/images/201705/25.png)

- 在mainwindow_Init.cpp中添加如下：

	- void MainWindow::fillFilterMenu()：（这个表示要添加代码的函数）

    ![]({{ site.baseurl }}/images/201705/26.png)

	- void MainWindow::fillFilterMenu()：

	![]({{ site.baseurl }}/images/201705/27.png)

	![]({{ site.baseurl }}/images/201705/28.png)

- 在mainwindow_RunTime.cpp中添加如下：

	- void MainWindow::activateSubFiltersMenu( const bool create,const bool act )：

	![]({{ site.baseurl }}/images/201705/29.png)

## 最终效果：

	![]({{ site.baseurl }}/images/201705/31.png)

## 其他

- 如果想在根选项下添加子选项，可以对应filter插件的getClass(QAction *a) 函数中添加如下代码：

	![]({{ site.baseurl }}/images/201705/30.png)

- 更多详细信息请参考
	- [MeshLab中Filters菜单下插件的编写](http://blog.csdn.net/fightingbull/article/details/8103463)
