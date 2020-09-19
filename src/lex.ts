import { StringAny, StringFunc } from './typing';

interface LexOption {
  state?: StringAny;
  mutations?: StringFunc;
  actions?: StringFunc;
  getters?: StringFunc;
  spaceName?: string;
}

export default class Lex {
  state: any
  mutations: any
  actions: any
  getters: any
  spaceName: string

  constructor(options: LexOption = {}) {
    this.state = options.state || {};
    this.mutations = options.mutations || {};
    this.actions = options.actions || {};
    this.getters = options.getters || {};
    this.spaceName = options.spaceName || 'Lemon';
  }

  addState(key: string, value: any) {
    if (Object.keys(this.state).includes(key)) {
      throw new Error(`Lemon state '${key}' existed`);
    }
    this.state[key] = value;
  }

  addMutation(key: string, func: Function) {
    if (Object.keys(this.mutations).includes(key)) {
      throw new Error(`Lemon mutation '${key}' existed`);
    }
    this.mutations[key] = func;
  }

  addAction(key: string, func: Function) {
    if (Object.keys(this.actions).includes(key)) {
      throw new Error(`Lemon action '${key}' existed`);
    }
    this.actions[key] = func;
  }

  addGetter(key: string, func: Function) {
    if (Object.keys(this.getters).includes(key)) {
      throw new Error(`Lemon getter '${key}' existed`);
    }
    this.getters[key] = func;
  }

  get allOptions () {
    const { state, mutations, actions, getters } = this;
    return {
      state,
      mutations,
      actions,
      getters
    };
  }
};
