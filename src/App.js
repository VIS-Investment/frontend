import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import SignUp from "./components/auth/Signup.js";
import Login from "./components/auth/Login.js";
import HomePage from "./components/introduce/HomePage.js";
import IntroducePage from "./components/introduce/IntroducePage";
import Matrix01Page from "./components/matrix/matrix1/Matrix01Page.js";
import Matrix02Page from "./components/matrix/matrix2/Matrix02Page.js";
import Matrix03Page from "./components/matrix/matrix3/Matrix03Page.js";
import MatrixResult from "./components/matrix/result/MatrixResult.js";
import api from "./lib/api";

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
  const location = useLocation(); // 현재 경로를 가져오기
  const storedDarkMode = localStorage.getItem("darkMode");
  const initialDarkMode = storedDarkMode === "true";
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await api.get("/auth/logged-check");
        setIsLoggedIn(true);
        setUserEmail(response.data?.data || "");
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
            <div className="flex items-center space-x-8">
              <Link to="/">
                <img
                  src="/images/vis-logo.png"
                  alt="VIS Investment Logo"
                  className="h-12"
                />
              </Link>
              {[
                { path: "/introduce", label: "Introduce" },
                { path: "/matrix-01", label: "Matrix01" },
                { path: "/matrix-02", label: "Matrix02" },
                { path: "/matrix-03", label: "Matrix03" },
                { path: "/matrix-result", label: "MatrixResult" },
                { path: "/mypage", label: "Mypage" },
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`font-normal text-sm px-3 py-1 ${
                    location.pathname === path
                      ? "text-blue-500 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
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
          <Route path="/matrix-02" element={<Matrix02Page />} />
          <Route path="/matrix-03" element={<Matrix03Page />} />
          <Route path="/matrix-result" element={<MatrixResult />} />
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
