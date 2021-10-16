import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { ActivityList } from './ActivityList';
import { observer } from 'mobx-react-lite';
import { Loading } from '../../../app/layout/Loading';


export const ActivityDashboard = observer(() => {

    const { activityStore } = useStore();
   
    useEffect(() => {
        const fetchData = async () => {
            activityStore.loadActivities();
        }
        fetchData();
    }, [activityStore])



    if (activityStore.loadingInitial) return <Loading content='Loading app' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>

            <Grid.Column width='6'>
               <h3>Activity Filter</h3>
            </Grid.Column>

            {/*<Grid.Column width='6'>*/}
            {/*    {selectedActivity &&*/}
            {/*        <>*/}
            {/*            <ActivityDetail />*/}
            {/*        </>*/}
            {/*    }*/}
            {/*    {editMode &&*/}
            {/*        <ActivityForm />*/}
            {/*    }*/}
            {/*</Grid.Column>*/}

        </Grid>
    )
})