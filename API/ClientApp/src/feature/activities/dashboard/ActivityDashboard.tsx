import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import { ActivityDeatil } from '../details/ActivityDetail';
import { ActivityList } from './ActivityList';

interface Props {
    activities: IActivity[]
}

export const ActivityDashboard = ({ activities }: Props) => {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} />
            </Grid.Column>
            {activities &&
                <Grid.Column width='6'>
                    <ActivityDeatil activity={activities[1]} />
                </Grid.Column>
            }
        </Grid>
    )
}