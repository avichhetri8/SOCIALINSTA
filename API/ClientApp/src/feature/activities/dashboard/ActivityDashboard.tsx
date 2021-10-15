import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';
import { ActivityDetail } from '../details/ActivityDetail';
import { ActivityForm } from '../form/ActivityForm';
import { ActivityList } from './ActivityList';
import { observer } from 'mobx-react-lite';


export const ActivityDashboard = observer(() => {

    const { activityStore } = useStore();
    const { editMode, selectedActivity, createActivity, updateActivity } = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>

            <Grid.Column width='6'>
                {selectedActivity &&
                    <>
                        <ActivityDetail />
                    </>
                }
                {editMode &&
                    <ActivityForm />
                }
            </Grid.Column>

        </Grid>
    )
})