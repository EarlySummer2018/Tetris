// 定义定时器全局变量
var id;

var intercal = 1000;

// 用于存储加载audio对象
let music;

// 用于存储加载的不同的音乐
let loadeMusics = [];

// 记录上一次播放的下标
let prevNum = 0;

// 音乐列表
let musicNames = [
    '01_game_music.mp3',
    '02_game_music.mp3'
]
// 表示第一次点击
var flag = false;

// 第一次点击的时间
var firstTime;

// 第二次点击的时间
var secondTime;

// 金银铜元宝的位置
var goldBowlderShoe = [1, 5, 12, 18, 22, 28, 32, 38, 44, 47];
// 自动预加载音乐（只加载一次，不要每次都加载）
function loadMusic() {

    // 记录加载完成的音乐数量
    let musicCount = 0

    // 需要创建一个 audio 标签 (不需要放到循环中)
    music = new Audio();
    loadeMusics.push(music)
    music.src = './audio/' + musicNames[0];

    // 背景音乐预加载
    for (let i = 0; i < musicNames.length; i++) {
        music.onloadedmetadata = function () {
            musicCount++;
            if (musicCount == musicNames.length) {

                // 播放背景音乐，volume属性是设置音量 【0， 1】
                loadeMusics[0].volume = 0.5;

                // 可以重复播放 loop
                loadeMusics.loop = true;
            }
        }
    }
}

// 调用加载音乐函数
loadMusic();
let level = document.querySelector('#level');
level.addEventListener('change', function () {
    intercal = level.value
})
// 开始或继续游戏函数
function go() {

    if (id) return;
    // 如果当前的文字为 【开始游戏】那么点击之后首先需要刷新分数为 0
    if (document.querySelector('.action').innerHTML === '开始游戏') {
        if (0 == map.myScore) {
            document.querySelector('.score').innerHTML = 0
        }
    } else if (document.querySelector('.action').innerHTML === '继续游戏') {
        document.querySelector('.action').innerHTML = '开始游戏'
        if (0 == map.myScore) {
            document.querySelector('.score').innerHTML = 0
        }
    }
    //每隔一秒钟渲染最新场地数据
    // 这个返回的 id 值是在清除定时器的时候使用的
    id = setInterval(function () {

        // 触底检测是和自动向下的频率是相同的
        map.bottomTest()
        //清除砖块
        map.clearBrick()
        // 可移动砖块检测
        map.moveBrickDetection()
        // 刷新得分记录
        updateScore()
        // 自动向下移动一次
        map.down()
        // 重新渲染一次
        map.render()
    }, intercal)
};

// 刷新得分记录
function updateScore() {
    document.querySelector('.score').innerHTML = map.getScore()
}

function clearAll() {
    for (var i = 0; i < blocks.length; i++) {
        for (var j = 0; j < blocks[i].length; j++) {
            blocks[i][j] = 0
        }
    }
    map.render();
}

// 暂停游戏
function suspend() {

    // 如果游戏本来就没开始，那么反复点击无效
    if (!id) return

    clearInterval(id);
    id = 0

    // 同时将开始游戏的的按钮改成继续游戏
    document.querySelector('.action').innerHTML = '继续游戏'
}

// 停止游戏
function stop() {
    // if (!id) return
    clearInterval(id);
    id = 0
    clearAll();
    document.querySelector('.score').innerHTML = 0
    if (document.querySelector('.action').innerHTML === '继续游戏') {
        document.querySelector('.action').innerHTML = '开始游戏'
    }
}

//  点击开始播放音乐函数
function playMusic() {
    loadeMusics[0].play();
}

// 点击暂停音乐函数 使用 pause() 属性 
function suspendMusic() {
    loadeMusics[0].pause()
}

// 点击切换音乐函数
function nextMusic() {
    let num = randomFn();

    // 修改音乐源
    music.src = './audio/' + musicNames[num];

    // 播放音乐
    loadeMusics[0].play();

    // 重复播放
    loadeMusics[0].loop = true
}

// 产生随机数函数（要保证新的一次和上一次不重复）
function randomFn() {
    do {
        var newNum = Math.floor(Math.random() * musicNames.length)
    } while (newNum == prevNum);
    // 更新上一次的下标
    prevNum = newNum;
    return newNum;
}

// 监听 input 框 的改变来改变音乐的大小
let range = document.querySelector('#volumeRange');
range.addEventListener('input', function () {
    loadeMusics[0].volume = this.value / 100;
});

function beginLottery() {
    if (!flag) {

        firstTime = new Date();
    }
    if (flag) {
        secondTime = new Date()
        // 如果第一次点击和第二次点击的时间间隔小于 8 秒，则停止点击
        if (secondTime - firstTime <= 8000) {
            return
        }
        // 更新 firstTime
        firstTime = secondTime;
    }

    // 如果得分不足 500 分，则不允许抽奖
    if (map.getScore() < 500) {
        alert('每次抽奖需要500分，你的分数不够');
        return
    }
    map.myScore -= 500
    updateScore();
    flag = true;
    beautifulGirl();
}

// 封装产生奖品的函数
function beautifulGirl() {

    // 找到 box2 元素
    let box2 = document.getElementById('box2');

    // 创建 div 和 img 标签
    let div = document.createElement('div');
    let img = document.createElement('img');

    // 设置图片的 src 属性
    img.setAttribute('src', 'img/0.jpg');

    // 设置图片的 class 属性
    img.setAttribute('class', 'girPos');

    // 将 img 标签添加到 div 中
    div.appendChild(img);

    // 将 div 标签添加到 box2 中
    box2.appendChild(div)

    // 图片的起点位置在 8px 的位置
    var num = 8;
    // 设置定时器让图片下移
    var timerId = setInterval(function () {

        // 每隔 10 毫秒向下移动一次
        img.style.top = num++ + 'px';
        let randomNum = Math.floor(Math.random() * 49)
        img.src = './img/' + randomNum + '.jpg'

        if (num >= 490) {
            clearInterval(timerId)
            for (let i = 0; i < goldBowlderShoe.length; i++) {
                if (randomNum === goldBowlderShoe[i]) {
                    switch (randomNum) {
                        case 1:
                            map.myScore += 20000;
                            // alert('您抽到了【金元宝】奖励20000分')
                            break;
                        case 12:
                        case 18:
                            map.myScore += 15000;
                            // alert('您抽到了【银元宝】奖励15000分')
                            break;
                        case 22:
                        case 28:
                        case 44:
                            map.myScore += 10000;
                            // alert('您抽到了【铜元宝】奖励10000分')
                            break;
                        case 5:
                        case 32:
                        case 38:
                        case 37:
                            map.myScore += 5000;
                            // alert('您抽到了【绿元宝】奖励5000分')
                            break;
                    }
                    updateScore();
                }
            }
            setTimeout(function () {
                box2.removeChild(div);
            }, 1000)
            
        }
    }, 10)
}