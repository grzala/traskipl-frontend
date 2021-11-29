import React, { useEffect } from 'react';
import './App.scss';

import Homepage from './Pages/Homepage';

function App() {

  useEffect(() => {
    document.body.className = 'default-body';

    return () => {
      document.body.className = '';
    }
  }, [])

  return (
    <div className="App">
      <div className="container-fluid" >
        <div className="row">
          <Homepage />
        </div>
      </div>
    
    </div>
  );
}

export default App;
