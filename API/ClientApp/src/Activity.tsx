import React, { useEffect, useState } from 'react';
import axios from 'axios';


export const Activity = () => {
    const [activities, setActivities] = useState([] as any);


    useEffect(() => {
        axios.get('/api/activities').then(response => {
            setActivities(response.data)
        })
    }, [])


    return (

        <div >
            <ul>{activities.map((activity: any) => {
                <li key={activity.id} > {activity.title}</li>
                console.log(activity)
            })}</ul>
        </div>
    );

}