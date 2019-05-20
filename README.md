# jquery-to-js
Project Platzi Video website created using Jquery and also a similiar with JS vanilla.

### Objectives
Created site using vanilla Js and compare it with Jquery

### Procesos asíncronos
Un proceso asíncrono es un código que se está ejecutando, pero no ha terminado de ejecutarse antes de que se ejecute un código que está después de él.

Esto permite que la aplicación no se cuelque mientras está ejecutando un proceso muy largo.

### Variables
var es la forma de crear variables hasta ES5.
const es para declarar constantes.
let es para crear variables que cambian.

### Funciones
```js
functioncambiarNombre(nuevoNombre) {
  cambia = nuevoNombre;
}

//Desde EC6, las funciones se pueden declarar como arrow functions.
cambiarNombre = (nuevoNombre) => {
  cambia = nuevoNombre;
}
```

### Promesas
Una promesa es un objeto que representa la terminación o el fracaso eventual de una operación asíncrona.
```js
//Crear una promesa
const getUser = new Promise(function(todoBien, todoMal) {
  //llamar a un API
  todoBien("todo bien");
})

//Consumir una promesa
getUser
  .then(function(msn) { 
    //maneja cuando la promesa funciona correctamente.
  })
  .catch(function(msn) {
    //maneja cuando hay un error en la promesa.
  })

//Consumir varias promesas a la vez.
//El then se ejecutan cuando terminen todas las promesas.
//El catch se ejecuta en el primer error.
Promise.all([
  promesa1,
  promesa2
])
.then(function() {})
.catch(function() {})

//Se ejecuta el then de la promesa que termine primero.
Promise.race([
  promesa1,
  promesa2
])
.then(function() {})
.catch(function() {})
```
### Timers
setInterval() se ejecuta cada cierto tiempo.
setTimeout() se ejecuta una sola vez luego de un periodo de tiempo.
* Los tiempos se asignan en ms

### Ajax
- jQuery
```js
$.ajax("url", {
  method: "GET", //POST, PUT, DELETE
  success: function(data) {
    //se ejecuta cuando todo sale bien
    //data: lo que devuelve el api
  },
  error: function(error) {
    //se ejecuta cuando hay un error
    //error: mensaje de error del api
  }
})
```
-JavaScript
```js
fetch("url")
  .then(function(response) {

  })
  .catch(function(response) {

  })
```
Fetch devuelve una promesa. Esta promesa, a su vez, tiene un método llamado json() que regresa otra promesa con los datos en formato JSON.

### Asincronismo
Peticiones a: https://yts.am/api
Con async/await se maneja 'sincronamente' el asincronismo.
Y se convierte en otra manera de manejar promesas.
```js
(async function load() {
    //await()
    async function getData(url){
        const response = await fetch(url)
        const data = await response.json()
        return data
    }
    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
})()
```
En la anterior declaración se observa que solo una función con async será llamada con await, determinando que espera la respuesta de una promesa.
* Las promesas se pueden resolver con async/await o con .then y .catch. La elección de cual usar es decisón del programador.
Se observa que async/await es más legible y corta.