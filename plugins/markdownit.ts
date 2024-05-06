import MarkdownIt from 'markdown-it';
import Shiki from '@shikijs/markdown-it';
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import { attrs } from '@mdit/plugin-attrs';
import { katex } from '@mdit/plugin-katex';
import { sub } from '@mdit/plugin-sub'
import { sup } from '@mdit/plugin-sup';
import { tasklist } from '@mdit/plugin-tasklist';

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import uml from 'markdown-it-textual-uml'

const markdownIt = new MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
})
markdownIt
  .use(attrs)
  .use(sub)
  .use(sup)
  .use(tasklist)
  .use(uml)

export default defineNuxtPlugin(async () => {
  markdownIt.use(await Shiki({
    themes: {
      light: 'light-plus',
      dark: 'dark-plus',
    },
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerNotationFocus(),
    ],
  }))
  return {
    provide: {
      md: () => markdownIt,
    },
  }
})
