export default class Player {
  constructor(maxHealth, damage) {
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.damage = damage;
    this.kills = 0;
    this.level = 1;
    this.experience = 0;
  }

  calculateExperience(enemy) {
    this.experience += enemy.calculateStrength();
    console.log(this.experience);
  }

  experienceToLevelUp() {
    let experienceToLevelUp = this.level * 5;
    return experienceToLevelUp;
  }

  levelUp() {
    this.experienceToLevelUp();
    if (this.experience >= this.experienceToLevelUp()) {
      console.log("Level up!");
      this.level += 1;
      this.experience = 0;
      this.maxHealth += Math.floor(Math.random() * 10) + 1;
      this.damage += Math.floor(Math.random() * 3) + 1;
      this.health = this.maxHealth;
    }
    this.levelUpUI();
    console.log(`Level: ${this.level}`);
    console.log(`Current experience: ${this.experience}`);
    console.log(`Experience needed to level up: ${this.experienceToLevelUp()}`);
  }

  levelUpUI() {
    document.querySelector(".level-up-ui-container").style.display = "grid";
    let skill1 = document.querySelector(".pickSkill1");
    let skill2 = document.querySelector(".pickSkill2");
    let skill3 = document.querySelector(".pickSkill3");
    let skills = [skill1, skill2, skill3];

    skills.forEach((skill) => {
      skill.addEventListener("click", () => {
        this.hideLevelUpUI();
      });
    });
  }

  hideLevelUpUI() {
    document.querySelector(".level-up-ui-container").style.display = "none";
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
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
    return this.health - originalHealth;
  }

  isDead() {
    return this.health <= 0;
  }
}
