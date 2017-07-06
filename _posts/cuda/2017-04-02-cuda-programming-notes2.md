---
layout: post
title:  "【CUDA】《高性能编程CUDA实战》读书笔记2"
categories: CUDA
tags: cuda 高性能计算 notes
author: Tandy
---

* content
{:toc}

这篇博客主要是在学习《高性能编程CUDA实战》这本书的过程中的一些笔记整理和心得体会

![](http://nvidia.e-works.net.cn/NewsImages/129029212011562500.jpg)





## 写在前面

- 之前的内容都比较简单，感觉慢慢开始深入了，慢慢啃吧。

## 第七章：纹理内存

- 纹理内存（Texture Memory）：与常量内存一样，纹理内存是另一种只读内存，在特定的访问模式中，纹理内存同样能提升性能并减少内存流量。
- 与常量内存类似的是，纹理内存同样缓存在芯片上，因此在某些情况中，它能减少对内存的请求并提供更高效率的内存带宽。纹理内存是专门为那些在内存访问模式中存在大量空间局部性（Spatial Locality）的图形应用程序而设计的。在某个计算应用程序中，这意味着一个线程读取的位置可能与邻近线程读取的位置“非常接近”。

### 热传导模拟

- 一个物理模拟问题，就是计算格网中每个单元的温度随时间的变化情况。
- 首先给出更新流程的基本介绍：
	1. 给定一个包含初始输入温度的格网，将其作为热源的单元温度值复制到格网相应的单元中。这将覆盖这些单元之前计算的温度，因此也就确保了“加热单元将保持恒温”这个条件。这个复制操作是在copy_const_kernel()中执行的。
	2. 给定一个输入温度格网，根据等式7.2中的更新公式计算输出温度格网。这个更新操作是在blend_kernel()中执行的。
	3. 将输入温度格网和输出温度格网交换，为下一个步骤的计算做好准备。当模拟下一个时间步时，在步骤2中计算得到得到输出温度格网将成为步骤1中的输入温度格网。

- 通过以下核函数将格网中的热源单元复制到输入格网中：

```c
__global__ void copy_const_kernel( float *iptr, const float* cptr ) {  
    int x = threadIdx.x + blockIdx.x * blockDim.x;  
    int y = threadIdx.y + blockIdx.y * blockDim.y;  
    int offset = x + y * blockDim.x * gridDim.x;  
      
    if (cptr[offset] != 0)iptr[offset] = cptr[offset];  
}  
```

- 更新温度的代码如下：

```c
__global__ void blend_kernel( float *outSrc,  
                              const float *inSrc ) {  
    int x = threadIdx.x + blockIdx.x * blockDim.x;  
    int y = threadIdx.y + blockIdx.y * blockDim.y;  
    int offset = x + y * blockDim.x * gridDim.x;  
  
    int left = offset - 1;  
    int right = offset + 1;  
    if (x == 0)   left++;  
    if (x == DIM-1) right--;   
  
    int top = offset - DIM;  
    int bottom = offset + DIM;  
    if (y == 0)   top += DIM;  
    if (y == DIM-1) bottom -= DIM;  
  
    outSrc[offset] = inSrc[offset] + SPEED * (inSrc[top] +  
                     inSrc[bottom] + inSrc[left] + inSrc[right] -  
                     inSrc[offset]*4);  
}  
```

### 使用纹理内存
- 这里使用浮点类型纹理的引用：

	texture<float>  texConstSrc;  
	texture<float>  texIn;  
	texture<float>  texOut; 

- 将这些变量绑定到内存缓冲区：
	- 将指定的缓冲区作为纹理来使用。
	- 将纹理引用作为纹理的“名字”

```c
HANDLE_ERROR( cudaMalloc( (void**)&data.dev_inSrc,  
                          imageSize ) );  
HANDLE_ERROR( cudaMalloc( (void**)&data.dev_outSrc,  
                          imageSize ) );  
HANDLE_ERROR( cudaMalloc( (void**)&data.dev_constSrc,  
                          imageSize ) );  

HANDLE_ERROR( cudaBindTexture( NULL, texConstSrc,  
                                   data.dev_constSrc,  
                                   imageSize ) );  
  
HANDLE_ERROR( cudaBindTexture( NULL, texIn,  
                                   data.dev_inSrc,  
                                   imageSize ) );  
  
HANDLE_ERROR( cudaBindTexture( NULL, texOut,  
                                   data.dev_outSrc,  
                                   imageSize ) );  
```

- 释放缓存：

```c
void anim_exit( DataBlock *d ) {  
    cudaUnbindTexture( texIn );  
    cudaUnbindTexture( texOut );  
    cudaUnbindTexture( texConstSrc );  
    HANDLE_ERROR( cudaFree( d->dev_inSrc ) );  
    HANDLE_ERROR( cudaFree( d->dev_outSrc ) );  
    HANDLE_ERROR( cudaFree( d->dev_constSrc ) );  
  
    HANDLE_ERROR( cudaEventDestroy( d->start ) );  
    HANDLE_ERROR( cudaEventDestroy( d->stop ) );  
}
```

### 使用二维纹理内存

- 声明二维纹理引用

	texture<float,2>  texConstSrc;  
	texture<float,2>  texIn;  
	texture<float,2>  texOut;  

- 下面附上完整的源代码已经最终的运行效果图

```c
#include "../common/book.h"
#include "../common/cpu_anim.h"

#define DIM 1024
#define PI 3.1415926535897932f
#define MAX_TEMP 1.0f
#define MIN_TEMP 0.0001f
#define SPEED 0.25f

__global__ void blend_kernel(float *outSrc, const float *inSrc) {
	// map from threadIdx/blockIdx to pixel position
	int x = threadIdx.x + blockIdx.x * blockDim.x;
	int y = threadIdx.y + blockIdx.y * blockDim.y;
	int offset = x + y * blockDim.x * gridDim.x;

	int left = offset - 1;
	int right = offset + 1;
	if (x == 0) left++;
	if (x == DIM - 1) right--;

	int top = offset - DIM;
	int bottom = offset + DIM;
	if (y == 0) top += DIM;
	if (y == DIM - 1) bottom -= DIM;

	outSrc[offset] = inSrc[offset] + SPEED * (inSrc[top] + inSrc[bottom] + inSrc[left] + inSrc[right] - inSrc[offset] * 4);
}

__global__ void copy_const_kernel(float *iptr, const float *cptr) {
	// map from threadIdx/blockIdx to pixel position
	int x = threadIdx.x + blockIdx.x * blockDim.x;
	int y = threadIdx.y + blockIdx.y * blockDim.y;
	int offset = x + y * blockDim.x * gridDim.x;

	if (cptr[offset] != 0) iptr[offset] = cptr[offset];
}

// globals needed by the update routine
struct DataBlock {
	unsigned char	*output_bitmap;
	float			*dev_inSrc;
	float			*dev_outSrc;
	float			*dev_constSrc;
	CPUAnimBitmap	*bitmap;
	cudaEvent_t		start, stop;
	float			totalTime;
	float			frames;
};

void anim_gpu(DataBlock *d, int ticks) {
	HANDLE_ERROR(cudaEventRecord(d->start, 0));
	dim3	blocks(DIM / 16, DIM / 16);
	dim3	threads(16, 16);
	CPUAnimBitmap	*bitmap = d->bitmap;

	for (int i = 0; i<90; i++) {
		copy_const_kernel << <blocks, threads >> >(d->dev_inSrc, d->dev_constSrc);
		blend_kernel << <blocks, threads >> >(d->dev_outSrc, d->dev_inSrc);
		swap(d->dev_inSrc, d->dev_outSrc);
	}
	float_to_color << <blocks, threads >> >(d->output_bitmap, d->dev_inSrc);

	HANDLE_ERROR(cudaMemcpy(bitmap->get_ptr(), d->output_bitmap, bitmap->image_size(), cudaMemcpyDeviceToHost));
	HANDLE_ERROR(cudaEventRecord(d->stop, 0));
	HANDLE_ERROR(cudaEventSynchronize(d->stop));
	float elapsedTime;
	HANDLE_ERROR(cudaEventElapsedTime(&elapsedTime, d->start, d->stop));

	d->totalTime += elapsedTime;
	++d->frames;
	printf("Average time per frame: %3.1f ms\n", d->totalTime / d->frames);
}

void anim_exit(DataBlock *d) {
	cudaFree(d->dev_inSrc);
	cudaFree(d->dev_outSrc);
	cudaFree(d->dev_constSrc);

	HANDLE_ERROR(cudaEventDestroy(d->start));
	HANDLE_ERROR(cudaEventDestroy(d->stop));
}

int main(void) {
	DataBlock	data;
	CPUAnimBitmap bitmap(DIM, DIM, &data);
	data.bitmap = &bitmap;
	data.totalTime = 0;
	data.frames = 0;
	HANDLE_ERROR(cudaEventCreate(&data.start));
	HANDLE_ERROR(cudaEventCreate(&data.stop));

	HANDLE_ERROR(cudaMalloc((void**)&data.output_bitmap, bitmap.image_size()));

	// assume float == 4 chars in size (ie., rgba)
	HANDLE_ERROR(cudaMalloc((void**)&data.dev_inSrc, bitmap.image_size()));
	HANDLE_ERROR(cudaMalloc((void**)&data.dev_outSrc, bitmap.image_size()));
	HANDLE_ERROR(cudaMalloc((void**)&data.dev_constSrc, bitmap.image_size()));

	float *temp = (float*)malloc(bitmap.image_size());
	for (int i = 0; i<DIM*DIM; i++) {
		temp[i] = 0;
		int x = i % DIM;
		int y = i / DIM;
		if ((x>300) && (x<600) && (y>310) && (y<601))
			temp[i] = MAX_TEMP;
	}
	temp[DIM * 100 + 100] = (MAX_TEMP + MIN_TEMP) / 2;
	temp[DIM * 700 + 100] = MIN_TEMP;
	temp[DIM * 300 + 300] = MIN_TEMP;
	temp[DIM * 200 + 700] = MIN_TEMP;
	for (int y = 800; y<900; y++) {
		for (int x = 400; x<500; x++) {
			temp[x + y*DIM] = MIN_TEMP;
		}
	}
	HANDLE_ERROR(cudaMemcpy(data.dev_constSrc, temp, bitmap.image_size(), cudaMemcpyHostToDevice));

	for (int y = 800; y<DIM; y++) {
		for (int x = 0; x<200; x++) {
			temp[x + y*DIM] = MAX_TEMP;
		}
	}
	HANDLE_ERROR(cudaMemcpy(data.dev_inSrc, temp, bitmap.image_size(), cudaMemcpyHostToDevice));

	free(temp);

	bitmap.anim_and_exit((void(*)(void*, int))anim_gpu, (void(*)(void*))anim_exit);
}
```
![Markdown](http://i2.kiimg.com/599048/d826c5e332e1a494.gif)

### 本章小结

- 二维纹理和一维纹理，性能基本相同
- 当使用二维纹理的时候，代码会整洁一些，并且能自动处理边界问题

## 关于这本书
- 这里附上书的封面
![](http://images.bookuu.com/book/C/01109/97871113267931932116-fm.jpg)

- 电子版的[链接](http://www.baidu.com/link?url=Go4Ha_3SRB_IdIb3x2gHwNUvctWGj2AdR--fhk3QhgkgT-lgfb6ua_gifBR8awSW&wd=&eqid=9fc0238f000009de00000004595c892f)

## 参考资料

- [CUDA C Programming Guide](http://docs.nvidia.com/cuda/cuda-c-programming-guide/#axzz4lmcT5WbP)
- [《GPU高性能编程CUDA实战》学习笔记](http://blog.csdn.net/w09103419/article/details/52473429)
- [CUDA从入门到精通](http://blog.csdn.net/kkk584520/article/details/9413973)


