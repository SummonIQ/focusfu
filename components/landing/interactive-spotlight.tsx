'use client';

import { useEffect, useRef } from 'react';

/**
 * Canvas-based radial glow that follows the pointer with eased interpolation.
 * Reads --primary-rgb / --primary-glow from the parent and composites with `multiply`.
 */
export function InteractiveSpotlight({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const state = {
      px: 0.5,
      py: 0.4,
      tx: 0.5,
      ty: 0.4,
      ease: 0.045,
      active: false,
      width: 0,
      height: 0,
      raf: 0,
    };

    const styles = getComputedStyle(container);
    const rgb = (styles.getPropertyValue('--primary-rgb').trim() || '99,102,241');
    const glow = (styles.getPropertyValue('--primary-glow').trim() || '167,139,250');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = container.getBoundingClientRect();
      state.width = width;
      state.height = height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const handleMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      state.tx = (e.clientX - r.left) / r.width;
      state.ty = (e.clientY - r.top) / r.height;
      state.active = true;
      state.ease = 0.08;
    };
    const handleLeave = () => {
      state.active = false;
      state.ease = 0.025;
      state.tx = 0.5;
      state.ty = 0.4;
    };

    container.addEventListener('pointermove', handleMove);
    container.addEventListener('pointerleave', handleLeave);

    let t = 0;
    const render = () => {
      state.raf = requestAnimationFrame(render);
      t += 0.006;

      state.px += (state.tx - state.px) * state.ease;
      state.py += (state.ty - state.py) * state.ease;

      ctx.clearRect(0, 0, state.width, state.height);

      // Idle drift
      const idleX = reduceMotion ? 0 : Math.sin(t) * 0.04;
      const idleY = reduceMotion ? 0 : Math.cos(t * 0.85) * 0.03;
      const cx = (state.px + idleX) * state.width;
      const cy = (state.py + idleY) * state.height;

      const radius = Math.max(state.width, state.height) * 0.55;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, `rgba(${rgb}, ${state.active ? 0.55 : 0.4})`);
      grad.addColorStop(0.35, `rgba(${glow}, 0.22)`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, state.width, state.height);

      // Subtle second highlight
      const grad2 = ctx.createRadialGradient(
        state.width - cx,
        state.height - cy,
        0,
        state.width - cx,
        state.height - cy,
        radius * 0.6,
      );
      grad2.addColorStop(0, `rgba(${glow}, 0.18)`);
      grad2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, state.width, state.height);
    };

    render();

    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
      container.removeEventListener('pointermove', handleMove);
      container.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, mixBlendMode: 'screen', pointerEvents: 'none' }}
      />
    </div>
  );
}
