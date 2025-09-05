declare module "multiple-cucumber-html-reporter" {
  interface ReportOptions {
    jsonDir: string;
    reportPath: string;
    pageTitle?: string;
    reportName?: string;
    displayDuration?: boolean;
    metadata?: Record<string, unknown>;
    customData?: {
      title: string;
      data: { label: string; value: string }[];
    };
  }

  export function generate(options: ReportOptions): void;
}
