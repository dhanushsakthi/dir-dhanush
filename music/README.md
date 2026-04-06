# 🎵 Music & BGM Folder

Place your AI-generated songs and BGM files here.

## Supported Formats
- MP3
- WAV
- OGG

## How to Add Tracks
1. Place your audio file in this folder (e.g., `my-bgm.mp3`)
2. Open `index.html`
3. Find the `<!-- Audio Player Section -->` area
4. Copy an existing `<div class="audio-track">` block
5. Update the `data-src` attribute to point to your file: `data-src="music/my-bgm.mp3"`
6. Update the track name and type

## Example
```html
<div class="audio-track" data-src="music/my-bgm.mp3">
    <div class="track-info">
        <div class="track-visualizer">
            <span class="viz-bar"></span><span class="viz-bar"></span><span class="viz-bar"></span><span class="viz-bar"></span><span class="viz-bar"></span>
        </div>
        <div class="track-details">
            <span class="track-name">My BGM Track</span>
            <span class="track-type">Background Score</span>
        </div>
    </div>
    <div class="track-controls">
        <button class="play-btn" onclick="togglePlay(this)" aria-label="Play">
            <svg class="icon-play" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <svg class="icon-pause" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="display:none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        </button>
        <div class="progress-container" onclick="seekAudio(event, this)">
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
        <span class="track-duration">0:00</span>
    </div>
</div>
```
