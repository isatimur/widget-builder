import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { produce } from 'immer';

interface WidgetState {
  // Element States
  activeSection: string;
  elements: any[];
  templates: any[];
  
  // Style States
  colors: {
    background: string;
    text: string;
    button: string;
  };
  showColorPicker: boolean;
  activeColor: string;
  widgetWidth: number;
  
  // Behavior States
  displayFrequency: string;
  exitIntent: boolean;
  selectedTemplate: string;
  selectedAnimation: string;
  
  // Testing States
  abTesting: {
    enabled: boolean;
    variant: string;
    variants: Record<string, any>;
  };
  
  // Analytics & Integration States
  analytics: {
    enabled: boolean;
    conversionRate: number;
    events: any[];
  };
  integrations: {
    selected: string[];
    configurations: Record<string, any>;
  };
  
  // Targeting States
  targeting: {
    rules: any[];
    enabled: boolean;
  };
  
  // Feature Flags
  features: {
    accessibility: boolean;
    performance: boolean;
    livePreview: boolean;
  };
  
  // UI States
  ui: {
    sidebarCollapsed: boolean;
    showTutorial: boolean;
    tutorialStep: number;
    showHelpCenter: boolean;
  };
  
  // History Management
  history: {
    past: any[];
    present: any;
    future: any[];
  };
  
  // Actions
  actions: {
    updateElements: (elements: any[]) => void;
    updateColors: (colors: Partial<WidgetState['colors']>) => void;
    toggleFeature: (feature: keyof WidgetState['features']) => void;
    undo: () => void;
    redo: () => void;
    // ... other actions
  };
}

export const useWidgetStore = create<WidgetState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        activeSection: 'elements',
        elements: [],
        templates: [],
        colors: {
          background: '#ffffff',
          text: '#000000',
          button: '#4CAF50',
        },
        showColorPicker: false,
        activeColor: '',
        widgetWidth: 300,
        displayFrequency: 'once',
        exitIntent: false,
        selectedTemplate: '',
        selectedAnimation: '',
        abTesting: {
          enabled: false,
          variant: 'A',
          variants: {},
        },
        analytics: {
          enabled: false,
          conversionRate: 0,
          events: [],
        },
        integrations: {
          selected: [],
          configurations: {},
        },
        targeting: {
          rules: [],
          enabled: false,
        },
        features: {
          accessibility: false,
          performance: false,
          livePreview: true,
        },
        ui: {
          sidebarCollapsed: false,
          showTutorial: true,
          tutorialStep: 0,
          showHelpCenter: false,
        },
        history: {
          past: [],
          present: null,
          future: [],
        },

        // Actions
        actions: {
          updateElements: (elements) =>
            set(
              produce((state) => {
                state.elements = elements;
                state.history.past.push(state.present);
                state.history.present = state;
                state.history.future = [];
              })
            ),

          updateColors: (colors) =>
            set(
              produce((state) => {
                state.colors = { ...state.colors, ...colors };
              })
            ),

          toggleFeature: (feature) =>
            set(
              produce((state) => {
                state.features[feature] = !state.features[feature];
              })
            ),

          undo: () => {
            const { past, present, future } = get().history;
            if (past.length === 0) return;

            set(
              produce((state) => {
                state.history.future.unshift(present);
                state.history.present = past[past.length - 1];
                state.history.past.pop();
              })
            );
          },

          redo: () => {
            const { past, present, future } = get().history;
            if (future.length === 0) return;

            set(
              produce((state) => {
                state.history.past.push(present);
                state.history.present = future[0];
                state.history.future.shift();
              })
            );
          },
        },
      }),
      {
        name: 'widget-builder-storage',
        partialize: (state) => ({
          elements: state.elements,
          colors: state.colors,
          templates: state.templates,
        }),
      }
    )
  )
);
