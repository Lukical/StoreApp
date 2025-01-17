require('dotenv').config();
require('./database/index');
const express = require('express');
const cors = require('cors');
const routes = require('./routes')

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Server escutando na porta ${PORT}`)
});