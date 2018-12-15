import { Observable, NEVER, BehaviorSubject } from 'rxjs'
import { switchMap, materialize, dematerialize } from 'rxjs/operators'

export class PausableObservable<T> extends Observable<T> {
  private pauser: BehaviorSubject<boolean>

  pause() {
    this.pauser.next(true)
  }

  resume() {
    this.pauser.next(false)
  }
}

export function pausable() {
  return function pauseFn<T>(source: Observable<T>) {
    const pausableProto = PausableObservable.prototype

    const pauser = new BehaviorSubject(false)
    const newSource = pauser.pipe(
      switchMap(paused => (paused ? NEVER : source.pipe(materialize()))),
      dematerialize()
    )

    const pausable: any = Object.create(newSource, {
      pause: { value: pausableProto.pause },
      resume: { value: pausableProto.resume },
      pauser: { value: pauser }
    })
    return pausable as PausableObservable<T>
  }
}
