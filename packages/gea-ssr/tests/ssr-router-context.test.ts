import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { Router } from '../../gea/src/lib/router/router.ts'

describe('Router._ssrRouterResolver', () => {
  it('exists as a static nullable property', () => {
    assert.equal(Router._ssrRouterResolver, null)
  })

  it('can be assigned a resolver function', () => {
    const resolver = () => null
    Router._ssrRouterResolver = resolver
    assert.equal(Router._ssrRouterResolver, resolver)
    // Clean up
    Router._ssrRouterResolver = null
  })
})
