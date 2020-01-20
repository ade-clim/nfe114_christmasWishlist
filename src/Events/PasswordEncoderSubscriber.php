<?php
namespace  App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\User;
use App\Kernel;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class PasswordEncoderSubscriber implements EventSubscriberInterface {

    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public static function getSubscribedEvents() // on va lui dire à quel moment de l'evenement elle doit nous répondre
    {
        return [
            KernelEvents::VIEW => ['encodePassword', EventPriorities::PRE_WRITE]
        ];
    }

    public function encodePassword(ViewEvent $event){

        $user = $event->getControllerResult(); // obtenir le résultat de notre requete event, au moment ou il finit de deserializer
        $method = $event->getRequest()->getMethod(); // POST, GET, PUT ...

        if($user instanceof User && $method === "POST"){ // je ne travaille que si mon result est un User et que je suis en post
            $hash = $this->encoder->encodePassword($user, $user->getPassword()); // je hash mon password
            $user->setPassword($hash); // j'envoie mon nouveau password hasher
        }
    }

}