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
      title: "Save As..",
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
