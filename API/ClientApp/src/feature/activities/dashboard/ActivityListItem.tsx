import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import { useStore } from '../../../app/stores/store';

interface Props {
    activity: IActivity;
}

export const ActivityListItem = ({ activity }: Props) => {
    const [target, setTarget] = useState('');
    const { activityStore } = useStore();
    const { activitiesByDate: activities, deleteActivity, loading: submitting } = activityStore;

    const handleActivityDelete = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <>
            <Item key={activity.id}>
                <Item.Content>
                    <Item.Header as='a'>{activity.title}</Item.Header>
                    <Item.Meta>{activity.date}</Item.Meta>
                    <Item.Description>
                        {activity.description}
                    </Item.Description>
                    <Item.Extra>
                        <Label basic content={activity.category}></Label>
                        <Button floated='right' color='red'
                            loading={submitting && target === activity.id}
                            name={activity.id}
                            onClick={(e) => handleActivityDelete(e, activity.id)}
                        >Delete</Button>
                        <Button floated='right'
                            color='blue' as={Link} to={`/activities/${activity.id}`}
                        >View</Button>

                    </Item.Extra>
                </Item.Content>
            </Item>

        </>
    )
}