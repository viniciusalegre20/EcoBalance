function calcularEmissoes() {
    const valorEletricidade = parseFloat(document.getElementById('valor-eletricidade').value) || 0;
    const valorGas = parseFloat(document.getElementById('valor-gas').value) || 0;
    const kmTransporte = parseFloat(document.getElementById('km-transporte').value) || 0;
    const combustivel = document.getElementById('selection-combustivel').value;
    const transporte = document.getElementById('selection-transport').value;

    const fatoresEmissao = {
        gasolina: 2.3,
        etanol: 0.82,
        diesel: 2.6
    };

    let resultado = "Resultados de Emissões de CO₂: <br><br>";
    let totalCO2 = 0;

    // Transporte
    if (transporte !== "0" && combustivel !== "0" && kmTransporte > 0) {
        let fatorCombustivel;
        if (combustivel === "1") fatorCombustivel = fatoresEmissao.gasolina;
        else if (combustivel === "2") fatorCombustivel = fatoresEmissao.etanol;
        else if (combustivel === "3") fatorCombustivel = fatoresEmissao.diesel;

        const emissaoTransporte = kmTransporte * fatorCombustivel;
        totalCO2 += emissaoTransporte;
        resultado += `Transporte - Emissão de CO₂: ${emissaoTransporte.toFixed(2)} kg <br><br>`;
    }

    // Eletricidade
    if (valorEletricidade > 0) {
        const emissaoEletricidade = valorEletricidade * 0.00051;
        totalCO2 += emissaoEletricidade;
        resultado += `Eletricidade - Emissão de CO₂: ${emissaoEletricidade.toFixed(2)} kg <br><br>`;
    }

    // Gás
    if (valorGas > 0) {
        const emissaoGas = valorGas * 2.3;
        totalCO2 += emissaoGas;
        resultado += `Gás - Emissão de CO₂: ${emissaoGas.toFixed(2)} kg <br><br>`;
    }

    // Valor da doação (R$ 0,10 por kg de CO₂, por exemplo)
    const valorDoacao = totalCO2 * 0.10;

    document.getElementById('resultado').innerHTML = resultado;
    document.getElementById('doacao').innerHTML = `<strong>Para compensar sua emissão de ${totalCO2.toFixed(2)} kg de CO₂, doe aproximadamente <span style="color:lightgreen">R$ ${valorDoacao.toFixed(2)}</span> para o reflorestamento da Mata Atlântica.</strong>`;
}
