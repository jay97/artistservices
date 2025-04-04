import { COLORS } from "./constants/colors.js";
import { FONT_FAMILY, HEADER_FONT_FAMILY } from "./constants/text.js";
import {
  loadSecondarySpritesheets,
  loadSpritesheets,
} from "./spritesheets/index.js";
import State from "./classes/state.js";
import MusicPlayer from "./classes/music.js";
import render from "./render.js";
import animate from "./animate.js";
import events from "./events.js";
import interval from "./interval.js";

function initSentry() {
  if (
    window.Sentry === undefined ||
    !window.location.host.includes("artistservic.es")
  ) {
    return;
  }

  window.Sentry.onLoad(() => {
    Sentry.init({
      tracesSampleRate: 1.0,
    });
  });
}

async function loadAssets() {
  return new Promise(async (resolve) => {
    const loading = document.getElementById("loading");
    const message = loading.querySelector("h1");
    const enterButton = document.getElementById("enter-button");

    enterButton.style.display = "none";
    message.innerHTML = "Loading fonts...";

    PIXI.Assets.addBundle("fonts", [
      { alias: FONT_FAMILY.name, src: FONT_FAMILY.src },
      { alias: HEADER_FONT_FAMILY.name, src: HEADER_FONT_FAMILY.src },
    ]);

    await PIXI.Assets.loadBundle("fonts");

    message.innerHTML = "Loading sprites...";

    await Promise.all([loadSpritesheets(), loadSecondarySpritesheets()]);

    message.remove();

    enterButton.style.display = "flex";
    enterButton.addEventListener("click", () => {
      loading.remove();
      MusicPlayer.toggle();
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#4f8fba");
      resolve();
    });
  });
}

async function main() {
  initSentry();

  await loadAssets();

  const app = new PIXI.Application({
    background: COLORS.lightBlue,
    resizeTo: window,
    useContextAlpha: false,
    antialias: true,
  });

  PIXI.settings.RESOLUTION = window.devicePixelRatio;
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

  document.body.appendChild(app.view);

  State.app = app;

  render();
  animate();
  events();
  interval();
}

main();
