<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(normalizationContext={"groups"={"listesItems_read"}})
 * @ORM\Entity(repositoryClass="App\Repository\ListeItemsRepository")
 */
class ListeItems
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"listesItems_read", "liste_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Liste", inversedBy="listeItems")
     */
    private $liste;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Items", inversedBy="listeItems")
     * @Groups({"listesItems_read", "liste_read"})
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
