import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext';

const AdminCreateService = ({ newServiceAdded }) => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"
    const [token,] = useContext(UserContext)
    const [newService, setNewService] = useState({
        service_name: '',
        description: ''
    })

    const updateService = (event) => {
        setNewService({
            ...newService,
            [event.target.name]: event.target.value
        })
    }
    const addNewService = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(`${API_URL}/admin/services/create`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newService)
            })

            if (!response.ok) {
                const errorData = response.json();
                console.log(errorData.message);
            }
            else {
                newServiceAdded(newService)
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    // ne radi unos kad kucas
    return (
        <div>
            <form onSubmit={addNewService}>
                <label>Service Name</label>
                <input type="text" name='service_name' onChange={updateService} value={newService.service_name}/>
                <label>Service Description</label>
                <input type="text" name='description' onChange={updateService} value={newService.description}/>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default AdminCreateService