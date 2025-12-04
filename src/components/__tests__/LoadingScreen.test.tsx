import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoadingScreen from '../LoadingScreen';
import React from 'react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock child components
vi.mock('../ui/loader', () => ({
  LoaderFour: ({ text = "Loading..." }: { text?: string }) => <div data-testid="loader">{text}</div>,
}));

describe('LoadingScreen', () => {
  it('renders loading screen when isLoading is true', () => {
    render(<LoadingScreen isLoading={true} onLoadingComplete={() => {}} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('accepts onLoadingComplete prop', () => {
    const mockCallback = vi.fn();
    render(<LoadingScreen isLoading={true} onLoadingComplete={mockCallback} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});