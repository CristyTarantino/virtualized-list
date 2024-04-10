"use client";

import { ProductListItem } from "@/interfaces";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import VirtualizedListPerf from "@/components/virtualized-list-perf/virtualizedList";
import styles from "./index.module.css";

const useSize = (ref: RefObject<HTMLDivElement>) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const updateSize = useCallback(() => {
    setWindowSize({
      width: ref?.current?.offsetWidth || 0,
      height: ref?.current?.offsetHeight ? ref?.current?.offsetHeight - 20 : 0,
    });
  }, [ref]);

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [updateSize]);

  return windowSize;
};

const VirtualizedListContainer = ({
  products,
}: {
  products: ProductListItem[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const windowSize = useSize(containerRef);

  return (
    <div style={{ flex: 1 }} ref={containerRef}>
      {!!windowSize.height && (
        <VirtualizedListPerf
          items={products}
          itemHeight={70}
          containerHeight={windowSize.height}
          itemContent={(item: ProductListItem, index) => (
            <div
              id={`item-${item.isbn}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                {item.name} - {index}
              </div>
              <div className={styles.truncateOverflow}>{item.description}</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                {item.price}
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default VirtualizedListContainer;
