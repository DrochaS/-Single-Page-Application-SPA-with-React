import React, { useState } from 'react'
import './NewPlantForm.css'

/**
 * Component for adding a new plant to the collection via a POST request.
 */
const NewPlantForm = ({ onAddPlant }) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')

  /**
   * Handles form submission: validates, sends POST request, and updates parent state.
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    const newPlant = {
      name,
      image,
      price: parseFloat(price)
    }

    fetch('http://localhost:6001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Standard lower-case header
      },
      body: JSON.stringify(newPlant)
    })
      .then(res => res.json())
      .then(addedPlant => {
        // Pass the added plant back to the parent component
        onAddPlant(addedPlant)
        // Reset form fields
        setName('')
        setImage('')
        setPrice('')
      })
      .catch(err => console.error("Error adding plant:", err))
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
          required
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  )
}

export default NewPlantForm
