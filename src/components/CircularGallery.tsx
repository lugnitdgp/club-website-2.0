import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

type GL = Renderer['gl'];

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any): void {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

function createTextTexture(
  gl: GL,
  text: string,
  font: string = 'bold 30px monospace',
  color: string = 'white',
  meta?: {
    position?: string;
    bio?: string;
    email?: string;
    git_link?: string;
    linkedin_link?: string;
    facebook_link?: string;
  }
): { texture: Texture; width: number; height: number } {
  const W = 480, H = 230;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // --- Rounded clip ---
  const r = 18;
  ctx.beginPath();
  ctx.moveTo(r, 0); ctx.lineTo(W - r, 0);
  ctx.quadraticCurveTo(W, 0, W, r);
  ctx.lineTo(W, H - r);
  ctx.quadraticCurveTo(W, H, W - r, H);
  ctx.lineTo(r, H);
  ctx.quadraticCurveTo(0, H, 0, H - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.save();
  ctx.clip();

  // Background
  ctx.fillStyle = 'rgba(10, 8, 25, 0.72)';
  ctx.fillRect(0, 0, W, H);

  // Top shimmer line
  const shimmer = ctx.createLinearGradient(0, 0, W, 0);
  shimmer.addColorStop(0, 'rgba(255,255,255,0.0)');
  shimmer.addColorStop(0.5, 'rgba(255,255,255,0.08)');
  shimmer.addColorStop(1, 'rgba(255,255,255,0.0)');
  ctx.fillStyle = shimmer;
  ctx.fillRect(0, 0, W, 1.5);

  // Border
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(r, 0.5); ctx.lineTo(W - r, 0.5);
  ctx.quadraticCurveTo(W - 0.5, 0.5, W - 0.5, r);
  ctx.lineTo(W - 0.5, H - r);
  ctx.quadraticCurveTo(W - 0.5, H - 0.5, W - r, H - 0.5);
  ctx.lineTo(r, H - 0.5);
  ctx.quadraticCurveTo(0.5, H - 0.5, 0.5, H - r);
  ctx.lineTo(0.5, r);
  ctx.quadraticCurveTo(0.5, 0.5, r, 0.5);
  ctx.stroke();

  const PAD = 22;
  let y = PAD + 2;
  const fontSize = getFontSize(font);

  // --- Name ---
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.fillText(text, PAD, y);
  y += fontSize * 1.25;

  // --- Position ---
  if (meta?.position) {
    ctx.font = `${Math.round(fontSize * 0.56)}px sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.42)';
    ctx.fillText(meta.position, PAD, y);
    y += fontSize * 0.72;
  }

  // --- Divider ---
  y += 8;
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.fillRect(PAD, y, W - PAD * 2, 1);
  y += 13;

  // --- Bio (2-line word wrap) ---
  if (meta?.bio) {
    const bioSize = Math.round(fontSize * 0.5);
    ctx.font = `${bioSize}px sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    const maxW = W - PAD * 2;
    const lineH = bioSize * 1.5;
    const words = meta.bio.split(' ');
    let line = '';
    let lineCount = 0;
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, PAD, y);
        y += lineH;
        line = word;
        lineCount++;
        if (lineCount >= 2) { line = ''; break; }
      } else {
        line = test;
      }
    }
    if (line && lineCount < 2) {
      while (ctx.measureText(line + '…').width > maxW && line.length > 0) line = line.slice(0, -1);
      ctx.fillText(line + '…', PAD, y);
      y += lineH;
    }
    y += 4;
  }

  // --- Social pills ---
  const socials = [
    { link: meta?.git_link,      label: 'GitHub',   icon: 'GH' },
    { link: meta?.linkedin_link, label: 'LinkedIn', icon: 'in' },
    { link: meta?.facebook_link, label: 'Facebook', icon: 'fb' },
  ].filter(s => !!s.link);

  if (socials.length > 0) {
    const pillH = 26;
    const pillFontSize = Math.round(fontSize * 0.46);
    let pillX = PAD;

    for (const s of socials) {
      ctx.font = `500 ${pillFontSize}px sans-serif`;
      const labelW = ctx.measureText(s.label).width;
      const pillW = 12 + 18 + 6 + labelW + 12;

      // Pill bg
      ctx.beginPath();
      ctx.roundRect(pillX, y, pillW, pillH, pillH / 2);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // Icon circle
      const cx = pillX + 12 + 9;
      const cy = y + pillH / 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 9, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.16)';
      ctx.fill();

      // Icon text
      ctx.font = `700 ${pillFontSize - 1}px sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.icon, cx, cy);

      // Label
      ctx.font = `500 ${pillFontSize}px sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.62)';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.label, pillX + 12 + 18 + 6, cy);

      pillX += pillW + 8;
    }
  }

  ctx.restore();

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: W, height: H };
}

