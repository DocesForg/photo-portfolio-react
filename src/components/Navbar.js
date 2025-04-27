import React, { useState, useEffect } from "react"; // Добавь useEffect
import AuthModal from "./AuthModal";
import AddPhotoModal from "./AddPhotoModal";
import { API_URL } from './api';

const Navbar = ({ setCurrentPage, currentUser, setCurrentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null); // Данные пользователя
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Статус авторизации
  const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false); // Статус открытия модального окна для добавления фотографии

  // Загрузка данных при старте
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Функция для обработки авторизации
  // Отправляем запрос на сервер для авторизации
  // Если авторизация успешна, сохраняем данные пользователя и статус авторизации
  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data); // Сохраняем ВСЕ данные пользователя
        setIsAuthenticated(true);
        localStorage.setItem("authToken", data.access);
        localStorage.setItem("user", JSON.stringify(data)); // Сохраняем данные пользователя
        setIsModalOpen(false);
        setCurrentUser(data);
      }
    } catch (error) {
      console.error("Ошибка авторизации:", error);
    }
  };

  // Добавьте функцию logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* Сюда перенеси всю хуйню из твоего HTML навбара */}
      {/* Замени onclick на setCurrentPage('home') и т.д. */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/#" className="flex items-center">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mr-3">
                <i class="fas fa-palette text-white text-lg"></i>
              </div>
              <span
                onClick={() => setCurrentPage("home")}
                class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              >
                Art & Lens
              </span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/#"
              className="nav-link text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium relative"
              onClick={() => setCurrentPage("home")}
            >
              Главная
            </a>
            <a
              href="/#"
              className="nav-link text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium relative"
              onClick={() => setCurrentPage("artist")}
            >
              Художник
            </a>
            <a
              href="/#"
              className="nav-link text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium relative"
              onClick={() => setCurrentPage("photographer")}
            >
              Фотограф
            </a>
            <a
              href="/#"
              className="nav-link text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium relative"
              onClick={() => setCurrentPage("about")}
            >
              О нас
            </a>

            {/* Кнопка входа или профиль */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2">
                <img
                  src={
                    user?.avatar
                      ? `${API_URL}${user.avatar}`
                      : "https://placehold.co/60x60/EFEFEF/666666?text=No+Avatar&font=noto&fontSize=14"
                  }
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-700 font-medium">
                  {`${user.first_name} ${user.last_name}`}
                </span>
                <button
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                  onClick={() => setIsAddPhotoModalOpen(true)}
                >
                  <i className="fas fa-plus mr-2"></i>Добавить фотографию
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <button
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                onClick={() => setIsModalOpen(true)}
              >
                <i className="fas fa-user-circle mr-2"></i>Войти
              </button>
            )}

            <AuthModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              <div id="login-form">
                <div class="mb-4">
                  <label class="block text-gray-700 mb-2" for="login-email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  ></input>
                </div>
                <div class="mb-6">
                  <label class="block text-gray-700 mb-2" for="login-password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  ></input>
                </div>
                <button
                  onclick="login()"
                  class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition mb-4"
                >
                  Login
                </button>
              </div>
            </AuthModal>
          </div>
          <div className="md:hidden">
            <button className="text-gray-700 focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div id="mobile-menu" class="md:hidden hidden bg-white">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/#"
            class="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            onClick={() => setCurrentPage("home")}
          >
            Home
          </a>
          <a
            href="/#"
            class="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            onClick={() => setCurrentPage("artist")}
          >
            Artist
          </a>
          <a
            href="/#"
            class="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            onClick={() => setCurrentPage("photographer")}
          >
            Photographer
          </a>
          <a
            href="/#"
            class="block px-3 py-2 text-gray-700 hover:text-indigo-600"
            onClick={() => setCurrentPage("about")}
          >
            About
          </a>
          <button
            class="block w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600"
            onclick="toggleAuthModal()"
          >
            Login
          </button>
        </div>
      </div>

      {/* Модальное окно авторизации */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogin={handleLogin}
      />

      <AddPhotoModal
        isOpen={isAddPhotoModalOpen}
        onClose={() => setIsAddPhotoModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
