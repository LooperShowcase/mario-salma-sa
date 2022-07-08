kaboom({
  global: true,
  scale: 2,
  fullscreen: true,
  clearColor: [0, 1, 1, 1],
});
loadRoot("./sprites/");
loadSprite("zz", "z.png");
loadSprite("coin", "coin.png");
loadSprite("block", "block.png");
loadSprite("spong", "spongebob.png");
loadSprite("star", "star.png");
loadSprite("heart", "heart.png");
loadSprite("bg", "bg.jpg");
loadSound("jump", "jumpSound.mp3");
loadSound("gameSound", "gameSound.mp3");
loadSprite("unbox", "unboxed.png");
loadSprite("surprise", "surprise.png");
loadSprite("mushroooom", "mushroom.png");
loadSprite("pipe", "pipe_up.png");

let score = 0;
let hearts = 3;

scene("game", () => {
  play("gameSound");
  layers(["bg", "obj", "ui"], "obj");

  const map = [
    "                                                                          ",
    "                                                                              ",
    "                                                                                ",
    "                                                                                          ",
    "                                                                                                    ",
    "                                                                                                 ",
    "                                                                                                                      ",
    "                  ==c====?=====       ===>==                                                                         ",
    "                                            s                                                                   ",
    "       ===>====       ===c====         ===>==?===                                                                p       ",
    "c  c                                                     ===        cc            cc      cc                 ccc         ",
    "                                                   ===  == ===== = ==  == = =  =  === == ===== == ==        ========         ",
    "                                                                                                                 ",
    "==========================================================================================================",
  ];

  const mapsymbols = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid(), "block"],
    s: [sprite("spong"), solid(), "spong", body()],
    "?": [sprite("surprise"), solid(), "surprise_coin"],
    ">": [sprite("surprise"), solid(), "surprise_mushroom"],
    u: [sprite("unbox"), solid(), "unbox"],
    c: [sprite("coin"), "coin"],
    p: [sprite("pipe"), solid(), "pipe"],
    m: [sprite("mushroooom"), "mushroooom", body(), solid()],
  };
  1;
  const gamelevel = addLevel(map, mapsymbols);

  const player = add([
    sprite("star"),
    solid(),
    pos(30, 0),
    body(),
    origin("bot"),
    big(),
  ]);
  const scoreLabel = add([text("score:0")]);
  const heartobj = add([
    sprite("heart"),
    text("     x3", 12),
    origin("center"),
  ]);

  const bg = add([
    sprite("bg"),
    scale(2),
    pos(width() / 2, height() / 2),
    layer("bg"),
    origin("center"),
  ]);
  keyDown("right", () => {
    player.move(150, 0);
  });

  keyDown("left", () => {
    player.move(-150, 0);
  });

  keyDown("space", () => {
    if (player.grounded()) {
      play("jump");
      player.jump(CURRENT_JUMP_FORCE);
    }
  });
  player.on("headbump", (obj) => {
    if (obj.is("surprise_coin")) {
      destroy(obj);
      gamelevel.spawn("u", obj.gridPos);
      gamelevel.spawn("c", obj.gridPos.sub(0, 1));
    }
    if (obj.is("surprise_mushroom")) {
      destroy(obj);
      gamelevel.spawn("u", obj.gridPos);
      gamelevel.spawn("m", obj.gridPos.sub(0, 1));
    }
  });

  action("mushroooom", (obj) => {
    obj.move(20, 0);
  });

  player.collides("coin", (obj) => {
    destroy(obj);
    score += 5;
  });

  player.collides("pipe", (obj) => {
    keyDown("down", () => {
      go("level2");
    });
  });

  player.collides("mushroooom", (obj) => {
    destroy(obj);
    player.biggify(2);
  });

  player.action(() => {
    camPos(player.pos);
    scoreLabel.pos = player.pos.sub(400, 200);
    heartobj.pos = player.pos.sub(400, 180);
    scoreLabel.text = "score:" + score;
    heartobj.text = "    x" + hearts;
    if (player.pos.y > 500) {
    }
    if (hearts <= 0) {
      go("lose");
    }

    bg.use(pos(player.pos));
    //add this
    if (player.pos.y > 500) {
      go("over");
    }
  });
  action("spong", (obj) => {
    obj.move(-20, 0);
  });

  let lastgrounded = true;

  player.collides("spong", (obj) => {});
  //scene end
});

