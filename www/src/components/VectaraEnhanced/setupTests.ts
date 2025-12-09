// Jest setup file for @vectara/react-chatbot-search
import '@testing-library/jest-dom';

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
    readText: jest.fn(() => Promise.resolve(''))
  }
});

// Mock fetch
global.fetch = jest.fn();

// Suppress console errors during tests unless debugging
if (!process.env.DEBUG_TESTS) {
  console.error = jest.fn();
  console.warn = jest.fn();
}