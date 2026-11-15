export default function GameHeroImage({ src, alt }: { src: string; alt: string }) {
  const base = src.replace('/games/', '/games/optimized/').replace('.jpg', '');
  return <picture>
    <source media="(max-width:600px)" sizes="680px"
      srcSet={[640, 960, 1280, 1920].map(width => `${base}-phone-${width}.webp ${width}w`).join(', ')}/>
    <img src={`${base}-1920.webp`} alt={alt} width={3840} height={1240}
      srcSet={[640, 960, 1280, 1920, 2560].map(width => `${base}-${width}.webp ${width}w`).join(', ')}
      sizes="(max-width:800px) 2106px, 100vw" fetchPriority="high" decoding="async"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}/>
  </picture>;
}
