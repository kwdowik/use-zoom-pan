import { useLayoutEffect, useRef } from 'react';
import Renderer from './renderer';

export const useZoomPan = ({
  element,
  minScale = .1,
  maxScale = 30,
  scaleSensitivity = 50
}) => {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (!element.current) {
      throw Error(`Cannot find element: ${element}`);
    }
    ref.current = new Renderer({ minScale, maxScale, element: element.current, scaleSensitivity });
  }, [element, minScale, maxScale, scaleSensitivity])

  useLayoutEffect(() => {
    if (element.current && ref.current) {
      ref.current.reset();
    }
  }, [element.current]);

  const zoom = (event) => {
    ref.current.zoom({
      element: element.current,
      deltaScale: Math.sign(event.deltaY) > 0 ? -1 : 1,
      x: event.pageX,
      y: event.pageY
    });
  }

  const panBy = (event) => {
    ref.current.panBy({
      element: element.current,
      originX: event.movementX,
      originY: event.movementY
    })
  }

  const panTo = ({ x, y, scale }) => {
    ref.current.panTo({
      element: element.current,
      originX: x,
      originY: y,
      scale
    })
  }

  return { zoom, panBy, panTo }
}
