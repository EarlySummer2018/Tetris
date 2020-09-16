class Map {
    // 设置格子大小为30 像素
    size = 30

    //设置格子间隙为 5 像素
    margin = 5

    myScore = 0
    //创建格子元素列表

    // 注意： 这里的blocks数组里面存放的是div元素
    // 访问这个数组的时候通过this.blocks[xx][yy]进行访问

    // 会根据 tetris.js 中同名的blocks数组中相应的位置的数字来判断该位置 的div应该是什么颜色，
    blocks = []

    //定义方法
    // 封装显示场地的方法

    show() {
        let box = $('#box');

        // 动态创建div代表场地
        let map = $('<div></div>')
            .width(13 * this.size + 12 * this.margin)
            .height(20 * this.size + 19 * this.margin)
            // 设置样式
            .css({
                backgroundColor: 'lightgreen',
                position: 'relative',
                margin: '0 auto'
            })
            .appendTo(box)
        for (let y = 0; y < 20; y++) {
            this.blocks.push([])
            for (let x = 0; x < 13; x++) {
                this.blocks[y].push($('<div></div>')
                    .width(this.size)
                    .height(this.size)
                    .css({
                        backgroundColor: 'white',
                        position: 'absolute'
                    })
                    .offset({
                        left: x * (this.size + this.margin),
                        top: y * (this.size + this.margin)
                    })
                    .appendTo(map))
            }
        }
    }

    // 封装砖块渲染的方法

    render() {
        // 遍历砖块数据，对应的砖块div设置颜色
        // 可移动方块为红色 1， 固定方块为蓝色 2，
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 13; x++) {
                switch (blocks[y][x]) {
                    case 0:
                        this.blocks[y][x].css('backgroundColor', 'white');
                        break;
                    case 1:
                        this.blocks[y][x].css('backgroundColor', 'red');
                        break;
                    case 2:
                        this.blocks[y][x].css('backgroundColor', 'blue');
                        break;
                }
            }
        }
    }

    // 封装可移动砖块的检测方法
    // 如果地图中已经没有可移动砖块，则添加一个
    moveBrickDetection() {

        // 默认没有可移动的砖块
        let flag = true

        // 遍历所有的方块，如果发现还有可移动的方块
        for (let y = 19; y >= 0; y--) {
            for (let x = 12; x >= 0; x--) {
                if (blocks[y][x] === 1) {
                    flag = false
                }
            }
        }
        // 如果没有可移动的方块
        if (flag) {

            // 新增一个可移动的方块
            shape.add()
        }
    }
    // 封装向下的移动方法
    down() {

        // 判断下移的前提条件
        let flag = true

        // 如果是到达场地的下边界或者下方是固定方块，那么都不能再下移
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 13; x++) {

                // 判断可移动砖块是否抵达了场地的下边界
                if (blocks[y][x] === 1 && y == 19) {
                    flag = false
                } else if (blocks[y][x] === 1 && blocks[y + 1][x] === 2) {
                    // 检查可移动方块下方是否是固定方块
                    flag = false
                }
            }
        }

        // 如果满足下移条件
        if (flag) {
            for (let y = 19; y >= 0; y--) {
                for (let x = 12; x >= 0; x--) {

                    // 判断当前砖块是否是可移动砖块
                    if (blocks[y][x] === 1) {

                        // 把这个格子下发设置为1
                        blocks[y + 1][x] = 1

                        // 把这个格子本身设置为0
                        blocks[y][x] = 0
                    }
                }
            }

            // 如果满足条件，才能够让形状原点下移
            shape.origin[0]++

            // 只有真正下移了，才能渲染新的砖块数据
            this.render()
        }
    }

    // 封装一个触底检测函数(包括固定方块)
    bottomTest() {

        // 默认是没有触底
        let flag = false

        // 判断形状的底部是否已经触底
        // 这里的pos表示遍历到的4个小方块的任意一格
        shape.getPos(shape.type, shape.angle).forEach(pos => {

            // 判断当前的砖块是否到达底部 {
            if (pos[0] >= 19) {

                // 表示已经触底
                flag = true
            } else if (blocks[pos[0] + 1][pos[1]] === 2) {

                // 判断当前形状的砖块的下方是否为固定方块
                // 注意： pos[0] 表示 y 值， pos[1] 表示 x 值

                // 表示已经触到下方的固定方块
                flag = true
            }
        })

        // 如果满足条件（即已经触底）
        if (flag) {

            // 把目前场地中的所有可移动砖块变为固体砖块   即从 1 变成 2
            this.change(1, 2)
        }
    }

    // 封装一个砖块的改变方法
    // prev 表示旧砖块的数据
    // next 表示新砖块的数据
    change(prev, next) {

        // 遍历砖块数据， 给对应的砖块 div 设置颜色
        // 空格为 0 表示白色， 可移动方块 1 表示 红色， 固定方块 2 表示 蓝色
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 13; x++) {

                // 判断当前砖块数据是否为 prev， 如果是，则将其转变为 next
                if (blocks[y][x] == prev) {
                    blocks[y][x] = next
                }
            }
        }
    }

    // 按左箭头
    left() {

        // 判断左移的前提条件，默认是可以左移
        let flag = true

        // 遍历所有的 20 行，13 列
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 13; x++) {

                // 判断可移动的方块是否到达了左边界
                if (blocks[y][x] == 1 &&( (x == 0) || ((blocks[y][x - 1]) == 2))) {
                    flag = false
                }
            }
        }
        // 如果满足条件
        if (flag) {
            for (let y = 0; y < 20; y++) {
                for (let x = 0; x < 13; x++) {

                    // 判断当前砖块是否是可移动的
                    if (blocks[y][x] == 1) {

                        // 把当前砖块的左边格子变为 1
                        blocks[y][x - 1] = 1

                        // 把当前砖块变为 0
                        blocks[y][x] = 0
                    }
                }
            }
            shape.origin[1]--;
            this.render();
        }
    }

    // 按右箭头
    right() {

           // 判断右移的前提条件，默认是可以左移
           let flag = true

           // 遍历所有的 20 行，13 列
           for (let y = 0; y < 20; y++) {
               for (let x = 0; x < 13; x++) {
   
                   // 判断可移动的方块是否到达了左边界
                   if (blocks[y][x] == 1 &&( (x == 12) || ((blocks[y][x + 1]) == 2))) {
                    flag = false
                }
               }
           }
           // 如果满足条件
           if (flag) {
               for (let y = 0; y < 20; y++) {
                   for (let x = 12; x >= 0; x--) {
   
                       // 判断当前砖块是否是可移动的
                       if (blocks[y][x] == 1) {
   
                           // 把当前砖块的左边格子变为 1
                           blocks[y][x + 1] = 1
   
                           // 把当前砖块变为 0
                           blocks[y][x] = 0
                       }
                   }
               }
               shape.origin[1]++;
               this.render();
           }
    }

    // 封装一个砖块消除检测的函数
    clearBrick() {

        // 遍历整个 block 砖块墙
        blocks.forEach((row, y) => {

            // row 是某一行的全部 13 个数据， y 表示当前遍历到的第几行

            // 检测某一行是否全部为固定方块
            let flag = row.every(block => {
                return block === 2
            })

            // 如果满足消除条件
            if (flag) {

                // 消除满足条件的这一行
                blocks.splice(y, 1)

                // 因为在最下方消除了一行， 所有需要在砖块数据的最上方添加一行
                blocks.unshift( [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                this.myScore += 100;
            }
        })
    }
}