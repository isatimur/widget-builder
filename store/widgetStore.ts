import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { WidgetState, WidgetElement, WidgetStyles, WidgetBehavior, Template } from '@/types';

interface WidgetStore {
    currentWidget: WidgetState;
    history: {
        past: WidgetState[];
        future: WidgetState[];
    };
    selectedElementId: string | null;
    previewMode: 'desktop' | 'tablet' | 'mobile';
    actions: {
        updateWidget: (updates: Partial<WidgetState>) => void;
        addElement: (element: Omit<WidgetElement, 'id'>) => void;
        updateElement: (id: string, updates: Partial<WidgetElement>) => void;
        removeElement: (id: string) => void;
        reorderElements: (newOrder: WidgetElement[]) => void;
        selectElement: (id: string | null) => void;
        updateStyles: (updates: Partial<WidgetStyles>) => void;
        updateBehavior: (updates: Partial<WidgetBehavior>) => void;
        updateTargeting: (updates: Partial<WidgetState['targeting']>) => void;
        updateAnalytics: (updates: Partial<WidgetState['analytics']>) => void;
        updateIntegrations: (updates: Partial<WidgetState['integrations']>) => void;
        undo: () => void;
        redo: () => void;
        resetWidget: () => void;
        setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
        updateTemplate: (templateId: string) => void;
    };
}

const initialWidget: WidgetState = {
    id: nanoid(),
    name: 'New Widget',
    elements: [],
    styles: {
        theme: {
            primary: '#007AFF',
            secondary: '#5856D6',
            background: '#FFFFFF',
            text: '#000000',
            accent: '#FF2D55'
        },
        typography: {
            fontFamily: 'Inter',
            fontSize: 16,
            lineHeight: 1.5,
            fontWeight: 400
        },
        layout: {
            width: 400,
            height: 'auto',
            padding: 24,
            margin: 0,
            borderRadius: 12,
            position: 'center'
        },
        effects: {
            animation: 'fade',
            shadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            backdrop: 'blur(8px)',
            opacity: 1
        }
    },
    behavior: {
        trigger: {
            type: 'immediate',
            settings: {}
        },
        display: {
            frequency: 'always',
            conditions: [],
            animation: 'fade'
        },
        targeting: {
            rules: [],
            logic: 'AND'
        },
        analytics: {
            enabled: true,
            events: ['view', 'click', 'submit'],
            goals: []
        }
    },
    targeting: {
        enabled: false,
        rules: []
    },
    analytics: {
        enabled: false,
        trackPageViews: true,
        trackClicks: true,
        trackConversions: true,
        goals: []
    },
    integrations: {},
    templates: [],
    version: 1,
    lastModified: new Date().toISOString()
};

export const useWidgetStore = create<WidgetStore>()(
    persist(
        (set, get) => ({
            currentWidget: initialWidget,
            history: {
                past: [],
                future: []
            },
            selectedElementId: null,
            previewMode: 'desktop',
            actions: {
                updateWidget: (updates) =>
                    set(
                        produce((state) => {
                            state.history.past.push({ ...state.currentWidget });
                            state.history.future = [];
                            state.currentWidget = {
                                ...state.currentWidget,
                                ...updates,
                                lastModified: new Date().toISOString()
                            };
                        })
                    ),
                addElement: (element) =>
                    set(
                        produce((state) => {
                            const newElement = { ...element, id: nanoid() };
                            state.currentWidget.elements.push(newElement);
                        })
                    ),
                updateElement: (id, updates) =>
                    set(
                        produce((state) => {
                            const elementIndex = state.currentWidget.elements.findIndex(
                                (el) => el.id === id
                            );
                            if (elementIndex !== -1) {
                                state.currentWidget.elements[elementIndex] = {
                                    ...state.currentWidget.elements[elementIndex],
                                    ...updates
                                };
                            }
                        })
                    ),
                removeElement: (id) =>
                    set(
                        produce((state) => {
                            state.currentWidget.elements = state.currentWidget.elements.filter(
                                (el) => el.id !== id
                            );
                        })
                    ),
                reorderElements: (newOrder) =>
                    set(
                        produce((state) => {
                            state.currentWidget.elements = newOrder;
                        })
                    ),
                selectElement: (id) => set({ selectedElementId: id }),
                updateStyles: (updates) =>
                    set(
                        produce((state) => {
                            state.currentWidget.styles = {
                                ...state.currentWidget.styles,
                                ...updates
                            };
                        })
                    ),
                updateBehavior: (updates) =>
                    set(
                        produce((state) => {
                            state.currentWidget.behavior = {
                                ...state.currentWidget.behavior,
                                ...updates
                            };
                        })
                    ),
                updateTargeting: (updates) =>
                    set(
                        produce((state) => {
                            state.currentWidget.targeting = {
                                ...state.currentWidget.targeting,
                                ...updates
                            };
                        })
                    ),
                updateAnalytics: (updates) =>
                    set(
                        produce((state) => {
                            state.currentWidget.analytics = {
                                ...state.currentWidget.analytics,
                                ...updates
                            };
                        })
                    ),
                updateIntegrations: (updates) =>
                    set(
                        produce((state) => {
                            state.currentWidget.integrations = {
                                ...state.currentWidget.integrations,
                                ...updates
                            };
                        })
                    ),
                undo: () =>
                    set(
                        produce((state) => {
                            if (state.history.past.length > 0) {
                                const previous = state.history.past.pop()!;
                                state.history.future.unshift(state.currentWidget);
                                state.currentWidget = previous;
                            }
                        })
                    ),
                redo: () =>
                    set(
                        produce((state) => {
                            if (state.history.future.length > 0) {
                                const next = state.history.future.shift()!;
                                state.history.past.push(state.currentWidget);
                                state.currentWidget = next;
                            }
                        })
                    ),
                resetWidget: () => set({ currentWidget: initialWidget }),
                setPreviewMode: (mode) => set({ previewMode: mode }),
                updateTemplate: (templateId) =>
                    set(
                        produce((state) => {
                            const template = state.currentWidget.templates.find((t) => t.id === templateId);
                            if (template) {
                                state.currentWidget.elements = template.elements;
                                // You might want to update other properties based on the template
                            }
                        })
                    )
            }
        }),
        {
            name: 'widget-builder-storage',
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name);
                    if (str) return JSON.parse(str);
                    return null;
                },
                setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => localStorage.removeItem(name),
            },
        }
    )
);
