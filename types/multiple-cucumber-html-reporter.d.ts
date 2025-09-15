declare module "multiple-cucumber-html-reporter" {
  interface BrowserMetadata {
    name: string;
    version: string;
  }

  interface PlatformMetadata {
    name: string;
    version: string;
  }

  interface CustomData {
    title: string;
    data: { label: string; value: string }[];
  }

  interface ReportOptions {
    jsonDir: string;                    // Path where cucumber JSON files are located
    reportPath: string;                 // Path where report should be saved
    pageTitle?: string;                 // HTML <title>
    reportName?: string;                // Report title inside the page
    displayDuration?: boolean;          // Show duration of steps/scenarios
    openReportInBrowser?: boolean;      // Auto-open report after generation
    disableLog?: boolean;               // Disable console logs while generating
    metadata?: {
      browser?: BrowserMetadata;
      platform?: PlatformMetadata;
      [key: string]: unknown;           // allow extra metadata
    };
    customData?: CustomData;            // Extra info block
  }

  export function generate(options: ReportOptions): void;
}
