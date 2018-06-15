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
    