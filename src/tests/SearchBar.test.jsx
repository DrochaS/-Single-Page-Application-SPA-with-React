import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../components/SearchBar'

describe('SearchBar Component', () => {
  test('renders search input', () => {
    render(<SearchBar searchTerm="" onSearchChange={() => {}} />)
    
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/search by title or description/i)).toBeInTheDocument()
  })

  test('calls onSearchChange when typing', async () => {
    const mockSearchChange = jest.fn()
    const user = userEvent.setup()
    
    render(<SearchBar searchTerm="" onSearchChange={mockSearchChange} />)
    
    const input = screen.getByTestId('search-input')
    await user.type(input, 'test')
    
    expect(mockSearchChange).toHaveBeenCalledTimes(4)
    expect(mockSearchChange).toHaveBeenCalledWith('t')
  })

  test('displays the current search term', () => {
    render(<SearchBar searchTerm="react" onSearchChange={() => {}} />)
    
    const input = screen.getByTestId('search-input')
    expect(input.value).toBe('react')
  })
})