console.log('Hi ET')

/**
 * VARIABLES
 * const: no cambia y no se puede cambiar
 * let: cambia
*/
let cambia = 'Cambia'
const noCambia = 'No cambia'

function cambiaNombre(nombre) {
    cambia = nombre //Nombre es un parámetro de la función
}

/**
 * Promeses
 * Se asigna a una variable y recibe como param una función.
 * La funcion reciba a su vez 2 params: ok or bad.
 * Ejecuto todo bien si, está bien
 */
const getUser1 = new Promise( function(todoBien,todoMal){
    // Llamar a un API (demora cierto tiempo)
    setTimeout(function(){
        todoMal('Se acabo el tiempo') //Para que falle la promesa
    },3000) //
})
/**
 * Ahora al llamar a mi promesa, llamo a then si esta bien
 */
getUser1.
    then(function(){
        console.log('Todo muy bien en la promesa')
    })
    .catch(function(msg){
        console.log('Todo mal dentro de la promesa:',msg)
    })

const getUser2 = new Promise( function(todoBien,todoMal){
    // Llamar a un API (demora cierto tiempo)
    setTimeout(function(){
        todoBien('Se acabo el tiempo') //Para que falle la promesa
    },5000) //
})

const getUser3 = new Promise( function(todoBien,todoMal){
    // Llamar a un API (demora cierto tiempo)
    setTimeout(function(){
        todoBien('Good') //Para que falle la promesa
    },3000) //
})


/**
 * REcibe una lista de promesas
 */
Promise.all([getUser2,getUser3])
    .then( () => console.log('GOOD'))
    .catch( msg => console.log('BADD', msg))

Promise.all([getUser2,getUser3])
    .then( function() { console.log('GOOD2 ') })
    .catch( function (msg) {console.log('BADD2', msg)})    

//Con race solo devuelve la promesa que se resuelva primero
Promise.race([getUser2,getUser3])
    .then( function() { console.log('GOOD3 ') })
    .catch( function (msg) {console.log('BADD3', msg)})    


/**
 * AJAX con Jquery y con VAnilla
*/
$.ajax('https://randomuser.me/api/',{
    method:'GET',
    success:function(data){
        console.log(data)
    },
    error: function(error){
        console.log(error)
    },
})

//XMLHttpRequest - Usar fetch en vez de Jquery
fetch('https://randomuser.me/api/')
    .then(function(response){
        //console.log(response)
        return response.json()
    })
    .then(function(user){ //Fetch es una promesa que dentro develve una promesa, las promesas se pueden encadenar
        console.log('user:',user.results[0].name.first)
    })
    .catch(function(){
        console.log('FAlló algo')
    })




