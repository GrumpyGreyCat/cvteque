<?php

namespace App\Entity;

use App\Repository\StudentsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StudentsRepository::class)]
class Students
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $location = null;

    #[ORM\Column(length: 255)]
    private ?string $year = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    private ?string $phone = null;

    #[ORM\Column(length: 255)]
    private ?string $linkedin = null;

    #[ORM\Column(length: 255)]
    private ?string $github = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTime $created_at = null;

    #[ORM\Column(length: 255)]
    private ?string $school = null;

    /**
     * @var Collection<int, Cvs>
     */
    #[ORM\OneToMany(targetEntity: Cvs::class, mappedBy: 'studend_id')]
    private Collection $cvs_id;

    /**
     * @var Collection<int, Education>
     */
    #[ORM\OneToMany(targetEntity: Education::class, mappedBy: 'student_id')]
    private Collection $education;

    /**
     * @var Collection<int, Experience>
     */
    #[ORM\OneToMany(targetEntity: Experience::class, mappedBy: 'student_id')]
    private Collection $experiences;

    /**
     * @var Collection<int, Project>
     */
    #[ORM\OneToMany(targetEntity: Project::class, mappedBy: 'student_id')]
    private Collection $projects;

    public function __construct()
    {
        $this->cvs_id = new ArrayCollection();
        $this->education = new ArrayCollection();
        $this->experiences = new ArrayCollection();
        $this->projects = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;

        return $this;
    }

    public function getYear(): ?string
    {
        return $this->year;
    }

    public function setYear(string $year): static
    {
        $this->year = $year;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getLinkedin(): ?string
    {
        return $this->linkedin;
    }

    public function setLinkedin(string $linkedin): static
    {
        $this->linkedin = $linkedin;

        return $this;
    }

    public function getGithub(): ?string
    {
        return $this->github;
    }

    public function setGithub(string $github): static
    {
        $this->github = $github;

        return $this;
    }

    public function getCreatedAt(): ?\DateTime
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTime $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getSchool(): ?string
    {
        return $this->school;
    }

    public function setSchool(string $school): static
    {
        $this->school = $school;

        return $this;
    }

    /**
     * @return Collection<int, Cvs>
     */
    public function getCvsId(): Collection
    {
        return $this->cvs_id;
    }

    public function addCvsId(Cvs $cvsId): static
    {
        if (!$this->cvs_id->contains($cvsId)) {
            $this->cvs_id->add($cvsId);
            $cvsId->setStudendId($this);
        }

        return $this;
    }

    public function removeCvsId(Cvs $cvsId): static
    {
        if ($this->cvs_id->removeElement($cvsId)) {
            // set the owning side to null (unless already changed)
            if ($cvsId->getStudendId() === $this) {
                $cvsId->setStudendId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Education>
     */
    public function getEducation(): Collection
    {
        return $this->education;
    }

    public function addEducation(Education $education): static
    {
        if (!$this->education->contains($education)) {
            $this->education->add($education);
            $education->setStudentId($this);
        }

        return $this;
    }

    public function removeEducation(Education $education): static
    {
        if ($this->education->removeElement($education)) {
            // set the owning side to null (unless already changed)
            if ($education->getStudentId() === $this) {
                $education->setStudentId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Experience>
     */
    public function getExperiences(): Collection
    {
        return $this->experiences;
    }

    public function addExperience(Experience $experience): static
    {
        if (!$this->experiences->contains($experience)) {
            $this->experiences->add($experience);
            $experience->setStudentId($this);
        }

        return $this;
    }

    public function removeExperience(Experience $experience): static
    {
        if ($this->experiences->removeElement($experience)) {
            // set the owning side to null (unless already changed)
            if ($experience->getStudentId() === $this) {
                $experience->setStudentId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Project>
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): static
    {
        if (!$this->projects->contains($project)) {
            $this->projects->add($project);
            $project->setStudentId($this);
        }

        return $this;
    }

    public function removeProject(Project $project): static
    {
        if ($this->projects->removeElement($project)) {
            // set the owning side to null (unless already changed)
            if ($project->getStudentId() === $this) {
                $project->setStudentId(null);
            }
        }

        return $this;
    }
}
