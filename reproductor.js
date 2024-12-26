// Lista de canciones
const songs = [
    { title: "Intro Radio", artist: "Voz Carolina", src: "song1.mp3" },
    { title: "Al Stewart", artist: "The Year of the Cat", src: "song3.mp3" },
    { title: "Madonna", artist: "Material Girl ", src: "song7.mp3" },
    { title: "Ray Charles", artist: "Can't Stop Loving You", src: "song2.mp3" },
    { title: "Carole King", artist: "You've Got a Friend ", src: "song6.mp3" },
    { title: "Take Five", artist: "Dave Brubeck", src: "song4.mp3" },
    { title: "Procol Harum", artist: "Una Blanca Palidez", src: "song5.mp3" },
    
    
];

// Elementos del DOM
const audioPlayer = document.getElementById("audio-player");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const searchInput = document.getElementById("search-input");
const songList = document.querySelector(".song-list");

// Variables
let currentSongIndex = 0;
let isPlaying = false;

// Cargar canción
function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    highlightCurrentSong();
}

// Reproducir canción
function playSong() {
    isPlaying = true;
    audioPlayer.play();
    playBtn.textContent = "⏸️";
}

// Pausar canción
function pauseSong() {
    isPlaying = false;
    audioPlayer.pause();
    playBtn.textContent = "▶️";
}

// Cambiar canción
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

// Actualizar progreso
function updateProgress() {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
}

// Cambiar progreso manualmente
function setProgress() {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
}

// Filtrar canciones
function filterSongs() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm)
    );
    displaySongs(filteredSongs);
}

// Mostrar canciones en la lista
function displaySongs(songsToDisplay) {
    songList.innerHTML = "";
    songsToDisplay.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener("click", () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        songList.appendChild(li);
    });
    highlightCurrentSong();
}

// Resaltar canción actual
function highlightCurrentSong() {
    const allSongs = songList.children;
    for (let song of allSongs) {
        song.classList.remove("active");
    }
    if (allSongs[currentSongIndex]) {
        allSongs[currentSongIndex].classList.add("active");
    }
}

// Inicializar
searchInput.addEventListener("input", filterSongs);
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audioPlayer.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("input", setProgress);

// Cargar la lista inicial y la primera canción
displaySongs(songs);
loadSong(currentSongIndex);
