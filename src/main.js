function mostrar(){
document.getElementById("texto").style.display = 'none';    //esto sirve para que GENERAL SEA CLICKEABLE
}
const gen=document.getElementById('general'); //VARIABLE EVENTO CLICK GENERAL
const al=document.getElementById('alumnas');  // VARIABLE EVENTO CLICK ALUMNA

gen.addEventListener("click",() => {
    document.getElementById("GENERAL").style.display = 'block';  
    
    mostrar();
});

al.addEventListener("click",() => {
document.getElementById("texto").style.display = 'block';    
document.getElementById("GENERAL").style.display = 'none';


});

