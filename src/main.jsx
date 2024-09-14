import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import store from './app/store.js'
import App from './App.jsx'
import './style/globalStyle.css'
//font source
import '@fontsource/poppins';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
