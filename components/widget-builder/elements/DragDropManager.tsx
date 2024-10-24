import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { WidgetStore } from '@/store/widgetStore';
import { motion, AnimatePresence } from 'framer-motion';
import { WidgetElement } from '@/types';
import { ElementRenderer } from '@/components/widget-builder/preview/ElementRenderer';


export const DragDropManager: React.FC<{
  elements: WidgetElement[];
  onElementsChange: (elements: WidgetElement[]) => void;
}> = ({ elements, onElementsChange }) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onElementsChange(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="widget-elements">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`elements-container ${
              snapshot.isDraggingOver ? 'dragging-over' : ''
            }`}
          >
            <AnimatePresence>
              {elements.map((element, index) => (
                <Draggable
                  key={element.id}
                  draggableId={element.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`element-item ${
                        snapshot.isDragging ? 'dragging' : ''
                      }`}
                    >
                      <ElementRenderer
                        element={element}
                        styles={styles}
                        isEditing={true}
                        onUpdate={(updates) =>
                          handleElementUpdate(element.id, updates)
                        }
                      />
                    </motion.div>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
