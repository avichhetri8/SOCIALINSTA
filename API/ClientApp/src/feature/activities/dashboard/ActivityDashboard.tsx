import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import { ActivityDetail } from '../details/ActivityDetail';
import { ActivityForm } from '../form/ActivityForm';
import { ActivityList } from './ActivityList';

interface Props {
    activities: IActivity[];
    selectedActivity: IActivity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
}

export const ActivityDashboard = ({ activities, selectedActivity, selectActivity, cancelSelectActivity }: Props) => {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} />
            </Grid.Column>

            <Grid.Column width='6'>
                {selectedActivity &&
                    <>
                    <ActivityDetail activity={selectedActivity} cancelSelectActivity={cancelSelectActivity}/>
                        <ActivityForm />
                    </>
                }
            </Grid.Column>

        </Grid>
    )
}