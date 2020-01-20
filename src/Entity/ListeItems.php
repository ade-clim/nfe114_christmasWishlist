<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(normalizationContext={"groups"={"listeItems_read"}})
 * @ORM\Entity(repositoryClass="App\Repository\ListItemsRepository")
 */
class ListeItems
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"listeItems_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Liste", inversedBy="listItems")
     * @Groups({"listeItems_read"})
     */
    private $liste;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Items", inversedBy="listItems")
     * @Groups({"listeItems_read"})
     */
    private $item;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getListe(): ?Liste
    {
        return $this->liste;
    }

    public function setListe(?Liste $liste): self
    {
        $this->liste = $liste;

        return $this;
    }

    public function getItem(): ?Items
    {
        return $this->item;
    }

    public function setItem(?Items $item): self
    {
        $this->item = $item;

        return $this;
    }
}
