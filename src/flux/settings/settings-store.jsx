import {
  ViewportMoved, ViewportMeasured, ChangeMode
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

    dispatcher.register( ViewportMeasured, act => {
      const viewport = this.settings.viewport
        .set( 'width', act.width )
        .set( 'height', act.height );
      this.settings = this.settings.set( 'viewport', viewport );
    } );

    dispatcher.register( ChangeMode, act => {
      this.settings = this.settings.set( 'mode', act.mode );
    } );
  }

}

export default SettingsStore;
