/* =========================================================
   Comic Panel
   ========================================================= */

.comic-panel {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  border-radius: 24px;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.comic-panel:hover {
  transform: translateY(-4px);
}

.comic-panel.is-active {
  transform: translateY(-3px);
}

/* =========================================================
   Panel label
   ========================================================= */

.panel-label {
  display: block;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  color: #5c6470;
}

.panel-label strong {
  font-weight: 800;
  color: #303744;
}

/* =========================================================
   Scene
   ========================================================= */

.scene {
  position: relative;
  width: 100%;
  min-height: 300px;
  overflow: hidden;
  isolation: isolate;

  border-radius: 22px;

  background:
    linear-gradient(
      180deg,
      #dff3ff 0%,
      #edf9ff 48%,
      #d9f0d0 100%
    );

  box-shadow:
    0 12px 30px rgba(35, 45, 60, 0.12),
    inset 0 0 0 1px rgba(255, 255, 255, 0.75);
}

.comic-panel.compact .scene {
  min-height: 220px;
}

/* =========================================================
   Scene background base
   ========================================================= */

.scene-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

/* =========================================================
   Atmosphere
   ========================================================= */

.scene-atmosphere {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.2),
      transparent 45%
    );
}

.scene-atmosphere.time-night {
  background:
    linear-gradient(
      180deg,
      #17244e 0%,
      #263b70 55%,
      #5b7191 100%
    );
}

.scene-atmosphere.time-sunset {
  background:
    linear-gradient(
      180deg,
      #ffb36b 0%,
      #ffd08b 40%,
      #d9a27d 100%
    );
}

.scene-atmosphere.time-morning {
  background:
    linear-gradient(
      180deg,
      #c9ecff 0%,
      #f8f2cc 55%,
      #d5eac7 100%
    );
}

.scene-atmosphere.weather-cloudy {
  background:
    linear-gradient(
      180deg,
      rgba(150, 164, 182, 0.42),
      rgba(220, 230, 235, 0.1)
    );
}

.scene-atmosphere.weather-rain {
  background:
    linear-gradient(
      180deg,
      rgba(92, 116, 142, 0.4),
      rgba(125, 158, 171, 0.15)
    );
}

.scene-atmosphere.weather-snow {
  background:
    linear-gradient(
      180deg,
      #dcecf8 0%,
      #edf7ff 60%,
      #ffffff 100%
    );
}

/* =========================================================
   Sky objects
   ========================================================= */

.story-moon {
  position: absolute;
  top: 26px;
  right: 46px;
  font-size: 44px;
  filter: drop-shadow(0 5px 10px rgba(255, 255, 255, 0.2));
  animation: moonFloat 5s ease-in-out infinite;
}

.story-stars {
  position: absolute;
  top: 25px;
  left: 40px;
  font-size: 17px;
  letter-spacing: 18px;
  opacity: 0.9;
  animation: twinkle 2.8s ease-in-out infinite;
}

.story-sun {
  position: absolute;
  top: 25px;
  right: 42px;
  font-size: 52px;
  filter: drop-shadow(0 8px 15px rgba(255, 193, 7, 0.25));
}

.story-sunset {
  position: absolute;
  top: 24px;
  right: 40px;
  font-size: 48px;
}

.story-cloud {
  position: absolute;
  top: 30px;
  left: 35px;
  font-size: 30px;
  opacity: 0.65;
  animation: cloudMove 9s linear infinite;
}

.story-rain {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 24px;
  font-size: 36px;
  opacity: 0.65;
  animation: rainFloat 2s ease-in-out infinite;
}

.story-snow {
  position: absolute;
  inset: 0;
  padding: 20px;
  font-size: 25px;
  line-height: 2.5;
  letter-spacing: 25px;
  opacity: 0.8;
  animation: snowFall 5s linear infinite;
}

