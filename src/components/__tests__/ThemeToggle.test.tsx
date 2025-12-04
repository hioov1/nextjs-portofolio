import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ThemeToggle from '../ThemeToggle'
import React from 'react'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, initial, whileHover, whileTap, ...props }: any) => <button {...props}>{children}</button>,
    div: ({ children, initial, whileHover, whileTap, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

// Mock react-icons
vi.mock('react-icons/fi', () => ({
  FiSun: () => <div data-testid="sun-icon">Sun</div>,
  FiMoon: () => <div data-testid="moon-icon">Moon</div>,
}))

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }
    global.localStorage = localStorageMock as any
    
    // Mock window.matchMedia
    global.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    // Mock document.documentElement.classList
    document.documentElement.classList.toggle = vi.fn()
  })

  it('renders theme toggle button', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('renders sun icon by default (light mode)', () => {
    localStorage.getItem = vi.fn().mockReturnValue(null)
    render(<ThemeToggle />)
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument()
  })

  it('renders moon icon when dark mode is active', () => {
    localStorage.getItem = vi.fn().mockReturnValue('dark')
    render(<ThemeToggle />)
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
  })

  it('toggles theme when clicked', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(localStorage.setItem).toHaveBeenCalled()
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith('dark', expect.any(Boolean))
  })

  it('initializes with system preference when no saved theme', () => {
    localStorage.getItem = vi.fn().mockReturnValue(null)
    global.matchMedia = vi.fn().mockReturnValue({ matches: true })
    
    render(<ThemeToggle />)
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
  })
})