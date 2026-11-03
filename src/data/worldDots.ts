/* Dot grid world map for the hero, generated from Natural Earth land
   polygons (world-atlas land-110m) by scanline fill on an equirectangular
   grid. Stored as hex nibbles, four columns per character, one string per
   row, so the whole map costs about 2339 characters instead of an image.

   Nothing here is a static image: the hero renders these as SVG. */

export const DOT_COLS = 150;
export const DOT_ROWS = 60;

/* Geographic span of the grid, used to place markers by real lon and lat */
export const DOT_BOUNDS = {
	lon0: -180.0,
	lon1: 180.0,
	lat0: -56.0,
	lat1: 83.0
};

const PACKED =
	"000000000fff7fffc800000000000000000000,000000001ff9fffff001fc0000007800000000,000000e003c7fffff000e00000000600000000,0000001c3fc03fffe00000003801ffc00fc000,000003ffffe00fffc0000000e1efffff870000,01fc041fbbfe0fff80000f0003fffffffffc00,7e00001ef3f9f807ffffc01f00600000000000,9800000003fbf83f8fff8c7000000000000000,19fffffffd0f87c00003effffffffffffffffc,03fffffff03e03c00007ffffffffffffffffe0,01f07ffff83f80000007effffffffffffc0600,00c01ffffe1fc00000c3dffffffffffff81e00,00001fffffbff00001e3fffffffffffffe1c00,000007fffffff00001fffffffffffffffe0800,000003fffffef800003fffffffffffffff0000,000001ffffff1800003ffffffffffffffa0000,000001ffffff8000003ffffefffffffff20000,000001fffffc000001fbfe0effffffffc60000,000001fffff8000001f37fffffffffff860000,000001fffff0000001e0dfff7ffffffd8c0000,000000fffff0000000bf0c7ffffffff9bc0000,0000003fffe0000001ff007ffffffffce00000,0000003fffc0000003fffffffffffffc000000,0000001fe0c0000003fffffffffffffc000000,0000000fe0e000000fffffff3ffffff8000000,0000000fe02000000fffffffe1fffffc000000,00400001e06000001ffffffff0ff7fc0000000,00200001e60e00000fffffeff07e7fc0000000,000000007e0000000fffffffc07c3f06000000,000000000f8000001fffffff00381f84000000,00000000038400000ffffffc00380f87000000,00000000019fc00007ffffff80300b0a000000,00000000007fe00007ffffff000c0807000000,00000000003ff80003e7ffff00003c18000000,00000000003ffc000001fffe00001e30000000,00000000007ffe000003fffc00000cfe800000,00000000007fff800003fff800000efc600000,00000000007ffff00001fff00000073e3f2000,00000000007ffff80000fff0000001003fd000,00000000003ffff80000fff00000003f078600,00000000003ffff00000fff000000000020200,00000000001fffe00000fff100000000720000,00000000001fffe00001fff380000003f70080,000000000007ffe00001ffe700000007ff000c,000000000007ffe00000ffc70000000fff8000,000000000007ffc00000ffc60000003fffc000,000000000007ff0000007fc60000003fffe000,000000000007fe0000007f800000003fffe000,000000000007fe0000007f800000003fffe000,000000000007fc0000003f000000001fffe000,000000000007f800000038000000003c1fe000,00000000000ff000000000000000000007c010,00000000000fe000000000000000000003801c,00000000000f80000000000000000000018038,00000000000f00000000000000000000018070,00000000001e000000000000000000000000e0,00000000001f00000000000000000000000000,00000000001e00000000000000000000000000,00000000000e00000000000000000000000000,00000000000700000000000000000000000000";

/* Expand the packed rows into [col, row] pairs once, at module load */
export const landDots: [number, number][] = (() => {
	const out: [number, number][] = [];
	PACKED.split(",").forEach((row, r) => {
		for (let i = 0; i < row.length; i++) {
			const nibble = parseInt(row[i], 16);
			for (let b = 0; b < 4; b++) {
				if (nibble & (1 << (3 - b))) out.push([i * 4 + b, r]);
			}
		}
	});
	return out;
})();

/* Project a real lon/lat onto the same grid the dots use */
export function projectToGrid(lon: number, lat: number): [number, number] {
	const x =
		((lon - DOT_BOUNDS.lon0) / (DOT_BOUNDS.lon1 - DOT_BOUNDS.lon0)) * DOT_COLS;
	const y =
		((DOT_BOUNDS.lat1 - lat) / (DOT_BOUNDS.lat1 - DOT_BOUNDS.lat0)) * DOT_ROWS;
	return [x, y];
}
