---
layout: post
title:  "windows下的Github入门教程"
categories: GitHub
tags:  github
author: Tandy
---

* content
{:toc}

关于github的使用，感觉网上很多教程说的一点都不直接，我主要针对windows用户，如何快速上手github




## 准备工作

- 首先注册一个github的账号

	- [github官网](https://github.com/)

## 新建Repository

- 然后打开自己的主页，最上方有这么几个东西，其中这个Repository就是你的仓库，你可以新建很多个仓库，反正不用钱

![Repository]({{ site.baseurl }}/images/201705/32.png)

- 点击右上方的加号，就可以新建一个仓库了

![新建Repository]({{ site.baseurl }}/images/201705/33.png)

- 名字随便取，这里我取Test，信息直接默认就行了

![Repository]({{ site.baseurl }}/images/201705/34.png)

- 这时候你再去首页的repository里看就有这个Test仓库了，点进去看看

![Repository]({{ site.baseurl }}/images/201705/35.png)

- 发现一堆莫名其妙的东西，其实是啥都没有，因为你还没往里面加东西

![Repository]({{ site.baseurl }}/images/201705/36.png)

## 安装github客户端

- 这时候，就要用windows下的神器了，github for windows，这个客户端贼难下载，建议直接用下面的百度云下载
	
	- 链接：[http://pan.baidu.com/s/1dE0URpZ](http://pan.baidu.com/s/1dE0URpZ) 密码：3wo2
	
- 下载之后解压就能直接用了，就像这么个东西

![github for windows]({{ site.baseurl }}/images/201705/37.png)

## 在本地同步Repository

- 回到上面的一个问题，怎么往之前创建的Test仓库里添加内容呢？首先在客户端上登陆自己的github账号，然后点击左上角的加号这里，选择Clone选项卡，就可看到之间创建的Test仓库，点击下面的Clone repository

![github for windows]({{ site.baseurl }}/images/201705/38.png)

- 接下来会让你选择本地的目录，这个目录是用来放你Clone下的这个Test仓库的，像下面这样就是Clone完成了，接下去你进到本地的这个Test仓库里，发现时空的，啥也没有

![Repository]({{ site.baseurl }}/images/201705/39.png)

- 随便新建一个文本，保存

![Repository]({{ site.baseurl }}/images/201705/40.png)

- 再回到客户端，发现机智的github客户端已经提醒你仓库发生了一些变化了，往Summary里随便写点东西，当然实际中不能太随便，这些一般都是更新代码的描述，然后点击Commit to master，完成提交

![Repository]({{ site.baseurl }}/images/201705/41.png)

- 看到这么一个提示栏

![Repository]({{ site.baseurl }}/images/201705/42.png)

- 事情还没结束，再点击右上方的一个小按钮，静静地等待进度条走完才算完事

![Repository]({{ site.baseurl }}/images/201705/43.png)

- 最后验证一下我们的代码是不是已经提交到云端了，打开浏览器里，回到线上的github，进到Test仓库里，果然多了一个test.txt文件，打开看看，啥也看不到，因为github上解析txt会乱码，无所谓了，反正就是个备份，下次换个电脑，重新考下来在本地就可以看了，反正基本上所有的编辑都是在本地进行的，你可以把云端看成是一个用于备份同步的地方

![Repository]({{ site.baseurl }}/images/201705/44.png)


## 总结

- 这里介绍的是最基本的github版本管理中的提交同步功能，也是最常用的功能，当然github的强大远不止这些，自己在摸索中慢慢体会吧。

## 补充

- 如果想对GitHub有更深入的了解，可以试着用github建个主页或者博客玩玩，具体可以参一下博客：

	- [【如何构建这个blog】利用github+jekyll构建个人博客](http://tangdeyan.me/2017/05/07/How-to-build-personal-web-by-jekyll/)