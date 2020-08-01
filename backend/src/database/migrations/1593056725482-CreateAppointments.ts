import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1593056725482
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            // isNullable: false,
            // Só por referência: por padrão é que o valor não seja nulo
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            // somente existe no postgress
            // para mysql usar timestamp
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}

/**
 * Linha do tempo
 *
 * 1ª Semana: Criou tabela de Agendamentos
 * 2ª Semana: Criou tabela de Usuários
 * 3ª Semana novo DEV > Edição na tabela de Agendamentos
 * 4ª semana: Compras
 *
 * Diferentes versões que podem ser sincronizadas com migrations
 *
 * Método up faz a migration
 * Método down desfaz a migration
 */
