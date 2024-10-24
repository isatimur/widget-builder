import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { WidgetElement, StyleConfig, BehaviorConfig, TargetingConfig, IntegrationsConfig, AnalyticsConfig, SettingsConfig } from '@/types';

interface WidgetState {
    elements: WidgetElement[];
    styles: StyleConfig;
    behavior: BehaviorConfig;
    targeting: TargetingConfig;
    integrations: IntegrationsConfig;
    analytics: AnalyticsConfig;
    settings: SettingsConfig;
    ui: UIState;
}

interface UIState {
    activeSection: string;
    previewMode: 'desktop' | 'tablet' | 'mobile';
    sidebarCollapsed: boolean;
    showTutorial: boolean;
    tutorialStep: number;
    showHelpCenter: boolean;
    undoStack: any[];
    redoStack: any[];
}

type WidgetAction =
    | { type: 'ADD_ELEMENT'; payload: Partial<WidgetElement> }
    | { type: 'UPDATE_ELEMENT'; payload: { id: string; updates: Partial<WidgetElement> } }
    | { type: 'DELETE_ELEMENT'; payload: string }
    | { type: 'UPDATE_STYLES'; payload: Partial<StyleConfig> }
    | { type: 'UPDATE_BEHAVIOR'; payload: Partial<BehaviorConfig> }
    | { type: 'UPDATE_TARGETING'; payload: Partial<TargetingConfig> }
    | { type: 'UNDO' }
    | { type: 'REDO' };

const WidgetContext = createContext<{
    state: WidgetState;
    dispatch: React.Dispatch<WidgetAction>;
    actions: typeof widgetActions;
} | null>(null);

export const WidgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(widgetReducer, initialWidget);

    const contextValue = {
        state,
        dispatch,
        actions: widgetActions,
    };

    return (
        <WidgetContext.Provider value={contextValue}>
            {children}
        </WidgetContext.Provider>
    );
};

const widgetReducer = produce((draft: WidgetState, action: WidgetAction) => {
    switch (action.type) {
        case 'ADD_ELEMENT':
            draft.elements.push({
                id: nanoid(),
                type: 'text',
                content: '',
                styles: {},
                ...action.payload,
            });
            break;

        case 'UPDATE_ELEMENT':
            const elementIndex = draft.elements.findIndex(el => el.id === action.payload.id);
            if (elementIndex !== -1) {
                draft.elements[elementIndex] = {
                    ...draft.elements[elementIndex],
                    ...action.payload.updates,
                };
            }
            break;

        case 'DELETE_ELEMENT':
            draft.elements = draft.elements.filter(el => el.id !== action.payload);
            break;

        case 'UPDATE_STYLES':
            draft.styles = {
                ...draft.styles,
                ...action.payload,
            };
            break;

        case 'UPDATE_BEHAVIOR':
            draft.behavior = {
                ...draft.behavior,
                ...action.payload,
            };
            break;

        case 'UPDATE_TARGETING':
            draft.targeting = {
                ...draft.targeting,
                ...action.payload,
            };
            break;

        case 'UNDO':
            if (draft.ui.undoStack.length > 0) {
                const previousState = draft.ui.undoStack.pop();
                draft.ui.redoStack.push({ ...draft });
                return previousState;
            }
            break;

        case 'REDO':
            if (draft.ui.redoStack.length > 0) {
                const nextState = draft.ui.redoStack.pop();
                draft.ui.undoStack.push({ ...draft });
                return nextState;
            }
            break;
    }
});

const widgetActions = {
    addElement: (element: Partial<WidgetElement>) => ({
        type: 'ADD_ELEMENT' as const,
        payload: element,
    }),

    updateElement: (id: string, updates: Partial<WidgetElement>) => ({
        type: 'UPDATE_ELEMENT' as const,
        payload: { id, updates },
    }),

    deleteElement: (id: string) => ({
        type: 'DELETE_ELEMENT' as const,
        payload: id,
    }),

    updateStyles: (updates: Partial<StyleConfig>) => ({
        type: 'UPDATE_STYLES' as const,
        payload: updates,
    }),

    // ... other actions
};

// export const useWidget = () => {
//     const context = useContext(WidgetContext);
//     if (!context) {
//         throw new Error('useWidget must be used within a WidgetProvider');
//     }
//     return context;
// };

// Custom hooks for specific features
export const useWidgetElements = () => {
    const { state, dispatch, actions } = useWidget();

    const addElement = useCallback((element: Partial<WidgetElement>) => {
        dispatch(actions.addElement(element));
    }, [dispatch]);

    const updateElement = useCallback((id: string, updates: Partial<WidgetElement>) => {
        dispatch(actions.updateElement(id, updates));
    }, [dispatch]);

    const deleteElement = useCallback((id: string) => {
        dispatch(actions.deleteElement(id));
    }, [dispatch]);

    return {
        elements: state.elements,
        addElement,
        updateElement,
        deleteElement,
    };
};

export const useWidgetStyles = () => {
    const { state, dispatch, actions } = useWidget();

    const updateStyles = useCallback((updates: Partial<StyleConfig>) => {
        dispatch(actions.updateStyles(updates));
    }, [dispatch]);

    return {
        styles: state.styles,
        updateStyles,
    };
};
