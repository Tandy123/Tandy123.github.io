---
layout:     post
title:      "KickStart 2017 Round C"
date:       2017-07-13 12:00:00
categories: Online-Judge
tags:  oj kickstart google English
author: Tandy
---

* content
{:toc}

Here is the solutino of KickStart 2017 Round C





# Problem A. Ambiguous Cipher

### Problem
Susie and Calvin are classmates. Calvin would like to be able to pass notes to Susie in class without their teacher or other classmates knowing what they are talking about, just in case the notes fall into the wrong hands. Calvin has devised the a system to encrypt his messages.  

Calvin only passes one word to Susie each time, and that word consists of only uppercase letters, because Calvin is so excited to talk to Susie. Each word is encrypted as follows:  

- Calvin assigns a number to each letter based on the letter's position in the alphabet, where A = 0, B = 1, ..., Z = 25.
- For every letter in the word, Calvin determines the encrypted value of the letter by summing the values of the 1 or 2 letter(s) that are adjacent to that letter in the word. He takes that sum modulo 26, and this is the new value of the letter. Calvin then converts the value back to an uppercase letter based on positions in the alphabet, as before.
- The encrypted word is determined by encrypting every letter in the word using this method. Each letter's encryption is based only on the letters from the original unencrypted message, and not on any letters that have already been encrypted
Let's take a look at one of the notes Calvin is writing for Susie. Since Calvin is always hungry, he wants to let Susie know that he wants to eat again. Calvin encrypts the word SOUP as follows:
- S = 18, O = 14, U = 20, and P = 15.
- Calvin encrypts each letter based on the values of its neighbor(s):
	- First letter: 14 mod 26 = 14.
    - Second letter: (18 + 20) mod 26 = 12.
    - Third letter: (14 + 15) mod 26 = 3.
    - Fourth letter: 20 mod 26 = 20.
- The values 14 12 3 20 correspond to the letters OMDU, and this is the encrypted word that Calvin will write on the note for Susie.

It is guaranteed that Calvin will not send Susie any words that cannot be decrypted at all. For example, Calvin would not send Susie the word APE, since it does not have any valid decryptions. (That is, there is no word that Calvin could have encrypted to APE.)  

However, Calvin's system is not perfect, and some of the words he sends Susie can actually be decrypted to multiple words, creating ambiguity! For example, BCB can be decrypted to ABC or CBA, among other possibilities.  

Susie pulled another all-nighter yesterday to finish school projects, and she is too tired to decrypt Calvin's messages. She needs your help!

### Input
The first line of the input gives the number of test cases, T. T test cases follow. Each case is a single line that contains a string W of uppercase letters: an encrypted word that Calvin has sent.

### Output
For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is the decrypted word, or AMBIGUOUS if it is impossible to uniquely determine the decrypted word.

### Limits
	1 ≤ T ≤ 100.
	W consists of only of uppercase English letters.
	W is decryptable to one or more words. (That is, W is the result of an encryption of some word.)
	W does not decrypt to the word AMBIGUOUS. (You will only output that when the decryption is ambiguous.)

### Small dataset
	2 ≤ the length of W ≤ 4.
### Large dataset
	2 ≤ the length of W ≤ 50.
### Sample
	Input 
	3
	OMDU
	BCB
	AOAAAN

	Output 
	Case #1: SOUP
	Case #2: AMBIGUOUS
	Case #3: BANANA

### Explanation for the sample input
Note that the last sample case would not appear in the Small dataset.  
Sample Cases #1 & #2 were explained in the problem statement.  
In Sample Case #3, BANANA is the only word that encrypts to AOAAAN.  

## Analysis
Small dataset

There are only 262 + 263 + 264 = 475228 words with lengths in the [2, 4] range. The statement tells us exactly how to encrypt a word, so we can encrypt all possible words and then create a reverse dictionary. For example, when we find that SOUP encrypts to OMDU, we can create an entry in our reverse dictionary with key OMDU and value SOUP. If we ever find that a word has encrypted to a key we already have in the dictionary (for example, ABC and CBA both encrypt to BCB), then that key's decryption is ambiguous, and we can replace the value with AMBIGUOUS.

Once we have done this, solving the problem is easy; we just look up each word in our dictionary and output the value as our answer. We do not need to worry about words with no valid decryption (and thus no dictionary key), because the problem statement guarantees that these will not appear in the datasets.

This method will not work for the Large dataset, though; in that case, there are just too many possible words to stuff into a dictionary in memory! We need another approach.
Large dataset: words with even lengths

For now, let's assume our encrypted word has an even length. We will consider words of odd length in the next section.

