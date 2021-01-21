import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}
//

type IResponse = Array<{
  day: number;
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
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    console.log(appointments);

    return [{ day: 1, available: false }];
  }
}
