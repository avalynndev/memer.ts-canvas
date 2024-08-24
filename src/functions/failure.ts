import { createCanvas, loadImage } from "canvas";

export async function failure(
	avatar: string,
	isBuffer?: boolean
): Promise<Buffer | string> {
	if (!avatar)
		return Promise.reject(new Error("You are missing the Avatar URL"));
	const returnBuffer = isBuffer ?? true;

	try {
		const canvas = createCanvas(572, 767);
		const ctx = canvas.getContext("2d");

		const [template, avatarImage] = await Promise.all([
			fetch(
				"https://raw.githubusercontent.com/DankMemer/imgen/master/assets/failure/failure.bmp"
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

		ctx.drawImage(templateImage, 0, 0, 572, 767);
		ctx.drawImage(personImage, 143, 525, 215, 215);

		if (returnBuffer) return canvas.toBuffer("image/png");
		else return canvas.toDataURL("image/png").split(",")[1];
	} catch (error) {
		return Promise.reject(
			new Error(
				`Failed to generate failure image: ${
					error instanceof Error ? error.message : String(error)
				}`
			)
		);
	}
}
