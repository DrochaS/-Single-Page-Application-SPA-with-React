import React, { useState } from 'react'
import ProjectForm from './components/ProjectForm'
import ProjectList from './components/ProjectList'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  const [projects, setProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // Add new project
  const addProject = (project) => {
    setProjects([...projects, { ...project, id: Date.now() }])
  }

  // Delete project
  const deleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id))
  }

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app">
      <header className="header">
        <h1>Personal Project Showcase App</h1>
      </header>
      
      <main className="container">
        <ProjectForm onAddProject={addProject} />
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ProjectList 
          projects={filteredProjects} 
          onDeleteProject={deleteProject}
        />
      </main>
    </div>
  )
}

export default App