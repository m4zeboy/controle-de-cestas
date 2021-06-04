const span_error = document.querySelector('span.error');

const Modal = {
    getModalElement(element) {
        return document.querySelector(`${element}`)
    },
    displayModal(modal) {
        const element = Modal.getModalElement(modal)
        console.log(modal)
        element.classList.add('active')
    },
    hideModal(modal) {
        const element = Modal.getModalElement(modal)
        element.classList.remove('active')
        Messages.hide(span_error)
    }
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

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("actions:storage")) || []
    },
    set(actions) {
        localStorage.setItem('actions:storage', JSON.stringify(actions))
    }
}
const Action = {
    all: Storage.get(),
    add(action) {
        Action.all.push(action)
        App.reload()
    },
    remove(index) {
        console.log(Action.all[index])
        Action.all.splice(index, 1)
        App.reload()
    },

}

const Utils = {
    formatDate(date) {
        const splittedDate = date.split('-')
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    }
}

const DOM = {
    tbody: document.querySelector('#data-table tbody'),
    total_hamper_p: document.querySelector('#total-hamper p'),
    last_action_p: document.querySelector('#last-action p'),
    addAction(action, index) {
        const tr = document.createElement('tr')
        tr.dataset.index = index
        tr.innerHTML = DOM.innerHTMLAction(action, index)
        DOM.tbody.appendChild(tr)
    },
    innerHTMLAction(action, index) {
        const html = `
        <td>${action.family}</td>
        <td>${action.address}</td>
        <td>${action.responsible}</td>
        <td>${action.quantity}</td>
        <td>${action.date}1</td>
        <td>
            <img src="./assets/delete.svg" alt="remover ação" onclick="Action.remove(${index})">
            
        </td>`
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
        DOM.tbody.innerHTML = ""
    },
}

const Form = {
    family: document.querySelector('input#family'),
    address: document.querySelector('input#address'),
    responsible: document.querySelector('input#responsible'),
    quantity: document.querySelector('input#quantity'),
    date: document.querySelector('input#date'),
    getFields() {
        return {
            family: Form.family.value,
            address: Form.address.value,
            responsible: Form.responsible.value,
            quantity: Form.quantity.value,
            date: Form.date.value,
        }
    },
    validateFields() {
        const { family, address, responsible, quantity, date } = Form.getFields();

        if(family.trim() === "" || address.trim() === "" || responsible.trim() === "" || quantity.trim() === "" || date.trim() === "") {
            throw new Error('Preecha todos os campos')
        }
    },
    formatValues() {
        let { address, family, responsible, quantity, date} = Form.getFields()
        date = Utils.formatDate(date);
        return {
            address,
            family,
            responsible,
            quantity: Number(quantity),
            date
        }
    },
    saveAction(action) {
        Action.add(action)
    },
    clearFields() {
        Form.family.value = "";
        Form.address.value = "";
        Form.responsible.value = "";
        Form.quantity.value = "";
        Form.date.value = "";
    },
    submit(event) {
        event.preventDefault();
        try {
            Form.validateFields()
            const action = Form.formatValues() 
            Form.saveAction(action) 
            Form.clearFields()
            Modal.hideModal('.modal-overlay')
        } catch (error) {
            Messages.show(span_error, error.message)
        }
        
    }
}

const App = {
    init() {
        Action.all.forEach((action,index) => DOM.addAction(action,index))
        DOM.renderTotalHamper()
        DOM.renderLastAction()
        Storage.set(Action.all)
    },
    reload() {
        DOM.clearActions()
        App.init()
    }
}

App.init()



