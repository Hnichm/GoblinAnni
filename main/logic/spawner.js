import GoblinBerserker from "../entities/goblinBerserker.js";
import GoblinBloodletter from "../entities/goblinBloodletter.js";
import GoblinBrute from "../entities/goblinBrute.js";

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
