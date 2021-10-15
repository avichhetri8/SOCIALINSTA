import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { IActivity } from '../models/Activity';

export default class ActivityStore {
    activities: IActivity[] = [];
    selectedActivity: IActivity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            console.log("asd", activities)
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activities.push(activity)
            })

            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            })

        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

}