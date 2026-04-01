import React, { useState } from 'react';

// Sanatan Dharma themed chapter data
const CHAPTERS = [
  {
    id: '1.1',
    theme: 'Module 1: Discover Your “Inner Ravana”',
    title: 'Objective: Speak to Win',
    subtitle: 'Awaken the warrior within through expression.',
    content: 'In this module, you will learn to understand your weaknesses and build the courage to overcome them.',
    bullets: [
      'Build communication & public speaking skills',
      'Encourage self-reflection and expression',
      'Connect ancient festival values with real-life behavior'
    ],
    type: 'intro'
  },
  {
    id: '1.2',
    theme: 'Module 1: Discover Your “Inner Ravana”',
    title: 'Who is Ravana?',
    subtitle: 'The 10 Heads of Negativity',
    content: 'Ravana had 10 heads, each representing a negative human trait. Why do we burn his effigy on Dussehra? To symbolically burn these bad habits inside us.',
    images: [
      'https://login.skillizee.io/s/articles/69c6263b13fa31326128eba9/images/image-20260327142618-1.jpeg',
      'https://login.skillizee.io/s/articles/69c6263b13fa31326128eba9/images/image-20260327142618-2.jpeg'
    ],
    items: [
      { num: 1, title: 'Anger', desc: 'Getting upset quickly and losing control' },
      { num: 2, title: 'Ego', desc: 'Thinking "I am always right"' },
      { num: 3, title: 'Jealousy', desc: 'Feeling unhappy at others success' },
      { num: 4, title: 'Laziness', desc: 'Not wanting to try' },
      { num: 5, title: 'Greed', desc: 'Never being satisfied' },
      { num: 6, title: 'Dishonesty', desc: 'Lying or deceiving' },
      { num: 7, title: 'Hatred', desc: 'Wishing bad for others' },
      { num: 8, title: 'Fear', desc: 'Being too scared to speak up' },
      { num: 9, title: 'Lack of Focus', desc: 'Getting distracted easily' },
      { num: 10, title: 'Self-Doubt', desc: 'Not believing in yourself' }
    ],
    type: 'grid'
  },
  {
    id: '1.3',
    theme: 'Module 1: Discover Your “Inner Ravana”',
    title: 'Activity: My 3 Inner Ravanas',
    subtitle: 'Identify your demons (10 mins)',
    content: 'Think deeply and write down the 3 bad habits you want to improve. Be honest with yourself.',
    bullets: [
      'Example: Procrastination',
      'Example: Fear of speaking',
      'Example: Getting angry easily'
    ],
    extra: 'Sentence starters to help you:\n"One thing I want to improve is..."\n"Sometimes I struggle with..."',
    type: 'activity'
  },
  {
    id: '1.4',
    theme: 'Module 1: Discover Your “Inner Ravana”',
    title: 'Test Your Knowledge',
    subtitle: 'Dussehra Quiz',
    link: 'https://www.youtube.com/shorts/PU-j2c2oUJ8?feature=share',
    questions: [
      { q: '1. What does Dussehra symbolize?', options: ['Start of winter', 'Victory of good over evil', 'Harvest season', 'New Year'], ans: 1 },
      { q: '2. Which demon is burned on Dussehra?', options: ['Ravana', 'Kansa', 'Hiranyakashyap', 'Bali'], ans: 0 },
      { q: '3. Which goddess defeated Mahishasura?', options: ['Lakshmi', 'Saraswati', 'Durga', 'Parvati'], ans: 2 }
    ],
    type: 'quiz'
  },
  {
    id: '2.1',
    theme: 'Module 2: Speak Like a Hero',
    title: 'Activity: Ram vs Ravana – My Story',
    subtitle: 'Present your battle in class.',
    images: [
      'https://login.skillizee.io/s/articles/69c6263b13fa31326128eba9/images/image-20260327142618-4.png',
      'https://login.skillizee.io/s/articles/69c6263b13fa31326128eba9/images/image-20260327142618-5.jpeg'
    ],
    bullets: [
      '1. "My Ravana is..." (Identify weakness)',
      '2. "It affects me by..." (Acknowledge impact)',
      '3. "My Ram will defeat it by..." (Provide solution)'
    ],
    extra: 'Example:\n"My Ravana is fear of speaking. It stops me from answering in class. My Ram is practice. I will speak at least once every day."',
    type: 'activity'
  },
  {
    id: '2.2',
    theme: 'Module 2: Speak Like a Hero',
    title: 'Victory Circle: Burn Your Ravana',
    subtitle: 'A symbolic ritual to let go.',
    images: [
      'https://login.skillizee.io/s/articles/69c6263b13fa31326128eba9/images/image-20260327142618-6.jpeg'
    ],
    bullets: [
      'Write one bad habit on a piece of paper',
      'Tear it up or throw it in the "Ravana Box"',
      'Say aloud with confidence: "I will defeat [Habit]!"'
    ],
    type: 'activity'
  },
  {
    id: '2.3',
    theme: 'Conclusion',
    title: 'Reflection & Growth',
    subtitle: 'Why This Activity Works',
    content: 'Self-awareness is the first step to victory. By acknowledging our faults, we take away their power.',
    bullets: [
      'How did you feel speaking about yourself?',
      'What action will you take starting today?',
      'Who is your "Ram" (the habit, skill, or person helping you grow)?'
    ],
    type: 'reflection'
  }
];

