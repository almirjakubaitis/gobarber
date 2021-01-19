// import 'reflect-metadata';
// test('sum two numbers', () => {
//   expect(1 + 2).toBe(3);
// });
import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

// describe('categoria de testes')

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointmentService: CreateAppointmentService;

const providerId = '039390-he3009';

describe('CreateAppointment', () => {
  // beforeEach(() => {});
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: providerId,
    });

    // expect(appointment.provider_id).toBe('039390-he3009');
    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('date');
  });

  //

  it('should not be able able to create two appointments at the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: providerId,
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: providerId,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
