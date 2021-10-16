import { observer } from 'mobx-react-lite';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export const NavBar = observer(() => {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header as={NavLink} to="/" exact>
                    <img src='assets/logo.png' alt="logo" />

                    SocialInsta 
                </Menu.Item>
                <Menu.Item as={NavLink} to="/activities" name='Activities'>
                </Menu.Item>
                <Menu.Item >
                    <Button positive content='Create Activity' as={NavLink} to="/createactivity" />
                </Menu.Item>
            </Container>
        </Menu>
    )

})