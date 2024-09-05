import React, { useEffect, useState } from 'react'
import AdminCreateService from './AdminCreateService'
import AdminServiceCard from './AdminServiceCard'

const AdminServices = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"
    const [service, setService] = useState([])
    const [createService, setCreateService] = useState(false)

    useEffect(() => {
        getServices()
    }, [])

    const getServices = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/services/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const jsonData = await response.json()
            if(response.ok) {
                setService(jsonData)
            }
            else {
                console.log(jsonData.detail)
            }
        } catch (err) {
            console.error(err.message)
        }
    }
    const makeNewService = () => {
        setCreateService(!createService)
    }
    const newServiceAdded = (newService) => {
        setService([...service, newService])
    }
    const updateService = (editedService) => {
        // keep all services, just replace edited service
        setService(service.map(service => service.id_service === editedService.id_service ? editedService : service))
    }
    return (
        <div>
            {createService ? 
            <button onClick={makeNewService}>Cancel</button> :
            <button onClick={makeNewService}>Add Service</button> 
            }
            
            {createService && 
            <AdminCreateService newServiceAdded={newServiceAdded}/>}
            <div className="admin-services-all">
                {service.map((item) => (
                    <div key={item.id_service}>
                        <AdminServiceCard service={item} updateAllServices ={updateService} />
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminServices