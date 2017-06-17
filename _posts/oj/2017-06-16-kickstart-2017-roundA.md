---
layout:     post
title:      "KickStart 2017 Round A"
date:       2017-06-16 12:00:00
categories: Online-Judge
tags:  oj kickstart google English
author: Tandy
---

* content
{:toc}

Here is the solutino of KickStart 2017 Round A





# Problem A. Square Counting

### Problem
Mr. Panda has recently fallen in love with a new game called Square Off, in which players compete to find as many different squares as possible on an evenly spaced rectangular grid of dots. To find a square, a player must identify four dots that form the vertices of a square. Each side of the square must have the same length, of course, but it does not matter what that length is, and the square does not necessarily need to be aligned with the axes of the grid. The player earns one point for every different square found in this way. Two squares are different if and only if their sets of four dots are different.

Mr. Panda has just been given a grid with R rows and C columns of dots. How many different squares can he find in this grid? Since the number might be very large, please output the answer modulo 109 + 7 (1000000007).

### Input
The first line of the input gives the number of test cases, T. T lines follow. Each line has two integers R and C: the number of dots in each row and column of the grid, respectively.

### Output
For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is the number of different squares can be found in the grid.

### Limits
	1 ≤ T ≤ 100.

### Small dataset
	2 ≤ R ≤ 1000.
	2 ≤ C ≤ 1000.
### Large dataset
	2 ≤ R ≤ 109.
	2 ≤ C ≤ 109.
### Sample
	Input 
	4
	2 4
	3 4
	4 4
	1000 500
	Output 
	Case #1: 3
	Case #2: 10
	Case #3: 20
	Case #4: 624937395

The pictures below illustrate the grids from the three sample cases and a valid square in the third sample case.

