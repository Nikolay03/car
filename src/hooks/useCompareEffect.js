import React from 'react'
import { equals as deepEqual } from 'ramda'

function useDeepCompareMemoize (value) {
  const ref = React.useRef()

  if (!deepEqual(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

function useCompareEffect (callback, dependencies) {
  if (process.env.NODE_ENV !== 'production') {
    //    checkDeps(dependencies)
  }
  React.useEffect(callback, useDeepCompareMemoize(dependencies))
}

export function useDeepCompareEffectNoCheck (callback, dependencies) {
  React.useEffect(callback, useDeepCompareMemoize(dependencies))
}

export default useCompareEffect
