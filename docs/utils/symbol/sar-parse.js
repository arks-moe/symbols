import { BlowfishContext } from './parser/blowfish';
import { sarSchema } from './parser/sarstruct';
import struct from './parser/struct';
import prs from './parser/prs';

export default function processSarBuffer(buffer) {
	let u8view = new Uint8Array(buffer);
	const flag = u8view[3];
	if (u8view[0] !== 115 || u8view[1] !== 97 || u8view[2] !== 114) {
		throw new Error('not a SAR file');
	}

	if (flag !== 0x84 && flag !== 0x04) {
		throw new Error(`invalid flag ${flag}`);
	}

	u8view = u8view.slice(4, buffer.byteLength);
	const keyBuffer = Uint8Array.of(0x09, 0x07, 0xc1, 0x2b).buffer;
	const context = new BlowfishContext(keyBuffer);
	try {
		context.decrypt(u8view.buffer);
		let resultBuffer = u8view.buffer;
		if (flag === 0x84) {
			u8view = u8view.map((v) => v ^ 0x95);
			resultBuffer = prs.decompress(u8view.buffer);
		}
		const parsed = struct.parse(resultBuffer, sarSchema);
		return parsed;
	} catch (err) {
		throw new Error('Error decrypting file.');
	}
}