When a word is being encrypted, every letter in the word (except for the first and last) is encrypted by summing the two letters adjacent to that letter. For the first and last letters, the encrypted value is just the unencrypted value of the one letter adjacent to it. This means that we can easily find the the second and second-to-last letters of the unencrypted word: they are just the first and last letters of the encrypted word, respectively.

Moreover, once we have these "footholds" into the decrypted word, we can use them to decrypt the rest of the encrypted word! For example, we can decrypt the encrypted word ADMZZO as follows. In this explanation, we will denote a letter with E or D (referring to the encrypted or decrypted words) followed by a number (giving the letter's position in the word, counting starting from 1.)

- The letter values of the encrypted word are: 0 3 12 25 25 14.
- We know that D2 and D5 equal E1 and E6, as explained above, so we know that our decrypted word has letter values _ 0 _ _ 14 _.
- We will now determine the letters in the even-numbered positions of the decrypted word, going from left to right. We will start by determining D4. We already know that D2 has value 0. Since we know that (D2 + D4) % 26 = E3, then D4 = (E3 - D2) % 26. E3 has value 12, so D4 = (12 - 0) % 26 = 12. So now our decrypted letter values are: _ 0 _ 12 14 _.
- Now that we know D4, we can find D6 in the same way: D6 = (E5 - D4) % 26 = (25 - 12) % 26 = 13. So we have _ 0 _ 12 14 13.
- Then, we do the same thing from right to left, starting with D5. We have D3 = (E4 - D5) % 26 = (25 - 14) = 11, and D1 = (E2 - D3) % 26 = (3 - 11) % 26 = 18. (It is OK to take the modulus of a negative number, but we can also always safely add 26 if we want to only handle positive values, e.g., (3 - 11 + 26) % 26.) So we know all the letter values in the decrypted word: 18 0 11 12 14 13.
- Now we just need to convert this list of decrypted letter values back to uppercase letters, which results in the decrypted word SALMON.

This method will allow us to decrypt any word with an even length. Because the method was deterministic and we had no choices about how to decrypt, we can also see that any encrypted word with an even length has exactly one possible decryption; that is, in mathematical terms, decryption is both one-to-one and onto. But what about words with odd lengths?

Large dataset: words with odd lengths

Let's look back at the example BCB from the problem statement. We know that D2 = E1 and D2 = E3, so D2 is B. But what about D1 and D3? All we know is that (D1 + D3) % 26 = E2. There are 26 different pairs for which this is valid! So the decryption is ambiguous.

In fact, this is the case for any word of odd length that could appear in our datasets. Our method above does not apply! Knowing the second and second-to-last letters of the decrypted word does not help us get the entire word, since now both of those letters are in even-numbered positions of the decrypted word; they can only get us letters in the even-numbered positions of the decrypted word. We have no foothold that we can use to get any of the letters in the odd-numbered positions. The first letter of the decrypted word could be any letter, and any choice determines all the others. We have no way of knowing which of the 26 possibilities Calvin originally encrypted.

The statement tells us that the datasets do not include words like APE which have no valid decryption, so any word of odd length in our dataset must have multiple decryptions. With this knowledge, we can finish our solution: for words of even length, we use the method above, and for words of odd length, we can just report AMBIGUOUS. Calvin and Susie should come up with a method that can handle all words, not just words of even length!

## Code
- The problem is not very hard, it even not neccessary to use some modulo algorithm.
- From array[a] to array[b], the number of all the permutation is pow(2, array[b] - array[a] - 1). For these sub-array, the different is all array[b] - array[a]. The sum of these sub-array's different is  pow(2, array[b] - array[a] - 1)*(array[b] - array[a]). So we need to find all sub-arrays, the time complexity is O(n^2);

```c
#include <iostream> 
#include <string>
using namespace std;
void main() {
	freopen("A-large-practice.in","r",stdin);
	freopen("A-large-practice.out","w",stdout);
	/********************************************/
	int t;
	string s_input;
	string s_output;
	cin >> t;
	for (int i = 1; i <= t; ++i) {
		cin >> s_input;
		if ((s_input.length() & 1) == 1)
		{
			s_output = "AMBIGUOUS";
		}
		else {
			s_output = s_input;
			for (int j = 0; j < s_input.length(); j += 2) {
				int num = s_input[j] - 'A';
				if (j == 0) {
					s_output[1] = 'A' + num;
				}
				else{
					num = num - (s_output[j - 1] - 'A');
					if (num < 0) {
						num += 26;
					}
					s_output[j + 1] = 'A' + num;
				}
			}
			for (int j = s_input.length() - 1; j >= 0; j -= 2) {
				int num = s_input[j] - 'A';
				if (j == s_input.length() - 1) {
					s_output[j - 1] = 'A' + num;
				}
				else{
					num = num - (s_output[j + 1] - 'A');
					if (num < 0) {
						num += 26;
					}
					s_output[j - 1] = 'A' + num;
				}
			}
		}
		
		cout << "Case #" << i << ": " << s_output << endl;
		//fprintf(stderr, "Case #%d: %s\n", i, s_output);
		//fflush(stdout);
	}
	/********************************************/
	fclose(stdin);
	fclose(stdout);
}
```

# Problem B. X Squared

### Problem
The hot new toy for this year is called "X Squared". It consists of a square N by N grid of tiles, where N is odd. Exactly 2 × N - 1 of the tiles are labeled with an X, and the rest are blank (which we will represent with the . character). In each move of the game, the player can either choose and exchange two rows of tiles, or choose and exchange two columns of tiles. The goal of the game is to get all of the X tiles to be on the two main diagonals of the grid, forming a larger X shape, as in the following example for N = 5:

	X...X
	.X.X.
	..X..
	.X.X.
	X...X

You are about to play with your X Squared toy, which is not yet in the goal state. You suspect that your devious younger sibling might have moved some of the tiles around in a way that has broken the game. Given the current configuration of the grid, can you determine whether it is possible to win or not?

### Input
The first line of the input gives the number of test cases, T. T test cases follow. Each one begins with one line with an integer N, the size of the grid. N more lines with Ncharacters each follow; the j-th character on the i-th of these lines is X if the tile in the i-th row and j-th column of the grid has an X, or . if that tile is blank.

### Output
For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is POSSIBLE if it is possible to win, and IMPOSSIBLEotherwise.

### Limits
	1 ≤ T ≤ 100.
	N mod 2 = 1. (N is odd.)
	The grid has exactly 2 × N - 1 X tiles and exactly N2 - 2 × N + 1 . tiles.
	The grid is not already in the goal state, as described in the problem statement.

### Small dataset
	3 ≤ N ≤ 5.

### Large dataset
	3 ≤ N ≤ 55.

### Sample

	Input 
	2
	3
	..X
	XX.
	XX.
	3
	...
	XXX
	XX.

	Output 
	Case #1: POSSIBLE
	Case #2: IMPOSSIBLE

In Sample Case #1, one winning strategy is:

1. Swap the top row with the middle row.
2. Swap the rightmost column with the middle column.

	 ..X    XX.    X.X
	 XX. -> ..X -> .X.
	 XX.    XX.    X.X

In Sample Case #2, no sequence of moves can turn the grid into the desired final configuration.

## Analysis

Small dataset
One straightforward brute-force approach to this problem is to perform a breadth-first search of all grids that can be reached using the allowed swap operations, and see whether the target grid is reachable. However, this can take a while to code. Moreover, depending on the language used and the implementation details — e.g., how we choose to store previously seen states and avoid revisiting them — the search may run too slowly on the N = 5 cases. Perhaps a breadth-first search is overkill here; can we identify all of the reachable states in advance, without exploring?

Let's think about what swap operations cannot change. The set of tiles in a particular row in the initial grid will always remain together, in some order, in some row (not necessarily the row they started in). This is because a column swap only changes the relative order of those tiles, and a row swap only moves that whole set of tiles around together. So, our operations on the board cannot exchange individual tiles among different rows; they can only change the internal and relative orders of existing rows.

Because column swaps are the only way to change the internal order within a row, changing one row to have a certain order will give all of the rows that same internal order. However, we can choose whichever internal order we want: we pick the column with the tile we want to be first, and swap that column into the first column position, and so on.

All of the above logic holds for columns as well, and we can operate on the columns independently enough for our purposes: if we reorder the rows, and then reorder the columns, the latter operations do not change the chosen order of the rows. So, we can choose any of the N! possible orders for our N rows, and any of the N! possible orders for our N columns, for a total of (N!)2 different states that we can reach. (Some of these states might have the same pattern of Xes and blank tiles, even if they represent different rearrangements of the original tiles.) Unlike in our breadth-first search method, we don't need to worry about exactly how to reach each of these states, even though the end of the previous paragraph explains how to do so. We know that it is possible to reach all of them, so if one of them matches the target, the answer is POSSIBLE. Moreover, we know that these are all of the states that we can reach, so if none of them matches the target, the answer must be IMPOSSIBLE.

Now, all we have to do is write some code to permute the rows and columns of a grid into whatever orders we want. To avoid doing too much duplicate work, we can pick one row permutation, then apply all possible column permutations to copies of that, then pick another row permutation, and so on. This method is essentially a well-targeted depth-first search, and its running time is O((N!)2). This is easily fast enough for the Small dataset, in which N maxes out at 5. But a squared-factorial order of growth won't work for the Large dataset! Let's look for a better method.

Large dataset
Let's think about the target grid state. We can observe that it has one X tile that is the only X in its row and in its column; let's call this collection of X, row, and column thesingleton cross. The rest of the grid contains a nested set of N/2 of what we will call rectangles. Each rectangle is defined by two rows and two columns, and has an X tile at each of the four intersections of those rows/columns, and no other X tiles anywhere else.

Suppose that we start at the target and perform some swap operations. What happens to our singleton cross and our rectangles? Per our earlier observation while solving the Small dataset, if two of the corners of a rectangle are together in the same row, or in the same column, they always will be; no row or column swaps can possibly split them apart. So swap operations cannot create or destroy rectangles, although they can change the relative positions of the four corners. Similarly, no operation can move additional X tiles into the singleton cross, or take away its one X tile.

These observations simplify the problem dramatically. We only need to ask: does the starting grid have exactly N/2 rectangles and exactly one singleton cross? If not, there is no series of swaps that can turn it into the target, which does have those properties, so the case is IMPOSSIBLE and we are done. Otherwise, we can transform the starting grid into the target grid as follows. Choose a rectangle, and perform row and column swaps such that its corners end up as the outermost corners of the larger X shape. Then recursively solve the rest of the grid as a subproblem, and so on. At the end of all this, the singleton cross will necessarily be in the correct place, since every other place will have been taken.

With this reframing of the problem in mind, we no longer need to actually perform or even think about any swaps! We only need to check the starting grid for rectangles and a singleton row/column. It is possible to do this with a single pass through the grid, looking at each row in turn. If a row has zero or more than two X tiles, it cannot be part of a rectangle or a singleton cross, and so the case is IMPOSSIBLE. If a row has one X tile, we need it to be part of the singleton cross; we store the column location of that X, and if we see another would-be singleton cross row later, the case must be IMPOSSIBLE. If a row has two X tiles, we note the columns of those two tiles. Once we have checked all rows, we check to see that every two-X row's set of X columns pairs up with exactly one other two-X row's set of X columns, and that no such pair shares any position with any other pair. Moreover, the position of the X in the singleton cross must be the sole column unused by any other pair. If all of these things are true, then the case is POSSIBLE.

This strategy is linear in the size of the input, and it runs fast enough to easily handle the Large dataset, as well as grids much larger than we provide in that dataset! It is also possible to run across greedy methods that carry out the swapping method we described earlier, or something that essentially boils down to it.

## Code
```c++
#include <iostream> 
#include <cstdio>
#include <algorithm>
typedef long long ll;
using namespace std;
void main() {
	freopen("B-large-practice.in","r",stdin);
	freopen("B-large-practice.out","w",stdout);
	/********************************************/
	int t, n;
	char S[60][60];
	cin >> t;
	for (int i = 1; i <= t; ++i) {
		cin >> n;
		bool res = true;
		int num = 0;
		for (int j = 0; j < n; j++) {
			for (int k = 0; k < n; k++) {
				cin >> S[j][k];
				if (S[j][k] == 'X') {
					num++;
				}
			}
		}
		if (num != 2 * n - 1) {
			res = false;
		}
		else {

			for (int j = 0; j < n; j++) {
				for (int k = 0; k < n; k++) {
					if (S[j][k] == 'X') {
						int x, y;
						for (x = 0; x < n; x++) {
							if (S[x][k] == 'X' && x != j) {
								break;
							}
							else if (S[x][k] == 'Z') {
								res = false;
								break;
							}
						}
						for (y = 0; y < n; y++) {
							if (S[j][y] == 'X' && y != k) {
								break;
							}
							else if (S[j][y] == 'Z') {
								res = false;
								break;
							}
						}
						if (res == false) {
							break;
						}
						if (x < n && y < n) {
							if (S[x][y] == 'X') {
								S[j][k] = 'Z';
								S[x][k] = 'Z';
								S[j][y] = 'Z';
								S[x][y] = 'Z';
								num -= 4;
								break;
							}
							else {
								res = false;
								break;
							}
						}
						else if (x == n && y == n) {
							S[j][k] = 'Z';
							num -= 1;
							break;
						}
						else {
							res = false;
							break;
						}
					}
				}
				if (res == false) {
					break;
				}
			}
			if (num != 0) {
				res = false;
			}
		}
		
		cout << "Case #" << i << ": " << (res? "POSSIBLE" : "IMPOSSIBLE")<< endl;
		//fprintf(stderr, "Case #%d: %d\n", i, ans);
		//fflush(stdout);
	}
	/********************************************/
	fclose(stdin);
	fclose(stdout);
}

```

# Problem C. Magical Thinking

### Problem
You and N of your friends just took the B.A.T. (Binary Answer Test) to try to get into wizard school. The B.A.T. has Q true-false questions, and each one is worth 1 point. You have no wizard powers, so you just picked arbitrary answers and hoped for the best.

The results of the test have already been sent out by quail mail, but the quail with your results has not arrived yet. However, each of your friends has told you their list of answers and their total score. You also remember your own list of answers. You are an optimist and you think that you probably did well!

Given that there is one correct list of answers (but you do not know what those answers are), and given your friends' answers and scores, what is the highest score that you possibly could have achieved?

### Input
The first line of the input gives the number of test cases, T. T test cases follow. Each begins with one line with two integers N and Q. Then, N+1 lines follow; the i-th of these lines represents the i-th examinee's list of answers Ai, and has Q characters, each of which is either T or F (representing True or False). AN+1 is your own list of answers. Finally, one line with N integers follows; the i-th of these integers, Si, represents the i-th examinee's score. (Note that your own score is not in this list, because it is unknown.)

### Output
For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is the highest score that you possibly could have achieved that is consistent with the given information.

### Limits
	1 ≤ T ≤ 100.
	The length of Ai is Q, for all i.
	Each character of Ai is either T or F, for all i.
	0 ≤ Si ≤ Q.
	It is guaranteed that there is at least one possible list of correct answers that is consistent with all of the friends' answers and scores.

### Small dataset
	N = 1.
	1 ≤ Q ≤ 10.

### Large dataset
	1 ≤ N ≤ 2.
	1 ≤ Q ≤ 50.

### Sample

	Input 	
	3
	1 2
	TF
	FF
	1
	1 3
	TTT
	TTF
	0
	2 3
	TTF
	FTF
	TTT
	1 2

	Output 
	Case #1: 2
	Case #2: 1
	Case #3: 2

Note that the last sample case would not appear in the Small dataset.

In sample case #1, your friend answered TF and you answered FF, and exactly one of your friend's answers was right. If your friend was wrong on question 1 and right on question 2, then the real set of answers is FF and you got both questions right. It is impossible to do better than this!

In sample case #2, your friend answered all Ts and got all of the questions wrong, so the real set of answers must be all Fs, which means that you got only question 3 right.

In sample case #3, the only possible real lists of answers that are consistent with the given information are FTT and FFF. (For example, the real answer list cannot be TFT; the first friend's answers and score would be consistent with that, but the second friend would have scored 0 instead of 2.) Of these two possibilities, FTT is more favorable to you and would give you a score of 2.

## Analysis
- Small dataset

In the Small dataset, there is only one other friend to consider, and we know how many questions S0 they got right. We need to choose exactly S0 of the questions to be the ones they got right (call this set R); that means they got the other Q - S0 questions wrong (call this set W). Moreover, we need to do this in the way that maximizes our own score.

Let's divide the questions into two types: type A when we gave the same answer as our friend, or type D when we gave different answers. Suppose that we assign the questions to sets R and W in some way, and suppose that there is a type D question in set R, and a type A question in set W. Then we got both of those questions wrong! But if we swap the two, then we instead got both questions right. So it is always advantageous to make such swaps, and we should always load up set R with as many type A questions as we possibly can. If there are not enough type A questions to do this, then we must fill up the rest of set R with type D questions.

We can either implement this greedy strategy, or generalize it into a formula: if X is the number of questions on which we agree with our friend, then the answer turns out to be Q - |S0 - X|.

Another possible approach for the Small dataset is to use brute force. Even in the worst case of Q = 10, there are only 210 = 1024 different possible sets of answers. We can check all of them and see which ones are consistent with our friend's score, and which of those gives us the highest score.

- Large dataset
The Large dataset introduces two additional complications. For one thing, there can now be up to 50 questions, so the brute force approach mentioned above won't work; 250 is over 1015, and there are far too many possible sets of answers to check.

Our greedy method above will work for N = 1, Q = 50, but adding a second friend introduces some complications. For example, trying to make greedy decisions about one friend in the same way we did for Small dataset 1 might cause the other friend to end up with the wrong score. However, we don't need a greedy approach, because we can take advantage of the small number of types of questions. When N = 2, there are only four types:

1. Both friends agree with us.
2. Only friend 1 agrees with us.
3. Only friend 2 agrees with us.
4. Neither friend agrees with us.

We can try every possible tuple (a, b, c, d) of the numbers of Type 1, 2, 3, and 4 questions that we got right, with 0 ≤ a ≤ the number of Type 1 questions, 0 ≤ b ≤ the number of Type 2 questions, and so on. Any tuples that do not cause both friends to have the correct scores should be discarded. We can then choose the remaining tuple for which a + b + c + d is maximized. This method is O(Q4), but the greatest possible number of such tuples to check occurs when Q = 50 and there are 12 or 13 of each of the four types, and even then, there only about 25000 possibilities to check.

Another option for this dataset is to use dynamic programming. For example, we can start with a set containing only the list [0, 0, 0], which represents that at the start of the test, before any questions are answered, we have 0 points, friend 1 has 0 points, and friend 2 has 0 points. Then, suppose that our answer to the first question is F, our first friend answered T, and our second friend answered F. There are two options: either the real answer to the first question is F (for which case we create the list [1, 0, 1], since we and the second friend have earned a point, but the first friend has not), or the real answer is T (for which case we create the list [0, 1, 0]). Then we replace our old set with the new set ([1, 0, 1], [0, 1, 0]), and for each list in that set, we in turn consider what happens when we answer F or T for the second question, and so on. Once we have finished, we check for the list in which our friends' scores are both correct and we have the highest possible score.

Why is this method any better than brute force? The key difference is that if we create a list that is already in our set, we do not add another copy of it, so we do not waste time individually considering many equivalent (for our purposes) answer sets. Because our scores and our friends' scores can range from 0 to Q, inclusive, there are (Q + 1)N + 1possible lists; since (as an upper bound) we have to check all of them once for each question, the method is O(QN + 2). This is O(Q4) when N = 2. In practice, this is a "slower O(Q4)" than the method above, since we may need to check 513 × 50 = over 6 × 106 possibilities, but it is still easily fast enough to solve the Large dataset. The approach also works just fine with a three-dimensional array instead of a set, but the set lets us avoid checking for the existence of all possible lists at each step of the process.

## My Solution

- Dynamic Planning. The time complexity is very high.

```c++
#include <iostream> 
#include <cstdio>
#include <algorithm>
#include <string>
typedef long long ll;
using namespace std;
int f[2][50];
int m[50];
int S[2];
void main() {
	freopen("C-large-practice.in","r",stdin);
	freopen("C-large-practice.out","w",stdout);
	/********************************************/
	int T, N, Q;
	cin >> T;
	for (int i = 1; i <= T; ++i) {
		cin >> N >> Q;
		int ans = 0;
		string s;
		for (int j = 0; j < N; ++j) {
			cin >> s;
			for (int k = 0; k < Q; ++k) {
				if (s[k] == 'T') {
					f[j][k] = 1;
				}
				else {
					f[j][k] = 0;
				}
			}
		}
		cin >> s;
		for (int k = 0; k < Q; ++k) {
			if (s[k] == 'T') {
				m[k] = 1;
			}
			else {
				m[k] = 0;
			}
		}

		for (int j = 0; j < N; ++j) {
			cin >> S[j];
		}
		if (N == 1) {
			int a = 0;
			int b = 0;
			for (int k = 0; k < Q; ++k) {
				if (m[k] == f[0][k]) {
					a++;
				}
				else {
					b++;
				}
			}
			ans = Q - abs(S[0] - a);
			cout << "Case #" << i << ": " << ans << endl;
		}
		else {
			int a = 0;
			int b = 0;
			int c = 0;
			int d = 0;
			for (int k = 0; k < Q; ++k) {
				if (m[k] == f[0][k] && m[k] == f[1][k]) {
					a++;
				}else if (m[k] == f[0][k] && m[k] != f[1][k]) {
					b++;
				}
				else if (m[k] != f[0][k] && m[k] == f[1][k]) {
					c++;
				}
				else if (m[k] != f[0][k] && m[k] != f[1][k]) {
					d++;
				}
			}
			for (int k1 = 0; k1 <= a; k1++) {
				for (int k2 = 0; k2 <= b; k2++) {
					for (int k3 = 0; k3 <= c; k3++) {
						for (int k4 = 0; k4 <= d; k4++) {
							if (S[0] == k1 + k2 + c - k3 + d - k4) {
								if (S[1] == k1 + k3 + b - k2 + d - k4) {
									ans = max(ans, k1+ k2+k3+k4);
								}
							}
						}
					}
				}
			}
			cout << "Case #" << i << ": " << ans << endl;
		}
		fprintf(stderr, "Case #%d: %d\n", i, ans);
		fflush(stdout);
	}
	/********************************************/
	fclose(stdin);
	fclose(stdout);
}

```

# Problem D. The 4M Corporation

### Problem
The 4M Corporation has hired you to organize their departments and allocate headcount. You will create at least one department, and each department will receive some positive integer number of employees. It will not be easy, though — you have four different bosses, and each has given you a different instruction:

1. The department with the fewest employees must have exactly MINIMUMemployees.
2. The department with the most employees must have exactly MAXIMUMemployees.
3. The average number of employees across all departments must be exactly MEAN.
4. The median of the number of employees across all departments must be exactly MEDIAN. As a reminder, the 

median of a list is the value that, when the list is sorted in nondecreasing order, is in the center (for a list of odd length) or is the average of the two values in the center (for a list of even length).

Moreover, for the sake of efficiency, it is best to avoid creating too many departments. What is the smallest number of departments that you can create, if it is possible to satisfy your bosses' requests?

### Input
The first line of the input gives the number of test cases, T. T test cases follow. Each consists of four integers: MINIMUM, MAXIMUM, MEAN, and MEDIAN, in that order.

### Output
For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1), and y is either the minimum possible number of departments, orIMPOSSIBLE if it is impossible to satisfy all four bosses' requests.

