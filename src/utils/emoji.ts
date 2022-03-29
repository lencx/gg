// https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md

const emojiMap: Record<string, string> = {
  zap: '⚡',
  gear: '⚙️',
  beer: '🍺',
  star: '⭐',
  fire: '🔥',
  tada: '🎉',
  ninja: '🥷',
  mega: '📣',
  crab: '🦀',
  rocket: '🚀',
  warning: '⚠️',
  unicorn: '🦄',
  lobster: '🦞',
  cyclone: '🌀',
  rainbow: '🌈',
  computer: '💻',
  nail_care: '💅',
  sunglasses: '😎',
  see_no_evil: '🙈',
  crystal_ball: '🔮',
  monocle_face: '🧐',
  speech_balloon: '💬',
  exploding_head: '🤯',
  hammer_and_wrench: '🛠️',
  globe_with_meridians: '🌐',
  page_facing_up: '📄',
  thinking: '🤔',
  sparkling_heart: '💖',
  boom: '💥',
  collision: '💥',
  anger: '💢',
  book: '📖',
  open_book: '📖',
  books: '📚',
  game_die: '🎲'
}

export default (emoji: string): string => emojiMap[emoji.slice(1, -1)] || '';


// -----------------------------------------
// THUMBS_UP
// Represents the :+1: emoji.

// THUMBS_DOWN
// Represents the :-1: emoji.

// LAUGH
// Represents the :laugh: emoji.

// HOORAY
// Represents the :hooray: emoji.

// CONFUSED
// Represents the :confused: emoji.

// HEART
// Represents the :heart: emoji.

// ROCKET
// Represents the :rocket: emoji.

// EYES
// Represents the :eyes: emoji.