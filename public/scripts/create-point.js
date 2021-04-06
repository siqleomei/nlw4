function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    fetchValues(url, states => {
        for (state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const stateInput = document.querySelector("input[name=state]")
    stateInput.value = event.target.options[event.target.selectedIndex].text

    const citySelect = document.querySelector("select[name=city]")
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`
    citySelect.disabled = true
    fetchValues(url, cities => {
        citySelect.innerHTML = '<option value="">Selecione a cidade</option>'
        for (city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

function fetchValues(url, func){
    fetch(url)
    .then(res => res.json())
    .then(func)
}

document.querySelector("select[name=uf]")
        .addEventListener("change", getCities);

 // Itens de coleta
 const itemsToCollect = document.querySelectorAll(".itens-grid li");
 const collectedItems = document.querySelector("input[name=items]");

 for (let item of itemsToCollect){
     item.addEventListener("click", handleSelectedItem);
 }

let selectedItems = [];

 function handleSelectedItem(event){
    const itemLi = event.target;

    // Adicionar ou remover uma classe com javascript
    //.add = Adiciona
    //.remove = Remove
    //.toggle = Adiciona ou remove, dependendo do necessário
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    const alreadySelected = selectedItems.findIndex((item)=>{return item == itemId});
    if (alreadySelected >= 0){
        console.log("Ja estava clicado");

        //Tirar da seleção, percorrerá o array e removerá o item q for diferente
        const filteredItens = selectedItems.filter(item=>{
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });

        selectedItems = filteredItens;

    } else {
        console.log("Não estava clicado");
        selectedItems.push(itemId);
    }

    collectedItems.value = selectedItems;
 }