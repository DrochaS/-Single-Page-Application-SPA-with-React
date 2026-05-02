import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App Integration Tests', () => {
  test('renders app with all components', () => {
    render(<App />)
    
    expect(screen.getByText('Personal Project Showcase App')).toBeInTheDocument()
    expect(screen.getByText('Add Project')).toBeInTheDocument()
    expect(screen.getByText('Search Projects')).toBeInTheDocument()
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
  })

  test('adds a new project successfully', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Add a project
    await user.type(screen.getByTestId('project-title-input'), 'My New Project')
    await user.type(screen.getByTestId('project-description-input'), 'This is a test project')
    await user.click(screen.getByTestId('add-project-button'))
    
    // Verify project appears
    expect(screen.getByText('My New Project')).toBeInTheDocument()
    expect(screen.getByText('This is a test project')).toBeInTheDocument()
  })

  test('filters projects based on search', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Add two projects
    await user.type(screen.getByTestId('project-title-input'), 'React Project')
    await user.type(screen.getByTestId('project-description-input'), 'Building with React')
    await user.click(screen.getByTestId('add-project-button'))
    
    await user.type(screen.getByTestId('project-title-input'), 'Vue Project')
    await user.type(screen.getByTestId('project-description-input'), 'Building with Vue')
    await user.click(screen.getByTestId('add-project-button'))
    
    // Search for React
    const searchInput = screen.getByTestId('search-input')
    await user.type(searchInput, 'React')
    
    expect(screen.getByText('React Project')).toBeInTheDocument()
    expect(screen.queryByText('Vue Project')).not.toBeInTheDocument()
  })

  test('deletes a project', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Add a project
    await user.type(screen.getByTestId('project-title-input'), 'Project to Delete')
    await user.type(screen.getByTestId('project-description-input'), 'Will be deleted')
    await user.click(screen.getByTestId('add-project-button'))
    
    expect(screen.getByText('Project to Delete')).toBeInTheDocument()
    
    // Delete the project
    const deleteButton = screen.getByTestId(/delete-project-/)
    await user.click(deleteButton)
    
    expect(screen.queryByText('Project to Delete')).not.toBeInTheDocument()
  })
})