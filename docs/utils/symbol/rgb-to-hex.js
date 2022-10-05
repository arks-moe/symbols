function colorToHex(color) {
	const hexadecimal = color.toString(16);
	return hexadecimal.length === 1 ? '0' + hexadecimal : hexadecimal;
}

export default function convertRGBtoHex(red, green, blue) {
	return '0x' + colorToHex(red) + colorToHex(green) + colorToHex(blue);
}
