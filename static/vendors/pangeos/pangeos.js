    var campos_vacios=[];

    document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'complete') {
        setTimeout(function(){
          hideLoader();
        },1000);
    }
  }


      function hideLoader() {
          jQuery("#loadingmodalbackground").css({"display": "none"});
          jQuery("body").css({"overflow": "auto"});
      }

      showLoader = async () => {
          const loadinglogo = "loading.gif";
          const loadingmodal = `
                  <div 
                      style="z-index: 9999;
                        background-color:#FFF;
                        top:0px;
                        left:0px;
                        width: 100vw;
                        height: 100vh;
                        background: rgb(255, 255, 255, 0.5);
                        position: absolute;"
                        id="loadingmodalbackground">
                    <div class="loader"></div>
                  </div>
                `;
                    // <img src='./GIF/`+loadinglogo+`' style='display: block; margin: auto; top: 40%; position: relative;' />
          jQuery("body").append(loadingmodal);
          jQuery("body").css({"overflow": "hidden"});
      }

    jQuery("#menuToggle").click(function() {
        menu_left = parseInt( (jQuery("#verticalmenu").css("left")).replace("px","") );
        if( menu_left < 0 ) {
            jQuery("#verticalmenu").animate({
                'left': '0px'
            }, 500);
        } else {
            jQuery("#verticalmenu").animate({
                'left': '-230px'
            }, 500);
        }
    });
    jQuery(".sublink").click(function(){
        submenu =  jQuery(".minisubmenu").css("display");
        if( submenu == 'none' ){
            jQuery(".minisubmenu").css({"display":"block"})
        } else {
            jQuery(".minisubmenu").css({"display":"none"});
        }
    });

jQuery(".pagenumber").click(function(e){
  e.preventDefault();
  page = jQuery(this).text();
  nClass = 'tp'+page;
  jQuery(".rowtablepage").css({"display":"none"});
  jQuery("."+nClass).css({"display":"table-row"});
  console.log(page);
});

  jQuery(".loadinglink").click(function(e){
      showLoader();
  });