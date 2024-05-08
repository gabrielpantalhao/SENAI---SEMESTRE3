const fs = require('fs');
const { resolve } = require('path');
const xml2js = require('xml2js');

// const readFileXML = (filePath, encoding = 'utf-8') => {
//     const promisseCallback = (resolve, reject) => {
//         fs.readFile(filePath, encoding, (err, data) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             try {
//                 xml2js.parseString(data, (parseErr, result) => {
//                     if (parseErr) {
//                         console.error('Erro ao converter XML para JSON: ', parseErr);
//                         return;
//                     }

//                     const convertArrayValues = (obj) => {
//                         for (const key in obj) {
//                             if (Array.isArray(obj[key]) && obj[key].length === 1){
//                                 obj[key] = obj[key][0];
//                             }
//                             if(typeof obj[key] === 'object') {
//                                 convertArrayValues(obj[key]);
//                             }
//                         }
//                     };

//                     convertArrayValues(result);

//                     resolve(result);
//                 });
//             } catch (e) {
//                 reject(e);
//             }
//         })
//     }
//     return new Promise(promisseCallback);
// }

// // readFileXML('cliente.xml').then(console.log).catch(console.error);
// readFileXML('cliente.xml').then((res) => {
//     const { dados_clientes: { cliente: { nome, data_nasc, cpf, telefones, enderecos } } } = res;
//     console.log(nome, data_nasc, cpf, telefones, enderecos);   
// });

const readFileJSON = (filePath, encoding = 'utf-8') => {
    const promisseCallback = (resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                const object = JSON.parse(data);
                resolve(object);
            } catch (e) {
                reject(e);
            }
        })
    }
    return new Promise(promisseCallback);
}

readFileJSON('cliente.json').then(console.log).catch(console.error);