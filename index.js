import ScreenBaseModule from '../tatty-screen-base-module/index';

export default class PrinterModule extends ScreenBaseModule {

    /**
     * @constructs
     * @param name {String} the module id
     */
    constructor( name='printerModule', el ) {
        this.name = name;
    }

    /**
     * Early initialise module
     *
     * @param self {ScreenBaseModule} Screen will call init in its own scope but pass the module scope to it
     */
    init( self ) {

        this.on( 'ready', function() {

        }, this );
    }


    /**
     * Exposed API
     *
     * @param self {ScreenBaseModule} a reference to self
     */
    expose( self ) {
        return {
            
        }
    }
}
