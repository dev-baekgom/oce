$(document).ready(function() {
  make_url();
  reload_count();
  reload_preview();
  patch_note();
});

$( function() {
    $( "#preview_wrap" )
            .resizable()
            .draggable();
} );

function reload_preview(){
    var editorHTML = $("#editor").val();
    var iframe = document.getElementById('preview');
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(editorHTML);
    iframe.contentWindow.document.close();
}

function download(){
  bootbox.prompt({
      title: "<b>Save As..</b>",
      backdrop: true,
      callback: function (result) {
        if(result != null){
          if(result == ''){
            bootbox.alert({
              title: '<b>Hey!!</b>',
              message: '<b>Type something!!!',
              backdrop: true
            })
          }
          else {
            real_download(result);
          }
        }
      }
  });
}

function real_download(name){
  var text = document.getElementById("editor").value;
  text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
  var blob = new Blob([text], { type: "text/html"});
  var anchor = document.createElement("a");
  anchor.download = name;
  anchor.href = window.URL.createObjectURL(blob);
  anchor.target ="_blank";
  anchor.style.display = "none"; // just to be safe!
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

function reload_count(){
  var text = document.getElementById('editor').value;
  var letters =  text.length;
  var words = text.match(/\S+/g).length;
  document.getElementById('bottom_menu').innerHTML = letters + ' letters / ' + words + ' words' + "<i class='top-button fas fa-question-circle' style='margin-left: 10px' onclick='help();'></i><i class='top-button fas fa-info-circle' style='margin-left: 10px'  onclick='info();'></i><i class='top-button fab fa-github' style='margin-left: 10px' onclick='window.location.href = 'https://github.com/dev-baekgom/oce';'></i>";
}

function info(){
  bootbox.alert({
      title: "<b>Information 🧾</b>",
      message: "<b> made by : <a href='https://github.com/dev-baekgom'>dev-baekgom</a> <br><br> &lt;used plugins&gt; <br> 1. <a href='https://prismjs.com/'>prism</a> <br> 2. <a href='https://live.prismjs.com/'>prism-live</a> <br> 3. <a href='https://jquery.com/'>jquery</a> <br> 4. <a href='https://jqueryui.com/'>jquery ui</a> <br> 5. <a href='https://fontawesome.com/'>fontawesome</a> <br> 6. <a href='https://bootboxjs.com/'>bootbox</a> <br> 7. <a href='https://popperjs.com/'>popper</a> <br> 8. <a href='https://getbootstrap.com/'>bootstrap</a> <br><br> special thanks to :  <a href='https://google.com/'>google</a>, <a href='https://stackoverflow.com/'>stackoverflow</a>, odyssey members</b>",
      backdrop: true
  })
}

function help(){
  bootbox.alert({
    title: "<b>Need help? 💬</b>",
    message: "<b>Welcome to online editor! <br><br> 1. You can edit your code in the code area. <br> 2. Click the reload button to preview your code! <br> 3. Download it by clicking the download button! <br> 4. Share your code by clicking upload button! <br> 5. Open Your code by clicking the button next to it!</b>",
    backdrop: true
  })
}

var isCtrl = false;
document.onkeyup=function(e){
  reload_count();
  firebase.database().ref('html/code/' + url).set({
    text : document.getElementById('editor').value
  })
  if(e.keyCode == 17) isCtrl=false;
}

document.onkeydown=function(e){
  reload_count();
  firebase.database().ref('html/code/' + url).set({
    text : document.getElementById('editor').value
  })
  if(e.keyCode == 17) isCtrl=true;
  if(e.keyCode == 83 && isCtrl == true) {
      download();
      return false;
  }
}

function nts(num){
  var s = '', t;

  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = (num - t)/26 | 0;
  }
  return s || undefined;
}

var firebaseConfig = {
  apiKey: "AIzaSyA295_5XpT7iR9-2H7wANz_3mKAlXvfjL8",
  authDomain: "oce-fb.firebaseapp.com",
  projectId: "oce-fb",
  storageBucket: "oce-fb.appspot.com",
  messagingSenderId: "51123601799",
  appId: "1:51123601799:web:d6ac5e633774e546695322"
};
firebase.initializeApp(firebaseConfig);

function firebase_upload_code(url){
    bootbox.alert({
      title: "<b>Your Code's Url is..</b>",
      message: "<b>" + url + "</b>",
      backdrop: true
    })
}

function firebase_download_code(){
  bootbox.prompt({
      title: "<b>Enter your Code's Url</b>",
      backdrop: true,
      callback: function (result) {
        if(result != null){
          if(result == ''){
            bootbox.alert({
              title: '<b>Hey!!</b>',
              message: '<b>Type something!!!</b>',
              backdrop: true
            })
          }
          else {
            firebase.database().ref('html/code/'+ result + '/text').on('value', (snapshot) => {
              var text = snapshot.val();
              if(text == null){
                bootbox.alert({
                  title: '<b>Invaild Url</b>',
                  message: '<b>There is no such url!</b>',
                  backdrop: true
                })
              }
              else{
                url = result;
                document.getElementById('editor').value = text;
                $("code.language-html").text(text)
                Prism.highlightAll();
              }
            })
          }
        }
      }
  });
}

function make_url(){
  firebase.database().ref('code/num').on('value', (snapshot) => {
    var no = snapshot.val();
    url = nts(Math.floor(Math.random() * (no*9999999)) + 1);
    firebase.database().ref('html/code/' + url + '/text').once('value').then((snapshot) => {
      text = snapshot.val();
      if(text == null){
        firebase.database().ref('code/num').set(no+1);
        return url;
      }
      else{
        return make_url();
      }
    })
  })
}

function patch_note(){
  bootbox.alert({
    title: '<b>Patch Note 📒 + Alert 📢</b>',
    message: "<b>1. Better URL 🔗 <br>2. Live Sharing added 📲 <br><br> <span style='color: red;'>IMPORTANT ALERT!! 📢</span> <br> We regularly delete data from database to make space! <br> So make sure you download & backup your code!</b>",
  })
}
