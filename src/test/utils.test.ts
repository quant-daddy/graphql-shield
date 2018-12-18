import {
  isRule,
  isLogicRule,
  isRuleFieldMap,
  isRuleFunction,
  withDefault,
} from '../utils'
import { rule, and } from '../constructors'

describe('type identifiers', () => {
  test('isRuleFunction finds rule function.', async () => {
    expect(isRuleFunction(rule()(() => true))).toBeTruthy()
    expect(isRuleFunction(and())).toBeTruthy()
    expect(isRuleFunction(false)).toBeFalsy()
  })

  test('isRule finds rule.', async () => {
    expect(isRule(rule()(() => true))).toBeTruthy()
    expect(isRule(and())).toBeFalsy()
    expect(isRule(false)).toBeFalsy()
  })

  test('isLogicRule finds logic rule.', async () => {
    expect(isLogicRule(and())).toBeTruthy()
    expect(isLogicRule(rule()(() => true))).toBeFalsy()
    expect(isLogicRule(false)).toBeFalsy()
  })

  test('isRuleFieldMap finds rule field map.', async () => {
    expect(
      isRuleFieldMap({
        foo: rule()(() => true),
        bar: and(),
      }),
    ).toBeTruthy()

    expect(
      isRuleFieldMap({
        foo: rule()(() => true),
        bar: false,
      }),
    ).toBeFalsy()
  })
})

describe('helper functions', () => {
  test('withDefault returns correct value', async () => {
    expect(withDefault('pass')(undefined)).toBe('pass')
    expect(withDefault('fail')('pass')).toBe('pass')
  })
})
