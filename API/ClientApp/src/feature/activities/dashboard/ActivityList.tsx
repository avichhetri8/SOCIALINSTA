import { observer } from 'mobx-react-lite';
import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { ActivityListItem } from './ActivityListItem';


export const ActivityList = observer(() => {
    const { activityStore } = useStore();
    const { activitiesByDate : activities} = activityStore;

   
    const DisplayList = () => {
        return (
            <>
                {activities.map(activity =>
                    <ActivityListItem key={activity.id} activity={activity} />
                )}
            </>
        )
    }
    return (
        <Segment>
            <Item.Group divided>
                <DisplayList />
            </Item.Group>
        </Segment>
    )
})