import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react'
import { Loading } from '../../../app/layout/Loading';
import { useStore } from '../../../app/stores/store';
import { ActivityDetailChat } from './ActivityDetailChat';
import { ActivityDetailHeader } from './ActivityDetailHeader';
import { ActivityDetailInfo } from './ActivityDetailInfo';
import { ActivityDetailSidebar } from './ActivityDetailSidebar';


export const ActivityDetail = observer(() => {

    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);


    if (loadingInitial || !activity) return <Loading />;


    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailHeader activity={activity} />
                <ActivityDetailInfo activity={activity}/>
                <ActivityDetailChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailSidebar />
            </Grid.Column>
        </Grid>
    )
})