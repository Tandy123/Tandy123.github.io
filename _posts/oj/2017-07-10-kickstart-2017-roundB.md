---
layout:     post
title:      "KickStart 2017 Round B"
date:       2017-07-10 12:00:00
categories: Online-Judge
tags:  oj kickstart google English
author: Tandy
---

* content
{:toc}

Here is the solutino of KickStart 2017 Round B





# Problem A. Math Encoder

### Problem
Professor Math is working on a secret project and is facing a challenge where a list of numbers need to be encoded into a single number in the most efficient manner. After much research, Professor Math finds a 3 step process that can best encode the numbers:

1. The first step is to find all possible non-empty subsets of the list of numbers and then, for each subset, find the difference between the largest and smallest numbers (that is, the largest minus the smallest) in that subset. Note that if there is only one number in a subset, it is both the largest and the smallest number in that subset. The complete set itself is also considered a subset.
  
2. Then add up all the differences to get the final encoded number.

3. As the number may be large, output the number modulo 109 + 7 (1000000007).

The professor has shared an example and its explanation below. Given a list of numbers, can you help the professor build an efficient function to compute the final encoded number?

### Input
The first line of the input gives the number of test cases, T. This is followed by T test cases where each test case is defined by 2 lines:

  1. The first line gives a positive number N: the number of numbers in the list and  
  2. The second line contains a list of N positive integers Ki, sorted in non-decreasing order.

### Output
For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is the final encoded number.  
Since the output can be a really big number, we only ask you to output the remainder of dividing the result by the prime 109 + 7 (1000000007).

### Limits
	1 ≤ Ki ≤ 10000, for all i.
	Ki ≤ Ki+1, for all i < N - 1. 

### Small dataset
	1 ≤ N ≤ 10.
### Large dataset
	1 ≤ N ≤ 10000.
### Sample
	Input 
	1 4 3 6 7 9

	Output 
	Case #1: 44

### Explanation for the sample input
 1. Find all subsets and get the difference between largest & smallest numbers:  
[3], largest-smallest = 3 - 3 = 0.  
[6], largest-smallest = 6 - 6 = 0.  
[7], largest-smallest = 7 - 7 = 0.  
[9], largest-smallest = 9 - 9 = 0.  
[3, 6], largest-smallest = 6 - 3 = 3.  
[3, 7], largest-smallest = 7 - 3 = 4.  
[3, 9], largest-smallest = 9 - 3 = 6.  
[6, 7], largest-smallest = 7 - 6 = 1.  
[6, 9], largest-smallest = 9 - 6 = 3.  
[7, 9], largest-smallest = 9 - 7 = 2.  
[3, 6, 7], largest-smallest = 7 - 3 = 4.  
[3, 6, 9], largest-smallest = 9 - 3 = 6.  
[3, 7, 9], largest-smallest = 9 - 3 = 6.  
[6, 7, 9], largest-smallest = 9 - 6 = 3.  
[3, 6, 7, 9], largest-smallest = 9 - 3 = 6.  

2. Find the sum of the differences calculated in the previous step:  
3+4+6+1+3+2+4+6+6+3+6 = 44.

3. Find the answer modulo 109 + 7 (1000000007):  
44 % 1000000007 = 44


## My Solution
- The problem is not very hard, it even not neccessary to use some modulo algorithm.
- From array[a] to array[b], the number of all the permutation is pow(2, array[b] - array[a] - 1). For these sub-array, the different is all array[b] - array[a]. The sum of these sub-array's different is  pow(2, array[b] - array[a] - 1)*(array[b] - array[a]). So we need to find all sub-arrays, the time complexity is O(n^2);

