"use client";
import { VirtualizedListContext } from "@/components/virtualized-list/context";
import useSize from "@/hooks/useSize";
import React, {
  ReactNode,
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
  const containerRef = useRef<HTMLDivElement>(null);
  const windowSize = useSize(containerRef);
  const containerHeight = useMemo(() => windowSize.height, [windowSize.height]);

  const [scrollTop, setScrollTop] = useState(0);
  const innerContainerRef = useRef<HTMLDivElement>(null); // Add this line to create a ref for the container
  const itemCount = useMemo(() => items.length, [items]);
  const startIndex = useMemo(
    () => Math.max(0, Math.floor(scrollTop / itemHeight) - buffer),
    [buffer, itemHeight, scrollTop],
  );

  const context = useContext(VirtualizedListContext);

  let renderedNodesCount =
    Math.floor(containerHeight / itemHeight) + 2 * buffer;

  renderedNodesCount = Math.min(itemCount - startIndex, renderedNodesCount);

  const generateRows = () => {
    let itemNodes: ReactNode[] = [];
    for (let i = 0; i < renderedNodesCount; i++) {
      const index = i + startIndex;
      itemNodes.push(
        <div
          key={index}
          style={{
            height: `${itemHeight}px`,
          }}
        >
          {itemContent(items[index], index)}
        </div>,
      );
    }

    return itemNodes;
  };

  useEffect(() => {
    if (context?.addItem && innerContainerRef.current) {
      innerContainerRef.current.scrollTop =
        items.length * itemHeight - containerHeight;
    }
  }, [context, containerHeight, itemHeight, items.length]);

  const scrollToTop = () => {
    if (innerContainerRef.current) {
      innerContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <>
      {!!header && header}
      <div className={styles.virtualListContainer} ref={containerRef}>
        {!!windowSize.height && (
          <div
            ref={innerContainerRef}
            className={styles.scrollContainer}
            style={{ height: `${containerHeight}px` }}
            onScroll={(e) => {
              setScrollTop(e.currentTarget.scrollTop);
            }}
          >
            <div
              style={{
                height: `${(itemCount - 1) * itemHeight}px`,
              }}
              className={styles.itemsContainer}
            >
              <div
                style={{
                  transform: `translateY(${startIndex * itemHeight}px)`,
                }}
              >
                {generateRows()}
              </div>
            </div>
            {scrollTop > 0 && (
              <button className={styles.topButton} onClick={scrollToTop}>
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
