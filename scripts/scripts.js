const App = {
    init() {
        Action.all.forEach((action, index) => DOM.addAction(action,index))
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