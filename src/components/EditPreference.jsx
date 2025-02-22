import { X } from "lucide-react";
import { useEffect, useState } from "react";

// Map the field label to a dynamic question
const getFieldQuestion = (title) => {
    const safeTitle = title ? title.toString().toLowerCase() : "";
    switch (safeTitle) {
        case "gender":
            return "What gender are you looking for?";
        case "as young as":
            return "Select the minimum age:";
        case "as old as":
            return "Select the maximum age:";
        case "looking for":
            return "What kind of relationship are you looking for?";
        case "star sign":
            return "Select your preferred star sign:";
        case "religion":
            return "What religion do you prefer?";
        default:
            return `Enter ${title || "value"}...`;
    }
};

// Returns options for radio-based fields (non-age fields)
const getFieldOptions = (title) => {
    const safeTitle = title ? title.toString().toLowerCase() : "";
    switch (safeTitle) {
        case "gender":
            return ["Male", "Female", "Others", "Any"];
        case "looking for":
            return ["Long term", "Casual", "Wanna get married", "Fun dates", "Just friendship", "Any"];
        case "star sign":
            return [
                "Aries", "Taurus", "Gemini", "Cancer",
                "Leo", "Virgo", "Libra", "Scorpio",
                "Sagittarius", "Capricorn", "Aquarius", "Pisces", "Any"
            ];
        case "religion":
            return ["Hindu", "Buddhist", "Muslim", "Christian", "Atheist", "Omniset"];
        default:
            return [];
    }
};

const EditPreference = ({
    isOpen,
    onClose,
    onSave,
    field,
    icon: Icon,
    title,
    currentValue,
    unit = "",
    minAgeValue
}) => {
    const [value, setValue] = useState("");

    // ✅ Reset value every time a new field is selected
    useEffect(() => {
        setValue(currentValue || (title.toLowerCase().includes("age") ? "16" : ""));
    }, [field, currentValue]);

    if (!isOpen) return null;

    const question = getFieldQuestion(title);
    const isAgeField = title.toLowerCase().includes("as young as") || title.toLowerCase().includes("as old as");
    const isStarSign = title.toLowerCase() === "star sign";
    const sliderMin = isAgeField && title.toLowerCase().includes("as old as") ? parseInt(minAgeValue) || 16 : 16;
    const sliderMax = 60;
    const options = !isAgeField ? getFieldOptions(title) : [];

    const handleRadioChange = (e) => {
        setValue(e.target.value);
    };

    const handleSliderChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-pink-200 rounded-lg shadow-lg w-96 p-4 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 text-red-600 hover:text-red-900"
                >
                    <X size={20} />
                </button>

                {/* Header / Icon */}
                <div className="w-full h-32 bg-pink-300 flex items-center justify-center rounded-t-lg">
                    <Icon size={50} className="text-gray-700" />
                </div>

                {/* Content */}
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">{question}</h2>

                    {isAgeField ? (
                        <div className="flex flex-col items-center">
                            <input
                                type="range"
                                min={sliderMin}
                                max={sliderMax}
                                value={value}
                                onChange={handleSliderChange}
                                className="w-full accent-pink-600"
                            />
                            <div className="mt-2 text-gray-800">{value}{unit}</div>
                        </div>
                    ) : options.length > 0 ? (
                        isStarSign ? (
                            <div className="grid grid-cols-2 gap-2">
                                {options.map((option) => (
                                    <label key={option} className="flex items-center">
                                        <input
                                            type="radio"
                                            name={field}
                                            value={option}
                                            checked={value === option}
                                            onChange={handleRadioChange}
                                            className="mr-2 accent-pink-600"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                {options.map((option) => (
                                    <label key={option} className="flex items-center mb-2">
                                        <input
                                            type="radio"
                                            name={field}
                                            value={option}
                                            checked={value === option}
                                            onChange={handleRadioChange}
                                            className="mr-2 accent-pink-600"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className="flex items-center border border-pink-600 rounded-lg px-3 py-2">
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

                    <div className="w-full py-3 px-5 flex items-center mt-5 justify-center rounded-lg shadow-md text-base font-semibold text-white bg-pink-600 hover:bg-pink-700">
                        <button
                            onClick={() => {
                                onSave(field, value);
                                onClose();
                            }}
                            className="text-white"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPreference;
