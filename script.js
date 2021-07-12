let ultimoSimbolo = '';
arraySimbolos = ['+', '-', '*', '/', '%'];
let resultado = document.getElementById('resultado');
let historico = document.getElementById('historico');

let selecionarNumero = (numero) => {
    resultado.value += numero;
}

let escolherOperacao = (op) => {
    resultado.value += op;
}
let analisaSimbolosRepitidos = () => {
    str = resultado.value;

    for (let vetor1 = 0; vetor1 < arraySimbolos.length; vetor1++) {
        for (let vetor2 = 0; vetor2 < arraySimbolos.length; vetor2++) {
            aux = arraySimbolos[vetor1] + arraySimbolos[vetor2];
            str = str.replace(aux, arraySimbolos[vetor2]);
        }

    }
    return str;
}
//verificar Simbolo De Operacao Antes Das Porcentagem
let verificarQuantidaDeCasas = (str) => {

    ultimoSimbolo = str.replace(/[^-*+/%]/g, '');

    ultimoSimbolo = ultimoSimbolo[ultimoSimbolo.length - 1];

    str = str.split(ultimoSimbolo);

    return str[str.length - 1].length;
}
let efetuarCalculo = () => {

    str = resultado.value;
    str = analisaSimbolosRepitidos();

    if (str.includes('%')) {
        str = resultado.value;
        //valores antes da porcentagem

        x = verificarQuantidaDeCasas(str.substring(0, str.indexOf('%'))) + 1;

        valoresAntesDaPorcentagem = str.substring(0, str.indexOf('%') - x);
        //valores depois da porcentagem
        x -= 1;
        porcento = str.substring(str.indexOf('%') - x, str.indexOf('%'));

        //calcula os valores antes da porcentagem
        calculoAntesDaPorcentagem = eval(valoresAntesDaPorcentagem);
        //calcula a porcentagem e efetua a soma
        calculoAntesDaPorcentagem = String(calculoAntesDaPorcentagem);
        calculoPorcentagem = calculoAntesDaPorcentagem + ultimoSimbolo + ((calculoAntesDaPorcentagem / 100) * porcento);
        console.log(calculoPorcentagem);
        //calculo Depois Da Porcentagem
        calculoFinal = calculoPorcentagem + str.substring(str.indexOf('%') + 1);
        resultado.value = eval(calculoFinal);

    } else {
        resultado.value = eval(resultado.value);
    }
    historico.innerHTML = str;
}

let zerar = () => {
    resultado.value = "";
}
let validarInput = () => {
    str = resultado.value;
    str = analisaSimbolosRepitidos();
    resultado.value = str.replace(/[^0-9-*+/%]/g, '')
}

let capturarResultadoDoHistorico = () => {
    var str = historico.innerHTML;
    resultado.value = str;

}

let inverter = () => {
    str = resultado.value;

    condicao = false;

    for (let vetor = 0; vetor < arraySimbolos.length; vetor++) {
        x = str.split(arraySimbolos[vetor]);
        if (x.length > 1 && x[0] != '') {
            condicao = true;
        }
    }

    if (!condicao) {
        resultado.value = resultado.value * (-1);
    }
}