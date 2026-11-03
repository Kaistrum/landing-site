import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* Two panes stacked in the same box with a draggable divider, so the reader
   wipes one away to reveal the other at the identical extent. Pane contents
   are arbitrary, which is what lets live MapViews sit in each side.

   Direct manipulation only, so nothing animates and there is no reduced
   motion case. The divider is a real slider: focusable, arrow key driven, and
   it reports its position to assistive technology. */
export default function SwipeCompare({
	leftLabel,
	rightLabel,
	left,
	right,
	alt,
	accent,
	overlay,
	heightClass = "h-[420px] md:h-[520px]"
}: {
	leftLabel: string;
	rightLabel: string;
	left: React.ReactNode;
	right: React.ReactNode;
	alt: string;
	accent: string;
	overlay?: React.ReactNode;
	heightClass?: string;
}) {
	const [pct, setPct] = useState(50);
	const boxRef = useRef<HTMLDivElement>(null);
	const dragging = useRef(false);

	const setFromClientX = useCallback((clientX: number) => {
		const el = boxRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		if (r.width === 0) return;
		setPct(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
	}, []);

	const onKeyDown = (e: React.KeyboardEvent) => {
		const step = e.shiftKey ? 10 : 2;
		let next: number | null = null;
		if (e.key === "ArrowLeft") next = pct - step;
		else if (e.key === "ArrowRight") next = pct + step;
		else if (e.key === "Home") next = 0;
		else if (e.key === "End") next = 100;
		if (next === null) return;
		e.preventDefault();
		setPct(Math.min(100, Math.max(0, next)));
	};

	const rounded = Math.round(pct);

	return (
		<figure className="m-0">
			<div
				ref={boxRef}
				className={`relative w-full overflow-hidden border ${heightClass}`}
				style={{
					background: "var(--bg-surface)",
					borderColor: "var(--border)"
				}}>
				{/* Right pane underneath, full width */}
				<div className="absolute inset-0">{right}</div>

				{/* Left pane on top, clipped to the divider */}
				<div
					className="absolute inset-0"
					style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
					{left}
				</div>

				<p
					className="absolute top-3 left-3 z-20 text-[10px] uppercase tracking-[0.16em] font-semibold px-2.5 py-1 pointer-events-none"
					style={{ background: "var(--bg)", color: "var(--text)" }}>
					{leftLabel}
				</p>
				<p
					className="absolute top-3 right-3 z-20 text-[10px] uppercase tracking-[0.16em] font-semibold px-2.5 py-1 pointer-events-none"
					style={{ background: "var(--bg)", color: "var(--text)" }}>
					{rightLabel}
				</p>

				<div
					className="absolute top-0 bottom-0 z-30 w-px pointer-events-none"
					style={{ left: `${pct}%`, background: accent }}
					aria-hidden="true"
				/>

				{/* The handle is the slider. It owns the drag, so pointer events on
				    the panes still reach the map views underneath. */}
				<div
					role="slider"
					tabIndex={0}
					aria-label={`Reveal ${leftLabel} or ${rightLabel}`}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={rounded}
					aria-valuetext={`${rounded} percent ${leftLabel}, ${
						100 - rounded
					} percent ${rightLabel}`}
					onKeyDown={onKeyDown}
					onPointerDown={(e) => {
						dragging.current = true;
						(e.target as HTMLElement).setPointerCapture?.(e.pointerId);
					}}
					onPointerMove={(e) => {
						if (dragging.current) setFromClientX(e.clientX);
					}}
					onPointerUp={(e) => {
						dragging.current = false;
						(e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
					}}
					onPointerCancel={() => {
						dragging.current = false;
					}}
					className="absolute top-1/2 z-40 flex items-center justify-center w-11 h-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize focus:outline-none focus-visible:ring-2"
					style={{
						left: `${pct}%`,
						background: accent,
						color: "#FFFFFF",
						touchAction: "none"
					}}>
					<ChevronLeft size={14} aria-hidden="true" />
					<ChevronRight size={14} aria-hidden="true" />
				</div>

				{overlay}
			</div>

			<p className="sr-only">{alt}</p>
			<figcaption
				className="text-xs leading-[1.6] mt-3"
				style={{ color: "var(--text-muted)" }}>
				{alt}
			</figcaption>
		</figure>
	);
}
