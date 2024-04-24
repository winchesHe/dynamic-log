<h1 align="center">🌈 dynamic-log</h1>

<p align="center">A simple logging library for terminal that allows you to dynamic log with fully color</p>

<p align='center'>
<video src="https://github.com/nextui-org/nextui-cli/assets/96854855/833d6942-99c8-4c65-bbed-8214e64c7b90" controls="controls" />
</p>

## 🚀 Getting Started

```bash
npm i -g @winches/dynamic-log
```

## 📖 Usage

### Say

```ts
say(['wo zhe shi ce shi ni kan kan', 'test da jia hao'], { title: chalk.magentaBright('𝓝𝒆𝔁𝓽𝓤𝓘:') })
```

<p align='center'>
<img src="https://github.com/winchesHe/dynamic-log/assets/96854855/1f1458f0-c920-4b91-814c-a5ab533b1390" />
</p>

### SayBox

```ts
sayBox(['wo zhe shi ce shi ni kan kan', 'test da jia hao'], { boxOptions: { center: true, color: 'yellow', titleColor: 'cyan' } })
```

<p align='center'>
<img src="https://github.com/winchesHe/dynamic-log/assets/96854855/6c51b1d5-07dc-4237-89d6-b7f5eeabab31" />
</p>

### FunnySay

This could use many funny option to show a funny output in the terminal

You can choose the character from `cat`, `cow`, `cheese`...

```ts
funnySay(['wo zhe shi ce shi ni kan kan ', 'test da jia hao'], { character: 'cow', bodyFunny: true })
```

<p align='center'>
<img src="https://github.com/winchesHe/dynamic-log/assets/96854855/46df0d01-77d1-43b5-aed9-a1c880c10bb2" />
</p>

### With custom emoji

```ts
const defaultSayingEyes = chalk.white('ಠ')
const defaultStartEyes = chalk.white('◕')
const defaultEndEyes = chalk.white('◕')

say(['wo zhe shi ce shi ni kan kan', 'test da jia hao'], {
  title: chalk.magentaBright('𝓝𝒆𝔁𝓽𝓤𝓘:'),
  // Fully custom emoji
  emoji: [
    // Start emoji
    { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: chalk.cyan('◡'), eyes: [defaultStartEyes, defaultStartEyes] },
    // Saying emoji
    [
      { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: chalk.cyan('•'), eyes: [defaultSayingEyes, defaultSayingEyes] },
      { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: chalk.cyan('○'), eyes: [defaultSayingEyes, defaultSayingEyes] },
      { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: chalk.cyan('■'), eyes: [defaultSayingEyes, defaultSayingEyes] },
      { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: chalk.cyan('▪'), eyes: [defaultSayingEyes, defaultSayingEyes] },
      { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: chalk.cyan('▫'), eyes: [defaultSayingEyes, defaultSayingEyes] },
      { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: chalk.cyan('▬'), eyes: [defaultSayingEyes, defaultSayingEyes] },
      { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: chalk.cyan('▭'), eyes: [defaultSayingEyes, defaultSayingEyes] },
      { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: chalk.cyan('-'), eyes: [defaultSayingEyes, defaultSayingEyes] },
      { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: chalk.cyan('○'), eyes: [defaultSayingEyes, defaultSayingEyes] },
    ],
    // End emoji
    { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: chalk.cyan('◡'), eyes: [defaultEndEyes, defaultEndEyes] },
  ]
  // Simple emoji
  // emoji: ['٩(◕‿◕｡)۶', '٩(ಠ_ಠ)۶', '٩(◉‿◉｡)۶']
})
```

### With custom render content

```ts
say(['wo zhe shi ce shi ni kan kan', 'test da jia hao'], {
  title: chalk.magentaBright('𝓝𝒆𝔁𝓽𝓤𝓘:'),
  renderContent: (msg, emoji) => {
    // You can get the current saying emoji and the message, and you can return what you want render
    return `${emoji} ${msg}` // output like: ٩(◕‿◕｡)۶ wo zhe shi ce shi ni kan kan
  }
})
```

## 📚 Api

