import { createCanvas, loadImage } from "canvas";

export async function dab(
	avatar: string,
	isBuffer?: boolean
): Promise<Buffer | string> {
	if (!avatar)
		return Promise.reject(new Error("You are missing the Avatar URL"));
	const returnBuffer = isBuffer ?? true;

	try {
		const canvas = createCanvas(800, 611);
		const ctx = canvas.getContext("2d");

		const [template, avatarImage] = await Promise.all([
			fetch(
				`https://raw.githubusercontent.com/DankMemer/imgen/master/assets/dab/dab.bmp`
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

		ctx.drawImage(personImage, 300, 0, 500, 500);
		ctx.drawImage(templateImage, 0, 0, 800, 611);

		if (returnBuffer) return canvas.toBuffer("image/png");
		else return canvas.toDataURL("image/png").split(",")[1];
	} catch (error) {
		return Promise.reject(
			new Error(
				`Failed to generate dab image: ${
					error instanceof Error ? error.message : String(error)
				}`
			)
		);
	}
}
