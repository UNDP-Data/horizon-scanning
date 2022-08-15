export interface FieldsDataType{
  'Signal Title (New)': string;
  'Signal Description': string;
  'Sources'?: string;
  'Horizon'?: '2022-2023' | '2024-2025' | '2026-2030';
  'STEEP+V (multiple)'?: string[]
  'BRH/ CO': string;
  'Likelihood': number;
  'Impact': number;
  'Regional impact?': ['Yes' | 'No'];
  'Risk score (L x I)': number;
  'Impact/ Relevance UNDP': string;
  'Key themes'?: string[];
  'SDGs': string[]
  'Signal Title (Raw)'?: string;
  'STEEP+V (Single)': string;
  'Survey Risk (Average)'?: number;
  'Sources II?': string;
}

export interface SignalDataType {
  'Signal Title (New)': string;
  'Signal Description': string;
  'Horizon': '2022-2023' | '2024-2025' | '2026-2030' | null;
  'Likelihood': number;
  'Impact': number;
  'Risk score (L x I)': number;
  'Survey Risk (Average)': number | null;
  'STEEP+V': string;
  'SDGs': string;
  'Signature Solutions/ Enablers': string;
  'Key Themes': string;
  'Key themes (old)': string;
  'BRH/ CO': string;
  'Sources': string;
  'Sources II': string;
  'Signal Description (old)': string;
  'Impact/ Relevance UNDP': string;
  'Year': 2021 | 2022;
}
export interface SignalDataTypeForBubbleChart extends SignalDataType {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface MouseOverDataType extends SignalDataTypeForBubbleChart {
  xPos: number;
  yPos: number;
}

export interface BoxPlotDataType {
  Signal: string;
  importanceArray: number[];
}
