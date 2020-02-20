import {login} from './lib/index.js'
import { registro } from './register-view.js';
import { post } from './publicacion.js';
//INGRESO DE USUARIO
export function inicio(){

  const goog = document.getElementById('root');
goog.innerHTML=`
<section class="login" id="login">
<img src="img/logo2.png" alt="logo Finger Food" class="login__logo">
<h1 class="login__title">Bienvenid@!</h1>

  <div class="login__container">
     
      <div class="login__inputMail">
            <i class="fas fa-envelope icon"></i>
            <input type="email" class="login__inputText" id="login__email" placeholder="Email">
        </div>

      <div class="login__inputPassword">
          <i class="fas fa-key icon"></i>
          <input type="password" class="login__inputPass" id="login__password" placeholder="Contraseña">
        </div>

        <input type="submit" value="Acceder" id="login__accept" class="login__button">
        <p class="texto">Aún no estas registrado? Haz click en el siguiente botón</p>
        <input type="submit" value="Registrate" id="register" class="register__button">


  </div>    
</section>
  `
  const registrate= document.getElementById ('register');
  registrate.addEventListener('click', () => {
    registro();
  });

//aca le decimos que al presionar el btn nos guarde el mail y el password
const ingresar= document.getElementById ('login__accept');
ingresar.addEventListener('click', () => {
    console.log('123456');
    const correo2=document.getElementById('login__email').value;
    const contrasena2=document.getElementById('login__password').value;

    console.log(correo2);
    console.log(contrasena2);

    login(correo2, contrasena2);
    post();
    
});  


}
