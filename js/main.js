const form = (document.getElementById("novoItem"));
const lista = document.querySelector(".lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((element) => {
    criarElemento(element);
});

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    
    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value);

    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    if(existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(element => element.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1].id + 1) : 0;

        criarElemento(itemAtual);

        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})



function criarElemento(item) {

    const novoItem = document.createElement("li");
    novoItem.classList.add("item");

    const numeroItem = document.createElement("strong");
    numeroItem.innerText = item.quantidade;
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector(`[data-id='${item.id}']`).innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const botao = document.createElement("button");
    
    botao.innerText = "X";

    botao.addEventListener('click', function() {
    deletaElemento(this.parentNode, id)});

    return botao;
}

function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(element => element.id === id), 1);

    console.log(itens);

    localStorage.setItem("itens", JSON.stringify(itens));

}