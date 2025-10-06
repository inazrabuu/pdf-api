# PDF API
A lightweight **public service API** that dynamically generates **professional PDF invoices** from JSON input.  

Perfect for e-commerce platforms, billing systems, or any app that needs quick, customizable invoice generation.

Feel free to use it and make change of it.

## Overview

This API accepts a structured JSON payload containing customer, item, and payment details and returns a **ready-to-download PDF invoice**.  

Built with **Node.js** and **Express**, it’s fast, simple, and easy to integrate with any system.

---

## Example Request

### Endpoint

`POST /generate-invoice`

### Request Body (JSON)
```json
{
  "invoiceNo": "000000034",
  "customerName": "Volodimir Zelensky",
  "date": "2025-04-20 14:30:00",
  "total": 1000000,
  "items": [
    { "name": "V-neck T-shirts", "qty": 5, "price": 750000 },
    { "name": "Earring Silver", "qty": 1, "price": 200000 },
    { "name": "Necklace", "qty": 1, "price": 50000 }
  ],
  "paymentInfo": [
    "Mandiri 1234567890",
    "Vladimir Putin"
  ]
}
```

Example cURL
```bash
curl -X POST https://api.example.com/invoice \
  -H "Content-Type: application/json" \
  -d '{
    "invoiceNo": "000000034",
    "customerName": "Volodimir Zelensky",
    "date": "2025-04-20 14:30:00",
    "total": 1000000,
    "items": [
      { "name": "V-neck T-shirts", "qty": 5, "price": 750000 },
      { "name": "Earring Silver", "qty": 1, "price": 200000 },
      { "name": "Necklace", "qty": 1, "price": 50000 }
    ],
    "paymentInfo": [
      "Mandiri 1234567890",
      "Vladimir Putin"
    ]
  }' --output invoice-000000034.pdf
```
Response
```bash
Content-Type: application/pdf
Content-Disposition: attachment; filename=invoice-000000034.pdf
```

## Features

- Auto-Generated PDF Invoices. Create ready-to-print invoices in seconds.
- Fast & Stateless. No storage or database required — PDFs are generated on the fly.
- Clean JSON Interface. Simple, well-structured input for easy integration with any app or backend.
- Customizable Templates. Modify the layout, colors, and typography with minimal effort.
- Secure & Lightweight. Input validation and rate limiting ensure stability in public environments.

## Steps to run
- clone this repo
- cd to the cloned directory
- `npm install`
- `node index.js`