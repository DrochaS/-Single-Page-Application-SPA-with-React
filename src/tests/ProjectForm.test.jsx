import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectForm from '../components/ProjectForm'

describe('ProjectForm Component', () => {
  const mockAddProject = jest.fn()

  beforeEach(() => {
    mockAddProject.mockClear()
  })

  test('renders form with title and description inputs', () => {
    render(<ProjectForm onAddProject={mockAddProject} />)
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByTestId('add-project-button')).toBeInTheDocument()
  })

  test('validates required fields', async () => {
    const user = userEvent.setup()
    render(<ProjectForm onAddProject={mockAddProject} />)
    
    await user.click(screen.getByTestId('add-project-button'))
    
    expect(screen.getByText('Title is required')).toBeInTheDocument()
    expect(screen.getByText('Description is required')).toBeInTheDocument()
    expect(mockAddProject).not.toHaveBeenCalled()
  })

  test('adds project when form is valid', async () => {
    const user = userEvent.setup()
    render(<ProjectForm onAddProject={mockAddProject} />)
    
    await user.type(screen.getByTestId('project-title-input'), 'Test Project')
    await user.type(screen.getByTestId('project-description-input'), 'Test Description')
    await user.click(screen.getByTestId('add-project-button'))
    
    expect(mockAddProject).toHaveBeenCalledWith({
      title: 'Test Project',
      description: 'Test Description'
    })
  })

  test('clears form after submission', async () => {
    const user = userEvent.setup()
    render(<ProjectForm onAddProject={mockAddProject} />)
    
    const titleInput = screen.getByTestId('project-title-input')
    const descInput = screen.getByTestId('project-description-input')
    
    await user.type(titleInput, 'Test Project')
    await user.type(descInput, 'Test Description')
    await user.click(screen.getByTestId('add-project-button'))
    
    expect(titleInput.value).toBe('')
    expect(descInput.value).toBe('')
  })
})