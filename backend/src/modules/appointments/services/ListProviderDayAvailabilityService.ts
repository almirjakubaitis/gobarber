import { injectable, inject } from 'tsyringe';
import { getHours } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}
//

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

// type OutroModo =  {
//   day: number;
//   available: boolean;
// }[]

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('UsersRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllinDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (value, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      return {
        hour,
        available: !hasAppointmentInHour,
      };
    });

    // return [{ hour: 1, available: false }];
    console.log(availability);
    return availability;
  }
}
