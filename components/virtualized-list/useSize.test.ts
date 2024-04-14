import { renderHook } from "@testing-library/react";
import useSize from "./useSize.hook";

describe("useSize", () => {
  it("should return initial window size when ref is null", () => {
    const { result } = renderHook(() => useSize({ current: null }));
    expect(result.current.windowSize).toEqual({ width: 0, height: 0 });
  });

  it("should return window size when ref is provided", () => {
    const ref = { current: document.createElement("div") };
    const { result } = renderHook(() => useSize(ref));
    expect(result.current.windowSize).toEqual({ width: 500, height: 499 });
  });

  it("should update window size when ref changes", () => {
    const ref1 = { current: document.createElement("div") };
    const { result, rerender } = renderHook(() => useSize(ref1));

    expect(result.current.windowSize).toEqual({ width: 500, height: 499 });

    const ref2 = { current: document.createElement("div") };
    rerender({ current: ref2 });

    expect(result.current.windowSize).toEqual({ width: 500, height: 499 });
  });

  it("should adjust height based on offset when offsetHeight is not 0", () => {
    const offset = 10; // Define the offset
    const ref = { current: document.createElement("div") };

    // Mock offsetHeight to make it writable
    Object.defineProperty(ref.current, "offsetHeight", {
      writable: true,
      value: 20,
    });

    const { result } = renderHook(() => useSize(ref, offset));

    expect(result.current.windowSize.height).toEqual(10);
  });

  it("should return 0 height when offsetHeight is 0", () => {
    const offset = 10; // Define the offset
    const ref = { current: document.createElement("div") };

    // Mock offsetHeight to make it writable
    Object.defineProperty(ref.current, "offsetHeight", {
      writable: true,
      value: 0,
    });

    const { result } = renderHook(() => useSize(ref, offset));

    expect(result.current.windowSize.height).toEqual(0);
  });
});
