// 定义定时器全局变量
var id;

// x向下运动的频率

var intercal = 1000;

// 开始或继续游戏函数
function go() {

    // 如果当前的文字为 【开始游戏】那么点击之后首先需要刷新分数为 0
    if (document.querySelector('#action').innerHTML === '开始游戏') {
        if (map.myScore === 0) {
            document.querySelector('.score').innerHTML = 0
        }
    }
    //每隔一秒钟渲染最新场地数据
    // 这个返回的 id 值是在清除定时器的时候使用的
    id = setInterval(function () {

        // 触底检测是和自动向下的频率是相同的

        //清除砖块

        // 可移动砖块检测
        map.moveBrickDetection()
        // 刷新得分记录

        // 自动向下移动一次

        // 重新渲染一次

    }, 1000)
};

function clearAll() {
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].length; j++) {
            blocks[i][j] = 0
        }
    }
    map.render();
}