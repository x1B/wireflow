import {
  ViewportMoved,
  ViewportMeasured,
  ChangeMode,
  HandleFocusLost,
  HandleFocusReceived
} from './settings-actions';


class SettingsStore {

  constructor( dispatcher, settings ) {
    this.dispatcher = dispatcher;
    this.settings = settings;

    dispatcher.register( ViewportMoved, act => {
      const viewport = this.settings.viewport
        .set( 'left', act.left )
        .set( 'top', act.top );
      this.settings = this.settings.set( 'viewport', viewport );
    } );

    dispatcher.register( ViewportMeasured, ({ width, height, by }) => {

      const viewport = this.settings.viewport
        .set( 'width', width )
        .set( 'height', height )
        .set( 'movedBy', by );

      this.settings = this.settings.set( 'viewport', viewport );
    } );

    dispatcher.register( ChangeMode, act => {
      this.settings = this.settings.set( 'mode', act.mode );
    } );

    dispatcher.register( HandleFocusReceived, act => {
      this.settings = this.settings.set( 'hasFocus', true );
    } );

    dispatcher.register( HandleFocusLost, act => {
      this.settings = this.settings.set( 'hasFocus', false );
    } );

  }

}

export default SettingsStore;
