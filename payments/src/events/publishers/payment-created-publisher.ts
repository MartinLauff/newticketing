import { Subjects, Publisher, PaymentCreatedEvent } from '@rkttickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