```c
#include <iostream> 
#include <cstdio>

using namespace std;
const int mod = 1000000007;

void main() {
	freopen("A-large-practice.in","r",stdin);
	freopen("A-large-practice.out","w",stdout);
	/********************************************/
	int T, N;
	int K[10000];
	int temp[10000] = {0};
	
	cin >> T;  // read t. cin knows that t is an int, so it reads it as such.
	for (int i = 1; i <= T; ++i) {
		cin >> N;  // read n and then m.
		for (int j = 0; j < N; j++) {
			cin >> K[j];
		}
		int res = 0;
		for (int j = 0; j < N; j++) {
			for (int k = j + 1; k < N; k++) {
				if (K[k] == K[j]) {
					continue;
				}
				int index = k - j - 1;
				if (temp[index] == 0) {
					if (index == 0) {
						temp[index] = 1;
					}
					else {
						temp[index] = temp[index - 1] * 2;
						if (temp[index] >= mod) {
							temp[index] = (temp[index]%mod);
						}
					}
				}
				res = (res + ((long long)temp[index] * (K[k] - K[j])))%mod;
				
			}
		}
		cout << "Case #" << i << ": " << res << endl;
		fprintf(stderr, "Case #%d: %d\n", i, res);
		fflush(stdout);
	}
	/********************************************/
	fclose(stdin);
	fclose(stdout);
}

```

## Others' Solution
- We can precompute all the value of 2^0 to 2^10000, it will be faster. the code as following.
```c++
#include<cstdio>
#include<algorithm>
using namespace std;

typedef long long ll;
const ll MOD = 1e9 + 7;
const int NMAX = 11111;
ll p2[NMAX];
ll A[NMAX];

int main(){
	freopen("small.in", "r", stdin);
	freopen("small.out", "w", stdout);

	p2[0] = 1;
	for (int i = 1; i <= 10000; i++)
		p2[i] = p2[i - 1] * 2 % MOD;

	int T; scanf("%d", &T);
	for (int tc = 1; tc <= T; tc++){
		int N; scanf("%d", &N);
		for (int i = 1; i <= N; i++) scanf("%lld", A + i);

		ll ans = 0;
		for (int i = 1; i <= N; i++) for (int j = i + 1; j <= N; j++){
			ll cur = A[j] - A[i];
			ll det = p2[j - i - 1];
			ans = (ans + cur*det%MOD) % MOD;
		}
		printf("Case #%d: %lld\n", tc, ans);
	}
}
```

- Here is a code with time complexity of O(n), we can get how many the number will be added or subtracted by its position in the array.

```c
#include <iostream> 
#include <cstdio>
using namespace std;
const int mod = 1000000007;
void main() {
	freopen("A-large-practice.in","r",stdin);
	freopen("A-large-practice.out","w",stdout);
	/********************************************/
	int T, N;
	int k;
	long long temp[10000] = {0};
	
	temp[0] = 1;
	for (int i = 1; i < 10000; i++)
		temp[i] = temp[i - 1] * 2 % mod;

	cin >> T;  // read t. cin knows that t is an int, so it reads it as such.
	for (int i = 1; i <= T; ++i) {
		cin >> N;  // read n and then m.
		int res = 0;
		for (int j = 0; j < N; j++) {
			cin >> k;
			res = (res + temp[j] * k) % mod;
			res = (res - temp[N - j - 1] * k) % mod;
		}
		cout << "Case #" << i << ": " << res << endl;
		fprintf(stderr, "Case #%d: %d\n", i, res);
		fflush(stdout);
	}
	/********************************************/
	fclose(stdin);
	fclose(stdout);
}

```

# Problem B. Center

### Problem
There are N weighted points in a plane. Point i is at (Xi, Yi) and has weight Wi.
In this problem, we need to find a special center of these points. The center is a point (X, Y) such that the sum of max(|X-Xi|, |Y-Yi|)*Wi is minimum.

### Input
The input starts with one line containing exactly one integer T, which is the number of test cases. T test cases follow.  
Each test case begins with one line containing one integer N. N lines follow. Each line contains three space-separated real numbers Xi, Yi, and Wi. Xi, Yi and Wi have exactly 2 digits after the decimal point.

### Output
For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is the sum of max(|X-Xi|, |Y-Yi|)*Wi for center (X, Y).  
y will be considered correct if it is within an absolute or relative error of 10-6 of the correct answer. 

### Limits
	1 ≤ T ≤ 10.
	-1000.00 ≤ Xi ≤ 1000.00.
	-1000.00 ≤ Yi ≤ 1000.00.

### Small dataset
	1 ≤ N ≤ 100;
	Wi = 1.0, for all i.

### Large dataset
	1 ≤ N ≤ 10000;
	1.0 ≤ Wi ≤ 1000.0, for all i.
