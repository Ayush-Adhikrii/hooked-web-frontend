import { Frown } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BottomNavigation } from "../components/BottomNavigation";
import { Header } from "../components/Header";
import SwipeArea from "../components/SwipeArea";
import SwipeFeedback from "../components/SwipeFeedback";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";

import { useMessageStore } from "../store/useMessageStore";

const HomePage = () => {
	const { isLoadingUserProfiles, getMyMatches, isLoadingMyMatches, getUserProfiles, userProfiles, subscribeToNewMatches, unsubscribeFromNewMatches, matches } =
		useMatchStore();

	const { authUser } = useAuthStore();
	const { showSideBar } = useMessageStore();


	useEffect(() => {
		getMyMatches();
	}, [getMyMatches]);

	useEffect(() => {
		getUserProfiles();
	}, [getUserProfiles]);

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
			<div className="w-1/5 bg-pink-200 shadow-md h-full flex flex-col p-4">
				<h2 className="text-lg font-bold text-pink-600 mb-4 text-center">Matches</h2>

				{/* Matches List */}
				<div className="overflow-y-auto flex flex-col space-y-2">
					{/* Display matches from useMatchStore */}
					{matches.length > 0 ? (
						matches.map((match) => (
							console.log("photo ", match),
							<Link key={match._id} to={`/chat/${match._id}`}>
								<div className='flex items-center mb-4 cursor-pointer bg-pink-300 hover:bg-pink-400 p-2 rounded-lg transition-colors duration-300'>

									<img
										src={`/profilePhotos/${match.profilePhoto}` || "/avatar.png"}
										alt='User avatar'
										className='size-12 object-cover rounded-full mr-3 border-2 border-pink-300'
									/>

									<h3 className='font-semibold text-gray-800'>{match.name}</h3>
								</div>
							</Link>
						))
					) : (
						<p className="text-sm text-gray-500 text-center">No matches yet.</p>
					)}
				</div>
			</div>

			<div className="w-4/5 flex flex-col h-screen bg-gradient-to-br from-pink-100 to-purple-100">
				<Header />

				{/* Swipe Content */}
				<main className="flex-grow flex flex-col items-center justify-center p-6 overflow-hidden">
					{userProfiles.length > 0 && !isLoadingUserProfiles ? (
						<>
							<SwipeArea />
							<SwipeFeedback />
						</>
					) : isLoadingUserProfiles ? (
						<LoadingUI />
					) : (
						<NoMoreProfiles />
					)}
				</main>

				{/* Bottom Navigation */}
				<BottomNavigation />
			</div>
		</div>
	);
};

export default HomePage;

const NoMoreProfiles = () => (
	<div className="flex flex-col items-center justify-center h-full text-center p-8">
		<Frown className="text-pink-400 mb-6" size={80} />
		<h2 className="text-3xl font-bold text-gray-800 mb-4">You've already gone through everyone!</h2>
		<p className="text-xl text-gray-600 mb-6">How desperate are you? Changing your filter might get you to more people.</p>
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
