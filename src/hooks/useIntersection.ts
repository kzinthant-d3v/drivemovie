import React, {  useEffect, useMemo, useState } from "react";

function useIntersection(ids: string[]) {

  const [visibles, setVisibles] = useState<Record<string, boolean>>(
    ids.reduce((a, c) => ({ ...a, [c]: false }), {})
  );

  const checkIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      setVisibles((prev) => {
        if (!prev[id]) return { ...prev, [id]: true };
        return prev;
      });
    }
  };

  const observer = useMemo(() => new IntersectionObserver(checkIntersect), []);

  useEffect(() => {
    ids.forEach((id) => {
      observer.observe(document.getElementById(id)!);
    });

    return () => observer.disconnect();
  }, []);

  return visibles;
}

export default useIntersection;
