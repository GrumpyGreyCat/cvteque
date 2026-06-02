<?php

namespace App\Entity;

use App\Repository\CvsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CvsRepository::class)]
class Cvs
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $url = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTime $uploaded_at = null;

    #[ORM\ManyToOne(inversedBy: 'cvs_id')]
    private ?Students $studend_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getUploadedAt(): ?\DateTime
    {
        return $this->uploaded_at;
    }

    public function setUploadedAt(\DateTime $uploaded_at): static
    {
        $this->uploaded_at = $uploaded_at;

        return $this;
    }

    public function getStudendId(): ?Students
    {
        return $this->studend_id;
    }

    public function setStudendId(?Students $studend_id): static
    {
        $this->studend_id = $studend_id;

        return $this;
    }
}
