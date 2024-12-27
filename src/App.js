import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import SignUp from "./components/auth/Signup.js";
import Login from "./components/auth/Login.js";
import HomePage from "./components/introduce/HomePage.js";
import IntroducePage from "./components/introduce/IntroducePage";
import Matrix01Page from "./components/matrix/matrix1/Matrix01Page.js";
import api from "./lib/api";

// function MatrixPage() {
//   return (
//     <div className="p-8">
//       <h2 className="text-2xl font-bold mb-4">Matrix Page</h2>
//       <p>Matrix 기능 또는 데이터 표시 페이지입니다.</p>
//     </div>
//   );
// }

function MypagePage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">My Page</h2>
      <p>사용자의 마이페이지 내용이 들어갑니다.</p>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const storedDarkMode = localStorage.getItem("darkMode");
  const initialDarkMode = storedDarkMode === "true";
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    // 초기 렌더링 시 세션 유효성 확인
    const checkLoginStatus = async () => {
      try {
        const response = await api.get("/auth/logged-check");
        setIsLoggedIn(true);
        setUserEmail(response.data?.data || ""); // 사용자 이메일 저장
      } catch (error) {
        console.error("로그인 상태 확인 실패:", error);
        setIsLoggedIn(false);
        setUserEmail("");
      }
    };
    checkLoginStatus();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await api.delete("/auth/logout");
      setIsLoggedIn(false);
      setUserEmail("");
      // alert("Logged out successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to log out!");
    }
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
                to="/matrix-01"
                className="hover:text-gray-500 dark:hover:text-gray-300 font-normal text-sm px-3 py-1"
              >
                Matrix01
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
              {isLoggedIn ? (
                <>
                  <span className="text-sm">{userEmail}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-transparent border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm px-3 py-1 rounded"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}

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
          <Route path="/matrix-01" element={<Matrix01Page />} />
          <Route
            path="/mypage"
            element={<MypagePage />}
          />
          <Route
            path="/signup"
            element={<SignUp onRegister={() => navigate("/login")} />}
          />
          <Route
            path="/login"
            element={
              <Login
                onLogin={(email) => {
                  setIsLoggedIn(true);
                  setUserEmail(email);
                  navigate("/");
                }}
              />
            }
          />
        </Routes>
        <footer className="p-2 border-t border-gray-300 dark:border-gray-600 text-center text-xs mt-auto">
          © 2024 VIS Investment. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default App;