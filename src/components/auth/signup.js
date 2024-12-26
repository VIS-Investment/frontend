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
<div className="flex justify-center items-center h-[80vh] bg-white dark:bg-black text-black dark:text-white px-6">
<div className="w-full max-w-4xl bg-white dark:bg-black py-6 px-10 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
          회원가입
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          {/* 이메일 */}
          <div>
            <label
              htmlFor="email"
              className="block text-black dark:text-white font-semibold"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@example.com"
            />
          </div>

          {/* 닉네임 */}
          <div>
            <label
              htmlFor="nickname"
              className="block text-black dark:text-white font-semibold"
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="닉네임을 입력하세요"
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label
              htmlFor="password"
              className="block text-black dark:text-white font-semibold"
            >
              비밀번호
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
              className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 입력하세요"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              8~20자로, 숫자, 알파벳, 특수문자(!@#$%^&*()_.=+~-) 각각 최소 하나씩을 포함해주세요.
            </p>
            {passwordValidationError && (
              <p className="text-sm text-red-500 mt-1">
                비밀번호가 조건에 맞지 않습니다.
              </p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-black dark:text-white font-semibold"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
              value={confirmPassword}
              onChange={handleConfirmPassword}
              className="w-full p-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black rounded-md text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 다시 입력하세요"
            />
            {passwordError && (
              <p className="text-sm text-red-500 mt-1">
                입력하셨던 비밀번호와 다릅니다.
              </p>
            )}
          </div>

          {/* 회원가입 버튼 */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
