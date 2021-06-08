const Action = {
    all: Storage.get(),
    test: [
        {
            address: "Endereço",
            date: "02/02/2021",
            family: "Familia",
            quantity: 2,
            responsible: "responsável"
        },
        {
            address: "Endereço 2",
            date: "02/02/2021",
            family: "Familia",
            quantity: 2,
            responsible: "Responsável 2"
        }
    ],
    add(action) {
        Action.all.push(action)
        App.reload()
    },
    remove(index) {
        console.log(index)
        console.log(Action.all[index])
        Action.all.splice(index, 1)
        App.reload()
    },
    edit(index,value, field) {
        const SelectedAction = Action.all[index]
        SelectedAction[field] = value;
        Action.all[index] = SelectedAction;
        App.reload()
    }
}
