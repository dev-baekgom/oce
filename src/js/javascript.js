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
    alertify.prompt('Save As..', '', function(evt, value){real_download(value)})
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

var isCtrl = false;
document.onkeyup=function(e){
    if(e.keyCode == 17) isCtrl=false;
}

document.onkeydown=function(e){
    if(e.keyCode == 17) isCtrl=true;
    if(e.keyCode == 83 && isCtrl == true) {
        download();
        return false;
    }
}
