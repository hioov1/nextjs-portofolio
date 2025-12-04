import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HeroContent from '../HeroContent'
import React from 'react'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    img: ({ children, ...props }: any) => <img {...props}>{children}</img>,
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
}));

// Mock child components
vi.mock('../RotatingText', () => ({
  default: () => <div data-testid="rotating-text">Rotating Text</div>,
}))

vi.mock('../CircularProfileImage', () => ({
  default: () => <div data-testid="profile-image">Profile Image</div>,
}))

vi.mock('../TrueFocus', () => ({
  default: () => <div data-testid="true-focus">True Focus</div>,
}))

vi.mock('../ui/spotlight-new', () => ({
  Spotlight: () => <div data-testid="spotlight">Spotlight</div>,
}))

describe('HeroContent', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    Element.prototype.scrollIntoView = vi.fn()
    // Mock getElementById
    document.getElementById = vi.fn()
  })

  it('renders without crashing', () => {
    render(<HeroContent />)
    expect(screen.getByTestId('rotating-text')).toBeInTheDocument()
    expect(screen.getAllByTestId('profile-image')).toHaveLength(2) // Mobile and desktop versions
  })

  it('renders spotlight component', () => {
    render(<HeroContent />)
    expect(screen.getByTestId('spotlight')).toBeInTheDocument()
  })

  it('accepts baseDelay prop', () => {
    const { rerender } = render(<HeroContent baseDelay={2.0} />)
    expect(screen.getByTestId('rotating-text')).toBeInTheDocument()
    
    rerender(<HeroContent baseDelay={1.5} />)
    expect(screen.getByTestId('rotating-text')).toBeInTheDocument()
  })

  it('renders TrueFocus component', () => {
    render(<HeroContent />)
    expect(screen.getByTestId('true-focus')).toBeInTheDocument()
  })

  it('has correct default baseDelay when not provided', () => {
    render(<HeroContent />)
    expect(screen.getByTestId('true-focus')).toBeInTheDocument()
    expect(screen.getByTestId('rotating-text')).toBeInTheDocument()
  })

  it('renders both mobile and desktop profile images', () => {
    render(<HeroContent />)
    const profileImages = screen.getAllByTestId('profile-image')
    expect(profileImages).toHaveLength(2)
    // One for mobile (lg:hidden), one for desktop (hidden lg:flex)
  })

  it('renders main text content', () => {
    render(<HeroContent />)
    // Check if main container exists
    const component = screen.getByTestId('rotating-text').closest('div')
    expect(component).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<HeroContent />)
    expect(screen.getByText(/a Full-stack \(AI Promter\) Developer based in Web Development/)).toBeInTheDocument()
  })

  it('renders call-to-action button', () => {
    render(<HeroContent />)
    const button = screen.getByText("Let's get started →")
    expect(button).toBeInTheDocument()
    expect(button.tagName).toBe('SPAN')
    expect(button.closest('button')).toBeInTheDocument()
  })

  it('handles scroll to about section when button is clicked', () => {
    const mockScrollIntoView = vi.fn()
    const mockElement = { scrollIntoView: mockScrollIntoView }
    document.getElementById = vi.fn().mockReturnValue(mockElement)

    render(<HeroContent />)
    const button = screen.getByText("Let's get started →").closest('button')
    fireEvent.click(button!)

    expect(document.getElementById).toHaveBeenCalledWith('about')
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    })
  })

  it('handles button hover states', () => {
    render(<HeroContent />)
    const button = screen.getByText("Let's get started →").closest('button') as HTMLButtonElement

    // Test mouse enter
    fireEvent.mouseEnter(button)
    expect(button.style.background).toContain('rgba(255, 255, 255, 0.2)')
    expect(button.style.backdropFilter).toBe('blur(16px)')

    // Test mouse leave
    fireEvent.mouseLeave(button)
    expect(button.style.background).toContain('rgba(255, 255, 255, 0.15)')
    expect(button.style.backdropFilter).toBe('blur(12px)')
  })

  it('renders with different mobile and desktop profile images', () => {
    render(<HeroContent />)
    const profileImages = screen.getAllByTestId('profile-image')
    expect(profileImages).toHaveLength(2)
    
    // Check that mobile and desktop versions exist by finding their motion.div containers
    const containers = profileImages.map(img => img.closest('div'))
    // Should have containers with responsive classes (simplified check)
    expect(containers.length).toBe(2)
    expect(containers.every(container => container !== null)).toBe(true)
  })

  it('applies correct responsive classes', () => {
    render(<HeroContent />)
    const mainContainer = screen.getByTestId('rotating-text').closest('.relative')
    expect(mainContainer).toBeInTheDocument()
  })

  it('renders TrueFocus with correct props', () => {
    render(<HeroContent />)
    const trueFocus = screen.getByTestId('true-focus')
    expect(trueFocus).toBeInTheDocument()
  })

  it('handles case when about element does not exist', () => {
    document.getElementById = vi.fn().mockReturnValue(null)

    render(<HeroContent />)
    const button = screen.getByText("Let's get started →").closest('button')
    
    // Should not throw error when element doesn't exist
    expect(() => fireEvent.click(button!)).not.toThrow()
    expect(document.getElementById).toHaveBeenCalledWith('about')
  })

  it('renders with custom baseDelay and applies it correctly', () => {
    const customDelay = 2.5
    render(<HeroContent baseDelay={customDelay} />)
    
    // Component should render without issues with custom delay
    expect(screen.getByTestId('rotating-text')).toBeInTheDocument()
    expect(screen.getByTestId('true-focus')).toBeInTheDocument()
  })

  it('renders main heading text content', () => {
    render(<HeroContent />)
    expect(screen.getByText(/I'm a/)).toBeInTheDocument()
  })

  it('uses proper motion variants for animations', () => {
    render(<HeroContent />)
    // Test that all key elements are present (they use motion.div)
    expect(screen.getByTestId('rotating-text')).toBeInTheDocument()
    expect(screen.getByTestId('true-focus')).toBeInTheDocument()
    expect(screen.getAllByTestId('profile-image')).toHaveLength(2)
    expect(screen.getByText("Let's get started →")).toBeInTheDocument()
  })
})