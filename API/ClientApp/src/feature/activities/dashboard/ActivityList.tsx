import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';


export const ActivityList = observer(() => {
    const [target, setTarget] = useState('');
    const { activityStore } = useStore();
    const { activitiesByDate : activities, selectActivity, deleteActivity, loading :submitting } = activityStore;

    const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }
    const DisplayList = () => {
        return (
            <>
                {activities.map(activity =>

                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                {activity.description}
                            </Item.Description>
                            <Item.Extra>
                                <Label basic content={activity.category}></Label>
                                <Button floated='right' color='red' loading={submitting && target === activity.id} name={activity.id} onClick={(e) => handleActivityDelete(e, activity.id)}>Delete</Button>
                                <Button floated='right' color='blue' onClick={() => selectActivity(activity.id)}>View</Button>
                                
                            </Item.Extra>
                        </Item.Content>
                    </Item>
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