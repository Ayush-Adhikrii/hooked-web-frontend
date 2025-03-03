import { Navigate, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import EsewaPaymentPage from "./components/EsewaPaymentPage";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import DetailsPage from "./pages/DetailsPage";
import FilterPage from "./pages/FilterPage";
import HomePage from "./pages/HomePage";
import HomeScreen from "./pages/Landing";
import LikesPage from "./pages/LikesPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";


function App() {
	const { checkAuth, authUser, checkingAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (checkingAuth) return null;

	return (
		<div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
			<Routes>
				<Route path='/' element={!authUser ? <HomeScreen /> : <Navigate to={"/home"} />} />
				<Route path='/home' element={authUser ? <HomePage /> : <Navigate to={"/"} />} />
				<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to={"/home"} />} />
				<Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to={"/"} />} />
				<Route path='/filter' element={authUser ? <FilterPage /> : <Navigate to={"/"} />} />
				<Route path='/details' element={authUser ? <DetailsPage /> : <Navigate to={"/home"} />} />
				<Route path='/likes' element={authUser ? <LikesPage /> : <Navigate to={"/"} />} />
				<Route path='/chat/:id' element={authUser ? <ChatPage /> : <Navigate to={"/"} />} />
				<Route path="/esewa-payment" element={<EsewaPaymentPage />} />
			</Routes>

			<Toaster />
		</div>
	);
}

export default App;
