import Emitter from "es6-event-emitter";
import {WindowListener} from './index';

let EVENT_COLUMN_RESIZE = 'on.column.resize';
let EVENT_WIDTH_CHECK = 'on.width.check';
let EVENT_WIDTH_CHECKED = 'on.width.checked';


export class ColumnListener extends Emitter{
    constructor(){
        super();
        this.lastColumnSize = undefined;
        this.bootstrapBoundries = {
            768 : 'xs',
            992: 'sm',
            1200: 'md'
        };
        this.windowListener = new WindowListener();
        this.windowListener.onResize(this._onWindowResize);
    }

    _onWindowResize(){
        let width = this.CurrentColumnSize();
        this.trigger(EVENT_WIDTH_CHECK, width);

        if(this.lastColumnSize != width){
            this.lastColumnSize = width;
            this.trigger(EVENT_COLUMN_RESIZE, width);
        }

        this.trigger(EVENT_WIDTH_CHECKED, width)
    }

    CurrentColumnSize(){
        for(let i in this.bootstrapBoundries){
            if(window.innerWidth < i)
                return this.bootstrapBoundries[i];
        }
        return 'lg';
    }

    onWidthChange(callback){
        this.on(EVENT_COLUMN_RESIZE, callback);
    }
    onWidthCheck(callback){
        this.on(EVENT_WIDTH_CHECK, callback);
    }
    onWidthChecked(callback){
        this.on(EVENT_WIDTH_CHECKED, callback);
    }
}