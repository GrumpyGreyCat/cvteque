import './headerBanner.css';

export default function HeaderBanner({ title, subtitle }) {
    return (
        <div className="header-banner">
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>
    );
}