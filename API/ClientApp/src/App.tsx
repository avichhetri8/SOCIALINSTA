import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get('/api/activities').then((response) => {
            console.log(response);
            setActivities(response.data);
        })
    }, [])

    return (
        <div>
                {activities.map((activity: any) => (
                    <li key={activity.id}>
                        {activity.title}
                    </li>
                ))}
           
        </div>
    );
}

export default App;