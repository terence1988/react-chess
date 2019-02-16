import { curry } from 'ramda'

/**
 * Trace log (compose)
 * @param  {string} label
 * @return {*}
 */
function trace (label, v) {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`${label}: `, v)
  }

  return v
}

export default curry(trace)
