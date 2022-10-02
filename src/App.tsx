import React from 'react';
import { AvatarUpload } from './components';
import { ImageModel } from './components/AvatarUpload/avatarUpload-type';

function App() {
  const getSelectedImage = (image: ImageModel) => {
    console.log('saved image: ',image);
  }

  return (
    <div className="App">
      <AvatarUpload onChange={getSelectedImage} />
    </div>
  );
}

export default App;
