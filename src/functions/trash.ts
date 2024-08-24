import { createCanvas, loadImage } from "canvas";

export async function trash(
	avatar: string,
	isBuffer?: boolean
): Promise<Buffer | string> {
	if (!avatar)
		return Promise.reject(new Error("You are missing the Avatar URL"));
	const returnBuffer = isBuffer ?? true;

	try {
		const canvas = createCanvas(960, 960);
		const ctx = canvas.getContext("2d");

		const [template, avatarImage] = await Promise.all([
			fetch(
				"https://raw.githubusercontent.com/DankMemer/imgen/master/assets/trash/trash.bmp"
			),
			fetch(encodeURI(avatar)),
		]);

		const [templateBuffer, avatarBuffer] = await Promise.all([
			template.arrayBuffer().then((buf) => Buffer.from(buf)),
			avatarImage.arrayBuffer().then((buf) => Buffer.from(buf)),
		]);

		const [templateImage, personImage] = await Promise.all([
			loadImage(templateBuffer),
			loadImage(avatarBuffer),
		]);

		ctx.drawImage(templateImage, 0, 0, 960, 960);
		ctx.drawImage(personImage, 480, 0, 483, 483);

		if (returnBuffer) return canvas.toBuffer("image/png");
		else return canvas.toDataURL("image/png").split(",")[1];
	} catch (error) {
		return Promise.reject(
			new Error(
				`Failed to generate trash image: ${
					error instanceof Error ? error.message : String(error)
				}`
			)
		);
	}
}
