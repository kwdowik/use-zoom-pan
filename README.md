# use-zoom-pan

[![npm version](https://img.shields.io/npm/v/use-zoom-pan.svg)](https://www.npmjs.com/package/use-zoom-pan)
![tests](https://github.com/kwdowik/use-zoom-pan/workflows/tests/badge.svg)

## Features

- [Zoom](#zoom)
- [Pan](#pan)

## Install

```sh
yarn add use-zoom-pan
# or
npm i use-zoom-pan --save
```

## Demo

You can try to play by yourself starting with this CodeSandbox snippet:
https://codesandbox.io/s/use-zoom-pan-x0vf2

## Changelog

https://github.com/kwdowik/use-zoom-pan/blob/master/CHANGELOG.md

## Zoom

```javascript
import React, { useRef } from 'react';
import { useZoomPan } from "./useZoomPan";

export default function Component() {
  const ref = useRef(null);
  const { zoom } = useZoomPan({ element: ref });

 const handleZoom = (event) => {
    if (!event.ctrlKey) return;
    event.preventDefault();
    zoom(event);
  };

  return (
    <div>
      <h1>Title</h1>
      <div ref={ref} onWheel={handleZoom}>
        Zoom
      </div>
    </div>
  );
}
```

## Pan

```javascript
import React, { useRef } from 'react';
import { useZoomPan } from "./useZoomPan";

export default function Component() {
  const ref = useRef(null);
  const { panBy } = useZoomPan({ element: ref });

 const handlePan = (event) => {
    if (!event.shiftKey) return;
    event.preventDefault();
    panBy(event);
  };

  return (
    <div onMouseMove={handlePan}>
      <h1>Title</h1>
      <div ref={ref}>
        Pan
      </div>
    </div>
  );
}
```

### Options

You can provide additional options `useZoomPan`:

| Option            | Default       | Description                                           | 
| ----------------- | ------------- | ----------------------------------------------------- | 
| minScale          | .1            | Minimum value for the zoom out                        | 
| maxScale          | 30            | Maximum value for the zoom in                         | 
| scaleSensitivity  | 50            | The zoom sensitivity                                  |