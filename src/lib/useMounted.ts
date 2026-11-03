import { useEffect, useState } from "react";

/* True only after the first client render.

   Anything whose markup depends on a browser-only value has to agree with the
   server on the very first client render, or React tears the tree down and
   rebuilds it. `useReducedMotion` is exactly that kind of value: it reads a
   media query, so on the server it is always false, while on a machine with
   reduced motion enabled the client would resolve true and render different
   markup.

   Gating on this hook keeps the first client render identical to the server,
   then lets the real value take effect on the next paint. */
export default function useMounted(): boolean {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	return mounted;
}