.story-wind {
  position: absolute;
  top: 90px;
  left: 20px;
  font-size: 32px;
  animation: windMove 2.5s ease-in-out infinite;
}

/* =========================================================
   General background elements
   ========================================================= */

.story-tree {
  position: absolute;
  z-index: 1;
  bottom: 55px;
  font-style: normal;
  font-size: 88px;
  filter: drop-shadow(0 10px 8px rgba(40, 70, 40, 0.18));
}

.story-tree.left {
  left: 14px;
}

.story-tree.center {
  left: 43%;
  bottom: 85px;
  font-size: 66px;
  opacity: 0.8;
}

.story-tree.right {
  right: 12px;
}

.story-path {
  position: absolute;
  left: 15%;
  right: 15%;
  bottom: -30px;
  height: 130px;
  border-radius: 50% 50% 0 0;
  background: #d6b88a;
  transform: perspective(200px) rotateX(15deg);
  opacity: 0.75;
}

/* =========================================================
   Garden
   ========================================================= */

.story-flowerbed {
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 32px;
  white-space: nowrap;
  z-index: 3;
  animation: gentleFloat 4s ease-in-out infinite;
}

/* =========================================================
   Sea
   ========================================================= */

.scene-sea {
  background:
    linear-gradient(
      180deg,
      #9ee5ff 0%,
      #d6f5ff 42%,
      #4ebbd6 43%,
      #75d2df 100%
    );
}

.story-island {
  position: absolute;
  right: 25px;
  bottom: 68px;
  font-size: 72px;
  font-style: normal;
}

.story-waves {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 18px;
  font-size: 42px;
  white-space: nowrap;
  letter-spacing: 7px;
  animation: waveMove 3s ease-in-out infinite;
}

.story-boat {
  position: absolute;
  right: 32%;
  bottom: 85px;
  z-index: 4;
  font-size: 48px;
  animation: boatMove 4s ease-in-out infinite;
}

/* =========================================================
   School
   ========================================================= */

.story-school {
  position: absolute;
  left: 50%;
  bottom: 52px;
  transform: translateX(-50%);
  font-style: normal;
  font-size: 120px;
  z-index: 2;
}

.story-ground {
  position: absolute;
  left: -5%;
  right: -5%;
  bottom: 0;
  height: 75px;
  background: #93c86e;
  border-radius: 50% 50% 0 0;
}

/* =========================================================
   Home
   ========================================================= */

.story-home {
  position: absolute;
  left: 50%;
  bottom: 48px;
  transform: translateX(-50%);
  font-size: 125px;
  font-style: normal;
  z-index: 2;
}

.story-window {
  position: absolute;
  left: 50%;
  top: 80px;
  transform: translateX(-50%);
  font-size: 34px;
  z-index: 3;
}

/* =========================================================
   City
   ========================================================= */

.story-city {
  position: absolute;
  left: 50%;
  bottom: 58px;
  transform: translateX(-50%);
  font-size: 64px;
  white-space: nowrap;
  letter-spacing: 8px;
  z-index: 2;
}

.story-crosswalk {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  background:
    repeating-linear-gradient(
      90deg,
      transparent 0 22px,
      rgba(255, 255, 255, 0.85) 22px 35px
    );
  opacity: 0.65;
}

.story-city-car {
  position: absolute;
  bottom: 32px;
  left: 15%;
  z-index: 5;
  font-size: 40px;
  animation: carMove 7s linear infinite;
}

/* =========================================================
   Castle
   ========================================================= */

.story-castle {
  position: absolute;
  left: 50%;
  bottom: 42px;
  transform: translateX(-50%);
  font-size: 130px;
  font-style: normal;
  z-index: 2;
}

.story-castle-flag {
  position: absolute;
  left: 50%;
  top: 75px;
  transform: translateX(-50%);
  font-size: 27px;
  z-index: 3;
}

/* =========================================================
   Space
   ========================================================= */

