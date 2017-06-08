---
layout:     post
title:      "【数字几何处理】牙齿侧面修复"
date:       2017-06-03 12:00:00
categories: polygon-mesh-processing
tags:  polygon-mesh-processing mesh teeth hole-filling 
author: Tandy
---

* content
{:toc}

这是一个利用切分洞和经典补洞算法实现的三维牙齿网格数据侧面修复的Demo：

![]({{ site.baseurl }}/images/demos/tooth_repair2.gif)




## 背景

从原始的牙颌三维模型上切割下来的牙齿三维数据，由于邻牙和牙龈遮挡的原因，在牙缝区域以及牙根区域存在缺失，这样的数据是不利于之后的牙齿模拟矫治方案的生成的，这里需要对牙齿进行修复操作

## 流程
- 导入待修复的牙齿数据
## 完整视频演示
- YouTube

<div style="max-width:10000px; margin:0 auto 10px;" >
<div 
style="position: relative; 
width:100%;
padding-bottom:56.25%; 
height:0;">
<iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"  src="https://www.youtube.com/embed/8lgq0SQ37Os" frameborder="0" allowfullscreen></iframe>
</div>
</div>

- 视频看不了，试试下面的

[![点这里播放视频]({{ site.baseurl }}/images/demos/tooth_repair2.png)](http://player.youku.com/embed/XMjgwNjYzNTU2OA==)

<div style="max-width:10000px; margin:0 auto 10px;" >
<div 
style="position: relative; 
width:100%;
padding-bottom:56.25%; 
height:0;">
<iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"  src="http://player.youku.com/embed/XMjgwNjYzNTU2OA==" frameborder="0" allowfullscreen></iframe>
</div>
</div>