import React, { ReactNode, useEffect } from "react";
import { groupArray } from "../utils/groupArray";
import useIntersection from "../hooks/useIntersection";
import Item from "./Item";
import { DriveFile, ItemPlaceholder, MimeTypes, MovieFile } from "../types";

type ItemListProps<T> = {
  items: Array<T>;
  moviesMeta: Record<string, MovieFile>;
  placeholders: Array<ItemPlaceholder>;
  updateItems: () => void;
  goNextFolder: (folderId: string) => void;
};

function ItemList<T extends DriveFile>({
  items,
  moviesMeta,
  updateItems,
  placeholders,
  goNextFolder
}: ItemListProps<T>) {
  useEffect(() => {
    if (items.length === 0) return;
    const checkLastIntersect: IntersectionObserverCallback = ([entry]) => {
      if (entry.isIntersecting) {
        updateItems();
      }
    };
    const observer = new IntersectionObserver(checkLastIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });
    observer.observe(document.getElementById(`g${items.length - 1}`)!);

    return () => observer.disconnect();
  }, [items]);

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 border border-red-500 bottom-4">
        {
          [...items, ...placeholders.slice(items.length)].map((item, index) => (
            <Item
              moviesMeta={moviesMeta}
              goNextFolder={goNextFolder}
              item={item}
              index={index}
              key={item.id}
            />
          ))}
      </div>
    </div>
  );
}

export default ItemList;
