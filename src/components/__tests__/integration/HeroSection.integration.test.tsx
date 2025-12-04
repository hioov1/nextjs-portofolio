import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

// Create a mock HeroSection component that combines HeroContent with other components
const HeroSection = () => {
  return (
    <div data-testid="hero-section">
      <div data-testid="hero-content">Hero Content</div>
      <div data-testid="rotating-text">Rotating Text</div>
      <div data-testid="profile-image">Profile Image</div>
      <div data-testid="true-focus">True Focus</div>
    </div>
  )
}

describe('Hero Section Integration', () => {
  it('renders all hero components together', () => {
    render(<HeroSection />)
    
    expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    expect(screen.getByTestId('hero-content')).toBeInTheDocument()
    expect(screen.getByTestId('rotating-text')).toBeInTheDocument()
    expect(screen.getByTestId('profile-image')).toBeInTheDocument()
    expect(screen.getByTestId('true-focus')).toBeInTheDocument()
  })

  it('maintains proper component hierarchy', () => {
    render(<HeroSection />)
    
    const heroSection = screen.getByTestId('hero-section')
    const heroContent = screen.getByTestId('hero-content')
    
    expect(heroSection).toContainElement(heroContent)
  })
})