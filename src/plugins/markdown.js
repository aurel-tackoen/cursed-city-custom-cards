import { marked } from 'marked';
import DiceD6 from '@/assets/svg/dice-d6.svg?raw';
import DiceD8 from '@/assets/svg/dice-d8.svg?raw';
import DiceD12 from '@/assets/svg/dice-d12.svg?raw';

function generateHtml(text) {
  if (text) {
    text = text.replace(
      '[D6]',
      `<div class="inline align-text-top">${DiceD6}</div>`
    );
    text = text.replace(
      '[D8]',
      `<div class="inline align-text-top">${DiceD8}</div>`
    );
    text = text.replace(
      '[D12]',
      `<div class="inline align-text-top">${DiceD12}</div>`
    );
    text = marked.parseInline(text);
    return text;
  }
}

export { generateHtml };
