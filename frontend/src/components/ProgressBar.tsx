import React from "react";
import "../styles/progressbar.css";

interface ProgressBarProps {
    step: number;
    progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, progress }) => {
    return (
        <div className="progressbar-wrapper">
            <div className="progressbar-fill" style={{ width: `${progress}%` }} />
            <div className="progressbar-steps">
                <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
                <div className={`progress-step ${step >= 2 ? "active" : ""}`}>2</div>
            </div>
        </div>
    );
};

export default ProgressBar;