### Sample

	Input 
	3
	2
	0.00 0.00 1.00
	1.00 0.00 1.00
	4
	1.00 1.00 1.00
	1.00 -1.00 1.00
	-1.00 1.00 1.00
	-1.00 -1.00 1.00
	2
	0.00 0.00 1.00
	1.00 0.00 2.00
	Output 
	Case #1: 1.0
	Case #2: 4.0
	Case #3: 1.0

## My Solution
- Use Ternary Search
```c++
#include <iostream> 
#include <cstdio>
#include <algorithm> 

using namespace std;
const double eps = 1e-6;
int N;
double X[10000];
double Y[10000];
double W[10000];
double calweight(double x, double y) {
	double weight = 0.0;
	for (int i = 0; i < N; i++) {
		weight += max(fabs(x - X[i]), fabs(y - Y[i]))* W[i];
	}
	return weight;
}
double process2(double x) {
	double lo = -1000.0;
	double hi = 1000.0;
	while (hi - lo > eps) {
		double y1 = lo + (hi - lo) / 3.0;
		double y2 = lo + (hi - lo) / 3.0*2.0;
		if (calweight(x, y1) < calweight(x, y2)) {
			hi = y2;
		}
		else {
			lo = y1;
		}
	}
	return calweight(x, lo);
}
double process() {
	double lo = -1000.0;
	double hi = 1000.0;
	int i = 0;
	while (hi - lo > eps) {
		double x1 = lo + (hi - lo) / 3.0;
		double x2 = lo + (hi - lo) / 3.0*2.0;
		if (process2(x1) < process2(x2)) {
			hi = x2; 
		}
		else {
			lo = x1;
		}
		i++;
	}
	fprintf(stderr, "times: %d", i);
	return process2(lo);
}
void main() {
	freopen("B-large-practice.in", "r", stdin);
	freopen("B-large-practice.out", "w", stdout);
	/********************************************/
	int T;
	cin >> T;
	for (int i = 1; i <= T; ++i) {
		cin >> N;  // read n and then m.
		for (int j = 0; j < N; j++) {
			cin >> X[j]>>Y[j]>>W[j];
		}
		double res = process();
		//cout << "Case #" << i << ": " << res << endl;
		printf("Case #%d: %lf\n", i, res);
		fprintf(stderr, "Case #%d: %lf\n", i, res);
		fflush(stdout);
	}
	/********************************************/
	fclose(stdin);
	fclose(stdout);
}
```

