import React, { useState } from "react";
import { FormProvider } from "./context/FormContext";
import ProgressBar from "./components/ProgressBar";
import Step1 from "./components/Step1Form";
import Step2 from "./components/Step2Form";
import { Toaster } from "react-hot-toast";
import "./styles/form.css";

import SuccessModal from "./components/SuccessModal";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <FormProvider>
      <Navbar/>
      <div style={{ padding: "20px" }}>
        <Toaster position="top-center" />
        <ProgressBar step={step} progress={progress} />
        {step === 1 && <Step1 onNext={() => setStep(2)} setProgress={setProgress} />}
        {step === 2 && <Step2 onBack={() => setStep(1)} onSubmit={() => setStep(1)} setProgress={setProgress} setIsModalOpen={setIsModalOpen}/>}
        {/* Success Modal */}
        <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </FormProvider>
  );
};

export default App;