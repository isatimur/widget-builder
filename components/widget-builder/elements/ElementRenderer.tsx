import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useElementInteractions } from '@/hooks/useElementInteractions';
import { ElementType, WidgetElement, StylesConfig } from '@/types';

// Import basic elements
import { TextElement } from './TextElement';
import { ButtonElement } from './ButtonElement';
import { ImageElement } from './ImageElement';
import { FormInputElement } from './FormInputElement';

// Import placeholder and controls
import { ElementPlaceholder } from './ElementPlaceholder';
import { ElementControls } from './ElementControls';
import { ElementAnalytics } from './ElementAnalytics';

// // Lazy load complex element components
// const ComplexElements = {
//     chart: React.lazy(() => import('./ChartElement')),
//     form: React.lazy(() => import('./FormElement')),
//     carousel: React.lazy(() => import('./CarouselElement')),
//     video: React.lazy(() => import('./VideoElement')),
// };

interface ElementRendererProps {
    element: WidgetElement;
    styles: StylesConfig;
    isEditing?: boolean;
    onUpdate?: (updates: Partial<WidgetElement>) => void;
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({
    element,
    styles,
    isEditing = false,
    onUpdate
}) => {
    const { handleInteraction } = useElementInteractions(element, onUpdate);

    const renderElement = () => {
        switch (element.type) {
            case 'text':
                return <TextElement element={element} styles={styles} />;
            case 'button':
                return <ButtonElement element={element} styles={styles} />;
            case 'image':
                return <ImageElement element={element} styles={styles} />;
            case 'form-input':
                return <FormInputElement element={element} styles={styles} />;
            case 'chart':
            case 'form':
            case 'carousel':
            case 'video':
                // const ComplexElement = ComplexElements[element.type];
                // return (
                //     <Suspense fallback={<ElementPlaceholder type={element.type} />}>
                //         <ComplexElement element={element} styles={styles} />
                //     </Suspense>
                // );
                return <ElementPlaceholder type={element.type} />;
            default:
                return <ElementPlaceholder type={element.type} />;
        }
    };

    return (
        <motion.div
            className="element-wrapper"
            initial={false}
            animate={isEditing ? { scale: 1.02, boxShadow: '0 0 0 2px #3b82f6' } : { scale: 1, boxShadow: 'none' }}
            whileHover={isEditing ? { scale: 1.05 } : {}}
            onClick={() => handleInteraction('click')}
            onMouseEnter={() => handleInteraction('hover')}
        >
            {renderElement()}
            {isEditing && <ElementControls element={element} onUpdate={onUpdate} />}
            <ElementAnalytics element={element} />
        </motion.div>
    );
};
