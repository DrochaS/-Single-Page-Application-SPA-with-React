import React, { useState, useEffect } from 'react'
import NewPlantForm from './components/NewPlantForm'
import PlantList from './components/PlantList'
import Search from './components/Search'
import './App.css'

/**
 * Main App component that manages the plant collection and search functionality.
 */
function App() {
  // State for storing the list of all plants
  const [plants, setPlants] = useState([])
  // State for storing the current search term entered by the user
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch all plants from the backend on initial component mount
  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(res => res.json())
      .then(data => setPlants(data))
      .catch(err => console.error("Error fetching plants:", err))
  }, [])

  /**
   * Adds a newly created plant to the state list.
   * @param {Object} newPlant - The plant object returned from the backend POST request.
   */
  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant])
  }

  // Filter the plants list based on the search term (case-insensitive)
  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app">
      <header className="header">
        <h1>Plantsy</h1>
      </header>
      
      <main className="container">
        {/* Form to add new plants to the collection */}
        <NewPlantForm onAddPlant={addPlant} />
        {/* Search component to filter the displayed plants */}
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        {/* List of filtered plants */}
        <PlantList plants={filteredPlants} />
      </main>
    </div>
  )
}

export default App
