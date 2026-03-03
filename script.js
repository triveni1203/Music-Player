const songs = [
    {
        name: "Perfect",
        artist: "Ed Sheeran",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
    },
    {
        name: "Blinding Lights",
        artist: "The Weeknd",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
    },
    {
        name: "Shape of You",
        artist: "Ed Sheeran",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae"
    }
];

let currentSongIndex = 0;
const audio = new Audio();

const songList = document.getElementById("songList");
const playerTitle = document.getElementById("playerTitle");
const playerCover = document.getElementById("playerCover");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");

songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.classList.add("song-item");
    div.innerHTML = `
        <img src="${song.cover}">
        <div>
            <div>${song.name}</div>
            <small>${song.artist}</small>
        </div>
    `;
    div.addEventListener("click", () => {
        currentSongIndex = index;
        loadSong(index);
        audio.play();
        playBtn.textContent = "⏸";
    });
    songList.appendChild(div);
});

function loadSong(index) {
    audio.src = songs[index].file;
    playerTitle.textContent = songs[index].name;
    playerCover.src = songs[index].cover;
    highlightActive();
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playBtn.textContent = "⏸";
}

function prevSong() {
    currentSongIndex =
        (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playBtn.textContent = "⏸";
}

audio.addEventListener("timeupdate", () => {
    const progressPercent =
        (audio.currentTime / audio.duration) * 100;
    progress.style.width = progressPercent + "%";
});

progressContainer.addEventListener("click", e => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

function highlightActive() {
    const items = document.querySelectorAll(".song-item");
    items.forEach((item, index) => {
        item.classList.toggle("active", index === currentSongIndex);
    });
}

loadSong(currentSongIndex);