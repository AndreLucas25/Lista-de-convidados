const input = document.querySelector("input")
const buttonAdd = document.querySelector("#btn")
const ul = document.querySelector("ul")

let convidados = JSON.parse(localStorage.getItem("convidados")) || []

function salvarConvidados(){
    localStorage.setItem("convidados", JSON.stringify(convidados))
}

// Criar botão de remover
function createRemoveButton(element, nome){
    const btnRemove = document.createElement("button")
    btnRemove.textContent = "❌"

    btnRemove.addEventListener("click", () => {
        element.remove()

        convidados = convidados.filter((guest) => guest !== nome)

        salvarConvidados()
    })

    element.append(btnRemove)
}

// Adiciona botão aos convidados que já existem no HTML

// Mostrar convidados salvos no localStorage
convidados.forEach((nome) => {

    if(nome.trim() === "") return

    const li = document.createElement("li")
    li.classList.add("guest")

    const span = document.createElement("span")
    span.textContent = nome

    li.append(span)

    createRemoveButton(li, nome)

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

    const nome = input.value

    const li = document.createElement("li")
    li.classList.add("guest")

    const span = document.createElement("span")
    span.textContent = nome

    li.append(span)

    createRemoveButton(li, nome)

    ul.append(li)

    convidados.push(nome)

    salvarConvidados()

    input.value = ""
})
