import React from "react";
import toast from "react-hot-toast";
import { useFormContext } from "../context/FormContext";

interface Step1Props {
    onNext: () => void;
    setProgress: (val: number) => void;
}

const Step1: React.FC<Step1Props> = ({ onNext, setProgress }) => {
    const { data, setData } = useFormContext();

    // Added aadhaar in the fields list
    const fields = ["name", "mobile", "email", "aadhaar", "pan"] as const;

    const updateProgress = (updatedData: typeof data) => {
        let filledCount = 0;
        fields.forEach(field => {
            if (updatedData[field] && validateField(field, updatedData[field])) {
                filledCount++;
            }
        });
        setProgress((filledCount / 9) * 100); // out of total 8 fields
    };

    const validateField = (field: string, value: string) => {
        switch (field) {
            case "mobile":
                return /^\d{10}$/.test(value);
            case "email":
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            case "aadhaar":
                return /^\d{12}$/.test(value); // Aadhaar must be exactly 12 digits
            case "pan":
                return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
            default:
                return value.trim().length > 0;
        }
    };

    const validateAll = () => {
        for (let field of fields) {
            if (!validateField(field, data[field])) {
                toast.error(`Invalid or missing ${field}`);
                return false;
            }
        }
        return true;
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Step 1 - Basic Information</h2>
            {fields.map(field => (
                <div className="form-group" key={field}>
                    <label>{field.toUpperCase()}</label>
                    <input
                        type="text"
                        value={data[field]}
                        onChange={(e) => {
                            let value = e.target.value;
                            if (field === "pan") {
                                value = value.toUpperCase(); // ✅ Force uppercase for PAN
                            }
                            const updated = { ...data, [field]: value };
                            setData({ [field]: value });
                            updateProgress(updated);
                        }}
                    />
                </div>
            ))}
            <div className="btn-container">
                <button
                    className="btn-primary"
                    onClick={() => {
                        if (validateAll()) onNext();
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Step1;