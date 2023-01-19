$(document).ready(function(){
    // CSS add ModelForm
    // Action for select Edad

    // Control form type User
    $("#id_perfil").change(function(){
        v = $(this).val();
        tipoUsr = v;
        if(v=='0') {
            console.log(v);
        } else {
            $("#form-wrapper").css({"display":"block"});
            if (v=='1'){
                $("#id_email").removeAttr("required");
                $("#id_email").css({"display":"none"});
                //$( "#id_email" ).addClass( ".ignore" );
            }
            if(v=='2') {
                $("#saveForm").attr("action", $("#saveForm").attr("inv_action"));
                $('#id_email').attr('required', 'required');
                $("#id_email").css({"display":"block"});
                //$( "#id_email" ).removeClass( ".ignore" )
            }
        }
    });

    // Submit form
    $("#saveForm").submit(function(e) {
        e.preventDefault(); // prevent actual form submit
        perfil = $("#id_perfil").val();
        console.log("Perfil: "+perfil);
        var form = $(this);
        var url = form.attr('action'); //get submit url [replace url here if desired]

        if( validarCURP() === false ) {
              Swal.fire({
                title: '¡Error!',
                text: 'Hay un error en la CURP ingresada.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            $("#id_curp").addClass("required-failed");
            return false;
        }

        if( ! $("input[name='sexo']").is(":checked") ) {
              Swal.fire({
                title: '¡Error!',
                text: 'Debes ingresar el sexo con el cual te identificas.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            return false;
        }

        if( perfil == 2 && validaCorreo() === false ) {
              Swal.fire({
                title: '¡Error!',
                text: 'Hay un error en el correo electrónico ingresado.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            jQuery("#id_email").addClass("required-failed");
            return false;
        }

        if( jQuery("#id_password").val() != jQuery("#id_password_confirm").val() ) {
              Swal.fire({
                title: '¡Error!',
                text: 'Las contraseñas no coinciden. Favor de revisar.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            jQuery("#id_password").addClass("required-failed");
            jQuery("#id_password_confirm").addClass("required-failed");
            return false;
        }

        if( jQuery("#captcha").val() != captcha_back ) {
              Swal.fire({
                title: '¡Error!',
                text: 'Hay un error en el CAPTCHA.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            jQuery("#captcha_back").addClass("required-failed");
            return false;
        }

        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes form input
            dataType: 'json',
            success: function(data){
                console.log("Success request. Estatus:" + data.status);
                console.log(data.msg);
                  Swal.fire({
                    title: 'PANGEOS dice:',
                    text: data.msg,
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                  });
                if( data.msg == "La solicitud fue registrada correctamente." ){                    
                    window.location = "/";
                }
            }
        });        
    });
});

// Function input Edad
function onlyNumberKey(evt) { 
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode 
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) 
        return false; 
    return true; 
}

// Function input CURP
function validarCURP() {
    var CURP = ($("#id_curp").val()).toUpperCase();
    var patt = new RegExp("^[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]$");
        return patt.test(CURP);
}

// Function input Email
function validaCorreo() {
    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if (regex.test(jQuery('#id_email').val().trim())) {
        return true;
    } else {
        return false;
    }
}

$("input").on("blur", function(){
    _class = $(this).attr("class").indexOf("required-failed");
    _val = $(this).val().length;
    console.log(_class);
    console.log(_val);
    if( _class > -1 && _val > 0 ) {
        $(this).removeClass("required-failed");
    }
});