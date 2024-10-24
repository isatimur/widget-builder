import React, { useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StylesConfig, BehaviorConfig } from '@/types';
import { WidgetElement } from '@/types';
import { PreviewElements } from './PreviewElements';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface PreviewWidgetProps {
    elements: WidgetElement[];
    styles: StylesConfig;
    behavior: BehaviorConfig;
    device: DeviceType;
}

const animationVariants = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    slide: {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -50, opacity: 0 },
    },
    zoom: {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.9, opacity: 0 },
    },
    flip: {
        initial: { rotateX: 90, opacity: 0 },
        animate: { rotateX: 0, opacity: 1 },
        exit: { rotateX: -90, opacity: 0 },
    },
};

const deviceDimensions: Record<DeviceType, { width: string; height: string }> = {
    mobile: { width: '375px', height: '667px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '100%', height: '100%' },
};

export const PreviewWidget: React.FC<PreviewWidgetProps> = ({
    elements,
    styles,
    behavior,
    device,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const containerStyle = useMemo(() => {
        const dimensions = deviceDimensions[device] || deviceDimensions.desktop;
        return {
            width: dimensions.width,
            height: dimensions.height,
            overflow: 'auto',
            backgroundColor: styles?.theme?.background || '#ffffff',
            color: styles?.theme?.text || '#000000',
            fontFamily: styles?.typography?.fontFamily || 'Arial, sans-serif',
            fontSize: styles?.typography?.fontSize ? `${styles.typography.fontSize}px` : '16px',
            ...(styles?.layout || {}),
        };
    }, [device, styles]);

    const animationVariant = animationVariants[behavior?.display?.animation as keyof typeof animationVariants] || animationVariants.fade;

    return (
        <motion.div
            ref={containerRef}
            style={containerStyle}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animationVariant}
        >
            <AnimatePresence>
                <PreviewElements
                    elements={elements}
                    styles={styles || {}}
                    device={device}
                />
            </AnimatePresence>
        </motion.div>
    );
};
