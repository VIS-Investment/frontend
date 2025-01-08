import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 API 주소
  withCredentials: true, // 세션 쿠키를 주고받기 위해 설정
});

export default api;
