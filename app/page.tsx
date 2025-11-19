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
    '/ala.archa 8.jpeg',
    '/ala.archa 3.jpg',
    '/ala.archa 1.jpeg'
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

      {/* Hero Section with 3D Effect */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Image Slider */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-30 text-center max-w-6xl mx-auto animate-slide-up">
          <h1 className="text-7xl md:text-9xl font-bold mb-6 drop-shadow-2xl transform-gpu">
            <span className="inline-block animate-float bg-clip-text text-transparent" style={{
              backgroundImage: 'linear-gradient(to right, rgb(34, 197, 94), rgb(22, 163, 74))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '0.05em',
              fontWeight: 700
            }}>
              АЛА-АРЧА
            </span>
          </h1>
          <p className="text-2xl md:text-4xl text-blue-100 mb-8 font-light tracking-wide">
            Кыргызский Государственный природный парк
          </p>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Уникальный уголок природы в сердце Тянь-Шаня
          </p>
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
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-white mb-20 animate-fade-in drop-shadow-2xl">
            О парке
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div
              ref={(el) => { cardRefs.current[0] = el; }}
              className="card-3d bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-105"
            >
              <div className="text-5xl mb-4">🏔️</div>
              <h3 className="text-2xl font-bold text-white mb-4">Расположение</h3>
              <p className="text-blue-100 leading-relaxed">
                Парк расположен в Кыргызстане, в 40 км к югу от Бишкека, в ущелье Ала-Арча на северном склоне Кыргызского хребта Тянь-Шаня.
              </p>
            </div>

            {/* Card 2 */}
            <div
              ref={(el) => { cardRefs.current[1] = el; }}
              className="card-3d bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-105"
            >
              <div className="text-5xl mb-4">🌲</div>
              <h3 className="text-2xl font-bold text-white mb-4">Флора и фауна</h3>
              <p className="text-blue-100 leading-relaxed">
                Парк славится разнообразием растительного и животного мира. Здесь обитают снежные барсы, горные козлы и множество видов птиц.
              </p>
            </div>

            {/* Card 3 */}
            <div
              ref={(el) => { cardRefs.current[2] = el; }}
              className="card-3d bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-105"
            >
              <div className="text-5xl mb-4">⛰️</div>
              <h3 className="text-2xl font-bold text-white mb-4">Высота</h3>
              <p className="text-blue-100 leading-relaxed">
                Высота парка варьируется от 1500 до 4895 метров над уровнем моря. Самая высокая точка — пик Семёнова-Тян-Шанского.
              </p>
            </div>

            {/* Card 4 */}
            <div
              ref={(el) => { cardRefs.current[3] = el; }}
              className="card-3d bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-105"
            >
              <div className="text-5xl mb-4">🎒</div>
              <h3 className="text-2xl font-bold text-white mb-4">Активный отдых</h3>
              <p className="text-blue-100 leading-relaxed">
                Парк предлагает множество возможностей для альпинизма, пеших походов, скалолазания и наслаждения природой.
              </p>
            </div>

            {/* Card 5 */}
            <div
              ref={(el) => { cardRefs.current[4] = el; }}
              className="card-3d bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-105"
            >
              <div className="text-5xl mb-4">🌊</div>
              <h3 className="text-2xl font-bold text-white mb-4">Реки и водопады</h3>
              <p className="text-blue-100 leading-relaxed">
                По территории парка протекает река Ала-Арча с множеством живописных водопадов и кристально чистой водой.
              </p>
            </div>

            {/* Card 6 */}
            <div
              ref={(el) => { cardRefs.current[5] = el; }}
              className="card-3d bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-105"
            >
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-white mb-4">Статус</h3>
              <p className="text-blue-100 leading-relaxed">
                Парк был создан в 1976 году и является одним из самых популярных природных заповедников Кыргызстана.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="relative py-32 px-4 bg-transparent backdrop-blur-sm z-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              История и значение
            </h2>
            <div className="space-y-6 text-blue-100 text-lg leading-relaxed">
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
