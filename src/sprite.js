const colors = [
  '#f0c188',
  '#ef7e45',
  '#d44f26',
  '#ab3232',
  '#66333c',
  '#392245',
  '#5c4b4b',
  '#917d65',
  '#b5a774',
  '#81906c',
  '#5c635e',
  '#363c3d',
  '#091d21',
  '#405351',
  '#78756c',
  '#a8a192',
  '#cfcbb8',
  '#ebe8e2',
  '#a6dde3',
  '#72b4c4',
  '#5f96b0',
  '#4d73a1',
  '#204d85',
  '#161d80',
  '#4f3c80',
  '#78618c',
  '#b089a1',
  '#d4b8b2',
];

export function generateSprite(sprite, spriteScale = 10) {
  const height = sprite.length - 1;
  const boxShadow = sprite.reduce((r, line, y) => {
    let lineShadow = line.reduce(
      (l, colorIndex, x) =>
        (x === 0 && y === height) || colorIndex === -1
          ? l
          : l +
            `${x * spriteScale}px ${-(height - y) * spriteScale}px 0 0 ${
              colors[colorIndex]
            }, `,
      ''
    );
    return r + lineShadow;
  }, '');
  return {
    boxShadow: boxShadow.substring(0, boxShadow.length - 2),
    backgroundColor: sprite[height][0] === -1 ? '' : colors[sprite[height][0]],
    size: `${spriteScale}px`,
  };
}

export function renderSprite(object, sprite) {
  if (!sprite.boxShadow) {
    const { boxShadow, backgroundColor, size } = generateSprite(
      sprite,
      object.spriteScale
    );
    sprite.size = size;
    sprite.boxShadow = boxShadow;
    sprite.backgroundColor = backgroundColor;
  }

  object.element.style.height = sprite.size;
  object.element.style.width = sprite.size;
  object.element.style.boxShadow = sprite.boxShadow;
  object.element.style.backgroundColor = sprite.backgroundColor;
}
