import { Icon as EdsIconOld } from '@equinor/eds-core-react-old';
import { Icon as EdsIcon } from '@equinor/eds-core-react';
import * as icons from '@equinor/eds-icons';
import { render } from 'react-dom';
import { Bootstrap } from './AppClient';
import { GlobalStyle } from './Core/Client/styleProvider';

EdsIconOld.add({ ...icons });
EdsIcon.add({ ...icons });

function fixDuplicateDefine(originalDefine: typeof customElements.define) {
  customElements.define = function(name, constructor, options) {
    if (customElements.get(name)) {
      console.warn(`Custom element '${name}' has already been defined.`);
    } else {
      originalDefine.call(customElements, name, constructor, options);
    }
  };
}

fixDuplicateDefine(customElements.define)

render(
  <>
    <GlobalStyle />
    <Bootstrap />
  </>,
  document.getElementById('root')
);
