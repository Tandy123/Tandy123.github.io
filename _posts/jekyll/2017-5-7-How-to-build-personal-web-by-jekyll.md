---
layout: post
title: 【如何构建这个blog】利用github+jekyll构建个人博客
categories: Jekyll
tags:  Jekyll Blog ruby
author: Tandy
---

* content
{:toc}





>搞了一整天，终于把这个个人博客搞定了，做的这么辛苦，还是记录一下这个过程吧

先说一下我的环境：window7.0 64位+可翻墙网络

## 开通github博客

### 开通github账号

注册啥的就不说了，记住你的用户名，比如我是tandy123

注册完成之后，点击主页右上角的的加号，新建一个repository

![新建repository]({{ site.baseurl }}/images/201705/1.png)

在取名字的时候要注意要和自己的github用户名一致，如下所示，对我而言，这里的XXX就是tandy123

![新建repository]({{ site.baseurl }}/images/201705/2.png)

### 安装github客户端

[下载地址](https://desktop.github.com/)，这个地址特别坑，下了好多次都没下下来，而且还要在线安装，这里强烈建议安装离线版，下面这个是百度网盘地址

链接：[http://pan.baidu.com/s/1dE0URpZ](http://pan.baidu.com/s/1dE0URpZ) 密码：3wo2

安装之后，熟悉一下常用的操作，总结一下就是以下几点：

- 把github上的项目拷贝下来

![拷贝]({{ site.baseurl }}/images/201705/11.png "拷贝")

- 把本地修改过的版本上传

![提交]({{ site.baseurl }}/images/201705/12.png)

- 本地和线上同步

![同步]({{ site.baseurl }}/images/201705/13.png)

自己玩一玩，会了上面这些操作之后，就可以把之前创建的repository拷贝到本地，这时候这个repository里面还是空的，新建一个测试文件，命名为index.html（**一定要命名为这个**），具体内容如下：

    <!DOCTYPE html>
    <html>
    <body>
    <h1>这是我使用github pages搭建的个人站点。</h1>
    </body>
    </html>

保存，然后打开客户端，在提交Summary框内填些东西，然后点击Commot to master完成提交

![提交]({{ site.baseurl }}/images/201705/3.png)

这时候还没结束，还要点击右上角的Sync按钮，实现本地和线上的同步

![同步]({{ site.baseurl }}/images/201705/4.png)

此时，打开浏览器，输入XXX.github.io（**XXX是用户名**）就可以看到自己的主页了，有时候同步比较慢，要稍微等一下

![测试]({{ site.baseurl }}/images/201705/5.png)


当然，这样一个博客肯定是不能让人满意的，我们还要对他做很多修改，好在有个强大的工具帮我们省去了很多时间——jekyll

## 安装Jekyll

关于jekyll的安装，网上有很多详细的介绍，我这里简单说一下windows平台下的安装

### 安装ruby

下载rubyinstaller（[Ruby安装文件下载地址](http://rubyinstaller.org/downloads/)），推荐下载2.2的版本，直接安装，添加path环境变量的选项最好勾上，这样就可以随时随地使用ruby

![ruby]({{ site.baseurl }}/images/201705/6.png)

测试一下是否安装成功，任意一个路径下，执行如下命令行：

![测试]({{ site.baseurl }}/images/201705/14.png)

### 安装Ruby DevKit

（[同ruby下载地址相同](http://rubyinstaller.org/downloads/)）选择对应的版本，我选择的是64位的版本，下载双击解压之后，在解压目录下打开命令窗口，输入如下命令：

    ruby dk.rb init

此时目录下会生成一个“config.yml”文件，用文本编辑工具打开，根据提示，加上两行，对应的是ruby的安装目录

![config.yml]({{ site.baseurl }}/images/201705/7.png)

然后执行如下语句：

    ruby dk.rb install

### 安装RubyGems

下载下来([下载地址](https://rubygems.org/pages/download))解压之后，用以下命令安装

    ruby setup.rb

以后如果要更新的话，可以通过下面的命令行：

    gem update --system 

### 安装jekyll

在命令行窗口执行如下命令安装jekyll

    gem install jekyll

等一会之后，就会提示安装完成，这个过程可能比较久

### 测试jekyll

    jekyll new myblog

我执行到这里的时候会报错，提示“It looks like you don't have bundler or one of its dependencies installed.”执行下列命令解决问题：

    gem install bundler

重新执行jekyll new myblog，此时不出意外的话，会在当前执行命令的目录下生成一个文件夹myblog，里面默认会有一些和jekyll有关的东西

进入myblog，执行如下命令：

    jekyll serve

我执行这一步的时候又出错了，Google一下发现可能是4000端口被占用了，万恶的福晰阅读器，果然是他的问题，直接从任务管理器里面把fxService给停止了，问题解决

![fxService]({{ site.baseurl }}/images/201705/1.jpg)

![fxService]({{ site.baseurl }}/images/201705/8.png)

从浏览器里打开127.0.0.1：4000，可以看到如下默认网页，说jekyll服务器正常运行

![默认网页]({{ site.baseurl }}/images/201705/9.png)

## 套用模板

讲了半天jekyll，最终的目的还是为了服务于我们在github上的个人博客

为了方便我们把精力放在博客的写作上，jekyll为我们提供了丰富的[博客模板](http://jekyllthemes.org/)，把模板下到本地之后，放到自己的个人主页文件夹里，通过github的提交同步之后，就可以通过XXX.github.io访问新的主页了

jekyll之所以方便不仅仅在于提供了大量的模板，而且模板的修改十分简单，自己捣鼓几下就基本明白了，自己写的博客主要都放在_posts文件夹里，这样维护起来十分方便，jekyll里的博客都是markdown格式的，刚开始用这个格式写博客可能会有点不习惯，windows下建议下载一个MarkdownPad编辑器，每次改完博客之后都可以主页目录下执行 jekyll serve 看看效果，满意之后在上传github

最后附上我的[个人博客](https://tandy123.github.io/)

![我的博客]({{ site.baseurl }}/images/201705/10.png)

目前还是空空，以后一定要多些写东西，加油！