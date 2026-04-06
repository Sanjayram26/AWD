// Types
type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: string;
  favorite: boolean;
  playCount: number;
};

type Playlist = {
  name: string;
  createdDate: Date;
  songs: Song[];
  songCount: number;
};

// Sample Data
let songs: Song[] = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", genre: "Pop", duration: "3:20", favorite: false, playCount: 0 },
  { id: 2, title: "Shape of You", artist: "Ed Sheeran", album: "Divide", genre: "Pop", duration: "4:10", favorite: false, playCount: 0 },
  { id: 3, title: "Believer", artist: "Imagine Dragons", album: "Evolve", genre: "Rock", duration: "3:30", favorite: false, playCount: 0 },
  { id: 4, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", genre: "Pop", duration: "3:45", favorite: false, playCount: 0 },
  { id: 5, title: "Numb", artist: "Linkin Park", album: "Meteora", genre: "Rock", duration: "3:05", favorite: false, playCount: 0 },
];

// Playlist
let playlist: Playlist = {
  name: "My Playlist",
  createdDate: new Date(),
  songs: songs,
  songCount: songs.length
};

// Recently Played (fixed tuple)
let recentlyPlayed: [Song?, Song?, Song?, Song?, Song?] = [];

// DOM Elements
const grid = document.getElementById("songGrid")!;
const nowPlaying = document.getElementById("nowPlaying")!;
const searchInput = document.getElementById("search") as HTMLInputElement;
const genreFilter = document.getElementById("genreFilter") as HTMLSelectElement;
const artistFilter = document.getElementById("artistFilter") as HTMLSelectElement;

// Render Songs
function renderSongs(songList: Song[]) {
  grid.innerHTML = "";
  songList.forEach(song => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="https://via.placeholder.com/150" />
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
      <p>${song.album}</p>
      <p>${song.duration}</p>
    `;
    card.onclick = () => playSong(song);
    grid.appendChild(card);
  });
}

// Play Song
function playSong(song: Song) {
  song.playCount++;
  nowPlaying.innerText = `Now Playing: ${song.title} - ${song.artist}`;

  // Update Recently Played
  recentlyPlayed.unshift(song);
  if (recentlyPlayed.length > 5) recentlyPlayed.pop();

  console.log("Recently Played:", recentlyPlayed);
}

// Filter by Genre
function filterByGenre(genre: string) {
  if (genre === "All") return renderSongs(songs);
  renderSongs(songs.filter(song => song.genre === genre));
}

// Filter by Artist
function filterByArtist(artist: string) {
  if (artist === "All") return renderSongs(songs);
  renderSongs(songs.filter(song => song.artist === artist));
}

// Search
function searchSongs(query: string) {
  const result = songs.filter(song =>
    song.title.toLowerCase().includes(query.toLowerCase())
  );
  renderSongs(result);
}

// Sort using keyof
function sortBy(key: keyof Song) {
  const sorted = [...songs].sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
  renderSongs(sorted);
}

// Event Listeners
searchInput.addEventListener("input", () => searchSongs(searchInput.value));
genreFilter.addEventListener("change", () => filterByGenre(genreFilter.value));
artistFilter.addEventListener("change", () => filterByArtist(artistFilter.value));

// Initial Render
renderSongs(songs);