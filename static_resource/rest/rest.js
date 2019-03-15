window.onload = function load() {
    console.log('load start');
    let buttons = $("#restForm").find('input[type="button"]');
    $(buttons).each(function (index, element) {
        // クリックイベントを設定
        $(element).on('click', createRequest);
    })
    return false;
}

/**
 * リクエスト方法ボタン押下時処理.
 */
function createRequest() {
    let form = $(this).closest('form');
    // form.action = 'http://localhost:5000' + form.action;
    // form.method = $(this).val();
    // form.submit();
    var data = {};
    form.find('input[type="text"]').each(function (index, element) {
        // パラメータを集約
        data[element.name] = element.value;
    })

    // URL生成
    let url = form.attr('action') + $('#feature').val();

    // Ajax実施
    callAjax(url, $(this).val(), data);
}

function callAjax(url, method, data) {
    console.log(url);
    console.log(method);
    console.log(data);

    $.ajax({
        url: 'http://localhost:5000' + url,
        type: method,
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: "json"
    }).then((...args) => {
        // done 正常終了時
        const [data, textStatus, jqXHR] = args;

        console.log('done', jqXHR.status);
        $('#result').val(JSON.stringify(data));
    }).catch((...args) => {
        // fail 通信失敗時
        const [jqXHR, textStatus, errorThrown] = args;

        console.log('fail', jqXHR.status);
    }).then(() => {
        // always 常に処理される
        console.log('always');
    });

    return false;
}

/**
 * ファイルアップロード時にBase64化する
 * @param {*} imgfile 
 */
function fileget(imgfile) {
    if (!imgfile.files.length) return;
    var file = imgfile.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        $("#base64area").val(reader.result);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}