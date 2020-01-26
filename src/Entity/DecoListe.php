<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(normalizationContext={"groups"={"decoListe_read"}})
 * @ORM\Entity(repositoryClass="App\Repository\DecoListeRepository")
 */
class DecoListe
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"decoListe_read","liste_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"decoListe_read","liste_read"})
     */
    private $wallpaper;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"decoListe_read","liste_read"})
     */
    private $border;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"decoListe_read","liste_read"})
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
