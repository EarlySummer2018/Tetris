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
        var box = $('#box');

        // 动态创建div代表场地
        var map = $('<div></div>')
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
        
    }
}