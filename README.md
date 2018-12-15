# rxjs-pausable

RxJS pipeable operator to pause and resume streams. See motivation and in-depth explanation [in this blog post](https://stackblitz.com/edit/rxjs-confetti).

Play with [the demo in stackblitz](//demo).

![2018-12-15 18 26 09](https://user-images.githubusercontent.com/3689856/50048321-f3fc3f80-0096-11e9-9739-149a4e035f37.gif)


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
