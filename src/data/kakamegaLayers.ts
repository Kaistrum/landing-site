/* Layer registry for the Kakamega gold prospectivity maps.
   This is the only place in the codebase that holds an ArcGIS item ID.
   Nothing else may hardcode one.

   Field names, class values and feature counts below were read from the live
   REST endpoints, not assumed. Inspected 2026-10-29. If a service is
   republished, re-run the inspection before trusting the popup configs. */

export const portalUrl = "https://esrieanatres.maps.arcgis.com";

/* All eight items resolve to hosted Feature Service items on this host.
   Every layer is published in WKID 21096, Arc 1960 / UTM Zone 36N, which
   matches the project's working coordinate system. */
const SERVICE_HOST =
	"https://services6.arcgis.com/uEViOZnjj4wj8FP7/arcgis/rest/services";

export type LayerKey =
	| "randomForest"
	| "svm"
	| "newZones"
	| "goldOccurrences"
	| "activeLicences"
	| "subCounties"
	| "county";

export type LayerEntry = {
	/* ArcGIS Online item ID. Never construct or guess one of these. */
	itemId: string;
	/* Service name as published, for reference only. Prefer loading by itemId. */
	serviceName: string;
	/* Layer index inside the FeatureServer. Every one of these is a single
	   layer service, index 0. */
	layerId: number;
	/* Label safe to show a reader. See the notes on activeLicences and
	   newZones before changing any of these. */
	label: string;
	/* Confirmed reachable with no portal sign in. */
	publicAccess: boolean;
	/* Confirmed from the live service. */
	geometryType: "polygon" | "point";
	featureCount: number | null;
	/* Fields confirmed present, and safe to put in a popup. */
	popupFields: string[];
};

export const layers: Record<LayerKey, LayerEntry> = {
	randomForest: {
		itemId: "5a6e80a3b2fe44368797be44aedf26c1",
		serviceName: "RandomForest_LITHO",
		layerId: 0,
		label: "Random Forest prospectivity",
		publicAccess: true,
		geometryType: "polygon",
		featureCount: 4230,
		popupFields: ["Pros_Class", "Litho_Name", "Rock_Type", "Area_km2"]
	},
	svm: {
		itemId: "7e00e7629eeb42a9b49fc85afda9930b",
		serviceName: "SVM_LITHO",
		layerId: 0,
		label: "Support Vector Machine prospectivity",
		publicAccess: true,
		geometryType: "polygon",
		featureCount: 3947,
		popupFields: ["Pros_Class", "Litho_Name", "Rock_Type", "Area_km2"]
	},
	/* Service layer is named Overlap_New_1km. It carries both models' full
	   attribute sets side by side (Pros_Class from one, Pros_Cla_1 from the
	   other) and both are restricted to High and Very High only. That much is
	   confirmed from the data, so the label states exactly that. What the
	   "New_1km" part of the name refers to is not established, so no buffer
	   claim appears anywhere on the page. */
	newZones: {
		itemId: "03e61cad6f214b62805cdf6adbb14ac4",
		serviceName: "NewZones",
		layerId: 0,
		label: "High and Very High in both models",
		publicAccess: true,
		geometryType: "polygon",
		featureCount: 1354,
		popupFields: ["Pros_Class", "Pros_Cla_1", "Litho_Name"]
	},
	goldOccurrences: {
		itemId: "4072c5a652b442a899a0b412641af00f",
		serviceName: "GoldOccurences",
		layerId: 0,
		label: "Known gold occurrences",
		publicAccess: true,
		/* 68, matching the training set in the project record. */
		featureCount: 68,
		geometryType: "point",
		popupFields: ["Area_Name", "Source"]
	},
	/* Named ActiveLicenses_kakamega, but all four features carry
	   Status "Pending Renewal" and status_clean "Pending". None is active.
	   The label therefore says what the features are, not what the service is
	   called. Do not relabel this "Active licences". */
	activeLicences: {
		itemId: "de150bfb0dcc48cd810edc1ea790fa45",
		serviceName: "ActiveLicenses_kakamega",
		layerId: 0,
		label: "Prospecting licence areas",
		publicAccess: true,
		geometryType: "polygon",
		featureCount: 4,
		/* Parties is the holder. Name is empty on three of the four, so it is
		   not usable. Everything else on this layer is cadastre internals
		   (GUIDs, FullShapeGeometryWKT, Comments, Archived) and stays out. */
		popupFields: ["Parties", "Status", "Type", "Commodities"]
	},
	/* 30 features spanning eight counties: Bungoma, Busia, Kakamega, Nandi,
	   Siaya, Trans Nzoia, Uasin Gishu and Vihiga. Must be filtered or it draws
	   seven neighbours. See kakamegaSubCounties below. */
	subCounties: {
		itemId: "1351cb534d824c9c84a03c20f3e42782",
		serviceName: "SubCounties",
		layerId: 0,
		label: "Sub counties",
		publicAccess: true,
		geometryType: "polygon",
		featureCount: 30,
		popupFields: ["adm2_name", "adm1_name"]
	},
	county: {
		itemId: "54723ff781304adeabdb24441094c995",
		serviceName: "Kakamega",
		layerId: 0,
		label: "Kakamega County",
		publicAccess: true,
		geometryType: "polygon",
		featureCount: 1,
		popupFields: []
	}
};

