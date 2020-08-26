import { SkynetClient } from "skynet-js";

const client = new SkynetClient('https://siasky.net');

export const upload  = async (file) => {
	try {
        const { skylink } = await client.upload(file);
        return skylink
    } catch (error) {
        throw error
    }
}