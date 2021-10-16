import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { ActivityList } from './ActivityList';
import { observer } from 'mobx-react-lite';
import { Loading } from '../../../app/layout/Loading';
import { ActivityFilters } from './ActivityFilters';


export const ActivityDashboard = observer(() => {

    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;

    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities])

    
    if (activityStore.loadingInitial) return <Loading content='Loading app' />


    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>

            <Grid.Column width='6'>
                <ActivityFilters/>
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