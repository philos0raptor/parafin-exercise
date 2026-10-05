# GrubDash Embedded Capital Demo

This project demonstrates how GrubDash could integrate Parafin's embedded Capital experience into its platform.

The demo walks through four stages of the Capital lifecycle using Parafin's sandbox environment:

1. [No offer available](https://www.loom.com/share/d9d169412ec14e2a8e6cf050648b59d8)
2. [Pre-approved offer available](https://www.loom.com/share/89f6af5694d34266a26f03f623be0378)
3. [Capital on its way](https://www.loom.com/share/a9bf284c761b4fcb904ac8b815cad8dc)
4. [Accepted offer with an outstanding balance](https://www.loom.com/share/c34b7c56b2b54c889fbc17aa8ebc7a8c)

## Demo Overview

The application uses Parafin's embedded Capital experience and sandbox APIs to demonstrate how the UI responds as a business moves through the Capital lifecycle.

The accompanying Loom video shows each state and the steps used to trigger it.

## Running Locally

### Prerequisites

- Node.js
- npm
- Parafin sandbox API credentials
- A sandbox Person associated with a Business

### Clone and install dependencies
```bash
git clone https://github.com/buildparafin/embedded-demo.git
cd embedded-demo
npm install
```

### Set up credentials
Copy sample.env to .env and fill in your sandbox API keys from [Settings → API keys](https://dashboard.parafin.com/settings/api-keys):
```bash
cp sample.env .env
```
```bash
# Capital product credentials
PARAFIN_CLIENT_ID="<your-capital-client-id>"
PARAFIN_CLIENT_SECRET="<your-capital-client-secret>"

# Pay Over Time + Order Checkout credentials
BNPL_CLIENT_ID="<your-bnpl-client-id>"
BNPL_CLIENT_SECRET="<your-bnpl-client-secret>"
```
### Configure sandbox IDs
`src/config.js` - Open  and replace the capital placeholder (person_xxx) value with your own:
```bash
const config = {
  capital: {
    personId: "person_xxx",          // person_id for the Capital widget
```
### Run the app locally
``` bash
npm run dev
```
- Open http://localhost:3000
