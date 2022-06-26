// import * as struct from './struct/index.js';

import struct from './struct/index';

const pointSchema = {
	x: 'u8',
	y: 'u8'
};

const layerSchema = {
	points: {
		topLeft: pointSchema,
		bottomLeft: pointSchema,
		topRight: pointSchema,
		bottomRight: pointSchema
	},
	props: (cursor, registry) => {
		const val1 = struct.parseWithCursor(cursor, 'u32le', registry);
		const val2 = struct.parseWithCursor(cursor, 'u32le', registry);

		const visible = !((val1 >> 31) & (1 > 0));
		const textureIndex = (val1 >> 21) & 1023;
		const transparency = (val1 >> 18) & 7;
		const colorR = (val1 >> 0) & 63;
		const colorG = (val1 >> 6) & 63;
		const colorB = (val1 >> 12) & 63;

		const colorX = (val2 >> 0) & 63;
		const colorY = (val2 >> 6) & 63;
		const colorZ = (val2 >> 12) & 63;

		return {
			visible,
			textureIndex,
			transparency,
			colorR,
			colorG,
			colorB,
			colorX,
			colorY,
			colorZ
		};
	}
};

const sarSchema = (cursor, registry) => {
	const authorId = struct.parseWithCursor(cursor, 'u32le', registry);
	const layerCount = struct.parseWithCursor(cursor, 'u8', registry);
	const sizeHeight = struct.parseWithCursor(cursor, 'u8', registry);
	const sizeWidth = struct.parseWithCursor(cursor, 'u8', registry);
	const soundEffect = struct.parseWithCursor(cursor, 'u8', registry);
	const layers = [];

	for (let i = 0; i < layerCount; i++) {
		layers.push(struct.parseWithCursor(cursor, layerSchema, registry));
	}

	let name = [];
	// Read rest of buffer into Symbol Art name
	const startPos = cursor.pos;
	for (let i = 0; i < (cursor.dataView.byteLength - startPos) / 2; i++) {
		try {
			const c = struct.parseWithCursor(cursor, 'u16le', registry);
			name.push(c);
		} catch (e) {
			break;
		}
	}

	const decoder = new TextDecoder('utf-16');
	const dataView = new DataView(Uint16Array.from(name).buffer);
	name = decoder.decode(dataView);

	return {
		authorId,
		layerCount,
		sizeHeight,
		sizeWidth,
		soundEffect,
		layers,
		name
	};
};

export { pointSchema, layerSchema, sarSchema };
