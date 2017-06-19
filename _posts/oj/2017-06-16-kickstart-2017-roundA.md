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


# Problem B. Patterns Overlap

### Problem
Alice likes reading and buys a lot of books. She stores her books in two boxes; each box is labeled with a pattern that matches the titles of all of the books stored in that box. A pattern consists of only uppercase/lowercase English alphabet letters and stars (*). A star can match between zero and four letters. For example, books with the titles GoneGirl and GoneTomorrow can be put in a box with the pattern Gone**, but books with the titles TheGoneGirl, and GoneWithTheWind cannot.

Alice is wondering whether there is any book that could be stored in either of the boxes. That is, she wonders if there is a title that matches both boxes' patterns.

### Input
The first line of the input gives the number of test cases, T. T test cases follow. Each consists of two lines; each line has one string in which each character is either an uppercase/lowercase English letter or *.

### Output
For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is TRUE if there is a string that matches both patterns, or FALSE if not.

### Limits
	1 ≤ T ≤ 50.

### Small dataset
	1 ≤ the length of each pattern ≤ 200.
	Each pattern contains at most 5 stars.
### Large dataset
	1 ≤ the length of each pattern ≤ 2000.
### Sample

	Input 
	3
	****
	It
	Shakes*e
	S*speare
	Shakes*e
	*peare
	Output 
	Case #1: TRUE
	Case #2: TRUE
	Case #3: FALSE

In sample case #1, the title It matches both patterns. Note that it is possible for a * to match zero characters.

In sample case #2, the title Shakespeare matches both patterns.

In sample case #3, there is no title that matches both patterns. Shakespeare, for example, does not work because the * at the start of the *peare pattern cannot match six letters.

## Analysis

### My Solution

This problem can be solved by dynamic planning algorithm. 

Here is the detail:

- we need to add a prefix for the two pattern.
- We need two arrays to record the state transitions when meeting '*'.
- When filling matrix, we can break the loop in advance if there is no change in a row of matrix.

The code as following:
```
#include <iostream>
#include <string>
using namespace std;
const int N = 2010;
const int LIMIT = 4;
int dp[N][N];
int lastP[N], lastT[N];
int main(void) {
	freopen("B-large-practice.in", "r", stdin);
	freopen("B-large-practice.out", "w", stdout);
	int testcase;
	cin >> testcase;
	for (int Case = 1; Case <= testcase; ++Case) {

		string pattern, text;
		cin >> pattern >> text;

		pattern = "#" + pattern;
		text = "#" + text;
		for (int i = 0; i < pattern.length(); i++) {
			if (pattern[i] == '*') {
				lastP[i] = lastP[i - 1];
			}
			else {
				lastP[i] = i;
			}
		}
		for (int i = 0; i < text.length(); ++i) {
			if (text[i] == '*') {
				lastT[i] = lastT[i - 1];
			}
			else {
				lastT[i] = i;
			}
		}
		dp[pattern.length() - 1][text.length() - 1] = 0;
		for (int i = 0; i < pattern.length(); ++i) {
			bool changed = false;
			for (int j = 0; j < text.length(); ++j) {
				dp[i][j] = 0;
				if (i == 0 && j == 0) {
					dp[i][j] = 1;
					changed = true;
				}
				else if (i == 0) {
					if (text[j] == '*') {
						dp[i][j] = dp[i][j - 1];
					}
					if (dp[i][j] == 1) {
						changed = true;
					}
				}
				else if (j == 0) {
					if (pattern[i] == '*') {
						dp[i][j] = dp[i - 1][j];
					}
					if (dp[i][j] == 1) {
						changed = true;
					}					
				}
				else {
					if (pattern[i] == text[j]) {
						dp[i][j] = dp[i - 1][j - 1];
						if (dp[i][j] == 1) {
							changed = true;
							continue;
						}
					}
					if (pattern[i] == '*') {
						dp[i][j] |= dp[i - 1][j];
						if (dp[i][j] == 1) {
							changed = true;
							continue;
						}
						for (int index = lastT[j], time = 0; time < LIMIT && index > 0; ++time, index = lastT[index - 1]) {
							dp[i][j] |= dp[i - 1][index - 1];
							if (dp[i][j] == 1) {
								changed = true;
								break;
							}
						}
						if (dp[i][j] == 1) {
							changed = true;
							continue;
						}
					}
					if (text[j] == '*') {
						dp[i][j] |= dp[i][j - 1];
						if (dp[i][j] == 1) {
							changed = true;
							continue;
						}
						for (int index = lastP[i], time = 0; time < LIMIT && index > 0; ++time, index = lastP[index - 1]) {
							dp[i][j] |= dp[index - 1][j - 1];
							if (dp[i][j] == 1) {
								changed = true;
								break;
							}
						}
						if (dp[i][j] == 1) {
							changed = true;
							continue;
						}
					}
				}
			}
			if (changed == false)
			{
				break;
			}
		}
		int ans = dp[pattern.length() - 1][text.length() - 1];
		cout << "Case #" << Case << ": " << (ans ? "TRUE" : "FALSE") << endl;
		fprintf(stderr, " Case #%d:  %s\n", Case, (ans ? "TRUE" : "FALSE")); fflush(stdout);
	}
	fclose(stdin);
	fclose(stdout);
}
```
### Others' Solution

