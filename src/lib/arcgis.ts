/* Shared ArcGIS Maps SDK loader.

   The SDK is large, so it is never part of the app bundle. It is loaded once
   per page, from Esri's CDN, the first time any map module scrolls into view.
   Every map on the page awaits this same promise, so three maps cost one
   download.

   Why the AMD build and not @arcgis/core ESM:

   The ESM build published at js.arcgis.com/4.34/@arcgis/core/ runs fine as
   browser ESM, but it does not ship the Calcite component assets. The SDK
   resolves those from <assetsPath>/esri/widgets/support/components/assets,
   and that directory returns 404 on the CDN. The result is that Calcite
   components come up with an empty `messages` object, and the first widget
   that formats a localised string throws:

     Cannot read properties of undefined (reading 'replace')
       at Ue.renderItemAriaLive  (calcite-list, messages.total is undefined)

   That path is meant for npm installs, where you copy the assets folder into
   your own public directory. The AMD build is the one designed to be loaded
   straight from the CDN: init.js sets its own baseUrl from its script src,
   so every asset, Calcite's message bundles included, resolves correctly
   with no configuration. Popups and widgets are Calcite based too, so this
   is not only about the LayerList. */

const VERSION = "4.34";
const CDN = `https://js.arcgis.com/${VERSION}`;

const CSS_ID = "arcgis-sdk-css";
const JS_ID = "arcgis-sdk-js";

function injectCss(): Promise<void> {
	return new Promise((resolve) => {
		if (document.getElementById(CSS_ID)) return resolve();
		const link = document.createElement("link");
		link.id = CSS_ID;
		link.rel = "stylesheet";
		link.href = `${CDN}/esri/themes/light/main.css`;
		/* A missing stylesheet should degrade, not block the map forever */
		link.onload = () => resolve();
		link.onerror = () => resolve();
		document.head.appendChild(link);
	});
}

function injectLoader(): Promise<void> {
	return new Promise((resolve, reject) => {
		const existing = document.getElementById(JS_ID);
		if (existing) {
			if ((window as unknown as { require?: unknown }).require) return resolve();
			existing.addEventListener("load", () => resolve());
			existing.addEventListener("error", () =>
				reject(new Error("ArcGIS loader failed to load"))
			);
			return;
		}
		const script = document.createElement("script");
		script.id = JS_ID;
		script.src = `${CDN}/init.js`;
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("ArcGIS loader failed to load"));
		document.head.appendChild(script);
	});
}

/* Only the modules the page actually uses. Adding one here costs every map on
   the page, so keep it tight. */
const MODULE_IDS = [
	"esri/Map",
	"esri/views/MapView",
	"esri/layers/FeatureLayer",
	"esri/layers/GraphicsLayer",
	"esri/renderers/UniqueValueRenderer",
	"esri/renderers/SimpleRenderer",
	"esri/symbols/SimpleFillSymbol",
	"esri/symbols/SimpleLineSymbol",
	"esri/symbols/SimpleMarkerSymbol",
	"esri/PopupTemplate",
	"esri/core/reactiveUtils"
] as const;

/* Legend, LayerList, Home and Expand are deliberately absent. They render
   Calcite components whose message bundles do not resolve from the CDN build,
   and the first one to format a localised string throws
   "Cannot read properties of undefined (reading 'replace')". The page uses
   HTML controls instead, which also keeps them on the site's styling. */
export type Arcgis = {
	Map: any;
	MapView: any;
	FeatureLayer: any;
	GraphicsLayer: any;
	UniqueValueRenderer: any;
	SimpleRenderer: any;
	SimpleFillSymbol: any;
	SimpleLineSymbol: any;
	SimpleMarkerSymbol: any;
	PopupTemplate: any;
	reactiveUtils: any;
};

let cache: Promise<Arcgis> | null = null;

export function loadArcgis(): Promise<Arcgis> {
	if (cache) return cache;

	cache = (async () => {
		await injectCss();
		await injectLoader();

		const req = (window as unknown as { require?: any }).require;
		if (typeof req !== "function") {
			throw new Error("ArcGIS AMD loader did not initialise");
		}

		const mods = await new Promise<any[]>((resolve, reject) => {
			/* A module that never arrives would otherwise hang the slot on its
			   placeholder forever with no explanation. */
			const timer = setTimeout(
				() => reject(new Error("ArcGIS modules timed out")),
				30000
			);
			try {
				req(MODULE_IDS as unknown as string[], (...loaded: any[]) => {
					clearTimeout(timer);
					resolve(loaded);
				});
				req.on?.("error", (err: unknown) => {
					clearTimeout(timer);
					reject(err);
				});
			} catch (err) {
				clearTimeout(timer);
				reject(err);
			}
		});

		const [
			Map,
			MapView,
			FeatureLayer,
			GraphicsLayer,
			UniqueValueRenderer,
			SimpleRenderer,
			SimpleFillSymbol,
			SimpleLineSymbol,
			SimpleMarkerSymbol,
			PopupTemplate,
			reactiveUtils
		] = mods;

		return {
			Map,
			MapView,
			FeatureLayer,
			GraphicsLayer,
			UniqueValueRenderer,
			SimpleRenderer,
			SimpleFillSymbol,
			SimpleLineSymbol,
			SimpleMarkerSymbol,
			PopupTemplate,
			reactiveUtils
		} as Arcgis;
	})();

	/* A failed load must not be cached, or every later map on the page
	   inherits the failure with no chance to retry. */
	cache.catch(() => {
		cache = null;
	});

	return cache;
}

export const ARCGIS_VERSION = VERSION;
