export const boxRound = {
  bold: {
    bottomLeft: '┗',
    bottomRight: '┛',
    horizontal: '━',
    topLeft: '┏',
    topRight: '┓',
    vertical: '┃',
  },
  classic: {
    bottomLeft: '+',
    bottomRight: '+',
    horizontal: '-',
    topLeft: '+',
    topRight: '+',
    vertical: '|',
  },
  double: {
    bottomLeft: '╚',
    bottomRight: '╝',
    horizontal: '═',
    topLeft: '╔',
    topRight: '╗',
    vertical: '║',
  },
  doubleSingle: {
    bottomLeft: '╘',
    bottomRight: '╛',
    horizontal: '═',
    topLeft: '╒',
    topRight: '╕',
    vertical: '│',
  },
  round: {
    bottomLeft: '╰',
    bottomRight: '╯',
    horizontal: '─',
    topLeft: '╭',
    topRight: '╮',
    vertical: '│',
  },
  single: {
    bottomLeft: '└',
    bottomRight: '┘',
    horizontal: '─',
    topLeft: '┌',
    topRight: '┐',
    vertical: '│',
  },
  singleDouble: {
    bottomLeft: '╙',
    bottomRight: '╜',
    horizontal: '─',
    topLeft: '╓',
    topRight: '╖',
    vertical: '║',
  },
}

export type ChalkColor =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'
  | 'grey'
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright'
  | 'whiteBright'
  | 'bgBlack'
  | 'bgRed'
  | 'bgGreen'
  | 'bgYellow'
  | 'bgBlue'
  | 'bgMagenta'
  | 'bgCyan'
  | 'bgWhite'
  | 'bgGray'
  | 'bgGrey'
  | 'bgBlackBright'
  | 'bgRedBright'
  | 'bgGreenBright'
  | 'bgYellowBright'
  | 'bgBlueBright'
  | 'bgMagentaBright'
  | 'bgCyanBright'
  | 'bgWhiteBright'
