# Jyoti — Cinematic Birthday Experience

A full-screen 8-scene romantic birthday microsite built with React, TypeScript, Vite and Framer Motion.

## Run
```bash
npm install
npm run dev
```

## Add your assets
Put these files in `public/assets/`:

- `gift.png` — transparent realistic luxury gift box (recommended 1200×1200 or larger)
- `cake.png` — transparent realistic birthday cake with candle (recommended 1200×1200 or larger)
- `audio/background-music.mp3`
- `audio/voice-message.mp3`
- `photos/photo1.jpg` … `photo5.jpg`

The gift and cake have CSS fallbacks, so the site still works before you add the PNGs.

## Personalize
Edit `src/data/birthdayData.ts`. You can change the name, images, audio paths, captions, letter and final message without changing the scene components.

## Experience
1. Gift opening with glow burst
2. Four interactive balloons + hidden messages
3. Cake + candle/wish interaction
4. Voice message player
5. 3D-style photo memory carousel
6. Opening love letter
7. Animated photo collage
8. Final birthday celebration

Keyboard: Arrow Left / Arrow Right. Mobile: touch-friendly controls.
