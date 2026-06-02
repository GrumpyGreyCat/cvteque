import './filterSidebar.css';

export default function FilterSidebar({ location, setLocation, selectedSkills, toggleSkill }) {
    const availableSkills = ["React", "Node.js", "Figma", "PHP", "Java", "Vue", "Git"];

    return (
        <aside className="filter-sidebar">
            <h3>Filtres</h3>
            
            <div className="filter-group">
                <label>Localisation</label>
                <input 
                    type="text" 
                    placeholder="Ex: Paris" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)} 
                />
            </div>

            <div className="filter-group">
                <label>Compétences</label>
                <div className="mock-skills">
                    {availableSkills.map(skill => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                            <span 
                                key={skill} 
                                className="skill-pill"
                                onClick={() => toggleSkill(skill)} 
                                style={{ 
                                    cursor: 'pointer', 
                                    backgroundColor: isSelected ? '#f0a500' : '#2b4c7e' 
                                }}
                            >
                                {skill}
                            </span>
                        )
                    })}
                </div>
            </div>
        </aside>
    );
}