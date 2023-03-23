/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("background1", "./Stage/costumes/background1.png", {
        x: 480,
        y: 360
      }),
      new Costume("School", "./Stage/costumes/School.png", { x: 480, y: 360 })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Calculate" },
        this.whenIReceiveCalculate
      )
    ];

    this.vars.discriminant = -8451;
    this.vars.x1 = 0;
    this.vars.x2 = 0;
    this.vars.c = 69;
    this.vars.b = 63;
    this.vars.quadraticEquation = "ax^2+bx+c = 0";
    this.vars.a = 45;
    this.vars.x1X2 = 0;

    this.watchers.x1 = new Watcher({
      label: "X1",
      style: "normal",
      visible: false,
      value: () => this.vars.x1,
      x: 240,
      y: 180
    });
    this.watchers.x2 = new Watcher({
      label: "X2",
      style: "normal",
      visible: false,
      value: () => this.vars.x2,
      x: 240,
      y: 180
    });
    this.watchers.quadraticEquation = new Watcher({
      label: "quadratic equation",
      style: "normal",
      visible: true,
      value: () => this.vars.quadraticEquation,
      x: 245,
      y: 175
    });
    this.watchers.x1X2 = new Watcher({
      label: "X1 = X2 = ",
      style: "normal",
      visible: false,
      value: () => this.vars.x1X2,
      x: 240,
      y: 180
    });
  }

  *whenGreenFlagClicked() {
    this.broadcast("Calculate");
  }

  *whenIReceiveCalculate() {
    this.vars.x1 = 0;
    this.vars.x2 = 0;
    this.vars.discriminant = 0;
    this.vars.a = 0;
    this.vars.b = 0;
    this.vars.c = 0;
    this.vars.quadraticEquation = "ax^2+bx+c = 0";
    this.watchers.quadraticEquation.visible = true;
    yield* this.wait(0.3);
    yield* this.askAndWait("a = ");
    this.vars.a = this.answer;
    yield* this.wait(0.3);
    yield* this.askAndWait("b = ");
    this.vars.b = this.answer;
    yield* this.wait(0.3);
    yield* this.askAndWait("c = ");
    this.vars.c = this.answer;
    yield* this.wait(0.5);
    this.vars.discriminant =
      this.toNumber(this.vars.b) * this.toNumber(this.vars.b) -
      4 * (this.toNumber(this.vars.a) * this.toNumber(this.vars.c));
    if (this.compare(this.vars.discriminant, 0) < 0) {
      this.broadcast("~possible");
    } else {
      this.vars.x1 =
        (this.toNumber(this.vars.b) * -1 +
          Math.sqrt(this.toNumber(this.vars.discriminant))) /
        (2 * this.toNumber(this.vars.a));
      this.vars.x2 =
        (this.toNumber(this.vars.b) * -1 -
          Math.sqrt(this.toNumber(this.vars.discriminant))) /
        (2 * this.toNumber(this.vars.a));
      this.broadcast("SayX1X2");
    }
    if (this.toNumber(this.vars.discriminant) === 0) {
      this.broadcast("X1=X2");
    }
  }
}
