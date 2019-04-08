window.onload = function load() {
    console.log('load start');
    let buttons = $("#contents").find('input[type="button"]');
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
    let data = {};
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
        download(data);
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
        // download(reader.result);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

/**
 * Base64とMIMEコンテンツタイプからBlobオブジェクトを作成する。
 * 
 * @param base64
 */
function download(data) {

    var base64 = data.resData.body
    if (!base64) {
        return;
    }

    var mime_ctype = 'application/octet-stream';
    var blob = toBlob(base64, mime_ctype);

    // if (window.navigator.msSaveBlob) {
    //     // IEやEdgeの場合、Blob URL Schemeへと変換しなくともダウンロードできる
    //     window.navigator.msSaveOrOpenBlob(blob, "download.xlsx");
    // } else {
    // BlobをBlob URL Schemeへ変換してリンクタグへ埋め込む
    $("#file_dl").prop("href", window.URL.createObjectURL(blob));
    // リンクをクリックする
    document.getElementById("file_dl").click();
    // }
}

/**
 * Base64とMIMEコンテンツタイプからBlobオブジェクトを作成する。
 * 日本語対応。
 * 
 * @param base64 
 * @param mime_ctype MIMEコンテンツタイプ
 * @returns Blob
 */
function toBlob(base64, mime_ctype) {
    // 日本語の文字化けに対処するためBOMを作成する。
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);

    var bin = atob(base64.replace(/^.*,/, ''));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    // Blobを作成
    try {
        var blob = new Blob([bom, buffer.buffer], {
            type: mime_ctype,
        });
    } catch (e) {
        return false;
    }
    return blob;
}
