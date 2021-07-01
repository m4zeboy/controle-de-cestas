const Export = {
    run() {
        const actions = Storage.get() || []
        const texto = JSON.stringify(actions)
        
        let inputTest = document.createElement("input");
        inputTest.value = texto;
            //Anexa o elemento ao body
        document.body.appendChild(inputTest);
            //seleciona todo o texto do elemento
        inputTest.select();
            //executa o comando copy
            //aqui é feito o ato de copiar para a area de trabalho com base na seleção
        document.execCommand('copy');
            //remove o elemento
        document.body.removeChild(inputTest);
        alert('copiado')
    },

}