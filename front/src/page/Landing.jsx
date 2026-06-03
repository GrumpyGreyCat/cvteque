import { useNavigate } from 'react-router-dom';
import './Landing.css';

const steps = [
	{
		number: '1',
		title: 'Inscription des écoles',
		description: 'Les écoles partenaires s\'inscrivent et créent des comptes pour leurs étudiants.',
	},
	{
		number: '2',
		title: 'Profils étudiants',
		description: 'Les étudiants personnalisent leurs profils avec leur CV et leurs compétences.',
	},
	{
		number: '3',
		title: 'Recherche & Recrutement',
		description: 'Les entreprises recherchent des talents par mots-clés et tags, puis postulent leurs offres.',
	},
]

export default function Landing() {
	const navigate = useNavigate();

	return (
		<main className="landing-page">
			<section className="hero-section" aria-labelledby="hero-title">
				<div className="hero-copy">
					<h1 id="hero-title" className="hero-title">
						Connectez les <span>talents</span>
						<br />
						de demain
					</h1>
					<p className="hero-description">
						La CVthèque Hexagone réunit les écoles partenaires, leurs étudiants en
						informatique et les entreprises à la recherche de talents qualifiés.
					</p>

					<div className="hero-actions">
						<button 
                            className="hero-button hero-button-primary" 
                            type="button"
                            onClick={() => navigate('/etudiants')}
                        >
							recherche de profil
						</button>
                        
                        {/* et ici */}
						<button 
                            className="hero-button hero-button-secondary" 
                            type="button"
                            onClick={() => navigate('/partenaires')}
                        >
							Ecoles partenaires
						</button>
					</div>
				</div>
			</section>

			<section className="how-it-works" aria-labelledby="how-title">
				<div className="section-inner">
					<h2 id="how-title" className="section-title">
						Comment ça <span>marche</span>
					</h2>

					<div className="steps-row">
						{steps.map((step, index) => (
							<div className="step-group" key={step.number}>
								<article className="step-card">
									<div className="step-badge">{step.number}</div>
									<h3>{step.title}</h3>
									<p>{step.description}</p>
								</article>

								{index < steps.length - 1 ? (
									<div className="step-arrow" aria-hidden="true">
										→
									</div>
								) : null}
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="cta-section" aria-label="Commencer maintenant">
				<button 
                    className="cta-button" 
                    type="button"
                    onClick={() => navigate('/login')}
                >
					Commencer maintenant <span aria-hidden="true">→</span>
				</button>
			</section>
		</main>
	)
}