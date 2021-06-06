const Modal = {
    getModalElement(element) {
        return document.querySelector(`${element}`)
    },
    displayModal(modal) {
        const element = Modal.getModalElement(modal)
        element.classList.add('active')
    },
    hideModal(modal) {
        const element = Modal.getModalElement(modal)
        element.classList.remove('active')
        Messages.hide(Form.span_error)
    }
}