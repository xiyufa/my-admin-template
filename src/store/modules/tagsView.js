const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  addVisitedView(state, view) {
    if (state.visitedViews.some(v => v.name === view.name)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  addCachedView(state, view) {
    if (state.cachedViews.includes(view.name)) return
    if (view.meta.cache) {
      state.cachedViews.push(view.name)
    }
  },
  delVisitedView(state, view) {
    const index = state.visitedViews.findIndex(v => v.name === view.name)
    if (index !== -1) {
      state.visitedViews.splice(index, 1)
    }
  },
  delCachedView(state, view) {
    const index = state.cachedViews.findIndex(v => v === view.name)
    if (index !== -1) {
      state.cachedViews.splice(index, 1)
    }
  },
  delOthersVisitedViews(state, view) {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.name === view.name
    })
  },
  delOthersCachedViews(state, view) {
    state.cachedViews = state.cachedViews.filter(v => {
      return v === view.name
    })
  },
  delAllVisitedViews(state) {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  delAllCachedViews(state) {
    state.cachedViews = []
  },
  updateVisitedView(state, view) {
    let v = state.visitedViews.find(v => v.name === view.name)
    if (v) {
      v = Object.assign(v, view)
    }
  }
}

const actions = {
  addView({ commit }, view) {
    commit('addVisitedView', view)
  },
  delView({ commit }, view) {
    commit('delVisitedView', view)
    commit('delCachedView', view)
  },
  delOthersViews({ commit }, view) {
    commit('delOthersVisitedViews', view)
    commit('delOthersCachedViews', view)
  },
  delAllViews({ commit }, view) {
    commit('delAllVisitedViews', view)
    commit('delAllCachedViews', view)
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
