import React, { useState, Suspense } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  PlayCircle, 
  Flame, 
  User, 
  Target, 
  BrainCircuit,
  Sparkles,
  ShieldCheck,
  Volume2,
  Book,
  BookOpen
} from 'lucide-react';

const ScrollSequence = ({ frameCount = 180, folderPath = "/frames" }) => {
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');

    const images = [];
    let firstImageLoaded = false;

    // Load frames based on folderPath
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `${folderPath}/ezgif-frame-${paddedIndex}.jpg`;
      img.onload = () => {
        if (!firstImageLoaded && i === 1) {
          firstImageLoaded = true;
          drawImage(img);
        }
      };
      images.push({ index: i, img, loaded: false });
      img.onload = () => {
        images[i - 1].loaded = true;
        if (i === 1) drawImage(img);
      };
    }

    const drawImage = (img) => {
      // Get logical container size (parent bounds)
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    let targetFraction = 0;
    let currentFraction = 0;
    let animationFrameId;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const parentHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const scrollY = Math.max(0, -rect.top);
      const maxScroll = Math.max(1, parentHeight - windowHeight);
      
      targetFraction = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    };

    const renderLoop = () => {
      handleScroll();
      
      // Smooth out the animation using a simple linear interpolation (lerp)
      currentFraction += (targetFraction - currentFraction) * 0.05;

      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(currentFraction * frameCount)
      );

      if (images[frameIndex] && images[frameIndex].loaded) {
        drawImage(images[frameIndex].img);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [frameCount]);

  return (
    <div ref={containerRef} className="[&_*]:!p-0 !p-0 !m-0 !top-0 relative w-[100vw] left-1/2 -translate-x-1/2 h-[400vh] mb-8 sm:mb-16 -mt-[10px]" style={{ zIndex: 10 }}>
      {/* Sticky container that stays in view while you scroll through the 400vh */}
      <div className="sticky top-0 w-full h-[100vh] overflow-hidden bg-[#050100] flex items-center justify-center border-b border-white/10 shadow-2xl !p-0 !m-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover scale-105 block" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0301] pointer-events-none" />
        <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none z-20">
          <motion.div
            initial={{ opacity: 0.5, y: -10 }}
            animate={{ opacity: 1, y: 10 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse", ease: "easeInOut" }}
          >
            <p className="text-white/70 font-bold text-sm tracking-[0.3em] uppercase drop-shadow-lg">Scroll Down</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const CHAPTERS = [
  {
    id: '1.1',
    scrollSequence: { frameCount: 180, folderPath: '/frames' },
    theme: 'Module 1: Discover',
    title: 'Speak to Win',
    subtitle: 'Awaken the warrior within through expression.',
    content: 'In this module, you will learn to understand your weaknesses and build the courage to overcome them.',
    features: [
      'Build communication & public speaking skills',
      'Encourage self-reflection and expression',
      'Connect ancient festival values with real-life'
    ],
    type: 'intro'
  },
  {
    id: '1.1b',
    theme: 'Sacred Verses',
    title: 'Sanskrit Shlokas',
    subtitle: 'Ancient Wisdom from the Ramayana & Mahabharata',
    shlokas: [
      {
        sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
        english: 'Whenever there is a decline in righteousness, O Arjuna, and an increase in unrighteousness, then I manifest Myself.'
      },
      {
        sanskrit: 'रामो राजमणिः सदा विजयते रामं रमेशं भजे।\nरामेणाभिहता निशाचरचमू रामाय तस्मै नमः॥',
        english: 'Rama, the jewel among kings, always emerges victorious. I worship Him. By Rama, the army of demons was destroyed; to that Rama, I bow.'
      }
    ],
    type: 'shlokas'
  },
  {
    id: '1.2',
    theme: 'Module 1: Discover',
    title: 'Who is Ravana?',
    subtitle: 'The 10 Heads of Negativity',
    youtubeEmbed: 'PU-j2c2oUJ8',
    content: 'Ravana had 10 heads, each representing a negative human trait. Why do we burn his effigy on Dussehra? To symbolically burn these bad habits inside us.',
    type: 'content-3d'
  },
  {
    id: '1.3',
    title: 'Your Inner Evil',
    subtitle: 'Select the trait you struggle with most to reveal your path to resolution.',
    type: 'interactive-evils'
  },
  {
    id: '1.4',
    theme: 'Knowledge Check',
    title: 'Dussehra Quiz',
    subtitle: 'Test what you have learned so far.',
    questions: [
      { q: 'What does Dussehra symbolize?', options: ['Start of winter', 'Victory of good over evil', 'New Year', 'Harvest Season'], ans: 1 },
      { q: 'Which demon is burned on Dussehra?', options: ['Ravana', 'Kansa', 'Hiranyakashyap', 'Tadaka'], ans: 0 },
      { q: 'Riddle: I have 10 heads but cannot wear 10 hats. Who am I?', options: ['Brahma', 'Ravana', 'Vishnu', 'Kumbhakarna'], ans: 1 },
      { q: 'What is the primary virtue represented by Lord Rama?', options: ['Wealth', 'Righteousness (Dharma)', 'Anger', 'Fear'], ans: 1 },
      { q: 'Riddle: I am lit on fire every year, but I am already defeated. What am I?', options: ['Diya', 'Ravana Effigy', 'Bonfire', 'Lanka'], ans: 1 }
    ],
    type: 'quiz'
  },
  {
    id: '2.1',
    scrollSequence: { frameCount: 165, folderPath: '/rama3' },
    theme: 'Module 2: Execution',
    title: 'Ram vs Ravana',
    subtitle: 'Your personal battle plan.',
    content: 'How to present your battle in class:',
    features: [
      '"My Ravana is..." (Identify weakness)',
      '"It affects me by..." (Acknowledge impact)',
      '"My Ram will defeat it by..." (Provide solution)'
    ],
    extra: 'Example: "My Ravana is fear of speaking. It stops me from answering in class. My Ram is practice. I will speak at least once every day."',
    type: 'intro'
  },
  {
    id: '2.2',
    theme: 'Closure',
    title: 'Reflection & Growth',
    subtitle: 'Self-awareness is the first step to victory.',
    features: [
      'How did you feel speaking about yourself?',
      'What action will you take starting today?',
      'Who is your "Ram" helping you grow?'
    ],
    type: 'reflection'
  }
];

const EVILS = [
  { id: 'anger', title: 'Anger', desc: 'Losing control easily', icon: <Flame className="w-10 h-10 text-orange-500" />, steps: ['Pause and count to 5', 'Take deep breaths', 'Respond slowly'] },
  { id: 'ego', title: 'Ego', desc: '"I am always right"', icon: <User className="w-10 h-10 text-orange-400" />, steps: ['Listen to others without interrupting', 'Accept mistakes gracefully', 'Apologize when wrong'] },
  { id: 'fear', title: 'Fear', desc: 'Scared to speak up', icon: <Target className="w-10 h-10 text-orange-500" />, steps: ['Acknowledge the fear', 'Take one small risk today', 'Reward your effort'] },
  { id: 'laziness', title: 'Laziness', desc: 'Not trying your best', icon: <BrainCircuit className="w-10 h-10 text-orange-400" />, steps: ['Set a 5-minute timer', 'Do the hardest task first', 'Celebrate small wins'] },
];

/* --- 3D COMPONENT --- */
function RavanaModel() {
  const { scene } = useGLTF('/ravanan__diwali.glb');
  return (
    <primitive object={scene} scale={1.5} position={[0, -1.5, 0]} />
  );
}
useGLTF.preload('/ravanan__diwali.glb');

function RavanaCanvas() {
  return (
    <div className="w-full h-[50vh] sm:h-[60vh] overflow-visible relative pointer-events-auto">
      <Suspense fallback={<div className="flex items-center justify-center h-full text-orange-500/50">Loading 3D Asset...</div>}>
         <Canvas camera={{ position: [0, 2, 9], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <RavanaModel />
            </Float>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} maxPolarAngle={Math.PI / 2} />
            <Environment preset="sunset" />
            <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
         </Canvas>
      </Suspense>
    </div>
  );
}

/* --- UI COMPONENTS --- */

const ProfessionalButton = ({ children, onClick, disabled, variant = 'primary', className = '' }) => {
  const baseStyles = "relative flex items-center justify-center gap-3 px-8 py-5 rounded-xl font-semibold tracking-wide transition-all duration-500 pointer-events-auto overflow-hidden text-lg";
  
  const variants = {
    primary: "bg-orange-600 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-500 hover:shadow-orange-500/40 border border-orange-500/50 hover:-translate-y-1",
    secondary: "bg-black/40 backdrop-blur-md text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white hover:-translate-y-1",
    success: "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 hover:shadow-emerald-500/40 border border-emerald-500/50 hover:-translate-y-1"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-30 grayscale cursor-not-allowed transform-none hover:transform-none' : ''} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

const SectionCard = ({ children, index = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={`w-full bg-[#0a0301]/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/[0.06] shadow-xl flex flex-col ${className}`}
  >
    {children}
  </motion.div>
);

const HeroCard = ({ theme, title, subtitle }) => (
  <SectionCard index={0} className="relative overflow-hidden text-center sm:text-left gap-4 sm:gap-6">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
    {theme && (
      <span className="inline-block text-orange-500 font-bold tracking-widest uppercase text-sm px-4 py-1.5 rounded-md border border-orange-500/20 bg-orange-500/10 self-center sm:self-start mb-2">
        {theme}
      </span>
    )}
    {title && (
      <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight leading-tight z-10 relative">
        {title}
      </h1>
    )}
    {subtitle && (
      <p className="text-xl sm:text-2xl text-gray-400 font-medium max-w-3xl leading-relaxed z-10 relative">
        {subtitle}
      </p>
    )}
  </SectionCard>
);

const ContentCard = ({ content, extra }) => {
  if (!content && !extra) return null;
  return (
    <SectionCard index={1} className="gap-6 sm:gap-10">
      {content && (
        <p className="text-xl sm:text-2xl text-white leading-relaxed font-light drop-shadow-sm">
          {content}
        </p>
      )}
      {extra && (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex items-start gap-6 w-full">
          <div className="w-2 h-full min-h-[3rem] bg-orange-500 rounded-full shrink-0" />
          <p className="text-gray-300 italic text-xl leading-relaxed font-light">{extra}</p>
        </div>
      )}
    </SectionCard>
  );
};

const FeaturesListCard = ({ features }) => {
  if (!features || !features.length) return null;
  return (
    <SectionCard index={2} className="!bg-transparent border-none shadow-none mt-2 !p-0">
      <div className="space-y-6 w-full">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-orange-500/30 transition-colors">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
              <ShieldCheck className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-xl text-white font-light drop-shadow-sm">{feature}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

/* --- ACTIVITIES --- */

function InteractiveEvils() {
  const [selected, setSelected] = useState(null);
  const [checkedSteps, setCheckedSteps] = useState([]);

  const toggleStep = (idx) => {
    if (checkedSteps.includes(idx)) {
      setCheckedSteps(checkedSteps.filter(i => i !== idx));
    } else {
      setCheckedSteps([...checkedSteps, idx]);
    }
  };

  const isResolved = selected && checkedSteps.length === selected.steps.length;

  if (!selected) {
    return (
      <SectionCard index={1} className="!p-0 bg-transparent border-none shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {EVILS.map(evil => (
            <button
              key={evil.id}
              onClick={() => { setSelected(evil); setCheckedSteps([]); }}
              className="text-left bg-[#0a0301]/80 backdrop-blur-xl border border-white/[0.06] p-10 rounded-3xl hover:bg-[#1f0b04]/90 hover:border-orange-500/50 transition-all duration-500 group"
            >
              <div className="bg-white/[0.03] w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border border-white/[0.05] group-hover:scale-110 transition-transform duration-500">
                 {evil.icon}
              </div>
              <h4 className="text-3xl font-bold text-white mb-4">{evil.title}</h4>
              <p className="text-xl text-gray-400 font-light">{evil.desc}</p>
            </button>
          ))}
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard index={1} className={`transition-all duration-1000 ${isResolved ? 'border-emerald-500/30' : ''}`}>
      <div className="w-full">
        <button 
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 uppercase tracking-widest text-sm font-semibold"
        >
          <ArrowLeft className="w-5 h-5" /> Choose another
        </button>

        <div className="flex flex-col md:flex-row items-start md:flex-wrap gap-10 mb-16 pb-12 border-b border-white/[0.05]">
          <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/[0.05] shrink-0">
            {selected.icon}
          </div>
          <div>
            <p className="text-orange-500 text-sm font-bold uppercase tracking-widest mb-3">Confronting your inner demon</p>
            <h4 className="text-5xl font-bold text-white mb-4">{selected.title}</h4>
            <p className="text-2xl text-gray-400 font-light">{selected.desc}</p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-white font-semibold text-lg mb-8">Complete these steps to resolve:</p>
          {selected.steps.map((step, idx) => {
            const checked = checkedSteps.includes(idx);
            return (
               <button
                key={idx}
                onClick={() => toggleStep(idx)}
                className={`w-full flex items-center gap-8 p-8 rounded-2xl border transition-all duration-500 text-left ${
                  checked 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100' 
                    : 'bg-white/[0.02] border-white/[0.05] text-gray-300 hover:bg-white/[0.05] hover:border-white/20'
                }`}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  checked ? 'border-emerald-400 bg-emerald-500' : 'border-gray-600'
                }`}>
                  <Check className={`w-5 h-5 text-white ${!checked && 'opacity-0'}`} />
                </div>
                <span className={`text-xl sm:text-2xl font-light ${checked ? 'line-through opacity-60' : ''}`}>{step}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {isResolved && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 48 }}
              className="overflow-hidden"
            >
               <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-6">
                  <div className="p-4 bg-emerald-500/20 rounded-full">
                    <Sparkles className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="text-2xl font-bold text-emerald-400 mb-2">Victory!</h5>
                    <p className="text-lg text-emerald-200/70">You have successfully planned an approach to defeat this inner evil.</p>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionCard>
  );
}

function QuizActivity({ chapter, quizAnswers, setQuizAnswers, currentIdx }) {
  return (
    <div className="space-y-8 w-full">
      {chapter.questions.map((q, qIdx) => {
        const uniqueKey = `${currentIdx}-${qIdx}`;
        const selected = quizAnswers[uniqueKey];
        const isAnswered = selected !== undefined;
        
        return (
          <SectionCard key={qIdx} index={qIdx + 1} className="!p-8 sm:!p-10">
            <p className="font-bold text-2xl sm:text-3xl text-white mb-8 leading-relaxed bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {q.q}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {q.options.map((opt, optIdx) => {
                const isCorrect = isAnswered && optIdx === q.ans;
                const isWrongSelection = isAnswered && selected === optIdx && optIdx !== q.ans;
                
                let btnClass = "bg-white/[0.02] border-white/[0.05] text-gray-300 hover:bg-white/[0.05] hover:border-orange-500/40";
                if (isCorrect) btnClass = "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 scale-[1.02] shadow-[0_0_30px_rgba(16,185,129,0.15)]";
                if (isWrongSelection) btnClass = "bg-red-500/10 border-red-500/30 text-red-200 opacity-50";

                return (
                  <button 
                    key={optIdx} 
                    disabled={isAnswered}
                    onClick={() => setQuizAnswers(prev => ({ ...prev, [uniqueKey]: optIdx }))}
                    className={`w-full p-6 rounded-2xl border transition-all duration-500 text-left text-lg lg:text-xl font-light flex items-center justify-between h-full min-h-[80px] gap-4 ${btnClass}`}
                  >
                    <span>{opt}</span>
                    <div className="flex shrink-0">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        isCorrect ? 'border-emerald-400 bg-emerald-500/20' : 
                        isWrongSelection ? 'border-red-400 bg-red-500/20' : 
                        'border-gray-600'
                      }`}>
                        <Check className={`w-5 h-5 ${isCorrect ? 'text-emerald-400' : isWrongSelection ? 'text-red-400' : 'text-transparent'}`} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </SectionCard>
        );
      })}
    </div>
  );
}

/* --- MAIN OVERLAY --- */

export default function PremiumLMSOverlay() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch((err) => console.log(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch((err) => console.log(err));
      }
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const goNext = () => {
    if (currentIdx < CHAPTERS.length - 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentIdx(c => c + 1);
    }
  };

  const goPrev = () => {
    if (currentIdx > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentIdx(c => c - 1);
    }
  };

  const chapter = CHAPTERS[currentIdx];
  const progress = ((currentIdx + 1) / CHAPTERS.length) * 100;

  return (
    <div className="absolute inset-0 z-50 flex overflow-y-auto overflow-x-hidden justify-center bg-transparent !p-0 !m-0">
      
      <div className={`w-full max-w-[1200px] min-h-screen ${chapter.scrollSequence ? 'pb-16 sm:pb-24 !pt-0 !px-0 !mt-0' : 'py-16 sm:py-24 px-4 sm:px-8 xl:px-0'} flex flex-col`}>
        
        {/* Fullscreen Toggle Button */}
        <button 
          onClick={toggleFullscreen}
          className="fixed top-6 right-6 sm:top-10 sm:right-10 z-[60] bg-orange-500/20 hover:bg-orange-500/40 border border-orange-500/30 text-orange-400 p-2 sm:p-3 rounded-full backdrop-blur-md transition-all pointer-events-auto group shadow-lg flex items-center justify-center"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <span role="img" aria-label="Exit Fullscreen" className="text-2xl sm:text-3xl transition-transform duration-300 scale-95 group-hover:scale-100 drop-shadow-md">📘</span>
          ) : (
            <span role="img" aria-label="Enter Fullscreen" className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110 drop-shadow-md">📖</span>
          )}
        </button>

        {/* Dynamic Card Layout Container */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col gap-8 sm:gap-12 pb-48 items-stretch relative !p-0 !m-0"
          >
            {/* Scrolling Image Sequence (Full Screen Header - Only on Intro) */}
            {chapter.scrollSequence && (
              <ScrollSequence 
                frameCount={chapter.scrollSequence.frameCount} 
                folderPath={chapter.scrollSequence.folderPath} 
              />
            )}

            {/* 1. HERO Content */}
            <HeroCard theme={chapter.theme} title={chapter.title} subtitle={chapter.subtitle} />

            {/* 2. BODY Content */}
            {(chapter.content || chapter.extra) && (
              <ContentCard content={chapter.content} extra={chapter.extra} />
            )}

            {/* 3. 3D Model / Custom Content */}
            {chapter.type === 'content-3d' && (
              <div className="w-full relative z-20 pointer-events-auto flex flex-col items-center justify-center -mt-8 mb-4">
                <RavanaCanvas />
                <p className="text-gray-400 mt-4 font-medium italic text-xl drop-shadow-md">Drag to rotate the model</p>
              </div>
            )}

            {/* YouTube Embed Add-On */}
            {chapter.youtubeEmbed && (
              <SectionCard index={3} className="!p-6 sm:!p-8 overflow-hidden relative shadow-2xl max-w-4xl w-full self-center border border-orange-500/20 bg-gradient-to-b from-[#1a0a05] to-[#0a0301] mt-8 rounded-3xl">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-orange-400 mb-6 text-center tracking-wide uppercase drop-shadow-md flex items-center justify-center gap-3">
                  <Flame className="w-8 h-8 text-orange-500" />
                  Facts about Dusshera
                  <Flame className="w-8 h-8 text-orange-500" />
                </h3>
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black relative flex items-center justify-center shadow-inner border border-white/5">
                  <iframe 
                    className="absolute inset-0 w-full h-full pointer-events-auto"
                    src={`https://www.youtube.com/embed/${chapter.youtubeEmbed}?autoplay=0&rel=0`} 
                    title="Facts about Dusshera" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen 
                  />
                </div>
              </SectionCard>
            )}

            {/* Shlokas Section */}
            {chapter.type === 'shlokas' && (
              <div className="space-y-8 w-full mt-4">
                {chapter.shlokas.map((s, idx) => (
                  <SectionCard key={idx} index={idx + 1} className="gap-8 !p-8 sm:!p-10 border-orange-500/20 bg-gradient-to-br from-[#0a0301]/90 to-[#1a0a05]/90 flex flex-col items-center justify-center">
                    <motion.p 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: idx * 0.2 + 0.3 }}
                      className="text-2xl md:text-4xl text-orange-400 font-bold leading-loose whitespace-pre-wrap text-center w-full block drop-shadow-md"
                    >
                      {s.sanskrit}
                    </motion.p>
                    
                    <motion.button 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.2 + 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        window.speechSynthesis.cancel();
                        const utterance = new SpeechSynthesisUtterance(s.sanskrit);
                        // Using 'hi-IN' so it pronounces Devnagari scripts (Sanskrit) correctly
                        utterance.lang = 'hi-IN';
                        utterance.rate = 0.85; 
                        utterance.pitch = 0.9;
                        window.speechSynthesis.speak(utterance);
                      }}
                      className="mt-2 mb-2 flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-500/10 text-orange-400 rounded-full hover:bg-orange-500/20 border border-orange-500/30 transition-all cursor-pointer pointer-events-auto backdrop-blur-sm"
                    >
                      <Volume2 className="w-5 h-5 text-orange-400" />
                      <span className="text-sm font-semibold tracking-wider uppercase">Listen</span>
                    </motion.button>

                    <div className="w-16 h-1 bg-white/10 rounded-full mx-auto my-2" />
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: idx * 0.2 + 0.8 }}
                      className="text-lg sm:text-2xl text-gray-300 leading-relaxed font-light text-center"
                    >
                      "{s.english}"
                    </motion.p>
                  </SectionCard>
                ))}
              </div>
            )}

            {/* 4. FEATURES Content */}
            {chapter.features && (
              <FeaturesListCard features={chapter.features} />
            )}

            {/* 5. INTERACTIVE Activities */}
            {chapter.type === 'interactive-evils' && <InteractiveEvils />}
            {chapter.type === 'quiz' && <QuizActivity chapter={chapter} quizAnswers={quizAnswers} setQuizAnswers={setQuizAnswers} currentIdx={currentIdx} />}
            
            {/* 6. CALL TO ACTION / Links */}
            {chapter.link && (
              <SectionCard index={3} className="flex flex-col items-center justify-center text-center !items-center">
                  <h4 className="text-3xl font-bold text-white mb-8">External Resource</h4>
                  <ProfessionalButton 
                    onClick={() => window.open(chapter.link, '_blank')}
                    variant="primary"
                    className="!px-12 !py-6"
                  >
                    Open Link
                  </ProfessionalButton>
                </SectionCard>
              )}

            {/* Empty space for safe scrolling past the sticky navigation footer */}
            <div className="h-20 sm:h-32"></div>
          </motion.div>
        </AnimatePresence>

        {/* Lower Navigation Controls */}
        <div className="fixed bottom-0 left-0 right-0 p-6 sm:p-10 pointer-events-none z-50 bg-gradient-to-t from-black/80 to-transparent">
           <div className="max-w-[1200px] mx-auto flex items-center justify-between w-full">
              <ProfessionalButton
                onClick={goPrev}
                variant="secondary"
                disabled={currentIdx === 0}
                className={`shadow-2xl !px-5 !py-3 !text-sm sm:!px-6 sm:!py-3 sm:!text-base ${currentIdx === 0 ? 'opacity-0' : ''}`}
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> 
                <span>Previous</span>
              </ProfessionalButton>

              <ProfessionalButton
                onClick={goNext}
                variant={currentIdx === CHAPTERS.length - 1 ? 'success' : 'primary'}
                className="shadow-3xl !px-5 !py-3 !text-sm sm:!px-6 sm:!py-3 sm:!text-base"
              >
                <span>{currentIdx === CHAPTERS.length - 1 ? 'Finish Module' : 'Next Step'}</span>
                {currentIdx === CHAPTERS.length - 1 ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
              </ProfessionalButton>
           </div>
        </div>

      </div>

      {/* Top progress bar (Professional replacement for dotted nav) */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-black/50 z-50 !p-0">
        <motion.div 
          className="h-full bg-gradient-to-r from-orange-600 to-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.8)] !p-0"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
