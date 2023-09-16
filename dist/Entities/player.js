export default class Player {
  constructor(health, damage) {
    this.health = health;
    this.damage = damage;
    this.kills = 0;
  }

  calculateStrength() {
    return this.health + this.damage;
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

  heal(amount) {
    let originalHealth = this.health;
    this.health += amount;
    if (this.health > 100) {
      this.health = 100;
    }
    return this.health - originalHealth;
  }

  isDead() {
    return this.health <= 0;
  }
}
