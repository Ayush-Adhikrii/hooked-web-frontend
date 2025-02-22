import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const LoginForm = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading } = useAuthStore();

	return (
		<form
			className='space-y-6 bg-white rounded-t-lg shadow-md p-8'
			onSubmit={(e) => {
				e.preventDefault();
				login({ userName, password });
			}}
		>
			<div>
				<label htmlFor='userName' className='block text-sm font-medium text-gray-700'>
					Username
				</label>
				<div className='mt-1'>
					<input
						id='userName'
						name='userName'
						autoComplete='Username'
						required
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>

			<div>
				<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
					Password
				</label>
				<div className='mt-1'>
					<input
						id='password'
						name='password'
						type='password'
						autoComplete='current-password'
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
					/>
				</div>
			</div>

			<button
				type='submit'
				className={`w-full flex justify-center py-2 px-4 border border-transparent 
					rounded-md shadow-sm text-sm font-medium text-white ${loading
						? "bg-pink-400 cursor-not-allowed"
						: "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
					}`}
				disabled={loading}
			>
				{loading ? "Signing in..." : "Sign in"}
			</button>
		</form>
	);
};
export default LoginForm;
