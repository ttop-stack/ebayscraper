/**
 * MOCK IMPLEMENTATION for testing
 * This simulates eBay API without needing credentials
 *
 * Replace with EbayPriceEstimator when ready to use real API
 */
import { IPriceEstimator } from '../interfaces/IPriceEstimator';
import { JacketAttributes, PriceEstimate } from '../types/primitives';
export declare class MockPriceEstimator implements IPriceEstimator {
    estimatePrice(attributes: JacketAttributes): Promise<PriceEstimate>;
    getDataSourceName(): string;
}
