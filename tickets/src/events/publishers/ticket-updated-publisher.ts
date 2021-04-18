import { Publisher, Subjects, TicketUpdatedEvent } from '@rkttickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
