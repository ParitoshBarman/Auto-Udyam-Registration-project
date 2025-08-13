import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useFormContext } from "../context/FormContext";
import axios from "axios";

interface Step2Props {
    onBack: () => void;
    onSubmit: () => void;
    setProgress: (val: number) => void;
    setIsModalOpen: (val: boolean) => void;
}

interface LocationSuggestion {
    city: string;
    state: string;
    address: string;
}

const Step2: React.FC<Step2Props> = ({ onBack, onSubmit, setProgress, setIsModalOpen }) => {
    const { data, setData } = useFormContext();
    const fields = ["address", "pincode", "city", "state"] as const;

    const [isFormValid, setIsFormValid] = useState(false);
    const [pincodeError, setPincodeError] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
    const suggestionRef = useRef<HTMLUListElement | null>(null);

    const updateProgress = (updatedData: typeof data) => {
        let filledCount = 0;
        Object.keys(updatedData).forEach((key) => {
            if (updatedData[key as keyof typeof data]) filledCount++;
        });
        setProgress((filledCount / 9) * 100);
    };

    const validateAll = () => {
        if (!data.address) return false;
        if (!/^\d{6}$/.test(data.pincode)) return false;
        if (!data.city) return false;
        if (!data.state) return false;
        return true;
    };

    // Fetch pincode location
    const fetchPincodeData = async (pincode: string) => {
        if (!/^\d{6}$/.test(pincode)) {
            setPincodeError(true);
            setSuggestions([]);
            return;
        }
        setPincodeError(false);

        try {
            toast.loading("Fetching location...", { id: "pincode" });
            const res = await axios(`https://api.postalpincode.in/pincode/${pincode}`);
            // const result = await res.json();
            const result = res.data;
            toast.dismiss("pincode");

            if (result[0].Status === "Success") {
                const places = result[0].PostOffice.map((po: any) => ({
                    city: po.District,
                    state: po.State,
                    address: `${po.Name}, ${po.Block}, ${po.District}, ${po.State}, ${po.Country}, ${po.Pincode}`
                }));
                setSuggestions(places);
                toast.success("Select your location from suggestions");
            } else {
                setSuggestions([]);
                toast.error("No location found for this pincode");
            }
        } catch {
            setSuggestions([]);
            toast.error("Error fetching location");
        }
    };

    const handlePincodeChange = (value: string) => {
        const updated = { ...data, pincode: value };
        setData({ pincode: value });
        updateProgress(updated);

        if (/^\d{6}$/.test(value)) {
            fetchPincodeData(value);
        }
    };

    const handlePincodeBlur = () => {
        if (/^\d{6}$/.test(data.pincode)) {
            fetchPincodeData(data.pincode);
        } else {
            setPincodeError(true);
            toast.error("Please enter a valid 6-digit pincode");
        }
    };

    const handleSelectSuggestion = (s: LocationSuggestion) => {
        const updated = {
        ...data,
        city: s.city,
        state: s.state,
        address: s.address
    };

        setData({
            city: s.city,
            state: s.state,
            address: s.address
        });

        setSuggestions([]); // close dropdown after selection
        updateProgress(updated);
        toast.success(`Details auto-filled for: ${s.address}`);
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                suggestionRef.current &&
                !suggestionRef.current.contains(e.target as Node)
            ) {
                setSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setIsFormValid(validateAll());
    }, [data]);

    return (
        <div className="form-container">
            <h2 className="form-title">Step 2 - Address Details</h2>
            <p className="info-msg">
                Fill only pincode — city, state & address will be auto-filled or selectable.
            </p>

            {fields.map((field) => (
                <div className="form-group" key={field} style={{ position: "relative" }}>
                    <label>{field.toUpperCase()}</label>
                    {/* <input
                        type="text"
                        value={data[field] || ""}
                        onChange={(e) =>
                            field === "pincode"
                                ? handlePincodeChange(e.target.value)
                                : setData({ [field]: e.target.value })
                        }
                        onBlur={field === "pincode" ? handlePincodeBlur : undefined}
                        maxLength={field === "pincode" ? 6 : undefined}
                        className={field === "pincode" && pincodeError ? "error-input" : ""}
                    /> */}
                    
                    <input
                        type="text"
                        value={data[field] || ""}
                        onChange={(e) =>
                            field === "pincode"
                                ? handlePincodeChange(e.target.value)
                                : (() => {
                                    const updated = { ...data, [field]: e.target.value };
                                    setData({ [field]: e.target.value });
                                    updateProgress(updated); // ✅ progress updates for all fields
                                })()
                        }
                        onBlur={field === "pincode" ? handlePincodeBlur : undefined}
                        maxLength={field === "pincode" ? 6 : undefined}
                        className={field === "pincode" && pincodeError ? "error-input" : ""}
                    />


                    {/* Suggestions Dropdown */}
                    {field === "pincode" && suggestions.length > 0 && (
                        <ul className="suggestion-list" ref={suggestionRef}>
                            {suggestions.map((s, i) => (
                                <li key={i} onClick={() => handleSelectSuggestion(s)}>
                                    {s.address}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}

            <div className="btn-container">
                <button className="btn-secondary" onClick={onBack}>
                    Back
                </button>
                <button
                    className="btn-primary"
                    disabled={!isFormValid}
                    style={{
                        opacity: isFormValid ? 1 : 0.6,
                        cursor: isFormValid ? "pointer" : "not-allowed",
                    }}
                    onClick={async () => {
                        if (validateAll()) {
                            try {
                                toast.loading("Submitting form...", { id: "formSubmit" });

                                // Send data to backend
                                let payload = {
                                    ...data,
                                    pinCode: data.pincode, // ✅ rename key for backend
                                };
                                const res = await axios.post(
                                    "https://auto-udyam-registration-backend-railway-production.up.railway.app/api/registration/submit", // replace with your API URL
                                    payload
                                );

                                toast.dismiss("formSubmit");
                                toast.success(res.data.message || "Form Submitted Successfully!");

                                onSubmit();
                                setIsModalOpen(true);
                                setData({
                                    name: "",
                                    mobile: "",
                                    email: "",
                                    aadhaar: "",
                                    pan: "",
                                    address: "",
                                    pincode: "",
                                    city: "",
                                    state: ""
                                });
                                onBack();
                            } catch (err) {
                                toast.dismiss("formSubmit");
                                toast.error("Error submitting form");
                                console.error(err);
                            }
                        } else {
                            toast.error("Please fill all details correctly");
                        }
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Step2;