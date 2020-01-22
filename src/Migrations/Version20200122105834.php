<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200122105834 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE deco_liste (id INT AUTO_INCREMENT NOT NULL, wallpaper VARCHAR(255) NOT NULL, border VARCHAR(255) DEFAULT NULL, motif VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE liste ADD deco_liste_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE liste ADD CONSTRAINT FK_FCF22AF4B8885280 FOREIGN KEY (deco_liste_id) REFERENCES deco_liste (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_FCF22AF4B8885280 ON liste (deco_liste_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE liste DROP FOREIGN KEY FK_FCF22AF4B8885280');
        $this->addSql('DROP TABLE deco_liste');
        $this->addSql('DROP INDEX UNIQ_FCF22AF4B8885280 ON liste');
        $this->addSql('ALTER TABLE liste DROP deco_liste_id');
    }
}
