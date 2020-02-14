// Este es el punto de entrada de tu aplicacion

//import { myFunction } from './lib/index.js';

//myFunction();

//REGISTRO DE USUARIO

const registrar= document.getElementById ('btn_registrar');
registrar.addEventListener('click', () => {
    console.log('fvg');
    const correo=document.getElementById('email').value;
    const contrasena=document.getElementById('password').value;

    console.log(correo);
    console.log(contrasena);

    firebase.auth().createUserWithEmailAndPassword(correo, contrasena)
    .then(function(){
     verificar()
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});

//INGRESO DE USUARIO

//aca le decimos que al presionar el btn nos guarde el mail y el password
const ingresar= document.getElementById ('btn_ingresar');
ingresar.addEventListener('click', () => {
    console.log('123456');
    const correo2=document.getElementById('email2').value;
    const contrasena2=document.getElementById('password2').value;

    console.log(correo2);
    console.log(contrasena2);

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
});  

//REGISTRO CON GOOGLE
const google = document.getElementById ('btn_google');
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

//OBSERVADOR, PARA VER SI UN USUARIO ESTA ACTIVO

function observador (){
    firebase.auth().onAuthStateChanged(function(user) {
        //si existe un usuario se ejecutara todo esto 
        if (user) {
            console.log('existe usuario activo')
            aparece ()
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
function aparece (){
    let contenido = document.getElementById('contenido');
    contenido.innerHTML = `
    <p>Bienvenido!</p>
    <button id= "cerrar"> cerrar sesión </button>
    
    `;
    //función para cerrar sesión

    const btn_cerrar =document.getElementById ('cerrar');
    btn_cerrar.addEventListener('click',() => {
        console.log('dfgsdf')
        firebase.auth().signOut()
    .then(function(){
        console.log('chao')
    })
    .catch(function(error){
        console.log('error')
    })
    })  
}

    //función para verificar mediante correo

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


//publicaciones 
  
const db = firebase.firestore ();

  const publicacion =document.getElementById('btn_post');
  publicacion.addEventListener('click', ()=>{
      console.log('hola')
  
      let name= document.getElementById('nombre').value;
      let posteo = document.getElementById('post').value;
  
  
  db.collection("post").add({
    post: posteo,
    nombre: name,
    
}) 
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

})