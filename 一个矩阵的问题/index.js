/**
 * Created by my on 2018/02/26.
 */


 // 类似于五子棋，横竖斜中任意一个满足三个连成一条线，就算赢，
 // 这个是用于计算目前有没有胜利的方案

 // 考虑，关于矩阵，竖向可以通过转置来变为横向，所以，只需要考虑横向以及斜对线的可能

 const emptyFlag = 'e';

/**
 * 矩阵转置
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
const matrixRotate = matrix => {
    return matrix[0].map(function (col, i) {
        return matrix.map(function (row) {
            return row[i];
        })
    });
}

/**
 * 找到数组中不一样的元素的位置， -1 为未找到
 * @param  {[type]} target [description]
 * @param  {[type]} arr    [description]
 * @return {[type]}        [description]
 */
const getTheDiffIndex = (target, arr) =>{
	return arr.findIndex(el=> el!==target);
}

/**
 * 监测一行是否能成功，即对目标元素是否有两个
 * @param  {[type]} taget [description]
 * @param  {[type]} row   [description]
 * @return {[type]}       [description]
 */
function checkIfHasRowP(target, row){
	return  (row.join('').match(new RegExp(target, 'g')) || []).length === row.length-1 && row.includes(emptyFlag) ;
}  

/**
 * 整个矩阵计算
 * @param  {[type]} target [将要寻找的目标]
 * @param  {[type]} matrix [已有矩阵]
 * @return {[type]}        [description]
 */
function checkMatrix(target, matrix){

	// 统一处理横向竖向,获取根矩阵
	let _matrix = [...matrix, ...matrixRotate(matrix)];
	
	//针对斜对线获取数组，
	let crossRows = [[],[]];
	matrix.map((row,idx)=>{
		crossRows[0].push(row[idx]);
		crossRows[1].push(row[row.length-idx-1]);
	
	});

	// 非斜对线处理
    let mRslt = _matrix.map((row, rowId)=>{

		const ifRotate =  rowId>(_matrix.length*.5-1); // 根据根矩阵的生成，当行数大于矩阵长度的一半时为转置矩阵

		if(checkIfHasRowP(target, row)){
			// 找到相关的位置，并根据ifRotate 判断是否翻转
			let idxStr = `${rowId%row.length}${getTheDiffIndex(target,row)}`;
			return ifRotate?idxStr.split('').reverse().join(''):idxStr
		}

		return '';
	});

	// 斜对线处理（坐标计算方式不一样）	
	// 斜对线只有两个数组，坐标规则是 x,x  或 x,y x+y= rowLen
	let cRlst = crossRows.map((row,rowId)=>{
		
		if(checkIfHasRowP(target, row)){
			// 找到相关的
			return `${getTheDiffIndex(target, row)}${Math.abs(rowId*(row.length-1) - getTheDiffIndex(target, row))}`; 
		}
		return '';
	})

	//去无效， 去重，并转换为二维数组
	return Array.from(new Set([...mRslt, ...cRlst].filter(s=>s.length>0))).map(it=>it.split(''))

}

const toTestMatrix =[ 
  ['x', 'e', 'e'],
  ['1', 'o', 'o'],
  ['e', 'e', 'e']
]

var rslt = checkMatrix('o', toTestMatrix)
console.log(rslt)
// testMatix(1, matrixRotate(toTestMatrix), true)