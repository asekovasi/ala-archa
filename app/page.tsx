'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/ala.archa 4.jpg',
    '/ala.archa 5.jpg',
    '/ala.archa 6.1.jpg',
    '/ala.archa 8.jpeg'
  ];

  useEffect(() => {
    // Автоматическая смена изображений
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Меняем каждые 5 секунд

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;
        heroRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Fixed Background Layer - always visible behind everything */}
      <div className="fixed inset-0 z-0" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        {images.map((image, index) => (
          <div
            key={`bg-${index}`}
            className={`fixed inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'
            }`}
            style={{ position: 'fixed' }}
          >
            <Image
              src={image}
              alt={`Фон Ала-Арча ${index + 1}`}
              fill
              className="object-cover"
              quality={100}
              priority={index === 0}
              sizes="100vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/5"></div>
          </div>
        ))}
      </div>

      {/* Logo */}
      <div className="fixed top-8 left-8 z-50 animate-fade-in">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-white/20 hover:scale-110 transition-transform duration-300">
        <Image
            src="/Rus.png"
            alt="Логотип Ала-Арча"
            width={120}
            height={120}
            className="object-contain"
          priority
        />
        </div>
      </div>

      {/* Hero Section with Modern Design */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={image}
                  alt={`Ала-Арча ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  quality={100}
                  unoptimized
                />
              </div>
            ))}
          </div>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>
        </div>

        {/* Content */}
        <div className="relative z-30 text-center max-w-6xl mx-auto w-full animate-slide-up px-4">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 text-white drop-shadow-2xl">
            Discover Ala-Archa Like Never Before
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Исследуйте величественные горы и первозданную природу Кыргызстана
          </p>

          {/* Glassmorphism Search Block */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-10 md:p-12 shadow-2xl border border-white/20">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Поиск маршрутов, достопримечательностей..."
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/30 backdrop-blur-md border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
                <button className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Искать
                </button>
              </div>
              
              {/* Quick Links */}
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <button className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm hover:bg-white/30 transition-all duration-300 border border-white/30">
                  🏔️ Маршруты
                </button>
                <button className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm hover:bg-white/30 transition-all duration-300 border border-white/30">
                  📸 Фотогалерея
                </button>
                <button className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm hover:bg-white/30 transition-all duration-300 border border-white/30">
                  ℹ️ Информация
                </button>
                <button className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm hover:bg-white/30 transition-all duration-300 border border-white/30">
                  🎒 Туры
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentImageIndex
                  ? 'w-12 h-2 bg-white'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Показать изображение ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Information Sections */}
      <section className="relative py-32 px-4 bg-transparent backdrop-blur-sm z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-white mb-20 animate-fade-in drop-shadow-2xl">
            Откройте для себя Ала-Арча
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Card 1 - Расположение */}
            <div
              ref={(el) => { cardRefs.current[0] = el; }}
              className="card-3d group relative rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-[400px]"
            >
              <Image
                src="/ala.archa 4.jpg"
                alt="Расположение парка"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-4xl mb-4">🏔️</div>
                <h3 className="text-3xl font-bold text-white mb-3">Расположение</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  40 км от Бишкека, северный склон Кыргызского хребта Тянь-Шаня
                </p>
                <button className="self-start px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all duration-300">
                  Узнать больше →
                </button>
              </div>
            </div>

            {/* Card 2 - Флора и фауна */}
            <div
              ref={(el) => { cardRefs.current[1] = el; }}
              className="card-3d group relative rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-[400px]"
            >
              <Image
                src="/ala.archa 5.jpg"
                alt="Флора и фауна"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-4xl mb-4">🌲</div>
                <h3 className="text-3xl font-bold text-white mb-3">Флора и фауна</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  Снежные барсы, горные козлы и множество видов редких птиц
                </p>
                <button className="self-start px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all duration-300">
                  Исследовать →
                </button>
              </div>
            </div>

            {/* Card 3 - Высота */}
            <div
              ref={(el) => { cardRefs.current[2] = el; }}
              className="card-3d group relative rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-[400px]"
            >
              <Image
                src="/ala.archa 6.1.jpg"
                alt="Высота парка"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-4xl mb-4">⛰️</div>
                <h3 className="text-3xl font-bold text-white mb-3">Высота</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  От 1500 до 4895 метров. Пик Семёнова-Тян-Шанского
                </p>
                <button className="self-start px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all duration-300">
                  Подробнее →
                </button>
              </div>
            </div>

            {/* Card 4 - Активный отдых */}
            <div
              ref={(el) => { cardRefs.current[3] = el; }}
              className="card-3d group relative rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-[400px]"
            >
              <Image
                src="/ala.archa 8.jpeg"
                alt="Активный отдых"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-4xl mb-4">🎒</div>
                <h3 className="text-3xl font-bold text-white mb-3">Активный отдых</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  Альпинизм, пешие походы, скалолазание и единение с природой
                </p>
                <button className="self-start px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all duration-300">
                  Начать →
                </button>
              </div>
            </div>

            {/* Card 5 - Реки и водопады */}
            <div
              ref={(el) => { cardRefs.current[4] = el; }}
              className="card-3d group relative rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-[400px]"
            >
              <Image
                src="/ala.archa 4.jpg"
                alt="Реки и водопады"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-4xl mb-4">🌊</div>
                <h3 className="text-3xl font-bold text-white mb-3">Реки и водопады</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  Река Ала-Арча с живописными водопадами и кристальной водой
                </p>
                <button className="self-start px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all duration-300">
                  Открыть →
                </button>
              </div>
            </div>

            {/* Card 6 - Статус */}
            <div
              ref={(el) => { cardRefs.current[5] = el; }}
              className="card-3d group relative rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-[400px]"
            >
              <Image
                src="/ala.archa 5.jpg"
                alt="Статус парка"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-3xl font-bold text-white mb-3">Статус</h3>
                <p className="text-white/90 text-sm leading-relaxed mb-4">
                  Создан в 1976 году. Один из популярнейших заповедников страны
                </p>
                <button className="self-start px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all duration-300">
                  История →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="relative py-32 px-4 bg-transparent backdrop-blur-sm z-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-12 md:p-16 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
              История и значение
            </h2>
            <div className="space-y-6 text-white/90 text-lg leading-relaxed">
              <p>
                Государственный природный парк «Ала-Арча» — это уникальный природный комплекс, который играет важную роль в сохранении биоразнообразия Кыргызстана. Парк занимает площадь около 19,4 тысяч гектаров и является домом для множества редких и эндемичных видов растений и животных.
              </p>
              <p>
                Название «Ала-Арча» происходит от кыргызского слова «арча» (можжевельник) и «ала» (пёстрый), что отражает разнообразие растительности в парке. Можжевеловые леса являются одной из главных достопримечательностей парка.
              </p>
              <p>
                Парк привлекает туристов со всего мира своими живописными пейзажами, альпинистскими маршрутами различной сложности и возможностью насладиться первозданной природой в непосредственной близости от столицы.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 bg-indigo-900/50 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-white/80">
          <p className="text-lg">
            © 2024 Кыргызский государственный природный парк «Ала-Арча»
          </p>
        </div>
      </footer>
    </div>
  );
}
