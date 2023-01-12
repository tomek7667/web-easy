const refreshVideos = async (query = "") => {
	const videoBox = document.getElementById("videos-list");
	while (videoBox.firstChild) {
		videoBox.removeChild(videoBox.firstChild);
	}
	const videos = await (await fetch("/api/videos?query=" + query)).json();
	let count = 1;
	videos.forEach((video) => {
		const videoElement = document.createElement("p");
		videoElement.innerText = `${count++}. Title: ${video}`;
		videoBox.appendChild(videoElement);
	});
};

window.addEventListener("DOMContentLoaded", async () => {
	await refreshVideos();

	document.getElementById("search").addEventListener("input", (event) => {
		refreshVideos(event.target.value);
	});
});
