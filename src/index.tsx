import { Icon as EdsIcon } from '@equinor/eds-core-react';
import * as icons from '@equinor/eds-icons';
import { render } from 'react-dom';
import { Bootstrap } from './AppClient';
import { GlobalStyle } from './Core/Client/styleProvider';

EdsIcon.add({ ...icons });

render(
    <>
        <GlobalStyle />
        <Bootstrap />
    </>,
    document.getElementById('root')
);
