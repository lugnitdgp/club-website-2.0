import React, { useCallback, useImperativeHandle, useLayoutEffect, useRef, useState, forwardRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu = forwardRef<{ toggleMenu: () => void; closeMenu: () => void }, StaggeredMenuProps>(
  ({
    position = 'right',
    colors = ['#B497CF', '#5227FF'],
    items = [],
    socialItems = [],
    displaySocials = true,
    displayItemNumbering = true,
    className,
    accentColor = '#5227FF',
    isFixed = false,
    closeOnClickAway = true,
    onMenuOpen,
    onMenuClose,
  }, ref) => {

  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef    = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const openTlRef          = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef      = useRef<gsap.core.Tween | null>(null);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);
  const busyRef            = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel        = panelRef.current;
      const preContainer = preLayersRef.current;
      if (!panel) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });
    });
    return () => ctx.revert();
  }, [position]);

  const buildOpenTimeline = useCallback(() => {
    const panel  = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) { closeTweenRef.current.kill(); closeTweenRef.current = null; }
    itemEntranceTweenRef.current?.kill();

    const itemEls    = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls  = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const offscreen   = position === 'left' ? -100 : 100;
    const layerStates = layers.map(el => ({ el, start: offscreen }));

    if (itemEls.length)   gsap.set(itemEls,    { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls,  { ['--sm-num-opacity' as any]: 0 });
    if (socialTitle)      gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime      = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsert   = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: panelDuration, ease: 'power4.out' }, panelInsert);

    if (itemEls.length) {
      const itemsStart = panelInsert + panelDuration * 0.15;
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } }, itemsStart);
      if (numberEls.length) {
        tl.to(numberEls, { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity' as any]: 1, stagger: { each: 0.08, from: 'start' } }, itemsStart + 0.1);
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsert + panelDuration * 0.4;
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(socialLinks, {
          y: 0, opacity: 1, duration: 0.55, ease: 'power3.out',
          stagger: { each: 0.08, from: 'start' },
          onComplete: () => gsap.set(socialLinks, { clearProps: 'opacity' }),
        }, socialsStart + 0.04);
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => { busyRef.current = false; });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel  = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls     = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        const numberEls   = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];
        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        if (itemEls.length)     gsap.set(itemEls,    { yPercent: 140, rotate: 10 });
        if (numberEls.length)   gsap.set(numberEls,  { ['--sm-num-opacity' as any]: 0 });
        if (socialTitle)        gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      },
    });
  }, [position]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) { onMenuOpen?.(); playOpen(); }
    else         { onMenuClose?.(); playClose(); }
  }, [playOpen, playClose, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    playClose();
  }, [playClose, onMenuClose]);

  useImperativeHandle(ref, () => ({ toggleMenu, closeMenu }));

  // Click-away to close
  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeOnClickAway, open, closeMenu]);

  // Detect dark mode from the DOM so the panel can adapt colours
  const [isDark, setIsDark] = useState(false);
  React.useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`sm-scope z-[9998] ${(isFixed || open) ? 'fixed top-0 left-0 w-screen h-screen overflow-hidden pointer-events-none' : 'w-full h-full'}`}
    >
      <div
        className={(className ? className + ' ' : '') + 'staggered-menu-wrapper pointer-events-none relative w-full h-full z-[9998]'}
        style={accentColor ? ({ ['--sm-accent' as any]: accentColor } as React.CSSProperties) : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        {/* Pre-layers (colour swipe strips) */}
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"
          aria-hidden="true"
        >
          {(() => {
            const raw = colors?.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
            const arr = [...raw];
            if (arr.length >= 3) arr.splice(Math.floor(arr.length / 2), 1);
            return arr.map((c, i) => (
              <div key={i} className="sm-prelayer absolute top-0 right-0 h-full w-full" style={{ background: c }} />
            ));
          })()}
        </div>

        {/* Panel */}
        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel absolute top-0 right-0 h-full flex flex-col p-[2em] overflow-y-auto z-10 backdrop-blur-[12px] pointer-events-auto"
          style={{
            WebkitBackdropFilter: 'blur(12px)',
            paddingTop: '1.5em',
            // Dark: deep purple/black glass. Light: white glass.
            background: isDark
              ? 'rgba(15, 5, 30, 0.92)'
              : 'rgba(255, 255, 255, 0.95)',
            borderLeft: isDark
              ? '1px solid rgba(168, 85, 247, 0.25)'
              : '1px solid rgba(0, 0, 0, 0.08)',
          }}
          aria-hidden={!open}
        >
          {/* ── Close button (X) — top-right of the panel ── */}
          <div className="flex justify-end mb-6">
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="
                w-9 h-9 flex items-center justify-center
                rounded-full
                cursor-pointer border-0
                transition-colors duration-150
              "
              style={{
                background: isDark ? 'rgba(168,85,247,0.18)' : 'rgba(0,0,0,0.06)',
                color: isDark ? '#e9d5ff' : '#1a1a1a',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = isDark
                  ? 'rgba(168,85,247,0.35)'
                  : 'rgba(0,0,0,0.12)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = isDark
                  ? 'rgba(168,85,247,0.18)'
                  : 'rgba(0,0,0,0.06)';
              }}
            >
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items?.length ? (
                items.map((it, idx) => (
                  <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                    <a
                      className="sm-panel-item relative font-semibold text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[color] duration-150 ease-linear inline-block no-underline pr-[1.4em]"
                      href={it.link}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                      style={{ color: isDark ? '#f3e8ff' : '#0f0f0f' }}
                    >
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                        {it.label}
                      </span>
                    </a>
                  </li>
                ))
              ) : (
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">
                  <span
                    className="sm-panel-item relative font-semibold text-[4rem] leading-none tracking-[-2px] uppercase inline-block pr-[1.4em]"
                    style={{ color: isDark ? '#f3e8ff' : '#0f0f0f' }}
                  >
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">No items</span>
                  </span>
                </li>
              )}
            </ul>

  {displaySocials && socialItems && socialItems.length > 0 && (
  <div 
    className="sm-socials mt-6 sm:mt-auto pt-4 sm:pt-6 md:pt-8 flex flex-col gap-2 md:gap-3" 
    aria-label="Social links"
  >
    <h3
      className="sm-socials-title m-0 text-sm md:text-base font-medium"
      style={{ color: accentColor ?? '#a855f7' }}
    >
      Socials
    </h3>
    <ul 
      className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-3 sm:gap-4 lg:gap-5 flex-wrap" 
      role="list"
    >
      {socialItems.map((s, i) => (
        <li key={s.label + i} className="sm-socials-item">
          <a
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            className="sm-socials-link text-base sm:text-lg md:text-[1.2rem] font-semibold no-underline inline-block py-1 md:py-[2px] transition-opacity duration-300 hover:opacity-75 focus-visible:opacity-75"
            style={{ color: isDark ? '#d8b4fe' : '#111111' }}
          >
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  </div>

)}
          </div>
        </aside>
      </div>
    </div>
  );
});

StaggeredMenu.displayName = 'StaggeredMenu';
export default StaggeredMenu;