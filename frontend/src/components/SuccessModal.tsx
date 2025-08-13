import React from "react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40" style={{backgroundColor:"#000000cf"}}>
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg border border-gray-300">

                {/* Header */}
                <div className="bg-blue-700 text-white text-center p-3 rounded-t-lg">
                    <h2 className="text-lg font-semibold">
                        UDYAM REGISTRATION FORM
                    </h2>
                    <p className="text-xs">For New Enterprise who are not Registered yet as MSME</p>
                </div>

                {/* Body */}
                <div className="p-6 text-center">
                    <svg
                        className="mx-auto mb-4 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Registration Successful!
                    </h3>
                    <p className="text-sm text-gray-600">
                        Your details have been successfully submitted to UDYAM Registration Portal.
                    </p>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 text-center">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;