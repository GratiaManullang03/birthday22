const photos = [
	'./img/moment1.jpg',
	'./img/moment2.jpg',
	'./img/moment3.jpg',
	'./img/moment4.jpg',
	'./img/moment5.jpg',
	'./img/moment6.jpg',
	'./img/moment7.jpg',
	'./img/moment8.jpg',
	'./img/moment9.jpg',
];

const captions = [
	'Where it all began ❤️',
	'First adventure together',
	'Making memories',
	'Your smile lights up my world',
	'Perfect moments with you',
	'Forever grateful for you',
	'Our little paradise',
	'Love grows stronger each day',
	'You and me, always',
];

let currentSlide = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
const track = document.getElementById('galleryTrack');
const dotsContainer = document.getElementById('galleryDots');

// Global variable to store current click handler
let currentClickHandler = null;

// Initialize gallery
function initGallery() {
	// Create slides
	photos.forEach((photo, index) => {
		const slide = document.createElement('div');
		slide.className = 'gallery-slide';
		slide.innerHTML = `
          <img src="${photo}" alt="Moment ${index + 1}">
          <div class="gallery-caption">${captions[index]}</div>
        `;
		track.appendChild(slide);

		// Create dots
		const dot = document.createElement('div');
		dot.className = 'gallery-dot' + (index === 0 ? ' active' : '');
		dot.onclick = () => goToSlide(index);
		dotsContainer.appendChild(dot);
	});
}

function updateGallery() {
	track.style.transform = `translateX(-${currentSlide * 100}%)`;

	// Update dots
	document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
		dot.classList.toggle('active', index === currentSlide);
	});
}

function goToSlide(index) {
	currentSlide = Math.max(0, Math.min(index, photos.length - 1));
	updateGallery();
}

function galleryNext() {
	goToSlide(currentSlide + 1);
}

function galleryPrev() {
	goToSlide(currentSlide - 1);
}

// Touch/Mouse events for swipe
function handleStart(e) {
	isDragging = true;
	track.classList.add('dragging');
	startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
}

function handleMove(e) {
	if (!isDragging) return;
	e.preventDefault();
	currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
	const diff = currentX - startX;
	const currentTranslate = -currentSlide * 100;
	const translate = currentTranslate + (diff / track.offsetWidth) * 100;
	track.style.transform = `translateX(${translate}%)`;
}

function handleEnd() {
	if (!isDragging) return;
	isDragging = false;
	track.classList.remove('dragging');

	const diff = currentX - startX;
	const threshold = track.offsetWidth / 4;

	if (diff > threshold) {
		galleryPrev();
	} else if (diff < -threshold) {
		galleryNext();
	} else {
		updateGallery();
	}
}

// Add event listeners
track.addEventListener('mousedown', handleStart);
track.addEventListener('mousemove', handleMove);
track.addEventListener('mouseup', handleEnd);
track.addEventListener('mouseleave', handleEnd);

track.addEventListener('touchstart', handleStart);
track.addEventListener('touchmove', handleMove);
track.addEventListener('touchend', handleEnd);

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', initGallery);

// Music playback
function playMusic() {
	const music = document.getElementById('background-music');
	music.muted = true;
	const playPromise = music.play();

	if (playPromise !== undefined) {
		playPromise
			.then(() => {
				music.muted = false;
			})
			.catch((error) => {
				// User must interact first
			});
	}
}

document.body.addEventListener(
	'click',
	function () {
		playMusic();
	},
	{ once: true }
);

// Helper function to remove current click handler
function removeCurrentClickHandler() {
	if (currentClickHandler) {
		document.body.removeEventListener('click', currentClickHandler);
		currentClickHandler = null;
	}
}

// Main script
const content = document.getElementById('content');
const timer = document.getElementById('timer');

const second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;

