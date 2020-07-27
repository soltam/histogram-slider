import React from 'react';
import './App.css';
// import Histoslider from  'histoslider';
import HistoSlider from './HistoSlider';

let prices: any[] = [];
for (let i = 0; i < 500; i++) {
  prices.push(Math.floor(Math.random() * 80) + 1);
}

function App() {
  return (
    <div className="App">
      <div className="BarChart">
      <HistoSlider data={prices} height={50} width={600}/>
      </div>
    </div>
  );
}

export default App;
