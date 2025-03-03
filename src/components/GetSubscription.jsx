// src/components/GetSubscription.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useSubscriptionStore } from "../store/useSubscriptionStore";

const GetSubscription = () => {
  const { loading } = useSubscriptionStore();
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handleSubscribe = (type, months, amount) => {
    if (authUser) {
      setPaymentLoading(true);
      // Navigate to EsewaPaymentPage with subscription details
      navigate(`/esewa-payment`, { state: { userId: authUser._id, type, months, amount } });
    } else {
      console.error("No authenticated user found");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Unlock Who Liked You!</h2>
      <p className="text-xl text-gray-600 mb-6">Subscribe now to view your admirers.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Silver Plan */}
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg"
          onClick={() => handleSubscribe("Silver", 1, 300)}
          disabled={loading || paymentLoading}
        >
          {loading || paymentLoading ? "Processing..." : "Silver - 1 Month (300 NPR)"}
        </button>

        {/* Gold Plan */}
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
          onClick={() => handleSubscribe("Gold", 3, 500)}
          disabled={loading || paymentLoading}
        >
          {loading || paymentLoading ? "Processing..." : "Gold - 3 Months (500 NPR)"}
        </button>

        {/* Platinum Plan */}
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
          onClick={() => handleSubscribe("Platinum", 6, 800)}
          disabled={loading || paymentLoading}
        >
          {loading || paymentLoading ? "Processing..." : "Platinum - 6 Months (800 NPR)"}
        </button>
      </div>
    </div>
  );
};

export default GetSubscription;