import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');

    @keyframes glitch-anim-1 {
      0% { clip-path: inset(40% 0 61% 0); }
      20% { clip-path: inset(92% 0 1% 0); }
      40% { clip-path: inset(43% 0 1% 0); }
      60% { clip-path: inset(25% 0 58% 0); }
      80% { clip-path: inset(54% 0 7% 0); }
      100% { clip-path: inset(58% 0 43% 0); }
    }

    @keyframes glitch-anim-2 {
      0% { clip-path: inset(25% 0 58% 0); }
      20% { clip-path: inset(54% 0 7% 0); }
      40% { clip-path: inset(58% 0 43% 0); }
      60% { clip-path: inset(40% 0 61% 0); }
      80% { clip-path: inset(92% 0 1% 0); }
      100% { clip-path: inset(43% 0 1% 0); }
    }

    @keyframes noise {
      0%, 3%, 5%, 42%, 44%, 100% { opacity: 1; transform: scaleY(1); }
      4.5% { opacity: 1; transform: scaleY(1.7); }
      43% { opacity: 1; transform: scaleX(1.5); }
    }

    .glitch {
      position: relative;
    }

    .glitch::before,
    .glitch::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .glitch::before {
      left: 2px;
      text-shadow: -2px 0 #ff00c1;
      animation: glitch-anim-1 2s infinite linear alternate-reverse;
    }

    .glitch::after {
      left: -2px;
      text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
      animation: glitch-anim-2 2s infinite linear alternate-reverse;
    }
  `}} />
);

const MatrixRain = () => {
  const [streams, setStreams] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    
    const streamCount = Math.floor(window.innerWidth / 20);
    const newStreams = [];

    for (let i = 0; i < streamCount; i++) {
      const streamChars = [];
      const streamLength = 5 + Math.floor(Math.random() * 15);
      for (let j = 0; j < streamLength; j++) {
        streamChars.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      }
      const xPos = i * 20;
      const speed = 1 + Math.random() * 3;
      const delay = Math.random() * 2;
      newStreams.push(
        <motion.div
          key={i}
          initial={{ y: -100 }}
          animate={{ y: '100vh' }}
          transition={{ duration: speed, repeat: Infinity, ease: 'linear', delay }}
          style={{
            position: 'absolute',
            left: `${xPos}px`,
            color: 'rgba(0, 255, 65, 0.5)',
            fontSize: '24px',
            fontFamily: 'Courier Prime, monospace',
            textShadow: '0 0 5px #00ff41',
            writingMode: 'vertical-rl',
          }}
        >
          {streamChars.join('')}
        </motion.div>
      );
    }
    setStreams(newStreams);
  }, []);

  return <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>{streams}</div>;
};

interface GlitchTextProps {
  text: string;
}

const GlitchText = ({ text }: GlitchTextProps) => {
  return (
    <motion.div
      className="glitch"
      data-text={text}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.div>
  );
};

const NotFoundPage = () => {
  const [isGlitching, setIsGlitching] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isGlitching) {
      controls.start({
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.02, 0.99, 1],
        transition: { duration: 0.2, times: [0, 0.2, 0.8, 1] }
      });
    } else {
      controls.start({ opacity: 1, scale: 1 });
    }
  }, [isGlitching, controls]);

  return (
    <>
      <FontStyles />
      <div style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#00ff41',
        fontFamily: 'Courier Prime, monospace',
      }}>
        <MatrixRain />
        <motion.div
          style={{
            zIndex: 10,
            textAlign: 'center',
            textShadow: '0 0 10px #00ff41',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '20px',
            borderRadius: '10px',
          }}
          onHoverStart={() => setIsGlitching(true)}
          onHoverEnd={() => setIsGlitching(false)}
          animate={controls}
        >
          <motion.h1
            style={{ fontSize: '6rem', marginBottom: '16px' }}
            animate={{ opacity: isGlitching ? [1, 0.5, 1] : 1 }}
            transition={{ duration: 0.2, repeat: isGlitching ? Infinity : 0 }}
          >
            <GlitchText text="404" />
          </motion.h1>
          <AnimatePresence mode="wait">
            <motion.p
              key={isGlitching ? 'glitch' : 'normal'}
              style={{ fontSize: '1.5rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isGlitching ? 
                <GlitchText text="The Matrix has you... but this page doesn't." /> : 
                "Wake up, Neo. The page has vanished."
              }
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;