### Limits
	1 ≤ T ≤ 100.

### Small dataset
	1 ≤ MINIMUM ≤ 8.
	1 ≤ MAXIMUM ≤ 8.
	1 ≤ MEAN ≤ 8.
	1 ≤ MEDIAN ≤ 8.
	The constraints for the Small dataset guarantee that the answer is either IMPOSSIBLE or is less than 14.

### Large dataset
	1 ≤ MINIMUM ≤ 10000.
	1 ≤ MAXIMUM ≤ 10000.
	1 ≤ MEAN ≤ 10000.
	1 ≤ MEDIAN ≤ 10000.

### Sample

	Input 	
	5
	6 4 5 1
	7 7 8 8
	2 2 2 2
	3 7 5 5
	1 4 3 4

	Output 
	Case #1: IMPOSSIBLE
	Case #2: IMPOSSIBLE
	Case #3: 1
	Case #4: 2
	Case #5: 3

Sample Case #1 is IMPOSSIBLE because the maximum value cannot be smaller than the minimum value.

Sample Case #2 is IMPOSSIBLE because the mean and median cannot be larger than the maximum value.

In Sample Case #3, you can create a single department with 2 employees. This satisfies all four bosses: the department with the fewest employees has exactly 2, the department with the most employees has exactly 2, and the mean and median are both 2.

