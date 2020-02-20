import {newUser} from './lib/index.js'
//REGISTRO DE USUARIO
export function registro (){

    const verlo = document.getElementById('root');
    verlo.innerHTML=`
    
    <section class="register" id="register">
          <img src="img/logo2.png" alt="logo Finger Food" class="register__logo">
          <h1 class="register__title">Regístrate!</h1>
    
          <div class="register__inputMail">
                <i class="fas fa-envelope icon"></i>
                <input type="email" class="register__inputText" id="register__email" placeholder="Email">
              </div>
    
          <div class="register__inputPassword">
              <i class="fas fa-key icon"></i>
              <input type="password" class="register__inputPass" id="register__pass" placeholder="Contraseña">
            </div>
    
          <input type="submit" value="Registrar" class="register__button" id="register__button">
            
      </section>
      `
    const registrar= document.getElementById ('register__button');
    registrar.addEventListener('click', () => {
        console.log('fvg');
        const correo=document.getElementById('register__email').value;
        const contrasena=document.getElementById('register__pass').value;
    
        console.log(correo);
        console.log(contrasena);
        
        newUser(correo, contrasena);
        
    });
    
    
    //REGISTRO CON GOOGLE
    const ingreso = document.getElementById('lele');
    ingreso.innerHTML=`
        <button type="button"  class="btn__rrss" id="login__googleBtn">
            <img src="img/googleColor.svg" alt="logo Google" class="btn__icon">
        </button>`
    
    const google = document.getElementById ('login__googleBtn');
    google.addEventListener('click', () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then (function(user){
            alert('google')
            console.log('user')
        })
        .catch (function(error){
            alert('error')
            console.log('error')
        })
    })

}

