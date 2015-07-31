const { jasmine } = window;

class DispatcherMock {
  constructor() {
    this.dispatch = jasmine.createSpy( 'dispatch' );
    this.register = jasmine.createSpy( 'register' );
  }
}

export default DispatcherMock;
