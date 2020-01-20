<?php
namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber{
    public function updateJwtData(JWTCreatedEvent $event){

        //recup l'utilisateur pour avoir le nom et prenom
        $user = $event->getUser();

        // enrichir les data pour qu'elles contiennent ces données
        $data = $event->getData();
        $data['id'] = $user->getId();
        $data['firstName'] = $user->getFirstName();
        $data['lastName'] = $user->getLastName();


        // on réinjecte le data dans l'event
        $event->setData($data);
    }
}