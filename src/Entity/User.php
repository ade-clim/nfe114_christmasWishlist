<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ApiResource(attributes={
 *     "order"= {"id":"asc"}},
 *     normalizationContext={"groups"={"user_read"}},
 *     subresourceOperations={
 *     "liste_get_subresource"={"path"= "/user/{id}/listes"}}
 * )
 * @ApiFilter(SearchFilter::class, properties={"email": "exact"})
 * @UniqueEntity("email", message="un utilisateur ayant cette email existe déja")
 */

class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user_read", "liste_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank(message="L'email doit etre renseigné")
     * @Assert\Email(message="Le format de l'adresse email doit etre valide")
     * @Groups({"user_read"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotBlank(message="Le mot de passe est obligatoire")
     * @Groups({"user_read"})
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="Le prenom doit etre renseigné")
     * @Groups({"user_read"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user_read"})
     * @Assert\NotBlank(message="Le nom doit etre renseigné")
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"user_read"})
     */
    private $phone;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Address", cascade={"persist", "remove"})
     * @Groups({"user_read"})
     */
    private $address;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Liste", mappedBy="user")
     * @Groups({"user_read"})
     * @ApiSubresource()
     */
    private $liste;

    public function __construct()
    {
        $this->liste = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getAddress(): ?Address
    {
        return $this->address;
    }

    public function setAddress(?Address $address): self
    {
        $this->address = $address;

        return $this;
    }

    /**
     * @return Collection|Liste[]
     */
    public function getListe(): Collection
    {
        return $this->liste;
    }

    public function addListe(Liste $liste): self
    {
        if (!$this->liste->contains($liste)) {
            $this->liste[] = $liste;
            $liste->setUser($this);
        }

        return $this;
    }

    public function removeListe(Liste $liste): self
    {
        if ($this->liste->contains($liste)) {
            $this->liste->removeElement($liste);
            // set the owning side to null (unless already changed)
            if ($liste->getUser() === $this) {
                $liste->setUser(null);
            }
        }

        return $this;
    }
}
