import chalk from 'chalk'
import type { ChalkColor } from './box'
import { boxRound } from './box'
import { colorMatchRegex } from './strip'

export interface BoxOptions {
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
export function outputBox({
  borderStyle = 'round',
  center = false,
  color,
  log = true,
  padding = 0,
  text,
  title,
  width,
  align = 'center',
  titleColor = 'cyanBright',
}: BoxOptions) {
  const rounded = boxRound[borderStyle]
  const mergedRounded = color
    ? Object.fromEntries(Object.entries(rounded).map(([key, value]) => [key, chalk[color](value)]))
    : rounded
  const contentArr = text.split('\n')
  const transformArr = contentArr.map(c => c.replace(colorMatchRegex, ''))

  const isPadding = padding > 0
  const paddingLength = padding

  const mergedPadding = center || isPadding

  let maxLength = width ?? transformArr.reduce((acc, cur) => (cur.length > acc ? cur.length : acc), 0)

  // Update the padding maxLength
  // paddingLength * 2 because one vertical line == 4 spaces
  maxLength = isPadding ? maxLength + paddingLength * 4 : maxLength

  title = title ? chalk[titleColor](title) : title
  const clearColorTitle = title ? title.replace(colorMatchRegex, '') : ''
  const titleLength = title ? clearColorTitle.length : 0
  let titleHeaderLength = maxLength - titleLength
  const spaceLen = 2

  while (titleLength + spaceLen + paddingLength >= maxLength) {
    // Need to adjust the maxLength
    maxLength += Math.floor(titleLength / 2)
  }
  // Update the titleHeaderLength
  titleHeaderLength = maxLength - titleLength

  const boxHeaderContent = (() => {
    if (title) {
      if (align === 'center') {
        const spaceFir = Math.floor(titleHeaderLength / 2) - 1
        const spaceSec = Math.ceil(titleHeaderLength / 2) - 1

        const padFir = spaceFir > 0 ? mergedRounded.horizontal.repeat(spaceFir) : ''
        const padSec = spaceSec > 0 ? mergedRounded.horizontal.repeat(spaceSec) : ''

        return `${padFir} ${title} ${padSec}`
      }
      else if (align === 'left') {
        return ` ${title} ${mergedRounded.horizontal.repeat(titleHeaderLength - 2)}`
      }
      else {
        return `${mergedRounded.horizontal.repeat(titleHeaderLength - 2)} ${title} `
      }
    }

    return mergedRounded.horizontal.repeat(maxLength)
  })()

  const boxHeader = mergedRounded.topLeft + boxHeaderContent + mergedRounded.topRight
  const boxFooter
    = mergedRounded.bottomLeft
    + mergedRounded.horizontal.repeat(maxLength)
    + mergedRounded.bottomRight

  let boxContent = contentArr.reduce((acc, cur) => {
    const transformCur = cur.replace(colorMatchRegex, '')
    const spaceLength = maxLength - transformCur.length

    const pad = ' '.repeat(spaceLength)

    const spaceFir = Math.floor(spaceLength / 2)
    const spaceSec = Math.ceil(spaceLength / 2)

    const padFir = spaceFir > 0 ? ' '.repeat(spaceFir) : ''
    const padSec = spaceSec > 0 ? ' '.repeat(spaceSec) : ''

    if (center) {
      acc.push(
        `${mergedRounded.vertical}${spaceLength ? `${padFir}${cur}${padSec}` : cur}${
          mergedRounded.vertical
        }`,
      )
    }
    else if (padding) {
      const endLen = spaceLength - paddingLength * 2

      acc.push(
        `${mergedRounded.vertical}${' '.repeat(paddingLength * 2)}${cur}${' '.repeat(endLen)}${
          mergedRounded.vertical
        }`,
      )
    }
    else {
      acc.push(
        `${mergedRounded.vertical}${spaceLength > 0 ? `${cur}${pad}` : cur}${
          mergedRounded.vertical
        }`,
      )
    }

    return acc
  }, [] as string[])

  // Generate the padding
  if (mergedPadding) {
    for (let i = 0; i < paddingLength; i++) {
      boxContent.unshift(
        `${mergedRounded.vertical}${' '.repeat(maxLength)}${mergedRounded.vertical}`,
      )
      boxContent.push(`${mergedRounded.vertical}${' '.repeat(maxLength)}${mergedRounded.vertical}`)
    }
  }

  boxContent = [boxHeader, ...boxContent, boxFooter]

  // eslint-disable-next-line no-console
  log && console.log(boxContent.join('\n'))

  return boxContent.join('\n')
}
