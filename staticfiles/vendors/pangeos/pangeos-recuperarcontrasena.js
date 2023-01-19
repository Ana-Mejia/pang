        /* jQuery("#btnCancelar").click(function(event){
            event.preventDefault();
            window.location.href = "https://demoinp.gaipp.mx/produccion/index.html";
        }); */
        function showhideAlert() {
          jQuery("#serveranswer").css({"display":"block"});
          setTimeout(function(){ jQuery("#serveranswer").css({"display":"none"}) }, 3500);
            
        }
        /* $("#refresh-captcha").onclick = function() {
            alert("HM")
            $("#image-captcha").attr("src","http://127.0.0.1:8000/static/captcha/c.png")
        } */