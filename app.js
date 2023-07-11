const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const sequelize = require('./util/database');
const Expense = require('./models/Expense');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json({extended:false}));

const expenseRoutes = require('./routes/expense');

app.use('/expense',expenseRoutes);

sequelize.sync().then((response) =>{
    console.log(response);
    app.listen(5000);
}).catch(error=>console.log(error));