import { useMemo, useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDatabase } from '../context/DataContext' // Récupération du contexte global
import './Profile.css'

const TABS = [
  { id: 'infos', label: 'Infos' },
  { id: 'formations', label: 'Formations' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'projets', label: 'Projets' },
  { id: 'competences', label: 'Compétences' },
]

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function SectionHeader({ title, onAdd, addLabel = '+ ajouter' }) {
  return (
    <div className="profile-sectionHeader">
      <div className="profile-sectionHeaderLeft">
        <span className="profile-sectionDot" aria-hidden="true" />
        <h2 className="profile-sectionTitle">{title}</h2>
      </div>
      {onAdd ? (
        <button type="button" className="profile-addBtn" onClick={onAdd}>
          {addLabel}
        </button>
      ) : null}
    </div>
  )
}

function ItemCard({ title, subtitle, meta, onEdit, onDelete }) {
  return (
    <article className="profile-itemCard">
      <div className="profile-itemCardBody">
        <h3 className="profile-itemTitle">{title}</h3>
        {subtitle ? <p className="profile-itemSub">{subtitle}</p> : null}
        {meta ? <p className="profile-itemMeta">{meta}</p> : null}
      </div>

      <div className="profile-itemActions" aria-label="Actions">
        <button type="button" className="profile-iconBtn profile-iconBtnEdit" onClick={onEdit}>
          Éditer
        </button>
        <button type="button" className="profile-iconBtn profile-iconBtnDelete" onClick={onDelete}>
          Supprimer
        </button>
      </div>
    </article>
  )
}

function CvUpload({ file, onChange }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')

  function chooseFile(nextFile) {
    if (!nextFile) return

    const extension = nextFile.name.split('.').pop()?.toLowerCase()
    if (!['pdf', 'doc', 'docx'].includes(extension)) {
      setError('Choisissez un PDF, un DOC ou un DOCX.')
      return
    }

    if (nextFile.size > 5 * 1024 * 1024) {
      setError('Le fichier dépasse 5 Mo.')
      return
    }

    setError('')
    onChange(nextFile)
  }

  function removeFile() {
    setError('')
    onChange(null)
  }

  let sizeLabel = ''
  if (file) {
    sizeLabel =
      file.size >= 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1).replace('.', ',')} Mo`
        : `${Math.round(file.size / 1024)} Ko`
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        className="profile-uploadInput"
        accept=".pdf,.doc,.docx"
        onChange={(e) => {
          chooseFile(e.target.files[0])
          e.target.value = ''
        }}
      />

      <div
        className={`profile-uploadArea ${dragOver ? 'is-dragging' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          chooseFile(e.dataTransfer.files[0])
        }}
      >
        <div className="profile-uploadHint">
          <p className="profile-uploadTitle">Glissez votre CV ici</p>
          <p className="profile-uploadSub">PDF, DOC, DOCX (max 5MB)</p>
          <button className="profile-uploadBtn" type="button" onClick={() => inputRef.current?.click()}>
            Parcourir
          </button>
        </div>
      </div>

      {error && <p className="profile-uploadError">{error}</p>}

      {file && (
        <div className="profile-uploadChip">
          <span className="profile-chipName">{file.name}</span>
          <span className="profile-chipSep">·</span>
          <span className="profile-chipMeta">{sizeLabel}</span>
          <button type="button" className="profile-chipClose" aria-label="Retirer le CV" onClick={removeFile}>
            ×
          </button>
        </div>
      )}
    </>
  )
}

