import { Widget, OptimizationData } from '@/types'; // Import your type definitions

export const generateOptimizationPrompt = (widget: Widget, optimizationData: OptimizationData): string => {
    const {
        analyticsInsights,
        audienceMetrics,
        performanceReport
    } = optimizationData;

    const prompt = `
Analyze and optimize the following widget:

Widget ID: ${widget.id}
Widget Type: ${widget.type}
Current Conversion Rate: ${performanceReport.conversionRate}%

Analytics Insights:
- Page Views: ${analyticsInsights.pageViews}
- Click-through Rate: ${analyticsInsights.clickThroughRate}%
- Average Time on Page: ${analyticsInsights.avgTimeOnPage} seconds

Audience Metrics:
- Target Audience Size: ${audienceMetrics.targetAudienceSize}
- Engagement Rate: ${audienceMetrics.engagementRate}%
- Demographics: ${JSON.stringify(audienceMetrics.demographics)}

Performance Report:
- Load Time: ${performanceReport.loadTime} seconds
- Bounce Rate: ${performanceReport.bounceRate}%
- Mobile Responsiveness Score: ${performanceReport.mobileResponsivenessScore}/10

Current Widget Configuration:
${JSON.stringify(widget.configuration, null, 2)}

Based on this data, please provide the following optimizations:

1. Suggest improvements to the widget's design and layout to increase engagement.
2. Recommend changes to the targeting criteria to reach a more relevant audience.
3. Propose modifications to the widget's content or call-to-action to improve the conversion rate.
4. Advise on any technical optimizations to enhance performance and user experience.
5. Suggest A/B test scenarios to further optimize the widget.

Please provide your recommendations in a structured JSON format for easy parsing and implementation.
`;

    return prompt;
};
