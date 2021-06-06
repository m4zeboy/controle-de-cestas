const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("actions:storage")) || []
    },
    set(actions) {
        localStorage.setItem('actions:storage', JSON.stringify(actions))
    }
}