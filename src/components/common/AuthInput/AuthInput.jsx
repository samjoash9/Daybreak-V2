import './AuthInput.css';

export default function AuthInput({ type = "text", placeholder, icon }) {
    return (
        <div className="auth-input">
            <span className="auth-icon">
                {icon}
            </span>
            <input
                type={type}
                placeholder={placeholder}
                className="auth-field"
            />
        </div>
    );
}
