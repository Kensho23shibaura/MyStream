//ここからバナーとアラート・ポップアップ
/*
-----使い方----
banner(title,text [,detail]);
  >>バナーを使う（バナーは10秒で自動的に消える）
    title(String) :バナーのタイトル
    text(String)  :バナーの内容、タグの使用可能
    detail(String):省略可、バナータッチ時に表示するポップアップの本文、タグの使用可能.

    Ex.)　banner("test","これはテスト","これはテストです。");

showAlert(title,txt[,popup[,fn]])
  >>ポップアップを使う。Okを押さなくても100秒後に閉じる
  title(String) :ポップアップのタイトル
  txt(String)   :バナーの内容、タグの使用可能
  popup(String) :省略可、デフォルトはhidden.

    -hidden  デフォルト値. 100秒で自動的に閉じるアラート。OKボタンのみある。fnを実行する。
    -noClose 自動的には閉じないアラート。OKボタンのみある。fnを実行する。
    -その他   自動的に閉じないコンファーム。キャンセルを押すと何もしない、OKを押すとfnを実行する

  fn(String)    :省略可。関数名もしくは function(){} を直接記述。OKを押した後に実行される。' or " で囲む必要あり。

  Ex.)　showAlert('テストです','このコンファームはテストです。','confirm','banner("やったー","コンファームが無事使えたよ！")');
        showAlert('テスト','自動的に消えます。');

*/
//ここからバナー
function banner(title, text, detail = text) {
  var div = document.createElement('div');
  div.className = "banner";
  div.setAttribute("onclick", "this.style.animation='animation-banner-up 0.5s';showAlert('" + title + "','" + detail + "','noClose')");
  var h1 = document.createElement('h2');
  h1.innerHTML = title;
  var p = document.createElement('p');
  p.innerHTML = text;
  div.appendChild(h1);
  div.appendChild(p);
  document.getElementsByTagName('body')[0].appendChild(div);
}

//ここからアラート
function showAlert(title, txt, popup = "hidden", fn = function () { }, fn2 = function () { }) {
  //タイトル、本文、(デフォルト=10秒閉じ,noClose=自動で閉じないアラート,その他＝confirm),関数ー＞""で囲む,Okayに渡される
  var div1 = document.createElement('div');
  div1.className = "bgAlert";
  var div2 = document.createElement('div');
  div2.className = "alert";
  var h2 = document.createElement('h2');
  h2.innerHTML = title;
  var p = document.createElement('p');
  p.innerHTML = txt;
  // p.style.fontSize = "30px";

  // 入力欄
  var input1 = document.createElement('input');
  input1.className = 'input_text';
  input1.id = 'Popup_InputText';
  input1.maxLength = 20;

  // 早押しボタン
  var tap = document.createElement('button');
  tap.style.background = "#5566FF";
  tap.className = 'tap_button';
  tap.innerText = "押す！";
  tap.setAttribute("onclick", "hideConfirm(this," + fn + ");");

  // 自動削除タイマー
  var time = document.createElement('div');
  time.innerText = "Auto Close : 30 sec.";

  // キャンセルボタン
  var cancel = document.createElement('button');
  cancel.innerText = "キャンセル";
  cancel.setAttribute("onclick", "hideConfirm(this);");
  if (["hidden", "noClose", "input"].includes(popup)) {
    cancel.style.visibility = "hidden";
  }

  // OKボタン
  var okay = document.createElement('button');
  okay.style.background = "#5566FF";
  okay.setAttribute("onclick", "hideConfirm(this," + fn + ");");
  okay.innerText = "OK";

  // NGボタン
  var ng = document.createElement('button');
  ng.style.background = "#FF6655";
  ng.setAttribute("onclick", "hideConfirm(this," + fn2 + ");");
  ng.innerText = "NG";

  // 辞書で要素のリストを定義
  const elementsMap = {
    'input': [h2, p, input1, okay],
    'tap': [h2, p, tap],
    'judge': [h2, p, ng, okay],
    'noClose': [h2, p, okay],
    'default': [h2, p, cancel, okay]
  };

  appendElements(div2, elementsMap[popup] || elementsMap['default']);

  div1.appendChild(div2);
  document.getElementsByTagName('body')[0].appendChild(div1);
  if (popup == "hidden" || popup == "tap") {
    div2.appendChild(time);
    var timeout = setInterval(function (time) { time.innerHTML = "Auto Close : " + (parseInt(time.innerHTML.replace(/[^0-9]/g, "")) - 1) + " sec."; }, 1000, time);
    setTimeout(function (div1, timeout) { clearInterval(timeout); div1.remove(div2); }, 31000, div1, timeout);
  }
}

