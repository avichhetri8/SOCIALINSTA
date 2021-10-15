import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { IActivity } from '../models/Activity';
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
    activityRegistry = new Map<string, IActivity>();
    selectedActivity: IActivity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            console.log("asd", activities)
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activityRegistry.set(activity.id, activity);
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
        this.selectedActivity = this.activityRegistry.get(id);
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
            this.activityRegistry.set(activity.id, activity);
        } catch (error) {
            console.log(error)
        }
        this.setLoadingInitial(false)
    }

    updateActivity = async (activity: IActivity) => {
        this.setLoadingInitial(true)
        try {
            await agent.Activities.update(activity);
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
        } catch (error) {
            console.log(error)
        }
        this.setLoadingInitial(false)
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id)
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}