export default class Enemy {
  constructor(health, damage, name) {
    this.health = health;
    this.damage = damage;
    this.name = name;
    document.querySelector(".enemy-image-tag").src =
      "../assets/Goblin red hair.png";
  }

  getHealth() {
    return this.health;
  }

  getDamage() {
    return this.damage;
  }

  takeDamage(damage) {
    this.health -= damage;
  }

  attack(target) {
    target.takeDamage(this.damage);
  }

  calculateStrength() {
    return this.damage + this.health;
  }

  isDead() {
    return this.health <= 0;
  }
}
