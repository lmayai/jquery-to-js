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

/**
 * ASINCRONISMO:
 * USar la palabra async para determinar que la funcion es asincrona.
 * Y con await, se usa para definir que una funcion que devuelve una promesa,
 * Estará esperando que termine la función. y luego se ejecutará lo que se ponga
*/
async function load() {
    //await()
}

/**
 * SI se quiere llamar una funciión de una, sería así
 * Se pone entre parentesis y se pone luego doble parentesis.
 * Hasta que ambas promesas no acaben, no se ejecuta el console.log
 * Se puede usar promesas o async await
*/
(async function load() {
    //await()
    //action
    //drama
    //animation
    async function getData(url){
        const response = await fetch(url)
        const data = await response.json()
        return data
    }

    const $home = document.getElementById('home')
    const $form = document.getElementById('form')
    $form.addEventListener('submit',(event)=>{
        event.preventDefault() //prevenir recarga de la página
        $home.classList.add('search-active')
    })


    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
    const dramaList = await getData('https://yts.am/api/v2/list_movies.json?genre=drama')
    const animationList = await getData('https://yts.am/api/v2/list_movies.json?genre=animation')
    let dramaList2; 
    getData('https://yts.am/api/v2/list_movies.json?genre=drama')
        .then(function(data){
            console.log('dramaList2:',data)
            dramaList2 = data
        })
    console.log('actionList::',actionList)
    console.log('dramaList::',dramaList)
    console.log('animationList::',animationList)

//    function videoItemTemplate(src,title) {
    function videoItemTemplate(movie) {
        return (
            `<div class="primaryPalyListItem">
                <div class="primaryPalyListItem-image">
                    <img src="${movie.medium_cover_image}">
                </div>
                <h4 class="primaryPalyListItem-title">
                    ${movie.title}
                </h4>
            </div>`
        )
    }
    //console.log(videoItemTemplate('src/images/covers/bitcoin.jpg','Bitcoin'))

    function createTemplate(HTMLString){
        const $html = document.implementation.createHTMLDocument();
        $html.body.innerHTML = HTMLString
        return $html.body.children[0]
    }

    function addEventClick($element){
        $element.addEventListener('click',()=>{ 
            showModal()
        })
    }

    function renderMovieList(list,$container){ 
        $container.children[0].remove();
        //actionList.data.movies.forEach( (movie) => {
        list.forEach( (movie) => {
            const HTMLString = videoItemTemplate(movie)
            const movieElement = createTemplate(HTMLString)
            $container.append(movieElement)
            addEventClick(movieElement)
        })
    }

    const $actionContainer = document.querySelector('#action')
    const $dramaContainer = document.getElementById('drama')
    const $animationContainer = document.querySelector('#animation')

    const $featuringContainer = document.getElementById('featuring')

    const $modal = document.getElementById('modal')
    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')

    const $modalImage = $modal.querySelector('#modal img')
    const $modalTitle = $modal.querySelector('#modal h1')
    const $modalDescription = $modal.querySelector('#modal p')

    function showModal(){ 
        $overlay.classList.add('active')
        $modal.style.animation = 'modalIn .8s forwards'
    }

    $hideModal.addEventListener('click', hideModal)

    function hideModal(){
        $overlay.classList.remove('active')
        $modal.style.animation = 'modalOut .8s forwards'
    }

    renderMovieList(actionList.data.movies,$actionContainer)
    renderMovieList(dramaList.data.movies,$dramaContainer)
    renderMovieList(animationList.data.movies,$animationContainer)

})()