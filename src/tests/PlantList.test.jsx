import { render, screen, fireEvent } from '@testing-library/react'
import PlantList from '../components/PlantList'

describe('PlantList', () => {
  const mockPlants = [
    { id: '1', name: 'Aloe', image: 'aloe.jpg', price: 10 },
    { id: '2', name: 'Snake', image: 'snake.jpg', price: 20 }
  ]

  test('renders a list of plants', () => {
    render(<PlantList plants={mockPlants} />)
    expect(screen.getByText('Aloe')).toBeInTheDocument()
    expect(screen.getByText('Snake')).toBeInTheDocument()
  })

  test('can toggle sold out status on a plant', () => {
    render(<PlantList plants={mockPlants} />)
    const stockButtons = screen.getAllByText('In Stock')
    fireEvent.click(stockButtons[0])
    expect(screen.getByText('Out of Stock')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Out of Stock'))
    expect(screen.getAllByText('In Stock').length).toBe(2)
  })
})