// 指定した要素リストを親要素に追加
function appendElements(div2, elements) {
  elements.forEach(element => div2.appendChild(element));
}

function hideConfirm(obj) {
  obj.parentNode.parentNode.style.display = 'none';
}

function deleteConfirm() {
  document.querySelectorAll('.bgAlert').forEach(function (element) {
    document.body.removeChild(element);
  });
}

//ここからテーブル表示
function showTable(title, txt, popup = "hidden", fn = function () { }) {
  //タイトル、本文、(デフォルト=10秒閉じ,noClose=自動で閉じないアラート,その他＝confirm),関数ー＞""で囲む,Okayに渡される
  var div1 = document.createElement('div');
  div1.className = "bgAlert";
  var div2 = document.createElement('div');
  div2.className = "alert";
  var h2 = document.createElement('h2');
  h2.innerHTML = title;

  var table = document.createElement('table');
  table.style.tableLayout = 'auto'
  table.style.border = '1px solid white'
  table.className = "bgTable";
  var rows = txt.split("\n");

  var headerRow = document.createElement('tr');
  var headers = rows[0].split(",");
  for (var i = 0; i < headers.length; i++) {
    var th = document.createElement('th');
    th.innerHTML = headers[i];
    th.style.border = '1px solid white'
    // console.log(headers[i])
    headerRow.appendChild(th);
  }
  table.appendChild(headerRow);

  for (var j = 1; j < rows.length - 1; j++) {
    var dataRow = document.createElement('tr');
    // var data = rows[j].split(",");
    var data = rows[j].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
    for (var k = 0; k < data.length; k++) {
      var td = document.createElement('td');
      td.innerHTML = data[k].replace(/""/g, '"');
      td.style.border = '1px solid white'
      // console.log(data[k])
      dataRow.appendChild(td);
    }
    table.appendChild(dataRow);
  }

  var time = document.createElement('div');
  time.innerText = "Auto Close : 100 sec.";
  var cancel = document.createElement('button');
  cancel.innerText = "キャンセル";
  cancel.setAttribute("onclick", "hideConfirm(this);");
  if (popup == ("hidden")) cancel.style.visibility = "hidden";
  if (popup == ("noClose")) cancel.style.visibility = "hidden";
  var okay = document.createElement('button');
  okay.style.background = "#5566FF";
  //
  okay.setAttribute("onclick", "hideConfirm(this," + fn + ");");
  okay.innerText = "OK";
  div2.appendChild(h2);

  var tableContainar = document.createElement("div");
  tableContainar.style.overflowX = 'auto';
  tableContainar.style.maxHeight = '60vh';
  tableContainar.appendChild(table);

  div2.appendChild(tableContainar);
  div2.appendChild(cancel);
  div2.appendChild(okay);
  div1.appendChild(div2);
  document.getElementsByTagName('body')[0].appendChild(div1);
  if (popup == "hidden") {
    div2.appendChild(time);
    var timeout = setInterval(function (time) { time.innerHTML = "Auto Close : " + (parseInt(time.innerHTML.replace(/[^0-9]/g, "")) - 1) + " sec."; }, 1000, time);
    setTimeout(function (div1, timeout) { clearInterval(timeout); div2.remove(div1); }, 101000, div1, timeout);
  }
}