In Sample Case #4, you can create one department with 3 employees and another department with 7 employees. Note that it would not suffice to create only one department with 5 employees, because then the department with the fewest employees would not have exactly 3 and the department with the most employees would not have exactly 7.
For Sample Case #5, you can create one department with 1 employee and two more departments with 4 employees each.

## Analysis
- Small dataset
The Limits section of the problem statement tells us that the answer to every Small test case that is not IMPOSSIBLE is less than 14. This suggests that brute force is a viable option for the Small dataset. The tight bounds imposed by MINIMUM and MAXIMUM help us out as well. But let's think about the worst case: what if those two values are 1 and 8, respectively, and what if the answer ends up being 13? In that case, we know that two of the values in the list must be 1 and 8, but if any of the others can be any integer in [1, 8], then we can have 811 — over 8 billion — possibilities for the remaining numbers. That's too much to handle in our limited time!

Fortunately, we can cut this daunting space of possibilities down to size by avoiding redundant lists. In this problem, we don't care about the difference between [1, 1, 2, 3] and [2, 1, 3, 1], for instance. One way to avoid worrying about such differences is to only consider lists that are sorted in nondecreasing order. Even in the worst case mentioned above, there are only about 75,000 different nondecreasing lists that accord with the Small limits. (You can use a combinatorial trick to find this value, or you can just experiment and see.)