/* Lithology, deliberately excluded.
   Item 1fddec32bc9e48f7b91d986d663831fc, Lithology_Kakamega. It returns 403
   to an anonymous request and the decision is that it stays unshared, so the
   page does not reference it at all. This is settled, not pending: do not add
   it back, and do not reach for credentials, a proxy or an API key to make it
   load. The host rock story is carried instead by the Litho_Name and
   Rock_Type fields already present on the prospectivity layers. */

/* Fallbacks, deliberately unused.
   The inspection confirmed that both _LITHO layers do carry the five class
   field (Pros_Class, String, five values). So these plain layers are not
   needed and must stay commented out.

   randomForestPlain  62a2309b885c477f8688a02e01bcb0b9   // "Random Forest"
   svmPlain           88d9254d2df84be1be410c49ee9810d7   // "SVM" */

export function serviceUrl(key: LayerKey): string {
	const l = layers[key];
	return `${SERVICE_HOST}/${l.serviceName}/FeatureServer/${l.layerId}`;
}

/* Layers the page can actually draw without a sign in. */
export const publicLayerKeys = (Object.keys(layers) as LayerKey[]).filter(
	(k) => layers[k].publicAccess
);

/* ── The prospectivity class field ──
   Confirmed on randomForest, svm and newZones. String field, exactly these
   five values with this spelling.

   Both services ship a renderer keyed on `gridcode`, and those renderers
   disagree: Random Forest uses uniqueValue over gridcode 1 to 5, while SVM
   uses classBreaks over gridcode 0 to 5. SVM has one feature at gridcode 0,
   which maps to Very Low. Keying a shared renderer on gridcode would quietly
   misalign the two models, so the page keys on Pros_Class instead and defines
   one renderer in code for both sides. */
export const CLASS_FIELD = "Pros_Class";

export const prospectivityClasses = [
	{ value: "Very Low", color: "#FFFFD4" },
	{ value: "Low", color: "#FED98E" },
	{ value: "Moderate", color: "#FE9929" },
	{ value: "High", color: "#D95F0E" },
	{ value: "Very High", color: "#993404" }
] as const;

/* Five step sequential ramp, yellow through orange to brown. Sequential in
   lightness as well as hue, so it survives red green colour blindness and
   greyscale printing, and it sits on a quiet grey basemap without competing.
   Used identically in Map A, Map B, the legend and the hero still. */
export const classFillOpacity = 0.75;

/* Feature counts per class, read from the live services. Useful for the
   legend and for sanity checking a renderer against the data. */
export const classCounts = {
	randomForest: {
		"Very Low": 571,
		Low: 1401,
		Moderate: 1060,
		High: 892,
		"Very High": 306
	},
	svm: {
		"Very Low": 582,
		Low: 824,
		Moderate: 879,
		High: 1190,
		"Very High": 472
	}
} as const;

/* ── Map extent ──
   Views are constrained to the county plus a margin so a reader cannot pan
   off to another continent. Built from the county layer at runtime rather
   than hardcoded here. */
export const EXTENT_PADDING_RATIO = 0.15;

/* ── Sub county filter ──
   The sub county service covers eight counties. Kakamega's twelve, confirmed
   from the live service. Note that Hamisi is NOT among them: it sits in
   Vihiga County, which conflicts with the project record's statement that
   targets cluster in "Lurambi and Hamisi sub counties". Unresolved, see
   goldProspectivity.pending.md. */
export const kakamegaSubCounties = [
	"Butere",
	"Ikolomani",
	"Khwisero",
	"Likuyani",
	"Lugari",
	"Lurambi",
	"Malava",
	"Matungu",
	"Mumias East",
	"Mumias West",
	"Navakholo",
	"Shinyalu"
] as const;

export const subCountyWhere = "adm1_name = 'Kakamega'";

/* ── Basemap ──
   Quiet neutral so the class ramp carries the colour. */
export const BASEMAP = "gray-vector";
