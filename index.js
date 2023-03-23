import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Sprite1 from "./Sprite1/Sprite1.js";
import Sprite2 from "./Sprite2/Sprite2.js";
import Sprite3 from "./Sprite3/Sprite3.js";

const stage = new Stage({ costumeNumber: 2 });

const sprites = {
  Sprite1: new Sprite1({
    x: -7,
    y: -27,
    direction: -270,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 1
  }),
  Sprite2: new Sprite2({
    x: 1,
    y: -147,
    direction: -270,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2
  }),
  Sprite3: new Sprite3({
    x: 2,
    y: -13,
    direction: -270,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 3
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
