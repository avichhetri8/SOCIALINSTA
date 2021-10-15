import { observable } from 'mobx';
import { makeObservable } from 'mobx';

export class ActivityStore{
    title = 'This is a Mobx state mgmt'

    constructor(){
        makeObservable(this, {
            title: observable
        })
    }
}