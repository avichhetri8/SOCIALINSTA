import React from 'react';
import { Button, Container, Header, List } from 'semantic-ui-react';
import { NavBar } from './NavBar';
import { ActivityDashboard } from '../../feature/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import { HomePage } from '../../feature/home/HomePage';
import { ActivityForm } from '../../feature/activities/form/ActivityForm';
import { ActivityDetail } from '../../feature/activities/details/ActivityDetail';


const App = () => {
    const location = useLocation();

    return (
        <>
            <Route exact path='/' component={HomePage} />
            <Route
                path={'/(.+)'}
                render={() => (

                    <>
                        <NavBar />
                        <Container style={{ marginTop: '5em' }}>
                            <Route exact path="/activities/" component={ActivityDashboard} />
                            <Route path="/activities/:id" component={ActivityDetail} />
                            <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />

                        </Container>
                    </>
                )}
            />
        </>
    );
}

export default observer(App);