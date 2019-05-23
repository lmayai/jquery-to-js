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
        //SI retorna peliculas
        if (data.data.movie_count>0){
            return data
        }
        throw new Error('No se encontraron pelis con ese nombre :(') 
    }

    const $home = document.getElementById('home')
    const $form = document.getElementById('form')
    const $featuringContainer = document.getElementById('featuring')

    function setAttributes($element,attributes){
        for (const key in attributes){
            $element.setAttribute(key,attributes[key])
        }
    }
    
    const BASE_API = 'https://yts.am/api/v2/'

    function createFeaturingTemplate(peli){
        return (
            `<div class="featuring">
                <div class="featuring-image">
                    <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
                </div>
                <div class="featuring-content">
                    <p class="featuring-title">Pelicula encontrada</p>
                    <p class="featuring-album">${peli.title}</p>
                </div>
            </div>`
        )
    }

    $form.addEventListener('submit',async (event)=>{
        event.preventDefault() //prevenir recarga de la página
        $home.classList.add('search-active')
        const $loader = document.createElement('img') //<img>
        // Ahora se agregan los atributos
        setAttributes($loader,{
            src:'src/images/loader.gif',
            height:50,
            width:50
        })
        $featuringContainer.append($loader)
        //$loader.setAttribute('src','valor') //<img src='valor'>

        // Uso de formData
        const data = new FormData($form)    
        //const peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
        //const HTMLStringFeat = createFeaturingTemplate(peli.data.movies[0])
        try {
            const {
                data: {
                    movies: pelis
                }
            } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
            const HTMLStringFeat = createFeaturingTemplate(pelis[0])
            $featuringContainer.innerHTML = HTMLStringFeat
        } catch (error) {
            alert(error.message)
            $loader.remove()
            $home.classList.remove('search-active')
            console.log("ERROR:",error)
        }
        

    })

