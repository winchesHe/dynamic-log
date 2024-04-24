import chalk from 'chalk'
import { strip } from './strip'
import type { ChalkColor } from './types'
import { chalkColorList } from './constants'
import { randomBetween } from './helper'

export type Character = 'cat' | 'cow' | 'cheese'

export function generateCharacter({
  mouth,
  eyes,
  character,
  content,
  color: _color = 'cyan',
  funny,
  bodyFunny,
}: {
  mouth?: string
  eyes?: [string, string]
  character: Character
  content: string
  color?: ChalkColor
  funny?: boolean
  bodyFunny?: boolean
}) {
  let color = _color

  if (funny) {
    color = chalkColorList[randomBetween(0, chalkColorList.length - 1)]
  }

  let returnCharacter = `${generateBox(content, color)}
              \\
               \\
               |\\___/|
              =) ${eyes?.[0] || 'o'}Y${eyes?.[1] || 'o'} (=            
               \\  ${mouth || '^'}  /
                )=*=(       
               /     \\
               |     |
              /| | | |\\
              \\| | |_|/\\
              //_// ___/
                  \\_) 
`

  switch (character) {
    case 'cow':
      returnCharacter = `${generateBox(content, color)}
              \\   ^__^
               \\  (${eyes?.[0] || 'o'}${eyes?.[1] || 'o'})\\_______
                  (${mouth || '--'})\\       )\\/\\
                      ||----w |
                      ||     ||
`
      break
    case 'cheese':
      returnCharacter = `${generateBox(content, color)}
         \\
          \\
            _____   _________
           /     \\_/         |
          |                 ||
          |                 ||
         |    ###\\  /###   | |
         |     ${eyes?.[0] || 'o'}  \\/  ${eyes?.[1] || 'o'}    | |
        /|                 | |
       / |        ${mouth || '<'}        |\\ \\
      | /|                 | | |
      | |     \\_______/   |  | |
      | |                 | / /
      /||                 /|||
         ----------------|
              | |    | |
              ***    ***
             /___\\  /___\\     
`
      break
  }

  const funnyBody = bodyFunny
    ? strip(returnCharacter).replace(/[\w\W]/g, (c) => {
      if (c === ' ')
        return ' '

      return chalk[color](c)
    })
    : returnCharacter

  return funnyBody
}

export function generateBox(content: string, color?: ChalkColor) {
  const stripContent = strip(content)
  const stripLength = stripContent.length - 8 > 0 ? stripContent.length : 8
  const space = stripLength < 8 ? ' '.repeat(8 - stripLength) : ''

  const rounded = color
    ? {
        th: chalk[color]('_'),
        lv: chalk[color]('<'),
        rv: chalk[color]('>'),
        bh: chalk[color]('-'),
      }
    : {
        th: '_',
        lv: '<',
        rv: '>',
        bh: '-',
      }

  return `   ${rounded.th}${rounded.th.repeat(stripLength)}${rounded.th}
  ${rounded.lv} ${content}${space} ${rounded.rv}
   ${rounded.bh}${rounded.bh.repeat(stripLength)}${rounded.bh}`
}
