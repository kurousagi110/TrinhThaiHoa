
// dùng vòng lập for để tính tổng các số nguyên từ 1 đến n
// đầu vào càng lớn thì thời gian chạy càng lâu O(n)
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// dùng công thức tính tổng các số nguyên từ 1 đến n
// thời gian chạy không đổi với mọi đầu vào O(1)
function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2;
}   

// dùng đệ quy để tính tổng các số nguyên từ 1 đến n
// đầu vào càng lớn thì thời gian chạy càng lâu O(n)
function sum_to_n_c(n: number): number {
    if (n <= 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
}

console.log(sum_to_n_a(10)); // Output: 15
console.log(sum_to_n_b(10)); // Output: 15
console.log(sum_to_n_c(10)); // Output: 15
