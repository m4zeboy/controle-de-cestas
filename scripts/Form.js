const Form = {
    family: document.querySelector('input#family'),
    address: document.querySelector('input#address'),
    responsible: document.querySelector('input#responsible'),
    quantity: document.querySelector('input#quantity'),
    date: document.querySelector('input#date'),
    span_error: document.querySelector('span.error'),
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
            console.log(error)
            Messages.show(this.span_error, error.message)
        }
        
    }
}