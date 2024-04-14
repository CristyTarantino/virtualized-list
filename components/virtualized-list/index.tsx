"use client";
import { VirtualizedListContext } from "@/components/virtualized-list/context";
import useSize from "@/components/virtualized-list/useSize.hook";
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";

interface VirtualListProps<T extends object> {
  items: T[];
  header?: ReactNode;
  itemHeight: number;
  itemContent: (item: T, index: number) => ReactNode;
  buffer?: number;
}

const VirtualList = <T extends object>({
  items,
  header,
  itemHeight,
  itemContent,
  buffer = 10,
}: VirtualListProps<T>) => {
  // References to the DOM elements for the outer container and the scrollable inner container.
  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  // Custom hook to measure the size of the container. It updates on resize events.
  const { windowSize, updateSize } = useSize(containerRef);
  // Calculate the visible height of the container taking into account the current window size.
  const containerHeight = useMemo(() => windowSize.height, [windowSize.height]);

  // State to track the vertical scroll position within the inner container.
  const [scrollTop, setScrollTop] = useState(0);

  // Calculate the number of items based on the `items` array.
  const itemCount = useMemo(() => items.length, [items]);

  // Determine the first visible item in the list based on scroll position and item height.
  const startIndex = useMemo(
    () => Math.max(0, Math.floor(scrollTop / itemHeight) - buffer),
    [buffer, itemHeight, scrollTop],
  );

  // Accessing context for additional functionality such as adding items (if implemented).
  const context = useContext(VirtualizedListContext);

  // Calculate the number of items to render based on the container height and buffer.
  const renderedNodesCount = useMemo(() => {
    let count = Math.floor(containerHeight / itemHeight) + 2 * buffer;
    return Math.min(itemCount - startIndex, count);
  }, [containerHeight, itemHeight, itemCount, startIndex, buffer]);

  // Generate row components for only the visible items.
  const rows = useMemo(() => {
    return Array.from({ length: renderedNodesCount }, (_, i) => {
      const index = i + startIndex;
      return itemContent(items[index], index);
    });
  }, [startIndex, renderedNodesCount, itemContent, items]);

  useEffect(() => {
    // Automatically scroll to the bottom of the list when a new item is added to the context.
    if (context?.addItem && innerContainerRef.current) {
      innerContainerRef.current?.scrollTo({
        top: items.length * itemHeight - containerHeight,
        behavior: "smooth",
      });
    }
  }, [context, containerHeight, itemHeight, items.length]);

  const scrollToTop = useCallback(() => {
    // Provides a method to scroll to the top of the list.
    innerContainerRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    // Adjusts the size of the container when the first item is added to ensure the container is sized correctly.
    if (items?.length === 1) {
      updateSize();
    }
  }, [items?.length, updateSize]);

  if (!items?.length) {
    // Render a message when no items are available in the list.
    return (
      <div className={`${styles.flexFullHeight} ${styles.flexCenter}`}>
        <p>No products available</p>
        {context && <p>try adding one</p>}
      </div>
    );
  }

  return (
    <>
      {!!header && header}
      <div className={styles.flexFullHeight} ref={containerRef}>
        {!!windowSize?.height && (
          <div
            ref={innerContainerRef}
            className={styles.scrollContainer}
            style={{ height: `${containerHeight}px` }}
            onScroll={(e) => {
              // Update the scroll position state whenever the user scrolls.
              setScrollTop(e.currentTarget.scrollTop);
            }}
          >
            <div
              style={{
                height: `${itemCount * itemHeight}px`,
              }}
              className={styles.itemsContainer}
            >
              <div
                style={{
                  // CSS transform to position the rows starting from the calculated startIndex.
                  transform: `translateY(${startIndex * itemHeight}px)`,
                }}
              >
                {rows}
              </div>
            </div>
            {scrollTop > 0 && (
              <button
                className={styles.topButton}
                onClick={scrollToTop}
                aria-label="Scroll to top of list"
              >
                Scroll to Top
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default VirtualList;
