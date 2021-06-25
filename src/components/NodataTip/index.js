import tpl from './index.tpl';
import './index.scss';

import { tplReplace } from '../../libs/utils';

export default {
  name: 'NodataTip',
  tpl(text) {
    return tplReplace(tpl, { text });
  }
}