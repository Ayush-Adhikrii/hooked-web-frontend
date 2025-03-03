import { Frown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BottomNavigation } from "../components/BottomNavigation";
import GetSubscription from "../components/GetSubscription";
import { Header } from "../components/Header";
import LikerArea from "../components/LikerArea";
import SwipeFeedback from "../components/SwipeFeedback";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { useMessageStore } from "../store/useMessageStore";
import { useSubscriptionStore } from "../store/useSubscriptionStore";

const LikesPage = () => {
    const { isLoadingUserProfiles, fetchUsersWhoLiked, likers, subscribeToNewMatches, unsubscribeFromNewMatches, matches } =
        useMatchStore();
    const { authUser } = useAuthStore();
    const { getSubscriptionExpiry, subscription, loading } = useSubscriptionStore();
    const { showSideBar } = useMessageStore();

    const [isSubscriptionValid, setIsSubscriptionValid] = useState(null);

    useEffect(() => {
        if (authUser) {
            getSubscriptionExpiry(authUser._id);
        }
    }, [authUser, getSubscriptionExpiry]);

    useEffect(() => {
        fetchUsersWhoLiked(authUser._id);
    }, [fetchUsersWhoLiked]);

    useEffect(() => {
        if (subscription?.expiresOn) {
            const expiryDate = new Date(subscription.expiresOn);
            const currentDate = new Date();
            setIsSubscriptionValid(expiryDate > currentDate);
        } else {
            setIsSubscriptionValid(false); // No subscription found
        }
    }, [subscription]);

    useEffect(() => {
        if (authUser) {
            subscribeToNewMatches();
            return () => {
                unsubscribeFromNewMatches();
            };
        }
    }, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);

    return (
        <div className="flex h-screen">
            {/* Sidebar for Matches */}
            <div className="w-1/5 bg-pink-200 shadow-md h-full flex flex-col p-4">
                <h2 className="text-lg font-bold text-pink-600 mb-4 text-center">Matches</h2>

                {/* Matches List */}
                <div className="overflow-y-auto flex flex-col space-y-2">
                    {matches.length > 0 ? (
                        matches.map((match) => (
                            <Link key={match._id} to={`/chat/${match._id}`}>
                                <div className="flex items-center mb-4 cursor-pointer bg-pink-300 hover:bg-pink-400 p-2 rounded-lg transition">
                                    <img
                                        src={match.profilePhoto ? `/profilePhotos/${match.profilePhoto}` : "/avatar.png"}
                                        alt="User avatar"
                                        className="size-12 object-cover rounded-full mr-3 border-2 border-pink-300"
                                    />
                                    <h3 className="font-semibold text-gray-800">{match.name}</h3>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 text-center">No matches yet.</p>
                    )}
                </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-4/5 flex flex-col h-screen bg-gradient-to-br from-pink-100 to-purple-100">
                <Header />

                {/* Display GetSubscription if subscription is invalid */}
                <main className="flex-grow flex flex-col items-center justify-center p-6 overflow-hidden">
                    {loading ? (
                        <LoadingUI />
                    ) : isSubscriptionValid ? (
                        likers.length > 0 && !isLoadingUserProfiles ? (
                            <>
                                <LikerArea />
                                <SwipeFeedback />
                            </>
                        ) : isLoadingUserProfiles ? (
                            <LoadingUI />
                        ) : (
                            <NoMoreProfiles />
                        )
                    ) : (
                        <GetSubscription />
                    )}
                </main>

                {/* Bottom Navigation */}
                <BottomNavigation />
            </div>
        </div>
    );
};

export default LikesPage;

const NoMoreProfiles = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <Frown className="text-pink-400 mb-6" size={80} />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Looks like nobody likes you</h2>
        <p className="text-xl text-gray-600 mb-6">Maybe try uploading photos. That might help.</p>
    </div>
);

const LoadingUI = () => {
    return (
        <div className="relative w-full max-w-sm h-[28rem]">
            <div className="card bg-white w-96 h-[28rem] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <div className="px-4 pt-4 h-3/4">
                    <div className="w-full h-full bg-gray-200 rounded-lg" />
                </div>
                <div className="card-body bg-gradient-to-b from-white to-pink-50 p-4">
                    <div className="space-y-2">
                        <div className="h-6 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                </div>
            </div>
        </div>
    );
};
