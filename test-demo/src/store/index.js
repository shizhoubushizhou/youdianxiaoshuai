import { createStore } from "vuex";
import per from "vuex-persistedstate";

export default createStore({
  plugins: [per()],
  state: {
    tableData: [],
    newtableData: [],
    cardList: [],
    checked: false,
  },
  getters: {
    total(state) {
      return state.cardList
        .filter((item) => item.checked)
        .reduce((a, b) => {
          return a + b.price * b.num;
        }, 0);
    },
    length(state){
      return state.cardList.filter((item) => item.checked).reduce((a,b)=>{
        return a + b.num
      },0)
    }
  },
  mutations: {
    addmanage(state, val) {
      state.tableData.push({
        title: val,
        id: new Date().getTime(),
        children: [],
      });
      state.newtableData = state.tableData;
    },
    del(state, id) {
      const index = state.tableData.findIndex((item) => item.id === id);
      state.tableData.splice(index, 1);
      state.newtableData = state.tableData;
    },
    addgoods(state, item) {
      const index = state.tableData.findIndex((p) => p.title === item.name);
      // console.log(index);
      state.tableData[index].children.push({ ...item, num: 1 });
      state.newtableData = state.tableData;
    },
    onsearch(state, val) {
      console.log(val);
      if (val == "") {
        state.newtableData = state.tableData;
      } else {
        state.newtableData = state.tableData.filter(
          (item) => item.title === val
        );
      }
    },
    numChange(state, item) {
      // console.log(item);
      state.tableData = state.newtableData;
      // console.log(index,ind);
    },
    addcard(state, item) {
      // console.log(item);
      const index = state.cardList.findIndex((c) => c.title === item.name);
      if (index != -1) {
        state.cardList[index].num += item.num;
      } else {
        state.cardList.push(item);
      }
    },
    allchange(state) {
      state.checked != state.checked;
      state.cardList.forEach((item) => (item.checked = state.checked));
    },
    changechecked(state, title) {
      const index = state.cardList.findIndex((c) => c.title == title);
      state.cardList[index].checked != state.cardList[index].checked;
      if (
        state.cardList.filter((p) => p.checked).length == state.cardList.length
      ) {
        state.checked = true;
      } else {
        state.checked = false;
      }
    },
    delchecked(state){
      state.cardList = state.cardList.filter(item => item.checked == false)
    }
  },
  actions: {},
  modules: {},
});
