import { renderHook, act } from '@testing-library/react-hooks'
import { useZoomPan } from '../src';
import { zoomTestCases, panToTestCases, panByTestCases } from "./useZoomPan.testCases";

describe('useZoomPan', () => {
  describe('allows zoom element', () => {
    zoomTestCases.forEach(({ description, events, results }) =>
      it(description, () => {
        const element = document.createElement('div')
        const ref = { current: element }

        const { result } = renderHook(() => useZoomPan({ element: ref }))

        act(() => {
          events.forEach(event => {
            result.current.zoom(event)
          });
        })

        expect(ref.current.style.transform).toBe(results[0]);
        expect(ref.current.style.transformOrigin).toBe(results[1]);
      }),
    )
  })
  describe('lets move element to destination', () => {
    panToTestCases.forEach(({ description, minScale, maxScale, destinations, expected }) =>
      it(description, () => {
        const element = document.createElement('div')
        const ref = { current: element }
          
        const { result } = renderHook(() => useZoomPan({ element: ref, minScale, maxScale }))
       
        act(() => {
          destinations.forEach(destination => {
            result.current.panTo(destination)
          });
        })

        expect(ref.current.style.transform).toBe(expected);
      }),
    );
  })
  describe('lets move element by value', () => {
    panByTestCases.forEach(({ description, minScale, maxScale, events, expected }) =>
    it(description, () => {
      const element = document.createElement('div')
      const ref = { current: element }
        
      const { result } = renderHook(() => useZoomPan({ element: ref, minScale, maxScale }))
     
      act(() => {
        events.forEach(event => {
          result.current.panBy(event)
        });
      })

      expect(ref.current.style.transform).toBe(expected);
    }),
  );
  })
});