- We can replace one '\*' by four '\*', so every star can only match zero and one character. 

- Here is the code:

```
//#include <bits/stdc++.h>
#include <iostream>
#include <string>
using namespace std;
#define fo(i,a,b) for(int i=(a);i<(b);i++)
#define MOD 1000000007
#define MP make_pair
#define PB push_back
typedef long long ll;
typedef long double ld;
#define PI ((ld)acos(-1.))
#define asdf(x) fprintf(stderr, x)
int T;
string ta, tb, a, b;
int A, B;
bool can[10100][10100];
int main() {
	freopen("B-large-practice.in", "r", stdin);
	freopen("B-large-practice.out", "w", stdout);
	cin >> T;
	fo(t, 1, T + 1) {
		//REMEMBER CLEAR DS
		//REMEMBER CLEAR DS
		//asdf("Doing case %d... ", t);

		cin >> ta >> tb;
		a.clear(), b.clear();
		for (char i : ta) {
			if (i == '*') fo(r, 0, 4) a.PB('*');
			else a.PB(i);
		}
		for (char i : tb) {
			if (i == '*') fo(r, 0, 4) b.PB('*');
			else b.PB(i);
		}

		A = (int)a.size(), B = (int)b.size();

		fo(i, 0, A + 1) fo(j, 0, B + 1) can[i][j] = false;
		can[0][0] = true;

		//printf("%s\n%s\n", a.c_str(), b.c_str());

		string ans = "FALSE";
		fo(i, 0, A + 1) fo(j, 0, B + 1) if (can[i][j]) {
			if (i == A && j == B) {
				ans = "TRUE";
				break;
			}
			else if (i == A) {
				if (b[j] == '*') {
					can[i][j + 1] = true;
				}
			}
			else if (j == B) {
				if (a[i] == '*') {
					can[i + 1][j] = true;
				}
			}
			else {
				if (a[i] == b[j]) {
					can[i + 1][j + 1] = true;
				}
				if (a[i] == '*') {
					//play left side and skip on right
					can[i + 1][j + 1] = true;
					//forget this star
					can[i + 1][j] = true;
				}
				if (b[j] == '*') {
					can[i + 1][j + 1] = true;
					can[i][j + 1] = true;
				}
			}
		}

		//asdf("%s\n", ans.c_str());
		printf("Case #%d: %s\n", t, ans.c_str());
		fprintf(stderr, "Case #%d: %s\n", t, ans.c_str());
		fflush(stdout);
	}
	fclose(stdin);
	fclose(stdout);
	return 0;
}
```

# Problem C. Space Cubes

### Problem
"Look at the stars, look how they shine for you." - Coldplay, "Yellow"

In a galaxy far, far away, there are many stars. Each one is a sphere with a certain position (in three-dimensional space) and radius. It is possible for stars to overlap each other.

