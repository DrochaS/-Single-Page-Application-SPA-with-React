import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import App from '../App'

// Mock fetch
global.fetch = vi.fn()

describe('App Integration Tests', () => {
  const mockPlants = [
    { id: '1', name: 'Aloe', image: 'aloe.jpg', price: 10 },
    { id: '2', name: 'Snake', image: 'snake.jpg', price: 20 }
  ]

  beforeEach(() => {
    fetch.mockReset()
  })

  test('fetches and displays plants on load', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockPlants)
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Aloe')).toBeInTheDocument()
      expect(screen.getByText('Snake')).toBeInTheDocument()
    })
  })

  test('filters plants by name', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockPlants)
    })

    render(<App />)

    await waitFor(() => screen.getByText('Aloe'))

    const searchInput = screen.getByPlaceholderText('Type a name to search...')
    fireEvent.change(searchInput, { target: { value: 'Aloe' } })

    expect(screen.getByText('Aloe')).toBeInTheDocument()
    expect(screen.queryByText('Snake')).not.toBeInTheDocument()
  })

  test('adds a new plant', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockPlants)
    })

    render(<App />)

    await waitFor(() => screen.getByText('Aloe'))

    const newPlant = { id: '3', name: 'Pothos', image: 'pothos.jpg', price: 15 }
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(newPlant)
    })

    fireEvent.change(screen.getByPlaceholderText('Plant name'), { target: { value: 'Pothos' } })
    fireEvent.change(screen.getByPlaceholderText('Image URL'), { target: { value: 'pothos.jpg' } })
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '15' } })
    fireEvent.click(screen.getByText('Add Plant'))

    await waitFor(() => {
      expect(screen.getByText('Pothos')).toBeInTheDocument()
    })
  })
})
