import { createRoot } from 'react-dom/client';

import Panel from '@src/pages/panel/Panel';
import { refreshOnUpdate } from 'virtual:reload-on-update-in-view';

import '@styles/panel.scss';

refreshOnUpdate('pages/panel');

function init() {
  const appContainer = document.querySelector('#app-container');

  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<Panel />);
}

init();
