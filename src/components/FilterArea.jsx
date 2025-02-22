import { Baby, Book, ChevronRight, Handshake, Sparkles, User, Vegan } from 'lucide-react';
import { useEffect, useState } from 'react';
import EditPreference from "../components/EditPreference";
import { useAuthStore } from "../store/useAuthStore";
import { useFilterStore } from '../store/useFIlterStore';

// Define the filter fields
const fields = [
    { key: "preferredGender", label: "Gender", icon: Vegan },
    { key: "minAge", label: "As young as", icon: Baby },
    { key: "maxAge", label: "As old as", icon: User },
    { key: "relationType", label: "Looking for", icon: Handshake },
    { key: "preferredStarSign", label: "Star sign", icon: Sparkles },
    { key: "preferredReligion", label: "Religion", icon: Book },
];

const FilterArea = () => {
    const { authUser } = useAuthStore();
    const { getPreference, preference, updatePreference } = useFilterStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        getPreference(authUser._id);
    }, [getPreference, authUser._id]);

    // Open modal for the selected field
    const handleOpenModal = (field) => {
        setActiveField(field);
        setModalOpen(true);
    };

    // Save the updated field value.
    // It passes authUser._id along with the updated JSON payload.
    const handleSaveField = (field, value) => {
        const updatedData = { ...preference, [field]: value };
        console.log("Updating preference for user:", authUser._id, updatedData);
        updatePreference(authUser._id, updatedData);
    };

    return (
        <div className="relative w-full max-w-sm h-[28rem]">
            <div className="card bg-gray-50 w-auto h-[28rem] select-none rounded-lg overflow-hidden border border-gray-100">
                <div className="overflow-y-auto bg-gray-100 w-auto h-[28rem] select-none rounded-lg border border-gray-200">
                    <div className="h-full pb-5">
                        <div className="flex items-center justify-center mt-5">
                            <h2 className="text-xl font-bold text-gray-800">Filter Matches</h2>
                        </div>

                        <div>
                            {fields.map(({ key, label, icon: Icon, unit }) => (
                                <div key={key} className="flex items-center justify-center mt-2 mb-2">
                                    <div className="bg-white shadow-md rounded-lg p-4 w-11/12 flex justify-between items-center">
                                        {/* Left Section: Icon & Label */}
                                        <div className="flex items-center gap-2">
                                            <Icon size={20} className="text-gray-700" />
                                            <span className="text-lg font-medium text-gray-800">{label}</span>
                                        </div>
                                        {/* Right Section: Current value and Edit Button */}
                                        <button
                                            onClick={() => handleOpenModal({ key, label, icon: Icon, unit })}
                                            className="flex items-center gap-1 text-black"
                                        >
                                            <span>
                                                {typeof preference?.[key] === "string" && preference[key].trim()
                                                    ? `${preference[key]}${unit || ""}`
                                                    : preference?.[key] || "Add"}
                                            </span>
                                            <ChevronRight className="text-pink-600 hover:text-pink-800" size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Modal (Dynamic for all fields) */}
                            {activeField && (
                                <EditPreference
                                    isOpen={modalOpen}
                                    onClose={() => setModalOpen(false)}
                                    onSave={handleSaveField}
                                    field={activeField.key}
                                    icon={activeField.icon}
                                    title={activeField.label}
                                    currentValue={preference?.[activeField.key]}
                                    unit={activeField.unit}
                                    // For the "As old as" field, pass the current minimum age (default to "16")
                                    minAgeValue={activeField.key === "maxAge" ? (preference?.minAge || "16") : undefined}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterArea;
