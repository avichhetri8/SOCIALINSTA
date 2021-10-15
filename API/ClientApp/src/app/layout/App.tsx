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
    const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            activityStore.loadActivities();
        }
        fetchData();
    }, [activityStore])

    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.find(x => x.id === id));
    }

    const cancleActivity = () => {
        setSelectedActivity(undefined);
    }

    const handleFormOpen = (id?: string) => {
        id ? handleSelectActivity(id) : cancleActivity();
        setEditMode(true);
    }

    const handleFormClose = () => {
        setEditMode(false);
    }

    const handleCreateOrEditActivity = (activity: IActivity) => {
        setSubmitting(true)
        if (activity.id) {
            agent.Activities.update(activity).then(response => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity])
                setSelectedActivity(activity);
                setEditMode(false)
                setSubmitting(false)
            })
        } else {
            agent.Activities.create(activity).then(response => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity])
                setSelectedActivity(activity);
                setEditMode(false)
                setSubmitting(false)
            })

        }
    }

   
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
            <NavBar openForm={handleFormOpen} />
            <Container style={{ marginTop: '5em' }}>
               
                {activityStore.activities.length > 0 &&
                    <ActivityDashboard
                        activities={activityStore.activities}
                        selectedActivity={selectedActivity}
                        selectActivity={handleSelectActivity}
                        cancelSelectActivity={cancleActivity}
                        editMode={editMode}
                        openForm={handleFormOpen}
                        closeForm={handleFormClose}
                        createOrEdit={handleCreateOrEditActivity}
                        deleteActivity={handleDeleteActivity}
                        submitting={submitting}
                    />
                }
                {console.log(activityStore.activities)}

            </Container>
        </>
    );
}

export default observer(App);