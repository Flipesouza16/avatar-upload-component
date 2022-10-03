import React from 'react'
import AvatarUpload from './avatarUpload'
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageModel } from './avatarUpload-type';


const mockValidImage: ImageModel = {
  path: "COVER.jpg",
  preview: "blob:http://localhost:3000/381b3fe9-96ad-4cef-a66f-dfbdffc9d10e",
  type: 'image/jpeg',
  name: "COVER.jpg",
  size: 11269633
}

const mockInvalidImage: ImageModel = {
  path: "COVER.jpg",
  preview: "blob:http://localhost:3000/381b3fe9-96ad-4cef-a66f-dfbdffc9d10e",
  type: 'outro',
  name: "COVER.jpg",
  size: 11269633
}

afterEach(cleanup)

describe('Avatar Upload', () => {
  test('Should render component', () => {
    render(<AvatarUpload />)
    expect(screen.getByTestId('avatar-upload')).toBeInTheDocument()
  })
  
  test('Should initialize the title with value "Organization Logo"', () => {
    render(<AvatarUpload />)

    const title = screen.getByText('Organization Logo')
    
    expect(title).toBeInTheDocument()
  })
  
  test('Should initialize the subtitle with value "Drop the image here or click to browse."', () => {
    render(<AvatarUpload />)
    
    const title = screen.getByText('Drop the image here or click to browse.')
    
    expect(title).toBeInTheDocument()
  })

  test('Should initialize the container, main div, with class "box"', () => {
    render(<AvatarUpload />)
    
    const boxContainer = screen.getByTestId('avatar-upload')
    
    expect(boxContainer).toHaveClass('box')
  })

  test('Should initialize the drop file container, with class "drop-file-container"', () => {
    render(<AvatarUpload />)
    
    const boxContainer = screen.getByTestId('drop-file-container')
    
    expect(boxContainer).toHaveClass('drop-file-container')
  })

  test('Should not display close button on component initialize', () => {
    render(<AvatarUpload />)
    
    const closeButton = screen.queryByTestId('close-button')
    
    expect(closeButton).not.toBeInTheDocument()
  })

  test('Should display default image if exists', () => {
    render(<AvatarUpload defaultImage={mockValidImage} />)
    
    const avatarImage = screen.queryByTestId('avatar-image')
    
    expect(avatarImage).toBeInTheDocument()
  })

  test('Should display border dashed if image not exists', () => {
    render(<AvatarUpload />)
    
    const boxContainer = screen.getByTestId('avatar-upload')

    expect(boxContainer).toHaveClass('box-dashed')
  })
  
  test('Should not display border dashed if image exists on initial state', () => {
    render(<AvatarUpload defaultImage={mockValidImage} />)
    
    const boxContainer = screen.getByTestId('avatar-upload')

    expect(boxContainer).not.toHaveClass('box-dashed')
  })

  test('Should display border dashed if image exists after save image', () => {
    render(<AvatarUpload defaultImage={mockValidImage} />)
    
    const saveButton = screen.getByTestId('button-save')
    
    userEvent.click(saveButton)
    
    const boxContainer = screen.getByTestId('avatar-upload')
    expect(boxContainer).toHaveClass('box-dashed')
  })
 
  test('Should display close button in the component when some image is selected', () => {
    render(<AvatarUpload defaultImage={mockValidImage} />)
    
    const closeButton = screen.queryByTestId('close-button')
    
    expect(closeButton).toBeInTheDocument()
  })

  test('Should initialize slider with value 1', () => {
    render(<AvatarUpload defaultImage={mockValidImage} />)

    const avatarImage = screen.getByTestId('avatar-image')
    const styleAvatarImage = getComputedStyle(avatarImage)

    expect(styleAvatarImage.transform).toEqual('scale(1)')
  })

  test('Should change the zoom of image when move slider', () => {
    render(<AvatarUpload defaultImage={mockValidImage} />)

    const slider = screen.getByTestId('slider')
    const optionsValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const avatarImage = screen.getByTestId('avatar-image')
    
    optionsValues.forEach(value => {
      fireEvent.change(slider, {
        target: { value }
      })

      const styleAvatarImage = getComputedStyle(avatarImage)
      expect(styleAvatarImage.transform).toEqual(`scale(${value})`)
    })
  })

  test('Should hide slide and close button and display selected image when click to save', () => {
    render(<AvatarUpload defaultImage={mockValidImage} />)
    
    const saveButton = screen.getByTestId('button-save')
    
    userEvent.click(saveButton)
    
    const slider = screen.queryByTestId('slider')
    const closeButton = screen.queryByTestId('close-button')
    const avatarImage = screen.queryByTestId('avatar-image')

    expect(slider).not.toBeInTheDocument()
    expect(closeButton).not.toBeInTheDocument()
    expect(avatarImage).toBeInTheDocument()
  })

  test('Should display the title "Sorry, the upload failed." when upload failed', () => {
    render(<AvatarUpload defaultImage={mockInvalidImage} />)

    const title = screen.getByText('Sorry, the upload failed.')
    
    expect(title).toBeInTheDocument()
  })
 
  test('Should display the subtitle "Try again" when upload failed', () => {
    render(<AvatarUpload defaultImage={mockInvalidImage} />)

    const subtitle = screen.getByText('Try again')
    
    expect(subtitle).toBeInTheDocument()
  })

  test('Should return to initial state ater click on close button', () => {
    render(<AvatarUpload defaultImage={mockValidImage} />)
    const closeButton = screen.queryByTestId('close-button-click')
    const avatarImage = screen.getByTestId('avatar-image')

    if(avatarImage && closeButton) {
      userEvent.click(closeButton)
    }
    
    expect(avatarImage).not.toBeInTheDocument()
  })
 
  test('Should emit image after save', () => {
    let isImageEmitted = false

    const getSelectedImage = (image: ImageModel) => {
      if(image) {
        isImageEmitted = true
      }
    }

    render(<AvatarUpload defaultImage={mockValidImage} onChange={getSelectedImage} />)

    const saveButton = screen.getByTestId('button-save')
    userEvent.click(saveButton)

    expect(isImageEmitted).toBeTruthy()
  })
})