One simple way to actually generate those lists is to start with a list consisting of only MINIMUM, then generate all new legal lists that append one more value to the end of that, then generate all new legal lists that append one value to the ends of those lists, and so on. Since the number of such lists is small, an approach like this is tractable. Once you have all the lists, you can check each of them to see if it has the desired properties, and return the length of the shortest such list, or IMPOSSIBLE if none of the lists works.

- Large dataset
With values in the [1, 10000] range, and no upper bound on the answer, we will never be able to generate all possible lists in time. We need a general, non-brute-force solution.

Let's start with some special cases that might be easy to overlook:

- There are five sets of demands that make the task clearly IMPOSSIBLE, because they contradict the mathematical definitions of minimum, maximum, mean, and median:
	- MAXIMUM < MINIMUM
    - MAXIMUM < MEDIAN
    - MAXIMUM < MEAN
    - MEDIAN < MINIMUM
    - MEAN < MINIMUM

- The problem might be solvable with one department. This is possible if and only if MINIMUM, MAXIMUM, MEAN, and MEDIAN are all the same, so we can easily confirm or rule out this case.
- The problem might be solvable with two departments. This requires that MEAN and MEDIAN are both exactly (MINIMUM + MAXIMUM) / 2). If this is true, we have no reason to consider using more departments, so we are done.

