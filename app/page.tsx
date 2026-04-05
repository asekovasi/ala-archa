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

      {/* Modern Sticky Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <Image
                  src="/Rus.png"
                  alt="Логотип Ала-Арча"
                  width={60}
                  height={60}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Ала-Арча</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
                О парке
              </a>
              <a href="#explore" className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
                Исследовать
              </a>
              <a href="#info" className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200">
                Информация
              </a>
              <button className="px-6 py-2.5 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                Забронировать
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Modern Design */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 pt-20 transition-transform duration-300 ease-out"
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
        <div className="relative z-30 text-center max-w-6xl mx-auto w-full px-4">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 text-white drop-shadow-2xl animate-hero-title">
            Discover Ala-Archa Like Never Before
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed animate-hero-subtitle">
            Исследуйте величественные горы и первозданную природу Кыргызстана
          </p>

          {/* Glassmorphism Search Block */}
          <div className="max-w-6xl mx-auto animate-hero-search">
            <div className="bg-white/30 backdrop-blur-xl rounded-2xl p-10 md:p-12 shadow-2xl border border-white/20 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Поиск маршрутов, достопримечательностей..."
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/30 backdrop-blur-md border border-white/40 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 shadow-lg"
                />
                <button className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                  Искать
                </button>
              </div>
              
              {/* Quick Links */}
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <button className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-md hover:shadow-lg">
                  🏔️ Маршруты
                </button>
                <button className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-md hover:shadow-lg">
                  📸 Фотогалерея
                </button>
                <button className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-md hover:shadow-lg">
                  ℹ️ Информация
                </button>
                <button className="px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-md hover:shadow-lg">
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
      <section id="explore" className="relative py-32 px-4 bg-white/95 backdrop-blur-sm z-20 animate-section-fade">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-20 drop-shadow-lg">
            Откройте для себя Ала-Арча
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Card 1 - Расположение */}
            <div
              ref={(el) => { cardRefs.current[0] = el; }}
              className="animate-card group relative rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-[400px]"
            >
              <Image
                src="/ala.archa 4.jpg"
                alt="Расположение парка"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-4xl mb-4 drop-shadow-lg">🏔️</div>
                <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Расположение</h3>
                <p className="text-white/95 text-sm leading-relaxed mb-4 drop-shadow-md">
                  40 км от Бишкека, северный склон Кыргызского хребта Тянь-Шаня
                </p>
                <button className="self-start px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg">
                  Узнать больше →
                </button>
              </div>
            </div>

            {/* Card 2 - Флора и фауна */}
            <div
              ref={(el) => { cardRefs.current[1] = el; }}
              className="animate-card group relative rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-[400px]"
            >
              <Image
                src="/ala.archa 5.jpg"
                alt="Флора и фауна"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-4xl mb-4 drop-shadow-lg">🌲</div>
                <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Флора и фауна</h3>
                <p className="text-white/95 text-sm leading-relaxed mb-4 drop-shadow-md">
                  Снежные барсы, горные козлы и множество видов редких птиц
                </p>
                <button className="self-start px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg">
                  Исследовать →
                </button>
              </div>
            </div>

            {/* Card 3 - Высота */}
            <div
              ref={(el) => { cardRefs.current[2] = el; }}
              className="animate-card group relative rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-[400px]"
            >
              <Image
                src="/ala.archa 6.1.jpg"
                alt="Высота парка"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-4xl mb-4 drop-shadow-lg">⛰️</div>
                <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Высота</h3>
                <p className="text-white/95 text-sm leading-relaxed mb-4 drop-shadow-md">
                  От 1500 до 4895 метров. Пик Семёнова-Тян-Шанского
                </p>
                <button className="self-start px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg">
                  Подробнее →
                </button>
              </div>
            </div>

            {/* Card 4 - Активный отдых */}
            <div
              ref={(el) => { cardRefs.current[3] = el; }}
              className="animate-card group relative rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-[400px]"
            >
              <Image
                src="/ala.archa 8.jpeg"
                alt="Активный отдых"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-4xl mb-4 drop-shadow-lg">🎒</div>
                <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Активный отдых</h3>
                <p className="text-white/95 text-sm leading-relaxed mb-4 drop-shadow-md">
                  Альпинизм, пешие походы, скалолазание и единение с природой
                </p>
                <button className="self-start px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg">
                  Начать →
                </button>
              </div>
            </div>

            {/* Card 5 - Реки и водопады */}
            <div
              ref={(el) => { cardRefs.current[4] = el; }}
              className="animate-card group relative rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-[400px]"
            >
              <Image
                src="/ala.archa 4.jpg"
                alt="Реки и водопады"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-4xl mb-4 drop-shadow-lg">🌊</div>
                <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Реки и водопады</h3>
                <p className="text-white/95 text-sm leading-relaxed mb-4 drop-shadow-md">
                  Река Ала-Арча с живописными водопадами и кристальной водой
                </p>
                <button className="self-start px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg">
                  Открыть →
                </button>
              </div>
            </div>

            {/* Card 6 - Статус */}
            <div
              ref={(el) => { cardRefs.current[5] = el; }}
              className="animate-card group relative rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer h-[400px]"
            >
              <Image
                src="/ala.archa 5.jpg"
                alt="Статус парка"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="text-4xl mb-4 drop-shadow-lg">⭐</div>
                <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Статус</h3>
                <p className="text-white/95 text-sm leading-relaxed mb-4 drop-shadow-md">
                  Создан в 1976 году. Один из популярнейших заповедников страны
                </p>
                <button className="self-start px-6 py-2 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg">
                  История →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section id="info" className="relative py-32 px-4 bg-gradient-to-b from-white/95 to-gray-50/95 backdrop-blur-sm z-20 animate-section-fade">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-12 md:p-16 border border-gray-200/50 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center drop-shadow-sm">
              История и значение
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
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
      <footer className="relative py-12 px-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto text-center text-gray-300">
          <p className="text-lg">
            © 2024 Кыргызский государственный природный парк «Ала-Арча»
          </p>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/996555123456"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-xl hover:scale-110 hover:bg-green-600 transition-all duration-300 group"
        aria-label="Связаться через WhatsApp"
      >
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Связаться с нами
        </span>
      </a>
    </div>
  );
}
