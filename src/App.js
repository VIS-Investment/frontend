import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/auth/signup.js";
import Login from "./components/auth/login.js";


function HomePage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Home Page</h2>
      <p>메인 페이지의 내용이 들어갑니다.</p>
    </div>
  );
}

function IntroducePage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Introduce Page</h2>
      <p>회사/서비스 소개 페이지입니다.</p>
    </div>
  );
}

function MatrixPage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Matrix Page</h2>
      <p>Matrix 기능 또는 데이터 표시 페이지입니다.</p>
    </div>
  );
}

function MypagePage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">My Page</h2>
      <p>사용자의 마이페이지 내용이 들어갑니다.</p>
    </div>
  );
}

function App() {
  const storedDarkMode = localStorage.getItem("darkMode");
  const initialDarkMode = storedDarkMode === "true";
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
        <header className="sticky top-0 z-50 border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-black">
          <nav className="flex items-center justify-between px-8 py-2">
            {/* 로고 및 탭 */}
            <div className="flex items-center space-x-8">
              <Link to="/">
                <img
                  src="/images/vis-logo.png"
                  alt="VIS Investment Logo"
                  className="h-12"
                />
              </Link>
              <Link
                to="/introduce"
                className="hover:text-gray-500 dark:hover:text-gray-300 font-normal text-sm px-3 py-1"
                >
                Introduce
              </Link>
              <Link
                to="/matrix"
                className="hover:text-gray-500 dark:hover:text-gray-300 font-normal text-sm px-3 py-1"
                >
                Matrix
              </Link>
              <Link
                to="/mypage"
                className="hover:text-gray-500 dark:hover:text-gray-300 font-normal text-sm px-3 py-1"
                >
                Mypage
              </Link>
            </div>

            {/* 로그인, 회원가입, 다크 모드 토글 */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                  className="bg-transparent border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm px-3 py-1 rounded"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                  className="bg-transparent border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm px-3 py-1 rounded"
              >
                Sign up
              </Link>

              <button
                onClick={toggleDarkMode}
                className="flex items-center px-3 py-2 rounded bg-white dark:bg-black text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <img
                  src={
                    isDarkMode
                      ? "/images/light-mode.png"
                      : "/images/night-mode.png"
                  }
                  alt="Toggle Dark Mode"
                  className="h-5 w-5"
                />
              </button>
            </div>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/introduce" element={<IntroducePage />} />
          <Route path="/matrix" element={<MatrixPage />} />
          <Route path="/mypage" element={<MypagePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
        <footer className="p-2 border-t border-gray-300 dark:border-gray-600 text-center text-xs mt-auto">
        © 2024 VIS Investment. All rights reserved.
        </footer>
      </div>
    </div>

  );
}

export default App;
