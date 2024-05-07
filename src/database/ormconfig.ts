import { join } from "path";
import { DataSource } from "typeorm";

const db1DataSource = new DataSource({
    type: "mssql",
    host: "bd-testes.database.windows.net",
    port: 1433,
    username: "lucasjesus01",
    password: "Caslueisla!",
    database: "bdsql-api-4s-v01",
    options: {
        encrypt: true,
        trustServerCertificate: false

    },
    "logging": true,
    synchronize: true,
    entities:
        [
            join(__dirname, '..', 'models/*.{ts,js}')
        ]


})
db1DataSource.initialize()
    .then(() => {
        console.log('Banco SqlServer de Dados inciciado!')
    }).catch(() => {
        console.log('Falha!!! Banco Sqlserver de Dados não inciciado!')
    })
export default db1DataSource