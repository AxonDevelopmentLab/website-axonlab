let already_showing_message=!1;function message(Text,Color){already_showing_message||(already_showing_message=!0,document.getElementById("callback.message").style.color=Color,document.getElementById("callback.message").innerHTML=Text,setTimeout(()=>{already_showing_message=!1,document.getElementById("callback.message").innerHTML="<br>"},5e3))}function block_download(){document.getElementById("callback.message").style.color="Color",document.getElementById("callback.message").innerHTML="Entre na sua conta para fazer o download."}function downloadApp(Name){if(!localStorage.getItem("account_token"))return block_download();$.post("https://axon-services.glitch.me/downloadService",{service:Name,account_token:localStorage.getItem("account_token")},function(data){return 400===data.status?message("Não foi possível fazer o download.","red"):401===data.status?(localStorage.clear(),block_download()):void window.open(data.url,"_blank")})}localStorage.getItem("account_token")||block_download();