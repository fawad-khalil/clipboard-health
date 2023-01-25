import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createEmployeesTable1674512870753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'employee',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'salary',
                    type: 'varchar',
                },
                {
                    name: 'currency',
                    type: 'varchar',
                },
                {
                    name: 'department',
                    type: 'varchar',
                },
                {
                    name: 'sub_department',
                    type: 'varchar',
                },
                {
                    name: 'on_contract',
                    isNullable: true,
                    type: 'varchar',
                },
                {
                    name:'deleted_at',
                    type: 'datetime',
                    isNullable: true,
                }
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('employee');
    }

}
