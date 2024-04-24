import type { EmojiItem, Message } from './say'

export function transformEmoji(emoji: EmojiItem) {
  if (typeof emoji === 'string') {
    return emoji
  }
  const { mouth, content, eyes } = emoji

  return content.replace('$mouth', mouth).replace('$eyes1', eyes[0]).replace('$eyes2', eyes[1])
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

export async function getText(text: Message[] | Message[][]) {
  const result = []

  for (const message of text) {
    if (Array.isArray(message)) {
      const _text = (await getText(message)) as string[]
      result.push(_text)
    }
    else {
      const _text = await message
      result.push(_text)
    }
  }

  return result
}

export function getTextMaxLength(text: string[] | string[][]) {
  let len = 0

  for (const message of text) {
    if (Array.isArray(message)) {
      const _len = message.join(' ').length
      len = _len > len ? _len : len
    }
    else {
      const _len = message.length
      len = _len > len ? _len : len
    }
  }

  return len
}
