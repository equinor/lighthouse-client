
import { render } from 'react-dom';
import moduleLoader from './moduleLoader';
import ProCoSysAppClient from './ProCoSysAppClient';

if (!(window !== window.parent && !window.opener)) {
    moduleLoader.register()
    render(<ProCoSysAppClient />, document.getElementById('root'));
}


