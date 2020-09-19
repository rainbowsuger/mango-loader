import { StringAny, CellConfig } from './typing';

export const dealState = (lex: any, pageConfig: CellConfig) => {
  const { name, model = null, sourceType = null, source = [], spaceName } = pageConfig;
  if (name) {
    lex.spaceName = spaceName || 'Lemon';
    lex.addState(name, model);
    if (source) {
      lex.addState(`${name}_source`, sourceType === 'changeless' ? source : null);
      if (sourceType === 'require') {
        const { method, url, params = () => ({}), data = () => ({}), fass = null } = source;
        lex.addMutation(`mt_${name}_source`, (_state: StringAny, payload: any) => {
          _state[`${name}_source`] = payload;
        });

        lex.addAction(`ac_${name}_source`, ({ commit }: any) => {
          const _window: any = window;
          _window.$swaggerApi.$request({
            url: url,
            method: method,
            params: {...params()},
            data: {...data()},
            useResNestedFormat: true
          }).then((res: any) => {
            commit(`mt_${name}_source`, fass ? fass(res) : res);
          });
        });
      }
    }
  };

  if (pageConfig.children) {
    (pageConfig.children || []).forEach((item: CellConfig) => {
      dealState(lex, item);
    });
  }
};

export const dealOperate = (lex: any, pageConfig: CellConfig) => {
  const { operate } = pageConfig;
  if (operate) {
    const { name = '', type, action, field = [] } = operate;
    if (type === 'reset') {
      console.log('field', field);
      lex.addState(`${name}_field`, field);
      lex.addMutation(`${name}`, (_state: StringAny, payload: any[]) => {
        payload.forEach(item => {
          _state[`${item.name}`] = item.model || null;
        });
      });
    } else if (type === 'submit') {
      const { method, url, params = () => ({}), data = () => ({}), fass = null } = action;
      lex.addAction(`ac_${name}_submit`, () => {
        const _window: any = window;
        _window.$swaggerApi.$request({
          url: url,
          method: method,
          params: {...params()},
          data: {...data()},
          useResNestedFormat: true
        }).then((res: any) => {
          return fass ? fass(res) : res;
        });
      });
    }
  }

  if (pageConfig.children) {
    (pageConfig.children || []).forEach((item: CellConfig) => {
      dealOperate(lex, item);
    });
  }
};
