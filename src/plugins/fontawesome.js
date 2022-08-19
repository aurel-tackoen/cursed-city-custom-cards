import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faGripVertical,
  faTrash,
  faCopy,
  faPlusLarge,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faDiceD6,
  faDiceD8,
  faDiceD10,
  faDiceD12,
  faBookSkull,
} from '@fortawesome/pro-duotone-svg-icons';
library.add(faGripVertical, faTrash, faPlusLarge, faCopy);
library.add(faDiceD6, faDiceD8, faDiceD10, faDiceD12, faBookSkull);

export default FontAwesomeIcon;
