import { Record } from 'immutable';

const Rendered = Record({
  what: null,
  duration: null,
  type: () => Rendered
});

export default {
  Rendered
};
