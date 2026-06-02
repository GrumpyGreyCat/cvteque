<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260602223919 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE students_skills (students_id INT NOT NULL, skills_id INT NOT NULL, PRIMARY KEY (students_id, skills_id))');
        $this->addSql('CREATE INDEX IDX_6FED33121AD8D010 ON students_skills (students_id)');
        $this->addSql('CREATE INDEX IDX_6FED33127FF61858 ON students_skills (skills_id)');
        $this->addSql('ALTER TABLE students_skills ADD CONSTRAINT FK_6FED33121AD8D010 FOREIGN KEY (students_id) REFERENCES students (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE students_skills ADD CONSTRAINT FK_6FED33127FF61858 FOREIGN KEY (skills_id) REFERENCES skills (id) ON DELETE CASCADE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_A4698DB2E7927C74 ON students (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE students_skills DROP CONSTRAINT FK_6FED33121AD8D010');
        $this->addSql('ALTER TABLE students_skills DROP CONSTRAINT FK_6FED33127FF61858');
        $this->addSql('DROP TABLE students_skills');
        $this->addSql('DROP INDEX UNIQ_A4698DB2E7927C74');
    }
}
