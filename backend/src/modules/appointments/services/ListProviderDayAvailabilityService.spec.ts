// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 8, 0, 0),
    }); // abril

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 10, 0, 0),
    }); // abril

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 5, // abril
      day: 20,
    });

    //
    // espero que seja um array
    // 20 e 21 com avilable: false
    //

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });

  //

  it('should not be availability to list an older hour as available from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 14, 0, 0),
    }); // abril

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 15, 0, 0),
    }); // abril

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 20, 11, 0, 0).getTime();
    }); // mock
    // mockImplementationOnce - somente uma vez

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2021,
      month: 5, // abril
      day: 20,
    });

    //
    // espero que seja um array
    // 20 e 21 com avilable: false
    //

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
        { hour: 17, available: true },
      ]),
    );
  });

  //
});
