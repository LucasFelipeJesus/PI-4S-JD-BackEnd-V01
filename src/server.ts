import express from "express"
import db2DataSource from "./database/ormconfig"
import routes from "./routes"
import cors from "cors"
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    // origin: '*', // libera para todos os domínios
    // origin: ['http://localhost:3000', 'https://meuapp.com'], // libera para os domínios informados
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://pi-4-s-jd-front-end-v01.vercel.app'],
    credentials: true
}))
app.use(routes)

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
    //console.log(db1DataSource.isInitialized ? 'Banco Sqlserver Dados OK! :' : 'Banco Sqlserver Carregando!')

    console.log(db2DataSource.isInitialized ? 'Banco Sqllite Dados OK! :' : 'Banco Sqlite Carregando!')
})