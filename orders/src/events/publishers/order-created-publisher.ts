import { Publisher, OrderCreatedEvent, Subjects } from '@rkttickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
