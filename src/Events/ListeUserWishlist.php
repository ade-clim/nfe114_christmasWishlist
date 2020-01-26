<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Liste;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class ListeUserWishlist implements EventSubscriberInterface{

    /**
     * @var Security
     */
    private $security;


    public function __construct(Security $security)
    {
        $this->security = $security;

    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForList', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForList(ViewEvent $event){
        $liste = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();


        if ($liste instanceof Liste && $method === "POST"){

            // recup l'utilisateur actuellement connecté
            $user = $this->security->getUser();

            // assigner l'utilisateur à la liste qu'on est en train de créer
            $liste->setUser($user);
        }




    }
}