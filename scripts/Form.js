const Form = {
    family: document.querySelector('input#family'),
    address: document.querySelector('input#address'),
    responsible: document.querySelector('input#responsible'),
    quantity: document.querySelector('input#quantity'),
    date: document.querySelector('input#date'),
    span_error: document.querySelector('#add-action span.error'),
    span_success: document.querySelector('span.succes-add-action'),
    getFields(fields) {
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
    displaySuccess() {
        this.span_success.classList.add('active')
        setTimeout(() => {
            this.span_success.classList.remove('active')
        }, 3000)
    },
    submit(event) {
        event.preventDefault();
        try {
            Form.validateFields()
            const action = Form.formatValues() 
            Form.saveAction(action) 
            Form.clearFields()
            this.displaySuccess()
            Modal.hideModal('#add-action.modal-overlay')
        } catch (error) {
            console.log(error)
            Messages.show(this.span_error, error.message)
        }
        
    }
}

const EditActionForm = {
    container: document.querySelector('#edit.modal-overlay'),
    select: document.querySelector('#select-edit-action'),
    input: document.querySelector('input#edit-input'),
    span_error: document.querySelector('#edit span.error'),
    init(index){
        // alert(index)
        this.container.dataset.action_index = index
        Modal.displayModal('#edit.modal-overlay')
        this.changeSelect()
    },
    verifyInputType(result) {
        if (result === 5 ) {
            this.input.type = "date"
        } else if(result === 4 ){
            this.input.type = "number"
        } else {
            this.input.type = "text"

        }
    },
    verifyOptionIndex(optionSelected) {
        if(optionSelected === 1) {
            return "family"
        } else if (optionSelected === 2) {
            return "address"
        } else if (optionSelected === 3) {
            return "responsible"
        } else if(optionSelected === 4) {
            return "quantity"
        } else {
            return "date"
        }
    },
    changeSelect(event) {
        const result = event.target.options.selectedIndex
        // console.dir(result)
        this.enableInput()
        this.verifyInputType(result)
        this.input.dataset.field_id = result
    },
    enableInput() {
        this.input.disabled = false;
    },
    validateField() {
        if(this.input.value.trim() === "") {
            throw new Error("Não dá para editar um campo vazio :)")
        }
    },
    formatField(optionIndex){
        if(optionIndex === 5 ) {
            const date = Utils.formatDate(this.input.value)
            return date
        } else if (optionIndex === 4) {
            const quantity = Number(this.input.value)
        } else {
            return this.input.value;
        }
        
    },
    clearField() {
        this.input.value = "";
    },
    submit(event) {
        event.preventDefault()
        try {
            const optionSelected = this.select.options.selectedIndex
            const actionIndex = this.container.dataset.action_index;
            const value = this.formatField(optionSelected)
            const field = this.verifyOptionIndex(optionSelected)
            this.validateField()
            Action.edit(actionIndex,value,field)
            this.clearField()
            Modal.hideModal('#edit.modal-overlay')
        } catch (error) {
            this.span_error.classList.add('active')
            this.span_error.innerHTML = error.message;
        }
    }    
}