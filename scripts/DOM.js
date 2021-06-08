const DOM = {
    action_container: document.querySelector('#actions ul'),
    total_hamper_p: document.querySelector('#total-hamper p'),
    last_action_p: document.querySelector('#last-action p'),
    addAction(action, index) {
        const li = document.createElement('li')
        li.setAttribute('class', 'action-item')
        li.dataset.index = index
        li.innerHTML = this.innerHTMLAction(action, index)
        this.action_container.appendChild(li)
    },
    innerHTMLAction(action, index) {
        const html = `  
            <div class="content">
                <h3>Família ${action.family}</h3>
                    <div class="texts-container">
                    <p class="address-p">${action.address}</p>
                    <em>${action.quantity} Cestas doadas.</em>
                </div>
                <hr>
            <div class="tags-container">
                <div class="responsible-tag">Responsável por <strong>${action.responsible}.</strong></div>
                <div class="date-tag">Entregue dia <strong>${action.date}.</strong></div>
            </div>
            </div>
            <div class="aside">
                <img src="./assets/delete.svg" alt="Excluir Doação." onclick="Action.remove(${index})">
                <img src="./assets/edit.svg" alt="Editar Doação." onclick="EditActionForm.init(${index})">
            </div>
        `
        return html
    },
    getLastAction() {
        if(Action.all.length === 0 && Action.all[Action.all.length -1] === undefined) {
            return "Nenhuma família ajudada ainda :("
        }
        const last_action = Action.all[Action.all.length -1]
        return `Para a Família ${last_action.family}`
    },
    renderLastAction(){
        const family = DOM.getLastAction()
        DOM.last_action_p.innerHTML = `${family}`
    },
    getTotalHamper(){
        let valorInicial = 0
        var soma = Action.all.reduce(function (acumulador, valorAtual) {
            return acumulador + valorAtual.quantity;
        }, valorInicial)
        return soma
    },
    renderTotalHamper(){
        const total = DOM.getTotalHamper()
        DOM.total_hamper_p.innerHTML = `${total} Cestas.`
    },
    clearActions() {
        DOM.action_container.innerHTML = ""
    },
}

const Messages = {
    show(element, message) {
        element.classList.add('active')
        element.innerHTML = `<strong>Opa, temos um erro!</strong>
                             <p>${message}</p>  `
    },
    hide(element) {
        element.classList.remove('active')
        element.innerHTML = ""
    }
}
