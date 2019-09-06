# script-loader

Promise based dynamic scripts loader for **browsers**. (`@vaju/script-loader`)

## Why

- Load script files on demand _(for better page load performance)_.
- Duplication check _(skip loading if the same script is already loaded)_.
- Typescript ready.
- Promise ready.
- No dependencies, tiny (1.2 KB).

## Install

```bash
npm i @vaju/script-loader
```

## Usage

```ts
import { scriptLoader } from '@vaju/script-loader';

// ...

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
