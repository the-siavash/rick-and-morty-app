import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/reset.css';
import './styles/index.css';

createRoot(document.querySelector('#root')).render(<App />);
