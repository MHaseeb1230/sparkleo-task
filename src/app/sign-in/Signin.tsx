 

"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

const Signin = () => {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For now, we're simulating a successful sign-in. You can replace this with actual authentication logic
    if (email && password) {
      // Redirect to the dashboard after successful login
      router.push('/dashboard');
    } else {
      // Handle invalid form input
      alert("Please enter valid email and password.");
    }
  };

  return (
    <div className="flex gap-4 h-screen">
      {/* Left Section */}
      <div className="flex flex-col items-center w-1/2">
        <h1 className="text-2xl text-red-600 mb-4">Sign In</h1>
        <p className="opacity-75 mb-6">Enter your email and password to sign in</p>

        {/* Form Section */}
        <form className="w-full max-w-sm" onSubmit={handleSignin}>
          {/* Email Field */}
          <div className="mb-8">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="mail@simmple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle email input change
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Min 8 Characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle password input change
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Checkbox */}
          <div className='flex justify-between'>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="keep-logged-in"
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded "
            />
            <label
              htmlFor="keep-logged-in"
              className="ml-2 block text-gray-700 text-sm"
            >
              Keep me logged in
            </label>
          </div>
          <div>
            <p className='text-red-600'>Forget password</p>
          </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-red-700 w-full"
          >
            Sign In
          </button>
          <p className='mt-6'>Not registered yet ? <span className='text-red-600'>Create account</span></p>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-1/2 ">
        <Image
          src="/images/image.png"
          alt="image"
          width={500}
          height={300}
          className="w-full rounded-t-lg"
        />
      </div>
    </div>
  );
};

export default Signin;
