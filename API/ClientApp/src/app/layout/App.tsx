import React, { useEffect, useState } from 'react';
import { Button, Container, Header, List } from 'semantic-ui-react';
import { IActivity } from '../models/Activity';
import { NavBar } from './NavBar';
import { ActivityDashboard } from '../../feature/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import { Loading } from './Loading';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


const  App = () => {
    const { activityStore } = useStore();

    const [activities, setActivities] = useState<IActivity[]>([]);
    const [submitting, setSubmitting] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            activityStore.loadActivities();
        }
        fetchData();
    }, [activityStore])

    
    const handleDeleteActivity= (id: string) => {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setSubmitting(false);
        })

    }


    if (activityStore.loadingInitial) return <Loading content='Loading app' />

    return (
        <>
            <NavBar />
            <Container style={{ marginTop: '5em' }}>
               
                {activityStore.activities.length > 0 &&
                    <ActivityDashboard
                        activities={activityStore.activities}
                        deleteActivity={handleDeleteActivity}
                        submitting={submitting}
                    />
                }
                {console.log(activityStore)}

            </Container>
        </>
    );
}

export default observer(App);