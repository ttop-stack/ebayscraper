# Denim Jacket Price Analyzer 🧥

yo so this is a simple app that analyzes denim jacket photos and tells you how much they're worth. uses image recognition (eventually gemini/nanobanana) and real ebay data to give you price estimates.

## what it does

- take a pic of a denim jacket
- it extracts info like brand, condition, style, color, etc
- searches ebay data for similar jackets
- gives you a price range with confidence score

## architecture


- **image analyzer** - currently mock, will use gemini vision api
- **price estimator** - currently mock, will use ebay api  
- **storage** - saves images locally (can swap to s3/cloud later)

## setup

```bash
# install dependencies
npm install

# copy env file
cp .env.example .env

# build it
npm run build
```

## running it

```bash
# basic usage
npm start path/to/jacket-image.jpg

# or with ts-node for dev
npm run dev path/to/jacket-image.jpg
```

right now it's using mock data so you can test without api keys. when you're ready to use real apis:

1. **for gemini**: add your `GEMINI_API_KEY` to `.env` and swap `MockImageAnalyzer` with `GeminiImageAnalyzer` in `src/config.ts`
2. **for ebay**: add your ebay credentials to `.env` and swap `MockPriceEstimator` with `EbayPriceEstimator` in `src/config.ts`

## project structure

```
src/
  ├── types/primitives.ts          # core data types
  ├── interfaces/                   # black box interfaces
  │   ├── IImageAnalyzer.ts
  │   ├── IPriceEstimator.ts
  │   └── IImageStorage.ts
  ├── core/
  │   └── JacketPricingService.ts  # main orchestrator
  ├── implementations/              # swappable modules
  │   ├── MockImageAnalyzer.ts
  │   ├── MockPriceEstimator.ts
  │   └── LocalFileStorage.ts
  ├── config.ts                     # dependency injection
  └── index.ts                      # cli entry point
```

## example output

```
🧥 Denim Jacket Price Analyzer

📸 Loading image: test-levi-jacket.jpg
⏳ Processing...

  ✅ [MOCK] Image validation passed
  🔍 [MOCK] Analyzing image: test-levi-jacket.jpg
  💰 [MOCK] Estimating price for: Levi's
  💾 [Storage] Saved image: ./uploads/abc123.jpg

📊 ANALYSIS RESULTS

🏷️  JACKET DETAILS:
  Brand: Levi's
  Condition: good
  Style: Trucker Jacket
  Color: Medium Blue Wash
  Size: Large
  Material: 100% Cotton Denim
  Features: classic-fit, button-front, chest-pockets, adjustable-waist

💰 PRICE ESTIMATE:
  Range: USD $56 - $104
  Average: USD $80
  Confidence: 75%
  Based on: 47 listings
  Data Source: Mock eBay Data

✅ Done!
```

## next steps

- [ ] integrate real gemini vision api
- [ ] integrate real ebay developers api
- [ ] add web interface
- [ ] support other clothing types
- [ ] add historical price tracking

## notes

using black box architecture so any component can be replaced without touching the rest of the system. makes it easy to:
- swap apis
- add new data sources
- test with mocks
- maintain long term

basically just trying to keep it simple and modular 🤙



