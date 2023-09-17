import GoblinBerserker from "../Entities/goblinBerserker.js";
import GoblinBloodletter from "../Entities/goblinBloodletter.js";
import GoblinBrute from "../Entities/goblinBrute.js";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export function spawnEnemy(player) {
  const playerStrength = player.calculateStrength();

  const enemyList = [
    new GoblinBerserker(),
    new GoblinBloodletter(),
    new GoblinBrute(),
  ];

  const enemies = enemyList.filter((enemy) => {
    const enemyStrength = enemy.calculateStrength();
    // TODO change return value to a balanced number
    return Math.abs(playerStrength - enemyStrength) <= 200;
  });

  const randomIndex = Math.floor(Math.random() * enemies.length);

  return enemies[randomIndex];
}
