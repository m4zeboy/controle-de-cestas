const Utils = {
    formatDate(date) {
        const splittedDate = date.split('-')
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },
    getMonth(date) {
        const splittedDate = date.split('/')
        return `${splittedDate[1]}`
    },
    
}

Utils.verifyMonth("0")