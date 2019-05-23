# jquery-to-js
Project Platzi Video website created using Jquery and also a similiar with JS vanilla.

## Objectives
Created site using vanilla Js and compare it with Jquery

## Procesos asíncronos
Un proceso asíncrono es un código que se está ejecutando, pero no ha terminado de ejecutarse antes de que se ejecute un código que está después de él.

Esto permite que la aplicación no se cuelque mientras está ejecutando un proceso muy largo.

## Variables
var es la forma de crear variables hasta ES5.
const es para declarar constantes.
let es para crear variables que cambian.

## Funciones
```js
functioncambiarNombre(nuevoNombre) {
  cambia = nuevoNombre;
}

//Desde EC6, las funciones se pueden declarar como arrow functions.
cambiarNombre = (nuevoNombre) => {
  cambia = nuevoNombre;
}
```

## Promesas
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
## Timers
setInterval() se ejecuta cada cierto tiempo.
setTimeout() se ejecuta una sola vez luego de un periodo de tiempo.
* Los tiempos se asignan en ms

## Ajax
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

## Asincronismo
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
* Las dos formas de hacerlo serían:
- Con async/await
```js
// Con async/await
const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
console.log(actionList)
```
- Con then() y catch()
```js
// Con then() y catch()
getData('https://yts.am/api/v2/list_movies.json?genre=action')
  .then(function(data){
    console.log('actionList',data)
  })
  .catch()
```

## Selectores
Los selectores sirven para obetener un elemento de dom y agregarle atributos, clases, etc.
EJM: Tomar un selector de las peliculas y agregarle una lista
```js
// Un selector en JQuery sería: . para clase y # para id
const $home = $('.home .list #item')
```
De los anterior, por convension $ se recomienda usar para elementos del DOM, y va a encontrar un elemento con clase home, adentro con clase list y adentro con el id item.
```js
// Con vanilla JS
const $modal = document.getElementById('modal') //elemento único
const $modals = document.getElementsByClassName('modal')
// El primer elemento está en
const $modal1 = $modals[0]
const $divs = document.getElementsByTagName('div') //Buscando por el tag
```
El query selector busca el primero que coincida con un selector o todos
```js 
const $primerModal = document.querySelector('.modal')
const $todosModal = document.querySelectorAll('.modal')
```
Es posible buscar no solo sobre el DOM completo, sino sobre selectores ya seleccionados
```js 
  $modal.querySelector('#modal img')
```

## Templates
Las plantillas definen el componente de un contenedor desd JS
Si mi HTML tiene 

```html
<div class="primaryPalyListItem">
    <div class="primaryPalyListItem-image">
      <img src="">
    </div>
    <h4 class="primaryPalyListItem-title">
      Titulo
    </h4>
</div>
``` 
```js 
`<div class="primaryPalyListItem">
    <div class="primaryPalyListItem-image">
      <img src="${src}">
    </div>
    <h4 class="primaryPalyListItem-title">
      ${title}
    </h4>
</div>`
``` 

## Creación de DOM
Para crear un elemento del DOM se usa:
```js 
// Paso 1:Crea un elemento HTML
const $html = document.implementation.createHTMLDocument();
// Paso2: Se asigna un elemento al html con innerHTML
$html.body.innerHTML = '<p>Párrafo<\p>'
// Paso3: Luego se le adiciona el ejemnto html a un selector
$actionContainer.append($html.body.children[0])
``` 
Para borrar un elemento de mi HTML, se usa remove()
```js
$container.children[0].remove();
```
Donde en el selector container, el primer hijo será borrado

## Eventos
Mirar la doc en MDN para tomar los eventos del navegador o el DOM.
-  Con JS para escuchar un evento sobre algun elemento
```js
$element.addEventListener('click',()=>{
   alert('click')
})
```
- Con JQuery
```JS
$('.element').on('click',()=>{
  alert('click')
})
```
- Con el evento de submit hay una pequeña recarga de la página. Ésta puede quitarse del siguiente modo
```js
const $form = document.getElementById('form')
$form.addEventListener('submit',(event)=>{
    event.preventDefault()
})
```
El formulario envía los datos del input de estos. Por defecto hace la recarga para que sean llevados a un backend

## CLases y estilos
Cambiar agregar y modificar las etiquetas desde JS al CSS.
- PAra tomar un selector desde el inspector se hace con **$0**
```js
$0.classlist.add('clase') //Agrega una clase
$0.classlist.remove('clase') //Quita una clase
$0.classlist.togle('clase') //La quita o pone 
```
Tambien es posible agregar cualquier estilo a un elemento con la propiedad style.
```js
$0.style.animation = 'modalIn .8s forwards'
```

