// HTML読み込み後に起動
window.onload = function () {
    $("#button").on("click", restAjax());
}
function restAjax() {
    // data = {};
    // data["id"] = new Date().getTime();

    // 各フィールドから値を取得してJSONデータを作成
    var data = {
        "term": "2020",
    };
    
    // 通信実行
    $.ajax({
        type:"post",                
        url:"http://localhost:5000/heroku/if0009",        
        data:JSON.stringify(data), 
        contentType: 'application/json', 
        dataType: "json",           
        success: function(json_data) {   
          console.log(json_data);
        }
    });
}