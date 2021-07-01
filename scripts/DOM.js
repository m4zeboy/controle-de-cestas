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
            <div class="content-title">
                <h3>Família ${action.family}</h3>
                <small>INFORMAÇÕES</small>
            </div>
            <div class="infos">
                <p class="p1">
                    <span><img src="./assets/home.svg" alt="endereço"></span> 
                    <span>${action.address}</span>
                </p>
                <p class="p2">
                    <span><img src="./assets/date.svg" alt="Data"></span>
                    <span>Entregue dia <strong>${action.date}.</strong></span>
                </p>
                <p class="p3">
                    <span><img src="./assets/hamper.svg" alt="Cestas"></span>
                    <span><strong>${action.quantity}cestas</strong> doadas.</span>
                </p>
                <p class="p4">Responsável por <strong>${action.responsible}.</strong></p>
            </div>
        </div>
        <div class="aside">
            <img src="./assets/delete.svg" alt="Excluir Doação." class="aside-item" onclick="Action.remove(${index})">
            <img src="./assets/edit.svg" alt="Editar Doação." class="aside-item" onclick="EditActionForm.init(${index})">
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
