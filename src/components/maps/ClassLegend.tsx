import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { prospectivityClasses } from "@/data/kakamegaLayers";

/* Click to reveal legend, shared by every map on the page so the ramp is
   explained the same way each time. It is plain HTML rather than the SDK
   widget, which means it still works if the SDK never loads. */
export default function ClassLegend({
	label = "Prospectivity classes"
}: {
	label?: string;
}) {
	const [open, setOpen] = useState(false);
	const panelId = useId();

	return (
		<div className="mt-4">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open}
				aria-controls={panelId}
				className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 border transition-colors duration-200"
				style={{ borderColor: "var(--border)", color: "var(--text-dim)" }}>
				{label}
				<ChevronDown
					size={13}
					aria-hidden="true"
					className="transition-transform duration-200"
					style={{ transform: open ? "rotate(180deg)" : "none" }}
				/>
			</button>

			<div id={panelId} hidden={!open}>
				<ul className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
					{prospectivityClasses.map((c) => (
						<li
							key={c.value}
							className="flex items-center gap-2 text-xs"
							style={{ color: "var(--text-dim)" }}>
							<span
								className="w-3.5 h-3.5 shrink-0 border"
								style={{ background: c.color, borderColor: "var(--border)" }}
								aria-hidden="true"
							/>
							{c.value}
						</li>
					))}
				</ul>
				<p
					className="text-xs leading-[1.6] mt-3 max-w-md"
					style={{ color: "var(--text-muted)" }}>
					The same five classes and the same breaks are used on every map here,
					defined once in code rather than taken from each service, so the two
					models can be compared directly.
				</p>
			</div>
		</div>
	);
}
