localStorage.getItem("account_token")||redirect("account");let first_time_update=!1,formulary_action="",isMessage=!1;const account={username:void 0,email:void 0,plan:void 0};function updateAccount(){$.post("https://axon-services.glitch.me/auth/login",{raw:!0,token:localStorage.getItem("account_token"),getdata:["account"]},function(data){if(200!==data.status)return logout();account.username=data.account.username;let email="Não definido.",plan=("false"!==data.account.email&&(email=data.account.email),account.email=email,"Nenhum");0<data.account.plan&&(plan="Premium"),account.plan=plan,first_time_update||(first_time_update=!0,changePage("details"))})}function logout(){localStorage.clear(),redirect("account")}updateAccount();const elements={title:document.getElementById("title"),description:document.getElementById("description"),callback:document.getElementById("callback"),formulary:document.getElementById("all_formulary"),formulary_1:document.getElementById("field_1"),formulary_2:document.getElementById("field_2"),formulary_3:document.getElementById("field_3"),button:document.getElementById("button")};function formulary(PlaceholdersArray,Button){elements.formulary_1.value="",elements.formulary_2.value="",elements.formulary_3.value="",PlaceholdersArray[0]&&(elements.formulary_1.placeholder=PlaceholdersArray[0]),PlaceholdersArray[1]&&(elements.formulary_2.style.display="block",elements.formulary_2.placeholder=PlaceholdersArray[1]),PlaceholdersArray[2]&&(elements.formulary_3.style.display="block",elements.formulary_3.placeholder=PlaceholdersArray[2]),elements.button.innerHTML=Button,elements.formulary.style.display="block"}function changePage(ForPage){elements.formulary_2.style.display="none",elements.formulary_3.style.display="none",elements.formulary.style.display="none",elements.title.innerHTML="<br>",elements.description.innerHTML="<br>";var pages={details:()=>{elements.title.innerHTML=`Olá! bem-vindo(a) ${account.username}.`,elements.description.innerHTML=`Você está na sua dashboard, aqui você pode gerenciar a sua conta.<br><br><b>Seu nome de usuário</b><br>${account.username}<br><br><b>Seu E-Mail</b><br>`+account.email},plan:()=>{elements.title.innerHTML="Sua Assinatura",elements.description.innerHTML=`<b>Seu plano:</b><br>${account.plan}<br><br>Você sabia que ao adquirir <b>Premium</b> você ganha acesso ilimitado a todos serviços da AxonLab?<br>Entre em contato com o suporte para adquirir premium.`},change_username:()=>{elements.title.innerHTML="Mudar o Nome de Usuário.",formulary(["Seu novo nome de usuário","Sua senha","Confirme a sua senha"],"Alterar")},change_password:()=>{elements.title.innerHTML="Alterar a sua senha.",formulary(["Sua senha antiga","Sua nova senha","Confirme a sua nova senha"],"Alterar")},account_delete:()=>{elements.title.innerHTML="Deletar a sua conta.",elements.description.innerHTML="Ao deletar a sua conta, ela será bloqueada por <b>1 Semana</b>, e somente após esse prazo ela terá todos seus dados deletados do nosso banco de dados.<br><br>Durante o prazo de uma semana, você não poderá reutilizar os mesmos dados da sua conta para criar uma nova, isso só será possível após a exclusão completa do banco de dados.",formulary(["Sua senha","Confirme a sua senha",'Escreva "deletar" para confirmar'],"Deletar")}};for(const item of Object.keys(pages))document.getElementById("item."+item).style.color="#FFFFFF";document.getElementById("item."+ForPage).style.color="#9d0839",pages[formulary_action=ForPage]()}function message(Text,Color){isMessage||(isMessage=!0,elements.callback.style.color=Color,elements.callback.innerHTML=Text,setTimeout(()=>{isMessage=!1,elements.callback.innerHTML="<br>"},2e3))}function sendFormulary(){$.post("https://axon-services.glitch.me/account/edit",{token:localStorage.getItem("account_token"),action:formulary_action,field_1:elements.formulary_1.value,field_2:elements.formulary_2.value,field_3:elements.formulary_3.value},function(data){return 200===data.status?location.reload():401===data.status?logout():void message(data.message.text,data.message.color)})}elements.formulary_1.addEventListener("keypress",event=>{"Enter"===event.key&&(event.preventDefault(),sendFormulary())}),elements.formulary_2.addEventListener("keypress",event=>{"Enter"===event.key&&(event.preventDefault(),sendFormulary())}),elements.formulary_3.addEventListener("keypress",event=>{"Enter"===event.key&&(event.preventDefault(),sendFormulary())});