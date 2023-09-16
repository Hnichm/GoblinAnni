import Player from "../Entities/player.js";
import Enemy from "../Entities/enemy.js";
import GoblinBrute from "../Entities/goblinBrute.js";
import GoblinBerserker from "../Entities/goblinBerserker.js";
import GoblinBloodletter from "../Entities/goblinBloodletter.js";
import { spawnEnemy } from "./spawner.js";

// Player variables
const player = new Player(100, 10);
let playerTurn = true;
let isActionInProgress = false;
let healCooldown = false;
let healTurnCooldown = 0;

// enemy spawn
let newEnemySpawned = false;

// Game over
const gameOverEvent = new Event("gameOver");

document.addEventListener("gameOver", function (e) {
  console.log("Game ending...");
  setTimeout(() => location.reload(), 1_000);
});

// Delay function
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Turn event
const turnOverEvent = new Event("turnOver");

// Turn end / enemy turn
document.addEventListener(
  "turnOver",
  function (e) {
    playerTurn = false;

    if (!playerTurn) {
      if (newEnemySpawned) {
        newEnemySpawned = false;
        playerTurn = true;
        return;
      }
      if (healCooldown === true) {
        healTurnCooldown -= 1;
      }
      if (healTurnCooldown == 0) {
        healCooldown = false;
      }
      enemy.attack(player);
      updateCombatLog(`${enemy.name} attacked you for ${enemy.damage} damage.`);
      updateDOM();
      playerTurn = true; // Switch back to player's turn
    }

    if (player.isDead()) {
      document.dispatchEvent(gameOverEvent);
    }
  },
  false
);

// Enemy variables
let enemy = new Enemy(10, 5, "Goblino");
// Dom variables
let domPlayerHealth = document.querySelector(".player-health");
let domPlayerName = document.querySelector(".player-name");
let domEnemyHealth = document.querySelector(".enemy-health");
let domEnemyName = document.querySelector(".enemy-name");
let combatLog = document.querySelector(".combat-log");
let domKills = document.querySelector(".kills");
const skill1 = document.querySelector(".skill1");
const skill2 = document.querySelector(".skill2");
const skill3 = document.querySelector(".skill3");

// Init dom
function initDOM() {
  domKills.textContent = `Kills: ${player.kills}`;
  domPlayerHealth.textContent = `Health: ${player.getHealth()}`;
  domPlayerName.textContent = "Goblin Annihilator";
  domEnemyHealth.textContent = `Health: ${enemy.getHealth()}`;
  domEnemyName.textContent = `${enemy.name}`;
}

// Update dom
function updateDOM() {
  domPlayerHealth.textContent = `Health: ${player.getHealth()}`;
  domEnemyHealth.textContent = `Health: ${enemy.getHealth()}`;
  domKills.textContent = `Kills: ${player.kills}`;
  domEnemyName.textContent = `${enemy.name}`;
}

function updateCombatLog(message) {
  const logEntry = document.createElement("div");
  logEntry.textContent = message;
  combatLog.appendChild(logEntry);
  combatLog.scrollTop = combatLog.scrollHeight;
}

initDOM();

// Enemy health check
function enemyDeath() {
  if (enemy.isDead()) {
    player.kills += 1;
    enemy = spawnEnemy(player);
    newEnemySpawned = true;
  }
}

// Player action
async function playerAction(skill) {
  switch (skill) {
    case "attack":
      if (isActionInProgress) {
        break;
      }
      isActionInProgress = true;
      player.attack(enemy);
      updateCombatLog(`Attacked ${enemy.name} for ${player.damage} damage.`);
      await delay(500);
      enemyDeath();
      updateDOM();
      await delay(500);

      document.dispatchEvent(turnOverEvent);
      isActionInProgress = false;
      break;

    case "heal":
      if (isActionInProgress) {
        break;
      }
      isActionInProgress = true;
      const amountHealed = player.heal(15);
      updateCombatLog(`Healed for ${amountHealed} points.`);
      healCooldown = true;
      await delay(500);
      updateDOM();

      document.dispatchEvent(turnOverEvent);
      healTurnCooldown = 2;
      isActionInProgress = false;
      break;
  }
}

// Skill event listeners
// Attack
skill1.addEventListener("click", () => {
  if (playerTurn && player.getHealth() > 0) {
    playerAction("attack");
  }
});

// Heal
skill2.addEventListener("click", () => {
  if (playerTurn && player.getHealth() > 0 && healCooldown === false) {
    playerAction("heal");
  }
  if (healCooldown === true && !isActionInProgress) {
    updateCombatLog(`On cooldown, try again in ${healTurnCooldown} turns.`);
  }
});

console.log(spawnEnemy.randomIndex);
