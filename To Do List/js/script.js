// Declaración constantes

const misListas = document.querySelector('[data-lists]')
const nuevaListaForm = document.querySelector('[data-nueva-lista-form]')
const nuevaListaInput = document.querySelector('[data-nueva-lista-input]')

// Para guardar las listas en el Local Storage del Navegador, y evitar que se pierdan las mismas

const LOCAL_STORAGE_LIST_KEY = 'lista.pendientes'
const LOCAL_STORAGE_LISTA_SELEECIONADA_KEY = 'lista.pendientes.seleccionada'
let listas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [] 
let listaSeleccionada = localStorage.getItem(LOCAL_STORAGE_LISTA_SELEECIONADA_KEY)

//

misListas.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === "li") {
        listaSeleccionada = e.target.dataset.listId
        saveAndRender()
    }
})

// CREAR NUEVA LISTA

nuevaListaForm.addEventListener('submit', e => {
    e.preventDefault()
    const nombreLista = nuevaListaInput.value
    if(nombreLista == null || nombreLista === '') return
    const lista = createList(nombreLista)
    nuevaListaInput.value = null
    listas.push(lista)
    saveAndRender()
})

function createList(nombre) {
    return { id: Date.now().toString(), nombre: nombre, pendiente: []}
}

function saveAndRender () {
    save()
    render()
}

function save () {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(listas))
    localStorage.setItem(LOCAL_STORAGE_LISTA_SELEECIONADA_KEY, listaSeleccionada)
}

function render() {
    limpiarElementos(misListas)
    listas.forEach(listas => {
        const elementoLista = document.createElement('li')
        elementoLista.dataset.listId = listas.id
        elementoLista.classList.add("nombre-lista")
        elementoLista.innerText = listas.nombre
        if (listas.id = listaSeleccionada) {
            listElement.classList.add("lista-activa")
        } 
        misListas.appendChild(elementoLista)
    })
}

// LIMPIAR LISTAS

function limpiarElementos(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render()