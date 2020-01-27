<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(normalizationContext={"groups"={"items_read"}})
 * @ORM\Entity(repositoryClass="App\Repository\ItemsRepository")
 */
class Items
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"items_read","listesItems_read", "liste_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"items_read","listesItems_read", "liste_read"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"items_read","listesItems_read", "liste_read"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"items_read","listesItems_read", "liste_read"})
     */
    private $price;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"items_read","listesItems_read", "liste_read"})
     */
    private $picture;

    /**
     * @ORM\OneToMany(targetEntity="ListeItems", mappedBy="item")
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

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    /**
     * @return Collection|ListeItems[]
     */
    public function getListeItems(): Collection
    {
        return $this->listeItem;
    }

    public function addListItem(ListeItems $listeItem): self
    {
        if (!$this->listeItem->contains($listeItem)) {
            $this->listeItem[] = $listeItem;
            $listeItem->setItem($this);
        }

        return $this;
    }

    public function removeListItem(ListeItems $listeItem): self
    {
        if ($this->$listeItem->contains($listeItem)) {
            $this->$listeItem->removeElement($listeItem);
            // set the owning side to null (unless already changed)
            if ($listeItem->getItem() === $this) {
                $listeItem->setItem(null);
            }
        }

        return $this;
    }
}
