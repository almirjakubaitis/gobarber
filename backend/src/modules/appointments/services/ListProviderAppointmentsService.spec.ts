// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppopintmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppopintments: ListProviderAppopintmentsService;

const providerId = '039390-he3009';
const userID = '09440-8888';

describe('ListProviderAppopintments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppopintments = new ListProviderAppopintmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day from provider', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: providerId,
      user_id: userID,
      date: new Date(2021, 4, 20, 8, 0, 0),
    }); // abril

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: providerId,
      user_id: userID,
      date: new Date(2021, 4, 20, 10, 0, 0),
    }); // abril

    const appointments = await listProviderAppopintments.execute({
      provider_id: providerId,
      year: 2021,
      month: 5, // abril
      day: 20,
    });

    //
    // espero que seja um array
    // 20 e 21 com avilable: false
    //

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );
  });

  //
});
