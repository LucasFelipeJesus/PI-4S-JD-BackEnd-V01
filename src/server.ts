import express from "express"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(routes)
app.use(cors())

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);

    //console.log(database.isInitialized ? 'Banco Sqllite Dados OK! :' : 'Banco Sqllite Carregando!')

    //console.log(db2DataSource.isInitialized ? 'Banco Mysql Dados OK! :' : 'Banco Mysql Carregando!')

    console.log(db3DataSource.isInitialized ? 'Banco Sqlserver Dados OK! :' : 'Banco Sqlserver Carregando!')
})c