import React, { useEffect, useState } from "react";
import { API_URL } from './api';

const HomePage = ({ setCurrentPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [artistPosts, setArtistPosts] = useState([]); // Последние работы художника
  const [photographerPosts, setPhotographerPosts] = useState([]); // Последние работы фотографа
  const [statisticsData, setStatisticsData] = useState([]); // Статистика

  useEffect(() => {
    // Загрузка последних работ художника (category_id=0)
    fetch(`${API_URL}/api/photos/?limit=3&format=json`)
      .then((response) => response.json())
      .then((data) => setArtistPosts(data))
      .catch((error) =>
        console.error("Ошибка загрузки работ художника:", error)
      );
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/statistics/?format=json`)
      .then((response) => response.json())
      .then((data) => setStatisticsData(data))
      .catch((error) =>
        console.error("Ошибка загрузки работ художника:", error)
      );
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div id="home-page">
        <section className="hero-gradient rounded-3xl p-8 md:p-12 my-12 text-white overflow-hidden relative">
          <div className="max-w-3xl relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Где искусство встречается с фотографией
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Откройте для себя идеальное сочетание художественного
              самовыражения и фотографического мастерства в нашем совместном
              портфолио.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setCurrentPage("artist")}
                className="bg-white text-indigo-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg"
              >
                Посмотреть картины <i className="fas fa-arrow-right ml-2"></i>
              </button>
              <button
                onClick={() => setCurrentPage("photographer")}
                className="bg-black/20 text-white px-6 py-3 rounded-full font-medium hover:bg-black/30 transition-all border border-white/20"
              >
                Посмотреть фотографии <i className="fas fa-camera ml-2"></i>
              </button>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 opacity-20 z-0">
            <i className="fas fa-palette text-[300px]"></i>
          </div>
        </section>

        <section className="my-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Последние работы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Работы художника */}
            {artistPosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="feature-card bg-white rounded-xl overflow-hidden cursor-pointer"
                onClick={() => {
                  const category =
                    post.category_id === 0 ? "artist" : "photographer";
                  setCurrentPage(category);
                }}
              >
                <div className="h-64 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.description}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-white text-xl font-bold">
                        {post.description
                          ? post.description.length > 50
                            ? post.description.slice(0, 50) + "..."
                            : post.description
                          : ""}
                      </h3>
                      <p className="text-white/80">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="my-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="stats-item p-6 text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {statisticsData.user1_photos}
              </div>
              <div className="text-gray-600">Картин</div>
            </div>
            <div className="stats-item p-6 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {statisticsData.user2_photos}
              </div>
              <div className="text-gray-600">Фотографий</div>
            </div>
            <div className="stats-item p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {statisticsData.total_likes}
              </div>
              <div className="text-gray-600">Лайков</div>
            </div>
          </div>
        </section>

        <section className="my-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Познакомьтесь с Создателями
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="h-64 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center relative">
                <img
                  src="imgs/vit.jpg"
                  alt="Emma Richardson"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover absolute -bottom-16 left-1/2 transform -translate-x-1/2 shadow-lg"
                ></img>
              </div>
              <div className="pt-20 pb-8 px-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  Виталий Мальцев
                </h3>
                <p className="text-indigo-600 mb-4">Художник-визуалист</p>
                <p className="text-gray-600 mb-6">
                  Художник, чья специализация охватывает создание артов по
                  популярным франшизам, а также работы в собственном, узнаваемом
                  стиле. Он тщательно исследует все нюансы искусства в своих
                  творениях.
                </p>
                <button
                  onClick={() => setCurrentPage("artist")}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
                >
                  Посмотреть картины <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="h-64 bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 flex items-center justify-center relative">
                <img
                  src="imgs/igor.jpg"
                  alt="James Carter"
                  className="w-32 h-32 rounded-full border-4 border-white object-cover absolute -bottom-16 left-1/2 transform -translate-x-1/2 shadow-lg"
                ></img>
              </div>
              <div className="pt-20 pb-8 px-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  Игорь Мусхажиев
                </h3>
                <p className="text-indigo-600 mb-4">Фотограф</p>
                <p className="text-gray-600 mb-6">
                  Фотограф-документалист и пейзажист, страстно стремящийся
                  запечатлеть подлинные моменты и красоту нетронутой природы и
                  настоящие человеческие эмоции.
                </p>
                <button
                  onClick={() => setCurrentPage("photographer")}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
                >
                  Посмотреть Фотографии{" "}
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="my-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Что говорят люди
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial-card p-8 rounded-2xl">
              <div className="text-yellow-400 text-2xl mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-gray-600 mb-6">
                "Делала заказ на рисунок меня в стиле аниме Нана. Мое лицо
                просто АНИМЕЛО от счастья"
              </p>
              <div className="flex items-center">
                <img
                  src="imgs/vika.jpg"
                  alt="Sarah Johnson"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                ></img>
                <div>
                  <h4 className="font-bold text-gray-800">Виктория Жигулина</h4>
                  <p className="text-gray-500 text-sm">Чемпион мира по Stardew Valley </p>
                </div>
              </div>
            </div>

            <div className="testimonial-card p-8 rounded-2xl">
              <div className="text-yellow-400 text-2xl mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-gray-600 mb-6">
                "Случайно перепутал данного фотографа с фотографом свадеб и
                корпоративов. Теперь каждая фотография моей свадьбы — как
                произведение искусства!"
              </p>
              <div className="flex items-center">
                <img
                  src="imgs/vasya.jpg"
                  alt="Michael Chen"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                ></img>
                <div>
                  <h4 className="font-bold text-gray-800">Илья Евсеенко</h4>
                  <p className="text-gray-500 text-sm">Примерный семьянин</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card p-8 rounded-2xl">
              <div className="text-yellow-400 text-2xl mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <p className="text-gray-600 mb-6">
                "Заказал себя в образе мага и в пиксельной графике, работа
                понравилась, но художник не ответил мне за время пока искалась
                катка в Валорант."
              </p>
              <div className="flex items-center">
                <img
                  src="imgs/Бенедикт.jpg"
                  alt="Lisa Rodriguez"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                ></img>
                <div>
                  <h4 className="font-bold text-gray-800">Бенедикт</h4>
                  <p className="text-gray-500 text-sm">
                    Профессиональный геймер
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Готовы узнать больше?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к нашему сообществу любителей искусства и
            фотографии. Следите за новостями о новых работах и эксклюзивном
            контенте.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage("artist")}
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg"
            >
              Посмотреть картины
            </button>
            <button
              onClick={() => setCurrentPage("photographer")}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all"
            >
              Посмотреть фотографии
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
