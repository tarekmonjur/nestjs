import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnWorkOrdersTable1598728280351 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE work_orders ADD created_at TIMESTAMP AFTER status`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_orders" DROP COLUMN "created_at"`);
    }

}
