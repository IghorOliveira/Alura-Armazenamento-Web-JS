const form = document.querySelector('#novoItem');
const items = JSON.parse(localStorage.getItem("items")) || [];




//o parametro evento nos da as informações dos elementos que receberam o evento
form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    //aqui a propriedade target nos da um array dos elementos html
    let nome = evento.target.elements['nome'];
    let quantidade =evento.target.elements['quantidade'];


    const itemAtual= {
        'nome': nome.value,
        'quantidade': quantidade.value
    };

    //here we area checking if there is an item on the list with the name of the current item and returning true
    const existe = items.some(item => JSON.stringify(item.nome) === JSON.stringify(itemAtual.nome));

    if(existe){
        //here we finding the element that matches our current item and returning that element
        itemHelper = items.find(function(element) {return element.nome == nome.value});
        //since the item is already in the list we are correctinng the id of the current item
        itemAtual.id = itemHelper.id;
        atualizaElemento(itemAtual);
        items[itemAtual.id] = itemAtual;
    } else {
        itemAtual.id = items[items.length-1] ? (items[items.length-1]).id + 1 : 0;
        criaElemento(itemAtual);
        items.push(itemAtual);
    }
    localStorage.setItem("items", JSON.stringify(items));
    nome.value = " ";
    quantidade.value = " ";
});





items.forEach(element => {
    criaElemento(element);
});





function criaElemento(item) {

    //criando elemento li
    const novoItem = document.createElement('li');
    //adicionando classe ao item
    novoItem.classList.add("item");

    //criando elemento strong
    const numeroItem = document.createElement('strong');
    //adicionando o numero do item
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    //usamos appendChild() para inserir o elemento strong dentro do li
    novoItem.appendChild(numeroItem);
    //aqui usamos inner html para inserir o nome apos o strong
    novoItem.innerHTML += item.nome;

    //aqui referenciamos a lista
    const lista = document.querySelector('#lista');
    
    novoItem.appendChild(botaoDeleta(item.id));
    
    //aqui adicionamos o novo elemento na lista
    lista.appendChild(novoItem);

    
};


function atualizaElemento(itemAtualizado){
    document.querySelector("[data-id='"+itemAtualizado.id+"']").innerHTML = itemAtualizado.quantidade;
};


function botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
};


function deletaElemento(tag, id){
    tag.remove();

    //aqui ele só retira o item em tempo de execução, após recarregar a pagina o item volta
    items.splice(items.findIndex(elemento => elemento.id === id),1);
    //aqui nos sobreescrevemos o array para que a mudança seja permanente
    localStorage.setItem("items", JSON.stringify(items));
};