let countDown = new Date('Jun 06, 2025 18:00:00').getTime(),
	x = setInterval(function () {
		let now = new Date().getTime(),
			distance = countDown - now;

		(document.getElementById('hours').innerText = Math.floor(distance / hour)),
			(document.getElementById('minutes').innerText = Math.floor(
				(distance % hour) / minute
			)),
			(document.getElementById('seconds').innerText = Math.floor(
				(distance % minute) / second
			));

		if (distance < 0) {
			timer.classList.add('d-none');
			confetti();
			clearInterval(x);
			_slideSatu();
		}
	}, second);

const _slideSatu = function () {
	const tap = document.getElementById('tap');
	const slideSatu = document.getElementById('slideSatu');

	slideSatu.classList.remove('d-none');

	setTimeout(function () {
		tap.classList.remove('d-none');

		// Remove any existing click handler
		removeCurrentClickHandler();

		// Create new click handler
		currentClickHandler = function (e) {
			// Remove the handler immediately to prevent multiple calls
			removeCurrentClickHandler();
			tap.classList.add('d-none');
			_slideDua();
		};

		document.body.addEventListener('click', currentClickHandler);
	}, 4000);
};

const _slideDua = function () {
	const slideSatu = document.getElementById('slideSatu');
	const tap = document.getElementById('tap');
	const slideDua = document.getElementById('slideDua');

	// Check if elements exist before proceeding
	if (!slideSatu || !slideDua) return;

	setTimeout(function () {
		if (slideSatu) {
			slideSatu.classList.replace(
				'animate__slideInDown',
				'animate__backOutDown'
			);
		}
		tap.classList.add('d-none');
		setTimeout(function () {
			if (slideSatu) {
				slideSatu.classList.add('d-none');
			}
		}, 1000);
	}, 1000);

	slideDua.classList.remove('d-none');

	setTimeout(function () {
		if (!slideDua) return; // Check if element still exists

		tap.classList.remove('d-none');

		// Remove any existing click handler
		removeCurrentClickHandler();

		// Create new click handler
		currentClickHandler = function (e) {
			// Remove the handler immediately
			removeCurrentClickHandler();

			if (slideDua) {
				slideDua.classList.replace(
					'animate__zoomInDown',
					'animate__fadeOutLeft'
				);
				slideDua.classList.remove('animate__delay-2s', 'animate__slow');
			}
			tap.classList.add('d-none');

			setTimeout(function () {
				if (slideDua && slideDua.parentNode) {
					slideDua.remove();
				}
				_slideTiga();
			}, 1000);
		};

		document.body.addEventListener('click', currentClickHandler);
	}, 35000);
};

const _slideTiga = function () {
	const tap = document.getElementById('tap');
	const slideTiga = document.getElementById('slideTiga');

	// Check if element exists
	if (!slideTiga) return;

	slideTiga.classList.remove('d-none');

	setTimeout(function () {
		if (!slideTiga) return; // Check again

		tap.classList.remove('d-none');

		// Remove any existing click handler
		removeCurrentClickHandler();

		// Create new click handler
		currentClickHandler = function (e) {
			// Remove the handler immediately
			removeCurrentClickHandler();

			if (slideTiga) {
				slideTiga.classList.remove('animate__delay-2s', 'animate__slow');
				slideTiga.classList.replace('animate__fadeInRight', 'animate__fadeOut');
			}
			tap.classList.add('d-none');

			setTimeout(function () {
				if (slideTiga && slideTiga.parentNode) {
					slideTiga.remove();
				}
				_slideGallery();
			}, 1000);
		};

		document.body.addEventListener('click', currentClickHandler);
	}, 27000);
};

