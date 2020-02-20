import {inicio} from '../login-view.js'
// aqui exportaras las funciones que necesites


//export const myFunction = () => {
   //aqui tu codigo
 //console.log('Hola mundo!');
//};

//ACA EXPORTAMOS LA FUNCION DE REGISTRO
export const newUser = (register__email, register__pass) => {
  firebase.auth().createUserWithEmailAndPassword(register__email, register__pass)
  .then(function(){
   verificar()
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    alert('Tú Email no a sido verificado')
    console.log(errorCode);
    console.log(errorMessage);
  });
}
//FUNCIÓN PARA VERIFICAR MEDIANTE CORREO
function verificar(){
  let user = firebase.auth().currentUser;
  user.sendEmailVerification()
      .then (function(){
      console.log('enviando correo')
       })
      .catch (function(error){
      console.log(error)
      })
}

 //ACA EXPORTAMOS LA FUNCION DE LOGIN
 export const login = (correo2, contrasena2) =>{
   //aca se guardan los datos de autentificación en firebase
 firebase.auth().signInWithEmailAndPassword(correo2, contrasena2)
 //Catch se ejecuta cuando hay algun error en la autentificación
 .catch((error) => {
     // Handle Errors here.
     const errorCode = error.code;
     const errorMessage = error.message;
     console.log(errorCode);
     console.log(errorMessage);
   });   
 }

 //ACA EXPORTAMOS LA FUNCION CERRAR
 export const cerrar = () => {
  firebase.auth().signOut()
  .then(function(){
      console.log('chao')
  })
  .catch(function(error){
      console.log('error')
  })
}

//OBSERVADOR, PARA VER SI UN USUARIO ESTA ACTIVO

function observador (){
    firebase.auth().onAuthStateChanged(function(user) {
        //si existe un usuario se ejecutara todo esto 
        if (user) {
            console.log('existe usuario activo')
          
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          console.log('no existe usuario activo')
        }
      });      
}
observador();



