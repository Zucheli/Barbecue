
//Muda cor de fundo dos icons quando eles são selecionados
function enableMeatIcon(e) {
    e.classList.toggle('active')
}

function barbecueValue() {
    let churrasco = {
        inputs: [0, 0, 0, 0],
        itens: {
            carne: false,
            frango: false,
            refri: false,
            cerveja: false
        }
    }

    // Pegar valores dos inputs
    let inputGroup = document.getElementById('card-inputs')
    let inputs = inputGroup.children
    for (let i = 0; i < inputs.length; i++) {
        let inputValue = inputs[i].children[0].value // Valor do input
        //Validação
        if (inputValue === '') {
            let inputName = inputs[i].children[0].getAttribute('name')
            alert(`${inputName} não pode estar vazio`)
            return
        }
        churrasco.inputs[i] = inputValue
    }
    // Pega valores dos itens de comida marcados
    let meatIcons = document.getElementById('card-icons')
    let icons = meatIcons.children
    let minimoSelecionado = false
    for (let icon of icons) {
        if (icon.className === 'active') { // Itens ativos
            minimoSelecionado = true
            let idItem = icon.getAttribute('id')
            churrasco.itens[idItem] = true
        }
    }
    // Validação
    if (!minimoSelecionado) {
        alert('Selecione pelo menos um item.')
        return
    }

    // Valores validados
    let quantidades = calcBarbecueValue(churrasco)
    enableResult(quantidades)
}

function calcBarbecueValue(churrasco) {
    let [nHomens, nMulheres, nCriancas, nDuracao] = churrasco.inputs
    let { carne, frango, refri, cerveja } = churrasco.itens
    // Constantes
    const kCarneHomem = 500
    const kCarneMulher = 300
    const kCarneCrianca = 200
    const kCerveja = nDuracao >= 6 ? 2000 : 1200
    const kBebida = nDuracao >= 6 ? 1500 : 1000
    const kFrango = 2.75

    // Variaveis 
    let qtdCarne, qtdFrango, qtdBebida, qtdCerveja

    // Cálculo das carnes
    if (carne)
        qtdCarne = (kCarneHomem * nHomens) + (kCarneMulher * nMulheres) + (kCarneCrianca * nCriancas)
    if (frango && carne) {
        qtdFrango = qtdCarne / kFrango
        qtdCarne = qtdCarne - qtdFrango
    }
    else if (frango) {
        qtdFrango = (kCarneHomem * nHomens) + (kCarneMulher * nMulheres) + (kCarneCrianca * nCriancas)
    }
    // Cálculo das bebidas
    if (refri)
        qtdBebida = (kBebida * nHomens) + (kBebida * nMulheres) + ((kBebida * nCriancas) / 2)
    if (cerveja)
        qtdCerveja = (kCerveja * nHomens) + (kCerveja * nMulheres)

    // Formatação
    // Carne
    qtdCarne = `<span>${(qtdCarne / 1000).toFixed(2)}</span> Kg de Carne`
    qtdFrango = `<span>${(qtdFrango / 1000).toFixed(2)}</span> Kg de Frango`
    qtdBebida = `<span>${Math.floor((qtdBebida / 1000) / 2)}</span> Garrafas de 2L`
    qtdCerveja = `<span>${Math.floor((qtdCerveja / 1000) / 0.350)}</span> Latinhas`

    let quantidades = [qtdCarne, qtdFrango, qtdBebida, qtdCerveja]

    return quantidades
}

function reset() {
    // Limpar inputs
    let inputGroup = document.getElementById('card-inputs')
    let inputs = inputGroup.children
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].children[0].value = ''
    }
    // Limpar inputs p2
    let inputGroup2 = document.getElementById('result-outputs')
    let inputs2 = inputGroup2.children
    for (let i = 0; i < inputs2.length; i++) {
        inputs2[i].children[1].innerHTML = ''
    }

    // Limpar ícones de comida
    let meatIcons = document.getElementById('card-icons')
    let icons = meatIcons.children
    for (let icon of icons) {
        icon.className = ''
    }

}

function enableResult(result) {
    let inputGroup = document.getElementById('result-outputs')
    let inputs = inputGroup.children
    for (let i = 0; i < inputs.length; i++) {
        if (!result[i].includes('NaN')){
            inputs[i].children[1].innerHTML = result[i]
        }
        else {
            inputs[i].children[1].innerHTML = 'Ícone não foi selecionado'
        }
    }

}