const _slideGallery = function () {
	const tap = document.getElementById('tap');
	const slideGallery = document.getElementById('slideGallery');

	// Check if element exists
	if (!slideGallery) return;

	slideGallery.classList.remove('d-none');

	setTimeout(function () {
		if (!slideGallery) return; // Check again

		tap.classList.remove('d-none');

		// Remove any existing click handler
		removeCurrentClickHandler();

		// Create new click handler
		currentClickHandler = function (e) {
			// Prevent gallery navigation from triggering slide transition
			if (
				e.target.closest('.gallery-nav') ||
				e.target.closest('.gallery-dot')
			) {
				return;
			}

			// Remove the handler immediately
			removeCurrentClickHandler();

			if (slideGallery) {
				slideGallery.classList.replace('animate__fadeIn', 'animate__fadeOut');
			}
			tap.classList.add('d-none');

			setTimeout(function () {
				if (slideGallery && slideGallery.parentNode) {
					slideGallery.remove();
				}
				_slideEmpat();
			}, 1000);
		};

		document.body.addEventListener('click', currentClickHandler);
	}, 3000);
};

function getRandomPosition(element) {
	var x = document.body.offsetHeight - element.clientHeight;
	var y = document.body.offsetWidth - element.clientWidth;
	var randomX = Math.floor(Math.random() * 500);
	var randomY = Math.floor(Math.random() * y);
	return [randomX, randomY];
}

const _slideEmpat = function () {
	const slideEmpat = document.getElementById('slideEmpat');
	const btn = document.getElementsByTagName('button');

	if (!slideEmpat) return;

	slideEmpat.classList.remove('d-none');

	// Add floating animation to the box
	setTimeout(() => {
		if (slideEmpat) {
			slideEmpat.style.animation = 'pulse 2s ease-in-out infinite';
		}
	}, 2000);

	let clickCount = 0;
	const messages = [
		'Ayolah... 🥺',
		'Please? 🙏',
		'Kamu yakin? 😢',
		'Coba lagi deh 💔',
		'Terakhir ya? 😭',
	];

	if (btn[0]) {
		btn[0].addEventListener('click', function () {
			if (!slideEmpat) return;

			var xy = getRandomPosition(slideEmpat);
			slideEmpat.style.top = xy[0] + 'px';

			// Change button text based on click count
			const h5Element = document.querySelector('.kotak h5');
			if (clickCount < messages.length && h5Element) {
				h5Element.innerHTML = messages[clickCount];
				clickCount++;
			}

			// Add shake animation
			slideEmpat.classList.add('animate__shakeX');
			setTimeout(() => {
				if (slideEmpat) {
					slideEmpat.classList.remove('animate__shakeX');
				}
			}, 500);
		});
	}

	if (btn[1]) {
		btn[1].addEventListener('click', function () {
			if (!slideEmpat) return;

			// Add heart burst effect
			const hearts = ['💕', '💖', '💗', '💝', '💓'];
			for (let i = 0; i < 5; i++) {
				const heart = document.createElement('div');
				heart.innerHTML = hearts[i];
				heart.style.position = 'absolute';
				heart.style.fontSize = '30px';
				heart.style.left = Math.random() * 80 + 10 + '%';
				heart.style.top = '50%';
				heart.style.animation = `floatUp ${1 + Math.random()}s ease-out`;
				slideEmpat.appendChild(heart);

				setTimeout(() => {
					if (heart && heart.parentNode) {
						heart.remove();
					}
				}, 1500);
			}

			slideEmpat.classList.replace('animate__fadeInDown', 'animate__bounceOut');
			slideEmpat.classList.remove('animate__delay-2s');

			setTimeout(function () {
				if (slideEmpat && slideEmpat.parentNode) {
					slideEmpat.remove();
				}
				setTimeout(() => {
					_slideLima();
				}, 500);
			}, 1000);
		});
	}
};

const _slideLima = function () {
	const slideLima = document.getElementById('slideLima');
	const trims = document.getElementById('trims');

	if (!slideLima) return;

	slideLima.classList.remove('d-none');

	setTimeout(() => {
		if (trims) {
			trims.classList.remove('d-none');
		}
	}, 1000);

	// Set timer untuk transisi
	setTimeout(() => {
		if (slideLima) {
			slideLima.classList.add('animate__fadeOut');
		}
		if (trims) {
			trims.classList.add('animate__animated', 'animate__fadeOut');
		}

		setTimeout(() => {
			if (trims && trims.parentNode) {
				trims.remove();
			}
			if (slideLima && slideLima.parentNode) {
				slideLima.remove();
			}
			// LANGSUNG KE FINAL MESSAGE
			showFinalMessage();
		}, 1000);
	}, 5000); // Total 5 detik untuk slide lima
};

