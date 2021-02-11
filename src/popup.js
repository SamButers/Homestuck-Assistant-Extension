function downloadSWF() {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, (tab) => {
		if(tab[0].url.includes('homestuck')) {
			let pageNum = (parseInt(tab[0].url.match(/.*story\/(?<pagenum>\d+)/).groups.pagenum) - 1).toString().padStart(5, '0');
			window.open(`https://www.homestuck.com/flash/hs2/${pageNum}/${pageNum}.swf`);
		}
		
		else
			alert("This page is not a Homestuck page.");
	});
}

document.getElementById("download-btn").addEventListener("click", downloadSWF);