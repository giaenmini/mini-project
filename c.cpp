#include <iostream>
#include <algorithm>
using namespace std;

int longestIncreasingSubsequence(int a[], int n) {
    if (n == 0) return 0;
    
    int dp[100005];
    for(int i = 0; i< n; i++){
        dp[i] = 1;
    }
    int maxlengh = 1;

    for(int i = 0; i < n ;i++){
        for(int j = 0; j < i; j++){
            if(a[i] > a[j]){
                dp[i] = max(dp[i], dp[j] +1);
            }
        }
        maxlengh = max(maxlengh, dp[i]);
    }
    return maxlengh;
}

int main() {
    int a[] = {10, 22, 9, 33, 21, 50, 41, 60};
    int n = 8;

    int result = longestIncreasingSubsequence(a, n);
    cout << "Do dai day con tang dai nhat la: " << result << endl; // Kết quả: 5 (10, 22, 33, 50, 60)

    return 0;
}