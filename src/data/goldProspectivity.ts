/* Content for the Kakamega gold prospectivity case study page.
   Every claim and figure here traces to the project record. Nothing is
   rendered that has not been confirmed: unconfirmed items are tracked in
   src/data/goldProspectivity.pending.md and are deliberately absent. */

export const study = {
	slug: "gold-prospectivity-kakamega",
	title: "Gold Prospectivity Mapping, Kakamega County",
	pageTitle:
		"Gold Prospectivity Mapping, Kakamega County · Kairos Spatial Solutions",
	metaDescription:
		"Machine learning gold targeting across the Busia-Kakamega Greenstone Belt. Two independent models, 61 predictor layers, validated on ground they had never seen.",
	eyebrow: "Mining · Mineral Exploration",
	location: "Kakamega County, Kenya",
	coordinateSystem: "Arc 1960 / UTM Zone 36N (WKID 21096)"
};

/* ── Hero world map ──
   Marked sites for the hero. Only a site with real work behind it is marked
   active and named. The empty slots are deliberately generic: they say what
   the map is for without asserting a project that does not exist. Add a site
   here and the hero picks it up, no component change needed. */
export const sites = [
	{
		name: "Kakamega County",
		region: "Kenya",
		mineral: "Gold",
		lon: 34.75,
		lat: 0.28,
		active: true
	},
	{
		name: "",
		region: "",
		mineral: "Your ground here",
		lon: -62.0,
		lat: -12.0,
		active: false
	},
	{
		name: "",
		region: "",
		mineral: "Your ground here",
		lon: 121.0,
		lat: -24.0,
		active: false
	},
	{
		name: "",
		region: "",
		mineral: "Your ground here",
		lon: 104.0,
		lat: 48.0,
		active: false
	}
];

/* ── Study area ── */
export const area = {
	county: "Kakamega County, western Kenya",
	corridor: {
		name: "Liranda Corridor",
		lengthKm: 12,
		belt: "Busia-Kakamega Greenstone Belt",
		deposits: ["Isulu", "Bushiangala"]
	},
	geology:
		"Nyanzian volcanic sequence. Mineralisation is shear zone hosted and structurally controlled.",
	subCounties: ["Lurambi", "Hamisi"]
};

/* ── Impact band. Six tiles, section 3 figures only. ── */
export const metrics = [
	{
		value: "61",
		label: "Data layers integrated",
		note: "geochemistry, remote sensing, structure, terrain and lithology"
	},
	{
		value: "68",
		label: "Confirmed occurrences",
		note: "known gold occurrences the models were trained on"
	},
	{
		value: "226.5",
		unit: "km²",
		label: "High priority ground",
		note: "Random Forest High and Very High classes combined"
	},
	{
		value: "0",
		label: "Occurrences missed",
		note: "both models recovered every known occurrence"
	}
];

/* ── The two models. Both ranking scores live in this one object so they
   can never be quoted apart from each other. ── */
export const models = {
	scoreName: "ranking score",
	scoreNote: "spatial holdout, ROC-AUC",
	scoreScale:
		"A ranking score of 1.0 is perfect ordering. 0.5 is a coin toss.",
	convergence:
		"The two models were built on different mathematics and trained separately. They independently converge on the same high priority target zones.",
	entries: [
		{
			name: "Random Forest",
			short: "RF",
			score: "0.981",
			precision: "85.2%",
			recall: "100%"
		},
		{
			name: "Support Vector Machine",
			short: "SVM",
			score: "0.975",
			precision: "73.3%",
			recall: "100%"
		}
	]
};

/* ── Four data streams ── */
export const dataStreams = [
	{
		icon: "FlaskConical",
		title: "Geochemistry",
		body: "Regional soil geochemical data covering 24 pathfinder and major elements, plus seven element ratios. Gold pathfinders include arsenic, antimony, tungsten, bismuth, copper, lead, zinc, manganese, silver and the iron to manganese ratio. These tie directly to the sulphide assemblage confirmed at Isulu and Bushiangala: arsenopyrite, sphalerite, galena and molybdenite."
	},
	{
		icon: "Satellite",
		title: "Remote sensing alteration",
		body: "Alteration indices derived from satellite imagery: Clay-AlOH, ferrous mineral and iron oxide. These pick up the mineral changes that hydrothermal fluids leave behind in the rock around a deposit."
	},
	{
		icon: "GitBranch",
		title: "Structure",
		body: "Euclidean distance to mapped fault structures. Gold here is structurally controlled, so how close a point sits to a known fault carries real predictive weight."
	},
	{
		icon: "Mountain",
		title: "Terrain and lithology",
		body: "DEM derivatives covering slope, plan curvature, profile curvature and general curvature, alongside 21 lithological units encoded as binary layers. Soil organic matter and pH are included as covariates."
	}
];

/* ── Training and validation ── */
export const validation = {
	trainingPoints: 409,
	occurrences: 68,
	backgroundPoints: 341,
	imbalance: "Class imbalance was handled with balanced class weighting.",
	blocks: 133,
	fishnetKm: 5,
	methods: [
		"GroupKFold cross validation using the spatial blocks as groups",
		"A GroupShuffleSplit spatial holdout reserving 25 percent of blocks"
	],
	separation:
		"Training and validation data were always spatially separated. That is what stops simple proximity to a known deposit from inflating the score.",
	classes: {
		count: 5,
		from: "Very Low",
		to: "Very High",
		method: "Jenks natural breaks"
	}
};

/* ── What the data shows ── */
export const findings = [
	"Banded iron formation and phyllite dominate as host lithology across the Very High zones.",
	"The highest confidence targets cluster in the Liranda Corridor and in Lurambi and Hamisi sub counties.",
	"Elevated arsenic, antimony and tungsten signatures run across the target zones."
];

/* ── Stack ── */
export const stack = [
	"ArcGIS Pro",
	"ArcGIS Notebooks",
	"Python with scikit-learn",
	"GDAL",
	"arcpy"
];
