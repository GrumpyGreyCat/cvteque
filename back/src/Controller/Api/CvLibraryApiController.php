<?php

namespace App\Controller\Api;

// Repositories au pluriel
use App\Repository\StudentsRepository;
use App\Repository\CvsRepository;
use App\Repository\JobsRepository;
use App\Repository\SchoolsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', name: 'api_')]
class CvLibraryApiController extends AbstractController
{
    #[Route('/students', name: 'students_list', methods: ['GET'])]
    public function getStudents(StudentsRepository $studentsRepository): JsonResponse
    {
        $students = $studentsRepository->findAll();
        $responseData = [];

        foreach ($students as $student) {
            $educationData = [];
            $eduMethod = method_exists($student, 'getEducation') ? 'getEducation' : (method_exists($student, 'getEducations') ? 'getEducations' : null);
            if ($eduMethod) {
                foreach ($student->$eduMethod() as $edu) {
                    $educationData[] = [
                        'title' => $edu->getTitle(),
                        'school' => $edu->getSchool(),
                        'dates' => $edu->getDates(),
                        'location' => $edu->getLocation(),
                    ];
                }
            }

            $experienceData = [];
            $expMethod = method_exists($student, 'getExperience') ? 'getExperience' : (method_exists($student, 'getExperiences') ? 'getExperiences' : null);
            if ($expMethod) {
                foreach ($student->$expMethod() as $exp) {
                    $experienceData[] = [
                        'title' => $exp->getTitle(),
                        'company' => $exp->getCompany(),
                        'dates' => $exp->getDates(),
                        'location' => $exp->getLocation(),
                        'desc' => method_exists($exp, 'getDescription') ? $exp->getDescription() : '', 
                    ];
                }
            }

            $projectData = [];
            $projMethod = method_exists($student, 'getProject') ? 'getProject' : (method_exists($student, 'getProjects') ? 'getProjects' : null);
            if ($projMethod) {
                foreach ($student->$projMethod() as $proj) {
                    // Si tes projets ont des tags ou des skills associés plus tard :
                    $projectTags = method_exists($proj, 'getTags') ? $proj->getTags() : (method_exists($proj, 'getSkills') ? $proj->getSkills() : []);
                    
                    $projectData[] = [
                        'title' => $proj->getTitle(),
                        'desc' => method_exists($proj, 'getDescription') ? $proj->getDescription() : '',
                        'tags' => $projectTags 
                    ];
                }
            }

            // DÉTERMINATION DES SKILLS DE L'ÉTUDIANT
            // On appelle le getSkills() personnalisé de ton entité (qui convertit la collection en tableau de strings)
            $skillsData = method_exists($student, 'getSkills') ? $student->getSkills() : [];

            $responseData[] = [
                'id' => $student->getId(),
                'name' => method_exists($student, 'getName') ? $student->getName() : '',
                'email' => method_exists($student, 'getEmail') ? $student->getEmail() : '',
                'phone' => method_exists($student, 'getPhone') ? $student->getPhone() : '',
                'linkedin' => method_exists($student, 'getLinkedin') ? $student->getLinkedin() : '',
                'github' => method_exists($student, 'getGithub') ? $student->getGithub() : '',
                'school' => method_exists($student, 'getSchool') ? $student->getSchool() : '',
                'location' => method_exists($student, 'getLocation') ? $student->getLocation() : '',
                'year' => method_exists($student, 'getYear') ? $student->getYear() : '',
                'desc' => method_exists($student, 'getDescription') ? $student->getDescription() : '',
                
                // CHANGEMENT ICI : La liste n'est plus un tableau vide [] codé en dur !
                'skills' => $skillsData, 
                
                'education' => $educationData,
                'experience' => $experienceData,
                'projects' => $projectData,
            ];
        }

        return new JsonResponse($responseData);
    }

    #[Route('/cvs', name: 'cvs_list', methods: ['GET'])]
    public function getCvs(CvsRepository $cvRepository): JsonResponse
    {
        $cvs = $cvRepository->findAll();
        $responseData = [];

        foreach ($cvs as $cv) {
            $studentId = null;
            if (method_exists($cv, 'getStudendId') && $cv->getStudendId()) {
                $studentId = $cv->getStudendId()->getId();
            } elseif (method_exists($cv, 'getStudentsId') && $cv->getStudentsId()) {
                $studentId = $cv->getStudentsId()->getId();
            } elseif (method_exists($cv, 'getStudent') && $cv->getStudent()) {
                $studentId = $cv->getStudent()->getId();
            }

            $responseData[] = [
                'id' => $cv->getId(),
                'student_id' => $studentId, 
                'name' => $cv->getName(),
                'url' => $cv->getUrl(),
            ];
        }

        return new JsonResponse($responseData);
    }

    #[Route('/jobs', name: 'jobs_list', methods: ['GET'])]
    public function getJobs(JobsRepository $jobRepository): JsonResponse
    {
        $jobs = $jobRepository->findAll();
        $responseData = [];

        foreach ($jobs as $job) {
            $companyName = 'Unknown';
            if (method_exists($job, 'getCompanyId') && $job->getCompanyId()) {
                $companyName = $job->getCompanyId()->getName();
            } elseif (method_exists($job, 'getCompaniesId') && $job->getCompaniesId()) {
                $companyName = $job->getCompaniesId()->getName();
            }

            $responseData[] = [
                'id' => $job->getId(),
                'title' => $job->getTitle(),
                'type' => $job->getType(),
                'company' => $companyName,
                'location' => $job->getLocation(),
                'duration' => $job->getDuration(),
                'desc' => method_exists($job, 'getDescription') ? $job->getDescription() : '',
                'date' => 'Publié récemment'
            ];
        }

        return new JsonResponse($responseData);
    }

    #[Route('/partners', name: 'partners_list', methods: ['GET'])]
    public function getPartners(SchoolsRepository $schoolRepository): JsonResponse
    {
        $schools = $schoolRepository->findAll();
        $responseData = [];

        foreach ($schools as $school) {
            $responseData[] = [
                'id' => $school->getId(),
                'name' => $school->getName(),
                'subtitle' => $school->getSubtitle(),
                'desc' => method_exists($school, 'getDescription') ? $school->getDescription() : '',
                'email' => $school->getEmail(),
                'website' => $school->getWebsite(),
                'logo' => method_exists($school, 'getLogoUrl') ? $school->getLogoUrl() : null,
            ];
        }

        return new JsonResponse($responseData);
    }
}