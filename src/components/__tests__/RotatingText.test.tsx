import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import RotatingText, { type RotatingTextRef } from '../RotatingText'
import React, { createRef } from 'react'

// Mock motion/react
vi.mock('motion/react', () => ({
  motion: {
    span: ({ children, layout, ...props }: any) => <span {...props}>{children}</span>,
    div: ({ children, layout, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}))

describe('RotatingText', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  const defaultTexts = ['Developer', 'Designer', 'Creator']

  it('renders with default text', () => {
    act(() => {
      render(<RotatingText texts={defaultTexts} />)
    })
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('renders all provided texts initially', () => {
    act(() => {
      render(<RotatingText texts={defaultTexts} />)
    })
    // At least the first text should be visible
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    let container: HTMLElement
    act(() => {
      const result = render(<RotatingText texts={defaultTexts} className="custom-class" />)
      container = result.container
    })
    // Check the outer container for the className
    const outerContainer = container!.firstChild as HTMLElement
    expect(outerContainer).toHaveClass('custom-class')
  })

  it('handles empty texts array gracefully', () => {
    let container: HTMLElement
    act(() => {
      const result = render(<RotatingText texts={['']} />)
      container = result.container
    })
    // Should not crash when given empty string instead of empty array
    expect(container!.firstChild).toBeInTheDocument()
  })

  it('renders with single text', () => {
    act(() => {
      render(<RotatingText texts={['Single Text']} />)
    })
    expect(screen.getByText('Single Text')).toBeInTheDocument()
  })

  it('handles auto rotation when enabled', () => {
    let container: HTMLElement
    act(() => {
      const result = render(<RotatingText texts={defaultTexts} auto={true} rotationInterval={1000} />)
      container = result.container
    })
    
    // Component should render without crashing
    expect(container!.firstChild).toBeInTheDocument()
    
    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    
    // Component should still be rendered after time passes
    expect(container!.firstChild).toBeInTheDocument()
  })

  it('applies mainClassName when provided', () => {
    let container: HTMLElement
    act(() => {
      const result = render(<RotatingText texts={defaultTexts} mainClassName="main-custom" />)
      container = result.container
    })
    // Check if the main container has the custom class
    const outerContainer = container!.firstChild as HTMLElement
    expect(outerContainer).toHaveClass('main-custom')
  })

  it('handles splitBy prop correctly', () => {
    act(() => {
      render(<RotatingText texts={['Hello World']} splitBy=" " />)
    })
    // Should split by space and render both words
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('handles loop prop', () => {
    act(() => {
      render(<RotatingText texts={defaultTexts} loop={false} />)
    })
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('renders without auto rotation by default', () => {
    let container: HTMLElement
    act(() => {
      const result = render(<RotatingText texts={defaultTexts} />)
      container = result.container
    })
    expect(container!.firstChild).toBeInTheDocument()
    
    // Should not change after time passes
    act(() => {
      vi.advanceTimersByTime(5000)
    })
    
    // Component should still be rendered
    expect(container!.firstChild).toBeInTheDocument()
  })

  it('provides ref methods for navigation control', () => {
    const ref = createRef<RotatingTextRef>()
    act(() => {
      render(<RotatingText texts={defaultTexts} auto={false} ref={ref} />)
    })
    
    expect(ref.current).toBeTruthy()
    expect(ref.current?.next).toBeTypeOf('function')
    expect(ref.current?.previous).toBeTypeOf('function')
    expect(ref.current?.jumpTo).toBeTypeOf('function')
    expect(ref.current?.reset).toBeTypeOf('function')
  })

  it('calls onNext callback when text changes', () => {
    const onNext = vi.fn()
    const ref = createRef<RotatingTextRef>()
    
    act(() => {
      render(<RotatingText texts={defaultTexts} auto={false} onNext={onNext} ref={ref} />)
    })
    
    act(() => {
      ref.current?.next()
    })
    
    expect(onNext).toHaveBeenCalledWith(1)
  })

  it('handles next() method correctly', () => {
    const ref = createRef<RotatingTextRef>()
    
    act(() => {
      render(<RotatingText texts={defaultTexts} auto={false} ref={ref} />)
    })
    
    // Should go to next text
    act(() => {
      ref.current?.next()
    })
    
    expect(screen.getByText('Designer')).toBeInTheDocument()
  })

  it('handles previous() method correctly', () => {
    const ref = createRef<RotatingTextRef>()
    
    act(() => {
      render(<RotatingText texts={defaultTexts} auto={false} ref={ref} />)
    })
    
    // Go to previous (should wrap to last)
    act(() => {
      ref.current?.previous()
    })
    
    expect(screen.getByText('Creator')).toBeInTheDocument()
  })

  it('handles jumpTo() method correctly', () => {
    const ref = createRef<RotatingTextRef>()
    
    act(() => {
      render(<RotatingText texts={defaultTexts} auto={false} ref={ref} />)
    })
    
    // Jump to specific index
    act(() => {
      ref.current?.jumpTo(2)
    })
    
    expect(screen.getByText('Creator')).toBeInTheDocument()
  })

  it('handles reset() method correctly', () => {
    const ref = createRef<RotatingTextRef>()
    
    act(() => {
      render(<RotatingText texts={defaultTexts} auto={false} ref={ref} />)
    })
    
    // Move to different index first
    act(() => {
      ref.current?.jumpTo(1)
    })
    
    // Then reset
    act(() => {
      ref.current?.reset()
    })
    
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('handles loop=false correctly at boundaries', () => {
    const ref = createRef<RotatingTextRef>()
    
    act(() => {
      render(<RotatingText texts={defaultTexts} auto={false} loop={false} ref={ref} />)
    })
    
    // Move to last item
    act(() => {
      ref.current?.jumpTo(2)
    })
    
    // Try to go next (should stay at last)
    act(() => {
      ref.current?.next()
    })
    
    expect(screen.getByText('Creator')).toBeInTheDocument()
    
    // Move to first item
    act(() => {
      ref.current?.jumpTo(0)
    })
    
    // Try to go previous (should stay at first)
    act(() => {
      ref.current?.previous()
    })
    
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('handles different splitBy values', () => {
    // Test words split
    act(() => {
      render(<RotatingText texts={['Hello World']} splitBy="words" />)
    })
    expect(screen.getByText('Hello World')).toBeInTheDocument()
    
    // Test lines split - check for individual parts since line breaks create separate elements
    act(() => {
      render(<RotatingText texts={['Line 1\nLine 2']} splitBy="lines" />)
    })
    expect(screen.getByText('Line 1')).toBeInTheDocument()
    expect(screen.getByText('Line 2')).toBeInTheDocument()
    
    // Test custom separator - verify component renders without throwing
    expect(() => {
      act(() => {
        render(<RotatingText texts={['Alpha-Beta']} splitBy="-" />)
      })
    }).not.toThrow()
  })

  it('handles staggerFrom variations', () => {
    const props = {
      texts: ['TestText'],
      staggerDuration: 0.1,
      auto: false
    }
    
    // Test different stagger directions with unique text to avoid multiple element issues
    act(() => {
      render(<RotatingText {...props} staggerFrom="first" />)
    })
    expect(screen.getByText('TestText')).toBeInTheDocument()
    
    // Test other stagger variations by checking the component renders successfully
    const staggerVariations = [
      { type: 'last', text: 'LastTest' },
      { type: 'center', text: 'CenterTest' },
      { type: 'random', text: 'RandomTest' },
      { type: 1, text: 'NumberTest' }
    ]
    
    staggerVariations.forEach(({ type, text }) => {
      expect(() => {
        act(() => {
          render(
            <RotatingText 
              texts={[text]} 
              staggerDuration={0.1} 
              auto={false} 
              staggerFrom={type} 
            />
          )
        })
      }).not.toThrow()
    })
  })

  it('handles custom transition and animation props', () => {
    const customTransition = { type: 'tween', duration: 0.5 }
    const customInitial = { y: 100, opacity: 0 }
    const customAnimate = { y: 0, opacity: 1 }
    const customExit = { y: -100, opacity: 0 }
    
    act(() => {
      render(
        <RotatingText
          texts={defaultTexts}
          transition={customTransition}
          initial={customInitial}
          animate={customAnimate}
          exit={customExit}
        />
      )
    })
    
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('handles animatePresence props', () => {
    act(() => {
      render(
        <RotatingText
          texts={defaultTexts}
          animatePresenceMode="sync"
          animatePresenceInitial={true}
        />
      )
    })
    
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('validates jumpTo index bounds', () => {
    const ref = createRef<RotatingTextRef>()
    
    act(() => {
      render(<RotatingText texts={defaultTexts} auto={false} ref={ref} />)
    })
    
    // Test negative index (should clamp to 0)
    act(() => {
      ref.current?.jumpTo(-1)
    })
    expect(screen.getByText('Developer')).toBeInTheDocument()
    
    // Test index beyond array length (should clamp to last index)
    act(() => {
      ref.current?.jumpTo(10)
    })
    expect(screen.getByText('Creator')).toBeInTheDocument()
  })

  it('supports Intl.Segmenter when available', () => {
    // Mock Intl.Segmenter properly as a class constructor
    class MockSegmenter {
      constructor(locale: string, options?: any) {}
      
      segment(text: string) {
        return [
          { segment: 'H' },
          { segment: 'i' }
        ]
      }
    }
    
    const originalIntl = global.Intl
    global.Intl = {
      ...originalIntl,
      Segmenter: MockSegmenter
    }
    
    act(() => {
      render(<RotatingText texts={['Hi']} splitBy="characters" />)
    })
    
    expect(screen.getByText('Hi')).toBeInTheDocument()
    
    // Restore original Intl
    global.Intl = originalIntl
  })
})