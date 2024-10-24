export type ElementType =
    | "text"
    | "textarea"
    | "button"
    | "input"
    | "image"
    | "form"
    | "video"
    | "custom";
export interface AnalyticsConfig {
    // Define analytics configuration properties here2e2
    enabled: boolean;
    trackPageViews: boolean;
    trackClicks: boolean;
    trackConversions: boolean;
    goals: Array<{
        id: string;
        name: string;
        type: "pageView" | "click" | "formSubmission";
        target: string;
    }>;
    // Add more properties as needed
}

export interface Widget {
    id: string;
    type: string;
    configuration: any; // You might want to define a more specific type for configuration
}
export interface StylesConfig {
    colors?: {
        background?: string;
        text?: string;
        button?: string;
        gradient?: string;
    };
    typography?: {
        fontFamily?: string;
        fontSize?: number;
        lineHeight?: number;
        fontWeight?: string;
        letterSpacing?: number;
        textTransform?: string;
        textShadow?: string;
    };
    layout?: {
        width?: number;
        padding?: number;
        borderRadius?: number;
        desktop?: any;
        tablet?: any;
        mobile?: any;
    };
    animation?: {
        type?: string;
        duration?: number;
        delay?: number;
    };
    effects?: {
        boxShadow?: string;
        opacity?: number;
        transitionDuration?: number;
        transitionEasing?: string;
        filter?: string;
    };
    customCSS?: string;
    mediaQueries?: Array<{ breakpoint: string; css: string }>;
    transforms?: {
        translate?: string;
        rotate?: string;
        scale?: string;
        skew?: string;
    };
}

// OptimizationData type
export interface OptimizationData {
    analyticsInsights: {
        pageViews: number;
        clickThroughRate: number;
        avgTimeOnPage: number;
    };
    audienceMetrics: {
        targetAudienceSize: number;
        engagementRate: number;
        demographics: any; // You might want to define a more specific type for demographics
    };
    performanceReport: {
        conversionRate: number;
        loadTime: number;
        bounceRate: number;
        mobileResponsivenessScore: number;
    };
}
export interface ElementsConfig {
    templates: Template[];
    elements: WidgetElement[];
    onElementAdd: (element: WidgetElement) => void;
    onElementUpdate: (id: string, updates: Partial<WidgetElement>) => void;
    onElementRemove: (id: string) => void;
    onTemplateChange: (templateId: string) => void;
}
export interface WidgetElement {
    id: string;
    content: string;
    type: ElementType;
    settings: {
        styles: {
            fontSize?: number;
            fontWeight?: string;
            color?: string;
            backgroundColor?: string;
            padding?: number;
            margin?: number;
            borderRadius?: number;
            width?: string | number;
            height?: string | number;
            position?: "static" | "relative" | "absolute";
            display?: string;
            alignItems?: string;
            justifyContent?: string;
        };
        validation?: {
            required?: boolean;
            pattern?: string;
            minLength?: number;
            maxLength?: number;
        };
        behavior?: {
            onClick?: string;
            onHover?: string;
            animation?: string;
        };
    };
    children?: WidgetElement[];
}

export interface WidgetTemplate {
    id: string;
    name: string;
    category: string;
    thumbnail: string;
    elements: WidgetElement[];
    defaultStyles: Partial<WidgetStyles>;
    defaultBehavior: Partial<WidgetBehavior>;
}

export interface WidgetStyles {
    theme: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        accent: string;
    };
    typography: {
        fontFamily: string;
        fontSize: number;
        lineHeight: number;
        fontWeight: number;
    };
    layout: {
        width: number | string;
        height: number | string;
        padding: number;
        margin: number;
        borderRadius: number;
        position: "top" | "bottom" | "left" | "right" | "center";
    };
    effects: {
        animation: string;
        shadow: string;
        backdrop: string;
        opacity: number;
    };
}
export interface TargetingRule {
    id: string;
    type: string;
    condition: string;
    value: string;
    enabled: boolean;
}

export interface WidgetBehavior {
    trigger: {
        type: "immediate" | "delay" | "scroll" | "exit" | "inactivity" | "custom";
        settings: Record<string, any>;
    };
    display: {
        frequency: "once" | "always" | "custom";
        conditions: Array<{
            type: string;
            value: any;
        }>;
        animation: string;
    };
    targeting: {
        rules: Array<{
            type: string;
            operator: string;
            value: any;
        }>;
        logic: "AND" | "OR";
    };
    analytics: {
        enabled: boolean;
        events: string[];
        goals: Array<{
            name: string;
            conditions: any[];
        }>;
    };
}

export interface WidgetState {
    id: string;
    name: string;
    elements: WidgetElement[];
    styles: WidgetStyles;
    behavior: WidgetBehavior;
    version: number;
    lastModified: string;
}
export interface TriggerConfig {
    type: "immediate" | "delay" | "scroll" | "exit" | "inactivity";
    settings?: {
        delay?: number;
        scrollPercentage?: number;
        exitSensitivity?: number;
        inactivityTime?: number;
    };
}

export interface DisplayConfig {
    position: "top" | "bottom" | "left" | "right" | "center";
    animation: string;
    frequency: "once" | "always" | "custom";
    conditions?: any[]; // You might want to define a more specific type for conditions
}

export interface SchedulingConfig {
    enabled: boolean;
    startDate?: string;
    endDate?: string;
    timezone: string;
    showDays?: string[];
    showTimes?: {
        start: string;
        end: string;
    }[];
}

export interface BehaviorConfig {
    trigger: TriggerConfig;
    display: DisplayConfig;
    scheduling: SchedulingConfig;
}

export interface TargetingRule {
    id: string;
    type: string;
    operator: string;
    value: string;
}

export interface TargetingConfig {
    enabled: boolean;
    operator: "AND" | "OR";
    rules: TargetingRule[];
}

export interface Template {
    id: string;
    name: string;
    elements: WidgetElement[];
}
