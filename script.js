window.onload = function() {
    startAnimation();
    initializeCandleBlowing();
    var album_units = document.getElementsByClassName("album_unit");
    for (let i = 0; i < album_units.length; i++) {
        album_units[i].onmouseenter = function() {
            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                var album_unit_inner = this.children[0];
                album_unit_inner.classList.add("pop_up");
            }
        };
        album_units[i].onmouseleave = function() {
            var album_unit_inner = this.children[0];
            album_unit_inner.classList.remove("pop_up");
        };
        album_units[i].onclick = function() {
            var album_unit_inner = this.children[0];
            if (album_unit_inner.classList.contains("pop_up")) {
                album_unit_inner.classList.remove("pop_up");
            } else {
                album_unit_inner.classList.add("pop_up");
            }
        }
    }
    var aTagsInAlbum = document.getElementsByClassName("album_inner")[0].children;
    for (let k = 0; k < aTagsInAlbum.length; k++) {
        aTagsInAlbum[k].onclick = function(e) {
            var aGrandChild = this.children[0].children[0];
            if (aGrandChild.classList.contains("pop_up")) {
                e.preventDefault();
            }
        }
    }
};

function startAnimation() {
    const container = document.getElementById('balloon-container');
    for (let i = 0; i < 20; i++) {
        createBalloon(container);
    }
    document.getElementById('sketchButton').style.display = 'inline-block';
}

function createBalloon(container) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon b' + getRandomInt(1, 5);
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.animationDuration = Math.random() * 3 + 2 + 's';
    container.appendChild(balloon);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function showSketch() {
    document.getElementById('sketch-container').style.display = 'flex';
}

function hideSketch() {
    document.getElementById('sketch-container').style.display = 'none';
    document.getElementById('message-container').style.display = 'block';
    const cakeContainer = document.getElementById('cake-container');
    cakeContainer.style.display = 'block';
    setTimeout(() => {
        cakeContainer.classList.add('visible');
    }, 100);  // Delay to ensure transition
}

function startBirthdayTextAnimation() {
    const container = document.getElementById('birthday-container');
    for (let i = 0; i < 20; i++) {
        createBirthdayText(container);
        createBirthdayTextvishali(container);
    }
}

function createBirthdayText(container) {
    const text = document.createElement('div');
    text.className = 'birthday';
    text.innerText = 'Happy Birthday Deppressoo!';
    text.style.left = Math.random() * 100 + 'vw';
    text.style.animationDuration = Math.random() * 5 + 5 + 's';
    container.appendChild(text);
}

function createBirthdayTextvishali(container) {
    const text = document.createElement('div');
    text.className = 'birthday';
    text.innerText = 'Happy Birthday Vishali Sharma!';
    text.style.left = Math.random() * 100 + 'vw';
    text.style.animationDuration = Math.random() * 5 + 5 + 's';
    container.appendChild(text);
}

// Function to show the photo album
function showPhotoAlbum() {
    const albumContainer = document.getElementById('album-container');
    albumContainer.style.display = 'block';
}

// Function to check if all candles are blown out
function checkAllCandlesBlownOut() {
    const candles = document.querySelectorAll('.candle');
    for (let candle of candles) {
        if (!candle.classList.contains('out')) {
            return false;
        }
    }
    return true;
}

// Function to hide the cake container
function hideCakeContainer() {
    const cakeContainer = document.getElementById('cake-container');
    cakeContainer.style.opacity = '0';
    setTimeout(() => {
        cakeContainer.style.display = 'none';
    }, 5000);  // 5 seconds delay to ensure transition
}

// Candle Blowing Functionality
function initializeCandleBlowing() {
    const cake = document.querySelector(".cake");
    const candleCountDisplay = document.getElementById("candleCount");
    let candles = [];
    let audioContext;
    let analyser;
    let microphone;

    function updateCandleCount() {
        const activeCandles = candles.filter(candle => !candle.classList.contains("out")).length;
        candleCountDisplay.textContent = activeCandles;
    }

    function addCandle(left, top) {
        const candle = document.createElement("div");
        candle.className = "candle";
        candle.style.left = left + "px";
        candle.style.top = top + "px";

        const flame = document.createElement("div");
        flame.className = "flame";
        candle.appendChild(flame);

        cake.appendChild(candle);
        candles.push(candle);
        updateCandleCount();
    }

    cake.addEventListener("click", function(event) {
        const rect = cake.getBoundingClientRect();
        const left = event.clientX - rect.left;
        const top = event.clientY - rect.top;
        addCandle(left, top);
    });

    function isBlowing() {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        let average = sum / bufferLength;

        return average > 50;  // Adjust threshold for sensitivity
    }

    function blowOutCandles() {
        let blownOut = 0;

        if (isBlowing()) {
            candles.forEach(candle => {
                if (!candle.classList.contains("out") && Math.random() > 0.5) {
                    candle.classList.add("out");
                    blownOut++;
                }
            });
        }

        if (blownOut > 0) {
            updateCandleCount();
            if (checkAllCandlesBlownOut()) {
                // Display the happy birthday text immediately
                startBirthdayTextAnimation();
                // Fade out the cake container and show the photo album after the fade-out effect
                setTimeout(hideCakeContainer, 500);  // Delay to ensure visibility before hiding
                setTimeout(showPhotoAlbum, 5500);  // Show after fade out
            }
        }
    }

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(stream) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
                analyser.fftSize = 256;
                setInterval(blowOutCandles, 200);
            })
            .catch(function(err) {
                console.log("Unable to access microphone: " + err);
            });
    } else {
        console.log("getUserMedia not supported on your browser!");
    }
}
