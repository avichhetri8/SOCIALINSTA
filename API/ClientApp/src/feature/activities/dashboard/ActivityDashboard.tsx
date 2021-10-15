import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import ActivityList from './ActivityList';

interface Props {
    activities: IActivity[]
}

export default function ActivityDashboard({ activities}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} />
            </Grid.Column>
        </Grid>
    )
}