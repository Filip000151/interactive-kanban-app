import { useRef, useState, type FC, type ReactNode } from "react"
import { DragContext } from "../context"
import type { DropIndicator, Status } from "../types";

const DragProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(null);
  const columnRefs = {
    toDo: useRef(null),
    inProgress: useRef(null),
    done: useRef(null)
  };
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<Status | null>(null);

  return (
    <DragContext.Provider value={{dropIndicator, setDropIndicator, draggedTaskId, setDraggedTaskId, hoveredColumn, setHoveredColumn, columnRefs, cardRefs}}>
      {children}
    </DragContext.Provider>
  )
}

export default DragProvider