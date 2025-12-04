import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CircularProfileImage from '../CircularProfileImage'
import React from 'react'

// Mock motion/react
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, whileHover, ...props }: any) => <div {...props}>{children}</div>,
    img: ({ children, whileHover, ...props }: any) => <img {...props}>{children}</img>,
  },
}))

describe('CircularProfileImage', () => {
  const defaultProps = {
    imageSrc: '/test-image.jpg'
  }

  it('renders profile image with default props', () => {
    render(<CircularProfileImage {...defaultProps} />)
    const image = screen.getByAltText('Profile Picture')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('renders with custom alt text', () => {
    render(<CircularProfileImage {...defaultProps} altText="Custom Alt Text" />)
    const image = screen.getByAltText('Custom Alt Text')
    expect(image).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<CircularProfileImage {...defaultProps} className="custom-class" />)
    // The className is applied to the outermost motion.div
    const outerContainer = container.firstChild as HTMLElement
    expect(outerContainer).toHaveClass('custom-class')
  })

  it('sets custom size', () => {
    const { container } = render(<CircularProfileImage {...defaultProps} size={300} />)
    const outerContainer = container.firstChild as HTMLElement
    expect(outerContainer).toHaveStyle({ width: '300px', height: '300px' })
  })

  it('renders with default size when not specified', () => {
    const { container } = render(<CircularProfileImage {...defaultProps} />)
    const outerContainer = container.firstChild as HTMLElement
    expect(outerContainer).toHaveStyle({ width: '400px', height: '400px' })
  })

  it('renders decorative elements', () => {
    const { container } = render(<CircularProfileImage {...defaultProps} />)
    // Check for decorative blur elements (they should exist in the DOM)
    const decorativeElements = container.querySelectorAll('.blur-xl')
    expect(decorativeElements).toHaveLength(2)
  })

  it('renders gradient border container', () => {
    const { container } = render(<CircularProfileImage {...defaultProps} />)
    const gradientBorder = container.querySelector('.bg-gradient-to-br')
    expect(gradientBorder).toBeInTheDocument()
  })

  it('renders image with correct object-cover class', () => {
    render(<CircularProfileImage {...defaultProps} />)
    const image = screen.getByAltText('Profile Picture')
    expect(image).toHaveClass('object-cover')
  })
})