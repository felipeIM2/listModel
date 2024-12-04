let command = document.getElementById("command");
let list = document.getElementById("list");
let inputProduct = document.getElementById("inputText");
let inputPrice = document.getElementById("inputPrice");

let delet = document.getElementById("commandDelet");
let totalDiv = document.getElementById("total");  // Elemento do totalizador

// Carregar os itens do localStorage quando a página for carregada
window.addEventListener("load", () => {
    let savedItems = JSON.parse(localStorage.getItem("listItems")) || [];
    savedItems.forEach(item => {
        createListItem(item.product, item.price);
    });
    updateTotal();  // Atualiza o total ao carregar a página
});

command.addEventListener("click", () => {
    let productName = inputProduct.value;
    let productPrice = parseFloat(inputPrice.value);

    if (productName === "" || isNaN(productPrice)) return;

    // Verificar se o produto já existe na lista
    let savedItems = JSON.parse(localStorage.getItem("listItems")) || [];
    let isDuplicate = savedItems.some(item => item.product === productName);

    if (isDuplicate) {
        alert("Produto já existe na lista!"); // Alerta de duplicação
        return; // Impede a adição do produto duplicado
    }

    // Criar um novo item de lista
    createListItem(productName, productPrice);

    // Adicionar o item ao localStorage
    savedItems.push({ product: productName, price: productPrice });
    localStorage.setItem("listItems", JSON.stringify(savedItems));

    // Atualizar o total
    updateTotal();

    // Limpar os campos
    inputProduct.value = "";
    inputPrice.value = "";
});

function createListItem(productName, productPrice) {
    //-- Span informações
    let span = document.createElement("span");
    span.innerText = `${productName} - R$ ${productPrice}`;

    //-- Button para remover
    let rmvButton = document.createElement("button");
    rmvButton.innerText = "Remover";
    rmvButton.onclick = () => {
        span.remove();
        rmvButton.remove();
        // edtButton.remove();
        slvButton.remove();
        input.remove();
        div.remove();

        // Atualizar o localStorage após remoção
        updateLocalStorage();
        updateTotal();  // Atualiza o total após remoção
    };

    //-- Input para substituir  
    let input = document.createElement('input');
    input.type = 'text';
    input.value = `${productName} - R$ ${productPrice}`;

    //-- Button para salvar
    let slvButton = document.createElement("button");
    slvButton.innerText = "Salvar";
    slvButton.onclick = () => {
        if (input.value === "") return;
        let [newProductName, newProductPrice] = input.value.split(" - R$ ");
        span.innerText = `${newProductName} - R$ ${parseFloat(newProductPrice).toFixed(2)}`;
        slvButton.remove();
        div.appendChild(edtButton);
        input.parentNode.replaceChild(span, input);

        // Atualizar o localStorage após edição
        updateLocalStorage();
        updateTotal();  // Atualiza o total após edição
    };

    //-- Button para editar
    // let edtButton = document.createElement("button");
    // edtButton.innerText = "Editar";
    // edtButton.onclick = () => {
    //     edtButton.remove();
    //     div.appendChild(slvButton);
    //     span.parentNode.replaceChild(input, span);
    // };

    //-- Div para organizar os elementos 
    let div = document.createElement("div");
    div.setAttribute("class", "line-list");
    div.appendChild(span);
    div.appendChild(rmvButton);
    // div.appendChild(edtButton);
    list.appendChild(div);
}

function updateLocalStorage() {
    // Atualizar o localStorage com a lista atualizada
    let updatedItems = [];
    let items = document.querySelectorAll(".line-list span");
    items.forEach(item => {
        let [product, price] = item.innerText.split(" - R$ ");
        updatedItems.push({ product, price: parseFloat(price.replace(",", ".")) });
    });
    localStorage.setItem("listItems", JSON.stringify(updatedItems));
}

function updateTotal() {
    // Atualizar o total com base nos itens armazenados
    let savedItems = JSON.parse(localStorage.getItem("listItems")) || [];
    let total = savedItems.reduce((sum, item) => sum + item.price, 0);
    let fixTotal = total.toFixed(2)
    
    totalDiv.innerHTML = `<strong>Total: R$ ${fixTotal}</strong>`;
}

delet.addEventListener("click", () => {
    list.innerHTML = ""; // Limpa a lista na tela
    localStorage.removeItem("listItems"); // Remove todos os itens do localStorage
    updateTotal();  // Atualiza o total após limpar a lista
});
