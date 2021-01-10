$(document).ready(function() {
  reload_count();
  reload_preview();
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
              title: 'Hey!!',
              message: 'Type something!!!',
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
  document.getElementById('wordcount').innerHTML = letters + ' letters / ' + words + ' words';
}

function info(){
  bootbox.alert({
      title: "<b>Information</b>",
      message: "<b> made by : <a href='https://github.com/dev-baekgom'>dev-baekgom</a> <br><br> &lt;used plugins&gt; <br> 1. <a href='https://prismjs.com/'>prism</a> <br> 2. <a href='https://live.prismjs.com/'>prism-live</a> <br> 3. <a href='https://jquery.com/'>jquery</a> <br> 4. <a href='https://jqueryui.com/'>jquery ui</a> <br> 5. <a href='https://fontawesome.com/'>fontawesome</a> <br> 6. <a href='https://bootboxjs.com/'>bootbox</a> <br> 7. <a href='https://popperjs.com/'>popper</a> <br> 8. <a href='https://getbootstrap.com/'>bootstrap</a> <br><br> special thanks to :  <a href='https://google.com/'>google</a>, <a href='https://stackoverflow.com/'>stackoverflow</a>, odyssey members</b>",
      backdrop: true
  })
}

function help(){
  bootbox.alert({
    title: "<b>Need help?</b>",
    message: "<b>Welcome to online editor! <br><br> 1. You can edit your code in the code area. <br> 2.Click the play button to preview your code! <br> 3. Download it by clicking the download button on the top bar! <br><br> For more information, visit <a href='https://github.com/dev-baekgom/oce'>my github!</a></b>",
    backdrop: true
  })
}

var isCtrl = false;
document.onkeyup=function(e){
  reload_count();
  if(e.keyCode == 17) isCtrl=false;
}

document.onkeydown=function(e){
  reload_count();
  if(e.keyCode == 17) isCtrl=true;
  if(e.keyCode == 83 && isCtrl == true) {
      download();
      return false;
  }
}