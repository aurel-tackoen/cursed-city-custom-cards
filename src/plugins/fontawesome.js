import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faGripVertical as fasGripVertical,
  faTrash as fasTrash,
  faCopy as fasCopy,
  faPlusLarge as fasPlusLarge,
  faHatWizard as fasHatWizard,
  faDiceD6 as fasDiceD6,
  faDiceD8 as fasDiceD8,
  faDiceD10 as fasDiceD10,
  faDiceD12 as fasDiceD12,
  faBookSkull as fasBookSkull,
  faFontCase as fasFontCase,
  faSwords as fasSwords,
  faLineHeight as fasLineHeight,
  faImage as FasImage,
  faQuestion as FasQuestion,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faDiceD6 as fadDiceD6,
  faDiceD8 as fadDiceD8,
  faDiceD10 as fadDiceD10,
  faDiceD12 as fadDiceD12,
  faBookSkull as fadBookSkull,
} from '@fortawesome/pro-duotone-svg-icons';
import { faDiceD12 as fatDiceD12 } from '@fortawesome/pro-thin-svg-icons';
library.add(
  fasGripVertical,
  fasTrash,
  fasPlusLarge,
  fasCopy,
  fasHatWizard,
  fasFontCase,
  fasSwords,
  fasLineHeight,
  FasImage,
  FasQuestion
);
library.add(fasDiceD6, fasDiceD8, fasDiceD10, fasDiceD12, fasBookSkull);
library.add(fadDiceD6, fadDiceD8, fadDiceD10, fadDiceD12, fadBookSkull);
library.add(fatDiceD12);

export default FontAwesomeIcon;