.scene-space {
  background:
    radial-gradient(
      circle at 25% 25%,
      rgba(255, 255, 255, 0.18) 0 2px,
      transparent 3px
    ),
    radial-gradient(
      circle at 70% 40%,
      rgba(255, 255, 255, 0.2) 0 2px,
      transparent 3px
    ),
    linear-gradient(
      180deg,
      #11173c,
      #252a66 65%,
      #171936
    );
}

.story-planet {
  position: absolute;
  right: 25px;
  top: 45px;
  font-size: 85px;
  font-style: normal;
  animation: planetFloat 7s ease-in-out infinite;
}

.story-rocket {
  position: absolute;
  left: 22%;
  top: 85px;
  font-size: 48px;
  transform: rotate(-20deg);
  animation: rocketFloat 4s ease-in-out infinite;
}

.story-space-star {
  position: absolute;
  left: 12%;
  top: 25px;
  font-size: 23px;
  letter-spacing: 20px;
}

/* =========================================================
   Cave
   ========================================================= */

.scene-cave {
  background:
    radial-gradient(
      ellipse at center top,
      #59606b,
      #262c34 70%,
      #16191e
    );
}

.story-cave {
  position: absolute;
  left: 50%;
  bottom: 42px;
  transform: translateX(-50%);
  font-size: 150px;
  font-style: normal;
  opacity: 0.9;
}

.story-crystals {
  position: absolute;
  bottom: 40px;
  right: 18%;
  font-size: 30px;
  animation: crystalGlow 2s ease-in-out infinite;
}

/* =========================================================
   Hospital
   ========================================================= */

.story-hospital {
  position: absolute;
  left: 50%;
  bottom: 48px;
  transform: translateX(-50%);
  font-size: 120px;
  font-style: normal;
}

/* =========================================================
   Market
   ========================================================= */

.story-shop {
  position: absolute;
  left: 50%;
  bottom: 48px;
  transform: translateX(-50%);
  font-size: 115px;
  font-style: normal;
}

.story-awning {
  position: absolute;
  left: 50%;
  bottom: 125px;
  transform: translateX(-50%);
  font-size: 34px;
}

/* =========================================================
   Winter
   ========================================================= */

.scene-winter {
  background:
    linear-gradient(
      180deg,
      #bce4ff,
      #eaf8ff 60%,
      #ffffff
    );
}

.story-snowman {
  position: absolute;
  left: 20%;
  bottom: 48px;
  font-size: 72px;
}

.story-pine {
  position: absolute;
  right: 18%;
  bottom: 55px;
  font-size: 90px;
  font-style: normal;
}

.story-pine.second {
  right: 4%;
  font-size: 65px;
}

/* =========================================================
   Book / indoor
   ========================================================= */

.story-shelf {
  position: absolute;
  left: 14%;
  bottom: 45px;
  font-size: 80px;
  font-style: normal;
}

.story-table {
  position: absolute;
  right: 15%;
  bottom: 35px;
  font-size: 72px;
  font-style: normal;
}

/* =========================================================
   Mountain / rainbow
   ========================================================= */

.story-mountain {
  position: absolute;
  left: 50%;
  bottom: 42px;
  transform: translateX(-50%);
  font-size: 115px;
  z-index: 2;
}

.story-rainbow {
  position: absolute;
  left: 50%;
  top: 25px;
  transform: translateX(-50%);
  font-size: 65px;
  opacity: 0.85;
  z-index: 2;
}

/* =========================================================
   Character layer
   ========================================================= */

.scene-character-layer {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
}

/* =========================================================
   Person
   ========================================================= */

.story-person {
  position: absolute;
  bottom: 50px;
  width: 110px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  transition:
    transform 0.25s ease,
    filter 0.25s ease;
}

.story-person:hover {
  transform: translateY(-5px) scale(1.03);
}

.story-person.side-left {
  left: 10%;
}

