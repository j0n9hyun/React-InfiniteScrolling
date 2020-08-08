import React from 'react';
import ReactDOM from 'react-dom';
import Infinite from './infinite';

function App() {
  return (
    <div>
      <Infinite />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
