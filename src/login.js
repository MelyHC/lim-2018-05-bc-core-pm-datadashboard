const user = document.getElementById('user');
const password = document.getElementById('password');
const formLogin = document.getElementById('form-login');

//Función y condiciones para usuario y contraseña de inicio.html
const validate = () => {
  if (user.value == 'alejandra@laboratoria.la' && password.value == 'laboratoria') {
    location.href = '../src/index.html';       //propiedad para direccionar a un link
  } else {
    alert('Usuario y/o contraseña inválidos. Por favor verifique sus datos.');
  };
};

formLogin.addEventListener('submit', (e)=>{
  e.preventDefault();
  validate();
})