function InfosTab({ personal, onChangePersonal, cv, onCvChange }) {
  return (
    <div className="profile-stack">
      <section className="profile-panel">
        <h2 className="profile-panelTitle">Informations personnelles</h2>

        <form className="profile-formGrid">
          <label className="profile-field">
            <span className="profile-label">Nom complet</span>
            <input
              className="profile-input"
              type="text"
              value={personal.fullName || ''}
              onChange={(e) => onChangePersonal({ ...personal, fullName: e.target.value })}
            />
          </label>
          <label className="profile-field">
            <span className="profile-label">Email</span>
            <input
              className="profile-input"
              type="email"
              value={personal.email || ''}
              onChange={(e) => onChangePersonal({ ...personal, email: e.target.value })}
              disabled
            />
          </label>
          <label className="profile-field">
            <span className="profile-label">Téléphone</span>
            <input
              className="profile-input"
              type="tel"
              value={personal.phone || ''}
              onChange={(e) => onChangePersonal({ ...personal, phone: e.target.value })}
            />
          </label>
          <label className="profile-field">
            <span className="profile-label">Localisation</span>
            <input
              className="profile-input"
              type="text"
              value={personal.location || ''}
              onChange={(e) => onChangePersonal({ ...personal, location: e.target.value })}
            />
          </label>
          <label className="profile-field">
            <span className="profile-label">Ecole</span>
            <input
              className="profile-input"
              type="text"
              value={personal.school || ''}
              onChange={(e) => onChangePersonal({ ...personal, school: e.target.value })}
            />
          </label>
          <label className="profile-field">
            <span className="profile-label">Année d'études</span>
            <input
              className="profile-input"
              type="text"
              value={personal.studyYear || ''}
              onChange={(e) => onChangePersonal({ ...personal, studyYear: e.target.value })}
            />
          </label>
          <label className="profile-field">
            <span className="profile-label">LinkedIn</span>
            <input
              className="profile-input"
              type="url"
              placeholder="https://linkedin.com/in/..."
              value={personal.linkedin || ''}
              onChange={(e) => onChangePersonal({ ...personal, linkedin: e.target.value })}
            />
          </label>
          <label className="profile-field">
            <span className="profile-label">GitHub</span>
            <input
              className="profile-input"
              type="url"
              placeholder="https://github.com/..."
              value={personal.github || ''}
              onChange={(e) => onChangePersonal({ ...personal, github: e.target.value })}
            />
          </label>
          <label className="profile-field profile-fieldFull">
            <span className="profile-label">Bio / Présentation</span>
            <textarea
              className="profile-input profile-textarea"
              rows={5}
              value={personal.bio || ''}
              onChange={(e) => onChangePersonal({ ...personal, bio: e.target.value })}
            />
          </label>
        </form>
      </section>

      <section className="profile-panel">
        <h2 className="profile-panelTitle">CV</h2>
        <CvUpload file={cv} onChange={onCvChange} />
      </section>
    </div>
  )
}

function EditorHeader({ title, onReturn }) {
  return (
    <div className="profile-editorHeader">
      <button type="button" className="profile-backBtn" onClick={onReturn}>
        ← Retour
      </button>
      <div className="profile-editorTitle">{title}</div>
      <div />
    </div>
  )
}

function FormationsTab({ formations, onCreate, onUpdate, onDelete }) {
  const empty = useMemo(
    () => ({
      id: null,
      title: '',
      school: '',
      startYear: '',
      endYear: '',
    }),
    [],
  )

  const [mode, setMode] = useState('list')
  const [form, setForm] = useState(empty)

  const startCreate = () => {
    setForm({ ...empty, id: null })
    setMode('edit')
  }

  const startEdit = (item) => {
    setForm({ ...item })
    setMode('edit')
  }

  const submit = (e) => {
    e.preventDefault()
    const trimmed = {
      ...form,
      title: form.title.trim(),
      school: form.school.trim(),
      startYear: form.startYear.trim(),
      endYear: form.endYear.trim(),
    }

    if (!trimmed.title || !trimmed.school) return

    if (trimmed.id && typeof trimmed.id === 'number') onUpdate(trimmed)
    else onCreate({ ...trimmed, id: makeId() })
    setMode('list')
  }

  if (mode === 'edit') {
    return (
      <section className="profile-panel">
        <EditorHeader
          title={form.id ? 'Éditer un parcours académique' : 'Créer un parcours académique'}
          onReturn={() => setMode('list')}
        />

        <form className="profile-formGrid profile-formGridTight" onSubmit={submit}>
          <label className="profile-field profile-fieldFull">
            <span className="profile-label">Titre de la formation</span>
            <input className="profile-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="profile-field profile-fieldFull">
            <span className="profile-label">École</span>
            <input
              className="profile-input"
              value={form.school}
              onChange={(e) => setForm({ ...form, school: e.target.value })}
            />
          </label>
          <label className="profile-field">
            <span className="profile-label">Année de début / fin (ou dates)</span>
            <input
              className="profile-input"
              value={form.startYear}
              placeholder="ex: 2024 - 2026"
              onChange={(e) => setForm({ ...form, startYear: e.target.value })}
            />
          </label>

          <div className="profile-formActions profile-fieldFull">
            <button type="button" className="profile-iconBtn profile-iconBtnNeutral" onClick={() => setMode('list')}>
              Annuler
            </button>
            <button type="submit" className="profile-iconBtn profile-iconBtnEdit">
              Sauvegarder
            </button>
          </div>
        </form>
      </section>
    )
  }

  return (
    <section className="profile-panel">
      <SectionHeader title="Parcours académiques" onAdd={startCreate} />
      <div className="profile-panelBody profile-list">
        {formations.map((f) => (
          <ItemCard
            key={f.id}
            title={f.title}
            subtitle={f.school}
            meta={f.dates || `${f.startYear} - ${f.endYear}`}
            onEdit={() => startEdit(f)}
            onDelete={() => onDelete(f.id)}
          />
        ))}
      </div>
    </section>
  )
}

