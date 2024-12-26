import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";

// 예시 페이지 컴포넌트들
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
  // -------------------------------
  // 1) localStorage로 다크 모드 상태 저장/불러오기
  // -------------------------------
  const storedDarkMode = localStorage.getItem("darkMode");
  const initialDarkMode = storedDarkMode === "true";
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  // 다크 모드 토글
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    // isDarkMode 상태에 따라 Tailwind 다크 모드를 위한 "dark" 클래스를 루트에 부여
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
        
        {/* -----------------------------
          2) 헤더(탭 메뉴) 영역 
        ----------------------------- */}
        <header className="border-b border-gray-300 dark:border-gray-600">
          <nav className="flex items-center justify-between px-8 py-2">
            {/* 왼쪽: 로고 + 메뉴들 */}
            <div className="flex items-center space-x-8">
              {/* 로고 클릭 시 Home("/")으로 이동 */}
              <Link to="/">
                <img
                  src="/images/vis-logo.png"
                  alt="VIS Investment Logo"
                  className="h-16"
                />
              </Link>

              {/* 탭 메뉴들: SPA 라우팅 - 새로고침 없이 이동 */}
              <Link
                to="/introduce"
                className="hover:text-gray-500 dark:hover:text-gray-300 font-normal"
              >
                Introduce
              </Link>
              <Link
                to="/matrix"
                className="hover:text-gray-500 dark:hover:text-gray-300 font-normal"
              >
                Matrix
              </Link>
              <Link
                to="/mypage"
                className="hover:text-gray-500 dark:hover:text-gray-300 font-normal"
              >
                Mypage
              </Link>
            </div>

            {/* 오른쪽: 로그인 / 회원가입 + 다크 모드 토글 */}
            <div className="flex items-center space-x-4">
              <button className="bg-transparent border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm px-4 py-2 rounded">
                Log in
              </button>
              <button className="bg-transparent border border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm px-4 py-2 rounded">
                Sign up
              </button>

              {/* 다크 모드 토글 버튼 */}
              <button
                onClick={toggleDarkMode}
                className="
                  flex items-center px-3 py-2 rounded 
                  bg-white dark:bg-black 
                  text-black dark:text-white 
                  hover:bg-gray-200 dark:hover:bg-gray-800
                "
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

        {/* --------------------------------
          3) 메인 영역: 라우트 내용 표시
        -------------------------------- */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/introduce" element={<IntroducePage />} />
          <Route path="/matrix" element={<MatrixPage />} />
          <Route path="/mypage" element={<MypagePage />} />
        </Routes>

        {/* -----------------------------
          4) 푸터 영역
        ----------------------------- */}
        <footer className="p-4 border-t border-gray-300 dark:border-gray-600 text-center text-sm mt-auto">
          © 2024 VIS Investment. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default App;
