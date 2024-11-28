document.addEventListener('DOMContentLoaded', () => {
    // **Elementos do DOM**
    const elementos = {
        nomeAluno: document.getElementById('nomeAluno'),
        perfilNome: document.getElementById('perfilNome'),
        perfilEmail: document.getElementById('perfilEmail'),
        horasSemana: document.getElementById('horasSemana'),
        metaProgresso: document.getElementById('metaProgresso'),
        barraProgresso: document.getElementById('barraProgresso'),
        tempoTreino: document.getElementById('tempoTreino'),
        botaoIniciarTreino: document.getElementById('botaoIniciarTreino'),
        btnMontarTreino: document.getElementById('btnMontarTreino'),
        notificacao: document.getElementById('notificacao'),
        modais: {
            meta: document.getElementById('modalMeta'),
            perfil: document.getElementById('modalPerfil'),
            treino: document.getElementById('modalTreino'),
            meusTreinos: document.getElementById('modalMeusTreinos'),
            historicoTreinos: document.getElementById('modalHistoricoTreinos'),
            dicasTreino: document.getElementById('modalDicasTreino'),
            escolherTreino: document.getElementById('modalEscolherTreino'),
            confirmarInicio: document.getElementById('modalConfirmarInicio'),
            countdown: document.getElementById('modalCountdown'),
            exercicios: document.getElementById('modalExercicios'),
            entrada: document.getElementById('modalEntrada'),
            saida: document.getElementById('modalSaida')
        },
        fecharModais: {
            meta: document.getElementById('fecharModalMeta'),
            perfil: document.getElementById('fecharModalPerfil'),
            treino: document.getElementById('fecharModalTreino'),
            meusTreinos: document.getElementById('fecharModalMeusTreinos'),
            historicoTreinos: document.getElementById('fecharModalHistoricoTreinos'),
            dicasTreino: document.getElementById('fecharModalDicasTreino'),
            escolherTreino: document.getElementById('fecharModalEscolherTreino'),
            confirmarInicio: document.getElementById('fecharModalConfirmarInicio'),
            exercicios: document.getElementById('fecharModalExercicios'),
            entrada: document.getElementById('fecharModalEntrada'),
            saida: document.getElementById('fecharModalSaida')
        },
        metaSlider: document.getElementById('metaSlider'),
        valorMeta: document.getElementById('valorMeta'),
        salvarMeta: document.getElementById('salvarMeta'),
        salvarPerfil: document.getElementById('salvarPerfil'),
        nomeTreino: document.getElementById('nomeTreino'),
        confirmarInicioBtn: document.getElementById('confirmarInicio'),
        contadorCountdown: document.getElementById('countdownNumber'),
    };

    // **Variáveis de Controle**
    let treinoIniciado = false;
    let timerInterval;
    let countdownInterval;

    // **Funções**
    const abrirModal = (modal) => modal.style.display = 'block';
    const fecharModal = (modal) => modal.style.display = 'none';

    const iniciarCountdown = (segundos) => {
        let restante = segundos;
        elementos.contadorCountdown.textContent = restante;
        countdownInterval = setInterval(() => {
            restante--;
            elementos.contadorCountdown.textContent = restante;
            if (restante <= 0) {
                clearInterval(countdownInterval);
                iniciarTreino();
            }
        }, 1000);
    };

    const iniciarTreino = () => {
        treinoIniciado = true;
        const startTime = new Date().getTime();
        elementos.tempoTreino.textContent = '00:00:00';

        timerInterval = setInterval(() => {
            const tempoAtual = new Date().getTime();
            const delta = Math.floor((tempoAtual - startTime) / 1000);
            const horas = String(Math.floor(delta / 3600)).padStart(2, '0');
            const minutos = String(Math.floor((delta % 3600) / 60)).padStart(2, '0');
            const segundos = String(delta % 60).padStart(2, '0');
            elementos.tempoTreino.textContent = `${horas}:${minutos}:${segundos}`;
        }, 1000);
    };

    const pararTreino = () => {
        treinoIniciado = false;
        clearInterval(timerInterval);
        alert('Treino finalizado!');
    };

    // **Eventos**
    elementos.botaoIniciarTreino.addEventListener('click', () => {
        abrirModal(elementos.modais.countdown);
        iniciarCountdown(5);
    });

    elementos.fecharModais.confirmarInicio.addEventListener('click', () => {
        fecharModal(elementos.modais.confirmarInicio);
    });

    elementos.fecharModais.countdown.addEventListener('click', () => {
        fecharModal(elementos.modais.countdown);
        clearInterval(countdownInterval);
    });
});




function calcularClassificacao(horas) {
    if (horas <= 5) {
        return 'Iniciante';
    } else if (horas <= 10) {
        return 'Intermediário';
    } else if (horas <= 20) {
        return 'Avançado';
    } else {
        return 'Extremamente Avançado';
    }
}

async function obterDados() {
    try {
        const resposta = await fetch('http://localhost:3000');
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error('Erro ao obter dados:', erro);
        return [];
    }
}

async function gerarRelatorio() {
    const tabela = document.getElementById("tabela-relatorio");
    const tbody = tabela.querySelector("tbody");
    document.getElementById("card-gerar-relatorio").addEventListener("click", gerarRelatorio);

    // Limpa a tabela antes de gerar um novo relatório
    tbody.innerHTML = "";

    try{
    // Obtém os dados do backend
    const alunos = await obterDados();

    // Adiciona os dados na tabela
    alunos.forEach(aluno => {
        const classificacao = calcularClassificacao(aluno.horas);
        const linha = `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.horas}</td>
                <td>${classificacao}</td>
            </tr>
        `;
        tbody.innerHTML += linha;
    });

    // Mostra a tabela ao gerar o relatório
    tabela.classList.remove("hidden");
}

// Adiciona o evento de clique ao card
catch (erro) {
    console.error("Erro ao gerar relatório:", erro);
}
}




