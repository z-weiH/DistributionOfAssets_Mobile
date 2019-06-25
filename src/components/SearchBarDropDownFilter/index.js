import VueSearchBarDropDownFilter from "./SearchBar.vue"

const SearchBarDropDown = {
  install: function (Vue) {
    Vue.component('SearchBarDropDown', VueSearchBarDropDownFilter);
  }
}

export default SearchBarDropDown;
