import Emitter from "es6-event-emitter";

let EVENT_WINDOW_RESIZE = 'on.screen.resize';

export class WindowListener extends Emitter{
    constructor(){
        super();
        window.addEventListener('resize', function(){this.trigger(EVENT_WINDOW_RESIZE, window.innerWidth);}.bind(this));
    }
    onResize(callback){
        this.on(EVENT_WINDOW_RESIZE, callback);
    }
}