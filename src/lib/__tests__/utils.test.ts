import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn utility function', () => {
  it('combines class names correctly', () => {
    const result = cn('class1', 'class2', 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('handles conditional classes', () => {
    const condition = true
    const result = cn('base-class', condition && 'conditional-class')
    expect(result).toBe('base-class conditional-class')
  })

  it('filters out falsy values', () => {
    const result = cn('class1', false, null, undefined, '', 'class2')
    expect(result).toBe('class1 class2')
  })

  it('handles Tailwind class conflicts', () => {
    const result = cn('px-4', 'px-2') // Should merge and keep the last one
    expect(result).toBe('px-2')
  })

  it('works with arrays', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toBe('class1 class2 class3')
  })

  it('works with objects', () => {
    const result = cn({
      'active': true,
      'inactive': false,
      'hover': true
    })
    expect(result).toBe('active hover')
  })

  it('handles empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('handles complex Tailwind merging', () => {
    const result = cn('bg-red-500', 'bg-blue-500') // Should keep last background
    expect(result).toBe('bg-blue-500')
  })

  it('handles responsive classes', () => {
    const result = cn('text-sm', 'md:text-lg', 'lg:text-xl')
    expect(result).toBe('text-sm md:text-lg lg:text-xl')
  })

  it('handles hover and state variants', () => {
    const result = cn('text-black', 'hover:text-blue-500', 'focus:text-red-500')
    expect(result).toBe('text-black hover:text-blue-500 focus:text-red-500')
  })
})