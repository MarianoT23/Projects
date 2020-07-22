///// Declaración constantes
const misListas = document.querySelector('[data-lists]')
const nuevaListaForm = document.querySelector('[data-nueva-lista-form]')
const nuevaListaInput = document.querySelector('[data-nueva-lista-input]')
const btnEliminarLista = document.querySelector('[data-btn-eliminar-lista]')
const listaIndContainer = document.querySelector('[data-lista-individual-container]')
const listaIndTitulo = document.querySelector('[data-lista-individual-titulo]')
const listaIndCount = document.querySelector('[data-lista-individual-count]')
const listaIndPendiente = document.querySelector('[data-lista-individual-pendiente]')
const templateElement = document.querySelector('#pendiente-template')
const nuevoPendienteForm = document.querySelector('[data-nuevo-pendiente-form]')
const nuevoPendienteInput = document.querySelector('[data-nuevo-pendiente-input]')
const btnEliminarPendiente = document.querySelector('[data-btn-eliminar-pendiente]')

///// Para guardar las listas en el Local Storage del Navegador, y evitar que se pierdan las mismas
const LOCAL_STORAGE_LIST_KEY = 'lista.pendientes'
const LOCAL_STORAGE_LISTA_SELEECIONADA_KEY = 'lista.pendientes.seleccionada'
let listas = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [] 
let listaSeleccionadaId = localStorage.getItem(LOCAL_STORAGE_LISTA_SELEECIONADA_KEY)


// CREAR NUEVA LISTA
nuevaListaForm.addEventListener('submit', e => {
   e.preventDefault()
   const nombreLista = nuevaListaInput.value
   if (nombreLista == null || nombreLista === '') return
   const lista = createList(nombreLista)
   nuevaListaInput.value = null
   listas.push(lista)
   saveAndRender()
})

function createList(nombre) {
    return { id: Date.now().toString(), nombre: nombre, pendiente: []}
}

// CREAR NUEVO PENDIENTE
nuevoPendienteForm.addEventListener('submit', e => {
    e.preventDefault()
    const nombrePendiente = nuevoPendienteInput.value
    if (nombrePendiente == null || nombrePendiente === '') return
    const pend = createPendiente(nombrePendiente)
    nuevoPendienteInput.value = null
    const listaSeleccionada = listas.find(lista => lista.id === listaSeleccionadaId)
    listaSeleccionada.pendiente.push(pend)
    saveAndRender()
 })
 
function createPendiente(nombre) {
    return { id: Date.now().toString(), nombre: nombre, completo: false}
 }

// LISTA ACTIVE
misListas.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === "li") {
        listaSeleccionadaId = e.target.dataset.listId
        saveAndRender()
    }
})

// TASK COUNTER
listaIndPendiente.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === "input") {
        const listaSeleccionada = listas.find(lista => lista.id === listaSeleccionadaId)
        const pendienteSeleccionado = listaSeleccionada.pendiente.find(pend => pend.id === e.target.id)
        pendienteSeleccionado.completo = e.target.checked
        save()
        renderConteoPendientes(listaSeleccionada)
    }
})

// BOTON ELIMINAR LISTA
btnEliminarLista.addEventListener('click', e => {
    listas = listas.filter(lista => lista.id !== listaSeleccionadaId)
    listaSeleccionadaId = null
    saveAndRender()
})

// BOTON ELIMINAR PENDIENTE
btnEliminarPendiente.addEventListener('click', e => {
    const listaSeleccionada = listas.find(lista => lista.id === listaSeleccionadaId)
    listaSeleccionada.pendiente = listaSeleccionada.pendiente.filter(pend => !pend.completo)
    saveAndRender()
})


// SAVE AND RENDER
function saveAndRender () {
    save()
    render()
}

function save () {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(listas))
    localStorage.setItem(LOCAL_STORAGE_LISTA_SELEECIONADA_KEY, listaSeleccionadaId)
}

function render() {
    limpiarElementos(misListas) // Elimina todo y re-renderea
    renderListas() 

    const listaSeleccionada = listas.find(lista => lista.id === listaSeleccionadaId)
    if (listaSeleccionadaId == null) {
        listaIndContainer.style.display = "none"
    } else {
        listaIndContainer.style.display = ""
        listaIndTitulo.innerText = listaSeleccionada.nombre
        renderConteoPendientes(listaSeleccionada)
        limpiarElementos(listaIndPendiente)
        renderPendientes(listaSeleccionada)
    }
}

function renderPendientes (listaSeleccionada) {
    listaSeleccionada.pendiente.forEach(pend => {
        const pendienteElemento = document.importNode(templateElement.content, true)
        const checkbox = pendienteElemento.querySelector('input')
        checkbox.id = pend.id
        checkbox.checked = pend.completo
        const label = pendienteElemento.querySelector('label')
        label.htmlFor = pend.id
        label.append(pend.nombre)
        listaIndPendiente.appendChild(pendienteElemento)
    })
}

function renderConteoPendientes(listaSeleccionada) {
    const pendienteIncompletoCount = listaSeleccionada.pendiente.filter(pend => !pend.completo).length
    const pendienteString = pendienteIncompletoCount === 1 ? "pendiente" : "pendientes"
    listaIndCount.innerText = `${pendienteIncompletoCount} ${pendienteString}`
}

function renderListas () {
    listas.forEach(lista => {
        const elementoLista = document.createElement('li')
        elementoLista.dataset.listId = lista.id
        elementoLista.classList.add("nombre-lista")
        elementoLista.innerText = lista.nombre
        if (lista.id === listaSeleccionadaId) {
            elementoLista.classList.add("lista-activa")
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