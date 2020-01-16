<?php

namespace App\Repository;

use App\Entity\ListeItems;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method ListeItems|null find($id, $lockMode = null, $lockVersion = null)
 * @method ListeItems|null findOneBy(array $criteria, array $orderBy = null)
 * @method ListeItems[]    findAll()
 * @method ListeItems[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ListItemsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ListeItems::class);
    }

    // /**
    //  * @return ListeItems[] Returns an array of ListeItems objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ListeItems
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
