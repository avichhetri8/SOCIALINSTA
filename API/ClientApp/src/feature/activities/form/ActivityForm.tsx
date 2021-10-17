import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Loading } from '../../../app/layout/Loading';
import { Formik } from 'formik';

export const ActivityForm = observer(() => {
    const history = useHistory();
    const { activityStore } = useStore();
    const { loadActivity, createActivity, updateActivity, loading, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);


    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    if (loadingInitial) return <Loading content='Loading activity...' />

    return (
        <Segment clearing>
            <Formik enableReinitialize initialValues={activity} onSubmit={data => console.log(data)}>
                {({ values : activity, handleChange, handleSubmit }) => {
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleChange} />
                        <Form.TextArea placeholder='Description' value={activity.description} onChange={handleChange} name='description' />
                        <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleChange} />
                        <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleChange} />
                        <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleChange} />
                        <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleChange} />
                        <Button loading={loading} floated='right' positive type='submit' content='Submit' />

                        <Button loading={loading} as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                }}
            </Formik>
        </Segment>
    )
}
)