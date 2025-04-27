// Modal.js
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { API_URL } from './api';

const Modal = ({
  key,
  isOpen,
  onClose,
  post,
  user,
  userLikes,
  setUserLikes,
  setPosts,
}) => {
  // ВСЕ ХУКИ ДО УСЛОВНЫХ ВОЗВРАТОВ
  useEffect(() => {
    if (!isOpen || !post) return; // Выходим, если модал закрыт или нет поста

    const containerId = `vk_comments_${post.id}`;
    const container = document.getElementById(containerId);

    if (container && typeof VK !== "undefined") {
      // eslint-disable-next-line no-undef
      VK.Widgets.Comments(containerId, {
        pageUrl: post.image.toString(), // Уникальный ID поста
        comment_id: post.id.toString(), // Уникальный ID комментариев

        id: 1,

        // ДОПОЛНИТЕЛЬНЫЕ ОПЦИИ
        width: 1000, // Ширина виджета
        height: 1500,
        limit: 10, // Количество комментариев
        attach: "*", // Включить все типы вложений
        //autoPublish: 1,
        norealtime: 0, // Включить реальное время

        // Дополнительные настройки по умолчанию
        openPopupOnEvent: true, // Открывать попап при событиях
        placeholder: "Напишите комментарий...", // Место для текста
      });
    }

    return () => {
      if (containerId) {
        // eslint-disable-next-line no-undef
        //VK.Widgets.remove(containerId);
      }
    };
  }, [isOpen, post]); // Зависимости: isOpen и post

  if (!isOpen || !post) return null; // Защита от undefined

  const handleLike = async () => {
    try {
      const postId = post.id;
      const isLiked = userLikes[postId];
      const method = isLiked ? "POST" : "POST"; // Исправлен метод

      const response = await fetch(`${API_URL}/api/photos/${postId}/like/`, {
        method,
      });

      if (response.ok) {
        const data = await response.json();
        const updatedPost = data.photo;

        setPosts((prevPosts) =>
          prevPosts.map((p) => (p.id === postId ? updatedPost : p))
        );

        setUserLikes((prev) => ({
          ...prev,
          [postId]: !prev[postId],
        }));
      }
    } catch (error) {
      console.error("Ошибка лайка:", error);
    }
  };

  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg max-w-8xl max-h-screen overflow-auto p-4"
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Грид-контейнер для двух колонок */}
        <div className="grid gap-4">
          {/* Левая колонка: Изображение */}
          <div className="flex-shrink-0">
            <img
              src={post?.image}
              alt={post?.description || "Post image"}
              className="w-full h-auto object-contain max-h-[calc(90vh-100px)]"
            />
          </div>

          {/* Правая колонка: Информация */}
          <div className="flex flex-col space-y-4">
            {/* Заголовок с именем пользователя */}
            <div className="flex items-center mb-4">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-semibold">
                {user ? `${user.first_name} ${user.last_name}` : "Загрузка..."}
              </span>
            </div>

            {/* Описание */}
            <p className="text-gray-700">{post.description}</p>
            <p className="text-gray-700">{post.created_at}</p>

            {/* Лайки и кнопки */}
            <div className="flex items-center mt-auto">
              {/* Лайки */}
              <div className="flex items-center mr-4">
                <i
                  className={`fa-heart text-xl cursor-pointer hover:text-red-500 transition ${
                    userLikes[post.id] ? "fas like-animation" : "far"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                />
                <span className="ml-2 font-semibold">{post.likes_count}</span>
              </div>

              {/* Кнопки для соцсетей */}
              <div className="flex space-x-2">
                {/* ... остальные кнопки ... */}
              </div>
            </div>
            {/* Виджет комментариев */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Комментарии
              </h2>
              <div
                onClick={(e) => e.stopPropagation()}
                id={`vk_comments_${post.id}`}
                className="vk-comments-container"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
