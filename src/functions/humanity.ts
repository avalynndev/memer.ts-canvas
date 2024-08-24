import { createCanvas, loadImage } from "canvas";
import { wrapText } from "../utils";

export async function humanity(
	text: string,
	isBuffer?: boolean
): Promise<Buffer | string> {
	if (!text) return Promise.reject(new Error("You are missing the Text"));
	const returnBuffer = isBuffer ?? true;

	if (text.length > 160)
		return Promise.reject(
			new RangeError("Text length must be less than 160 characters")
		);

	try {
		const canvas = createCanvas(807, 745);
		const ctx = canvas.getContext("2d");
		const image = await loadImage(
			"https://raw.githubusercontent.com/DankMemer/imgen/master/assets/humanity/humanity.bmp"
		);
		ctx.drawImage(image, 0, 0, 720, 723);
		ctx.font = "italic 25px Poppins";
		ctx.fillStyle = "#000000";

		const maxWidth = 195;
		const lineHeight = 30;

		wrapText(ctx, text, 455, 469, maxWidth, lineHeight);

		if (returnBuffer) return canvas.toBuffer("image/png");
		else return canvas.toDataURL("image/png").split(",")[1];
	} catch (error) {
		return Promise.reject(
			new Error(
				`Failed to generate humanity image: ${
					error instanceof Error ? error.message : String(error)
				}`
			)
		);
	}
}
