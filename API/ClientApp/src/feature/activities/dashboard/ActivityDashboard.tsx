import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';
import { ActivityDetail } from '../details/ActivityDetail';
import { ActivityForm } from '../form/ActivityForm';
import { ActivityList } from './ActivityList';
import { observer } from 'mobx-react-lite';

interface Props {
    activities: IActivity[];
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export const ActivityDashboard = observer(({
    activities,
    deleteActivity, submitting }: Props) => {

    const { activityStore } = useStore();
    const { editMode, selectedActivity, createActivity, updateActivity } = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                    activities={activities}
                    deleteActivity={deleteActivity}
                    submitting={submitting} />
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