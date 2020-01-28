<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200128100413 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE liste_items ADD user_item_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE liste_items ADD CONSTRAINT FK_FEE53DE34A624C54 FOREIGN KEY (user_item_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_FEE53DE34A624C54 ON liste_items (user_item_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE liste_items DROP FOREIGN KEY FK_FEE53DE34A624C54');
        $this->addSql('DROP INDEX IDX_FEE53DE34A624C54 ON liste_items');
        $this->addSql('ALTER TABLE liste_items DROP user_item_id');
    }
}