.story-person.side-center {
  left: 50%;
  transform: translateX(-50%);
}

.story-person.side-right {
  right: 10%;
}

/* =========================================================
   Character emoji
   ========================================================= */

.person-character-icon {
  position: relative;
  z-index: 4;
  display: block;
  font-size: 78px;
  line-height: 1;
  filter:
    drop-shadow(0 5px 4px rgba(0, 0, 0, 0.12));
  animation: characterIdle 3.5s ease-in-out infinite;
}

/* =========================================================
   Old CSS character compatibility
   ========================================================= */

.person-avatar {
  display: none;
}

/* =========================================================
   Character types
   ========================================================= */

.character-girl .person-character-icon {
  filter:
    drop-shadow(0 5px 5px rgba(255, 120, 170, 0.18));
}

.character-boy .person-character-icon {
  filter:
    drop-shadow(0 5px 5px rgba(80, 130, 220, 0.18));
}

.character-mother .person-character-icon,
.character-father .person-character-icon {
  font-size: 82px;
}

.character-grandmother .person-character-icon,
.character-grandfather .person-character-icon {
  font-size: 82px;
}

.character-teacher .person-character-icon,
.character-doctor .person-character-icon {
  font-size: 82px;
}

.character-knight .person-character-icon {
  font-size: 88px;
}

.character-king .person-character-icon,
.character-queen .person-character-icon {
  font-size: 88px;
}

.character-wizard .person-character-icon {
  font-size: 88px;
}

/* =========================================================
   Character actions
   ========================================================= */

.action-run .person-character-icon {
  animation: characterRun 0.65s ease-in-out infinite;
}

.action-walk .person-character-icon {
  animation: characterWalk 1.5s ease-in-out infinite;
}

.action-look .person-character-icon {
  transform: rotate(-3deg);
}

.action-sit {
  bottom: 35px;
}

.action-sit .person-character-icon {
  transform: translateY(18px) scale(0.9);
}

.action-sleep .person-character-icon {
  transform: rotate(3deg);
}

.action-carry .person-character-icon {
  transform: translateY(-3px);
}

.action-fight .person-character-icon {
  animation: braveMove 0.8s ease-in-out infinite;
}

.action-dance .person-character-icon {
  animation: danceMove 0.7s ease-in-out infinite;
}

.action-cry .person-character-icon {
  animation: sadMove 2s ease-in-out infinite;
}

.action-hide .person-character-icon {
  transform: scale(0.85);
}

/* =========================================================
   Mood
   ========================================================= */

.person-mood-badge {
  position: absolute;
  top: -8px;
  right: 10px;
  z-index: 8;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  font-size: 19px;

  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  animation: badgeFloat 2s ease-in-out infinite;
}

.mood-happy .person-character-icon {
  filter:
    drop-shadow(0 5px 5px rgba(255, 196, 70, 0.25));
}

.mood-sad .person-character-icon {
  filter:
    saturate(0.8)
    drop-shadow(0 5px 5px rgba(80, 130, 190, 0.18));
}

.mood-angry .person-character-icon {
  animation: angryMove 0.45s ease-in-out infinite;
}

.mood-brave .person-character-icon {
  filter:
    drop-shadow(0 7px 8px rgba(255, 130, 50, 0.22));
}

/* =========================================================
   Animal layer
   ========================================================= */

.scene-animal-layer {
  position: absolute;
  inset: 0;
  z-index: 12;
  pointer-events: none;
}

/* =========================================================
   Animals
   ========================================================= */

.story-animal {
  position: absolute;
  bottom: 48px;

  display: block;

  font-size: 55px;
  line-height: 1;

  filter:
    drop-shadow(0 6px 5px rgba(0, 0, 0, 0.13));

  animation: animalIdle 3s ease-in-out infinite;
}

/* Position */

.animal-side-left {
  left: 27%;
}

.animal-side-center {
  left: 50%;
  transform: translateX(-50%);
}

