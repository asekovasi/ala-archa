'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-blue-800 to-indigo-900 overflow-hidden">
      {/* Logo */}
      <div className="fixed top-8 left-8 z-50 animate-fade-in">
        <div className="bg-white/10 backdrop-blur-md rounded-full p-3 shadow-2xl border border-white/20 hover:scale-110 transition-transform duration-300">
          <Image
            src="/Rus.png"
            alt="Логотип Ала-Арча"
            width={64}
            height={64}
            className="rounded-full"
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
          {/* Placeholder for mountain image - replace with actual image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 animate-zoom-in"
            style={{
              backgroundImage: "url('/ala-archa-mountains.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Fallback gradient if image is not available */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/40 via-teal-600/30 to-cyan-600/40"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-sky-900/90 via-blue-800/70 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto animate-slide-up">
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 drop-shadow-2xl transform-gpu">
            <span className="inline-block animate-float">Ала-Арча</span>
          </h1>
          <p className="text-2xl md:text-4xl text-blue-100 mb-8 font-light tracking-wide">
            Кыргызский государственный природный парк
          </p>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Уникальный уголок природы в сердце Тянь-Шаня
          </p>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      </section>

      {/* Information Sections */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-indigo-900 to-sky-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center text-white mb-20 animate-fade-in">
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
      <section className="relative py-32 px-4 bg-gradient-to-b from-sky-900 to-indigo-900">
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
