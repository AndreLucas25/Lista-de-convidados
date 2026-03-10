const input = document.querySelector("input")
const buttonAdd = document.querySelector("#btn")
const ul = document.querySelector("ul")

let convidados = JSON.parse(localStorage.getItem("convidados")) || []

function salvarConvidados(){
    localStorage.setItem("convidados", JSON.stringify(convidados))
}

// Criar botão de remover
function createRemoveButton(element, id){
    const btnRemove = document.createElement("button")
    btnRemove.classList.add("btnRemove")
    btnRemove.textContent = "❌"

    btnRemove.addEventListener("click", () => {
        element.remove()

        convidados = convidados.filter((guest) => guest.id !== id)

        salvarConvidados()
    })

    element.append(btnRemove)
}

// Mostrar convidados salvos no localStorage
convidados.forEach((convidado) => {

    if(convidado === "") return

    const li = document.createElement("li")
    li.classList.add("guest")

    const span = document.createElement("span")
    span.textContent = convidado.nome

    li.append(span)

    createRemoveButton(li, convidado.id)

    ul.append(li)
})

// Adicionar convidado
buttonAdd.addEventListener("click", (evento) => {
    evento.preventDefault()

    if (input.value.trim() === "") {
        alert("Digite Algo!")
        input.classList.add("input-error")
        return
    }

    input.classList.remove("input-error")

    const convidado = {
        id: crypto.randomUUID(),
        nome: input.value
    }

    const li = document.createElement("li")
    li.classList.add("guest")

    const span = document.createElement("span")
    span.textContent = convidado.nome

    li.append(span)

    createRemoveButton(li, convidado.id)

    ul.append(li)

    convidados.push(convidado)

    salvarConvidados()

    input.value = ""
})
