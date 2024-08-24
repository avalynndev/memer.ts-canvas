import { createCanvas, loadImage } from "canvas";

export async function roblox(avatar: string): Promise<Buffer> {
	if (!avatar)
		return Promise.reject(new Error("You are missing the Avatar URL"));

	try {
		const canvas = createCanvas(420, 420);
		const ctx = canvas.getContext("2d");

		const [template, avatarImage] = await Promise.all([
			fetch(
				"https://raw.githubusercontent.com/DankMemer/imgen/master/assets/roblox/roblox.bmp"
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

		ctx.drawImage(templateImage, 0, 0, 420, 420);
		ctx.drawImage(personImage, 168, 41, 56, 74);

		return canvas.toBuffer("image/png");
	} catch (error) {
		return Promise.reject(
			new Error(
				`Failed to generate roblox image: ${
					error instanceof Error ? error.message : String(error)
				}`
			)
		);
	}
}
