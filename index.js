const fs = require('fs')
const express = require('express')
const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')
const ejs = require('ejs')
const path = require('path')
const moment = require('moment')

const app = express()
app.use(express.json())

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.json({
    message: 'PDF API'
  })
})

app.post('/generate-invoice', async (req, res) => {
  let { invoiceNo, customerName, date, items, total, paymentInfo } = req.body

  date = moment(date).format('dddd, D MMMM YYYY')

  items.map(i => {
    i.price = i.price.toLocaleString('en-US', { maximumFractionDigits: 0 })
  })

  total = total.toLocaleString('en-US', { maximumFractionDigits: 0 })
  
  try {
    const logoPath = path.join(__dirname, 'public', 'images', 'logo.png')
    const logoImage = fs.readFileSync(logoPath)
    const logo = `data:image/png;base64,${logoImage.toString('base64')}`

    const template = path.join(__dirname, 'templates', 'invoice.ejs')
    const html = await ejs.renderFile(template, {logo, customerName, invoiceNo, date, total, items, paymentInfo})

    console.log('Executable path:', await chromium.executablePath)

    const browser = await puppeteer.launch({
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      args: chromium.args
    })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    const pdfBuffer = await page.pdf({ format: 'A4' })
    await browser.close()

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice-${invoiceNo}.pdf`
    })

    res.send(pdfBuffer)
  } catch (err) {
    console.error(`Error: ${err}`)
    res.status(500).send(err)
  }
})

app.listen(3000, () => {
  console.log(`Application running on port 3000`)
})