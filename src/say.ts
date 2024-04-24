import { createLogUpdate } from 'log-update'
import chalk from 'chalk'
import { strip } from './strip'
import { type BoxOptions, outputBox } from './output-box'
import type { Character } from './character'
import { generateCharacter } from './character'
import { getText, getTextMaxLength, randomBetween, sleep, transformEmoji } from './helper'
import type { OmitTips } from './types'
import type { ChalkColor } from './box'

export type Message = string | Promise<string>

export type Msg = Message[] | Message | Message[][]

export type EmojiItem = string | { content: string; mouth: string; eyes: [string, string] }

export interface SayOptions {
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
export async function say(
  msg: Msg = '',
  {
    clear = false,
    stdout = process.stdout,
    title = '\x1B[96m🚀 Welcome to use dynamic log:\x1B[0m',
    emoji,
    renderContent: _renderContent,
  }: SayOptions = {},
) {
  const messages = Array.isArray(msg) ? msg : [msg]
  const logUpdate = createLogUpdate(stdout, { showCursor: false })
  const defaultSayingEyes = chalk.white('ಠ')
  const defaultStartEyes = chalk.white('◕')
  const defaultEndEyes = chalk.white('◕')

  const [start, _saying, end] = emoji || [
    { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: chalk.cyan('◡'), eyes: [defaultStartEyes, defaultStartEyes] },
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
    { content: '٩($eyes1 $mouth $eyes2｡)۶', mouth: chalk.cyan('◡'), eyes: [defaultEndEyes, defaultEndEyes] },
  ]
  const saying = Array.isArray(_saying) ? _saying : [_saying]
  const h = ' '

  const renderContent = _renderContent ?? ((msg: string, emoji: EmojiItem) => {
    emoji = transformEmoji(emoji)
    const len = ` ${strip(emoji)}  `.length

    return [`${h.repeat(len)}${title}`, ` ${emoji}  ${msg}`, `${h.repeat(len)}`].join('\n')
  })

  for (let message of messages) {
    message = await message
    const _message = Array.isArray(message) ? message : message.split(' ')
    const msg = []
    let j = 0

    for (let word of [''].concat(_message as unknown as string)) {
      word = await word
      if (word) {
        msg.push(word)
        j++
      }

      logUpdate(`\n${renderContent(msg.join(' '), word ? saying[j % saying.length] : start)}`)
      await sleep(word ? randomBetween(75, 200) : randomBetween(240, 500))
    }
    await sleep(100)
    const tmp = await Promise.all(_message).then(res => res.join(' '))
    const text = `\n${renderContent(tmp, end)}`
    logUpdate(text)
    await sleep(randomBetween(1200, 1400))
  }
  await sleep(100)

  if (clear) {
    logUpdate.clear()
  }
  else {
    logUpdate.done()
  }
}

export interface SayBoxOptions extends SayOptions {
  boxOptions: Omit<BoxOptions, 'text'>
}

export async function sayBox(msg: Msg, options = {} as SayBoxOptions) {
  const { boxOptions, renderContent: _renderContent, ...sayOptions } = options
  const { padding = 1, title: _title } = boxOptions || {}

  const _text = Array.isArray(msg) ? msg : [msg]
  const text = await getText(_text) as unknown as Msg
  const textLen = getTextMaxLength(text as string[])

  const renderContent = _renderContent ?? ((msg: string, emoji: EmojiItem) => {
    let title = ''
    if (typeof emoji === 'string') {
      title = _title ? `${_title} ${emoji}` : emoji
    }
    else {
      title = _title ? `${_title} ${transformEmoji(emoji)}` : transformEmoji(emoji)
    }

    const output = outputBox({ text: msg, ...boxOptions, log: false, title, width: textLen, padding })

    return output
  })

  await say(text, { ...sayOptions, renderContent })
}

export interface FunnySayOptions extends Partial<OmitTips<SayOptions, 'title'>> {
  character?: Character
  color?: ChalkColor
  funny?: boolean
  bodyFunny?: boolean
}

export async function funnySay(msg: Msg, options = {} as FunnySayOptions) {
  const { character = 'cat', color, bodyFunny, renderContent: _renderContent, funny: _funny, ...sayOptions } = options
  const funny = _funny ?? bodyFunny

  const renderContent = _renderContent ?? ((msg: string, emoji: EmojiItem) => {
    if (typeof emoji === 'string') {
      return generateCharacter({ character, content: msg, color, funny, bodyFunny })
    }
    const { mouth, eyes } = emoji
    const output = generateCharacter({ mouth, eyes, character, content: msg, color, funny, bodyFunny })

    return output
  })

  await say(msg, { ...sayOptions, renderContent })
}
