const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require("../credentials.json");

const docId = "1COnviwNRoSdR6js9AFcoMlFO1gD0G6OycSuNDMLa-B0";
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
});


let sheet;

function listar() {
    getDoc().then(doc => {
        sheet = doc.sheetsByIndex[0];
        console.log("Rows:")
        sheet.getRows().then(rows => {
            rows.map(row => {
                console.log(row.programa,row.investimentosFuncap,row.investimentoContrapartidaParceria,row.investimentoTotal,row.totalBeneficiadosBolsistas,row.totalBeneficiadosEmpresas);
            })
        })
    });
}