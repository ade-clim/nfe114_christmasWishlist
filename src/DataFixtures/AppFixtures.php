<?php

namespace App\DataFixtures;

use App\Entity\Address;
use App\Entity\DecoListe;
use App\Entity\Items;
use App\Entity\Liste;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;
    public function __construct(UserPasswordEncoderInterface $encoder){
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        for ($i = 0; $i < 30; $i++) { // boucle de creation d'utilisateur

            $adresse = new Address();
            $adresse->setStreet($faker->streetName)
                ->setNumber($faker->buildingNumber)
                ->setPostalCode($faker->postcode)
                ->setCity($faker->city);

            //$manager->persist($adresse);


            $client = new User();
            $hash = $this->encoder->encodePassword($client, "password");
            $client->setFirstName($faker->firstName)
                ->setLastName($faker->lastName)
                ->setPassword($hash)
                ->setPhone($faker->phoneNumber)
                ->setEmail($faker->email)
                ->setAddress($adresse);

            $manager->persist($client);

            $decoListe = new DecoListe();
            $decoListe->setWallpaper("https://127.0.0.1:8080/build/images/Bow.231b030e.png")
                ->setBorder("#F5624D")
                ->setMotif();
            $manager->persist($decoListe);


            for ($l = 0; $l < 2; $l++){
                $liste = new Liste();
                $liste->setTitle($faker->words($nb = 3, $asText = false) )
                    ->setDescription($faker->text($maxNbChars = 150) )
                    ->setUser($client)
                    ->setDecoListe($decoListe);
            }
            $manager->persist($liste);
        }

        for ($i = 0; $i <50; $i++){
            $items = new Items();
            $items->setTitle($faker->text($maxNbChars = 10))
                ->setDescription($faker->text($maxNbChars = 20))
                ->setPrice(mt_rand(5, 150))
                ->setPicture("https://via.placeholder.com/250");

            $manager->persist($items);
        }
        $manager->flush();
    }
}
