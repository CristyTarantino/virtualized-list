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
      <div style={{ flex: 1 }} ref={containerRef}>
        {!!windowSize.height && (
          <div
            ref={innerContainerRef}
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
        )}
      </div>
    </>
  );
};

export default VirtualList;
