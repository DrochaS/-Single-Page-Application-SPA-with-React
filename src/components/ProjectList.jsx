import React from 'react'
import ProjectItem from './ProjectItem'
import './ProjectList.css'

const ProjectList = ({ projects, onDeleteProject }) => {
  if (projects.length === 0) {
    return (
      <div className="project-list-empty" data-testid="empty-state">
        <p>No projects found</p>
      </div>
    )
  }

  return (
    <div className="project-list-container" data-testid="project-list">
      <h2>Projects ({projects.length})</h2>
      <div className="project-grid">
        {projects.map(project => (
          <ProjectItem 
            key={project.id} 
            project={project} 
            onDelete={onDeleteProject}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectList