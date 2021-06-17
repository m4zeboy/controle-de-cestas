const Export = {
    createHTML({month, from, to}) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>documento_cestas_mes_${month}</title>
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
            
            <style>
                * {
                font-family: 'Roboto', sans-serif;
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    border-radius: .3rem;
                }
                table, th, td {
                    border: 1px solid black;
                }
                
                th {
                    padding: .7rem;
                    background-color: #fbfbfb;
                }
                
                td {
                    padding: .2rem;
                }
            </style>
        </head>
        <body>
            <h1>Relação das cestas básicas doadas</h1>
            <h2>Período de ${from} até ${to}.</h2>
            <table id="data-table">
                <thead>
                    <tr>
                        <th>Família</th>
                        <th>Endereço</th>
                        <th>Quantidade</th>
                        <th>Responsável</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
        </body>
        </html>
        `
    },
    renderTable(actions, pdf) {
        let tbody = pdf.document.querySelector('table#data-table tbody')
        actions.forEach((action, index) => {
            const tr = pdf.document.createElement('tr')
            tr.dataset.index = index;
            tr.innerHTML = `
            <td>${action.family}</td>
            <td>${action.address}</td>
            <td>${action.quantity}</td>
            <td>${action.responsible}</td>
            <td>${action.date}</td>
        `
            tbody.appendChild(tr)
        });
    },
    run() {
        // const actions = Storage.get() || []
        // const period = [actions[0].date, actions[actions.length -1].date]
        // const pdfDocument = window.open('', '', 'width=800px, height=600px')

        // // verificar o mês 
        // const lastActionDate = actions[actions.length - 1].date
        // const monthOfLastDonate = Utils.getMonth(lastActionDate)
        // pdfDocument.document.write(this.createHTML({month: monthOfLastDonate, from: period[0], to: period[1]}))
        // this.renderTable(actions, pdfDocument)
        // pdfDocument.print()
        // pdfDocument.close()

        const pdfMaker = new PDFMake()
    },

}