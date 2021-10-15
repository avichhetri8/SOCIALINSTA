﻿import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';


interface Props {
    activities: IActivity[];
    selectActivity: (id: string) => void;

}

export const ActivityList = ({ activities, selectActivity }: Props) =>  {

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
                                <Button floated='right' color='blue' onClick={()=>selectActivity(activity.id)}>Action</Button>
                                <Label basic content={activity.category}></Label>
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