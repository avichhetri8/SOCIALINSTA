import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { IActivity } from '../models/Activity';
import { NavBar } from './NavBar';
import { ActivityDashboard } from '../../feature/activities/dashboard/ActivityDashboard';

const App = () => {
    const [activities, setActivities] = useState<IActivity[]>([]);

   

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/activities').then((response) => {
                /* DO STUFF WHEN THE CALLS SUCCEEDS */
                setActivities(response.data);
            }).catch((e) => {
                /* HANDLE THE ERROR (e) */
            });
        }
        fetchData();
    }, [])

    return (
        <>
            <NavBar />
            <Container style={{ 'margin-top': '5em' }}>
                {activities.length > 0 &&
                    <ActivityDashboard activities={activities} />
                }
                
            </Container>
        </>
    );
}

export default App;