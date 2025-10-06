import { useEffect, useState } from "react";

/** ブレークポイントのデフォルト 1024px Tailwindのlgと同様*/
const DEFAULT_BREAK_POINT_NUMBER = 1024;

/** レスポンシブ切り替え判定hook breakPointSize未満でtrueを返却する */
export function useIsMobile(breakPointSize = DEFAULT_BREAK_POINT_NUMBER): boolean {
  const breakPointProperty = `(max-width: ${breakPointSize - 1}px)`;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(breakPointProperty);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    setIsMobile(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakPointProperty]);

  return isMobile;
}
