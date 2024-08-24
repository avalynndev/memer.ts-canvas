import { createCanvas, loadImage } from "canvas";

export async function disability(
	avatar: string,
	isBuffer?: boolean
): Promise<Buffer | string> {
	if (!avatar) {
		return Promise.reject(new Error("You are missing the Avatar URL"));
	}
	const returnBuffer = isBuffer ?? true;

	try {
		const canvas = createCanvas(663, 618);
		const ctx = canvas.getContext("2d");

		const [templateImage, personImage] = await Promise.all([
			loadImage(
				"https://raw.githubusercontent.com/DankMemer/imgen/master/assets/disability/disability.bmp"
			),
			loadImage(encodeURI(avatar)),
		]);

		ctx.drawImage(templateImage, 0, 0, 663, 618);
		ctx.drawImage(personImage, 450, 325, 175, 175);

		if (returnBuffer) return canvas.toBuffer("image/png");
		else return canvas.toDataURL("image/png").split(",")[1];
	} catch (error) {
		return Promise.reject(
			new Error(
				`Failed to generate disability image: ${
					error instanceof Error ? error.message : String(error)
				}`
			)
		);
	}
}
