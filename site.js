let currentServiceIndex = 1;
const totalServices = 6;

function mudarServico(direcao) {
    // Remover a classe active do serviço atual
    document.getElementById(`servico-${currentServiceIndex}`).classList.remove('active');

    // Mudar o índice do serviço
    currentServiceIndex += direcao;

    // Garantir que o índice fique dentro dos limites
    if (currentServiceIndex > totalServices) {
        currentServiceIndex = 1;
    }
    if (currentServiceIndex < 1) {
        currentServiceIndex = totalServices;
    }

    // Adicionar a classe active ao novo serviço
    document.getElementById(`servico-${currentServiceIndex}`).classList.add('active');
}

function enviarFormulario(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const servico = document.getElementById("servico").value;
    const mensagem = document.getElementById("mensagem").value;

    const formData = new FormData();
    formData.append("Nome", nome);
    formData.append("Email", email);
    formData.append("Servico", servico);
    formData.append("Mensagem", mensagem);

    fetch("/api/contato/enviar", {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao enviar formulário.");
            }
            return response.json();
        })
        .then(data => {
            alert(data.mensagem || "Email enviado com sucesso!");
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Ocorreu um erro ao enviar o formulário. Tente novamente.");
        });
}

