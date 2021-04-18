import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@rkttickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