// Function to show final message with dynamic countdown
function showFinalMessage() {
	// Stop music
	// const music = document.getElementById('background-music');
	// if (music) {
	// 	music.pause();
	// }

	// Create final message overlay
	const finalSlide = document.createElement('div');
	finalSlide.className = 'final-message animate__animated animate__fadeIn';

	finalSlide.innerHTML = `
		<div class="floating-hearts"></div>
		<div class="final-content">
			<h2>Thank you for celebrating with me 💕</h2>
			<p>This page will close in <span id="countdown">10</span> seconds...</p>
			<div class="countdown-bar">
				<div id="countdownFill" class="countdown-fill"></div>
			</div>
			<button id="stayBtn" class="btn stay-btn">Stay Here With Me</button>
		</div>
	`;

	document.body.appendChild(finalSlide);

	// Create floating hearts
	const heartsContainer = finalSlide.querySelector('.floating-hearts');
	for (let i = 0; i < 15; i++) {
		setTimeout(() => {
			const heart = document.createElement('div');
			heart.className = 'heart';
			heart.innerHTML = ['💕', '💖', '💗', '💝', '💓', '❤️', '💜', '💛'][
				Math.floor(Math.random() * 8)
			];
			heart.style.left = Math.random() * 100 + '%';
			heart.style.animationDelay = Math.random() * 2 + 's';
			heart.style.animationDuration = 3 + Math.random() * 2 + 's';
			heartsContainer.appendChild(heart);
		}, i * 200);
	}

	// Dynamic countdown functionality
	let countdown = 10;
	const countdownEl = document.getElementById('countdown');
	const countdownFill = document.getElementById('countdownFill');

	// Animate countdown bar
	if (countdownFill) {
		countdownFill.style.transition = 'width 10s linear';
		setTimeout(() => {
			countdownFill.style.width = '0%';
		}, 50);
	}

	const countdownInterval = setInterval(() => {
		countdown--;
		if (countdownEl) {
			// Animate number change
			countdownEl.style.transform = 'scale(1.2)';
			countdownEl.textContent = countdown;
			setTimeout(() => {
				countdownEl.style.transform = 'scale(1)';
			}, 200);
		}

		if (countdown <= 0) {
			clearInterval(countdownInterval);
			// Try to close window
			window.close();
			// If window.close() doesn't work, redirect
			setTimeout(() => {
				window.location.href = 'about:blank';
			}, 500);
		}
	}, 1000);

	// Stay button functionality
	document.getElementById('stayBtn').addEventListener('click', () => {
		clearInterval(countdownInterval);
		finalSlide.classList.replace('animate__fadeIn', 'animate__fadeOut');

		setTimeout(() => {
			finalSlide.remove();
			// Restart everything from beginning
			location.reload();
		}, 1000);
	});
}

new TypeIt('#teks1', {
	strings: [
		'Happy birthday, my quiet universe.',
		'Before you, I was a song without rhythm, a line without a hook—drifting.',
		'But then you appeared, and suddenly, everything made more sense.',
		'You don’t even know how your presence colors the spaces I used to avoid.',
		"You're not just light in my sky—you’re the gravity that keeps me from floating away.",
	],
	startDelay: 4000,
	speed: 75,
	waitUntilVisible: true,
}).go();

new TypeIt('#teks2', {
	strings: [
		'So as your star rises another year higher, I hope the world reflects even a glimpse of the beauty you give it.',
		' ', // This creates a pause
		'And me? I’ll be here—maybe not loud, maybe not perfect—but always constant,',
		'orbiting quietly, loving fully.',
		'- Always yours',
	],
	startDelay: 2000,
	speed: 75,
	waitUntilVisible: true,
}).go();

