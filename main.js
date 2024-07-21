import { VidstackPlayer, VidstackPlayerLayout } from "https://cdn.vidstack.io/player";

const refs = {
  player: document.querySelector("#player"),
  playerBackdrop: document.querySelector(".backdrop"),
  toggleButton: document.querySelector('[data-action="toggle-player"]'),
  showButton: document.querySelector('[data-action="show-player"]'),
  hideButton: document.querySelector('[data-action="hide-player"]'),
};

let isPlayerVisible = false;

const player = await VidstackPlayer.create({
  target: refs.player,
  title: "Презентація виробництва. Vesta.",
  src: "youtube/svpQ8upS9P4",
  // muted: true,
  // autoplay: true,
  // poster: "https://files.vidstack.io/sprite-fight/poster.webp",
  layout: new VidstackPlayerLayout({
    // thumbnails: "https://files.vidstack.io/sprite-fight/thumbnails.vtt",
  }),
});

const showPlayer = () => {
  isPlayerVisible = true;
  refs.toggleButton.textContent = "Hide";
  refs.playerBackdrop.classList.remove("hidden");
  player.currentTime = 0;
  player.play();

  if (player.state.canFullscreen) player.enterFullscreen();
};

const hidePlayer = () => {
  isPlayerVisible = false;
  refs.toggleButton.textContent = "Show";
  refs.playerBackdrop.classList.add("hidden");
  player.pause();
};

refs.toggleButton.addEventListener("click", (e) => {
  if (isPlayerVisible) hidePlayer();
  else showPlayer();
});

refs.showButton.addEventListener("click", showPlayer);

refs.playerBackdrop.addEventListener("click", ({ target }) => {
  if (target === refs.playerBackdrop || target === refs.hideButton) hidePlayer();
});
