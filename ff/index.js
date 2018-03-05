//  目标： 给定一个数以及一个数组，从数组中找到所有可以组成该数的方案（所有元素相加）（给定数组中不包含1）
//  如 从数组 [2,3,4,8,9] 中找到 7 的组成方案
//  那么返回应该是  [2,2,3], [3,4]
//  找到 8的组成方案 为 [2,2,2,2]， [2,3,3], [4,4], [8]


//  首先找到的一个解决方法是：对数组的每一个元素来计算，只要loop 就可以了
//  如 要 从 [ 2, 3, 4, 6, 7, 8]中找到 7 的组成
//  首先 大于7的元素排除掉， 剩下 [2,3,4,6,7]
//  检查是否有该元素存在， 有就存入数组中，没有进入下一步
//  7 = 2+ 5; 检查是否有 5 存在，存在就存入 【2，5】,不存在进入下一步
//  7 = 2 + 2 + 3; 检查是否有 3存在，存在就存入 [2,2,3],不存在则继续下一步
//  ....
//  7 = 2 + 2 + 2 + 1; 很明显，数组中不存在1， 跳过，检查3
//  即 7= 3 + 4; 7= 3+3+1;

//  具体的实现如下
    

// 找出比目标小的数，减少无必要的循环
const filterArr = (arr, target) => arr.filter(item => item < target && item > 0);


const check = (arr, target) => {

    let rslt = filterArr(arr, target).map(itm => {
        return loopFn(arr, target, itm)

        // 过滤掉无效的解决方案
    }).filter(itm => itm.length);

    // 检查是否含有目标元素
    if (arr.indexOf(target) > -1) {
        rslt.push([target])
    }

    return rslt;
}

function loopFn(arr, target, curVal, offset = 0) {

    let a = curVal;
    let len = target / curVal | 1;
    let tmp = [];
    let ttmp = [];

    // 循环找出包含当前元素的解决方案
    for (let i = 1; i < len; i++) {
        ttmp.push(a);
        if (arr.indexOf(target - (a * i + offset)) > -1) {
            tmp.push([...ttmp, target - a * i]);
        }
    }

    return tmp;

}
const originArr = [2, 3, 4, 5, 6, 7, 8, 9, 12, 15];
console.log(check(originArr, 7))




//  思考：
//  2和3的可以组成任意大于等于2的整数（可以重复利用）；
//  那么 任意一个元素 n = 2 * x + 3 * y， 即 【2，2...,2,3,3...,3】
//  ( x 个 2 和 y 个 3 进行排列组合 )，并且每两个 3 都可以用3个2代替 
