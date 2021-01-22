import { ObjectID } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationtDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export default class NotificationsRepository
  implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationtDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });
    this.notifications.push(notification);

    return notification;
  }
}