![](https://code.google.com/codejam/contest/images/?image=sample1.png&p=5680283126857728&c=8284486)

![](https://code.google.com/codejam/contest/images/?image=sample2.png&p=5680283126857728&c=8284486)

![](https://code.google.com/codejam/contest/images/?image=sample3.png&p=5680283126857728&c=8284486)

## Analysis

### My Solution
It is not very hard to find the rule of  the number of the squares. Firstly, the number of  aligned squares S1 can be expressed as  the following formula:

![][1]

Then we find the number of oblique squares depend on the number of  aligned squares, When we find a aligned square whose side length is N, we can also find the number of its internal oblique square is N-1, as shown below:

![][2]

So the number of oblique squares S2 is:

![][3]

Add the above two formulas to get the total number of squares S3:

![][4]

So far, I think most people can write the following code:
```c++
#include <iostream> 
using namespace std;
const int mod = 1000000007;
void main() {
	int T, R, C;
	cin >> T;
	for (int i = 1; i <= T; ++i) {
		cin >> R >> C;
		long long res = 0;
		for (int j = 1; j < R && j < C; ++j) {
			res += (R - j)*(C - j)*j;
		}
		cout << "Case #" << i << ": " << res % mod << endl;
	}
}
```

After the submission, we find it can pass the small input. But when it comes to the large input, the program becames very slow. There are a for-loop with modulo operation in the program. The time complexity is O(n). Then it is natural for us to think if it is possible to solve this problem by a formula whose time complexity is O(1).

Back to the fomula of S3, we can expand the formula as following

![][5]

The last step  takes advantage of  the square sum formula and the cube sum formula, 
The sum of the squares of the first n natural numbers is:

![][6]

The sum of the cubes of the first n natural numbers is:

![][7]

Then, the code is changed as following:
```c++
#include <iostream> 
#include <algorithm>
using namespace std;
const int mod = 1000000007;
void main() {
	long long T, R, C;
	cin >> T;
	for (int i = 1; i <= T; ++i) {
		cin >> R >> C;
		long long res = 0;
		long long n = min(R - 1, C - 1);
		long long first = (R * C)* n * (n + 1) / 2;
		first = first % mod;
		long long second = (n*(n + 1)*(2 * n + 1) / 6)*(R + C);
		second = second % mod;
		long long third = n*(n + 1) / 2;
		third *= third;
		third = third % mod;
		res = mod + first + third - second;
		cout << "Case #" << i << ": " << res % mod << endl;
	}
}
```
We are very closed to the victory, the remainder problem is to handle the modulo.   
Here we use some fomula of modulo operation:

	(a + b) % p = (a % p + b % p) % p
	(a – b) % p = (a % p – b % p) % p
	(a * b) % p = (a % p * b % p) % p
	ab % p = ((a % p)b) % p
	((a+b) % p + c) % p = (a + (b+c) % p) % p
	((a*b) % p * c)% p = (a * (b*c) % p) % p

But we find a problem again, in our code, we meet the division, there is no modulo fomula with division above, Here we introduce a new conception of [modular multiplicative inverse](https://en.wikipedia.org/wiki/Modular_multiplicative_inverse) which expressed as following:

![][8]
	
we can use modular multiplicative inverse by following attribution:

	if b*b1 % c == 1
	then ( a/b ) % c == ( a*b1 ) % c

acording to this fomula, we can write following code:

```c++
#include <iostream> 
#include <algorithm>
using namespace std;
const int mod = 1000000007;
const long long INV3 = (mod + 1) / 3;
void main() {
	freopen("A-large-practice.in", "r", stdin);
	freopen("A-large-practice5.out", "w", stdout);
	long long T, R, C;
	cin >> T;
	for (int i = 1; i <= T; ++i) {
		cin >> R >> C;
		if (R > C)
			swap(R, C);
		long long c1 = R * (R + 1) / 2 % mod;
		long long c2 = c1 * (2 * R + 1) % mod * INV3 % mod;
		long long c3 = c1 * c1 % mod;
		long long res = R * C % mod * c1 % mod;
		res = (res - (R + C) * c2) % mod;
		res = (res + c3) % mod;
		res = (res + mod) % mod;
		cout << "Case #" << i << ": " << res << endl;
	}
	fclose(stdin);
	fclose(stdout);
}
```
AC!  

### Others' Solution

 From the contest dashboard, I find another solution without using modular multiplicative inverse, Because we can avoid division by the reduction of a fraction. Here is the code:

```c++
#include <iostream> 
#include <algorithm>
using namespace std;
const long long mod = 1000000007;
long long add(long long x, long long y) { return (x + y < mod ? x + y : x + y - mod); }
long long mul(long long x, long long y) { return 1LL * x * y % mod; }
void main() {
	long long T, R, C;
	cin >> T;
	for (long long i = 1; i <= T; ++i) {
		cin >> R >> C;
		long long res = 0;
		long long n = min(R - 1, C - 1);

		long long v1 = n;
		long long v2 = (n + 1);
		long long v3 = 1;
		if (v1 % 2 == 0) {
			v1 /= 2;
		}
		else {
			v2 /= 2;
		}
		long long s1 = mul(v1, v2);

		v1 = n;
		v2 = n + 1;
		v3 = 2 * n + 1;
		if (v1 % 2 == 0) {
			v1 /= 2;
		}
		else {
			v2 /= 2;
		}
		if (v1 % 3 == 0) {
			v1 /= 3;
		}
		else if (v2 % 3 == 0) {
			v2 /= 3;
		}
		else {
			v3 /= 3;
		}
		long long s2 = mul(mul(v1, v2), v3);

		long long s3 = mul(s1, s1);

		long long t1 = mul(R, C);
		long long t2 = add(R, C);
		long long t3 = 1;

		long long M1 = mul(s1, t1);
		long long M2 = mul(s2, t2);
		long long M3 = mul(s3, t3);

		res = add(add(M1, mod - M2), M3);
		cout << "Case #" << i << ": " << res << endl;
	}
}
```

[1]: {{ site.baseurl }}/images/201706/87.png
[2]: {{ site.baseurl }}/images/201706/88.png
[3]: {{ site.baseurl }}/images/201706/89.png
[4]: {{ site.baseurl }}/images/201706/90.png
[5]: {{ site.baseurl }}/images/201706/91.png
[6]: {{ site.baseurl }}/images/201706/92.png
[7]: {{ site.baseurl }}/images/201706/93.png
[8]: {{ site.baseurl }}/images/201706/94.png

## Reference

[http://blog.csdn.net/kyoma/article/details/60591058](http://blog.csdn.net/kyoma/article/details/60591058)