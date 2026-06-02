<?php

namespace App\Controller;

use App\Entity\Students;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class SecurityController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(#[CurrentUser] ?Students $student): JsonResponse
    {
        // Si les identifiants saisis dans React sont incorrects, Symfony rejette la requête automatiquement avec une erreur 401.
        // Si on arrive ici, c'est que l'étudiant est validé et connecté !
        if (null === $student) {
            return $this->json(['message' => 'Identifiants invalides.'], 401);
        }

        return $this->json([
            'id' => $student->getId(),
            'email' => $student->getEmail(),
            'name' => $student->getName(),
            'roles' => $student->getRoles(),
            'message' => 'Connexion réussie depuis le backend !'
        ]);
    }

    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): void
    {
        // Géré automatiquement par le composant Security de Symfony
    }
}