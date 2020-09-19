
import Vue from 'vue';
import Lex from './lex';
import './index.lemon';
import { mapState, mapMutations, mapActions } from 'vuex';
import { CellConfig } from './typing';
import { dealState, dealOperate } from './cell';
const id = Math.random().toString(36).substr(2).replace(/\d/g, '');
const lex = new Lex();

export default (pageConfig: CellConfig) => {
  dealState(lex, pageConfig);
  dealOperate(lex, pageConfig);
  const spaceName = pageConfig.spaceName || 'Lemon';
  const actions = Object.keys(lex.actions || {});
  const mutations = Object.keys(lex.mutations || {});
  const states = Object.keys(lex.state || {});
  let vm: any = null;
  return Vue.component(`lemon-page-${id}`, {
    name: id,
    beforeCreate() {
      vm = this;
      this.$store.registerModule(spaceName, {
        ...lex.allOptions,
        namespaced: true
      });
    },

    created() {
      vm.$watch(`$store.state.${spaceName}`, {
        handler: function (val: any, old: any) {
          console.log(val, 'lex has changed');
          console.log(old, 'lex has changed');
        },
        deep: true
      });
    },
    computed: {
      ...mapState(spaceName, states)
    },
    methods: {
      ...mapMutations(spaceName, mutations),
      ...mapActions(spaceName, actions),
      reRender() {
        (this as any).$options.render();
      }
    },
    render: function (h: Function) {
      return h('div', [
        h('th-select', {
          props: {
            value: this.data2
          }
        }, this.data2_srouce.map((item: any) => {
          return h('th-option', {
            props: {
              label: item,
              value: item
            }
          })
        })),
        h('th-button', {
          props: {
            type: 'warning'
          },
          on: {
            click: () => {
              this.operate(this.operate_field || []);
            }
          }
        }, '重置'),
        h('th-button', {
          props: {
            type: 'success'
          },
          on: {
            click: () => {
              this.ac_operate_submit();
            }
          }
        }, '提交'),
        h('th-button', {
          props: {
            type: 'primary'
          },
          on: {
            click: () => {
              this.ac_data3_source();
            }
          }
        }, '查询'),
        h('div', `重置data2_source:'  ${this.data2_source}  / '重置data1:' ${this.data1} / 查询结果：${this.data3_source}`)
      ]);
    }
  });
};
