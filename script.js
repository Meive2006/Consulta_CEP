document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cep = document.getElementById('cep').value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('CEP inválido!');
        return;
    }

    fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)
        .then(response => response.json())
        .then(data => {
            const resultadosDiv = document.getElementById('resultados');
            if (data.erro) {
                resultadosDiv.innerHTML = 'CEP não encontrado!';
            } else {
                resultadosDiv.innerHTML = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Endereço:</strong> ${data.street}</p>
                    <p><strong>Bairro:</strong> ${data.neighborhood}</p>
                    <p><strong>Cidade:</strong> ${data.city}</p>
                    <p><strong>Estado:</strong> ${data.state}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Erro ao consultar o CEP:', error);
            document.getElementById('resultados').innerHTML = 'Erro ao consultar o CEP.';
        });
});
