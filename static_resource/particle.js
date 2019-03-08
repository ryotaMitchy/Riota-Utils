// HTML読み込み後に起動
window.onload = function () {
    // canvas取得
    var canvas = document.getElementById('draw');

    // 描画個数と位置の初期値を設定
    const NUM = 1000;
    canvas.width = 1080;
    canvas.height = 760;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    var speedX = new Array(NUM);
    var speedY = new Array(NUM);
    var locX = new Array(NUM);
    var locY = new Array(NUM);
    var radius = new Array(NUM);
    var r = new Array(NUM);
    var g = new Array(NUM);
    var b = new Array(NUM);
    var ctx;

    function init() {

        if (canvas.getContext) {
            ctx = canvas.getContext('2d');
            for (var i = 0; i < NUM; i++) {
                speedX[i] = Math.random() * 8.0 - 4.0;
                speedY[i] = Math.random() * 8.0 - 4.0;
                locX[i] = WIDTH / 2;
                locY[i] = HEIGHT / 2;
                radius[i] = Math.random() * 8.0 + 1.0;
                r[i] = Math.floor(Math.random() * 64);
                g[i] = Math.floor(Math.random() * 64);
                b[i] = Math.floor(Math.random() * 64);
            }
            setInterval(draw, 33);
        }
    }

    function draw() {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgba(8,8,12,.1)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.globalCompositeOperation = "lighter";

        for (var i = 0; i < NUM; i++) {
            //位置を更新
            locX[i] += speedX[i];
            locY[i] += speedY[i];

            if (locX[i] < 0 || locX[i] > WIDTH) {
                speedX[i] *= -1.0;
            }

            if (locY[i] < 0 || locY[i] > HEIGHT) {
                speedY[i] *= -1.0;
            }

            //更新した座標で円を描く
            ctx.beginPath();
            ctx.fillStyle = 'rgb(' + r[i] + ',' + g[i] + ',' + b[i] + ')';
            ctx.arc(locX[i], locY[i], radius[i], 0, Math.PI * 2.0, true);
            ctx.fill();
        }
    }

    function countUp() {
        if (canvas.width < 1400) {
            canvas.width = canvas.width + 2;
            canvas.height = canvas.height + 2;
        }
    }
    setInterval(countUp, 2000);

    init();
    // $("#draw").resizable({
    //     //alsoResize:"同期させる要素のセレクタ",
    //     ghost:true,
    //     aspectRatio:true,
    //     maxHeight:500,
    //     maxWidth:500,
    //     minHeight:30,
    //     minWidth:30
    // });
    // canvas.addEventListener("click",init());
}