import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import { IActivity } from '../models/Activity';
import { NavBar } from './NavBar';

function App() {
    const [activities, setActivities] = useState<IActivity[]>([]);

    useEffect(() => {
        axios.get<IActivity[]>('/api/activities').then((response) => {
            console.log(response);
            setActivities(response.data);
        })
    }, [])

    return (
        <div>
            <NavBar/>
            
            <List>
                {activities.map((activity) => (
                    <List.Item key={activity.id}>
                        {activity.title}
                    </List.Item>
                ))}
            </List>

        </div>
    );
}

export default App;