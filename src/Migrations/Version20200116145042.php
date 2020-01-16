<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200116145042 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE items (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, price VARCHAR(255) NOT NULL, picture VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE liste (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE liste_items (id INT AUTO_INCREMENT NOT NULL, liste_id INT DEFAULT NULL, item_id INT DEFAULT NULL, INDEX IDX_FEE53DE3E85441D8 (liste_id), INDEX IDX_FEE53DE3126F525E (item_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE liste_items ADD CONSTRAINT FK_FEE53DE3E85441D8 FOREIGN KEY (liste_id) REFERENCES liste (id)');
        $this->addSql('ALTER TABLE liste_items ADD CONSTRAINT FK_FEE53DE3126F525E FOREIGN KEY (item_id) REFERENCES items (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE liste_items DROP FOREIGN KEY FK_FEE53DE3126F525E');
        $this->addSql('ALTER TABLE liste_items DROP FOREIGN KEY FK_FEE53DE3E85441D8');
        $this->addSql('DROP TABLE items');
        $this->addSql('DROP TABLE liste');
        $this->addSql('DROP TABLE liste_items');
    }
}