The stars are so incredibly beautiful to you that you want to capture them forever! You would like to build two cubes of the same integer edge length, and place them in space such that for each star, there is at least one cube that completely contains it. (It's not enough for a star to be completely contained by the union of the two cubes.) A star is completely contained by a cube if no point on the star is outside the cube; a point exactly on a cube face is still considered to be inside the cube.

The cubes can be placed anywhere in space, but they must be placed with their edges parallel to the coordinate axes. It is acceptable for the cubes to overlap stars or each other.

What is the minimum integer edge length that allows you to achieve this goal?

### Input
The input starts with one line containing exactly one integer T, which is the number of test cases. T test cases follow.

Each test case begins with a line containing an integer, N, representing the number of stars.

This is followed by N lines. On the ith line, there are 4 space-separated integers, Xi, Yi, Zi and Ri, indicating the (X, Y, Z) coordinates of the center of the ith star, and the radius of the ith star.

### Output
For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is the minimum cube edge length that solves the problem, as described above.

### Limits
	1 ≤ T ≤ 100.
	-108 ≤ Xi ≤ 108, for all i.
	-108 ≤ Yi ≤ 108, for all i.
	-108 ≤ Zi ≤ 108, for all i.
	1 ≤ Ri ≤ 108, for all i.

### Small dataset
	1 ≤ N ≤ 16.
### Large dataset
	1 ≤ N ≤ 2000.
### Sample

	Input 
	3
	3
	1 1 1 1
	2 2 2 1
	4 4 4 1
	3
	1 1 1 2
	2 3 4 1
	5 6 7 1
	3
	1 1 1 1
	1 1 1 1
	9 9 9 1

	Output 
	Case #1: 3
	Case #2: 5
	Case #3: 2

In the first test case, one solution is to place two cubes with an edge length of 3 such that their corners with minimum (x, y, z) coordinates are at (0, 0, 0) and (3, 3, 3).  
In the second test case, one solution is to place two cubes with an edge length of 5 such that their corners with minimum (x, y, z) coordinates are at (-1, -1, -1) and (1, 2, 3).  

## Analysis

### My Solution

- First, we need to find the bounding-box of all the stars.
- Then we put one box in every corner of the bounding-box. it can contain some of the stars.
- As for other stars that are not contained by the first box, we can verify if we can contain them by second box with the same size.
- The key point of solving this problem is using dichotomy. And the time complexity is O(NlogM), here M is the largest size of the space
- My code as following:

```
#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;
int star[2001][4];
int N;
bool vs[2001];
bool Check(int xs, int xe, int ys, int ye, int zs, int ze) {
	int length = xe - xs;
	for (int i = 0; i < N; ++i) {
		if (
			star[i][0] - star[i][3] >= xs &&
			star[i][1] - star[i][3] >= ys &&
			star[i][2] - star[i][3] >= zs &&
			star[i][0] + star[i][3] <= xe &&
			star[i][1] + star[i][3] <= ye &&
			star[i][2] + star[i][3] <= ze
			) {
			vs[i] = true;
		}
		else {
			vs[i] = false;
		}	
	}

	int minx = 300000000;
	int miny = 300000000;
	int minz = 300000000;
	int maxx = -300000000;
	int maxy = -300000000;
	int maxz = -300000000;

	for (int i = 0; i < N; ++i) {
		if (vs[i] == false) {
			minx = min(minx, star[i][0] - star[i][3]);
			miny = min(miny, star[i][1] - star[i][3]);
			minz = min(minz, star[i][2] - star[i][3]);
			maxx = max(maxx, star[i][0] + star[i][3]);
			maxy = max(maxy, star[i][1] + star[i][3]);
			maxz = max(maxz, star[i][2] + star[i][3]);
		}
	}
	return (maxx - minx) <= length && (maxy - miny <= length) && (maxz - minz <= length);
}
void main() {
	freopen("C-large-practice.in","r",stdin);
	freopen("C-large-practice.out","w",stdout);
	/********************************************/
	int T;
	cin >> T;
	for (int i = 1; i <= T; ++i) {
		cin >> N;
		int maxx = -300000000;
		int minx = 300000000;
		int maxy = -300000000;
		int miny = 300000000;
		int maxz = -300000000;
		int minz = 300000000;
		for (int j = 0; j < N; ++j) {
			for (int k = 0; k < 4; ++k) {
				cin >> star[j][k];
			}
			maxx = max(maxx, star[j][0] + star[j][3]);
			maxy = max(maxy, star[j][1] + star[j][3]);
			maxz = max(maxx, star[j][2] + star[j][3]);
			minx = min(minx, star[j][0] - star[j][3]);
			miny = min(miny, star[j][1] - star[j][3]);
			minz = min(minz, star[j][2] - star[j][3]);
		}
		int rs = 0;
		int re = 500000000;
		while (rs < re) {
			int r = (rs + re) / 2;
			if (
				Check(minx, minx + r, miny, miny + r, minz, minz + r)||
				Check(minx, minx + r, miny, miny + r, maxz - r, maxz) ||
				Check(minx, minx + r, maxy - r, maxy, minz, minz + r) ||
				Check(minx, minx + r, maxy - r, maxy, maxz - r, maxz) ||
				Check(maxx - r, maxx, miny, miny + r, minz, minz + r) ||
				Check(maxx - r, maxx, miny, miny + r, maxz - r, maxz) ||
				Check(maxx - r, maxx, maxy - r, maxy, minz, minz + r) ||
				Check(maxx - r, maxx, maxy - r, maxy, maxz - r, maxz)
				) {
				re = r;
			}
			else {
				rs = r + 1;
			}
		}

		cout << "Case #" << i << ": " << rs << endl;
		fprintf(stderr, "Case #%d: %d\n", i, rs);
	}
	/********************************************/
	fclose(stdin);
	fclose(stdout);
}

```

## Reference

- [http://blog.csdn.net/kyoma/article/details/60591058](http://blog.csdn.net/kyoma/article/details/60591058)
- [http://blog.csdn.net/lqybzx/article/details/60764546](http://blog.csdn.net/lqybzx/article/details/60764546)