function ExperiencesTab({ experiences, onCreate, onUpdate, onDelete }) {
  const empty = useMemo(
    () => ({
      id: null,
      title: '',
      company: '',
      dates: '',
      location: '',
      description: '',
    }),
    [],
  )

  const [mode, setMode] = useState('list')
  const [form, setForm] = useState(empty)

  const startCreate = () => {
    setForm({ ...empty, id: null })
    setMode('edit')
  }

  const startEdit = (item) => {
    setForm({ ...item })
    setMode('edit')
  }

  const submit = (e) => {
    e.preventDefault()
    const trimmed = {
      ...form,
      title: form.title.trim(),
      company: form.company.trim(),
      dates: form.dates.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
    }
    if (!trimmed.title || !trimmed.company) return
    if (trimmed.id && typeof trimmed.id === 'number') onUpdate(trimmed)
    else onCreate({ ...trimmed, id: makeId() })
    setMode('list')
  }

  if (mode === 'edit') {
    return (
      <section className="profile-panel">
        <EditorHeader title={form.id ? 'Éditer une expérience' : 'Créer une expérience'} onReturn={() => setMode('list')} />

        <form className="profile-formGrid profile-formGridTight" onSubmit={submit}>
          <label className="profile-field profile-fieldFull">
            <span className="profile-label">Poste occupé</span>
            <input className="profile-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="profile-field profile-fieldFull">
            <span className="profile-label">Entreprise</span>
            <input
              className="profile-input"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </label>
          <label className="profile-field">
            <span className="profile-label">Dates de la mission</span>
            <input
              className="profile-input"
              value={form.dates}
              placeholder="ex: Sept 2024 - Présent"
              onChange={(e) => setForm({ ...form, dates: e.target.value })}
            />
          </label>
          <label className="profile-field">
            <span className="profile-label">Localisation</span>
            <input
              className="profile-input"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </label>
          <label className="profile-field profile-fieldFull">
            <span className="profile-label">Description</span>
            <textarea
              className="profile-input profile-textarea"
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </label>

          <div className="profile-formActions profile-fieldFull">
            <button type="button" className="profile-iconBtn profile-iconBtnNeutral" onClick={() => setMode('list')}>
              Annuler
            </button>
            <button type="submit" className="profile-iconBtn profile-iconBtnEdit">
              Sauvegarder
            </button>
          </div>
        </form>
      </section>
    )
  }

  return (
    <section className="profile-panel">
      <SectionHeader title="Expériences professionnelles" onAdd={startCreate} />
      <div className="profile-panelBody profile-list">
        {experiences.map((x) => (
          <ItemCard
            key={x.id}
            title={x.title}
            subtitle={x.company}
            meta={`${x.dates} · ${x.location}${x.description ? ` · ${x.description}` : ''}`}
            onEdit={() => startEdit(x)}
            onDelete={() => onDelete(x.id)}
          />
        ))}
      </div>
    </section>
  )
}

const PROJECT_TAGS = ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'Symfony', 'PostgreSQL', 'PHP']

