// Este es el punto de entrada de tu aplicacion

import {cerrar} from './lib/index.js'
import { inicio } from './login-view.js';

//FUNCION QUE MANDA LAS PUBLICACIONES A FIREBASE

export function post (){
    const leer = document.getElementById('root');
    leer.innerHTML=`
      <img src="img/logo2.png" alt="logo Finger Food" class="login__logo">
      
      <textarea class ="post" id="post" placeholder="ingresa tu texto acá"></textarea>
      <button class="btn_post" id="btn_post">Publicar</button>
      <button class="btn_post" id="btn_close">Cerrar sesion</button>
      
      <div id ="imp_post"></div>
      `
      
      //boton para cerrar sesion
      const cerrar_sesion =document.getElementById('btn_close');
      cerrar_sesion.addEventListener('click', ()=>{
          cerrar();
          inicio();
      });

       const db = firebase.firestore ();
     //aca le decimosq que al hacer click en el boton nos guarde el valor
      const publicacion =document.getElementById('btn_post');
      publicacion.addEventListener('click', ()=>{
          console.log('hola');
    
          //variables de los valores que vamos a guardar
        
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
    db.collection("post").onSnapshot((querySnapshot) => {
       impPost.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().post}`);
            impPost.innerHTML += `
            <div>
            <textarea class ="imp_post" id="imp_post" >${doc.data().post}</textarea>
            </div>
            
            `
        });
    });
}

