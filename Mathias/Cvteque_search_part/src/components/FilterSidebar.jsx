import './filterSidebar.css';

export default function FilterSidebar() {
    return (
        <aside className="filter-sidebar">
            <h3>Filtres</h3>
            <div className="filter-group">
                <label>Localisation</label>
                <input type="text" placeholder="Ex: Paris" />
            </div>
            <div className="filter-group">
                <label>Compétences</label>
                <div className="mock-skills">
                    <span className="skill-pill">React</span>
                    <span className="skill-pill">Node.js</span>
                    <span className="skill-pill">Figma</span>
                    <span className="skill-pill">PHP</span>
                </div>
            </div>
        </aside>
    );
}