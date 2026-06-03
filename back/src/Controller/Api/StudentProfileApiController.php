<?php

namespace App\Controller\Api;

use App\Entity\Students;
use App\Entity\Education;
use App\Entity\Experience;
use App\Entity\Project;
use App\Entity\Skills;
use App\Repository\StudentsRepository;
use App\Repository\SkillsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/student', name: 'api_student_')]
class StudentProfileApiController extends AbstractController
{
    #[Route('/profile/update', name: 'profile_update', methods: ['PUT'])]
    public function updateProfile(
        Request $request,
        EntityManagerInterface $em,
        StudentsRepository $studentsRepository,
        SkillsRepository $skillsRepository
    ): JsonResponse {
        
        try {
            $data = json_decode($request->getContent(), true);

            if (!isset($data['id'])) {
                return new JsonResponse(['error' => 'Identifiant étudiant manquant.'], Response::HTTP_BAD_REQUEST);
            }

            $student = $studentsRepository->find($data['id']);
            if (!$student) {
                return new JsonResponse(['error' => 'Étudiant introuvable.'], Response::HTTP_NOT_FOUND);
            }

            $em->beginTransaction();

            // 1. Informations personnelles de base
            $student->setName($data['name'] ?? $student->getName());
            $student->setPhone($data['phone'] ?? '');
            $student->setLocation($data['location'] ?? '');
            $student->setSchool($data['school'] ?? '');
            $student->setYear($data['year'] ?? '');
            $student->setLinkedin($data['linkedin'] ?? '');
            $student->setGithub($data['github'] ?? '');
            $student->setDescription($data['description'] ?? '');

            // 2. NETTOYAGE SÉCURISÉ DES SKILLS (ManyToMany)
            // On force l'accès à la collection Doctrine originale pour éviter les conflits de types (array vs Collection)
            $skillsProperty = new \ReflectionProperty(Students::class, 'skills');
            $skillsProperty->setAccessible(true);
            $skillsCollection = $skillsProperty->getValue($student);

            if ($skillsCollection instanceof \Doctrine\Common\Collections\Collection || is_array($skillsCollection)) {
                foreach ($skillsCollection as $oldSkill) {
                    $student->removeSkill($oldSkill);
                }
            }

            // Insertion des nouvelles compétences sélectionnées
            if (!empty($data['skills']) && is_array($data['skills'])) {
                foreach ($data['skills'] as $skillName) {
                    $skillNameClean = trim($skillName);
                    if (empty($skillNameClean)) continue;

                    $skill = $skillsRepository->findOneBy(['name' => $skillNameClean]);
                    if (!$skill) {
                        $skill = new Skills();
                        $skill->setName($skillNameClean);
                        $em->persist($skill);
                    }
                    $student->addSkill($skill);
                }
            }

            // 3. Formations (Education) - Détection des Setters de liaison (faute de frappe potentielle)
            $eduMethod = method_exists($student, 'getEducation') ? 'getEducation' : (method_exists($student, 'getEducations') ? 'getEducations' : null);
            if ($eduMethod) {
                foreach ($student->$eduMethod() as $oldEdu) {
                    $em->remove($oldEdu);
                }
            }
            if (!empty($data['education']) && is_array($data['education'])) {
                foreach ($data['education'] as $eduItem) {
                    $edu = new Education();
                    $edu->setTitle($eduItem['title']);
                    $edu->setSchool($eduItem['school']);
                    $edu->setDates($eduItem['dates'] ?? '');
                    $edu->setLocation($eduItem['location'] ?? 'France');
                    
                    // Support de setStudentId() OU setStudendId() (avec la faute de frappe mappedBy de ton entité)
                    if (method_exists($edu, 'setStudentId')) { $edu->setStudentId($student); }
                    elseif (method_exists($edu, 'setStudendId')) { $edu->setStudendId($student); }
                    elseif (method_exists($edu, 'setStudent')) { $edu->setStudent($student); }
                    
                    $em->persist($edu);
                }
            }

            // 4. Expériences
            $expMethod = method_exists($student, 'getExperiences') ? 'getExperiences' : (method_exists($student, 'getExperience') ? 'getExperience' : null);
            if ($expMethod) {
                foreach ($student->$expMethod() as $oldExp) {
                    $em->remove($oldExp);
                }
            }
            if (!empty($data['experiences']) && is_array($data['experiences'])) {
                foreach ($data['experiences'] as $expItem) {
                    $exp = new Experience();
                    $exp->setTitle($expItem['title']);
                    $exp->setCompany($expItem['company']);
                    $exp->setDates($expItem['dates']);
                    $exp->setLocation($expItem['location'] ?? '');
                    $exp->setDescription($expItem['description'] ?? '');
                    
                    if (method_exists($exp, 'setStudentId')) { $exp->setStudentId($student); }
                    elseif (method_exists($exp, 'setStudendId')) { $exp->setStudendId($student); }
                    elseif (method_exists($exp, 'setStudent')) { $exp->setStudent($student); }

                    $em->persist($exp);
                }
            }

            // 5. Projets
            $projMethod = method_exists($student, 'getProjects') ? 'getProjects' : (method_exists($student, 'getProject') ? 'getProject' : null);
            if ($projMethod) {
                foreach ($student->$projMethod() as $oldProj) {
                    $em->remove($oldProj);
                }
            }
            if (!empty($data['projects']) && is_array($data['projects'])) {
                foreach ($data['projects'] as $projItem) {
                    $proj = new Project();
                    $proj->setTitle($projItem['title']);
                    $proj->setDescription($projItem['description'] ?? '');
                    
                    if (method_exists($proj, 'setStudentId')) { $proj->setStudentId($student); }
                    elseif (method_exists($proj, 'setStudendId')) { $proj->setStudendId($student); }
                    elseif (method_exists($proj, 'setStudent')) { $proj->setStudent($student); }

                    $em->persist($proj);
                }
            }

            $em->flush();
            $em->commit();

            return new JsonResponse(['success' => true, 'message' => 'Profil sauvegardé avec succès.']);

        } catch (\Throwable $e) {
            if ($em->getConnection()->isTransactionActive()) {
                $em->rollback();
            }

            // Renvoie TOUJOURS un JSON propre lisible par React pour connaître l'erreur exacte
            return new JsonResponse([
                'error' => 'Erreur PHP : ' . $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}