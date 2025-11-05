/**
 * BLACK BOX: Price Estimation Module
 * 
 * Responsibility: Convert jacket attributes into price estimates.
 * 
 * This can be implemented using:
 * - eBay API
 * - Multiple marketplace APIs combined
 * - Historical database
 * - ML price prediction model
 * 
 * The implementation can be completely replaced without affecting other modules.
 */

import { JacketAttributes, PriceEstimate } from '../types/primitives';

export interface IPriceEstimator {
  /**
   * Estimates the price of a jacket based on its attributes.
   * @param attributes - The jacket's characteristics
   * @returns Price estimate with confidence level
   * @throws Error if estimate cannot be generated
   */
  estimatePrice(attributes: JacketAttributes): Promise<PriceEstimate>;
  
  /**
   * Returns the name of the data source used for pricing.
   */
  getDataSourceName(): string;
}
