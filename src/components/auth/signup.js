import React, { useState } from "react";

function SignUp() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState(false);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_.=+~-])[A-Za-z\d!@#$%^&*()_.=+~-]{8,20}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValidationError(!validatePassword(value));
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError(e.target.value !== password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordValidationError) {
      alert("비밀번호가 조건에 맞지 않습니다.");
      return;
    }
    if (passwordError) {
      alert("비밀번호를 확인해주세요.");
      return;
    }
    alert("회원가입 성공!");
  };

  return (
  <div className="flex justify-center items-center h-[calc(100vh-70px)] bg-white dark:bg-black text-black dark:text-white px-4 mt-[-30px]">
    <div className="w-full max-w-lg bg-white dark:bg-black py-4 px-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이메일 */}
          <div>
            <label
              htmlFor="email"
              className="block text-black dark:text-white font-semibold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@example.com"
            />
          </div>

          {/* 닉네임 */}
          <div>
            <label
              htmlFor="nickname"
              className="block text-black dark:text-white font-semibold mb-1"
            >
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your nickname"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label
              htmlFor="password"
              className="block text-black dark:text-white font-semibold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={8}
              maxLength={20}
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Include 8-20 characters, a letter, a number, and a special character (!@#$%^&*()_.=+~-).
            </p>
            {passwordValidationError && (
              <p className="text-xs text-red-500 mt-1">
                The password does not meet the requirements.
              </p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-black dark:text-white font-semibold mb-1"
            >
              Password Check
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
              value={confirmPassword}
              onChange={handleConfirmPassword}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
            {passwordError && (
              <p className="text-xs text-red-500 mt-1">
                The passwords do not match.
              </p>
            )}
          </div>

          {/* 회원가입 버튼 */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
  </div>

  
  );
}

export default SignUp;
