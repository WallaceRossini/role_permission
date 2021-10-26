import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTable1635245202502 implements MigrationInterface {
    name = 'CreateTable1635245202502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions_role\` (\`role_id\` varchar(255) NOT NULL, \`permission_id\` varchar(255) NOT NULL, INDEX \`IDX_148c57fc24d613ec170c918b46\` (\`role_id\`), INDEX \`IDX_98a33544e4df79cc3fe9a6606e\` (\`permission_id\`), PRIMARY KEY (\`role_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_roles\` (\`user_id\` varchar(255) NOT NULL, \`role_id\` varchar(255) NOT NULL, INDEX \`IDX_e4435209df12bc1f001e536017\` (\`user_id\`), INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` (\`role_id\`), PRIMARY KEY (\`user_id\`, \`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_permissions\` (\`user_id\` varchar(255) NOT NULL, \`permission_id\` varchar(255) NOT NULL, INDEX \`IDX_4de7d0b175f702be3be5527002\` (\`user_id\`), INDEX \`IDX_b09b9a210c60f41ec7b453758e\` (\`permission_id\`), PRIMARY KEY (\`user_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permissions_role\` ADD CONSTRAINT \`FK_148c57fc24d613ec170c918b466\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`permissions_role\` ADD CONSTRAINT \`FK_98a33544e4df79cc3fe9a6606ed\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_e4435209df12bc1f001e5360174\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_1cf664021f00b9cc1ff95e17de4\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_permissions\` ADD CONSTRAINT \`FK_4de7d0b175f702be3be55270023\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_permissions\` ADD CONSTRAINT \`FK_b09b9a210c60f41ec7b453758e9\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_permissions\` DROP FOREIGN KEY \`FK_b09b9a210c60f41ec7b453758e9\``);
        await queryRunner.query(`ALTER TABLE \`users_permissions\` DROP FOREIGN KEY \`FK_4de7d0b175f702be3be55270023\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_1cf664021f00b9cc1ff95e17de4\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_e4435209df12bc1f001e5360174\``);
        await queryRunner.query(`ALTER TABLE \`permissions_role\` DROP FOREIGN KEY \`FK_98a33544e4df79cc3fe9a6606ed\``);
        await queryRunner.query(`ALTER TABLE \`permissions_role\` DROP FOREIGN KEY \`FK_148c57fc24d613ec170c918b466\``);
        await queryRunner.query(`DROP INDEX \`IDX_b09b9a210c60f41ec7b453758e\` ON \`users_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_4de7d0b175f702be3be5527002\` ON \`users_permissions\``);
        await queryRunner.query(`DROP TABLE \`users_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\``);
        await queryRunner.query(`DROP TABLE \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_98a33544e4df79cc3fe9a6606e\` ON \`permissions_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_148c57fc24d613ec170c918b46\` ON \`permissions_role\``);
        await queryRunner.query(`DROP TABLE \`permissions_role\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
    }

}