new TypeIt('#trims', {
	strings: ['Love You So Much.'],
	startDelay: 2000,
	speed: 150,
	loop: false,
	waitUntilVisible: true,
}).go();

('use strict');

var onlyOnKonami = false;

function confetti() {
	// Globals
	var $window = $(window),
		random = Math.random,
		cos = Math.cos,
		sin = Math.sin,
		PI = Math.PI,
		PI2 = PI * 2,
		timer = undefined,
		frame = undefined,
		confetti = [];

	var runFor = 2000;
	var isRunning = true;

	setTimeout(() => {
		isRunning = false;
	}, runFor);

	// Settings
	var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
		pointer = 0;

	var particles = 150,
		spread = 20,
		sizeMin = 5,
		sizeMax = 12 - sizeMin,
		eccentricity = 10,
		deviation = 100,
		dxThetaMin = -0.1,
		dxThetaMax = -dxThetaMin - dxThetaMin,
		dyMin = 0.13,
		dyMax = 0.18,
		dThetaMin = 0.4,
		dThetaMax = 0.7 - dThetaMin;

	var colorThemes = [
		function () {
			return color(
				(200 * random()) | 0,
				(200 * random()) | 0,
				(200 * random()) | 0
			);
		},
		function () {
			var black = (200 * random()) | 0;
			return color(200, black, black);
		},
		function () {
			var black = (200 * random()) | 0;
			return color(black, 200, black);
		},
		function () {
			var black = (200 * random()) | 0;
			return color(black, black, 200);
		},
		function () {
			return color(200, 100, (200 * random()) | 0);
		},
		function () {
			return color((200 * random()) | 0, 200, 200);
		},
		function () {
			var black = (256 * random()) | 0;
			return color(black, black, black);
		},
		function () {
			return colorThemes[random() < 0.5 ? 1 : 2]();
		},
		function () {
			return colorThemes[random() < 0.5 ? 3 : 5]();
		},
		function () {
			return colorThemes[random() < 0.5 ? 2 : 4]();
		},
	];

	function color(r, g, b) {
		return 'rgb(' + r + ',' + g + ',' + b + ')';
	}

	// Cosine interpolation
	function interpolation(a, b, t) {
		return ((1 - cos(PI * t)) / 2) * (b - a) + a;
	}

	// Create a 1D Maximal Poisson Disc over [0, 1]
	var radius = 1 / eccentricity,
		radius2 = radius + radius;

	function createPoisson() {
		// domain is the set of points which are still available to pick from
		// D = union{ [d_i, d_i+1] | i is even }
		var domain = [radius, 1 - radius],
			measure = 1 - radius2,
			spline = [0, 1];
		while (measure) {
			var dart = measure * random(),
				i,
				l,
				interval,
				a,
				b,
				c,
				d;

			// Find where dart lies
			for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
				(a = domain[i]), (b = domain[i + 1]), (interval = b - a);
				if (dart < measure + interval) {
					spline.push((dart += a - measure));
					break;
				}
				measure += interval;
			}
			(c = dart - radius), (d = dart + radius);

			for (i = domain.length - 1; i > 0; i -= 2) {
				(l = i - 1), (a = domain[l]), (b = domain[i]);
				// c---d          c---d  Do nothing
				//   c-----d  c-----d    Move interior
				//   c--------------d    Delete interval
				//         c--d          Split interval
				//       a------b
				if (a >= c && a < d)
					if (b > d) domain[l] = d; // Move interior (Left case)
					else domain.splice(l, 2);
				// Delete interval
				else if (a < c && b > c)
					if (b <= d) domain[i] = c; // Move interior (Right case)
					else domain.splice(i, 0, c, d); // Split interval
			}

			for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
				measure += domain[i + 1] - domain[i];
		}

		return spline.sort();
	}

	var container = document.createElement('div');
	container.style.position = 'fixed';
	container.style.top = '0';
	container.style.left = '0';
	container.style.width = '100%';
	container.style.height = '0';
	container.style.overflow = 'visible';
	container.style.zIndex = '9999';

	// Confetto constructor
	function Confetto(theme) {
		this.frame = 0;
		this.outer = document.createElement('div');
		this.inner = document.createElement('div');
		this.outer.appendChild(this.inner);

		var outerStyle = this.outer.style,
			innerStyle = this.inner.style;
		outerStyle.position = 'absolute';
		outerStyle.width = sizeMin + sizeMax * random() + 'px';
		outerStyle.height = sizeMin + sizeMax * random() + 'px';
		innerStyle.width = '100%';
		innerStyle.height = '100%';
		innerStyle.backgroundColor = theme();

		outerStyle.perspective = '50px';
		outerStyle.transform = 'rotate(' + 360 * random() + 'deg)';
		this.axis =
			'rotate3D(' + cos(360 * random()) + ',' + cos(360 * random()) + ',0,';
		this.theta = 360 * random();
		this.dTheta = dThetaMin + dThetaMax * random();
		innerStyle.transform = this.axis + this.theta + 'deg)';

		this.x = $window.width() * random();
		this.y = -deviation;
		this.dx = sin(dxThetaMin + dxThetaMax * random());
		this.dy = dyMin + dyMax * random();
		outerStyle.left = this.x + 'px';
		outerStyle.top = this.y + 'px';

		// Create the periodic spline
		this.splineX = createPoisson();
		this.splineY = [];
		for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
			this.splineY[i] = deviation * random();
		this.splineY[0] = this.splineY[l] = deviation * random();

		this.update = function (height, delta) {
			this.frame += delta;
			this.x += this.dx * delta;
			this.y += this.dy * delta;
			this.theta += this.dTheta * delta;

			// Compute spline and convert to polar
			var phi = (this.frame % 7777) / 7777,
				i = 0,
				j = 1;
			while (phi >= this.splineX[j]) i = j++;
			var rho = interpolation(
				this.splineY[i],
				this.splineY[j],
				(phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
			);
			phi *= PI2;

			outerStyle.left = this.x + rho * cos(phi) + 'px';
			outerStyle.top = this.y + rho * sin(phi) + 'px';
			innerStyle.transform = this.axis + this.theta + 'deg)';
			return this.y > height + deviation;
		};
	}

	function poof() {
		if (!frame) {
			// Append the container
			document.body.appendChild(container);

			// Add confetti

			var theme =
					colorThemes[onlyOnKonami ? (colorThemes.length * random()) | 0 : 0],
				count = 0;

			(function addConfetto() {
				if (onlyOnKonami && ++count > particles) return (timer = undefined);

				if (isRunning) {
					var confetto = new Confetto(theme);
					confetti.push(confetto);

					container.appendChild(confetto.outer);
					timer = setTimeout(addConfetto, spread * random());
				}
			})(0);

			// Start the loop
			var prev = undefined;
			requestAnimationFrame(function loop(timestamp) {
				var delta = prev ? timestamp - prev : 0;
				prev = timestamp;
				var height = $window.height();

				for (var i = confetti.length - 1; i >= 0; --i) {
					if (confetti[i].update(height, delta)) {
						container.removeChild(confetti[i].outer);
						confetti.splice(i, 1);
					}
				}

				if (timer || confetti.length)
					return (frame = requestAnimationFrame(loop));

				// Cleanup
				document.body.removeChild(container);
				frame = undefined;
			});
		}
	}

	$window.keydown(function (event) {
		pointer =
			konami[pointer] === event.which
				? pointer + 1
				: +(event.which === konami[0]);
		if (pointer === konami.length) {
			pointer = 0;
			poof();
		}
	});

	if (!onlyOnKonami) poof();
}
