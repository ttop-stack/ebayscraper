/**
 * MOCK IMPLEMENTATION for testing
 * This simulates eBay API without needing credentials
 * 
 * Replace with EbayPriceEstimator when ready to use real API
 */

import { IPriceEstimator } from '../interfaces/IPriceEstimator';
import { JacketAttributes, PriceEstimate } from '../types/primitives';

export class MockPriceEstimator implements IPriceEstimator {
  async estimatePrice(attributes: JacketAttributes): Promise<PriceEstimate> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('  💰 [MOCK] Estimating price for:', attributes.brand || 'Unknown Brand');
    
    // Calculate mock prices based on condition and brand
    let basePrice = 50;
    
    // Brand multiplier
    if (attributes.brand?.toLowerCase().includes('levi')) {
      basePrice = 80;
    } else if (attributes.brand?.toLowerCase().includes('wrangler')) {
      basePrice = 60;
    }
    
    // Condition multiplier
    const conditionMultiplier = {
      'new': 2.0,
      'like-new': 1.5,
      'good': 1.0,
      'fair': 0.6,
      'poor': 0.3
    }[attributes.condition];
    
    const avgPrice = basePrice * conditionMultiplier;
    
    return {
      currency: 'USD',
      lowEstimate: Math.round(avgPrice * 0.7),
      highEstimate: Math.round(avgPrice * 1.3),
      averagePrice: Math.round(avgPrice),
      confidence: 0.75,
      comparableListings: 47,
      dataSource: 'Mock eBay Data'
    };
  }

  getDataSourceName(): string {
    return 'Mock eBay API';
  }
}
