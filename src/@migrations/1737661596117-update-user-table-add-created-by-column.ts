import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class UpdateUserTableAddCreatedByColumn1737661596117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'created_by',
        type: 'int',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        name: 'FK_user_created_by',
        columnNames: ['created_by'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('user', 'FK_user_created_by')
    await queryRunner.dropColumn('user', 'created_by')
  }
}
