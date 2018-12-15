import { pausable, PausableObservable } from '../src/rxjs-pausable'
import { throttleTime } from 'rxjs/operators'
import { TestScheduler } from 'rxjs/testing'

const scheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected)
})

describe('rxjs-pausable', () => {
  it('should pause the stream', () => {
    scheduler.run(helpers => {
      const { cold, expectObservable } = helpers
      const e1 = cold('-a--b--c---|')
      const expected = '------------'

      const obs = e1.pipe(
        throttleTime(3, scheduler),
        pausable()
      ) as PausableObservable<string>
      obs.pause()
      expectObservable(obs).toBe(expected)
    })
  })

  it('should resume the stream', () => {
    scheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers
      const e1 = cold('-a--b--c---|')
      const subs = '^----------!'
      const expected = '-a-----c---|'

      const obs = e1.pipe(
        throttleTime(3, scheduler),
        pausable()
      ) as PausableObservable<string>
      obs.resume()
      expectObservable(obs).toBe(expected)
      expectSubscriptions(e1['subscriptions']).toBe(subs)
    })
  })
})
