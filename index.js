const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require("./credentials.json");

const docId = "1MVAncEN0t_0PNkdvJS8f1EUyv7bL-kHAcEP043-P2wU";
const doc = new GoogleSpreadsheet(docId);

const getDoc = async () => {
    const doc = new GoogleSpreadsheet(docId);

    await doc.useServiceAccountAuth({
        client_email: credenciais.client_email,
        private_key: credenciais.private_key.replace(/\\n/g, '\n')
    })
    await doc.loadInfo();
    return doc;
}

getDoc().then(doc => {
    console.log("Nome do documento: ", doc.title);
    //adicionar();
    //atualizar();
    listar();
});


let sheet;

function adicionar() {
    getDoc().then(doc => {
        sheet = doc.sheetsByIndex[0];
        sheet.addRow({
            nome: "João Victor",
            idade: 21,
        }).then(() => {
            console.log('dado salvo!')
        })
    });
}

function listar() {
    getDoc().then(doc => {
        sheet = doc.sheetsByIndex[0];
        console.log("Rows:")
        sheet.getRows().then(rows => {
            rows.map(row => {
                console.log(row.nome, " " + row.idade);
            })
        })
    });
}

function atualizar() {
    getDoc().then(doc => {
        sheet = doc.sheetsByIndex[0];
        sheet.getRows().then(rows => {
            rows.map(row => {
                if (row.nome === "João Victor") {
                    row.nome = "Victor";
                    row.idade = 31;
                    row.save().then(() => {
                        console.log('Dado atualizado!');
                    });
                }
            });
        })
    })
}

function deletar(){
    getDoc().then(doc => {
        sheet = doc.sheetsByIndex[0];
        sheet.getRows().then(rows => {
            rows.map(row => {
                if (row.nome === "João Victor") {
                    row.nome = "Victor";
                    row.idade = 31;
                    row.save().then(() => {
                        console.log('Dado removido!');
                    });
                }
            });
        })
    })
}
