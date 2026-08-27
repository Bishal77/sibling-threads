import { useCallback, useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { site } from "@/data/rakhiData";
import { cn } from "@/lib/utils";

/**
 * Optional ambience.
 * - If `site.audioSrc` points at a file, that track is used.
 * - Otherwise a soft royalty-free drone is synthesised in the browser.
 * Nothing ever autoplays without a user gesture.
 */
export function AudioController() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.35);

  const elementRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const target = muted ? 0 : volume;

  const startSynth = useCallback(async () => {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return false;
    if (!ctxRef.current) {
      const ctx = new Ctor();
      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      [146.83, 220, 293.66, 440].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 3 ? "triangle" : "sine";
        osc.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.value = [0.16, 0.1, 0.07, 0.03][i];
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.03 + i * 0.017;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = g.gain.value * 0.7;
        lfo.connect(lfoGain).connect(g.gain);
        osc.connect(g).connect(master);
        osc.start();
        lfo.start();
      });
      ctxRef.current = ctx;
      gainRef.current = master;
    }
    await ctxRef.current.resume();
    gainRef.current?.gain.setTargetAtTime(target * 0.5, ctxRef.current.currentTime, 1.2);
    return true;
  }, [target]);

  const toggle = useCallback(async () => {
    if (playing) {
      elementRef.current?.pause();
      if (ctxRef.current && gainRef.current) {
        gainRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.6);
      }
      setPlaying(false);
      return;
    }
    if (site.audioSrc && elementRef.current) {
      try {
        await elementRef.current.play();
        setPlaying(true);
        return;
      } catch {
        /* browser blocked playback — fall through to synth */
      }
    }
    const ok = await startSynth();
    setPlaying(ok);
  }, [playing, startSynth]);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.volume = target;
    }
    if (ctxRef.current && gainRef.current && playing) {
      gainRef.current.gain.setTargetAtTime(target * 0.5, ctxRef.current.currentTime, 0.4);
    }
  }, [target, playing]);

  useEffect(() => () => void ctxRef.current?.close(), []);

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2">
      {site.audioSrc ? (
        <audio ref={elementRef} src={site.audioSrc} loop preload="none" />
      ) : null}

      <div
        className={cn(
          "glass-panel flex items-center gap-3 overflow-hidden rounded-full transition-all duration-500 ease-[var(--ease-cinematic)]",
          open ? "max-w-[15rem] px-4 py-2" : "max-w-0 border-0 px-0 py-0 opacity-0",
        )}
      >
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute music" : "Mute music"}
          className="text-muted-foreground transition-colors hover:text-gold"
        >
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          aria-label="Music volume"
          onChange={(e) => {
            setVolume(Number(e.target.value));
            setMuted(false);
          }}
          className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-border accent-gold"
        />
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background music" : "Play background music"}
        aria-pressed={playing}
        className="glass-panel relative flex size-12 items-center justify-center rounded-full text-gold transition-colors hover:border-gold/60"
      >
        {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
        {playing && !muted ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-gold/40"
            style={{ animation: "glowPulse 2.6s ease-in-out infinite" }}
          />
        ) : null}
      </button>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Hide sound controls" : "Show sound controls"}
        aria-expanded={open}
        className="glass-panel flex size-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-gold"
      >
        <Music2 className="size-4" />
      </button>
    </div>
  );
}
