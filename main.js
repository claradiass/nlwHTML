    // Importa a biblioteca dayjs (supondo que esteja disponível no ambiente)
    const formatador = (data) => {
        return {
        dia: {
            numerico: dayjs(data).format('DD'), // Formata o dia como número (ex: '08')
            semana: {
            curto: dayjs(data).format('ddd'), // Formata o dia da semana em abreviação (ex: 'Mon')
            longo: dayjs(data).format('dddd'), // Formata o dia da semana completo (ex: 'Monday')
            }
        },
        mes: dayjs(data).format('MMMM'), // Formata o mês completo (ex: 'July')
        hora: dayjs(data).format('HH:mm') // Formata a hora no formato 24h (ex: '10:00')
        }
    }
    
    // Define um objeto de atividade
    const atividade = {
        nome: "Almoço",
        data: new Date("2024-07-08 10:00"), // Data da atividade
        finalizada: true // Estado de conclusão da atividade
    }
    
    // Define uma lista de atividades
    let atividades = [
        atividade,
        {
        nome: 'Academia em grupo',
        data: new Date("2024-07-09 12:00"),
        finalizada: false
        },
        {
        nome: 'Gamming session',
        data: new Date("2024-07-09 16:00"),
        finalizada: true
        },
    ]
    
    // Cria um item de atividade no formato HTML
    const criarItemDeAtividade = (atividade) => {
        let input = `
        <input 
        onchange="concluirAtividade(event)" // Adiciona um evento onchange para concluir a atividade
        value="${atividade.data}"
        type="checkbox" 
        `
    
        if (atividade.finalizada) { // Se a atividade estiver finalizada, adiciona o atributo 'checked'
        input += 'checked'
        }
    
        input += '>'
    
        const formatar = formatador(atividade.data); // Formata a data da atividade
    
        return `
        <div class="card-bg" >
            ${input} 

            <div>
                <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.50008 10L9.16675 11.6667L12.5001 8.33335M18.3334 10C18.3334 14.6024 14.6025 18.3334 10.0001 18.3334C5.39771 18.3334 1.66675 14.6024 1.66675 10C1.66675 5.39765 5.39771 1.66669 10.0001 1.66669C14.6025 1.66669 18.3334 5.39765 18.3334 10Z" stroke="#BEF264" style="stroke:#BEF264;stroke:color(display-p3 0.7451 0.9490 0.3922);stroke-opacity:1;" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.41664 1.81836C9.46249 1.61597 10.5374 1.61597 11.5833 1.81836M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10086C15.5587 3.70022 16.3197 4.46409 16.9158 5.35086M1.8183 11.5834C1.6159 10.5375 1.6159 9.46255 1.8183 8.4167M16.8991 14.6742C16.2998 15.5588 15.5359 16.3198 14.6491 16.9159M18.1816 8.4167C18.384 9.46255 18.384 10.5375 18.1816 11.5834M3.1008 5.32586C3.70016 4.44131 4.46403 3.68026 5.3508 3.0842M5.3258 16.8992C4.44124 16.2998 3.6802 15.536 3.08414 14.6492" stroke="#A1A1AA" style="stroke:#A1A1AA;stroke:color(display-p3 0.6314 0.6314 0.6667);stroke-opacity:1;" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <span>${atividade.nome}</span> 
            </div>

            <time class="short">
                ${formatar.dia.semana.curto}.
                ${formatar.dia.numerico} <br>
                ${formatar.hora}
            </time>

            <time class="full" >
                ${formatar.dia.semana.longo}, 
                dia ${formatar.dia.numerico}
                de ${formatar.mes} 
                às ${formatar.hora}h 
            </time> 
        </div>
        `
    }
    
    // Atualiza a lista de atividades exibidas
    const atualizarListaDeAtividades = () => {
        const section = document.querySelector('section') // Seleciona o elemento <section>
        section.innerHTML = '' // Limpa o conteúdo da seção
    
        // Verifica se a lista de atividades está vazia
        if (atividades.length == 0) {
        section.innerHTML = `<p>Nenhuma atividade cadastrada.</p>` // Exibe mensagem de nenhuma atividade cadastrada
        return
        }
    
        for (let atividade of atividades) { // Itera sobre a lista de atividades
        section.innerHTML += criarItemDeAtividade(atividade) // Adiciona cada atividade formatada na seção
        }
    }
    
    atualizarListaDeAtividades() // Chama a função para atualizar a lista de atividades ao carregar a página
    
    // Salva uma nova atividade
    const salvarAtividade = (event) => {
        event.preventDefault() // Previne o comportamento padrão do formulário, que seria enviar
        const dadosDoFormulario = new FormData(event.target) // Coleta os dados do formulário
    
        const nome = dadosDoFormulario.get('atividade') // Obtém o nome da atividade
        const dia = dadosDoFormulario.get('dia') // Obtém o dia da atividade
        const hora = dadosDoFormulario.get('hora') // Obtém a hora da atividade
        const data = `${dia} ${hora}` // Combina dia e hora em uma única string
    
        const novaAtividade = {
        nome,
        data,
        finalizada: false // Define a nova atividade como não finalizada
        }
    
        // Verifica se já existe uma atividade com a mesma data e hora
        const atividadeExiste = atividades.find((atividade) => {
        return atividade.data == novaAtividade.data
        })
    
        if (atividadeExiste) {
        return alert('Dia/Hora não disponível') // Exibe alerta se a data/hora já estiver ocupada
        }
    
        atividades = [novaAtividade, ...atividades] // Adiciona a nova atividade no início da lista
        // ...atividades pega as antigas
        atualizarListaDeAtividades() // Atualiza a lista de atividades exibidas
    }
    
    // Cria as opções de dias para seleção no formulário
    const criarDiasSelecao = () => {
        const dias = [
        '2024-02-28',
        '2024-02-29',
        '2024-03-01',
        '2024-03-02',
        '2024-03-03',
        ]
    
        let diasSelecao = ''
    
        for (let dia of dias) { // Itera sobre a lista de dias
        const formatar = formatador(dia) // Formata cada dia
        const diaFormatado = `
        ${formatar.dia.numerico} de 
        ${formatar.mes}
        `
        diasSelecao += `
        <option value="${dia}">${diaFormatado}</option>
        `
        }
    
        document
        .querySelector('select[name="dia"]') // Seleciona o elemento <select> de dias
        .innerHTML = diasSelecao // Insere as opções de dias no elemento <select>
    }
    
    criarDiasSelecao() // Chama a função para criar as opções de dias ao carregar a página
    
    // Cria as opções de horas para seleção no formulário
    const criarHorasSelecao = () => {
        let horasDisponiveis = ''
    
        for (let i = 6; i < 23; i++) { // Itera sobre as horas do dia (das 6h às 22h)
        const hora = String(i).padStart(2, '0') // Formata a hora com dois dígitos
        horasDisponiveis += `
        <option value="${hora}:00">${hora}:00</option>`
        horasDisponiveis += `
        <option value="${hora}:30">${hora}:30</option>`
        }
    
        document
        .querySelector('select[name="hora"]') // Seleciona o elemento <select> de horas
        .innerHTML = horasDisponiveis // Insere as opções de horas no elemento <select>
    }
    
    criarHorasSelecao() // Chama a função para criar as opções de horas ao carregar a página
    
    // Conclui uma atividade
    const concluirAtividade = (event) => {
        const input = event.target // Obtém o input que disparou o evento
        const dataDesteInput = input.value // Obtém o valor do input (data da atividade)
    
        const atividade = atividades.find((atividade) => {
        return atividade.data == dataDesteInput // Encontra a atividade correspondente na lista
        })
    
        if (!atividade) {
        return // Se a atividade não for encontrada, sai da função
        }
    
        atividade.finalizada = !atividade.finalizada // Alterna o estado de finalização da atividade
    }
