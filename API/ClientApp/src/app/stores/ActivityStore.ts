import { action, observable } from 'mobx';
import { makeObservable } from 'mobx';

export class ActivityStore{
    title = 'This is a Mobx state mgmt'

    constructor(){
        makeObservable(this, {
            title: observable,
            setitle: action
        })
    }

    setitle = () => {
        this.title += "!";
    }
}