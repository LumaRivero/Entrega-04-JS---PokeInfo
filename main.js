
// Definición de variables

const url = "https://pokeapi.co/api/v2/pokemon/"
const pokeLists = document.querySelector('.poke-lists');
//const form = document.querySelector('form');
const input = document.querySelector('.input-number-poke'); // Input number de HTML
const searchPoke = document.querySelector('.search-poke'); // form en html

// Fetch

const fetchPokes = async (event) => {
    event.preventDefault();

    const pokeId = input.value;
    if (pokeId.length == 0) {
        pokeLists.innerHTML = renderErrorId()
        return
    }

    const poke = await fetch(url+pokeId);
    if (poke.status == 404) {
        pokeLists.innerHTML = renderErrorNumber()
        return
    }

    const data = await poke.json();
    const renderHtml = 
            `<li> 
                <h2> Nombre: ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2> 
                <h3> Altura: ${calcPoke(data.height)} Metro/s </h3>
                <h4> Peso: ${calcPoke(data.weight)} Kgs </h4> 
                <h5> Tipo/s: ${data.types.map((element) => element.type.name)} </h5>
                <div id="pokes">
                    <img src="${data.sprites.other.home.front_default}" alt="Imagen de Pokemon">
                </div>
            </li>`;

    pokeLists.innerHTML = renderHtml
    //form.reset()
    return data;

}

    const calcPoke = (calc) => {
        let result = calc / 10;
        return result
    }
        
        
    const renderErrorNumber = () => 
        `<li class="li-error" style="border: solid red;"> <h2>Parece que no existe ese Pokemon</h2> </li>`
        
        
    const renderErrorId = () => 
        `<li class="li-error" style="border: solid red;"> <h2>Coloca un número del 1 al 890</h2> </li>`

//  Crear y Renderizar los pokemones y errores

const init = () => {
    searchPoke.addEventListener('submit', fetchPokes )
}
 init()