// src/pages/EsewaPaymentPage.js
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSubscriptionStore } from "../store/useSubscriptionStore";

const EsewaPaymentPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { saveSubscription } = useSubscriptionStore();
    const [step, setStep] = useState("login"); // login -> verification -> confirmation -> save
    const [esewaId, setEsewaId] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [promoCode, setPromoCode] = useState("");

    const formattedAmount = state?.amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const handleLogin = () => {
        // Allow any user ID and password
        setStep("verification");
    };

    const handleVerification = () => {
        // Mock OTP validation
        setStep("confirmation");

    };

    const handleConfirmation = () => {
        const subscriptionData = {
            userId: state.userId,
            subscriptionType: state.type,
            subscribedOn: new Date().toISOString(),
            expiresOn: new Date(new Date().setMonth(new Date().getMonth() + state.months)).toISOString(),
        };
        saveSubscription(subscriptionData).then(() => {
            toast.success("Payment Successful");

            navigate("/likes");
        });
    };

    const handleCancel = () => {
        navigate("/likes");
    };

    if (!state || !state.userId || !state.amount) {
        navigate("/likes");
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="flex w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* Left Section */}
                <div className="w-1/2 p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center mb-4">
                            <img src="icons/esewa_logo.png" alt="eSewa Logo" className="h-8 mr-2" />
                            <h2 className="text-xl font-semibold">EPAYTEST</h2>
                        </div>
                        <h3 className="text-3xl font-bold mb-2">Total Amount</h3>
                        <p className="text-4xl text-green-400 mb-4">NPR. {formattedAmount}</p>
                        {/* Removed eSewa Service Charge */}
                        <p className="text-gray-400 mb-2">Total Amount</p>
                        <p className="text-2xl">{formattedAmount}</p>
                    </div>
                    {/* Removed ad banner */}
                </div>

                {/* Right Section */}
                <div className="w-1/2 p-8 bg-gray-700 flex flex-col justify-center">
                    {step === "login" && (
                        <>
                            <h3 className="text-xl font-semibold mb-4">Sign in to your account</h3>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-2">eSewa ID</label>
                                <input
                                    type="text"
                                    value={esewaId}
                                    onChange={(e) => setEsewaId(e.target.value)}
                                    className="w-full p-2 rounded bg-gray-600 text-white"
                                    placeholder="eSewa ID"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-2">Password/MPIN</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 rounded bg-gray-600 text-white"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    className="bg-gray-600 text-gray-300 px-4 py-2 rounded"
                                    onClick={handleCancel}
                                >
                                    CANCEL PAYMENT
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={handleLogin}
                                >
                                    LOGIN
                                </button>
                            </div>
                        </>
                    )}

                    {step === "verification" && (
                        <>
                            <h3 className="text-xl font-semibold mb-4">Enter a verification code</h3>
                            <p className="text-gray-400 mb-4">Please type the 6-digit verification code sent to your mobile number.</p>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full p-2 rounded bg-gray-600 text-white"
                                    placeholder="Enter verification token"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    className="bg-gray-600 text-gray-300 px-4 py-2 rounded"
                                    onClick={() => setStep("login")}
                                >
                                    BACK TO LOGIN
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={handleVerification}
                                >
                                    VERIFY
                                </button>
                            </div>
                        </>
                    )}

                    {step === "confirmation" && (
                        <>
                            <h3 className="text-xl font-semibold mb-4">Confirmation</h3>
                            <p className="text-gray-400 mb-4">Confirm the details below</p>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-2">Choose your other payment option</label>
                                <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">Pay via e-Sewa Wallet</button>
                                <button className="bg-gray-500 text-white px-4 py-2 rounded">Linked Bank Account</button>
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-400">FULL NAME</p>
                                <p className="text-lg">ESewa Esewa Esewa</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-400">CONTACT NUMBER</p>
                                <p className="text-lg">9806800001</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-400">ADDRESS</p>
                                <p className="text-lg">KTM, Baseri-1, Dhading, Bagmati</p>
                            </div>
                            {/* Removed eSewa Service Charge */}
                            <div className="mb-4">
                                <p className="text-gray-400">Total Amount</p>
                                <p className="text-lg">NPR. {formattedAmount}</p>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    className="bg-gray-600 text-gray-300 px-4 py-2 rounded"
                                    onClick={handleCancel}
                                >
                                    CANCEL
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={handleConfirmation}
                                >
                                    PAY VIA ESEWA
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EsewaPaymentPage;