Otherwise, suppose that the problem is solvable with three departments. Then those three values must be MINIMUM, MEDIAN, and MAXIMUM. Assuming that these values do not already have the correct MEAN, perhaps we can insert more values until they do. We can repeatedly insert one value to the left of the median and one value to the right. First, we figure out how much the mean of the existing three values deviates from the desired mean. (To avoid errors associated with floating-point computation, it is better to compare the values' sum with MEAN times the number of values.) Suppose (without loss of generality) that the existing sum of values is too large. Then we can figure out which two values to insert to bring down this surplus as much as possible; usually, they will be another copy of MINIMUM (on the left) and another copy of MEDIAN (on the right). If inserting even one such pair won't reduce the surplus — that is, if MEDIAN + MINIMUM is no smaller than 2 × MEAN — then this method will never work. Otherwise, we can keep doing this until the surplus is gone. If inserting that last pair of MINIMUM andMEDIAN would overshoot the surplus by an amount K, we can just insert MINIMUM + K instead of the usual MINIMUM; this value will never exceed MEDIAN.) We don't even need to carry out each such step individually; we can figure out exactly how many will be needed.

Note that since we always insert one value to the left of our original MEDIAN and one to the right, the list always has a copy of MEDIAN in the right place. Also, given any other valid list of odd length, we can sort that list's values in nondecreasing order and pair them off (ignoring the first, last and middle elements, which are fixed): the second value with the second-to-last value, etc. Each of the pairs produced by our method contributes maximally towards reducing the surplus (except possibly the last one of value MINIMUM + K). So no valid list of odd length can be strictly shorter, as the total contribution would be strictly smaller.

