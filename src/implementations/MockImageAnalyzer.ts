/**
 * MOCK IMPLEMENTATION for testing
 * This simulates Gemini without needing an API key
 * 
 * Replace with GeminiImageAnalyzer when ready to use real API
 */

import { IImageAnalyzer } from '../interfaces/IImageAnalyzer';
import { ImageData, JacketAttributes } from '../types/primitives';

export class MockImageAnalyzer implements IImageAnalyzer {
  async analyzeJacket(image: ImageData): Promise<JacketAttributes> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('  🔍 [MOCK] Analyzing image:', image.filename);
    
    // Return mock data based on filename hints
    const filename = image.filename.toLowerCase();
    
    return {
      brand: filename.includes('levi') ? 'Levi\'s' : 'Generic Denim Co.',
      condition: 'good',
      style: 'Trucker Jacket',
      color: 'Medium Blue Wash',
      size: 'Large',
      material: '100% Cotton Denim',
      features: ['classic-fit', 'button-front', 'chest-pockets', 'adjustable-waist']
    };
  }

  async validateImage(image: ImageData): Promise<boolean> {
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    console.log('  ✅ [MOCK] Image validation passed');
    
    // Mock validation - always returns true for testing
    return true;
  }
}
