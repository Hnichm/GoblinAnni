import Enemy from "./enemy.js";

export default class GoblinBrute extends Enemy {
  constructor() {
    super(30, 20, "Goblin Brute");
    document.querySelector(".enemy-image-tag").src =
      "../assets/Red Goblin Punch.png";
  }
}
