import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// Entity no typeorm é um model que será salvo no database

import User from '@modules/users/infra/typeorm/entities/User';

/**
 * Um para Um (OneToOne) -> Um usuário tem no máximo um agendamento
 * Um para Muitos (OneToMany) -> Um usuário tem muitos agendamentos
 * Muitos para Muitos (ManyToMany) -> Vários prestadores de serviço participam de um agendamento
 *
 * sempre a partir do ponto de partida para o outro, no caso o agendamento para o user
 */

@Entity('appointments') // nome da tabela
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;
  // criar o relacionamento no model para poder acessar todos
  // os dados do usuario dentro do agendamento/appointments

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
