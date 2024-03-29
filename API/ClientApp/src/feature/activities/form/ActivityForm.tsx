﻿import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, FormField, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Loading } from '../../../app/layout/Loading';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../../../app/common/form/MyTextInput';
import { MyTextArea } from '../../../app/common/form/MyTextArea';
import { MySelectInput } from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import { MyDateInput } from '../../../app/common/form/MyDateInput';
import { IActivity } from '../../../app/models/Activity';


export const ActivityForm = observer(() => {
    const history = useHistory();
    const { activityStore } = useStore();
    const { loadActivity, createActivity, updateActivity, loading, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: new Date(),
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);


    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })


    const handleFormSubmit = (activity : IActivity) => {
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
  /*
      const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = event.target;
          setActivity({ ...activity, [name]: value })
      }*/

    if (loadingInitial) return <Loading content='Loading activity...' />


    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}
            >
                {({ handleSubmit, isSubmitting, dirty, isValid }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

                        <MyTextInput placeholder='Title' name='title' />


                        <MyTextArea placeholder='Description' rows={3} name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />

                        <Button loading={loading} as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}
)