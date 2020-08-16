import { modFox, modScene } from './ui';
import {
  RAIN_CHANCE,
  SCENES,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextHungerTime,
  getNextDieTime,
} from './constants';

const gameState = {
  current: 'INIT',
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  tick() {
    this.clock++;
    console.log('clock', this.clock);

    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.time === this.sleepTime) {
      this.sleep();
    } else if (this.time === this.hungryTime) {
      this.getHungry();
    } else if (this.time === this.dieTime) {
      this.die();
    }

    return this.clock;
  },
  startGame() {
    this.current = 'HATCHING';
    this.wakeTime = this.clock + 3;
    modFox('egg');
    modScene('day');
  },
  wake() {
    this.current = 'IDLING';
    this.wakeTime = -1;
    modFox('idling');
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES(this.scene));
    this.sleepTime === this.clock + DAY_LENGTH;
    this.hungryTime === getNextHungerTime(this.clock);
  },
  sleep() {
    this.state = 'SLEEP';
    modFox('sleep');
    modScene('night');
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  getHungry() {
    this.current = 'HUNGRY';
    this.dieTime = getNextHungerTime(this.clock);
    this.hungryTime = -1;
    modFox('hungry');
  },
  die() {
    console.log('dead');
  },
  handleUserAction(icon) {
    if (
      ['SLEEP', 'FEEDING', 'CELEBRATING', 'HATCHING'].includes(this.current)
    ) {
      return;
    }
    if (this.current === 'INIT' || this.current === 'DEAD') {
      this.startGame();
      return;
    }

    switch (icon) {
      case 'weather':
        this.changeWeather();
        break;
      case 'poop':
        this.cleanUpPoop();
        break;
      case 'fish':
        this.feed();
        break;
    }
  },
  changeWeather() {
    console.log('changeWeather');
  },
  cleanUpPoop() {
    console.log('cleanUpPoop');
  },
  feed() {
    console.log('feed');
    if (this.current !== 'HUNGRY') {
      return;
    }
    this.current = 'FEEDING';
    this.dieTime = -1;
    this.poopTIme = getNextPoopTime(this.clock);
    modFox('feeding');
    this.timeToStartCelebrating = this.clock + 2;
  },
};

export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
