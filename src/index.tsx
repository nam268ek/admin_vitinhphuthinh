import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './components/redux/store/store';
import './scss/style.scss';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';

const rootElement: any = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
