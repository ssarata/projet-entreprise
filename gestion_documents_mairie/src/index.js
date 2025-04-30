import express from 'express';
import variableRoutes from './Routes/VariableRoute.js';

const app=express()//instance de express
const port=4000
app.use(express.json());

app.use('/api/variables', variableRoutes);
app.listen(port,()=>{
    console.log(`server start on ${port}`);
    
    
})