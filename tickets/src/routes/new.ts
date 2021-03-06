import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  DatabaseConnectionError,
} from '@rkttickets/common';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    // CREATE TICKET
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    // HANDLE MONGODB TRANSACTIONS
    const SESSION = await mongoose.startSession();

    try {
      await SESSION.startTransaction();
      await ticket.save();
      await new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version,
      });

      await SESSION.commitTransaction();

      res.status(201).send(ticket);
    } catch (err) {
      // CATCH ANY ERROR DUE TO TRANSACTION

      await SESSION.abortTransaction();

      throw new DatabaseConnectionError();
    } finally {
      // FINALIZE SESSION
      SESSION.endSession();
    }
  }
);

export { router as createTicketRouter };
