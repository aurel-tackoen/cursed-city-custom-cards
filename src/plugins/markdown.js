import { marked } from 'marked';
import DiceD6 from '/public/svg/dice-d6.svg?raw';
import DiceD8 from '/public/svg/dice-d8.svg?raw';
import DiceD12 from '/public/svg/dice-d12.svg?raw';

function generateHtml(text) {
  text = text.replace('[D6]', `<div class="inline h-3 w-3">${DiceD6}</div>`);
  text = text.replace('[D8]', `<div class="inline h-3 w-3">${DiceD8}</div>`);
  text = text.replace('[D12]', `<div class="inline h-3 w-3">${DiceD12}</div>`);
  text = marked.parseInline(text);
  console.log(text);
  return text;
}

export { generateHtml };
