import { useState, useEffect } from "react";
import "./index.css"; // <-- Важно!
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import ArtistPage from "./components/ArtistPage";
import PhotographerPage from "./components/PhotographerPage";
import AboutPage from "./components/AboutPage";
import { API_URL } from './components/api';

function App() {
  const [userLikes, setUserLikes] = useState({});
  const [currentIP, setCurrentIP] = useState("");
  const [currentPage, setCurrentPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null); // Новое состояние

  // Загрузка пользователя при старте
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser); // Устанавливаем текущего пользователя
    }
  }, []);

  // Загружаем лайки при старте приложения
  useEffect(() => {
    const savedLikes = localStorage.getItem("userLikes");
    if (savedLikes) {
      try {
        const parsedLikes = JSON.parse(savedLikes);
        setUserLikes(parsedLikes);
        console.log("Загружены лайки:", parsedLikes); // Добавь лог
      } catch (error) {
        console.error("Ошибка парсинга лайков:", error);
      }
    }
  }, []);

  // Сохраняем лайки при изменении
  useEffect(() => {
    localStorage.setItem("userLikes", JSON.stringify(userLikes));
  }, [userLikes]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://vk.com/js/api/openapi.js?169";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Получаем текущий IP при старте приложения
  useEffect(() => {
    fetch(`${API_URL}/api/ip/`) // Теперь интерполяция работает
      .then((response) => response.json())
      .then((data) => {
        const ip = data.ip;
        setCurrentIP(ip);
        console.log("IP:", ip);
      })
      .catch((error) => console.error("Ошибка получения IP:", error));
  }, []);

  return (
    <div className="App">
      <Navbar
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === "artist" && (
        <ArtistPage
          userLikes={userLikes}
          setUserLikes={setUserLikes}
          key="artist-page"
          currentUser={currentUser}
          currentIP={currentIP}
        />
      )}
      {currentPage === "photographer" && (
        <PhotographerPage
          userLikes={userLikes}
          setUserLikes={setUserLikes}
          currentUser={currentUser}
          key="photographer-page"
          currentIP={currentIP}
        />
      )}
      {currentPage === "about" && <AboutPage />}
    </div>
  );
}

export default App;