// ─── Meta type shared across classes ────────────────────────────────────────
interface MemberMeta {
  position?: string;
  bio?: string;
  email?: string;
  git_link?: string;
  linkedin_link?: string;
  facebook_link?: string;
}

// ─── Title ───────────────────────────────────────────────────────────────────
interface TitleProps {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor?: string;
  font?: string;
  meta?: MemberMeta;
}

class Title {
  gl: GL;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor: string;
  font: string;
  meta?: MemberMeta;
  mesh!: Mesh;

  constructor({ gl, plane, renderer, text, textColor = '#ffffff', font = '30px sans-serif', meta }: TitleProps) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.meta = meta;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl, this.text, this.font, this.textColor, this.meta
    );

    // Create fresh geometry + program for the label — never reuse the plane's
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.05) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });

    this.mesh = new Mesh(this.gl, { geometry, program });

    const aspect = width / height;
    const textHeightScaled = this.plane.scale.y * 0.30;
    const textWidthScaled = textHeightScaled * aspect;
    this.mesh.scale.set(textWidthScaled, textHeightScaled, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeightScaled * 0.5 - 0.05;
    this.mesh.setParent(this.plane);
  }
}

// ─── Media ───────────────────────────────────────────────────────────────────
interface ScreenSize { width: number; height: number; }
interface Viewport   { width: number; height: number; }

interface MediaProps {
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  text: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius?: number;
  font?: string;
  meta?: MemberMeta;
}

class Media {
  extra: number = 0;
  geometry: Plane;
  gl: GL;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: ScreenSize;
  text: string;
  viewport: Viewport;
  bend: number;
  textColor: string;
  borderRadius: number;
  font?: string;
  meta?: MemberMeta;
  program!: Program;
  plane!: Mesh;
  title!: Title;
  scale!: number;
  padding!: number;
  width!: number;
  widthTotal!: number;
  x!: number;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;

  constructor({ geometry, gl, image, index, length, renderer, scene, screen, text, viewport, bend, textColor, borderRadius = 0, font, meta }: MediaProps) {
    this.geometry  = geometry;
    this.gl        = gl;
    this.image     = image;
    this.index     = index;
    this.length    = length;
    this.renderer  = renderer;
    this.scene     = scene;
    this.screen    = screen;
    this.text      = text;
    this.viewport  = viewport;
    this.bend      = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font      = font;
    this.meta      = meta;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap:        { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed:      { value: 0 },
        uTime:       { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl:        this.gl,
      plane:     this.plane,
      renderer:  this.renderer,
      text:      this.text,
      textColor: this.textColor,
      font:      this.font,
      meta:      this.meta,
    });
  }

  update(scroll: { current: number; last: number }, direction: 'right' | 'left') {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y  = -arc;
        this.plane.rotation.z  = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y  = arc;
        this.plane.rotation.z  = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value  += 0.04;
    this.program.uniforms.uSpeed.value  = this.speed;

    const planeOffset    = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter  = this.plane.position.x - planeOffset >  viewportOffset;

    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (screen)   this.screen   = screen;
    if (viewport) this.viewport = viewport;

    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width  * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding    = 2;
    this.width      = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x          = this.width * this.index;
  }
}

// ─── App ─────────────────────────────────────────────────────────────────────
interface GalleryItem {
  image: string;
  text: string;
  position?: string;
  bio?: string;
  email?: string;
  git_link?: string;
  linkedin_link?: string;
  facebook_link?: string;
}

interface AppConfig {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: { ease: number; current: number; target: number; last: number; position?: number; };
  onCheckDebounce: (...args: any[]) => void;
  renderer!: Renderer;
  gl!: GL;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  medias: Media[] = [];
  mediasImages: GalleryItem[] = [];
  screen!: ScreenSize;
  viewport!: Viewport;
  raf: number = 0;

  boundOnResize!: () => void;
  boundOnWheel!: (e: Event) => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: () => void;

  isDown: boolean = false;
  start: number = 0;

