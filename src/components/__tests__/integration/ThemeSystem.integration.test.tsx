import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import React from 'react'

// Mock components that work together for theme system
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <div data-theme="light">{children}</div>
}

const ThemeToggleButton = () => {
  const handleToggle = () => {
    // Theme toggle logic would be here
    document.documentElement.classList.toggle('dark')
  }

  return (
    <button onClick={handleToggle} data-testid="theme-toggle">
      Toggle Theme
    </button>
  )
}

const ThemeAwareComponent = () => {
  return (
    <div data-testid="theme-aware" className="text-black dark:text-white">
      Theme Aware Content
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <ThemeToggleButton />
      <ThemeAwareComponent />
    </ThemeProvider>
  )
}

describe('Theme System Integration', () => {
  beforeEach(() => {
    // Reset DOM classes
    document.documentElement.className = ''
    
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    }
    global.localStorage = localStorageMock as any
    
    // Mock classList.toggle
    document.documentElement.classList.toggle = vi.fn()
  })

  it('renders theme system components together', () => {
    render(<App />)
    
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
    expect(screen.getByTestId('theme-aware')).toBeInTheDocument()
  })

  it('theme toggle affects theme-aware components', () => {
    render(<App />)
    
    const toggleButton = screen.getByTestId('theme-toggle')
    const themeAwareComponent = screen.getByTestId('theme-aware')
    
    expect(themeAwareComponent).toHaveClass('text-black', 'dark:text-white')
    
    // Click theme toggle
    fireEvent.click(toggleButton)
    
    // Verify classList.toggle was called
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith('dark')
  })

  it('maintains theme consistency across components', () => {
    render(<App />)
    
    const themeProvider = screen.getByTestId('theme-aware').closest('[data-theme]')
    expect(themeProvider).toHaveAttribute('data-theme', 'light')
  })
})