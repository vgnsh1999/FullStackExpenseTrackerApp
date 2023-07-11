const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const sequelize = require('./util/database');
const Expense = require('./models/Expense');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json({extended:false}));

app.post('/expense/add-expense',async (req,res,next)=>{
    try{
        console.log('hi')
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;

        const data = await Expense.create({amount:amount,description:description,category:category}); 
        res.status(201).json({newExpenseAdded:data});
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({error:error});
    }
});

app.get('/expense/get-expense',async (req,res,next)=>{
    try{
        const expenses = await Expense.findAll();
        res.status(200).json({allExpenses:expenses});
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({error:error});
    }
});

app.delete('/expense/delete-expense/:id',async (req,res,next)=>{
    try{
        const expenseID = req.params.id;
        await Expense.destroy({where:{id:expenseID}});
        res.sendStatus(200);
    } catch(error){
        console.log(JSON.stringify(error));
        res.status(500).json({error:error});
    }
});

sequelize.sync().then((response) =>{
    console.log(response);
    app.listen(5000);
}).catch(error=>console.log(error));