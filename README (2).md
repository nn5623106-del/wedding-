# Background Music

Place your wedding background track in this folder as:

```
public/music/wedding-song.mp3
```

- Supported formats: `.mp3`, `.ogg`, `.wav`
- If you use a different file name or format, update `MUSIC_SRC` in
  `src/components/MusicPlayer.jsx`.
- The player never autoplays — music only starts when a guest taps the
  floating music button, in line with browser autoplay policies and
  guest comfort.
- Until a track is added, the button will simply do nothing when pressed
  (no errors are thrown to the user).
