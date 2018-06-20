//Funcion display para index.html
function mostrar(){
    document.getElementById("seccion-alumnas").style.display = 'none';    //esto sirve para que GENERAL SEA CLICKEABLE
    }
    const gen=document.getElementById('general'); //VARIABLE EVENTO CLICK GENERAL
    const al=document.getElementById('alumnas');  // VARIABLE EVENTO CLICK ALUMNA
    
    gen.addEventListener("click",() => {
       document.getElementById("seccion-general").style.display = 'block'; 
      
       mostrar();
    });
    
    al.addEventListener("click",() => {
    document.getElementById("seccion-alumnas").style.display = 'block';   
    document.getElementById("seccion-general").style.display = 'none';
    });


    //Función y condiciones para usuario y contraseña de inicio.html
    function validar()
    {
    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contraseña").value;

    if(usuario== "alejandralima" && contraseña == "12345")
    {
        location.href ="http://127.0.0.1:5500/src/index.html";       //propiedad para direccionar a un link
    }
    else
    {
        alert("Usuario y/o contraseña inválidos. Por favor verifique sus datos.");
    }
    }



    