import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { API_URL } from './api';

const AddPhotoModal = ({ isOpen, onClose }) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null); // Ссылка на input type="file"

  // Обработчик выбора файла через проводник
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setError("");
    } else {
      setError("Выберите корректный файл изображения");
    }
  };

  // Обработчик вставки изображения
  const handleImagePaste = (e) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const blob = item.getAsFile();
        const file = new File([blob], "pasted-image.jpg", { type: blob.type });
        setImage(file);
        setError("");
        return;
      }
    }
    setError("В буфере обмена нет изображения");
  };

  // Открытие проводника при клике на область
  const handleDropAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return setError("Изображение обязательно");

    try {
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("image", image);
      formData.append("description", description);

      const response = await fetch(`${API_URL}/api/photos/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        //const newPhoto = await response.json();
        onClose();
      } else {
        setError("Ошибка загрузки: " + response.statusText);
      }
    } catch (error) {
      setError("Ошибка сети: " + error.message);
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Добавить фото</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Фото</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-500 transition"
              onPaste={handleImagePaste}
              onClick={handleDropAreaClick} // <-- Добавлено
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="max-w-full h-48 object-contain"
                />
              ) : (
                <div className="text-gray-500">
                  Вставьте изображение через Ctrl+V или щелкните для выбора
                  файла
                </div>
              )}
              {/* Скрытый input для выбора файла */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Описание</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
          >
            Загрузить
          </button>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default AddPhotoModal;
