import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';

interface Props {
    activity: IActivity | undefined;
    createOrEdit: (activity: IActivity) => void;
}

export const ActivityForm = () =>{

    const initialState = {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);


    return (
        <Segment clearing>
            <Form autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title'  />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' />
                <Form.Input placeholder='Category' value={activity.category} name='category' />
                <Form.Input placeholder='Date' value={activity.date} name='date' />
                <Form.Input placeholder='City' value={activity.city} name='city' />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button  floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}