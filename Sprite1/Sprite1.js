/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.png", { x: 2, y: 2 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "SayX1X2" },
        this.whenIReceiveSayx1x2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "~possible" },
        this.whenIReceivePossible
      ),
      new Trigger(Trigger.BROADCAST, { name: "X1=X2" }, this.whenIReceiveX1X2)
    ];
  }

  *whenIReceiveSayx1x2() {
    yield* this.sayAndWait(
      "X1 = " +
        this.toString(this.stage.vars.x1) +
        ("  " + ("X2 = " + this.toString(this.stage.vars.x2))),
      2.5
    );
    return;
  }

  *whenIReceivePossible() {
    yield* this.sayAndWait(
      "Not possible discriminant is " +
        ("   " + this.toString(this.stage.vars.discriminant)),
      2.5
    );
    return;
  }

  *whenIReceiveX1X2() {
    this.stage.watchers.x2.visible = false;
    this.stage.watchers.x1.visible = false;
    this.stage.watchers.x1X2.visible = true;
    this.stage.vars.x1X2 = this.stage.vars.x1;
    yield* this.sayAndWait(
      "X1 = " + "X2 = " + (this.toString(this.stage.vars.x1) + ""),
      2.5
    );
    this.stage.watchers.x1X2.visible = false;
    this.stage.watchers.x1.visible = true;
    this.stage.watchers.x2.visible = true;
    return;
  }
}
