<?php

namespace App\Repository;

use App\Entity\DecoListe;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method DecoListe|null find($id, $lockMode = null, $lockVersion = null)
 * @method DecoListe|null findOneBy(array $criteria, array $orderBy = null)
 * @method DecoListe[]    findAll()
 * @method DecoListe[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DecoListeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DecoListe::class);
    }

    // /**
    //  * @return DecoListe[] Returns an array of DecoListe objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?DecoListe
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
