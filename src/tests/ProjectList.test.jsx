import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectList from '../components/ProjectList'

describe('ProjectList Component', () => {
  const mockProjects = [
    { id: 1, title: 'Project 1', description: 'Description 1' },
    { id: 2, title: 'Project 2', description: 'Description 2' }
  ]
  const mockDeleteProject = jest.fn()

  beforeEach(() => {
    mockDeleteProject.mockClear()
  })

  test('shows empty state when no projects', () => {
    render(<ProjectList projects={[]} onDeleteProject={mockDeleteProject} />)
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    expect(screen.getByText('No projects found')).toBeInTheDocument()
  })

  test('renders list of projects', () => {
    render(<ProjectList projects={mockProjects} onDeleteProject={mockDeleteProject} />)
    
    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('Project 2')).toBeInTheDocument()
    expect(screen.getByText('Description 1')).toBeInTheDocument()
    expect(screen.getByText('Description 2')).toBeInTheDocument()
  })

  test('shows correct project count', () => {
    render(<ProjectList projects={mockProjects} onDeleteProject={mockDeleteProject} />)
    
    expect(screen.getByText('Projects (2)')).toBeInTheDocument()
  })

  test('calls delete function when delete button is clicked', async () => {
    const user = userEvent.setup()
    render(<ProjectList projects={mockProjects} onDeleteProject={mockDeleteProject} />)
    
    const deleteButtons = screen.getAllByTestId(/delete-project-/)
    await user.click(deleteButtons[0])
    
    expect(mockDeleteProject).toHaveBeenCalledWith(1)
  })
})