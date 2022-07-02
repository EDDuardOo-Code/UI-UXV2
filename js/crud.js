function registraUsuarios(){
    let usr = document.getElementById("usuarioR").value;
    let passwd = $("#contrasenaR").val();
    let confContrasena = document.getElementById("confirmaContrasena").value;

    if(passwd == confContrasena)
        $.ajax({
            type: "post",
            url: "http://localhost/grupo3cdsm/insertarUsuario.php",
            data: {usuario:usr,contrasena:passwd},
            dataType: "jsonp",
            jsonp: "jsoncallback",
            crossDomain: true,
            success: function(datos){
                if(datos.mensaje == "insertado"){
                    alert("Registro exitoso!!...");
                    document.getElementById("registroForm").reset();
                    $.mobile.changePage("#login",{transition:"flip"});
                }
                else
                    alert("Problemas al realizar el registro!!.....");
            }        
        });
    else
        alert("Verifica tus datos!!...");
}

function validarUsuario(){
    let usr = $("#usuario").val();
    let contr = $("#contrasena").val();

    $.ajax({
        type: "post",
        url: "http://localhost/grupo3cdsm/validarUsuario.php",
        data: {usuario:usr,contrasena:contr},
        dataType: "jsonp",
        jsonp: "jsoncallback",
        crossDomain: true,
        success: function(resp){
            if(resp.texto == "existe"){                
                mostrarUsuarios();
                $.mobile.changePage("#mostrarUsuarios",{transition:"slideup"});
            }
            else
                alert("Verifica tus credenciales...");
        }
    });
}

function mostrarUsuarios(){
    $("#listaUsuarios").empty();
    $.ajax({        
        url: "http://localhost/grupo3cdsm/muestraUsuarios.php",
        dataType: "jsonp",
        jsonp: "jsoncallback",
        crossDomain: true,
        success: function(registros){
            $.each(registros,function(i,campo){
                let li = document.createElement("li");
                li.id=i;
                li.innerHTML = "<a href='#actualizaElimina' data-role='button' class='ui-btn' onclick='verInformacion(this," + campo.id_usuario + ");'>" + campo.usuario + "</a>";
                document.getElementById("listaUsuarios").appendChild(li);
            });
        }
    });
}

let idUsr;

function verInformacion(usuario,idusr){
    idUsr = idusr;
    $.ajax({
        type: 'post',        
        url: "http://localhost/grupo3cdsm/muestraUsuario.php",
        data: {id:idusr},
        dataType: "jsonp",
        jsonp: "jsoncallback",
        crossDomain: true,
        success: function(fila){
            $.each(fila,function(i,campo){
                $("#usuarioA").val(campo.usuario);
                $("#contrasenaA").val(campo.contrasena);
            });
        }
    });
}

function actualizarUsuario(){
    let usr = $("#usuarioA").val();
    let passwd = $("#contrasenaA").val();

    $.ajax({
        type: "post",
        url: "http://localhost/grupo3cdsm/actualizaUsuario.php",
        data: {usuario:usr,contrasena:passwd,id:idUsr},
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function(resp){
            if(resp.mensaje == "actualizado"){
                alert("Registro actualizado...");
                document.getElementById("accionesForm").reset();
                $.mobile.changePage("#login",{transition:"flip"});
            }
            else
                alert("Hubo problemas de actualización!!...");
        }
    });
}

function eliminarUsuario(){
    $.ajax({
        type: "post",
        url: "http://localhost/grupo3cdsm/eliminaUsuario.php",
        data: {id:idUsr},
        dataType: "jsonp",
        jsonp: "jsoncallback",
        success: function(resp){
            if(resp.mensaje == "eliminado"){                
                document.getElementById("accionesForm").reset();
                $.mobile.changePage("#login",{transition:"flip"});
            }
            else
                alert("Hubo problemas de eliminación!!...");
        }
    });
}