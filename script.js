// Variável para armazenar se alguma resposta já foi registrada
let respostaRegistrada = false;

// Array para armazenar as respostas
let respostas = [];

// Função para criar um emoji e fazê-lo subir
function createEmoji(emojiCharacter, resposta) {
    const emojiContainer = document.getElementById('emojiContainer');
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');
    emoji.textContent = emojiCharacter;

    // Registra a resposta apenas se nenhuma resposta foi registrada ainda
    if (!respostaRegistrada) {
        respostas.push({ Resposta: resposta, Data: new Date().toLocaleString() });
        respostaRegistrada = true; // Marca como registrada
    }

    // Define a posição inicial do emoji
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.bottom = 0;

    emojiContainer.appendChild(emoji);

    // Remove o emoji após a animação terminar
    emoji.addEventListener('animationend', () => {
        emojiContainer.removeChild(emoji);
    });
}

// Adiciona eventos para os botões
document.getElementById('emojiButtonHappy').addEventListener('click', function() {
    createEmoji('😊', 'Satisfeito');
});

document.getElementById('emojiButtonNeutral').addEventListener('click', function() {
    createEmoji('😐', 'Neutro');
});

document.getElementById('emojiButtonAngry').addEventListener('click', function() {
    createEmoji('😡', 'Insatisfeito');
});

// Função para gerar o arquivo Excel
document.getElementById('downloadExcel').addEventListener('click', () => {
    // Cria uma nova planilha
    const worksheet = XLSX.utils.json_to_sheet(respostas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Respostas");

    // Gera o arquivo Excel e faz o download
    XLSX.writeFile(workbook, 'respostas_nps.xlsx');
});
