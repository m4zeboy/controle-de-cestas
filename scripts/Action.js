const Action = {
    all: Storage.get(),
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
}
