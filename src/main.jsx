import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/globals.css';

console.log('🚀 main.jsx is executing');

const rootElement = document.getElementById('root');
console.log('📦 Root element found:', rootElement);

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    console.log('✅ React root created');
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('✅ App rendered');
  } catch (error) {
    console.error('❌ Error rendering app:', error);
    rootElement.innerHTML = `
      <div style="padding:20px;background:#1a1a1a;color:white;font-family:monospace;">
        <h2 style="color:#ff6b6b;">❌ Error Loading App</h2>
        <pre style="color:#ff6b6b;">${error.toString()}</pre>
      </div>
    `;
  }
} else {
  console.error('❌ Root element NOT found!');
  document.body.innerHTML = '<h1 style="color:red">Root element not found!</h1>';
}
