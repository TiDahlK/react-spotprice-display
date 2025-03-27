# React Nordpool Data Visualization

## Overview

This is a **React-based** project that fetches electricity market data from **Nordpool** and visualizes it using charts from **MUI**. The project is deployed on **Vercel** and leverages several Vercel services, including **Vercel Functions**, **Vercel Blob Store**, and **Vercel Cron Jobs**.

## Features

- **Automated Data Fetching**: A Vercel cron job runs every night at approximately **00:00**, fetching the latest Nordpool data.
- **Data Storage**: The fetched data is stored in **Vercel Blob Store** for efficient access.
- **AI-Based Analysis**: The system leverages the **OpenAI API** to generate an analysis for each Swedish price area using **Spot Price data, Energy Mix, and Exchange data**.
- **API Functions**: Vercel functions act as an API layer, retrieving stored data from the blob store when requested by the client.
- **Interactive Charts**: The frontend visualizes the data using **MUI charts**, providing an intuitive and interactive user experience.
- **Deployed on Vercel**: The entire application (frontend and backend functions) runs seamlessly on **Vercel**, ensuring scalability and reliability.

## Architecture

1. **Vercel Cron Jobs**: Scheduled to run at **00:00**, fetching data from Nordpool.
2. **Vercel Blob Store**: Stores the fetched data for later retrieval.
3. **Vercel Functions**: Handle API requests, fetching the required data from the blob store.
4. **AI Analysis**: Uses the **OpenAI API** to analyze the **Spot Price data, Energy Mix, and Exchange data** for each Swedish price area.
5. **React Frontend**: Calls the API functions and visualizes the retrieved data using **MUI charts**.

## Deployment

The project is deployed on Vercel and can be accessed at: [Spot Price Visualization](https://spotprice.tim-made-this.com/).

Any new updates pushed to the repository are automatically built and deployed.

## Getting Started

### Prerequisites

- Node.js & npm installed
- A Vercel account
- Vercel CLI installed

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/TiDahlK/react-spotprice-display.git
   cd react-spotprice-display
   ```
2. Install dependencies:
   ```sh
   cd ui
   npm install
   ```
3. Run the development server:
   ```sh
   vercel dev
   ```
4. Deploy to Vercel:
   ```sh
   vercel
   ```

## API Endpoints

### Cron Job Endpoints

- **GET /api/cron-functions/updateNordpoolData** - Fetches and updates import/export exchange data, the energy mix data and spot prices.
- **GET /api/cron-functions/updateAiAnalysis** - Runs AI-based analysis using OpenAI and updates data.

### Data Retrieval Endpoints

- **GET /api/getSpotPrices** - Retrieves the latest stored spot price data.
- **GET /api/getEnergyMix** - Retrieves the latest stored energy mix data.
- **GET /api/getImportExport** - Retrieves the latest stored import/export data.
- **GET /api/getAnalysis** - Retrieves the latest AI-based analysis data for each Swedish price area.

## Technologies Used

- **React** (Frontend UI)
- **MUI Charts** (Data Visualization)
- **Vercel Functions** (API Backend)
- **Vercel Blob Store** (Data Storage)
- **Vercel Cron Jobs** (Automated Data Fetching)
- **Nordpool API** (Data Source)
- **OpenAI API** (AI Analysis)
