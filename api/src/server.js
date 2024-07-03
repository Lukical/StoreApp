require('dotenv').config();
require('./database/index');
const routes = require('./routes')
const express = require('express');
const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Server escutando na porta ${PORT}`)
});