function ProjetsTab({ projects, onCreate, onUpdate, onDelete }) {
  const empty = useMemo(
    () => ({
      id: null,
      title: '',
      description: '',
      tags: [],
    }),
    [],
  )

  const [mode, setMode] = useState('list')
  const [form, setForm] = useState(empty)

  const startCreate = () => {
    setForm({ ...empty, id: null, tags: [] })
    setMode('edit')
  }

  const startEdit = (item) => {
    setForm({ ...item, tags: item.tags || [] })
    setMode('edit')
  }

  const toggleTag = (tag) => {
    setForm((prev) => {
      const has = prev.tags.includes(tag)
      return { ...prev, tags: has ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag] }
    })
  }

  const submit = (e) => {
    e.preventDefault()
    const trimmed = { ...form, title: form.title.trim(), description: form.description.trim() }
    if (!trimmed.title) return
    if (trimmed.id && typeof trimmed.id === 'number') onUpdate(trimmed)
    else onCreate({ ...trimmed, id: makeId() })
    setMode('list')
  }

  if (mode === 'edit') {
    return (
      <section className="profile-panel">
        <EditorHeader title={form.id ? 'Éditer un projet' : 'Créer un projet'} onReturn={() => setMode('list')} />

        <form className="profile-formGrid profile-formGridTight" onSubmit={submit}>
          <label className="profile-field profile-fieldFull">
            <span className="profile-label">Titre du projet</span>
            <input className="profile-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label className="profile-field profile-fieldFull">
            <span className="profile-label">Description du projet</span>
            <textarea
              className="profile-input profile-textarea"
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </label>

          <div className="profile-field profile-fieldFull">
            <div className="profile-label">Tags</div>
            <div className="profile-tagsRow profile-tagsRowWrap">
              {PROJECT_TAGS.map((t) => {
                const active = form.tags.includes(t)
                return (
                  <button
                    key={t}
                    type="button"
                    className={`profile-tagBtn ${active ? 'is-selected' : ''}`}
                    onClick={() => toggleTag(t)}
                  >
                    {t}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="profile-formActions profile-fieldFull">
            <button type="button" className="profile-iconBtn profile-iconBtnNeutral" onClick={() => setMode('list')}>
              Annuler
            </button>
            <button type="submit" className="profile-iconBtn profile-iconBtnEdit">
              Sauvegarder
            </button>
          </div>
        </form>
      </section>
    )
  }

  return (
    <section className="profile-panel">
      <SectionHeader title="Mes projets" onAdd={startCreate} />
      <div className="profile-panelBody profile-list">
        {projects.map((p) => (
          <article key={p.id} className="profile-projectCard">
            <div className="profile-projectTop">
              <div>
                <h3 className="profile-itemTitle">{p.title}</h3>
                {p.description ? <p className="profile-itemSub">{p.description}</p> : null}
              </div>
              <div className="profile-itemActions" aria-label="Actions">
                <button type="button" className="profile-iconBtn profile-iconBtnEdit" onClick={() => startEdit(p)}>
                  Éditer
                </button>
                <button type="button" className="profile-iconBtn profile-iconBtnDelete" onClick={() => onDelete(p.id)}>
                  Supprimer
                </button>
              </div>
            </div>
            <div className="profile-projectTags" aria-label="Tags">
              {(p.tags?.length ? p.tags : ['React', 'Node.js']).map((t) => (
                <span key={t} className="profile-projectTag">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function CompetencesTab({ selected, available, onToggleTag }) {
  return (
    <section className="profile-panel">
      <SectionHeader title="Compétences & technologies" />

      <div className="profile-tagsBlock">
        <div className="profile-tagsTitle">Tags sélectionnés ({selected.length})</div>
        <div className="profile-tagsRow profile-tagsRowWrap">
          {selected.map((t) => (
            <button key={t} type="button" className="profile-tagBtn is-selected" onClick={() => onToggleTag(t, 'selected')}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="profile-tagsBlock">
        <div className="profile-tagsTitle">Tags disponibles</div>
        <div className="profile-tagsRow profile-tagsRowWrap">
          {available.map((t) => (
            <button key={t} type="button" className="profile-tagBtn" onClick={() => onToggleTag(t, 'available')}>
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('infos')
  const navigate = useNavigate()
  
  // Consommation du contexte global de l'application
  const { students } = useDatabase()

  // 1. États d'affichage locaux synchronisés avec l'étudiant connecté
  const [personal, setPersonal] = useState({
    fullName: '', email: '', phone: '', location: '',
    school: '', studyYear: '', linkedin: '', github: '', bio: ''
  })
  const [formations, setFormations] = useState([])
  const [experiences, setExperiences] = useState([])
  const [projects, setProjects] = useState([])
  const [cv, setCv] = useState(null)

  const initialAvailable = useMemo(
    () => ['TypeScript', 'Java', 'Python', 'Docker', 'AWS', 'Git', 'Figma', 'MongoDB', 'CI/CD', 'Redux', 'Next.js', 'React', 'Node.js', 'SQL', 'Symfony', 'PHP'],
    []
  )
  const [competencesSelected, setCompetencesSelected] = useState([])
  const [competencesAvailable, setCompetencesAvailable] = useState(initialAvailable)

  // 2. Chargement dynamique de la base de données locale selon la session active
  useEffect(() => {
    const sessionUser = localStorage.getItem('user')
    if (!sessionUser) {
      navigate('/login')
      return
    }

    const currentLoggedIn = JSON.parse(sessionUser)
    
    // Recherche du profil complet actualisé via l'ID de la base de données
    const matchingStudent = students.find(s => s.id === currentLoggedIn.id)

    if (matchingStudent) {
      setPersonal({
        fullName: matchingStudent.name,
        email: matchingStudent.email,
        phone: matchingStudent.phone,
        location: matchingStudent.location,
        school: matchingStudent.school,
        studyYear: matchingStudent.year,
        linkedin: matchingStudent.linkedin,
        github: matchingStudent.github,
        bio: matchingStudent.description,
      })

      // Récupération des relations associées directement de l'entité
      if (matchingStudent.education) setFormations(matchingStudent.education)
      if (matchingStudent.experiences) setExperiences(matchingStudent.experiences)
      if (matchingStudent.projects) setProjects(matchingStudent.projects)
      if (matchingStudent.skills) {
        setCompetencesSelected(matchingStudent.skills)
        setCompetencesAvailable(initialAvailable.filter(t => !matchingStudent.skills.includes(t)))
      }
    }
  }, [students, navigate, initialAvailable])

  const toggleCompetence = (tag, from) => {
    if (from === 'selected') {
      setCompetencesSelected((prev) => prev.filter((t) => t !== tag))
      setCompetencesAvailable((prev) => [...prev, tag].sort((a, b) => a.localeCompare(b)))
    } else {
      setCompetencesAvailable((prev) => prev.filter((t) => t !== tag))
      setCompetencesSelected((prev) => [...prev, tag].sort((a, b) => a.localeCompare(b)))
    }
  }

  return (
    <main className="profile-page">
      <div className="profile-shell">
        <header className="profile-hero" aria-label="Mon Profil">
          <div className="profile-heroInner">
            <h1 className="profile-heroTitle">
              Profil de <span>{personal.fullName || 'Étudiant'}</span>
            </h1>
          </div>
        </header>

        <nav className="profile-tabs" aria-label="Onglets profil">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`profile-tab ${activeTab === t.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="profile-content" role="region" aria-live="polite">
          {activeTab === 'infos' ? (
            <InfosTab personal={personal} onChangePersonal={setPersonal} cv={cv} onCvChange={setCv} />
          ) : null}
          {activeTab === 'formations' ? (
            <FormationsTab
              formations={formations}
              onCreate={(x) => setFormations((prev) => [x, ...prev])}
              onUpdate={(x) => setFormations((prev) => prev.map((p) => (p.id === x.id ? x : p)))}
              onDelete={(id) => setFormations((prev) => prev.filter((p) => p.id !== id))}
            />
          ) : null}
          {activeTab === 'experiences' ? (
            <ExperiencesTab
              experiences={experiences}
              onCreate={(x) => setExperiences((prev) => [x, ...prev])}
              onUpdate={(x) => setExperiences((prev) => prev.map((p) => (p.id === x.id ? x : p)))}
              onDelete={(id) => setExperiences((prev) => prev.filter((p) => p.id !== id))}
            />
          ) : null}
          {activeTab === 'projets' ? (
            <ProjetsTab
              projects={projects}
              onCreate={(x) => setProjects((prev) => [x, ...prev])}
              onUpdate={(x) => setProjects((prev) => prev.map((p) => (p.id === x.id ? x : p)))}
              onDelete={(id) => setProjects((prev) => prev.filter((p) => p.id !== id))}
            />
          ) : null}
          {activeTab === 'competences' ? (
            <CompetencesTab
              selected={competencesSelected}
              available={competencesAvailable}
              onToggleTag={toggleCompetence}
            />
          ) : null}
        </div>

        <footer className="profile-footer">
          <button className="profile-footerBtn profile-footerBtnGhost" type="button" onClick={() => navigate('/')}>
            Retour à l'accueil
          </button>
          <button className="profile-footerBtn profile-footerBtnPrimary" type="button">
            Sauvegarder les modifications
          </button>
        </footer>
      </div>
    </main>
  )
}