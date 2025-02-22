import { X } from "lucide-react";
import { useState, useEffect } from "react";

// Dynamically map titles to questions and radio button options
const getFieldQuestion = (title) => {
    const safeTitle = title ? title.toString().toLowerCase() : "";
    switch (safeTitle) {
        case "work":
            return "What do you do for a living?";
        case "height":
            return "How tall are you?";
        case "education":
            return "What is your highest level of education?";
        case "exercise":
            return "How often do you exercise?";
        case "drinks":
            return "Do you drink alcohol? If so, how often?";
        case "smoke":
            return "Do you smoke?";
        case "kids":
            return "Do you have kids?";
        case "religion":
            return "What is your religion?";
        default:
            return `Enter ${title || "value"}...`;
    }
};

const getFieldOptions = (title) => {
    const safeTitle = title ? title.toString().toLowerCase() : "";
    switch (safeTitle) {
        case "exercise":
            return ["Sometimes", "Regularly", "Never", "Try to but I fail"];
        case "drinks":
            return ["Sometimes", "Social drinker", "Never", "I live by the glass"];
        case "smoke":
            return ["Active smoker", "Only while drinking", "Never", "Can't stand the smell of smoke"];
        case "kids":
            return ["I already have", "Want to have", "Don't want any"];
        case "religion":
            return ["Hindu", "Muslim", "Christian", "Buddhist", "Atheist", "Omniset"];
        default:
            return [];
    }
};

const EditFieldModal = ({ isOpen, onClose, onSave, field, icon: Icon, title, currentValue, unit = "" }) => {
    const [value, setValue] = useState("");

    // **✅ Reset state when a new field is selected**
    useEffect(() => {
        setValue(currentValue || ""); // Reset value every time a new field opens
    }, [field, currentValue]);

    if (!isOpen) return null; // Don't render if modal is closed

    const question = getFieldQuestion(title);
    const options = getFieldOptions(title);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-pink-200 rounded-lg shadow-lg w-96 p-4 relative">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-0 right-0 text-red-600 hover:text-red-900">
                    <X size={20} />
                </button>

                {/* Icon Section */}
                <div className="w-full h-32 bg-pink-300 flex items-center justify-center rounded-t-lg">
                    <Icon size={50} className="text-gray-700" />
                </div>

                {/* Content */}
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">{question}</h2>

                    {/* Radio Buttons for Specific Fields */}
                    {options.length > 0 ? (
                        <div className="flex flex-col">
                            {options.map((option) => (
                                <label key={option} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        name={field}
                                        value={option}
                                        checked={value === option}
                                        onChange={(e) => setValue(e.target.value)}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    ) : (
                        // Text input for other fields
                        <div className="flex items-center border border-black rounded-lg px-3 py-2">
                            <input
                                type="text"
                                placeholder={question}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="flex-1 outline-none bg-transparent text-gray-700"
                            />
                            {unit && <span className="ml-2 text-gray-600">{unit}</span>}
                        </div>
                    )}

                    {/* Confirm Button */}
                    <div className="w-full py-3 px-5 flex items-center mt-5 justify-center rounded-lg shadow-md text-base font-semibold text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                        <button onClick={() => { onSave(field, value); onClose(); }} className="text-white">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditFieldModal;
