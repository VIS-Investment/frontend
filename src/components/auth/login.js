import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // 이전 에러 메시지 초기화
    try {
      const response = await api.post("/auth/login", { email, password });
      onLogin(response.data.email); // 사용자 이메일을 부모 컴포넌트로 전달해 상태 업데이트
      navigate("/");
    } catch (error) {
      // 서버로부터 받은 에러 메시지 표시
      const message = error.response?.data?.message || "로그인에 실패했습니다.";
      setErrorMessage(message);
    }
  };
  
  return (
    <div className="flex justify-center items-center h-[calc(100vh-70px)] bg-white dark:bg-black text-black dark:text-white px-4 mt-[-30px]">
      <div className="w-full max-w-lg bg-white dark:bg-black py-4 px-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
          Log In
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
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* 에러 메시지 */}
          {errorMessage && (
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
          )}

          {/* 로그인 버튼 */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
