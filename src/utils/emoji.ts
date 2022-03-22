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
}

export default (emoji: string): string => emojiMap[emoji.slice(1, -1)];