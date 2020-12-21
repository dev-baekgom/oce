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
    var name = "my_code_on_online_editor";
    var text = document.getElementById("editor").value;
    text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    var blob = new Blob([text], { type: "text/html"});
    var anchor = document.createElement("a");
    anchor.download = name + ".html";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none"; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}