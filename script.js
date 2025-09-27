const tracks = [
    {
        id: 1,
        name: "Thodi Si Daaru",
        artist: "AP Dhillon ft. Shreya Ghoshal",
        album: "Thodi Si daaru",
        cover: "./Song/Thodi-Si-Daaru.jpg",
        url: "./Song/Thodi-Si-Daaru.mp3"
    },
    {
        id: 2,
        name: "Pal Pal",
        artist: "Afusic ft. Talwiinder",
        album: "Pal Pal",
        cover: "./Song/Pal-Pal.jpg",
        url: "./Song/Pal-Pal.mp3"
    },
    {
        id: 3,
        name: "APT.",
        artist: "Rosé ft. Bruno Mars",
        album: "Rosie",
        cover: "./Song/APT.jpg",
        url: "./Song/APT.mp3"
    },
    {
        id: 4,
        name: "Peakaboo",
        artist: "Kendrick Lamar",
        album: "GNX",
        cover: "./Song/Peekaboo.jpg",
        url: "./Song/Peekaboo.mp3"
    },
    {
        id: 5,
        name: "Die With A Smile",
        artist: "Lady Gaga ft. Bruno Mars",
        album: "Mayhem",
        cover: "./Song/Die-With-a-Smile.jpg",
        url: "./Song/Die-With-A-Smile.mp3"
    }
];
//Songs Section
const trendingList = document.getElementById('trending-list');
tracks.forEach(track => {
    const item = document.createElement('div');
    item.className = 'trending-item';
    item.innerHTML = `
        <img src="${track.cover}" width="90" height="90"><br>
        <div>${track.name}</div>
        <div>${track.artist}</div><br>
        <button onclick="playTrack(${track.id})"><i class="fa fa-play"></i>PLAY ▶</button><br>
        <button onclick="addToPlaylist(${track.id})"><i class="fa fa-plus"></i>Add ➕ to Queue</button>
    `;
    trendingList.appendChild(item);
});

let currentTrack = null;
let audio = new Audio();
const playerDiv = document.getElementById('music-player');

audio.addEventListener('ended', () => {
    if (playlist.length === 0) return;

    let currentIndex = playlist.findIndex(id => currentTrack && id === currentTrack.id);
    if (currentIndex === -1 || currentIndex === playlist.length - 1) {
        playTrack(playlist[0]);
    } else {
        playTrack(playlist[currentIndex + 1]);
    }
});

function playTrack(id) {
    const track = tracks.find(t => t.id === id);
    if (!track) return;
    currentTrack = track;
    audio.src = track.url;
    audio.play();
    renderPlayer();
}

function renderPlayer() {
    if (!currentTrack) {
        playerDiv.innerHTML = '<div>Select a song to play</div>';
        return;
    }
    playerDiv.innerHTML = `
        <img src="${currentTrack.cover}" width="80" height="80"><br>
        <div>${currentTrack.name}</div>
        <div>${currentTrack.artist}</div>
        <div class="player-controls">
            <button onclick="prevTrack()"><i class="fa fa-step-backward"></i>⏮</button>
            <button onclick="playPause()"><i class="fa fa-${audio.paused ? 'play' : 'pause'}"></i>⏯</button>
            <button onclick="nextTrack()"><i class="fa fa-step-forward"></i>⏭</button>
        </div>
        <input type="range" min="0" max="100" value="0" id="progress-bar" style="width:60%">

    `;
}

function playPause() {
    audio.paused ? audio.play() : audio.pause();
    renderPlayer();
}

function nextTrack() {
    let idx = tracks.findIndex(t => t.id === currentTrack.id);
    idx = (idx + 1) % tracks.length;
    playTrack(tracks[idx].id);
}

function prevTrack() {
    let idx = tracks.findIndex(t => t.id === currentTrack.id);
    idx = (idx - 1 + tracks.length) % tracks.length;
    playTrack(tracks[idx].id);
}

audio.addEventListener('timeupdate', () => {
    const progress = document.getElementById('progress-bar');
    if (progress && audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
});

let playlist = [];
function addToPlaylist(id) {
    if (!playlist.includes(id)) playlist.push(id);
    renderPlaylist();
}

function renderPlaylist() {
    const playlistDiv = document.getElementById('playlist');
    playlistDiv.innerHTML = `
        <h3>Playlist / Queue</h3>
        <ul id="playlist-list">
            ${playlist.map(pid => {
                const t = tracks.find(tk => tk.id === pid);
                return `<li>
                    ${t.name} - ${t.artist}
                    <button onclick="playTrack(${t.id})"><i class="fa fa-play"></i>🎮</button>
                    <button onclick="removeFromPlaylist(${t.id})"><i class="fa fa-times"></i>🗑️</button>
                </li>`;
            }).join("")}
        </ul>
    `;
}

function removeFromPlaylist(id) {
    playlist = playlist.filter(pid => pid !== id);
    renderPlaylist();
}

renderPlayer();
renderPlaylist();

//Theme
document.getElementById('theme-toggle').onclick = () => {
    const html = document.documentElement;
    let mode = html.getAttribute('data-theme');
    mode = mode === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', mode);
    document.getElementById('theme-toggle').textContent = mode === 'light' ? '🌙' : '☀️';
};