import React, { useEffect, useState, useMemo } from "react";
import Modal from "./Modal";
import { API_URL } from './api';


const sortOptions = {
  "date-desc": (a, b) => new Date(b.created_at) - new Date(a.created_at),
  "date-asc": (a, b) => new Date(a.created_at) - new Date(b.created_at),
  "likes-desc": (a, b) => b.likes_count - a.likes_count,
  "likes-asc": (a, b) => a.likes_count - b.likes_count,
};

const GalleryPage = ({
  endpoint,
  pageTitle,
  addButtonText,
  userLikes = {}, // Добавлено
  setUserLikes, // Добавлено
  currentUser, // Принимаем текущего пользователя
  currentIP, // Принимаем IP из App.js
}) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Для открытого поста

  //const [vkScriptLoaded, setVkScriptLoaded] = useState(false); // Статус загрузки скрипта VK

  //const [isImageOpen, setIsImageOpen] = useState(false);
  //const [selectedImage, setSelectedImage] = useState("");

  const [users, setUsers] = useState({});

  const [sortOption, setSortOption] = useState("date-desc");

  useEffect(() => {
    if (selectedPost) {
      const updatedPost = posts.find((p) => p.id === selectedPost.id);
      setSelectedPost(updatedPost || selectedPost);
    }
  }, [posts, selectedPost]); // Следим за изменением posts и selectedPost

  // Загрузка данных при монтировании
  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        // Загружаем данные пользователей для всех постов
        const userIds = [...new Set(data.map((post) => post.user_id))]; // Уникальные user_id
        userIds.forEach((userId) => fetchUser(userId));
      })
      .catch((error) => console.error("Ошибка загрузки данных:", error));
  }, [endpoint]);

  // Функция для загрузки данных пользователя
  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/api/user/${userId}/`);
      if (response.ok) {
        const userData = await response.json();
        setUsers((prev) => ({
          ...prev,
          [userId]: userData, // Сохраняем данные пользователя по user_id
        }));
      }
    } catch (error) {
      console.error(
        `Ошибка загрузки данных пользователя с ID ${userId}:`,
        error
      );
    }
  };

  // Исправление 2: Логирование для отладки
  useEffect(() => {
    console.log("Текущие лайки в ArtistPage:", userLikes); // Добавь лог
  }, [userLikes]);

  const handlePostClick = (post) => {
    setSelectedPost(posts.find((p) => p.id === post.id)); // Ищем актуальный пост
  };

  // Функция обработки лайка
  const handleLike = async (postId) => {
    try {
      const isLiked = userLikes[postId]; // Проверяем, лайкнут ли пост
      const method = isLiked ? "POST" : "POST"; // КЛЮЧЕВОЕ ИЗМЕНЕНИЕ!

      const response = await fetch(`${API_URL}/api/photos/${postId}/like/`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Если нужна авторизация
        },
      });

      if (response.ok) {
        const data = await response.json();
        const updatedPost = data.photo;

        // Обновляем посты
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === postId ? updatedPost : post))
        );

        // Обновляем лайки пользователя
        setUserLikes((prev) => ({
          ...prev,
          [postId]: !prev[postId], // Переключаем состояние
        }));
      } else {
        alert("Ошибка при изменении лайка");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  // Функция удаления поста
  const handleDelete = async (postId) => {
    const confirmed = window.confirm(
      "Вы уверены, что хотите удалить этот пост?"
    );
    if (!confirmed) return;

    const token = localStorage.getItem("authToken");
    const response = await fetch(`${API_URL}/api/photos/${postId}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.status === "Успех") {
        setPosts(posts.filter((post) => post.id !== postId));
      }
    } else {
      const errorData = await response.json();
      alert(errorData.detail || "Ошибка удаления");
    }
  };

  //const handleAddPhoto = (newPhoto) => {
  //  setPosts((prevPosts) => [newPhoto, ...prevPosts]);
  //};

  

  // Мемоизированный отсортированный массив
  const sortedPosts = useMemo(() => {
    if (!posts.length) return [];
    const comparator = sortOptions[sortOption];
    return [...posts].sort(comparator);
  }, [posts, sortOption]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{pageTitle}</h1>
        <select
          id="sort-select"
          className="bg-white p-2 rounded-md border border-gray-300"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="date-desc">По дате (новые)</option>
          <option value="date-asc">По дате (старые)</option>
          <option value="likes-desc">По лайкам (больше)</option>
          <option value="likes-asc">По лайкам (меньше)</option>
        </select>
      </div>

      {/* Instagram-like grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPosts.map((post) => {
          // Получаем данные пользователя
          const user = users[post.user_id];
          return (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Image Section */}
              <img
                src={post.image}
                alt={`Post ${post.id}`}
                className="w-full h-64 object-cover cursor-pointer hover:opacity-90 transition"
                onClick={() => handlePostClick(post)}
              />
              {/* Content Section */}
              <div className="p-4">
                {/* Like and Description */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <i
                      className={`fa-heart text-xl cursor-pointer hover:text-red-500 transition ${
                        post.is_liked_by_ip ? "fas like-animation" : "far"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(post.id);
                      }}
                    />
                    <span className="text-gray-600">{post.likes_count}</span>
                  </div>
                </div>
                {/* Description */}
                <p className="text-gray-700 mb-2">
                  {post.description
                    ? post.description.length > 150
                      ? post.description.slice(0, 150) + "..."
                      : post.description
                    : "Нет описания"}
                </p>
                {/* Username */}
                <p className="text-sm text-gray-500">
                  {user
                    ? `${user.first_name} ${user.last_name}`
                    : "Загрузка..."}
                </p>
                {currentUser &&
                  ((pageTitle === "Художественная галерея" &&
                    post.user_id === currentUser.id) ||
                    (pageTitle === "Фотографии" &&
                      post.user_id === currentUser.id)) && (
                    <button
                      className="text-red-500 hover:text-red-700 mt-2"
                      onClick={() => handleDelete(post.id)}
                    >
                      Удалить пост
                    </button>
                  )}
              </div>
              {/* Уникальный контейнер для каждого поста */}
            </div>
          );
        })}
      </div>

      {/* Модальное окно */}
      <Modal
        key={selectedPost?.id}
        isOpen={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        user={users[selectedPost?.user_id]}
        userLikes={userLikes}
        setUserLikes={setUserLikes}
        setPosts={setPosts}
      />
    </main>
  );
};

export default GalleryPage;
