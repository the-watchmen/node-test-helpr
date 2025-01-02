import assert from 'node:assert'
import _ from 'lodash'

// Make this var name sufficiently obscure to prevent global clashes...
//
const _testHelpr = {
  state: {},
}

export function initState() {
  _testHelpr.state = {}
}

export function setState(state) {
  _testHelpr.state = {..._testHelpr.state, ...state}
}

export function getState(key, {dflt} = {}) {
  return key ? _.get(_testHelpr.state, key, dflt) : _testHelpr.state
}

export function getRequiredState(key) {
  assert(_.has(_testHelpr.state, key))
  return getState(key)
}

export function unsetState(key) {
  _.unset(_testHelpr.state, key)
}
