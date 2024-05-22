import { join } from "path";
import { DataSource } from "typeorm";

// const db1DataSource = new DataSource({
//     type: "mssql",
//     host: "bd-testes.database.windows.net",
//     port: 1433,
//     username: "lucasjesus01",
//     password: "Caslueisla!",
//     database: "bdsql-api-4s-v01",
//     options: {
//         encrypt: true,
//         trustServerCertificate: true
//     },
//     logging: true,
//     synchronize: true,
//     entities:
//         [

//             join(__dirname, '..', 'models/*.{ts,js}')
//         ]
// })

const db2DataSource = new DataSource({
    type: 'sqlite',
    database: './src/database/database.sqlite',
    logging: true,
    synchronize: true,
    entities:
        [
            join(__dirname, '..', 'models/*.{ts,js}')
        ]
})
// db1DataSource.initialize()
//     .then(() => {
//         console.log('Banco SqlServer de Dados inciciado!')
//     }).catch(() => {
//         console.log('Falha!!! Banco Sqlserver de Dados não inciciado!')
//     })
db2DataSource.initialize()
    .then(() => {
        console.log('Banco Sqlite de Dados inciciado!')
    }).catch(() => {
        console.log('Falha!!! Banco Sqlite de Dados não inciciado!')
    })
export default
    //db1DataSource
    db2DataSource