import { useEffect } from "react";

/**
 * Pro Keyboard Shortcuts Hook
 * @param {Function} buy - Buy execution function
 * @param {Function} sell - Sell execution function
 */
export default function useKeyboard(buy, sell) {
  useEffect(() => {
    const handler = (e) => {
      // 1. Input Guard: Agar user kisi input field ya textarea mein type kar raha hai,
      // toh shortcuts ko disable kar do.
      const activeTag = document.activeElement.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") {
        return;
      }

      // 2. Multi-key Support: Shift + B for Buy, Shift + S for Sell (Zyaada safe hai)
      const key = e.key.toLowerCase();
      const isShift = e.shiftKey;

      if (isShift && key === "b") {
        e.preventDefault(); // Browser default action roko
        buy();
      }

      if (isShift && key === "s") {
        e.preventDefault();
        sell();
      }

      // 3. Optional: Escape key to blur inputs or close modals
      if (key === "escape") {
        document.activeElement.blur();
      }
    };

    // Passive listener for better performance
    window.addEventListener("keydown", handler);

    // Clean up
    return () => window.removeEventListener("keydown", handler);
  }, [buy, sell]);
}