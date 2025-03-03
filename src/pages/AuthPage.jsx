import { useState } from "react";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div
			className='min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E03368] to-[#ff6699] p-4
	'
		>
			<div className='w-full max-w-md bg-transparent'>
				<h2 className='text-center text-3xl font-extrabold text-white mb-8'>
					{isLogin ? "Sign in to Hooked" : "Create a Hooked account"}
				</h2>

				<div className='bg-transparent shadow-xl rounded-lg p-8' >
					{isLogin ? <LoginForm /> : <SignUpForm />}

					<div className='mt-8 text-center bg-white mt-0  p-8 rounded-b-lg '>
						<p className='text-sm text-gray-600'>
							{isLogin ? "New to Hooked?" : "Already have an account?"}
						</p>

						<button
							onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
							className='mt-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-300'
						>
							{isLogin ? "Create a new account" : "Sign in to your account"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AuthPage;
