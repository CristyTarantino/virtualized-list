import { useVirtualizedListContext } from "@/components/virtualized-list-perf/virtualized-list.context";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";

interface VirtualListProps<T extends object> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  itemContent: (item: T, index: number) => ReactNode;
  buffer?: number;
}

const VirtualList = <T extends object>({
  items,
  itemHeight,
  containerHeight,
  itemContent,
  buffer = 10,
}: VirtualListProps<T>) => {
  const { addItem } = useVirtualizedListContext();
  const containerRef = useRef<HTMLDivElement>(null); // Add this line to create a ref for the container
  const [scrollTop, setScrollTop] = useState(0);
  const itemCount = useMemo(() => items.length, [items]);
  const startIndex = useMemo(
    () => Math.max(0, Math.floor(scrollTop / itemHeight) - buffer),
    [buffer, itemHeight, scrollTop],
  );

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
            overflowAnchor: "none",
          }}
        >
          {itemContent(items[index], index)}
        </div>,
      );
    }

    return itemNodes;
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        items.length * itemHeight - containerHeight;
    }
  }, [addItem, containerHeight, itemHeight, items.length]);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  return (
    <div
      ref={containerRef}
      style={{ height: `${containerHeight}px`, overflowY: "scroll" }}
      onScroll={(e) => {
        setScrollTop(e.currentTarget.scrollTop);
      }}
    >
      <div
        style={{
          height: `${itemCount * itemHeight}px`,
        }}
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
        <button
          style={{
            position: "sticky",
            bottom: "20px",
            left: "95%",
          }}
          onClick={scrollToTop}
        >
          Scroll to Top
        </button>
      )}
    </div>
  );
};

export default VirtualList;
