function startAnimation() {
    const container = document.getElementById('balloon-container');
    for (let i = 0; i < 20; i++) {
        createBalloon(container);
    }
    document.getElementById('balloonButton').style.display = 'none';
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
    document.getElementById('cake-container').style.display = 'block';
    window.addEventListener('scroll', revealCake);
}

function revealCake() {
    const cakeContainer = document.getElementById('cake-container');
    const cakePosition = cakeContainer.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (cakePosition < screenPosition) {
        cakeContainer.classList.add('visible');
        document.getElementById('message-container').style.display = 'none'; // Remove the message
        window.removeEventListener('scroll', revealCake);
    }
}

function blowOutCake() {
    const flame = document.querySelector('.flame');
    flame.style.display = 'none';
    alert('Make a wish! Happy Birthday!');
    startBirthdayTextAnimation();
    showPhotoAlbum();
}

function startBirthdayTextAnimation() {
    const container = document.getElementById('birthday-container');
    for (let i = 0; i < 20; i++) {
        createBirthdayText(container);
    }
}

function createBirthdayText(container) {
    const text = document.createElement('div');
    text.className = 'birthday';
    text.innerText = 'Happy Birthday!';
    text.style.left = Math.random() * 100 + 'vw';
    text.style.animationDuration = Math.random() * 5 + 5 + 's';
    container.appendChild(text);
}

function showPhotoAlbum() {
    const albumContainer = document.getElementById('album-container');
    albumContainer.style.display = 'block';
}

// Photo album interactivity
window.onload = function() {
    var album_units = document.getElementsByClassName("album_unit");
    for (let i = 0; i < album_units.length; i++) {
        album_units[i].onmouseenter = function() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            } else {
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
}
