import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';


interface Props {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export const ActivityList = ({ activities, selectActivity, deleteActivity }: Props) =>  {

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
                                <Button floated='right' color='red' onClick={() => deleteActivity(activity.id)}>Delete</Button>
                                <Button floated='right' color='blue' onClick={()=>selectActivity(activity.id)}>View</Button>
                                
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
}