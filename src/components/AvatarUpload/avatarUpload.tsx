import React from 'react'
import './avatarUploadStyles.scss'
import { FaMountain } from 'react-icons/fa'

const AvatarUpload = () => {
  return (
    <div className='box'>
      <div className='drop-file-container'>
        <span className='file-title'>
          <FaMountain/> 
          <span>Organization Logo</span>
        </span>
        <span className='file-subtitle'>
          Drop the image here or click to browse.
        </span>
      </div>
    </div>
  )
}

export default AvatarUpload