export default function ContentOverlay() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});

  const goNext = () => {
    if (currentIdx < CHAPTERS.length - 1) setCurrentIdx(c => c + 1);
  };

  const goPrev = () => {
    if (currentIdx > 0) setCurrentIdx(c => c - 1);
  };

  const handleQuizAnswer = (qIdx, optIdx) => {
    setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx });
  };

  const chapter = CHAPTERS[currentIdx];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none overflow-hidden p-4 md:p-8">
      {/* Centered Floating Container */}
      <div className="w-full max-w-[1000px] mx-auto h-auto max-h-[90vh] flex flex-col pointer-events-auto relative">
        
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#2c1002]/95 to-[#1a0b02]/95 backdrop-blur-2xl border-2 border-orange-500/40 rounded-t-[32px] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] shrink-0 gap-4">
          <button 
            onClick={goPrev} 
            disabled={currentIdx === 0}
            className="px-5 md:px-8 py-3 rounded-2xl font-black transition-all text-orange-200 border-2 border-transparent hover:border-orange-500/50 hover:bg-orange-500/20 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:border-transparent text-sm md:text-base uppercase tracking-wider"
          >
            ← Back
          </button>
          
          <div className="text-center flex-1">
            <span className="text-orange-400 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs block mb-3 drop-shadow-md">
              {chapter.id.startsWith('1.') ? 'Phase 1' : 'Phase 2'} • Chapter {chapter.id}
            </span>
            <div className="flex gap-2.5 justify-center flex-wrap">
              {CHAPTERS.map((c, i) => (
                <div 
                  key={c.id} 
                  className={`h-2 md:h-2.5 rounded-full transition-all duration-700 ease-out ${i === currentIdx ? 'w-8 md:w-12 bg-gradient-to-r from-yellow-300 to-orange-500 shadow-[0_0_15px_#F95D00]' : 'w-2.5 bg-orange-900/40'}`} 
                />
              ))}
            </div>
          </div>

          <button 
            onClick={goNext} 
            disabled={currentIdx === CHAPTERS.length - 1}
            className="px-5 md:px-8 py-3 rounded-2xl font-black flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-500 hover:to-red-500 shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.7)] disabled:opacity-20 transition-all text-sm md:text-base uppercase tracking-wider disabled:hover:scale-100 hover:scale-105"
          >
            Next →
          </button>
        </div>

        {/* Main Card Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar rounded-b-[32px] border-x-2 border-b-2 border-orange-500/20 bg-gradient-to-br from-[#120500]/95 via-[#230900]/95 to-[#1a0500]/95 backdrop-blur-[50px] shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative">
            
            {/* Sanatan Pattern Decoration Background */}
            <div className="absolute top-0 right-0 opacity-[0.04] pointer-events-none transform translate-x-1/4 -translate-y-1/4">
              <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="#FFD700" strokeWidth="2">
                <circle cx="50" cy="50" r="40" />
                <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" />
                <circle cx="50" cy="50" r="28" />
              </svg>
            </div>
            {/* Soft Glow */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-orange-600/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            
            <div className="relative z-10 w-full max-w-[850px] mx-auto py-8 lg:py-12 px-6 lg:px-12 flex flex-col items-center text-center">
              {chapter.theme && (
                <div className="inline-block relative mb-6">
                  <span className="absolute top-1/2 -left-12 w-8 h-[2px] bg-gradient-to-r from-transparent to-yellow-500/50"></span>
                  <h2 className="text-yellow-500 font-black tracking-[0.25em] uppercase text-xs md:text-sm drop-shadow-lg">
                    {chapter.theme}
                  </h2>
                  <span className="absolute top-1/2 -right-12 w-8 h-[2px] bg-gradient-to-l from-transparent to-yellow-500/50"></span>
                </div>
              )}
              {chapter.title && <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#FFEDB3] via-[#FFB800] to-[#FF8A00] mb-6 leading-[1.1] pb-2 drop-shadow-[0_0_15px_rgba(255,184,0,0.3)]">{chapter.title}</h3>}
              {chapter.subtitle && <h4 className="text-xl md:text-3xl font-bold text-orange-200/90 mb-10 pb-8 border-b-2 border-orange-500/30 w-3/4 mx-auto">{chapter.subtitle}</h4>}

              {chapter.content && <p className="text-xl md:text-2xl font-medium text-orange-50/95 mb-12 leading-relaxed max-w-4xl mx-auto drop-shadow-md">{chapter.content}</p>}

              {chapter.images && chapter.images.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-8 mb-12 w-full justify-center">
                  {chapter.images.map((img, idx) => (
                    <img key={idx} src={img} alt="" className="rounded-[24px] shadow-[0_15px_30px_rgba(0,0,0,0.6)] object-cover flex-1 w-full border-2 border-orange-500/40 max-h-72 object-center hover:scale-[1.03] hover:border-orange-400 transition-all duration-500" />
                  ))}
                </div>
              )}

              {chapter.link && (
                <a href={chapter.link} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-gradient-to-r from-orange-600/30 to-red-600/30 border-2 border-orange-500 text-orange-100 font-black py-4 px-10 rounded-[20px] mb-12 hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_30px_rgba(249,93,0,0.3)] hover:shadow-[0_0_50px_rgba(249,93,0,0.6)] text-xl gap-4 hover:scale-105">
                  <span className="text-3xl">📽</span> WATCH THEME VIDEO
                </a>
              )}

              {chapter.bullets && chapter.bullets.length > 0 && (
                <ul className="space-y-4 mb-12 w-full text-left max-w-3xl mx-auto">
                  {chapter.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-6 bg-gradient-to-r from-orange-950/80 to-[#2c0e01]/80 p-5 md:p-7 rounded-[24px] border-l-4 border-l-orange-500 border-y border-r border-orange-500/10 hover:bg-[#3d1200]/80 transition-colors shadow-lg">
                      <span className="text-yellow-400 text-3xl font-serif drop-shadow-[0_0_12px_rgba(250,204,21,0.6)] shrink-0">ॐ</span>
                      <span className="text-orange-50 font-bold text-lg md:text-xl font-['Outfit'] leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {chapter.type === 'grid' && chapter.items && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 w-full">
                  {chapter.items.map((item) => (
                    <div key={item.num} className="bg-gradient-to-br from-[#2a0c01]/90 to-[#1a0500]/90 rounded-[24px] p-6 border-2 border-orange-900/50 flex items-center text-left gap-6 hover:border-orange-500/80 transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(0,0,0,0.4)] group">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-700 text-white flex items-center justify-center font-black text-2xl md:text-3xl shrink-0 shadow-[0_0_20px_rgba(255,80,0,0.5)] border-2 border-orange-400/50 group-hover:scale-110 transition-transform">
                        {item.num}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-orange-200 text-xl md:text-2xl mb-1">{item.title}</h4>
                        <p className="text-orange-100/70 font-semibold text-sm md:text-base leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {chapter.type === 'quiz' && chapter.questions && (
                <div className="space-y-8 mt-4 w-full max-w-4xl mx-auto">
                  {chapter.questions.map((q, qIdx) => {
                    const selected = quizAnswers[qIdx];
                    const isAnswered = selected !== undefined;
                    
                    return (
                      <div key={qIdx} className="bg-[#140600]/80 rounded-[32px] p-8 md:p-10 border-2 border-orange-500/20 shadow-inner">
                        <p className="font-black text-2xl md:text-3xl text-[#FFD700] mb-8 text-center drop-shadow-md">{q.q}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {q.options.map((opt, optIdx) => {
                            const isCorrect = isAnswered && optIdx === q.ans;
                            const isWrongSelection = isAnswered && selected === optIdx && optIdx !== q.ans;
                            
                            let btnClass = "bg-gradient-to-b from-[#2a0e02] to-[#170600] border-orange-900 text-orange-200 hover:border-orange-500 hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:-translate-y-1";
                            if (isCorrect) btnClass = "bg-gradient-to-b from-green-600/60 to-green-800/60 border-green-500 text-green-50 shadow-[0_0_30px_rgba(34,197,94,0.5)] scale-[1.02]";
                            if (isWrongSelection) btnClass = "bg-gradient-to-b from-red-800/60 to-red-950/60 border-red-500 text-red-200 opacity-80";

                            return (
                              <button 
                                key={optIdx} 
                                disabled={isAnswered}
                                onClick={() => handleQuizAnswer(qIdx, optIdx)}
                                className={`px-6 py-5 rounded-[20px] border-2 font-bold transition-all text-center text-lg md:text-xl ${btnClass}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {chapter.extra && (
                <div className="bg-gradient-to-r from-orange-600/30 via-orange-700/20 to-transparent border-l-[8px] border-orange-500 rounded-r-[32px] p-8 md:p-10 mt-12 w-full max-w-4xl whitespace-pre-wrap text-xl md:text-2xl font-semibold text-orange-200 italic shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none transform translate-x-1/4 -translate-y-1/4 scale-[2]">
                    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="#FFD700" strokeWidth="2">
                      <circle cx="50" cy="50" r="40" />
                      <circle cx="50" cy="50" r="28" />
                    </svg>
                  </div>
                  <span className="relative z-10 block leading-relaxed">{chapter.extra}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
