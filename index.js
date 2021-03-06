import ScreenBaseModule from '../tatty-screen-base-module/index';

/**
 * Printer module is a simple mixin that justs add a method to allow delayed printing i.e. one character at a time. Will emit an event when the printing has finished.
 *
 * @extends ScreenBaseModule
 *
 * @events
 *   print:char <{Char},{Integer}> called with each print, passing the char printed and the index of its position within the whole string
 *   print:complete <> called when the whole string has been printed
 */
export default class PrinterModule extends ScreenBaseModule {

    /**
     * @constructs
     * @param name {String} the module id
     */
    constructor( name='printerModule' ) {
        this.name = name;
    }

    /**
     * Early initialise module
     *
     * @param self {ScreenBaseModule} Screen will call init in its own scope but pass the module scope to it
     */
    init( self ) {
        Object.assign( this.defaults, {
            printDelay: 100
        });
    }

    /**
     * Exposed API
     *
     * @param self {ScreenBaseModule} a reference to self
     */
    expose( self ) {
        return {
            /**
             * Prints one character at a time
             *
             * @param chars {String} the string to print out
             */
            print: function( chars ) {
                let index = 0;

                var printNext = function() {
                    var char = chars.slice( index, index + 1 );
                    this.emit( 'print:char', char, index );
                    this.write( char );
                    index++;

                    // Print the next character if there is one
                    if ( index <= chars.length ) {
                        setTimeout( printNext, this.opts.printDelay );
                        return;
                    }

                    // Fire an event and halt the loop
                    this.emit( 'print:complete' );
                }.bind( this );

                printNext();
            }
        }
    }
}
