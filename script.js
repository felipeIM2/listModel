import items from './list.js'

function addOptions() {
  const select = document.getElementById('inputText');
  
  // Itera sobre o array de itens e cria uma opção para cada item
  items.forEach(item => {
      const option = document.createElement('option');
      option.value = item;
      option.textContent = item;
      select.appendChild(option);  // Adiciona a opção ao select
  });
}
addOptions();




