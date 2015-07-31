const { jasmine } = window;

class DispatcherMock {
  constructor() {

    // for tests (inspection):
    this.registrations = [];
    this.actionHandler = ( type ) => this.registrations
      .filter( ([ t, _ ]) => t === type )
      .map( ([ _, cb ]) => cb )[ 0 ];
    this.handleAction = ( action ) =>
      this.actionHandler( action.type() )( action );

    // dispatcher API (mock):
    this.dispatch = jasmine.createSpy( 'dispatch' );
    this.register = jasmine.createSpy( 'register' ).and
      .callFake( (action, callback) => {
        this.registrations.push([ action, callback ]);
      } );

  }
}

export default DispatcherMock;
