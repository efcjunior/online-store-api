import * as dotenv from 'dotenv';
import express from 'express'
import {orderRouter} from './routes/orderRouter';

const app = express();
dotenv.config();

app.use(express.json());
app.use('/orders', orderRouter);

app.listen(3000, () => {
    console.log('Node server started running');
});