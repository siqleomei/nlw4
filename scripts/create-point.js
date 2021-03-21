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
    fetchValues(url, cities => {
        citySelect.innerHTML = '<option value="">Selecione a cidade</option>'
        for (city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
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
.addEventListener("change", getCities)