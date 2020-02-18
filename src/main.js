// Este es el punto de entrada de tu aplicacion

//import { myFunction } from './lib/index.js';

//myFunction();

//REGISTRO DE USUARIO
const verlo = document.getElementById('lala');
verlo.innerHTML=`

<h4>registro nuevo usuario</h4>
<input id ="email" type= "email" placeholder="Ingresa Email">
<input id ="password" type="password" placeholder="Ingresa Contraseña">
<button class="btn_registrar" id="btn_registrar">Registrar</button>
`
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
const goog = document.getElementById('root');
goog.innerHTML=`
<h4>ingreso de usuario existente</h4>
  <input id ="email2" type= "email" placeholder="Ingresa Email">
  <input id ="password2" type="password" placeholder="Ingresa Contraseña">
  <button class="btn_ingresar" id="btn_ingresar">Ingresar</button>
  `

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
const ingreso = document.getElementById('lele');
ingreso.innerHTML=`
  <h4>ingreso de usuario con google</h4>
  <button class="btn_google" id="btn_google">GOOGLE</button>`

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

//FUNCIÓN PARA VERIFICAR MEDIANT CORREO
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


//FUNCION QUE MANDA LAS PUBLICACIONES A FIREBASE
const leer = document.getElementById('lolo');
leer.innerHTML=`
  <input type="text" id="nombre" placeholder="nombre" class="nombre">
  <textarea class ="post" id="post" placeholder="ingresa tu texto acá"></textarea>
  <button class="btn_post" id="btn_post">Publicar</button>`

const db = firebase.firestore ();
 //aca le decimosq que al hacer click en el boton nos guarde el valor
  const publicacion =document.getElementById('btn_post');
  publicacion.addEventListener('click', ()=>{
      console.log('hola')

      //variables de los valores que vamos a guardar
      let name= document.getElementById('nombre').value;
      let posteo = document.getElementById('post').value;
  
  //colección que tenemos en database
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

//leer datos desde firebase


let impPost  = document.getElementById('imp_post');
db.collection("post").get()
.then((querySnapshot) => {
    publicacion.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().post}`);
        publicacion.innerHTML += `
        
        <div class ="imp_post" id="imp_post" >${doc.data().post}</div>
        
        `
    });
});
