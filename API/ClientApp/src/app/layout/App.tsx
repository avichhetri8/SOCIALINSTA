import React, { useEffect, useState } from 'react';
import { Button, Container, Header, List } from 'semantic-ui-react';
import { NavBar } from './NavBar';
import { ActivityDashboard } from '../../feature/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import { HomePage } from '../../feature/home/HomePage';
import { ActivityForm } from '../../feature/activities/form/ActivityForm';
import { ActivityDetail } from '../../feature/activities/details/ActivityDetail';


const App = () => {

    return (
        <>
            <NavBar />
            <Container style={{ marginTop: '5em' }}>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/activities/" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetail} />
                <Route path={['/createActivity', '/manage/:id']} component={ActivityForm} />

            </Container>
        </>
    );
}

export default observer(App);