<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(normalizationContext={"groups"={"liste_read"}})
 * @ORM\Entity(repositoryClass="App\Repository\ListeRepository")
 */
class Liste
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"liste_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"liste_read"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"liste_read"})
     */
    private $description;

    /**
     * @ORM\OneToMany(targetEntity="ListeItems", mappedBy="liste")
     */
    private $listeItems;

    public function __construct()
    {
        $this->listeItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection|ListeItems[]
     */
    public function getListeItems(): Collection
    {
        return $this->listeItems;
    }

    public function addListeItem(ListeItems $listeItem): self
    {
        if (!$this->listeItems->contains($listeItem)) {
            $this->listeItems[] = $listeItem;
            $listeItem->setListe($this);
        }

        return $this;
    }

    public function removeListeItem(ListeItems $listeItem): self
    {
        if ($this->listeItems->contains($listeItem)) {
            $this->listeItems->removeElement($listeItem);
            // set the owning side to null (unless already changed)
            if ($listeItem->getListe() === $this) {
                $listeItem->setListe(null);
            }
        }

        return $this;
    }
}