We aren't done yet, though, because the above method only produces lists with an odd number of elements. So, regardless of what that method determined, we need to try something similar starting with four departments: MINIMUM, MEDIAN, MEDIAN, and MAXIMUM. (You may notice that we could also consider MEDIAN - 1 and MEDIAN + 1, among other possible pairs, in place of MEDIAN and MEDIAN. But there is no reason to consider this, because it would only restrict the range of new values we can insert, and thus require more values to adjust the mean.) Once we get our answer from this four-department method, we can take the smaller of its answer and the three-department method's answer, or IMPOSSIBLE if neither method worked.

This solution runs in constant time. Our efficiency-loving bosses at the 4M Corporation will certainly be happy with that!

## Code
```c++
#include <iostream> 
#include <cstdio>
#include <algorithm>
typedef long long ll;
using namespace std;
const long long INF = 1000000000000000000LL;

long long odd(long long Min, long long Max, long long Mean, long long Median) {
	long long diff = Min + Max + Median - Mean * 3;
	if (diff == 0)
		return 3;
	long long tmp = Mean * 2 - Min - Median;
	if (diff < 0) {
		diff = -diff;
		tmp = Max + Median - Mean * 2;
	}
	return (tmp <= 0) ? INF : ((diff - 1) / tmp + 1) * 2 + 3;
}

long long even(long long Min, long long Max, long long Mean, long long Median) {
	if (Mean * 2 == Min + Max && Median == Mean)
		return 2;
	long long diff = Min + Max + Median * 2 - Mean * 4;
	if (diff == 0)
		return 4;
	long long tmp = Mean * 2 - Min - Median;
	if (diff < 0) {
		diff = -diff;
		tmp = Max + Median - Mean * 2;
	}
	return (tmp <= 0) ? INF : ((diff - 1) / tmp + 1) * 2 + 4;
}
void main() {
	freopen("D-large-practice.in","r",stdin);
	freopen("D-large-practice.out","w",stdout);
	/********************************************/
	int T;
	cin >> T;
	for (int i = 1; i <= T; ++i) {
		bool ans = true;
		long long res = 0;
		int minimum, maximum, mean, median;
		cin >> minimum >> maximum >> mean >> median;
		if (minimum <= maximum && mean >= minimum && mean <= maximum && median >= minimum && median <= maximum) {
			if (minimum == maximum) {
				res = 1;
			}
			else {
				res = min(odd(minimum, maximum, mean, median), even(minimum, maximum, mean, median));
				if (res >= INF) {
					ans = false;
				}
			}
		}
		else {
			ans = false;
		}
		if (ans) {
			cout << "Case #" << i << ": " << res<< endl;
			fprintf(stderr, "Case #%d: %d\n", i, res);
			fflush(stdout);
		}
		else {
			cout << "Case #" << i << ": " << "IMPOSSIBLE" << endl;
			fprintf(stderr, "Case #%d: IMPOSSIBLE\n", i);
			fflush(stdout);
		}
		
		
	}
	/********************************************/
	fclose(stdin);
	fclose(stdout);
}
```

## Reference

- [Kickstart Round C 2017](https://code.google.com/codejam/contest/4344486/dashboard#s=p0)
- [Kickstart Round C 2017 Contest Analysis](https://code.google.com/codejam/contest/4344486/dashboard#s=a&a=1)