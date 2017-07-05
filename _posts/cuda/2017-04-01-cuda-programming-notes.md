---
layout: post
title:  "【CUDA】《高性能编程CUDA实战》读书笔记"
categories: CUDA
tags: cuda 高性能计算 notes
author: Tandy
---

* content
{:toc}

这篇博客主要是在学习《高性能编程CUDA实战》这本书的过程中的一些笔记整理和心得体会

![](http://nvidia.e-works.net.cn/NewsImages/129029212011562500.jpg)





## 写在前面

- 第一次接触CUDA是因为科学计算可视化的课程大作业，当时要做一个Marching Cube的实例，从师兄师姐那里知道了用CUDA可以实现，当时才发现这东西这么好用，可惜后来结课以后，因为项目的原因没有时间继续学习，这次找来了一本《高性能编程CUDA实战》的书，打算系统地学一学CUDA，正好也一直想学学高大上的高性能计算，那就从CUDA入门了。
- 书中所有代码我都手打了一遍，放在了github下的[CUDA](https://github.com/Tandy123/CUDA/)工程里。

## 第一章：为什么需要CUDA

- 近年来英伟达在CUDA上float运算性能基本上已经超过了cpu，并且gpu（Graphics Procdss Unit）编程难度也接近cpu编程。NVIDIA GPU是基于CUDA架构而建成，gpu可以完成传统图形渲染和通用计算任务。cuda gpu编程需要使用cuda C语言，cuda c语言本质是c的拓展，使其能够在NVIDIA GPU这样大规模并行机器上进行编程。
- 总之，计算机业界正处于并行计算的革命中，NVIDIA的CUDA C已经成为实现并行计算的最成功语言之一。
- 应用： 医学图像（超声波成像技术）、计算流体动力学、环境科学

## 第二章：入门

这章主要讲CUDA开发环境的配置，书中讲到的版本都有点过时了，直接去官网上下载安装就行了。

## 第三章：CUDA C简介

- 这一章节，作者从一个最简单的例子讲解CUDA C的基本语法，其中包括以下几点：
	- 核函数的调用：修饰符__global__、<<<1,1>>>
	- 传递参数：CUDA可以像C函数那样将参数传递给核函数，当设备执行任何有用的操作的时候，都需要分配内存。
	- 查询设备信息：CUDA设备属性及对应描述如下表所示
	- 设备属性的使用：应用程序可以从多个GPU中选择最合适的GPU

| 设 备 属 性        		| 描　　述        	|
| ------------- 			|:-------------:|
|char name[256];			|标识设备的ASCII字符串（例如， "GeForce GTX 280"）|
|size_t totalGlobalMem		|设备上全局内存的总量，单位为字节|
|size_t sharedMemPerBlock	|在一个线程块（ Block）中可使用的最大共享内存数量，单位为字节|
|int regsPerBlock      		|每个线程块中可用的32位寄存器数量|
|int warpSize          		|在一个线程束（ Warp）中包含的线程数量|
|size_t memPitch       		|在内存复制中最大的修正量（ Pitch），单位为字节|
|int maxThreadsPerBlock  	|在一个线程块中可以包含的最大线程数量|
|int maxThreadsDim[3]   	|在多维线程块数组中，每一维可以包含的最大线程数量|
|int maxGridSize[3]   		|在一个线程格（ Grid）中，每一维可以包含的线程块数量|
|size_t totalConstMem 		|常量内存的总量|
|int major                  |设备计算功能集（ Compute Capability）的主版本号|
|int minor                  |设备计算功能集的次版本号|
|size_t textureAlignment    |设备的纹理对齐（ Texture Alignment）要求|
|int deviceOverlap          |一个布尔类型值，表示设备是否可以同时执行一个cudaMemory()调用和一个核函数调用|
|int multiProcessorCount    |设备上多处理器的数量|
|int kernelExecTimeoutEnabled|一个布尔值，表示在该设备上执行的核函数是否存在运行时限制|
|int integrated             |一个布尔值，表示设备是否是一个集成GPU（即该GPU属于芯片组的一部分而非独立的GPU）|
|int canMapHostMemory       |一个布尔类型的值，表示设备是否将主机内存映射到CUDA设备地址空间|
|int computeMode           	|表示设备的计算模式：默认（ Default），独占（ Exclusive），或者禁止（ Prohibited）|
|int maxTexture1D           |一维纹理的最大大小|
|int maxTexture2D[2]        |二维纹理的最大维数|
|int maxTexture3D[3]        |三维纹理的最大维数|
|int maxTexture2DArray[3]   |二维纹理数组的最大维数|
|int concurrentKernels      |一个布尔类型值，表示设备是否支持在同一个上下文中同时执行多个核函数

- 几个重要的概念：
	- 主机：CPU以及系统的内存
	- 设备：GPU及其内存
- 几个重要的函数：
	- cudaMalloc()：对应C中的malloc()
	- cudaMemcpy()：对应C中的memcpy()
	- cudaFree()：对应C中的free()
- 需要注意的地方：一定不能在主机代码中对cudaMalloc()返回的指针进行解引用。主机代码可以将这个指针作为参数传递，对其进行算术运算，甚至可以将其转换成为另外一种不同的类型。但是，绝对不可以使用这个指针来读取或者写入内存。即在书上的那个例子中不能这么搞：  
	printf("2 + 7 = %d\n", *dev_c);
- 总结一句话：主机指针只能访问主机代码中的内存，而设备指针也只能访问设备代码中的内存。

## 第四章：CUDA C并行编程

- \<\<\<a,b\>\>\>：尖括号的第一个参数表示设备在执行核函数时使用的并行线程块的数量，具体可参考[Kernel 参数介绍](http://blog.csdn.net/w09103419/article/details/52451172)
- 矢量求和的例子

```c
#include "../common/book.h"
#define N 10

__global__ void add(int *a, int *b, int *c) {
	int tid = blockIdx.x;
	if (tid < N) {
		c[tid] = a[tid] + b[tid];
	}
}
int main(void) {
	int a[N], b[N], c[N];
	int *dev_a, *dev_b, *dev_c;

	//在GPU上分配内存
	HANDLE_ERROR(cudaMalloc((void**)&dev_a, N * sizeof(int)));
	HANDLE_ERROR(cudaMalloc((void**)&dev_b, N * sizeof(int)));
	HANDLE_ERROR(cudaMalloc((void**)&dev_c, N * sizeof(int)));

	//在CPU上为数组a和b赋值
	for (int i = 0; i < N; i++) {
		a[i] = -i;
		b[i] = i * i;
	}
	//将数组a和b复制到GPU
	HANDLE_ERROR(cudaMemcpy(dev_a, a, N * sizeof(int), cudaMemcpyHostToDevice));
	HANDLE_ERROR(cudaMemcpy(dev_b, b, N * sizeof(int), cudaMemcpyHostToDevice));
	HANDLE_ERROR(cudaMemcpy(dev_c, c, N * sizeof(int), cudaMemcpyHostToDevice));

	add <<<N, 1 >>> (dev_a, dev_b, dev_c);
	
	//将数组c从GPU复制到CPU
	HANDLE_ERROR(cudaMemcpy(c, dev_c, N * sizeof(int), cudaMemcpyDeviceToHost));

	for (int i = 0; i < N; i++) {
		printf("%d + %d = %d\n", a[i], b[i], c[i]);
	}

	cudaFree(dev_a);
	cudaFree(dev_b);
	cudaFree(dev_c);

	return 0;
}
```
- 上面的代码使用了一些通用的模式：
	- 调用cudaMalloc()在设备上为三个数组分配内存：在其中两个数组（dev_a和dev_b）中包含了输入值，而在整数dev_c中包含了计算结果。
	- 为了避免内存泄露，在使用完GPU内存后通过CUDAFree()释放它们。
	- 通过cudaMemcpy()将输入数据复制到设备中，同时指定参数cudaMemcpyHostToDevice，在计算完成后，将计算结果通过参数cudaMemcpyDeviceToHost复制回主机。
	- 通过尖括号语法，在主机代码main()中执行add()中的设备代码。
- 需要注意的地方：在启动线程块数组时，数组每一维的最大数量都不能超过65535。这是一种硬件限制，如果启动的线程块数量超过了这个限制，那么程序将运行失败。
#### 用CUDA实现基于GPU的[Julia集](http://www.matrix67.com/blog/archives/292)
- 最终效果  
![Markdown](http://i4.piimg.com/599048/882c6dde81f3b03d.png)
- 效果还是很帅的，下面附上源码

```c
#include "../common/book.h"
#include "../common/cpu_bitmap.h"

#define DIM 1000

struct cuComplex {
	float r;
	float i;
	__device__ cuComplex(float a, float b) :r(a), i(b) {}
	__device__ float magnitude2(void) {
		return r*r + i*i;
	}
	__device__ cuComplex operator*(const cuComplex& a) {
		return cuComplex(r * a.r - i * a.i, i * a.r + r * a.i);
	}
	__device__ cuComplex operator+(const cuComplex& a) {
		return cuComplex(r + a.r, i + a.i);
	}
};

__device__ int julia(int x, int y) {
	const float scale = 1.5;
	float jx = scale * (float)(DIM / 2 - x) / (DIM / 2);
	float jy = scale * (float)(DIM / 2 - y) / (DIM / 2);

	cuComplex c(-0.8, 0.156);
	cuComplex a(jx, jy);

	int i = 0;
	for (i = 0; i <= 200; i++) {
		a = a * a + c;
		if (a.magnitude2() > 1000)
			return 0;
	}
	return 1;
} 

__global__ void kernel(unsigned char *ptr) {
	int x = blockIdx.x;
	int y = blockIdx.y;
	int offset = x + y * gridDim.x;

	int juliaValue = julia(x, y);
	ptr[offset * 4 + 0] = 255 * juliaValue;
	ptr[offset * 4 + 1] = 0;
	ptr[offset * 4 + 2] = 0;
	ptr[offset * 4 + 3] = 255;
}

int main() {
	CPUBitmap bitmap(DIM, DIM);
	unsigned char* dev_bitmap;
	HANDLE_ERROR(cudaMalloc((void**)&dev_bitmap, bitmap.image_size()));

	dim3 grid(DIM, DIM);
	kernel << <grid, 1 >> > (dev_bitmap);

	HANDLE_ERROR(cudaMemcpy(bitmap.get_ptr(), dev_bitmap, bitmap.image_size(), cudaMemcpyDeviceToHost));

	bitmap.display_and_exit();
	HANDLE_ERROR(cudaFree(dev_bitmap));
}
```

- 需要注意的地方：书上这里有个bug，它在定义结构体cuComplex，没有把初始化放在device中，导致一直报错：
 
	calling a host function("cuComplex::cuComplex") from a __device__/__global__ function("julia") is not allowed

google之后，发现了这个问题，在cuComplex(float a, float b) : r(a), i(b) {}前面要加上__device__就行了
- 书中代码的报错除了敲错代码之外，很有可能是没有引用外部库：glut32.lib

## 第五章：线程协作

- add\<\<\<N, 1\>\>\>(dev_a, dev_b, dev_c);尖括号中：N---开启了N个线程块；1---每个线程块中创建1个线程。具体可参考[Kernel 参数介绍](http://blog.csdn.net/w09103419/article/details/52451172)
#### 在GPU上对更长的矢量求和
- 第四章，说线程块数量不超过65535，同样，对应线程块中的线程数量，硬件也作出了限制 maxThreadPerBlock。
- 现在，我们需要多线程块并且每个线程块中包含了多个线程，计算索引的方法类似于二维索引空间转换为线性空间的标准算法。

	int tid = threadIdx.x + blockIdx.x * blockDim.x;
	gridDim是二维的：保存线程格中每一维的线程块数量
	blockDim是三维的：保存线程块中每一维的线程数量

- 唯一索引： 将线程块索引（blockIdx.x） * 每个线程块中的线程数量（blockDim.x） +  线程在线程块中的索引（threadIdx.x）。
- 为了避免 N/blockDim.x < 0, 我们计算采取 （N+blockDim.x-1)/blockDim.x  避免 线程块数为0.

#### 在GPU上使用线程实现波纹效果
- 最终效果  
![Markdown](http://i4.piimg.com/599048/03fc188d41971931.gif)
- 下面附上源码

#### 共享内存和同步
- 个人觉得这一章节很重要
- CUDA C的关键字__share__添加到变量声明中，这将使这个变量驻留在共享内存中，可以使得一个线程块中的多个线程能够在计算上进行通信和协作。
- 如果想要在线程之间进行通信，那么还需要一种机制来实现线程之间的同步。不然可能会产生竞态条件（Race Condition），在这种情况下，代码执行结果的正确性将取决于硬件的不确定性。
- 下面是利用CUDA实现的点积运算代码

```c
#include "../common/book.h"

#define imin(a, b) (a < b?a:b)

const int N = 100 * 1024;
const int threadsPerBlock = 256;
const int blocksPerGrid = imin(32, (N + threadsPerBlock - 1)/threadsPerBlock);

__global__ void dot(float *a, float *b, float *c) {
	__shared__ float cache[threadsPerBlock];
	int tid = threadIdx.x + blockIdx.x * blockDim.x;
	int cacheIndex = threadIdx.x;

	float temp = 0;
	while (tid < N) {
		temp += a[tid] * b[tid];
		tid += blockDim.x * gridDim.x;
	}

	cache[cacheIndex] = temp;
	//对线程块中的线程进行同步
	__syncthreads();
	//对于规约运算来说，以下代码要求threadsPerBlock必须是2的指数
	int i = blockDim.x / 2;
	while (i != 0) {
		if (cacheIndex < i) {
			cache[cacheIndex] += cache[cacheIndex + i];
		}
		__syncthreads();
		i /= 2;
	}
	if (cacheIndex == 0) {
		c[blockIdx.x] = cache[0];
	}
}

int main() {
	float *a, *b, c, *partial_c;
	float *dev_a, *dev_b, *dev_partial_c;

	a = (float*)malloc(N * sizeof(float));
	b = (float*)malloc(N * sizeof(float));
	partial_c = (float*)malloc(blocksPerGrid * sizeof(float));

	HANDLE_ERROR(cudaMalloc((void**)&dev_a, N * sizeof(float)));
	HANDLE_ERROR(cudaMalloc((void**)&dev_b, N * sizeof(float)));
	HANDLE_ERROR(cudaMalloc((void**)&dev_partial_c, N * sizeof(float)));

	for (int i = 0; i < N; ++i) {
		a[i] = i;
		b[i] = i * 2;
	}

	HANDLE_ERROR(cudaMemcpy(dev_a, a, N * sizeof(float), cudaMemcpyHostToDevice));
	HANDLE_ERROR(cudaMemcpy(dev_b, b, N * sizeof(float), cudaMemcpyHostToDevice));

	dot <<<blocksPerGrid, threadsPerBlock >>> (dev_a, dev_b, dev_partial_c);

	HANDLE_ERROR(cudaMemcpy(partial_c, dev_partial_c, blocksPerGrid * sizeof(float), cudaMemcpyDeviceToHost));//注意这里开辟空间的大小

	c = 0;
	for (int i = 0; i < blocksPerGrid; i++) {
		c += partial_c[i];
	}

#define sum_squares(x) (x*(x + 1)* (2 * x + 1)/6)
	printf("Does GPU value %.6g = %.6g?\n", c, 2 * sum_squares((float)(N - 1)));

	cudaFree(dev_a);
	cudaFree(dev_b);
	cudaFree(dev_partial_c);

	free(a);
	free(b);
	free(partial_c);
}
```

- 针对点积运算程序的分析：

	__shared__ float cache[threadsPerBlock];

- 这个共享的cache在每个进程块中都有一个，对于某个进程快，其中所有的线程共享一个cache。
- 为了保证这里cache的读写安全，因为他是共享的，可能会出问题，所以需要使用__syncthreads()来对线程进行同步。
- 最后的求和用了一个规约的技巧

```c
int i = blockDim.x / 2;
while (i != 0) {
	if (cacheIndex < i) {
		cache[cacheIndex] += cache[cacheIndex + i];
	}
	__syncthreads();
	i /= 2;
}
```

- 对于某个线程块，线程的数量和cache内存的数量是一样的，同时每个线程对应一个cache的值，可以将cache[]中的两个值加起来，然后把结果保存回cache，覆盖掉索引靠前的那个值，这样不断迭代，最后cache[0]就是当前线程块中的cache求和的结果，规约运算可以用下面这张图直观地表示  
![Markdown](http://i4.piimg.com/599048/340f05c9239e087c.jpg)

- 最后经过规约，我们得到了和线程块数量一样多的cache[0]，返回这些cache[0]到主机，通过CPU进行求和得到最终的结果，这一步为什么不在GPU上做呢？作者的解释是：事实证明，像GPU这种大规模的并行机器在执行最后的规约步骤时，通常会浪费资源，以为此时的数据集往往非常小。

#### （不正确的）点积运算优化
- 注意__sycthreads()的使用：

```c
while (i != 0) {
	if (cacheIndex < i) {
		cache[cacheIndex] += cache[cacheIndex + i];
	}
	__syncthreads();
	i /= 2;
}
```

如果把上面这段代码改成：

```c
while (i != 0) {
	if (cacheIndex < i) {
		cache[cacheIndex] += cache[cacheIndex + i];
__syncthreads();
	}
	i /= 2;
}
```

- 看似只等待那些需要写入共享内存的线程，然而实际上，却导致程序被挂起，原因是CUDA架构将确保，除非线程块中的每个线程都执行了__syncthreads()，否则没有任何线程能执行__syncthreads()之后的指令。所以，__syncthreads()虽然是一种强大的机制，但是由于可能出现意想不到的结果，我们在使用的时候一定要小心谨慎。

#### 基于共享内存的位图
- 又是一个有意思的例子，如果没有进行线程同步的话，得到的效果图如下  
![Markdown](http://i4.piimg.com/599048/e2746d202bc83232.png)
- 进行线程同步以后，得到的效果好多了  
![Markdown](http://i4.piimg.com/599048/69c05d8df1481cd7.png)

- 最后附上代码

```c
#include "../common/book.h"
#include "../common/cpu_bitmap.h"

#define DIM 1024
#define PI 3.1415926535897932f

__global__ void kernel(unsigned char* ptr) {
	int x = threadIdx.x + blockIdx.x * blockDim.x;
	int y = threadIdx.y + blockIdx.y * blockDim.y;
	int offset = x + y * blockDim.x * gridDim.x;

	__shared__ float shared[16][16];

	const float period = 128.0f;

	shared[threadIdx.x][threadIdx.y] =
		255 * (sinf(x * 2.0f * PI / period) + 1.0f) *
		(sinf(y * 2.0f * PI / period) + 1.0f) / 4.0f;

	//__syncthreads();

	ptr[offset * 4 + 0] = 0;
	ptr[offset * 4 + 1] = shared[15 - threadIdx.x][15 - threadIdx.y];
	//ptr[offset * 4 + 1] = shared[threadIdx.x][threadIdx.y];//让线程相互独立
	ptr[offset * 4 + 2] = 0;
	ptr[offset * 4 + 3] = 255;
}

int main(void) {
	CPUBitmap bitmap(DIM, DIM);
	unsigned char* dev_bitmap;

	HANDLE_ERROR(cudaMalloc((void**)&dev_bitmap, bitmap.image_size()));

	dim3 grids(DIM / 16, DIM / 16);
	dim3 threads(16, 16);
	kernel << <grids, threads >> > (dev_bitmap);
	HANDLE_ERROR(cudaMemcpy(bitmap.get_ptr(), dev_bitmap, bitmap.image_size(), cudaMemcpyDeviceToHost));

	bitmap.display_and_exit();
	cudaFree(dev_bitmap);
}
```

- 这里我自己又做了一个小实验，将线程改成彼此独立的，此时，无论是否同步，最终得到的位图都是一样的，和预期的结果一样。

## 常量内存与事件
- 由于GPU上包含有数百个数学计算单元，因此性能瓶颈通常并不在于芯片的数学计算吞吐量，而是在于芯片的内存带宽。由于在图形处理器上包含了非常多的数学逻辑单元（ALU），因此有时输入数据的速率甚至无法维持如此高的计算速率。因此，有必要研究一些手段来减少计算问题的内存通信量。常量内存的出现这是为了解决这个问题。

#### 光线跟踪简介
- 背景：光线跟踪是一种真实地显示物体的方法，该方法由Appe在1968年提出。光线跟踪方法沿着到达视点的光线的反方向跟踪，经过屏幕上每一个象素，找出与视线相交的物体表面点P0，并继续跟踪，找出影响P0点光强的所有光源，从而算出P0点上精确的光线强度，在材质编辑中经常用来表现镜面效果。光线跟踪或 称光迹追踪是计算机图形学的核心算法之一。在算法中，光线从光源被抛射出来，当他们经过物体表面的时候，对他们应用种种符合物理光学定律的变换。最终，光线进入虚拟的摄像机底片中，图片被生成出来。
- 【插播一段】光栅化和光线跟踪的区别：光栅化和光线跟踪的区别】
光栅化渲染就是先计算多边搜索形或三角形顶点的坐标变换,然后在多边形或三角形内填充纹理(同样是经过坐标变换),同时每个填充点也可以经过fragment shader计算来实现各种效果。光线追踪渲染就是假设屏幕上每一个点是一根一根向前的射线,计算这个射线打到了哪个多边形、平面或曲面上哪个位置,然后取出该点的纹理像素颜色。如果被打到的面带有反射或折射属性,那么还需要产生多根射线往下递归,最终经过blending算得最终像素颜色。如果遇到漫反射面的话一般是需要产生非常多的次级射线往下递归才能达到比较好的效果(否则噪点比较明显),如果需要模拟出光线打到玻璃或镜面上的效果,还需要计算photon map。而且搜寻一根射线跟一大堆多边形中哪一个相交也是非常耗时间的计算。所以光线追踪渲染的计算量非常大。

#### 在GPU上实现光线跟踪

- 【纠错】P75的代码

```c
if (t > maxz) {
	float fscale = n;
	r = s[i].r * fscale;
	g = s[i].g * fscale;
	b = s[i].b * fscale;
	maxz = t;//少了这一句
}
```

- 最终实现的效果  
![Markdown](http://i4.piimg.com/599048/4c8888d3e84f40b2.png)

- 上述算法通过性能测量得到的运行时间是5.6ms

- 利用常量内存可以得到同样的效果，运行时间是5.0ms，性能得到了明显的提升
- 【重要】常量内存可以带来性能的提升主要有两个原因：
	- 线程将在半线程束的广播中收到这个数据
	- 从常量内存缓存中收到数据
- 【概念】线程束：是指一个包含32个线程的集合

#### 使用事件来测量性能
- 【注意】这里的计时函数不适用于对同时包含设备代码和主机代码的混合代码计时
- 使用计时函数的格式如下：

```c
cudaEvent_t start, stop;
HANDLE_ERROR(cudaEventCreate(&start));
HANDLE_ERROR(cudaEventCreate(&stop));
HANDLE_ERROR(cudaEventRecord(start, 0));

// get stop time, and display the timing results
HANDLE_ERROR(cudaEventRecord(stop, 0));
HANDLE_ERROR(cudaEventSynchronize(stop));

......//被计时的代码

float elapsedTime;
HANDLE_ERROR(cudaEventElapsedTime(&elapsedTime, start, stop));
printf("Time to generate: %3.1f ms\n", elapsedTime);

HANDLE_ERROR(cudaEventDestroy(start));
HANDLE_ERROR(cudaEventDestroy(stop));
```

- 最后附上本章节的完整源代码

```c
#include "../common/book.h"
#include "../common/cpu_bitmap.h"

#define DIM 1024

#define rnd( x ) (x * rand() / RAND_MAX)
#define INF 2e10f

struct Sphere {
	float r, b, g;
	float radius;
	float x, y, z;
	__device__ float hit(float ox, float oy, float *n) {//该方法计算光线是否与这个球面相交，n应该是确定明暗用的，类似法向量，越靠中间值越大，周围比较小
		float dx = ox - x;
		float dy = oy - y;
		if (dx*dx + dy*dy < radius*radius) {
			float dz = sqrtf(radius*radius - dx*dx - dy*dy);
			*n = dz / sqrtf(radius*radius);
			return dz + z;
		}
		return -INF;
	}
};
#define SPHERES 20
__constant__ Sphere s[SPHERES];

__global__ void kernel(unsigned char* ptr) {
	// map from threadIdx/blockIdx to pixel position
	int x = threadIdx.x + blockIdx.x * blockDim.x;
	int y = threadIdx.y + blockIdx.y * blockDim.y;
	int offset = x + y * blockDim.x * gridDim.x;
	float ox = (x - DIM / 2);
	float oy = (y - DIM / 2);

	float r = 0, g = 0, b = 0;
	float maxz = -INF;
	for (int i = 0; i<SPHERES; i++) {
		float n;
		float t = s[i].hit(ox, oy, &n);
		if (t > maxz) {
			float fscale = n;
			r = s[i].r * fscale;
			g = s[i].g * fscale;
			b = s[i].b * fscale;
			maxz = t;
		}
	}

	ptr[offset * 4 + 0] = (int)(r * 255);
	ptr[offset * 4 + 1] = (int)(g * 255);
	ptr[offset * 4 + 2] = (int)(b * 255);
	ptr[offset * 4 + 3] = 255;
}

// globals needed by the update routine
struct DataBlock {
	unsigned char   *dev_bitmap;
	//Sphere          *s;
};

int main(void) {
	DataBlock   data;
	// capture the start time
	cudaEvent_t start, stop;
	HANDLE_ERROR(cudaEventCreate(&start));
	HANDLE_ERROR(cudaEventCreate(&stop));
	HANDLE_ERROR(cudaEventRecord(start, 0));

	CPUBitmap bitmap(DIM, DIM, &data);
	unsigned char   *dev_bitmap;
	//Sphere          *s;

	// allocate memory on the GPU for the output bitmap
	HANDLE_ERROR(cudaMalloc((void**)&dev_bitmap, bitmap.image_size()));

	// allocate memory fot the Sphere dataset
	//HANDLE_ERROR(cudaMalloc((void**)&s, sizeof(Sphere) * SPHERES));

	// allocate temp memory, initialize it, copy to
	// memory on the GPU, and the free our temp memory
	Sphere *temp_s = (Sphere*)malloc(sizeof(Sphere) * SPHERES);

	for (int i = 0; i<SPHERES; i++) {
		temp_s[i].r = rnd(1.0f);
		temp_s[i].g = rnd(1.0f);
		temp_s[i].b = rnd(1.0f);
		temp_s[i].x = rnd(1000.0f) - 500;
		temp_s[i].y = rnd(1000.0f) - 500;
		temp_s[i].z = rnd(1000.0f) - 500;
		temp_s[i].radius = rnd(100.0f) + 20;
	}

	//HANDLE_ERROR(cudaMemcpy(s, temp_s, sizeof(Sphere) * SPHERES, cudaMemcpyHostToDevice));
	HANDLE_ERROR(cudaMemcpyToSymbol(s, temp_s, sizeof(Sphere) * SPHERES));
	free(temp_s);

	// generate a bitmap from our sphere data
	dim3	grids(DIM / 16, DIM / 16);
	dim3	threads(16, 16);
	kernel << <grids, threads >> >(dev_bitmap);

	// get stop time, and display the timing results
	HANDLE_ERROR(cudaEventRecord(stop, 0));
	HANDLE_ERROR(cudaEventSynchronize(stop));

	float elapsedTime;
	HANDLE_ERROR(cudaEventElapsedTime(&elapsedTime, start, stop));
	printf("Time to generate: %3.1f ms\n", elapsedTime);

	HANDLE_ERROR(cudaEventDestroy(start));
	HANDLE_ERROR(cudaEventDestroy(stop));

	// copy our bitmap back from the GPU for display
	HANDLE_ERROR(cudaMemcpy(bitmap.get_ptr(), dev_bitmap, bitmap.image_size(), cudaMemcpyDeviceToHost));
	bitmap.display_and_exit();

	// free our memory
	cudaFree(dev_bitmap);
	//cudaFree(s);
}
```

## 总结
- 目前就看到这里，先消化一下，下次继续总结，加油！

## 关于这本书
- 这里附上书单封面
![](http://images.bookuu.com/book/C/01109/97871113267931932116-fm.jpg)

- 电子版的[链接](http://www.baidu.com/link?url=Go4Ha_3SRB_IdIb3x2gHwNUvctWGj2AdR--fhk3QhgkgT-lgfb6ua_gifBR8awSW&wd=&eqid=9fc0238f000009de00000004595c892f)

## 参考资料

- [《GPU高性能编程CUDA实战》学习笔记](http://blog.csdn.net/w09103419/article/details/52473429)
- [CUDA从入门到精通](http://blog.csdn.net/kkk584520/article/details/9413973)
- [CUDA C Programming Guide](http://docs.nvidia.com/cuda/cuda-c-programming-guide/#axzz4lmcT5WbP)

