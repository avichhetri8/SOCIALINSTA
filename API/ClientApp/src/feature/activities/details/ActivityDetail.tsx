import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { Loading } from '../../../app/layout/Loading';
import { IActivity } from '../../../app/models/Activity'
import { useStore } from '../../../app/stores/store';


export const ActivityDetail = () => {

    const { activityStore } = useStore();
    const { openForm, cancelSelectedActivity, selectedActivity: activity } = activityStore;

    if (!activity) return <Loading />;

    return (
        <Card>
            <Image src={`/assets/categoryImages/${activity}`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit' />
                    <Button onClick={() => cancelSelectedActivity()} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}