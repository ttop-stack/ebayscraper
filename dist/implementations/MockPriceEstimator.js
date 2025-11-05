"use strict";
/**
 * MOCK IMPLEMENTATION for testing
 * This simulates eBay API without needing credentials
 *
 * Replace with EbayPriceEstimator when ready to use real API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockPriceEstimator = void 0;
class MockPriceEstimator {
    async estimatePrice(attributes) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('  💰 [MOCK] Estimating price for:', attributes.brand || 'Unknown Brand');
        // Calculate mock prices based on condition and brand
        let basePrice = 50;
        // Brand multiplier
        if (attributes.brand?.toLowerCase().includes('levi')) {
            basePrice = 80;
        }
        else if (attributes.brand?.toLowerCase().includes('wrangler')) {
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
    getDataSourceName() {
        return 'Mock eBay API';
    }
}
exports.MockPriceEstimator = MockPriceEstimator;