.animal-side-right {
  right: 24%;
}

/* Size variations */

.animal-elephant {
  font-size: 70px;
}

.animal-giraffe {
  font-size: 70px;
}

.animal-bear,
.animal-lion,
.animal-tiger {
  font-size: 65px;
}

.animal-rabbit,
.animal-squirrel,
.animal-hedgehog {
  font-size: 50px;
}

.animal-chicken,
.animal-duck,
.animal-frog {
  font-size: 45px;
}

/* Animal actions */

.animal-action-run {
  animation:
    animalRun 0.55s ease-in-out infinite;
}

.animal-action-walk {
  animation:
    animalWalk 1.2s ease-in-out infinite;
}

.animal-action-sleep {
  transform: rotate(8deg);
}

.animal-action-fight {
  animation:
    animalFight 0.6s ease-in-out infinite;
}

.animal-action-dance {
  animation:
    animalDance 0.7s ease-in-out infinite;
}

/* =========================================================
   Object layer
   ========================================================= */

.scene-object-layer {
  position: absolute;
  inset: 0;
  z-index: 16;
  pointer-events: none;
}

.story-item {
  position: absolute;
  display: block;

  font-size: 38px;
  line-height: 1;

  filter:
    drop-shadow(0 5px 5px rgba(0, 0, 0, 0.12));

  animation: objectFloat 3s ease-in-out infinite;
}

/* =========================================================
   Object positioning
   ========================================================= */

.object-side-left {
  left: 20%;
  bottom: 125px;
}

.object-side-center {
  left: 50%;
  bottom: 115px;
  transform: translateX(-50%);
}

.object-side-right {
  right: 20%;
  bottom: 125px;
}

/* =========================================================
   Object types
   ========================================================= */

.object-book {
  font-size: 46px;
}

.object-letter {
  font-size: 42px;
}

.object-map {
  font-size: 43px;
}

.object-key {
  font-size: 40px;
}

.object-treasure {
  font-size: 48px;
  animation:
    treasureGlow 1.8s ease-in-out infinite;
}

.object-apple {
  font-size: 42px;
}

.object-cake {
  font-size: 44px;
}

.object-bread {
  font-size: 43px;
}

.object-cookie {
  font-size: 40px;
}

.object-icecream {
  font-size: 43px;
}

.object-magic {
  font-size: 45px;
  animation:
    magicFloat 2s ease-in-out infinite;
}

.object-fire {
  font-size: 44px;
  animation:
    fireMove 0.8s ease-in-out infinite;
}

.object-gift {
  font-size: 44px;
  animation:
    giftBounce 1.5s ease-in-out infinite;
}

.object-weapon {
  font-size: 47px;
}

.object-vehicle {
  font-size: 44px;
}

/* =========================================================
   Speech bubble
   ========================================================= */

.speech-bubble {
  position: relative;
  z-index: 30;

  margin: 12px 8px 0;
  padding: 14px 17px;

  min-height: 52px;

  border-radius: 17px;

  background: rgba(255, 255, 255, 0.96);

  color: #353b45;
  font-size: 15px;
  line-height: 1.55;
  font-weight: 600;

  box-shadow:
    0 5px 18px rgba(30, 40, 50, 0.08);

  word-break: keep-all;
}

.speech-bubble::before {
  content: '';

  position: absolute;
  top: -8px;
  left: 35px;

  width: 17px;
  height: 17px;

  background: white;

  transform: rotate(45deg);
}

/* =========================================================
   Empty scene
   ========================================================= */

.scene-empty {
  position: absolute;
  inset: 0;
  z-index: 25;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;

  color: #697382;
  background:
    radial-gradient(
      circle at center,
      rgba(255,255,255,0.75),
      rgba(255,255,255,0.2)
    );
}

.scene-empty-icon {
  font-size: 48px;
  animation:
    emptyFloat 2.5s ease-in-out infinite;
}

