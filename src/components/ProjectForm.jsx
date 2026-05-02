import React, { useState } from 'react'
import './ProjectForm.css'

const ProjectForm = ({ onAddProject }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!title.trim()) {
      newErrors.title = 'Title is required'
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters'
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required'
    } else if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onAddProject({
        title: title.trim(),
        description: description.trim()
      })
      setTitle('')
      setDescription('')
      setErrors({})
    }
  }

  return (
    <div className="project-form-container">
      <h2>Add Project</h2>
      <form onSubmit={handleSubmit} className="project-form" data-testid="project-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            className={errors.title ? 'error' : ''}
            data-testid="project-title-input"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            rows="4"
            className={errors.description ? 'error' : ''}
            data-testid="project-description-input"
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <button type="submit" className="btn-add" data-testid="add-project-button">
          Add
        </button>
      </form>
    </div>
  )
}

export default ProjectForm