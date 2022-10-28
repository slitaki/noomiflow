
/**
 * 把参数重的arr求和，并设置sum参数值
 * @param process 流程
 */
module.exports = function(process){
    const arr = process.getParam('arr');
    let sum = 0;
    for(let d of arr){
        sum += d;
    }
    process.setParam('sum',sum);
}