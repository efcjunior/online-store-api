/**
 * Required External Modules and Interfaces
 */
import express, {Request, Response} from 'express';
import * as OrderService from './order.service';
import {BasicOrder, Order} from './order.interface';

/**
 * Router Definition
 */
export const orderRouter = express.Router();
/**
 * Controller Definitions
 */

orderRouter.get('/', async(req: Request, res: Response) => {
    OrderService.findAll((err: Error, orders: Order[]) => {
        if(err) {
            return res.status(500).json({"errorMessage": err.message});
        }
        res.status(200).json({"data": orders})
    });
});

orderRouter.get('/:id', async(req: Request, res: Response) => {
    const orderId: number = Number(req.params.id);
    OrderService.findOne(orderId, (err:Error, order: Order) => {
        if (err) {
            return res.status(500).json({"message": err.message});
          }
          res.status(200).json({"data": order});
    });
});

orderRouter.post('/', async (req: Request, res: Response) => {
    const newOrder: BasicOrder = req.body;    
    OrderService.create(newOrder, (err: Error, orderId: number) => {
        if(err) {
            return res.status(500).json({"errorMessage": err.message});
        }
        res.status(200).json({"orderId": orderId});
    });
});

orderRouter.put('/:id', async(req: Request, res: Response) => {
    const order: Order = req.body;
    OrderService.update(order, (err:Error) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
      
        res.status(200).send();
    });    
})