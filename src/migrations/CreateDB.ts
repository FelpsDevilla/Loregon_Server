import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDB1747592938673 implements MigrationInterface {
    name = 'CreateDB1747592938673'

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users" (
            "id" SERIAL NOT NULL,
            "name" VARCHAR NOT NULL,
            "cpf" VARCHAR(11) NOT NULL,
            "password" VARCHAR NOT NULL,
            "is_active" BOOLEAN NOT NULL DEFAULT false,
            "is_admin" BOOLEAN NOT NULL DEFAULT false,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "UQ_users_cpf" UNIQUE ("cpf"),
            CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
        );
    `);

    await queryRunner.query(`
        CREATE TABLE "authors" (
            "id" SERIAL NOT NULL,
            "name" VARCHAR NOT NULL,
            "description" VARCHAR NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_authors_id" PRIMARY KEY ("id")
        );
    `);

    await queryRunner.query(`
        CREATE TABLE "collections" (
            "id" SERIAL NOT NULL,
            "name" VARCHAR NOT NULL,
            "description" VARCHAR NOT NULL,
            "author_id" INTEGER NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_collections_id" PRIMARY KEY ("id"),
            CONSTRAINT "FK_collections_author" FOREIGN KEY ("author_id") REFERENCES "authors"("id")
        );
    `);

    await queryRunner.query(`
        CREATE TABLE "archive" (
            "id" SERIAL NOT NULL,
            "name" VARCHAR NOT NULL,
            "description" VARCHAR NOT NULL,
            "city" VARCHAR,
            "state" VARCHAR,
            "original_date" DATE,
            "technique" VARCHAR,
            "material" VARCHAR,
            "donor" VARCHAR,
            "context_history" VARCHAR,
            "image_file_name" VARCHAR,
            "is_digitalized" BOOLEAN NOT NULL DEFAULT false,
            "author_id" INTEGER NOT NULL,
            "collection_id" INTEGER NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_archive_id" PRIMARY KEY ("id"),
            CONSTRAINT "FK_archive_author" FOREIGN KEY ("author_id") REFERENCES "authors"("id"),
            CONSTRAINT "FK_archive_collection" FOREIGN KEY ("collection_id") REFERENCES "collections"("id")
        );
    `);

    await queryRunner.query(`
        CREATE TABLE "library" (
            "id" SERIAL NOT NULL,
            "name" VARCHAR NOT NULL,
            "description" VARCHAR NOT NULL,
            "state" VARCHAR,
            "city" VARCHAR,
            "original_date" DATE,
            "image_file_name" VARCHAR,
            "book_file_name" VARCHAR NOT NULL,
            "donor" VARCHAR,
            "context_history" TEXT,
            "digitalization_technique" VARCHAR,
            "author_id" INTEGER NOT NULL,
            "collection_id" INTEGER NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_library_id" PRIMARY KEY ("id"),
            CONSTRAINT "FK_library_author" FOREIGN KEY ("author_id") REFERENCES "authors"("id"),
            CONSTRAINT "FK_library_collection" FOREIGN KEY ("collection_id") REFERENCES "collections"("id")
        );
    `);

    await queryRunner.query(`
        CREATE TABLE "gallery" (
            "id" SERIAL NOT NULL,
            "name" VARCHAR NOT NULL,
            "original_date" DATE,
            "image_file_name" VARCHAR NOT NULL,
            "author_id" INTEGER NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_gallery_id" PRIMARY KEY ("id"),
            CONSTRAINT "FK_gallery_author" FOREIGN KEY ("author_id") REFERENCES "authors"("id")
        );
    `);
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "gallery";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "library";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "archive";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "collections";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "authors";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users";`);
}

}
