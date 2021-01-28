// import 'reflect-metadata';
// test('sum two numbers', () => {
//   expect(1 + 2).toBe(3);
// });
import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakesNotificationRepository';
import FakeCacheProvider from '@providers/CacheProvider/fakes/FakeCacheProvider';

import CreateAppointmentService from './CreateAppointmentService';

// describe('categoria de testes')

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

let createAppointmentService: CreateAppointmentService;

const providerId = '039390-he3009';
const userID = '09440-8888';

describe('CreateAppointment', () => {
  // beforeEach(() => {});
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2021, 4, 12, 13),
      provider_id: providerId,
      user_id: userID,
    });

    expect(appointment.provider_id).toBe(providerId);
    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('date');
  });

  //

  it('should not be able able to create two appointments at the same time', async () => {
    const appointmentDate = new Date(2021, 4, 12, 13);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: providerId,
      user_id: userID,
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: providerId,
        user_id: userID,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  //

  it('should not ble able to create an appointment on past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 4, 10, 11), // maio
        provider_id: providerId,
        user_id: userID,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  //

  it('should not ble able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 4, 12, 11), // maio
        provider_id: providerId,
        user_id: providerId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  //

  it('should not ble able to create an appointment outside the business hours (8am and 5pm)', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 10).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 4, 11, 7), // maio
        provider_id: providerId,
        user_id: userID,
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 4, 11, 18), // maio
        provider_id: providerId,
        user_id: userID,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