.scene-empty-text {
  font-size: 14px;
  font-weight: 600;
}

/* =========================================================
   Farm
   ========================================================= */

.farm-scene {
  position: absolute;
  inset: 0;

  overflow: hidden;

  background:
    linear-gradient(
      180deg,
      #bfe9ff 0%,
      #e8f7ff 50%,
      #9dd16f 51%,
      #78b95d 100%
    );
}

.farm-bg-layer {
  position: absolute;
  inset: 0;
}

.farm-barn {
  position: absolute;
  left: 50%;
  bottom: 65px;
  transform: translateX(-50%);
  font-size: 95px;
  font-style: normal;
}

.farm-fence {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 40px;

  font-size: 35px;
  letter-spacing: 8px;

  white-space: nowrap;
  opacity: 0.8;
}

.farm-hill {
  position: absolute;
  left: -10%;
  right: -10%;
  bottom: 0;
  height: 90px;

  border-radius: 50% 50% 0 0;
  background: #7fbd62;
}

.farm-animal-layer {
  position: absolute;
  inset: 0;
  z-index: 5;
}

.farm-animal {
  position: absolute;
  bottom: 75px;
  font-size: 48px;
  animation: animalIdle 3s ease-in-out infinite;
}

.farm-animal.cow {
  left: 15%;
}

.farm-animal.sheep {
  right: 16%;
}

.farm-animal.hen {
  left: 42%;
  bottom: 58px;
  font-size: 37px;
}

.farm-animal.pig {
  left: 67%;
  bottom: 63px;
  font-size: 44px;
}

.farm-animal.horse {
  left: 12%;
  font-size: 58px;
}

.farm-animal.duck {
  right: 38%;
  bottom: 55px;
  font-size: 37px;
}

.pig-boss {
  left: 43%;
  bottom: 82px;
  font-size: 57px;
}

.farm-workers {
  position: absolute;
  right: 10%;
  bottom: 78px;
  font-size: 43px;
}

.farm-crowd {
  position: absolute;
  left: 50%;
  bottom: 82px;
  transform: translateX(-50%);
  font-size: 45px;
  white-space: nowrap;
}

.farm-cart {
  position: absolute;
  right: 18%;
  bottom: 75px;
  font-size: 45px;
  font-style: normal;
}

.farm-shadow-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      transparent,
      rgba(30, 30, 30, 0.25)
    );
  pointer-events: none;
}

/* =========================================================
   Responsive
   ========================================================= */

@media (max-width: 700px) {
  .scene {
    min-height: 250px;
    border-radius: 18px;
  }

  .story-tree {
    font-size: 68px;
  }

  .story-castle {
    font-size: 95px;
  }

  .story-home {
    font-size: 100px;
  }

  .story-school,
  .story-hospital {
    font-size: 90px;
  }

  .person-character-icon {
    font-size: 62px;
  }

  .story-person {
    width: 90px;
    height: 125px;
    bottom: 42px;
  }

  .story-animal {
    font-size: 45px;
  }

  .story-item {
    font-size: 32px;
  }

  .speech-bubble {
    font-size: 14px;
    padding: 12px 14px;
  }
}

@media (max-width: 430px) {
  .scene {
    min-height: 220px;
  }

  .story-person.side-left {
    left: 3%;
  }

  .story-person.side-right {
    right: 3%;
  }

  .animal-side-left {
    left: 20%;
  }

  .animal-side-right {
    right: 18%;
  }

  .person-character-icon {
    font-size: 54px;
  }

  .story-animal {
    font-size: 38px;
  }

  .story-item {
    font-size: 27px;
  }

  .story-castle {
    font-size: 78px;
  }

  .story-home {
    font-size: 82px;
  }

  .story-school,
  .story-hospital {
    font-size: 76px;
  }
}

/* =========================================================
   Animations
   ========================================================= */

