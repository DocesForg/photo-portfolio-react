import React from "react";

const AboutPage = ({ setCurrentPage }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Сюда перенеси всю хуйню из твоего HTML навбара */}
      {/* Замени onclick на setCurrentPage('home') и т.д. */}
      <div id="about-page">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">О создателях</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div class="bg-white rounded-xl shadow-md overflow-hidden">
                    <div class="h-64 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
                        <i class="fas fa-palette text-white text-7xl"></i>
                    </div>
                    <div class="p-6">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">Виталий Мальцев</h2>
                        <h3 class="text-lg text-indigo-600 mb-4">Художник-визуалист</h3>
                        <p class="text-gray-600 mb-4">Художник, чья специализация охватывает создание артов по популярным франшизам, а также работы в собственном, узнаваемом стиле. Он тщательно исследует все нюансы искусства в своих творениях.</p>
                        <div class="flex space-x-4">
                            <a href="https://vk.com/docesforg" class="text-blue-500 hover:text-blue-700"><i class="fab fa-vk text-xl"></i></a>
                            <a href="https://github.com/DocesForg" class="text-blue-800 hover:text-blue-900"><i class="fab fa-github text-xl"></i></a>
                            <a href="https://t.me/docesforg" class="text-blue-500 hover:text-blue-700"><i class="fab fa-telegram text-xl"></i></a>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-xl shadow-md overflow-hidden">
                    <div class="h-64 bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 flex items-center justify-center">
                        <i class="fas fa-camera text-white text-7xl"></i>
                    </div>
                    <div class="p-6">
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">Игорь Мусхажиев</h2>
                        <h3 class="text-lg text-indigo-600 mb-4">Фотограф</h3>
                        <p class="text-gray-600 mb-4">Фотограф-документалист и пейзажист, страстно стремящийся запечатлеть подлинные моменты и красоту нетронутой природы и настоящие человеческие эмоции.</p>
                        <div class="flex space-x-4">
                            <a href="https://vk.com/igoremys" class="text-blue-500 hover:text-blue-700"><i class="fab fa-vk text-xl"></i></a>
                            <a href="https://github.com/Igoremys" class="text-blue-800 hover:text-blue-900"><i class="fab fa-github text-xl"></i></a>
							<a href="https://t.me/igoremys" class="text-blue-500 hover:text-blue-700"><i class="fab fa-telegram text-xl"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Наша история</h2>
                <p class="text-gray-600 mb-6">Виталий и Игорь познакомились во время художественной выставки в 2023 году, где Игорь фотографировал мероприятие. Осознав синергию их творческих взглядов, они начали сотрудничать в проектах, в которых новаторским образом сочетаются живопись и фотография.</p>
                
                <h3 class="text-xl font-semibold text-gray-800 mb-3">Совместные проекты</h3>
                <ul class="list-disc pl-5 text-gray-600 space-y-2 mb-6">
                    <li>"Проект Ants" - 2024 (Разработка графики для игры про муравьев)</li>
                    <li>"Реставрация и создание промо для Колледжа Связи" - 2024 (Обновление дизайна колледжа и создание промо роликов)</li>
                    <li>"Стилизирующий AI фильтр" - 2025 (Реализация стилизующего фотофильтра на основе нейронных сетей, обученных с использованием LoRA.)</li>
                </ul>
                
                
            </div>
      </div>
    </main>
  );
};

export default AboutPage;
