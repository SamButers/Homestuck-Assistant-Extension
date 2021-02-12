let middleBg = $(".bg-light-gray--md");
let innerBg = $(".bg-hs-gray:not(.bg-light-gray--md)");

function rgbToHsl(r, g, b) {
	r /= 255, g /= 255, b /= 255;

	let max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;

	if (max == min) {
		h = s = 0;
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}

		h /= 6;
	}

	return [ h, s, l ];
}

if(middleBg.css('background-color') == 'rgb(198, 198, 198)' && innerBg.css('background-color') == 'rgb(239, 239, 239)') {
	innerBg.css('background-color', 'black');
	middleBg.css('background-color', '#292929');
	
	$('head').append(`
		<style>
			#story-footer a, .bg-hs-gray a {
				color: #42a6db;
			}
			
			#story-footer a:visited, .bg-hs-gray a:visited {
				color: #9c4fe9;
			}
		</style>
	`);
	
	let chat_colors = {};
	let chat_messages = $(".o_chat-log span");
	
	$('.line-caption, .type-hs-header').css('color', 'white');
	
	for(let c = 0; c < chat_messages.length; c += 1) {
		if(!chat_colors[chat_messages[c].style.color]) {
			let hslColor; 
			
			try {
				if(chat_messages[c].style.color[0] == '#')
					hslColor = rgbToHsl(parseInt(chat_messages[c].style.color.substr(1,2), 16),
												 parseInt(chat_messages[c].style.color.substr(3,2), 16),
												 parseInt(chat_messages[c].style.color.substr(5,2), 16));
												 
				if(chat_messages[c].style.color[0] == 'r') {
					let rgb = chat_messages[c].style.color.match(/\d+/g);
					hslColor = rgbToHsl(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
				}
				
				chat_colors[chat_messages[c].style.color] = `hsl(${hslColor[0] * 360}, ${hslColor[1] * 100}%, ${(hslColor[2] * 100) > 65?(hslColor[2] * 100):65}%)`;
			} catch(e) {
				switch(chat_messages[c].style.color) {
					case 'black':
						chat_colors[chat_messages[c].style.color] = '#818181';
				}
			}
		}
			
			chat_messages[c].style.color = chat_colors[chat_messages[c].style.color];
	}
}
