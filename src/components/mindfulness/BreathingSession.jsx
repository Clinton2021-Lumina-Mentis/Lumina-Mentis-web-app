import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, CheckCircle2, Bell, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BreathingCircle from './BreathingCircle';

function buildSequence(pattern) {
  // Returns array of {phase, duration} steps
  return pattern.steps;
}

export default function BreathingSession({ pattern, onComplete }) {
  const sequence = buildSequence(pattern);
  const totalCycles = pattern.cycles || 5;

  const [isRunning, setIsRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [countdown, setCountdown] = useState(sequence[0].duration);
  const [cycleCount, setCycleCount] = useState(0);

  // Sound settings
  const [useChimes, setUseChimes] = useState(true);
  const [ambientType, setAmbientType] = useState('none');

  const tickRef = useRef(null);
  const countdownRef = useRef(sequence[0].duration);
  const stepRef = useRef(0);
  const cycleRef = useRef(0);

  const audioCtxRef = useRef(null);
  const ambientNodeRef = useRef(null);
  const ambientGainRef = useRef(null);

  const currentStep = sequence[stepIndex];

  // Play a chime sound based on phase
  const playPhaseChime = useCallback((phase) => {
    if (!useChimes) return;
    const freqs = {
      inhale: 523.25, // C5
      hold: 659.25,   // E5
      exhale: 440.00, // A4
      rest: 349.23,   // F4
    };
    const freq = freqs[phase] || 440;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = audioCtxRef.current || new AudioContext();
      if (!audioCtxRef.current) audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = (phase === 'exhale' || phase === 'rest') ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.error("Failed to play phase chime:", e);
    }
  }, [useChimes]);

  // Synthesis of ambient soundscapes
  const startAmbient = (type) => {
    if (type === 'none') {
      stopAmbient();
      return;
    }
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      stopAmbient();
      
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      if (type === 'brown') {
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }
      } else if (type === 'pink') {
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          b6 = white * 0.115926;
          output[i] = pink * 0.11;
        }
      }
      
      const source = ctx.createBufferSource();
      source.buffer = noiseBuffer;
      source.loop = true;
      
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
      
      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      source.start();
      ambientNodeRef.current = source;
      ambientGainRef.current = gainNode;
    } catch (e) {
      console.error("Failed to play ambient sound:", e);
    }
  };

  const stopAmbient = () => {
    if (ambientNodeRef.current) {
      try {
        ambientNodeRef.current.stop();
      } catch (e) {}
      ambientNodeRef.current = null;
    }
    ambientGainRef.current = null;
  };

  useEffect(() => {
    if (isRunning) {
      startAmbient(ambientType);
    } else {
      stopAmbient();
    }
    return () => stopAmbient();
  }, [isRunning, ambientType]);

  const tick = useCallback(() => {
    countdownRef.current -= 1;
    setCountdown(countdownRef.current);

    if (countdownRef.current <= 0) {
      const nextStep = stepRef.current + 1;
      if (nextStep >= sequence.length) {
        // End of one cycle
        const nextCycle = cycleRef.current + 1;
        cycleRef.current = nextCycle;
        setCycleCount(nextCycle);
        if (nextCycle >= totalCycles) {
          clearInterval(tickRef.current);
          setIsRunning(false);
          setDone(true);
          return;
        }
        stepRef.current = 0;
        setStepIndex(0);
        countdownRef.current = sequence[0].duration;
        setCountdown(sequence[0].duration);
        playPhaseChime(sequence[0].phase);
      } else {
        stepRef.current = nextStep;
        setStepIndex(nextStep);
        countdownRef.current = sequence[nextStep].duration;
        setCountdown(sequence[nextStep].duration);
        playPhaseChime(sequence[nextStep].phase);
      }
    }
  }, [sequence, totalCycles, playPhaseChime]);

  useEffect(() => {
    if (isRunning) {
      tickRef.current = setInterval(tick, 1000);
    } else {
      clearInterval(tickRef.current);
    }
    return () => clearInterval(tickRef.current);
  }, [isRunning, tick]);

  const handleReset = () => {
    clearInterval(tickRef.current);
    setIsRunning(false);
    setDone(false);
    setStepIndex(0);
    setCountdown(sequence[0].duration);
    setCycleCount(0);
    countdownRef.current = sequence[0].duration;
    stepRef.current = 0;
    cycleRef.current = 0;
  };

  const handleTogglePlay = () => {
    if (!isRunning) {
      if (cycleCount === 0 && countdown === sequence[0].duration) {
        playPhaseChime(sequence[0].phase);
      }
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="font-heading text-2xl mb-2">Session Complete</h3>
        <p className="text-muted-foreground text-sm mb-6">
          You completed {totalCycles} cycles of {pattern.name}. Well done.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Repeat
          </Button>
          <Button onClick={onComplete}>Choose Another</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Circle */}
      <BreathingCircle
        phase={currentStep.phase}
        countdown={countdown}
        totalDuration={currentStep.duration}
        isRunning={isRunning}
      />

      {/* Cycle progress */}
      <div className="flex gap-1.5">
        {Array.from({ length: totalCycles }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i < cycleCount
                ? 'bg-primary'
                : i === cycleCount
                ? 'bg-primary/40 ring-1 ring-primary'
                : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground -mt-4">
        Cycle {Math.min(cycleCount + 1, totalCycles)} of {totalCycles}
      </p>

      {/* Sound Settings Panel */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center border border-border/40 bg-muted/20 px-4 py-3 rounded-2xl text-xs w-full max-w-sm">
        <div className="flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-muted-foreground font-medium">Chimes:</span>
          <button
            onClick={() => setUseChimes(c => !c)}
            className={`px-2 py-0.5 rounded-lg transition-colors font-semibold ${
              useChimes ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            }`}
          >
            {useChimes ? 'On' : 'Off'}
          </button>
        </div>
        <div className="hidden sm:block text-muted-foreground/30 font-light">|</div>
        <div className="flex items-center gap-2">
          <Music className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-muted-foreground font-medium">Ambient:</span>
          <select
            value={ambientType}
            onChange={(e) => setAmbientType(e.target.value)}
            className="bg-transparent border border-border/60 rounded-lg px-2 py-0.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/40 text-foreground cursor-pointer"
          >
            <option value="none" className="bg-background">None</option>
            <option value="brown" className="bg-background">Brownian Waves</option>
            <option value="pink" className="bg-background">Soft Rainfall</option>
          </select>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-full"
          onClick={handleReset}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          size="lg"
          className="rounded-full px-10"
          onClick={handleTogglePlay}
        >
          {isRunning ? (
            <><Pause className="w-4 h-4 mr-2" /> Pause</>
          ) : (
            <><Play className="w-4 h-4 mr-2" /> {cycleCount === 0 && countdown === sequence[0].duration ? 'Begin' : 'Resume'}</>
          )}
        </Button>
      </div>
    </div>
  );
}