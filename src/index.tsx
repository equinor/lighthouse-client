import { Icon as EdsIconOld } from '@equinor/eds-core-react-old';
import { Icon as EdsIcon } from '@equinor/eds-core-react';
import * as icons from '@equinor/eds-icons';
import { render } from 'react-dom';
import { Bootstrap } from './AppClient';
import { GlobalStyle } from './Core/Client/styleProvider';

EdsIconOld.add({ ...icons });
EdsIcon.add({ ...icons });

// Testing to trigger trufflehog
const r = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`;
render(
    <>
        <GlobalStyle />
        <Bootstrap />
    </>,
    document.getElementById('root')
);
