import React from 'react'
import './ProjectItem.css'

const ProjectItem = ({ project, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      onDelete(project.id)
    }
  }

  return (
    <div className="project-card" data-testid={`project-${project.id}`}>
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>
      <button 
        onClick={handleDelete}
        className="btn-delete"
        aria-label={`Delete ${project.title}`}
        data-testid={`delete-project-${project.id}`}
      >
        Delete
      </button>
    </div>
  )
}

export default ProjectItem