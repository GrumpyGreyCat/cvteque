import './partnerCard.css';


export default function PartnerCard({ partner }) {
    return (
        <div className="partner-card">
            <div className="partner-left-panel">
                <img 
                    src={partner.logo} 
                    alt={`Logo de ${partner.name}`} 
                    className="partner-logo-img" 
                />
            </div>

            <div className="partner-right-panel">
                <h3>{partner.name}</h3>
                <span className="partner-subtitle">{partner.subtitle}</span>
                
                <p className="partner-desc">{partner.desc}</p>
                
                <div className="partner-grey-tags">
                    <span className="grey-tag"></span>
                    <span className="grey-tag"></span>
                    <span className="grey-tag"></span>
                </div>

                <hr className="partner-divider" />

                <div className="partner-footer">
                    <span className="partner-email">{partner.email}</span>
                    <a href={partner.website} className="partner-website">Site web</a>
                </div>
            </div>
        </div>
    );
}