//    function videoItemTemplate(src,title) {
    function videoItemTemplate(movie,category) {
        return (
            `<div class="primaryPalyListItem" data-id="${movie.id}" data-category=${category}>
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
            showModal($element)
        })
    }

    function renderMovieList(list,$container,category){ 
        $container.children[0].remove();
        //actionList.data.movies.forEach( (movie) => {
        list.forEach( (movie) => {
            const HTMLString = videoItemTemplate(movie,category)
            const movieElement = createTemplate(HTMLString)
            $container.append(movieElement)
            const image = movieElement.querySelector('img')
            //Cuando se cargue la imagen ahise anima
            image.addEventListener('load', (event) => {
                event.srcElement.classList.add('fadeIn')
            })
            addEventClick(movieElement)
        })
    }

    //const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
    //renderMovieList(actionList.data.movies,$actionContainer,'action')
    const {data: {movies: actionList}} = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
    const $actionContainer = document.querySelector('#action')
    renderMovieList(actionList,$actionContainer,'action')
    
    //const dramaList = await getData('https://yts.am/api/v2/list_movies.json?genre=drama')
    //renderMovieList(dramaList.data.movies,$dramaContainer,'drama')
    const {data: {movies :dramaList}} = await getData('https://yts.am/api/v2/list_movies.json?genre=drama')
    const $dramaContainer = document.getElementById('drama')
    renderMovieList(dramaList,$dramaContainer,'drama')
    
    //const animationList = await getData('https://yts.am/api/v2/list_movies.json?genre=animation')
    //renderMovieList(animationList.data.movies,$animationContainer,'animation')
    const {data:{movies:animationList}} = await getData('https://yts.am/api/v2/list_movies.json?genre=animation')
    const $animationContainer = document.querySelector('#animation')
    renderMovieList(animationList,$animationContainer,'animation')  

    let dramaList2; 
    getData('https://yts.am/api/v2/list_movies.json?genre=drama')
        .then(function(data){
            console.log('dramaList2:',data)
            dramaList2 = data
        })
    console.log('actionList::',actionList)
    console.log('dramaList::',dramaList)
    console.log('animationList::',animationList)    


    const $modal = document.getElementById('modal')
    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')

    const $modalImage = $modal.querySelector('#modal img')
    const $modalTitle = $modal.querySelector('#modal h1')
    const $modalDescription = $modal.querySelector('#modal p')

    function findById(list,id){
        return list.find( movie => movie.id===id )
    }

    function findMovie(id,category) {
        switch (category) {
            case 'action' :{
                return findById(actionList,id)
            }
            case 'drama' :{
                return findById(dramaList,id)
            }
            case 'animation':{
                return findById(animationList,id)
            }
            default :
                break;
        }
    }

    function showModal($element){ 
        $overlay.classList.add('active')
        $modal.style.animation = 'modalIn .8s forwards'
        const id = $element.dataset.id
        const category = $element.dataset.category
        const data = findMovie(parseInt(id,10),category)
        console.log(data)
        $modalTitle.textContent = data.title
        $modalImage.setAttribute('src',data.medium_cover_image)
        $modalDescription.textContent = data.description_full
    }

    $hideModal.addEventListener('click', hideModal)

    function hideModal(){
        $overlay.classList.remove('active')
        $modal.style.animation = 'modalOut .8s forwards'
    }

    
/**
 * RETO 1: crear playlist de titulos de películas
 * https://yts.am/api/v2/list_movies.json?limit=9
 */
    async function getMovieList(url){
        fetch
    }

    const $myPlayList = document.querySelector('.myPlaylist')

    function templatePlaylistMovies(movie){
        return (
        `<li class="myPlaylist-item">
            <a href="#">
            <span>
                ${movie.title}
            </span>
            </a>
        </li>`
        )
    }

    function renderPlaylistMovies(list,$element){
        list.forEach( movie => {
            const templateMovies = templatePlaylistMovies(movie)
            const HTMLString = createTemplate(templateMovies)
            $element.append(HTMLString)
        })
    }

    try {
        const getListMovies = await fetch('https://yts.am/api/v2/list_movies.json?limit=9')
        const {data:{movies:listMovies}} = await getListMovies.json()
        if(listMovies.lenght<=0){
            throw new Error('No hay lista de pelÍculas en tus sugeridos')
        }
        renderPlaylistMovies(listMovies,$myPlayList)
    }catch(error){
        alert(error.message)
    }
///////////// FIN RETO 1

/**
 * RETO 2: Lista de amigos
 * https://randomuser.me/api
*/
    const $myPlaylistFriends = document.querySelector('.playlistFriends')
    const NUMBER_FRIENDS = 5

    async function getFriend(){
        const queryGetFriend = await fetch('https://randomuser.me/api')
        const { 
            results: {
                0: {
                    name :friendName // {title - first -last,}
                }
            }
            , 
            results:{
                0:{
                    picture: {
                        thumbnail: friendImage
                    }
                }
            } 
        }
        = await queryGetFriend.json()
        debugger
        if (friendName===undefined || friendImage===undefined){
            throw new Error('No se puede desplegar la lista de amigos')
        }
        return {friendName,friendImage}
    }

    function createFriendTemplate(friend){
        return (
            `<li class="playlistFriends-item">
                <a href="#">
                    <img src="${friend.friendImage}" alt="Image" />
                    <span style="text-transform: capitalize">
                        ${friend.friendName.first} ${friend.friendName.last}
                    </span>
                </a>
            </li>`
        )
    }

    function renderFriend(friendObject,element){
        const templateFriend = createFriendTemplate(friendObject);
        const HTMLString = createTemplate(templateFriend);
        element.append(HTMLString);
    }

    try{
        for (let i =0;i<NUMBER_FRIENDS;i++){
            const friendObject = await getFriend()
            renderFriend(friendObject,$myPlaylistFriends)
        }
    }catch(error){
        alert(error.message)
    }

//FIN RETO 2

})() //END load()