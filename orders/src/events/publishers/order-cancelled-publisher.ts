import { Publisher, OrderCancelledEvent, Subjects } from '@rkttickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