  constructor(container: HTMLElement, { items, bend = 1, textColor = '#ffffff', borderRadius = 0, font = 'bold 30px Figtree', scrollSpeed = 2, scrollEase = 0.05 }: AppConfig) {
    document.documentElement.classList.remove('no-js');
    this.container   = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll      = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.renderer.gl.canvas as HTMLCanvasElement);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene()    { this.scene = new Transform(); }
  createGeometry() { this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 }); }

  createMedias(items: GalleryItem[] | undefined, bend: number, textColor: string, borderRadius: number, font: string) {
    const defaultItems: GalleryItem[] = [
      { image: 'https://picsum.photos/seed/1/800/600?grayscale',  text: 'Bridge' },
      { image: 'https://picsum.photos/seed/2/800/600?grayscale',  text: 'Desk Setup' },
      { image: 'https://picsum.photos/seed/3/800/600?grayscale',  text: 'Waterfall' },
      { image: 'https://picsum.photos/seed/4/800/600?grayscale',  text: 'Strawberries' },
      { image: 'https://picsum.photos/seed/5/800/600?grayscale',  text: 'Deep Diving' },
      { image: 'https://picsum.photos/seed/16/800/600?grayscale', text: 'Train Track' },
      { image: 'https://picsum.photos/seed/17/800/600?grayscale', text: 'Santorini' },
      { image: 'https://picsum.photos/seed/8/800/600?grayscale',  text: 'Blurry Lights' },
      { image: 'https://picsum.photos/seed/9/800/600?grayscale',  text: 'New York' },
      { image: 'https://picsum.photos/seed/10/800/600?grayscale', text: 'Good Boy' },
      { image: 'https://picsum.photos/seed/21/800/600?grayscale', text: 'Coastline' },
      { image: 'https://picsum.photos/seed/12/800/600?grayscale', text: 'Palm Trees' },
    ];

    const galleryItems = items && items.length ? items : defaultItems;
    // duplicate for infinite scroll
    this.mediasImages = [...galleryItems, ...galleryItems];

    this.medias = this.mediasImages.map((data, index) =>
      new Media({
        geometry:   this.planeGeometry,   // ← fixed: was this.geometry
        gl:         this.gl,
        image:      data.image,
        index,
        length:     this.mediasImages.length,
        renderer:   this.renderer,
        scene:      this.scene,
        screen:     this.screen,
        text:       data.text,
        viewport:   this.viewport,
        bend,                              // ← fixed: was this.bend
        textColor,                         // ← fixed: was this.textColor
        borderRadius,                      // ← fixed: was this.borderRadius
        font,                              // ← fixed: was this.font
        meta: {
          position:      data.position,
          bio:           data.bio,
          email:         data.email,
          git_link:      data.git_link,
          linkedin_link: data.linkedin_link,
          facebook_link: data.facebook_link,
        },
      })
    );
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = 'touches' in e ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this.scroll.target = (this.scroll.position ?? 0) + (this.start - x) * (this.scrollSpeed * 0.025);
  }

  onTouchUp() { this.isDown = false; this.onCheck(); }

  onWheel(e: Event) {
    const we = e as WheelEvent;
    const delta = we.deltaY || (we as any).wheelDelta || (we as any).detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias?.[0]) return;
    const width     = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item      = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov    = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: height * this.camera.aspect, height };
    this.medias?.forEach(m => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    this.medias?.forEach(m => m.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize    = this.onResize.bind(this);
    this.boundOnWheel     = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp   = this.onTouchUp.bind(this);
    window.addEventListener('resize',     this.boundOnResize);
    window.addEventListener('mousewheel', this.boundOnWheel);
    window.addEventListener('wheel',      this.boundOnWheel);
    window.addEventListener('mousedown',  this.boundOnTouchDown);
    window.addEventListener('mousemove',  this.boundOnTouchMove);
    window.addEventListener('mouseup',    this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown);
    window.addEventListener('touchmove',  this.boundOnTouchMove);
    window.addEventListener('touchend',   this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize',     this.boundOnResize);
    window.removeEventListener('mousewheel', this.boundOnWheel);
    window.removeEventListener('wheel',      this.boundOnWheel);
    window.removeEventListener('mousedown',  this.boundOnTouchDown);
    window.removeEventListener('mousemove',  this.boundOnTouchMove);
    window.removeEventListener('mouseup',    this.boundOnTouchUp);
    window.removeEventListener('touchstart', this.boundOnTouchDown);
    window.removeEventListener('touchmove',  this.boundOnTouchMove);
    window.removeEventListener('touchend',   this.boundOnTouchUp);
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas as HTMLCanvasElement);
    }
  }
}

// ─── React component ─────────────────────────────────────────────────────────
interface CircularGalleryProps {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = '#ffffff',
  borderRadius = 0.05,
  font = 'bold 30px Figtree',
  scrollSpeed = 2,
  scrollEase = 0.05,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase });
    return () => app.destroy();
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  return <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} />;
}