scene("over", () => {
  add([rect(width(), height()), pos(0, 0), area(), solid(), color(0, 0, 0)]);
  add([
    text("Game Over", 64),
    pos(width() / 2, height() / 2),
    origin("center"),
  ]);
});

scene("win", () => {
  add([
    text("cool Brooo ", 64),
    pos(width() / 2, height() / 2),
    origin("center"),
  ]);
});

scene("level2", () => {
  play("gameSound");
  layers(["bg", "obj", "ui"], "obj");

  const map = [
    "                                                                                                                ",
    "                                                                                                                ",
    "                                                                                                             ",
    "                                                         c                                         cccccc             ",
    "                                                         =        =                              ========                  ",
    "                                                   =                =                      ccc                        ",
    "                             cccc               c                                      c    =====                p        ",
    "                     c     =======m==            =                      =                ==                   ======                      ",
    "                   ` =                     ccc                                                                                ",
    "        =         c                   ======                              =       ===                                   ",
    "        =         =                                                             ===                                 ",
    "==========================================================================================================",
  ];

  const mapsymbols = {
    width: 20,
    height: 20,
    "=": [sprite("block"), solid(), "block"],
    s: [sprite("spong"), solid(), "spong", body()],
    "?": [sprite("surprise"), solid(), "surprise_coin"],
    ">": [sprite("surprise"), solid(), "surprise_mushroom"],
    u: [sprite("unbox"), solid(), "unbox"],
    c: [sprite("coin"), "coin"],
    p: [sprite("pipe"), solid(), "pipe"],
    m: [sprite("mushroooom"), "mushroooom", body(), solid()],
  };
  1;
  const gamelevel = addLevel(map, mapsymbols);

  const player = add([
    sprite("star"),
    solid(),
    pos(30, 0),
    body(),
    origin("bot"),
    big(),
  ]);
  const scoreLabel = add([text("score:0")]);

  const bg = add([
    sprite("bg"),
    scale(2),
    pos(width() / 2, height() / 2),
    layer("bg"),
    origin("center"),
  ]);
  keyDown("right", () => {
    player.move(150, 0);
  });

  keyDown("left", () => {
    player.move(-150, 0);
  });

  keyDown("space", () => {
    if (player.grounded()) {
      play("jump");
      player.jump(CURRENT_JUMP_FORCE);
    }
  });
  player.on("headbump", (obj) => {
    if (obj.is("surprise_coin")) {
      destroy(obj);
      gamelevel.spawn("u", obj.gridPos);
      gamelevel.spawn("c", obj.gridPos.sub(0, 1));
    }
    if (obj.is("surprise_mushroom")) {
      destroy(obj);
      gamelevel.spawn("u", obj.gridPos);
      gamelevel.spawn("m", obj.gridPos.sub(0, 1));
    }
  });

  action("mushroooom", (obj) => {
    obj.move(20, 0);
  });

  player.collides("coin", (obj) => {
    destroy(obj);
    score += 5;
  });

  player.collides("mushroooom", (obj) => {
    destroy(obj);
    player.biggify(2);
  });

  player.action(() => {
    camPos(player.pos);
    scoreLabel.pos = player.pos.sub(400, 200);
    scoreLabel.text = "score:" + score;

    bg.use(pos(player.pos));
    //add this
    if (player.pos.y > 500) {
      go("over");
    }
  });
  action("spong", (obj) => {
    obj.move(-20, 0);
  });

  let lastgrounded = true;

  player.collides("spong", (obj) => {});
  //scene end
});

start("level2");
