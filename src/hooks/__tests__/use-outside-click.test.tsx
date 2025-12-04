import { renderHook } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useOutsideClick } from '../use-outside-click'
import React, { useRef } from 'react'

describe('useOutsideClick', () => {
  it('calls callback when clicking outside element', () => {
    const callback = vi.fn()
    const mockRef = { current: document.createElement('div') }
    
    // Add the element to document body so contains() works
    document.body.appendChild(mockRef.current)
    
    renderHook(() => useOutsideClick(mockRef, callback))
    
    // Click outside the element
    fireEvent.mouseDown(document.body)
    
    expect(callback).toHaveBeenCalledTimes(1)
    
    // Cleanup
    document.body.removeChild(mockRef.current)
  })

  it('does not call callback when clicking inside element', () => {
    const callback = vi.fn()
    const mockRef = { current: document.createElement('div') }
    
    document.body.appendChild(mockRef.current)
    
    renderHook(() => useOutsideClick(mockRef, callback))
    
    // Click inside the element
    fireEvent.mouseDown(mockRef.current)
    
    expect(callback).not.toHaveBeenCalled()
    
    // Cleanup
    document.body.removeChild(mockRef.current)
  })

  it('handles touch events', () => {
    const callback = vi.fn()
    const mockRef = { current: document.createElement('div') }
    
    document.body.appendChild(mockRef.current)
    
    renderHook(() => useOutsideClick(mockRef, callback))
    
    // Touch outside the element
    fireEvent.touchStart(document.body)
    
    expect(callback).toHaveBeenCalledTimes(1)
    
    // Cleanup
    document.body.removeChild(mockRef.current)
  })

  it('does not call callback when ref is null', () => {
    const callback = vi.fn()
    const mockRef = { current: null }
    
    renderHook(() => useOutsideClick(mockRef, callback))
    
    fireEvent.mouseDown(document.body)
    
    expect(callback).not.toHaveBeenCalled()
  })

  it('removes event listeners on unmount', () => {
    const callback = vi.fn()
    const mockRef = { current: document.createElement('div') }
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')
    
    const { unmount } = renderHook(() => useOutsideClick(mockRef, callback))
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(addEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))
    
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function))
    
    addEventListenerSpy.mockRestore()
    removeEventListenerSpy.mockRestore()
  })

  it('handles child element clicks correctly', () => {
    const callback = vi.fn()
    const mockRef = { current: document.createElement('div') }
    const childElement = document.createElement('span')
    
    mockRef.current.appendChild(childElement)
    document.body.appendChild(mockRef.current)
    
    renderHook(() => useOutsideClick(mockRef, callback))
    
    // Click on child element (should not trigger callback)
    fireEvent.mouseDown(childElement)
    
    expect(callback).not.toHaveBeenCalled()
    
    // Cleanup
    document.body.removeChild(mockRef.current)
  })
})