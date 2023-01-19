/*      var campos_vacios=[];

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
      });*/

      var campos_vacios=[];


      jQuery(document).ready( function(){
          jQuery.ajax({
              url: 'menu.html',
              method: 'post',
              success: function(t){
                  var url = window.location.pathname;
                  if( url.lastIndexOf("/") > 0 ) {
                      url = url.substring(url.lastIndexOf("/")+1,1000);
                  }
                  jQuery("#menuContainer").html(t);

                  jQuery(".menulist").each( function(){
                      lnk = jQuery(this).children("a").attr("href");
                      if( lnk == url ) {
                          jQuery(this).children("a").addClass("active");
                          return false;
                      }
                  });

                  jQuery(".submenulist").each(function(){
                      lnk = jQuery(this).children("a").attr("href");
                      if( lnk == url ) {
                          jQuery(this).parent("ul").parent("li").children("a").eq(0).addClass("active");
                          return false;
                      }
                  });

                  jQuery(".submenulist3").each(function(){
                      lnk = jQuery(this).children("a").attr("href");
                      if( lnk == url ) {
                          jQuery(this).parent("ul").parent("li").parent("ul").parent("li").children("a").eq(0).addClass("active");
                          return false;
                      }
                  });

                  jQuery("#myToggle").click(function() {
                      console.log("click en menú");
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
                      jQuery(".minisubmenu").css({"display":"none"});
                      submenu =  jQuery(this).children(".minisubmenu").css("display");
                      if( submenu == 'none' ){
                          jQuery(this).children(".minisubmenu").css({"display":"block"})
                      } else {
                          jQuery(this).children(".minisubmenu").css({"display":"none"});
                      }
                  });
                  jQuery(".sublink2").click(function(){
                      jQuery(".minisubmenu2").css({"display":"none"});
                      submenu =  jQuery(this).children(".minisubmenu2").css("display");
                      if( submenu == 'none' ){
                          jQuery(this).children(".minisubmenu2").css({"display":"block"})
                      } else {
                          jQuery(this).children(".minisubmenu2").css({"display":"none"});
                      }
                  });
              }
          });
      });