## Others' Solution
- reference:
	- [http://www.voidcn.com/blog/niuxiunan/article/p-6603948.html](http://www.voidcn.com/blog/niuxiunan/article/p-6603948.html)
	- [http://www.voidcn.com/blog/caduca/article/p-2481771.html](http://www.voidcn.com/blog/caduca/article/p-2481771.html)
- translate the Chebyshev distance to Manhattan distance, combined with prefix sum. The code as following.

```c++
#define _CRT_SECURE_NO_WARNINGS
//#include <bits/stdc++.h>
#include<iostream>
#include<algorithm>
#include<cstring>
#include<ctime>

using namespace std;

const int N = 50010;
double sumx[N], sumy[N];
struct Node{
    double x;
    double y;
    double w;
    int id;
    Node(double x = 0.0, double y = 0.0, double w = 0.0, int id = 0) :x(x), y(y), w(w), id(id){

    }
}node[N];

bool Cmpx(Node a, Node b) {
    return a.x < b.x;
}

bool Cmpy(Node a, Node b) {
    return a.y < b.y;
}

int main() {
    freopen("B-small-practice (2).in", "r", stdin);

    freopen("B-small-practice-my.out", "w", stdout);
    int t;
    cin >> t;
    for (int k = 1; k <= t; k++) {
        int n;
        cin >> n;
        double x, y, w;
        double rightw = 0.0;
        for (int j = 0; j<n; j++) {
            cin >> x >> y >> w;
            node[j] = Node((x - y)*0.5, (x + y) *0.5, w, j);
            //cout<<node[j].x <<" " <<node[j].y<<endl;
            rightw += w;
        }
        double righty = rightw;
        sort(node, node + n, Cmpx);
        for (int i = 0; i < n; i++) {
            sumx[i] = 0;
            sumy[i] = 0;
        }
        for (int i = 1; i< n; i++) {
            sumx[node[0].id] = sumx[node[0].id]+ (node[i].x - node[0].x) * node[i].w;
            // cout<<sumx[node[0].id]<<endl;

        }
        //cout<<sumx[node[0].id]<<endl;
        double leftw = 0.0;
        double temp = DBL_MAX;
        for (int i = 1; i < n; i++) {
            leftw += node[i - 1].w;
            rightw -= node[i - 1].w;
            sumx[node[i].id] = sumx[node[i - 1].id] + leftw * (node[i].x - node[i - 1].x) - rightw * (node[i].x - node[i - 1].x);
            //cout<<sumx[node[i].id]<<" ";
            temp = min(temp, sumx[node[i].id]);
        }
        //cout<<endl;

        sort(node, node + n, Cmpy);
        //memset(sumy, 0.0000, sizeof(sumy));
        for (int i = 1; i< n; i++) {
            sumy[node[0].id] = sumy[node[0].id]+(node[i].y - node[0].y) * node[i].w;
        }

        double lefty = 0.0;
        double tempy = DBL_MAX;
        for (int i = 1; i < n; i++) {
            lefty += node[i - 1].w;
            righty -= node[i - 1].w;
            sumy[node[i].id] = sumy[node[i - 1].id] + lefty * (node[i].y - node[i - 1].y) - righty * (node[i].y - node[i - 1].y);
            tempy = min(tempy, sumy[node[i].id]);
        }
        /*cout << temp << " && " << tempy << endl; double ans = sumx[0]+sumy[0]; for (int i = 0; i < n; i++) { ans = min(ans, sumx[i] + sumy[i]); }*/
        double ans = temp + tempy;
        printf("Case #%d: %.7lf\n", k, ans);
        //cout << "Case #" << k << ": " << ans << endl;
    }
    //system("pause");
    return 0;
}
```
- translate the Chebyshev distance to Manhattan distance, combined with Ternary Search. Very nice solution!
```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <algorithm>
#include <string.h>
#include <iostream>
#include <map>
#include <vector>
#include <queue>
#include <set>
#include <string>
#include <math.h>

using namespace std;
const int N = 10010;
const int LG = 100;
int n;
struct Node {
    double x;
    double y;
    double w;
    Node(double a = 0.0, double b = 0.0, double c = 0.0) :x(a), y(b), w(c){
    }
}node[N];

double Calc(double p, int flag) {
    double ans = 0.0;
    if (flag == 1){
        for (int i = 0; i< n; i++) {
            ans += abs((node[i].x - p))*node[i].w;
        }
    }
    else {
        for (int i = 0; i< n; i++) {
            ans += abs((node[i].y - p))*node[i].w;
        }
    }
    return ans;
}

double Search(double l, double r, int flag) {
    double ans = min(Calc(l, flag), Calc(r, flag));
    for (int i = 0; i< LG; i++) {
        double mid1 = (l + l + r) / 3;
        double mid2 = (l + r + r) / 3;
        double res1 = Calc(mid1, flag);
        double res2 = Calc(mid2, flag);
        if (res1 > res2) {
            l = mid1;
        }
        else{
            r = mid2;
        }
        ans = min(ans, min(res1, res2));
    }
    return ans;
}
int main() {
    freopen("B-large-practice.in", "r", stdin);
    freopen("B-large-practice-my.out", "w", stdout);
    int t;
    cin >> t;
    for (int i = 1; i <= t; i++) {
        cin >> n;
        double x, y, w;
        double minx = DBL_MAX;
        double maxx = 0.0;
        double miny = DBL_MAX;
        double maxy = 0.0;
        for (int j = 0; j < n; j++) {
            cin >> x >> y >> w;
            node[j] = Node((x + y) / 2, (x - y) / 2, w);
            minx = min(minx, node[j].x);
            miny = min(miny, node[j].y);
            maxx = max(maxx, node[j].x);
            maxy = max(maxy, node[j].y);
        }
        double result = Search(minx, maxx, 1) + Search(miny, maxy, 0);
        //cout<<"Case #"<<i<<": " <<result<<endl;
        printf("Case #%d: %.6lf\n", i, result);
    }
    return 0;
}
```

# Problem C. Christmas Tree

### Problem
You are given a rectangular grid with N rows and M columns. Each cell of this grid is painted with one of two colors: green and white. Your task is to find the number of green cells in the largest Christmas tree in this grid.
To define a Christmas tree, first we define a good triangle as follows:  
A good triangle with top point at row R, column C and height h (h > 0) is an isoceles triangle consisting entirely of green cells and pointing upward. Formally, this means that: The cell (R, C) is green, and for each i from 0 to h-1 inclusive, the cells in row R+i from column C-i to column C+i are all green.  
For example:  
	..#..
	.####
	#####

is a good triangle with height 3. The # cells are green and the . cells are white. Note that there is a green cell that is not part of the good triangle, even though it touches the good triangle.  

	..#..
	.###.
	####.

is NOT a good triangle with height 3, because the 5th cell in the 3rd row is white. However, there are good triangles with height 2 present.

	...#.
	.###.
	#####.

is NOT a good triangle with height 3. However, there are good triangles with height 2 present.
A K-Christmas tree is defined as follows:  
  ● It contains exactly K good triangles in vertical arrangement.  
  ● The top cell of the i+1-th triangle must share its top edge with the bottom edge of any one of the cells at the base of the i-th triangle. This means that, if the base of the i-th triangle is at row r, from column c1 to column c2, then the top of the i+1-th triangle must be on row r+1, in a column somewhere between c1 and c2, inclusive.  
For example, if K = 2:  

	...#...
	..###..
	.#####.
	#######
	..#....
	.###...
	#####..

is a valid 2-Christmas tree. Note that the height of the 2 good triangles can be different.

	..#..
	.###.
	.#...

is also a valid 2-Christmas tree. Note that a good triangle can be of height 1 and have only one green cell.

	...#...
	..###..
	.#####.
	.......
	..#....
	.###...
	#####..

The two good triangles with height 3 does NOT form a valid 2-Christmas tree, because the 2nd triangle must starts from the 4-th row.

	...#.
	..###
	.#...
	###..

The two good triangles with height 2 does NOT form a valid 2-Christmas tree, because the top of the 2nd triangle must be in a column between 3 and 5, inclusive.  
You need to find the K-Christmas tree with the largest number of green cells.  

### Input
The first line of the input gives the number of test cases, T. T test cases follow. Each test case consists of three lines:  
  ● The first line contains 3 space-separated integers N, M and K, where N is the number of rows of the grid, M is the number of columns of the grid and K is the number of good triangle in the desired Christmas tree.  
  ● The next N lines each contain exactly M characters. Each character will be either . or #, representing a white or green cell, respectively.  

### Output
For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is the number of green cells in the largest K-Christmas tree. If there is no K-Christmas tree, output 0.

### Limits
	1 ≤ T ≤ 100.
	1 ≤ M ≤ 100.
	1 ≤ N ≤ 100.
	Each cell in the grid is either . or #.

### Small dataset
	K = 1.
### Large dataset
	1 ≤ K ≤ 100.
### Sample

	Input 	
	4
	3 5 1
	..#..
	.###.
	#####
	3 5 1
	.....
	.....
	.....
	4 5 1
	#####
	#####
	#####
	#####
	4 5 2
	#####
	#####
	#####
	#####

	Output 
	Case #1: 9
	Case #2: 0
	Case #3: 9
	Case #4: 10

In sample case #1, the largest 1-Christmas tree has 9 green cells:  

	..#..
	.###.
	#####

In sample case #2, there is no 1-Christmas tree.  
In sample case #3, one largest 1-Christmas tree with 9 green cells is:

	#####
	#####
	#####
	#####

In sample case #4, one largest 2-Christmas tree with 10 green cells is:

	#####
	#####
	#####
	#####


## My Solution

- Dynamic Planning. The time complexity is very high.

```c++
#include <iostream> 
#include <cstdio>
#include <algorithm>
using namespace std;
typedef long long ll;
const int INF = 1e9;
int T, N, M, K;
char tree[100][100];
int dp[101][101][101];
int psum[100][100];

void prepare() {
	for (int i = 0; i < N; i++)
		for (int j = 0; j < M; j++)
			psum[i][j] = psum[i][j - 1] + (tree[i][j] == '#');
}

int DP() {
	for (int it = 1; it <= K; it++) {
		for (int j = 0; j < M; j++)
			dp[it][N][j] = -INF;

		for (int i = N - 1; i >= 0; i--)
			for (int j = 0; j < M; j++)
				if (tree[i][j] == '.') {
					dp[it][i][j] = -INF;
				}
				else {
					dp[it][i][j] = -INF;
					for (int lvl = 0; i + lvl < N; lvl++) {
						int row = i + lvl;
						int left = j - lvl;
						int right = j + lvl;

						if (left < 0 || right > M - 1 || psum[row][right] - psum[row][left] != right - left) {
							break;
						}

						int add = (lvl + 1)*(lvl + 1);

						for (int x = left; x <= right; x++) {
							dp[it][i][j] = max(dp[it][i][j], add + dp[it - 1][row + 1][x]);
						}
					}
				}
	}

	int ret = 0;
	for (int i = 0; i < N; i++)
		for (int j = 0; j < M; j++)
			ret = max(ret, dp[K][i][j]);

	return ret;
}

void main() {
	freopen("C-large-practice.in","r",stdin);
	freopen("C-large-practice.out","w",stdout);
	/********************************************/
	cin >> T;
	for (int i = 1; i <= T; ++i) {
		cin >> N >> M >> K;
		for (int r = 0; r < N; r++) {
			for (int c = 0; c < M; c++) {
				cin >> tree[r][c];
			}
		}
		prepare();
				
		int ans = DP();
		cout << "Case #" << i << ": " << ans << endl;
		fprintf(stderr, "Case #%d: %d\n", i, ans);
		fflush(stdout);
	}
	/********************************************/
	fclose(stdin);
	fclose(stdout);
}
```

## Other's Solution

- Dynamic Planning.

```c++
#include <iostream> 
#include <cstdio>
#include <algorithm>

using namespace std;

char a[105][105];
int n, m, K, T[105][105][105];

bool inside(int x, int y) {
	return (x >= 1 && x <= n && y >= 1 && y <= m);
}

bool ok(int i, int j, int k) {
	if (!inside(i, j)) return false;
	for (int x = j - k; x <= j + k; ++x)
		if (!inside(i, x) || a[i][x] == '.') return false;
	return true;
}

int solve() {
	memset(T, 0, sizeof T);
	int res = 0;
	for (int i = 1; i <= n; ++i)
		for (int j = 1; j <= m; ++j) {
			if (a[i][j] == '.') continue;
			for (int k = 0; k < K; ++k) {
				if (k != 0 && T[i][j][k] == 0) continue;
				int cnt = T[i][j][k];
				for (int x = 0; x <= 101; ++x) {
					if (ok(i + x, j, x)) {
						cnt += 2 * x + 1;
						for (int y = j - x; y <= j + x; ++y) {
							T[i + x + 1][y][k + 1] = max(T[i + x + 1][y][k + 1], cnt);
							if (k + 1 == K)
								res = max(res, T[i + x + 1][y][k + 1]);
						}
					}
					else break;
				}
			}
		}
	return res;
}

int main() {
	freopen("C-large-practice.in", "r", stdin);
	freopen("C-large-practice.out", "w", stdout);
	int t; scanf("%d", &t); int te = t;
	while (t--) {
		scanf("%d%d%d\n", &n, &m, &K);
		for (int i = 1; i <= n; ++i)
			scanf("%s\n", a[i] + 1);
		int ans = solve();
		cout << "Case #" << te - t << ": " << ans << endl;
		fprintf(stderr, "Case #%d: %d\n", te - t, ans);
		fflush(stdout);
	}
	fclose(stdin);
	fclose(stdout);
	return 0;
}







t);
}
```
## Reference

- [http://blog.csdn.net/ihsin/article/details/72152362](http://blog.csdn.net/ihsin/article/details/72152362)
- [http://www.voidcn.com/blog/niuxiunan/article/p-6603948.html](http://www.voidcn.com/blog/niuxiunan/article/p-6603948.html)
- [http://www.voidcn.com/blog/caduca/article/p-2481771.html](http://www.voidcn.com/blog/caduca/article/p-2481771.html)