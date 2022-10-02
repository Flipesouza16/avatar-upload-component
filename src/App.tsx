import React from 'react';
import { AvatarUpload } from './components';

function App() {
  const getSelectedImage = (e: any) => {
    console.log('saved image: ',e);
  }

  return (
    <div className="App">
      <AvatarUpload onChange={getSelectedImage} />
    </div>
  );
}

export default App;
