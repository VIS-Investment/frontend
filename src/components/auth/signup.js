import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";

function SignUp() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // 이전 에러 메시지 초기화
    setSuccessMessage(""); // 이전 성공 메시지 초기화

    if (passwordValidationError) {
      setErrorMessage("The password does not meet the requirements.");
      return;
    }

    if (passwordError) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      console.log({ email, nickname, password }); // 요청 데이터 확인
      await api.post("/auth/register", { email, nickname, password });
      // alert("Registration successful!");
      navigate("/login"); // 회원가입 성공 후 로그인 경로로 이동동
    } catch (error) {
      console.error(error.response || error.message);
      const errorMsg = error.response?.data?.message || "Failed to register.";
      setErrorMessage(errorMsg);
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
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
              value={password}
              onChange={handlePasswordChange}
              required
              minLength={8}
              maxLength={20}
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
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
            {passwordError && (
              <p className="text-xs text-red-500 mt-1">
                Passwords do not match.
              </p>
            )}
          </div>

          {/* 에러 메시지 */}
          {errorMessage && (
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
          )}

          {/* 성공 메시지 */}
          {successMessage && (
            <p className="text-sm text-green-500 mt-2">{successMessage}</p>
          )}

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
