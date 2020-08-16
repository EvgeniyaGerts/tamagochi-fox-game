import game, { handleUserAction } from './gameState';
import { TICK_RATE } from './constants';
import initButtons from './buttons';

const init = () => {
  console.log('starting game');
  initButtons(handleUserAction);

  let nextTimeToTick = Date.now();

  const nextAnimationFrame = () => {
    const now = Date.now();
    if (nextTimeToTick <= now) {
      game.tick();
      nextTimeToTick = now + TICK_RATE;
    }
    requestAnimationFrame(nextAnimationFrame);
  };
  requestAnimationFrame(nextAnimationFrame);
};

init();
