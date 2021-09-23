const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require("../credentials.json");

const docId = "1Oh_J7DokT6FiSTbTKk3yy3daOxRgfFk8dY73B874KiE";
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
    listar();
}).catch((err) => { throw new Error(err) })


let sheet;

function listar() {
    getDoc().then(doc => {
        sheet = doc.sheetsByIndex[0];
        sheet.getRows().then(rows => {
            console.log(rows.length + " Rows: ")
            rows.map(row => {
                console.log(row.nivelCH_Media);
            })
        })
    });
}