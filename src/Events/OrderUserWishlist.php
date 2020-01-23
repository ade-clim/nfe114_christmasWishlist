<?php

namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class OrderUserSubscriber implements EventSubscriberInterface{

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
            KernelEvents::VIEW => ['setUserForOrder', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForOrder(ViewEvent $event){
        $order = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();


        if ($order instanceof Orders && $method === "POST"){

            // recup l'utilisateur actuellement connecté
            $user = $this->security->getUser();

            // assigner l'utilisateur au customer qu'on est en train de créer
            $order->setUser($user);
        }




    }
}