# load-script-2

Promise based dynamic scripts loader for **browsers**.

## Why

- Load script files on demand (for better page load performance).
- Duplication check (skips if the same script is already loaded).
- Typescript ready.
- Promise ready.
- Tiny (1.15 KB).

## Install

```bash
npm i load-script-2
```

## Usage

```ts
import { scriptLoader } from 'load-script-2';

await scriptLoader([
  { scr: 'https://cdn.firebase.com/libs/firebaseui/3.6.0/firebaseui.js' },

  // or optionally pass options
  {
    scr: 'https://cdn.firebase.com/libs/firebaseui/3.6.0/firebaseui.js',
    opt: {
      async: true, // default
      type: 'text/javascript', // default
      attrs: {}, // default
    },
  },
]);
```

Results in appending the following script node to DOM (inside the `<head>` tag).

```html
<script async type=​"text/​javascript" src=​"https://.../​firebaseui.js">​</script>​
```

## Licence

MIT &copy; 2019 [Vajahath Ahmed](https://twitter.com/vajahath7)
