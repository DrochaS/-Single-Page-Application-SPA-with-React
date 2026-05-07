import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Search from '../components/Search'

describe('Search', () => {
  test('calls onSearchChange when input changes', () => {
    const mockOnSearchChange = vi.fn()
    render(<Search searchTerm="" onSearchChange={mockOnSearchChange} />)

    const input = screen.getByPlaceholderText('Type a name to search...')
    fireEvent.change(input, { target: { value: 'Aloe' } })

    expect(mockOnSearchChange).toHaveBeenCalledWith('Aloe')
  })
})
