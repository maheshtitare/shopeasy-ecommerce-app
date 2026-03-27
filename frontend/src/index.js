import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// React app ko "root" div me mount karo (index.html me hai)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
