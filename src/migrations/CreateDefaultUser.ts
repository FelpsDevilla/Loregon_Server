import bcrypt from "bcryptjs";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDefaultUser1747688838876 implements MigrationInterface {
    private fristPassword = "admin";

    name: string | undefined = "CreateDefaultUser1747688838876";
    transaction?: boolean | undefined;

    public async up(queryRunner: QueryRunner): Promise<void> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(this.fristPassword, salt);

        await queryRunner.query(`
            INSERT INTO "users" ("name", "cpf", "password", "is_active", "is_admin", "created_at", "updated_at")
            VALUES (
            'Administrador',
            '00000000000',
            '${hash}',
            true,
            true,
            now(),
            now()
            );
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "users" WHERE cpf = 00000000000 AND name = Administrador;
        `)
    }
}