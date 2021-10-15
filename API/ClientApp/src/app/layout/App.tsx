import React, { useEffect, useState } from 'react';
import { Button, Container, Header, List } from 'semantic-ui-react';
import { NavBar } from './NavBar';
import { ActivityDashboard } from '../../feature/activities/dashboard/ActivityDashboard';
import { Loading } from './Loading';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


const  App = () => {
    const { activityStore } = useStore();
    
    useEffect(() => {
        const fetchData = async () => {
            activityStore.loadActivities();
        }
        fetchData();
    }, [activityStore])

    
   
    if (activityStore.loadingInitial) return <Loading content='Loading app' />

    return (
        <>
            <NavBar />
            <Container style={{ marginTop: '5em' }}>
               
                {activityStore.activities.length > 0 &&
                    <ActivityDashboard />
                }
                {console.log(activityStore)}

            </Container>
        </>
    );
}

export default observer(App);