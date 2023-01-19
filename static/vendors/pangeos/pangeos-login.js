        /* jQuery("#btnCancelar").click(function(event){
            event.preventDefault();
            window.location.href = "https://demoinp.gaipp.mx/produccion/index.html";
        }); */
        function showhideAlert() {
          jQuery("#serveranswer").css({"display":"block"});
          setTimeout(function(){ $("#serveranswer").css({"display":"none"}) }, 3500);
            
        }