## Creación de elementos y asignación de atributos
PRimero se crea un elemento, el cual será el $loader
```js
const $loader = document.createElement("img");
```
Con Jquery se asignan atributos así:
```js
$("#element").attr({
  src: "",
  height: ""
})
```
Con JS se asignan así:
```js
$element.setAttribute("src", "img/foto.png");
```
Para obtener atributos del DOM sería así:
```js
const src = $element.setAttribute("src")
```
Para asginar múltiples atrbutos sería así:
```js
function setAttributes($element, attributes) {
  for(const attribute in attributes) {
    $element.setAttribute(attribute, attributes[attribute]);
  }
}
```

## Formularios
FormData() es una interfaz que te permite obtener valores de un formulario y datos dentro de este.
```js```
```js
  //Donde $form es el selector al formulario
  const data = new FormData($form)
  data.get('name') //obtiene el valor del formulario con el valor en 'name'
```

## Destructuración de objetos (asignacioón por destructuración)
*Destructuring assigment* permite entrar a un objeto o lista y poder sacar un dato para asignarlo a otra variable.
Si inicialmente se tiene lo siguiente:
```js
const peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
const HTMLStringFeat = createFeaturingTemplate(peli.data.movies[0])
```
Al obtener peli que es una lista, se tiene que pasar data.movies[0], osea, entrar dentro de la lista obtenida.
Es posible realizar la busqueda indicando que se quiere previamente, para buscar algo específico.
Se debe destructurar así.
```js
const {
    data: {
        movies: pelis
    }
} = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
```
Se ve que a movies se le asigna el nombre de pelis. Ahora pelis es el que se pasa.
```js
const HTMLStringFeat = createFeaturingTemplate(pelis[0])
```
Esto mejora tiempos de búsqueda y cargas

## Dataset
Permite acceder a un objeto con todos los atributos *data* de un elemento DOM. Donde en el template se le asigna un data-id, data-catergory, etc.
```js
return (`<div class="primaryPalyListItem" data-id="${movie.id}" data-category=${category}>
</div>`)
```
Para acceder a este atributo sería así 
```js
// $0 se refiere al elemento
$0.getAttribute('data-id')
$0.getAttribute('data-category')
```
Otra forma sería con dataSet
```js
$0.dataset // {id:28833, category:'action'}
$0.dataset.id
$0.dataset.category
```
- **Transformar tipos de datos**

Cambiar un string a un entero
```js
parseInt($0.dataset.id)
parseInt($0.dataset.id,10) //En sabe 10
```

## Encontrando elementos de una lista (find)
find() devuelve el primer elemento de un array que cumpla con el criterio de búsqueda. Si no se encuentra ningún elemento devuelve undefined.
```js
functionfind(list, id) {
  return list.find(movie => movie.id === id)
}
```
Lo que retorna es un objeto donde se cumpla la condición, en este caso el objeto de la lista donde se cumple la posicion.Devuelve solo el primer elemento

* Información referencial:
https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/find

* Switch
Si se usa llave {} no es necesario usar un break
```js
switch (category) {
  case"action": {
    //código de action
  }
  case"drama": {
    //código de drama
  }
  default: {
    //código por defecto
  }
}
```

### Simplificar arrow function
Esto:
```js
functionfind(list, id) {
  return list.find( (movie) => {
    return movie.id === id
  })
}
```
Por esto:
```js
functionfind(list, id) {
  return list.find(movie => movie.id === id)
}
```

## Animaciones
Se puede agregar una animación a un elemento agregándole la clase de la animación respectiva.
```js
function renderMovieList(list, $container, category) {
  $container.children[0].remove();
  list.forEach((movie) => {
    const HTMLString = videoItemTemplate(movie, category);
    const movieElement = createTemplate(HTMLString);
    $container.append(movieElement);
    const image = movieElement.querySelector("img");

    image.addEventListener("load", (event) => {
      event.srcElement.classList.add("fadeIn");
    })

    addEventClick(movieElement);
  });
}
```
## Manejo de errores
En caso que no encuentre algo o el retorno se de mal o no haya internet.
* Se usa try - catch
```js
try{
  eval(alert('Hello'))
}
catch(error){
  console.log(error)
}
```
* Para eliminar un elemento previamente creado
```js
const loader = document.createElement('img')
// .
// .
// .
loader.remove() //Asi se elimina el elemento
```
#### API de error y throw
El Error crea un error y Throw lo lanza de manera intencional y tener un mensaje personalizada.
```js
throw new Error('Este es un error creado')
```
Cuando lance este error, el método que hizo el llamado ahora pasará al catch.

#### RETO
1.Para las colomnas de la izquierda, imprimir ista de amigos con nombre aleatorios.
https://randomuser.me/api para obtener amigos de una lista. Tambien tienen imagenes
2. Poner movies en el lado de las playlists






