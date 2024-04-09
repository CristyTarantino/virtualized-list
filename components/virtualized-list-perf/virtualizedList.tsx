import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

interface VirtualListProps<T extends object> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  itemContent: (item: T, index: number) => ReactNode;
  buffer?: number;
}

const VirtualList = forwardRef(
  <T,>(
    {
      items,
      itemHeight,
      containerHeight,
      itemContent,
      buffer = 10,
    }: VirtualListProps<T>,
    ref,
  ) => {
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

    return (
      <div
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
      </div>
    );
  },
);

VirtualList.displayName = "VirtualList"; // Setting the display name
export default VirtualList;