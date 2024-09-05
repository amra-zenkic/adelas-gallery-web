import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'

const AdminServiceCard = ({ service, updateAllServices }) => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"
    const [token, ] = useContext(UserContext)
    const [editingService, setEditingService] = useState(false)
    const [newService, setNewService] = useState(service) // when editing a service

    const editService = (service_id) => {
        setEditingService(!editingService)
    }

    const updateService = (event) => {
        setNewService({
            ...newService,
            [event.target.name]: event.target.value
        })
    }

    const handleChangeService = async (event) => {
        event.preventDefault()
        console.log(newService)
    
        try {
            const response = await fetch(`${API_URL}/admin/services/update/${service.id_service}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'accept': 'application/json'
                },
                body: JSON.stringify(newService)
            })

            if (!response.ok) {
                console.log("Failed to update service")
            }
            else {
                console.log("Service Updated")
                editService()
                updateAllServices(newService)
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {editingService ?
            <form onSubmit={handleChangeService}>
                <label>Service Name</label>
                <input type="text" name='service_name' onChange={updateService} value={newService.service_name}/>
                <label>Service Description</label>
                <input type="text" name='description' onChange={updateService} value={newService.description}/>
                <button type='submit'>Save Changes</button>
                <button onClick={editService}>Cancel</button>
            </form> :
            <div>
                <h1>{service.service_name}</h1>
                <p>{service.description}</p>

                <button onClick={editService}>Edit Service</button>
            </div>
            }
        </div>
    )
}

export default AdminServiceCard