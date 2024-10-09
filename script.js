
let command = document.getElementById("command");
let list = document.getElementById("list");
let inputText = document.getElementById("inputText");

let delet = document.getElementById("commandDelet");

command.addEventListener("click", ()=> {

    let textId = inputText.value
    if(textId === "") return;

    //-- Span informações
    let span = document.createElement("span");
    span.innerText = textId;

    //-- Button para remover
    let rmvButton = document.createElement("button");
    rmvButton.innerText = "Remover";
    rmvButton.onclick = () =>{ span.remove(), rmvButton.remove(), edtButton.remove(), slvButton.remove(), input.remove(), div.remove()}

    //-- Input para subtituir  
    let input = document.createElement('input');
    input.type = 'text';
    input.value = span.innerText; 

    //-- Button para salvar
    let slvButton = document.createElement("button");
    slvButton.innerText = "Salvar";
    slvButton.onclick = () =>{ if (input.value === "")return; span.innerText = input.value, slvButton.remove(), div.appendChild(edtButton), input.parentNode.replaceChild(span, input) }
    
    //-- Button para editar
    let edtButton = document.createElement("button");
    edtButton.innerText = "Editar";
    edtButton.onclick = () =>{ edtButton.remove(), div.appendChild(slvButton), span.parentNode.replaceChild(input, span) }

    //-- Div para organizar os elementos 
    let div = document.createElement("div");
    div.setAttribute("class", "line-list");
    // div.setAttribute("id", "deletAll");

    div.appendChild(span)
    div.appendChild(rmvButton)
    div.appendChild(edtButton)
    list.appendChild(div)

    inputText.value = "";
    
    //-- Função para deletar 
    delet.addEventListener("click", () => div.remove());
});





  