export const isProfilePicBroken = (url) => {
	if (!url || typeof url !== "string") return true;
	// Previous provider that may fail to load in some regions.
	if (url.includes("avatar.iran.liara.run")) return true;
	return false;
};

const getDefaultProfilePic = ({ username, gender }) => {
	// Use a non-photorealistic, SVG-based avatar generator.
	// DiceBear API docs: https://dicebear.com/styles
	const safeSeed = encodeURIComponent(`${username || "user"}-${gender || "neutral"}`);
	return `https://api.dicebear.com/8.x/thumbs/svg?seed=${safeSeed}`;
};

export default getDefaultProfilePic;
