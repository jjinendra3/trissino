export type FieldType =
  | 'company-overview'
  | 'pricing'
  | 'feature-comparison'
  | 'why-we-win'
  | 'differentiators'
  | 'objection-handling'
  
export type Battle = {
  competitors: string[];
  fields: FieldType[];
  options?: {
    format?: 'base64' | 'url';
  };
};