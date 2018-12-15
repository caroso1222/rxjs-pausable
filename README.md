# rxjs-pausable

A RxJS pipable operator to pause and resume streams. See motivation and in-depth explanation of the source [in this blog post](//TODO).

Play with [the demo in stackblitz](//demo).

## Install

```
npm i rxjs-pausable
```

## Usage

```typescript
import { PausableObservable, pausable } from 'rxjs-pausable';
import { interval, Subject } from 'rxjs';

const source = new Subject();
const pausable = source.pipe(pausable()).subscribe(console.log);

source.next(1);
source.next(2);
pausable.pause();
source.next(3);
source.next(4);
pausable.resume();
source.next(5);
source.next(6);
source.complete();

// Output: 1, 2, 5, 6
```