@keyframes characterIdle {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}

@keyframes characterWalk {
  0%,
  100% {
    transform: rotate(-3deg) translateY(0);
  }

  50% {
    transform: rotate(3deg) translateY(-5px);
  }
}

@keyframes characterRun {
  0%,
  100% {
    transform: rotate(-8deg) translateY(0);
  }

  50% {
    transform: rotate(8deg) translateY(-8px);
  }
}

@keyframes braveMove {
  0%,
  100% {
    transform: translateX(0) rotate(-2deg);
  }

  50% {
    transform: translateX(5px) rotate(3deg);
  }
}

@keyframes danceMove {
  0%,
  100% {
    transform: rotate(-8deg) translateY(0);
  }

  50% {
    transform: rotate(8deg) translateY(-9px);
  }
}

@keyframes sadMove {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(4px);
  }
}

@keyframes angryMove {
  0%,
  100% {
    transform: translateX(-2px);
  }

  50% {
    transform: translateX(2px);
  }
}

@keyframes animalIdle {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

@keyframes animalWalk {
  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(5px);
  }
}

@keyframes animalRun {
  0%,
  100% {
    transform: translateX(-4px) rotate(-3deg);
  }

  50% {
    transform: translateX(5px) rotate(3deg);
  }
}

@keyframes animalFight {
  0%,
  100% {
    transform: translateX(0) rotate(-4deg);
  }

  50% {
    transform: translateX(5px) rotate(5deg);
  }
}

@keyframes animalDance {
  0%,
  100% {
    transform: rotate(-8deg);
  }

  50% {
    transform: rotate(8deg) translateY(-7px);
  }
}

@keyframes objectFloat {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

@keyframes treasureGlow {
  0%,
  100% {
    transform: scale(1);
    filter:
      drop-shadow(0 5px 5px rgba(0, 0, 0, 0.12));
  }

  50% {
    transform: scale(1.08);
    filter:
      drop-shadow(0 0 12px rgba(255, 215, 70, 0.65));
  }
}

@keyframes magicFloat {
  0%,
  100% {
    transform: translateY(0) rotate(-4deg);
  }

  50% {
    transform: translateY(-8px) rotate(5deg);
  }
}

@keyframes fireMove {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.08) translateY(-3px);
  }
}

@keyframes giftBounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes badgeFloat {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }
}

@keyframes moonFloat {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-7px);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.55;
  }

  50% {
    opacity: 1;
  }
}

@keyframes cloudMove {
  from {
    transform: translateX(-15px);
  }

  to {
    transform: translateX(35px);
  }
}

@keyframes rainFloat {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(8px);
  }
}

@keyframes snowFall {
  from {
    transform: translateY(-20px);
  }

  to {
    transform: translateY(30px);
  }
}

@keyframes windMove {
  0%,
  100% {
    transform: translateX(0) rotate(-5deg);
  }

  50% {
    transform: translateX(25px) rotate(8deg);
  }
}

@keyframes gentleFloat {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }

  50% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@keyframes waveMove {
  0%,
  100% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-12px);
  }
}

@keyframes boatMove {
  0%,
  100% {
    transform: translateY(0) rotate(-2deg);
  }

  50% {
    transform: translateY(-7px) rotate(3deg);
  }
}

@keyframes carMove {
  0% {
    transform: translateX(-20px);
  }

  100% {
    transform: translateX(430px);
  }
}

@keyframes planetFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}

@keyframes rocketFloat {
  0%,
  100% {
    transform: translateY(0) rotate(-20deg);
  }

  50% {
    transform: translateY(-12px) rotate(-15deg);
  }
}

@keyframes crystalGlow {
  0%,
  100% {
    opacity: 0.65;
  }

  50% {
    opacity: 1;
    filter:
      drop-shadow(0 0 10px rgba(130, 210, 255, 0.7));
  }
}

@keyframes emptyFloat {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}
