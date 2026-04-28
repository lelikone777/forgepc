"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Clapperboard,
  Code2,
  Cpu,
  Fan,
  Gamepad2,
  Gauge,
  HardDrive,
  Palette,
  Server,
  Snowflake,
  Sparkles,
} from "lucide-react";

export function TaskCardVisual({ index }: { index: number }) {
  const reduceMotion = useReducedMotion();
  const idleAnimation = reduceMotion ? undefined : { y: [0, -9, 0], rotate: [-3, 1, -3] };
  const idleTransition = {
    duration: 7 + index * 0.35,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut" as const,
  };
  const shell =
    "pointer-events-none absolute -right-6 -top-10 z-10 drop-shadow-[0_24px_36px_rgba(0,0,0,0.18)]";

  switch (index) {
    case 0:
      return (
        <motion.div className={`${shell} h-36 w-40`} animate={idleAnimation} transition={idleTransition}>
          <div className="relative h-full w-full">
            <div className="absolute inset-x-3 top-6 h-20 rounded-[1.6rem] border border-white/50 bg-gradient-to-br from-white via-card to-accent/70 shadow-[0_18px_30px_rgba(0,0,0,0.14)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-[-6deg] dark:border-white/10 dark:from-zinc-900 dark:via-card dark:to-zinc-900" />
            <div className="absolute inset-x-7 top-10 flex h-12 items-center justify-center rounded-[1rem] border border-primary/20 bg-background/80 backdrop-blur-sm transition-transform duration-700 group-hover:translate-y-1">
              <Gamepad2 size={26} className="text-primary" />
            </div>
            <div className="absolute -left-2 top-3 rounded-full border border-primary/30 bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary transition-transform duration-700 group-hover:-translate-x-1 group-hover:-translate-y-1">
              AAA
            </div>
            <div className="absolute right-0 top-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-all duration-700 group-hover:translate-x-1 group-hover:scale-110">
              <Sparkles size={18} />
            </div>
            <div className="absolute bottom-2 left-7 h-12 w-12 rounded-full bg-primary/18 blur-xl transition-all duration-700 group-hover:scale-125 group-hover:bg-primary/30" />
          </div>
        </motion.div>
      );
    case 1:
      return (
        <motion.div className={`${shell} h-36 w-40`} animate={idleAnimation} transition={idleTransition}>
          <div className="relative h-full w-full">
            <div className="absolute inset-0 rounded-[2rem] border border-primary/20 bg-gradient-to-br from-card via-accent/50 to-background shadow-[0_18px_30px_rgba(0,0,0,0.14)] dark:from-zinc-950 dark:via-card dark:to-zinc-900" />
            <div className="absolute left-4 top-4 rounded-full border border-primary/25 bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
              fps max
            </div>
            <div className="absolute left-5 top-11 h-16 w-16 rounded-full border border-primary/20 bg-background/85 shadow-inner shadow-primary/10">
              <div className="absolute inset-3 rounded-full border border-primary/15" />
              <div className="absolute left-1/2 top-1/2 h-1 w-7 origin-left -translate-y-1/2 rotate-[12deg] rounded-full bg-primary shadow-[0_0_14px_hsla(var(--primary),0.55)] transition-transform duration-700 group-hover:rotate-[-42deg]" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
              <Gauge size={18} className="absolute bottom-2 right-2 text-primary/65" />
            </div>
            <div className="absolute right-3 top-11 text-right">
              <div className="font-mono-spec text-3xl font-bold leading-none text-foreground transition-transform duration-700 group-hover:scale-110 group-hover:text-primary">
                240+
              </div>
              <div className="font-mono-spec text-[11px] uppercase tracking-[0.28em] text-muted-foreground">fps</div>
            </div>
            <div className="absolute right-4 top-8 h-2.5 w-2.5 rounded-full bg-primary transition-all duration-700 group-hover:-translate-y-4 group-hover:translate-x-2 group-hover:scale-150" />
            <div className="absolute right-1 top-14 h-2 w-2 rounded-full bg-orange-300 transition-all duration-700 group-hover:-translate-y-2 group-hover:translate-x-4 group-hover:scale-125" />
            <div className="absolute right-8 top-5 h-2 w-2 rounded-full bg-primary/70 transition-all duration-700 group-hover:-translate-y-3 group-hover:scale-125" />
          </div>
        </motion.div>
      );
    case 2:
      return (
        <motion.div className={`${shell} h-36 w-40`} animate={idleAnimation} transition={idleTransition}>
          <div className="relative h-full w-full">
            <div className="absolute left-8 top-2 h-20 w-20 rounded-[1.6rem] border border-primary/20 bg-gradient-to-br from-primary/20 via-background to-card shadow-[0_18px_30px_rgba(0,0,0,0.14)] transition-transform duration-700 group-hover:-translate-x-1 group-hover:-translate-y-2 group-hover:rotate-[-10deg]" />
            <div className="absolute left-16 top-7 h-24 w-24 rounded-[1.8rem] border border-white/40 bg-gradient-to-br from-white via-card to-accent/70 shadow-[0_18px_30px_rgba(0,0,0,0.18)] transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:rotate-[8deg] dark:border-white/10 dark:from-zinc-900 dark:via-card dark:to-zinc-900" />
            <div className="absolute left-20 top-12 flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-primary/20 bg-background/90 text-primary transition-transform duration-700 group-hover:translate-y-2">
              <Clapperboard size={22} />
            </div>
            <div className="absolute right-0 top-0 rounded-full border border-primary/25 bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              3d
            </div>
            <div className="absolute -bottom-1 left-8 flex items-center gap-2 rounded-full bg-background/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground shadow-lg backdrop-blur-sm transition-transform duration-700 group-hover:translate-y-1">
              <Palette size={12} className="text-primary" />
              render
            </div>
          </div>
        </motion.div>
      );
    case 3:
      return (
        <motion.div className={`${shell} h-36 w-40`} animate={idleAnimation} transition={idleTransition}>
          <div className="relative h-full w-full">
            <div className="absolute left-10 top-7 flex h-20 w-20 items-center justify-center rounded-[1.8rem] border border-primary/25 bg-gradient-to-br from-background via-card to-accent/60 shadow-[0_18px_30px_rgba(0,0,0,0.16)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-[6deg]">
              <Cpu size={30} className="text-primary" />
            </div>
            <div className="absolute left-6 top-3 rounded-full border border-primary/25 bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              local ai
            </div>
            <div className="absolute right-0 top-10 flex items-center gap-1 rounded-2xl border border-white/40 bg-white/85 px-3 py-2 font-mono-spec text-[10px] text-foreground shadow-xl transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1 dark:border-white/10 dark:bg-zinc-900/90 dark:text-zinc-100">
              <Code2 size={14} className="text-primary" />
              &lt;run /&gt;
            </div>
            <div className="absolute right-8 top-20 h-3 w-3 rounded-full bg-primary shadow-[0_0_16px_hsla(var(--primary),0.7)] transition-all duration-700 group-hover:-translate-y-5 group-hover:translate-x-2" />
            <div className="absolute left-7 top-20 h-2 w-2 rounded-full bg-orange-300 transition-all duration-700 group-hover:-translate-y-3 group-hover:-translate-x-1" />
            <div className="absolute left-20 top-1 h-2.5 w-2.5 rounded-full bg-primary/80 transition-all duration-700 group-hover:-translate-y-2 group-hover:translate-x-1" />
          </div>
        </motion.div>
      );
    case 4:
      return (
        <motion.div className={`${shell} h-36 w-40`} animate={idleAnimation} transition={idleTransition}>
          <div className="relative h-full w-full">
            <div className="absolute left-6 top-7 flex h-16 w-24 items-center gap-3 rounded-[1.4rem] border border-primary/20 bg-background/90 px-4 shadow-[0_18px_30px_rgba(0,0,0,0.16)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:-rotate-3">
              <Server size={18} className="text-primary" />
              <div className="flex gap-1">
                <span className="h-6 w-1.5 rounded-full bg-primary/80" />
                <span className="h-4 w-1.5 rounded-full bg-primary/55" />
                <span className="h-8 w-1.5 rounded-full bg-primary" />
              </div>
            </div>
            <div className="absolute right-2 top-1 flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-white/40 bg-white/90 shadow-[0_18px_30px_rgba(0,0,0,0.16)] transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-[10deg] dark:border-white/10 dark:bg-zinc-900/90">
              <HardDrive size={24} className="text-primary" />
            </div>
            <div className="absolute left-10 top-0 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              multitask
            </div>
            <div className="absolute left-9 top-24 h-10 w-24 rounded-full border border-primary/15 bg-background/80 shadow-inner transition-transform duration-700 group-hover:scale-105">
              <div className="absolute left-3 top-1/2 h-2 w-8 -translate-y-1/2 rounded-full bg-primary/85" />
              <div className="absolute left-12 top-1/2 h-2 w-5 -translate-y-1/2 rounded-full bg-primary/55" />
              <div className="absolute left-[4.4rem] top-1/2 h-2 w-3 -translate-y-1/2 rounded-full bg-orange-300" />
            </div>
          </div>
        </motion.div>
      );
    default:
      return (
        <motion.div className={`${shell} h-36 w-40`} animate={idleAnimation} transition={idleTransition}>
          <div className="relative h-full w-full">
            <div className="absolute left-9 top-6 flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-gradient-to-br from-card via-background to-accent/60 shadow-[0_18px_30px_rgba(0,0,0,0.16)] transition-transform duration-700 group-hover:-translate-y-2">
              <div className="absolute h-14 w-14 rounded-full border border-primary/15" />
              <Fan size={28} className="text-primary transition-transform duration-700 group-hover:rotate-[180deg]" />
            </div>
            <div className="absolute right-0 top-10 flex items-center gap-2 rounded-2xl border border-white/40 bg-white/90 px-3 py-2 shadow-xl transition-transform duration-700 group-hover:translate-x-1 group-hover:-translate-y-2 dark:border-white/10 dark:bg-zinc-900/90">
              <Snowflake size={16} className="text-primary" />
              <span className="font-mono-spec text-xs font-semibold text-foreground">32°</span>
            </div>
            <div className="absolute left-4 top-1 rounded-full border border-primary/20 bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              silent cool
            </div>
            <div className="absolute left-12 top-24 h-12 w-12 rounded-full bg-primary/18 blur-xl transition-all duration-700 group-hover:scale-125 group-hover:bg-primary/26" />
            <div className="absolute right-8 top-5 h-2.5 w-2.5 rounded-full bg-primary/80 transition-all duration-700 group-hover:-translate-y-3 group-hover:scale-125" />
          </div>
        </motion.div>
      );
  }
}
