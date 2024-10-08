import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";

import { wrapText } from "../utils";

export async function cry(
	text: string,
	isBuffer?: boolean
): Promise<Buffer | string> {
	if (!text) return Promise.reject(new Error("You are missing the Text"));
	const returnBuffer = isBuffer ?? true;

	if (typeof text !== "string")
		return Promise.reject(new TypeError("Text must be a string"));

	if (text.length > 75)
		return Promise.reject(
			new RangeError("Text length must be less than 75 characters")
		);

	try {
		registerFont(
			path.join(
				__dirname,
				"..",
				"..",
				"assets",
				"fonts",
				"ComicSansMS3.ttf"
			),
			{ family: "ComicSans" }
		);
		const canvas = createCanvas(626, 768);
		const ctx = canvas.getContext("2d");

		const img = await fetch(
			"https://raw.githubusercontent.com/DankMemer/imgen/master/assets/cry/cry.bmp"
		);
		const buffer = await img.arrayBuffer().then((buf) => Buffer.from(buf));

		const image = await loadImage(buffer);

		ctx.drawImage(image, 0, 0, 626, 768);
		ctx.font = "bold 25px ComicSans";
		ctx.fillStyle = "#000000";

		const maxWidth = 198;
		const x = 370;
		const y = 80;

		wrapText(ctx, text, x, y, maxWidth, 30, Infinity, "center");

		if (returnBuffer) return canvas.toBuffer("image/png");
		else return canvas.toDataURL("image/png").split(",")[1];
	} catch (error) {
		return Promise.reject(
			new Error(
				`Failed to generate cry image: ${
					error instanceof Error ? error.message : String(error)
				}`
			)
		);
	}
}
