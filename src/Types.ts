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
    id: string;
    createdTime: string;
    fields: FieldsDataType;
}
export interface SignalDataTypeForBubbleChart {
    id: string;
    createdTime: string;
    fields: FieldsDataType;
    x: number;
    y: number;
    vx: number;
    vy: number;
}

export interface MouseOverDataType extends SignalDataTypeForBubbleChart {
  xPos: number;
  yPos: number;
}
