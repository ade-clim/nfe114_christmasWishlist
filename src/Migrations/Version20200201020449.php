<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200201020449 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE address (id INT AUTO_INCREMENT NOT NULL, street VARCHAR(255) DEFAULT NULL, number VARCHAR(255) DEFAULT NULL, postal_code VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE deco_liste (id INT AUTO_INCREMENT NOT NULL, wallpaper VARCHAR(255) DEFAULT NULL, border VARCHAR(255) DEFAULT NULL, motif VARCHAR(255) DEFAULT NULL, timbre VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE items (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, price VARCHAR(255) NOT NULL, picture VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE liste (id INT AUTO_INCREMENT NOT NULL, deco_liste_id INT DEFAULT NULL, user_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_FCF22AF4B8885280 (deco_liste_id), INDEX IDX_FCF22AF4A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE liste_items (id INT AUTO_INCREMENT NOT NULL, liste_id INT DEFAULT NULL, item_id INT DEFAULT NULL, user_item_id INT DEFAULT NULL, INDEX IDX_FEE53DE3E85441D8 (liste_id), INDEX IDX_FEE53DE3126F525E (item_id), INDEX IDX_FEE53DE34A624C54 (user_item_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, address_id INT DEFAULT NULL, email VARCHAR(180) NOT NULL, roles TEXT NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, phone VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), UNIQUE INDEX UNIQ_8D93D649F5B7AF75 (address_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE liste ADD CONSTRAINT FK_FCF22AF4B8885280 FOREIGN KEY (deco_liste_id) REFERENCES deco_liste (id)');
        $this->addSql('ALTER TABLE liste ADD CONSTRAINT FK_FCF22AF4A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE liste_items ADD CONSTRAINT FK_FEE53DE3E85441D8 FOREIGN KEY (liste_id) REFERENCES liste (id)');
        $this->addSql('ALTER TABLE liste_items ADD CONSTRAINT FK_FEE53DE3126F525E FOREIGN KEY (item_id) REFERENCES items (id)');
        $this->addSql('ALTER TABLE liste_items ADD CONSTRAINT FK_FEE53DE34A624C54 FOREIGN KEY (user_item_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649F5B7AF75 FOREIGN KEY (address_id) REFERENCES address (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649F5B7AF75');
        $this->addSql('ALTER TABLE liste DROP FOREIGN KEY FK_FCF22AF4B8885280');
        $this->addSql('ALTER TABLE liste_items DROP FOREIGN KEY FK_FEE53DE3126F525E');
        $this->addSql('ALTER TABLE liste_items DROP FOREIGN KEY FK_FEE53DE3E85441D8');
        $this->addSql('ALTER TABLE liste DROP FOREIGN KEY FK_FCF22AF4A76ED395');
        $this->addSql('ALTER TABLE liste_items DROP FOREIGN KEY FK_FEE53DE34A624C54');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE deco_liste');
        $this->addSql('DROP TABLE items');
        $this->addSql('DROP TABLE liste');
        $this->addSql('DROP TABLE liste_items');
        $this->addSql('DROP TABLE user');
    }
}
