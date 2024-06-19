let dinheiro = parseInt(localStorage.getItem('dinheiro')) || 20;
let tempoParaProximoTrabalho = parseInt(localStorage.getItem('tempoParaProximoTrabalho')) || 100;
let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

function atualizarDinheiro() {
    document.getElementById('money').textContent = dinheiro;
}

function atualizarTempo() {
    const minutos = Math.floor(tempoParaProximoTrabalho / 70);
    let segundos = tempoParaProximoTrabalho % 70;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    document.getElementById('timer').textContent = `${minutos}:${segundos}`;
}

function trabalhar() {
    if (tempoParaProximoTrabalho > 0) {
        alert(`Você precisa esperar mais ${tempoParaProximoTrabalho} segundos para trabalhar novamente.`);
        return;
    }

    dinheiro += 10; // Ganha 10 unidades de dinheiro a cada trabalho
    tempoParaProximoTrabalho = 300; // Reseta o tempo para o próximo trabalho

    atualizarDinheiro();
    atualizarTempo();

    salvarDadosLocais();
    
    // Inicia a contagem regressiva para o próximo trabalho
    iniciarContagemRegressiva();
}

function comprarItem(preco, nomeItem) {
    if (dinheiro >= preco) {
        dinheiro -= preco;
        inventario.push(nomeItem);

        const inventoryList = document.getElementById('inventoryList');
        const li = document.createElement('li');
        li.textContent = nomeItem;
        inventoryList.appendChild(li);

        atualizarDinheiro();
        salvarDadosLocais();
    } else {
        alert('Você não tem dinheiro suficiente para comprar este item.');
    }
}

function salvarDadosLocais() {
    localStorage.setItem('dinheiro', dinheiro);
    localStorage.setItem('tempoParaProximoTrabalho', tempoParaProximoTrabalho);
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

function iniciarContagemRegressiva() {
    const timerInterval = setInterval(() => {
        if (tempoParaProximoTrabalho > 0) {
            tempoParaProximoTrabalho--;
            atualizarTempo();
            salvarDadosLocais();
        } else {
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Carregar dados salvos ao iniciar o jogo
window.onload = function() {
    atualizarDinheiro();
    atualizarTempo();

    // Mostrar itens no inventário
    const inventoryList = document.getElementById('inventoryList');
    inventario.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        inventoryList.appendChild(li);
    });

    // Verificar se há uma contagem regressiva em andamento
    if (tempoParaProximoTrabalho > 0) {
        iniciarContagemRegressiva();
    }
};
