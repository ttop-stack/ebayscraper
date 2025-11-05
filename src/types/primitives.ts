/**
 * Core primitive data types for the jacket pricing system.
 * These types define the data that flows between all modules.
 */

export interface ImageData {
  buffer: Buffer;
  mimeType: string;
  filename: string;
}

export interface JacketAttributes {
  brand?: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  style?: string;
  color?: string;
  size?: string;
  material?: string;
  features: string[];
}

export interface PriceEstimate {
  currency: string;
  lowEstimate: number;
  highEstimate: number;
  averagePrice: number;
  confidence: number; // 0-1
  comparableListings: number;
  dataSource: string;
}

export interface AnalysisResult {
  attributes: JacketAttributes;
  priceEstimate: PriceEstimate;
  timestamp: Date;
}
