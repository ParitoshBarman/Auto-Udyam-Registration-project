import React, { createContext, useContext, useState } from "react";

interface FormData {
    name: string;
    mobile: string;
    email: string;
    pan: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
}

interface FormContextType {
    data: FormData;
    setData: (data: Partial<FormData>) => void;
}

const defaultData: FormData = {
    name: "",
    mobile: "",
    email: "",
    pan: "",
    address: "",
    pincode: "",
    city: "",
    state: ""
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setDataState] = useState<FormData>(defaultData);

    const setData = (updates: Partial<FormData>) => {
        setDataState(prev => ({ ...prev, ...updates }));
    };

    return (
        <FormContext.Provider value={{ data, setData }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => {
    const ctx = useContext(FormContext);
    if (!ctx) throw new Error("useFormContext must be used inside FormProvider");
    return ctx;
};