```ts
type OmitTips<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
}
type ChalkColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey' | 'blackBright' | 'redBright' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright' | 'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite' | 'bgGray' | 'bgGrey' | 'bgBlackBright' | 'bgRedBright' | 'bgGreenBright' | 'bgYellowBright' | 'bgBlueBright' | 'bgMagentaBright' | 'bgCyanBright' | 'bgWhiteBright'

declare const colorMatchRegex: RegExp
declare function strip(str: string): string

declare const boxRound: {
  bold: {
    bottomLeft: string
    bottomRight: string
    horizontal: string
    topLeft: string
    topRight: string
    vertical: string
  }
  classic: {
    bottomLeft: string
    bottomRight: string
    horizontal: string
    topLeft: string
    topRight: string
    vertical: string
  }
  double: {
    bottomLeft: string
    bottomRight: string
    horizontal: string
    topLeft: string
    topRight: string
    vertical: string
  }
  doubleSingle: {
    bottomLeft: string
    bottomRight: string
    horizontal: string
    topLeft: string
    topRight: string
    vertical: string
  }
  round: {
    bottomLeft: string
    bottomRight: string
    horizontal: string
    topLeft: string
    topRight: string
    vertical: string
  }
  single: {
    bottomLeft: string
    bottomRight: string
    horizontal: string
    topLeft: string
    topRight: string
    vertical: string
  }
  singleDouble: {
    bottomLeft: string
    bottomRight: string
    horizontal: string
    topLeft: string
    topRight: string
    vertical: string
  }
}

interface BoxOptions {
  text: string
  center?: boolean
  log?: boolean
  color?: ChalkColor
  title?: string
  borderStyle?: keyof typeof boxRound
  padding?: number
  width?: number
  align?: 'left' | 'center' | 'right'
  titleColor?: ChalkColor
}
/**
 * Output a box with the content
 */
declare function outputBox({ borderStyle, center, color, log, padding, text, title, width, align, titleColor, }: BoxOptions): string

type Character = 'cat' | 'cow' | 'cheese'
declare function generateCharacter({ mouth, eyes, character, content, color: _color, funny, bodyFunny, }: {
  mouth?: string
  eyes?: [string, string]
  character: Character
  content: string
  color?: ChalkColor
  funny?: boolean
  bodyFunny?: boolean
}): string
declare function generateBox(content: string, color?: ChalkColor): string

type Message = string | Promise<string>
type Msg = Message[] | Message | Message[][]
type EmojiItem = string | {
  content: string
  mouth: string
  eyes: [string, string]
}
interface SayOptions {
  clear?: boolean
  stdout?: NodeJS.WriteStream
  /**
   * Ascii text to use for the face
   * @example ['٩(◕‿◕｡)۶', '٩($eyes1_$mouth｡$eyes2۶', '٩(◉‿◉｡)۶']
   * @example Custom face
   * ['٩(◕‿◕｡)۶', { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: 'ಠ', eyes: ['ಠ', 'ಠ'] }, '٩(◉‿◉｡)۶']
   */
  emoji?: [EmojiItem, EmojiItem | EmojiItem[], EmojiItem]
  title?: string
  renderContent?: (msg: string, emoji: EmojiItem) => string
}
/**
 * Say something with a face
 */
declare function say(msg?: Msg, { clear, stdout, title, emoji, renderContent: _renderContent, }?: SayOptions): Promise<void>
interface SayBoxOptions extends SayOptions {
  boxOptions: Omit<BoxOptions, 'text'>
}
declare function sayBox(msg: Msg, options?: SayBoxOptions): Promise<void>
interface FunnySayOptions extends Partial<OmitTips<SayOptions, 'title'>> {
  character?: Character
  color?: ChalkColor
  funny?: boolean
  bodyFunny?: boolean
}
declare function funnySay(msg: Msg, options?: FunnySayOptions): Promise<void>

declare function transformEmoji(emoji: EmojiItem): string
declare const sleep: (ms: number) => Promise<unknown>
declare const randomBetween: (min: number, max: number) => number
declare function getText(text: Message[] | Message[][]): Promise<(string | string[])[]>
declare function getTextMaxLength(text: string[] | string[][]): number

declare const chalkColorList: ChalkColor[]

export { type BoxOptions, type ChalkColor, type Character, type EmojiItem, type FunnySayOptions, type Message, type Msg, type OmitTips, type SayBoxOptions, type SayOptions, boxRound, chalkColorList, colorMatchRegex, funnySay, generateBox, generateCharacter, getText, getTextMaxLength, outputBox, randomBetween, say, sayBox, sleep, strip, transformEmoji }
```
