import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import NewPlantForm from '../components/NewPlantForm'

describe('NewPlantForm', () => {
  test('submits the form and calls onAddPlant', async () => {
    const mockOnAddPlant = vi.fn()
    global.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ id: '3', name: 'Pothos', image: 'pothos.jpg', price: 15 })
    })

    render(<NewPlantForm onAddPlant={mockOnAddPlant} />)

    fireEvent.change(screen.getByPlaceholderText('Plant name'), { target: { value: 'Pothos' } })
    fireEvent.change(screen.getByPlaceholderText('Image URL'), { target: { value: 'pothos.jpg' } })
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: '15' } })
    fireEvent.click(screen.getByText('Add Plant'))

    await vi.waitFor(() => {
      expect(mockOnAddPlant).toHaveBeenCalledWith({ id: '3', name: 'Pothos', image: 'pothos.jpg', price: 15 })
    })
  })
})
