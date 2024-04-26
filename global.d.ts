// global.d.ts
export {};

declare global {
  interface Window {
    triggerAnimationFrame: () => void; // Define your custom method
  }
}
