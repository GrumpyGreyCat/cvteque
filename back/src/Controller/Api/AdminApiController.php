<?php

namespace App\Controller\Api;

use App\Entity\Students;
use App\Entity\Skills;
use App\Repository\StudentsRepository;
use App\Repository\SkillsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/admin', name: 'api_admin_')]
class AdminApiController extends AbstractController
{
    #[Route('/import-students', name: 'import_students', methods: ['POST'])]
    public function importStudents(
        Request $request,
        EntityManagerInterface $em,
        StudentsRepository $studentsRepository,
        SkillsRepository $skillsRepository,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        // 1. Récupérer et décoder le flux JSON envoyé par React
        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            return new JsonResponse(['error' => 'Données JSON invalides ou tableau attendu.'], Response::HTTP_BAD_REQUEST);
        }

        try {
            // Début d'une transaction pour s'assurer que tout s'insère proprement (tout ou rien)
            $em->beginTransaction();

            foreach ($data as $studentData) {
                // Vérification basique des champs requis obligatoires
                if (empty($studentData['email']) || empty($studentData['name']) || empty($studentData['password'])) {
                    throw new \Exception("Champs obligatoires manquants (nom, email ou mot de passe).");
                }

                // Éviter les doublons par Email
                $existingStudent = $studentsRepository->findOneBy(['email' => $studentData['email']]);
                if ($existingStudent) {
                    continue; // On passe à l'étudiant suivant s'il existe déjà
                }

                // 2. Création et hydratation de l'entité Students
                $student = new Students();
                $student->setName($studentData['name']);
                $student->setEmail($studentData['email']);
                $student->setPhone($studentData['phone'] ?? '');
                $student->setSchool($studentData['school'] ?? '');
                $student->setYear($studentData['year'] ?? '');
                $student->setLocation($studentData['location'] ?? '');
                $student->setDescription($studentData['description'] ?? '');
                $student->setLinkedin($studentData['linkedin'] ?? '');
                $student->setGithub($studentData['github'] ?? '');
                $student->setCreatedAt(new \DateTime()); // Date de création requise par ta contrainte NOT NULL

                // Hachage sécurisé du mot de passe (indispensable pour ton Login.jsx !)
                $hashedPassword = $passwordHasher->hashPassword($student, $studentData['password']);
                $student->setPassword($hashedPassword);

                // 3. Gestion dynamique des Compétences (Relation ManyToMany via ta table pivot)
                if (!empty($studentData['skills']) && is_array($studentData['skills'])) {
                    foreach ($studentData['skills'] as $skillName) {
                        $skillNameClean = trim($skillName);
                        if (empty($skillNameClean)) continue;

                        // On cherche si la compétence existe déjà en BDD (pour éviter les doublons dans ta table 'skills')
                        $skill = $skillsRepository->findOneBy(['name' => $skillNameClean]);

                        if (!$skill) {
                            // Si elle n'existe pas, l'admin la crée à la volée !
                            $skill = new Skills();
                            $skill->setName($skillNameClean);
                            $em->persist($skill);
                        }

                        // Ajout de la relation via ta méthode sécurisée de ton entité Students
                        $student->addSkill($skill);
                    }
                }

                // Persister l'étudiant
                $em->persist($student);
            }

            // Sauvegarde définitive dans PostgreSQL
            $em->flush();
            $em->commit();

            return new JsonResponse(['success' => true, 'message' => 'Importation de masse réussie.'], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            // En cas de bug, on annule tout pour ne pas corrompre la BDD
            $em->rollback();
            return new JsonResponse(['error' => 'Erreur lors de l\'insertion : ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}