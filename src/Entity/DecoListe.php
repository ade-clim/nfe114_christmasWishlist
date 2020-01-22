<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\DecoListeRepository")
 */
class DecoListe
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $wallpaper;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $border;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $motif;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getWallpaper(): ?string
    {
        return $this->wallpaper;
    }

    public function setWallpaper(string $wallpaper): self
    {
        $this->wallpaper = $wallpaper;

        return $this;
    }

    public function getBorder(): ?string
    {
        return $this->border;
    }

    public function setBorder(?string $border): self
    {
        $this->border = $border;

        return $this;
    }

    public function getMotif(): ?string
    {
        return $this->motif;
    }

    public function setMotif(?string $motif): self
    {
        $this->motif = $motif;

        return $this;
    }
}
