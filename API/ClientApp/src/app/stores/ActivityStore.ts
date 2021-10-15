import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { IActivity } from '../models/Activity';
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    activities: IActivity[] = [];
    selectedActivity: IActivity | undefined = undefined;
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

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(x => x.id === id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }


    createActivity = async (activity: IActivity) => {
        this.setLoadingInitial(true)
        try {
            activity.id = uuid();
            await agent.Activities.create(activity);
            this.activities.push(activity);
        } catch (error) {
            console.log(error)
        }
        this.setLoadingInitial(false)
    }

    updateActivity = async (activity: IActivity) => {
        this.setLoadingInitial(true)
        try {
            await agent.Activities.update(activity);
            this.activities = [...this.activities.filter(x => x.id !== activity.id), activity]
            this.selectedActivity = activity;
            this.editMode = false;
        } catch (error) {
            console.log(error)
        }
        this.setLoadingInitial(false)
    }
}