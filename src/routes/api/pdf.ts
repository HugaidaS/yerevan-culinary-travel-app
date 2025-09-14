import { createServerFileRoute } from '@tanstack/react-start/server'
import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
// import puppeteer from 'puppeteer' // - this works locally

export const ServerRoute = createServerFileRoute('/api/pdf').methods({
  POST: async ({ request }) => {
    try {
      const { htmlContent } = await request.json()

      // Launch Puppeteer in headless mode

      // const browser = await puppeteer.launch({ headless: true }) // - this works locally
      const browser = await puppeteer.launch({
        args: puppeteer.defaultArgs({ args: chromium.args }),
        executablePath: await chromium.executablePath(),
        headless: 'shell',
      })

      const page = await browser.newPage()

      // Set HTML content
      await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' })

      // Generate PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
      })

      await browser.close()

      return new Response(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="itinerary.pdf"',
        },
      })
    } catch (error) {
      console.error('Error generating PDF:', error)
      return new Response('Internal Server Error', { status: 500 })
    }
  },
})

// import { createServerFileRoute } from '@tanstack/react-start/server'
// import chromium from '@sparticuz/chromium'
// import puppeteer from 'puppeteer-core'

// export const ServerRoute = createServerFileRoute('/api/pdf').methods({
//   POST: async ({ request }) => {
//     try {
//       const { htmlContent } = await request.json()

//       const browser = await puppeteer.launch({
//         args: chromium.args,
//         executablePath: await chromium.executablePath(),
//         headless: true, // you control this flag directly
//       })

//       const page = await browser.newPage()

//       await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

//       const pdfBuffer = await page.pdf({
//         format: 'A4',
//         printBackground: true,
//         margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
//       })

//       await browser.close()

//       return new Response(pdfBuffer, {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/pdf',
//           'Content-Disposition': 'attachment; filename="itinerary.pdf"',
//         },
//       })
//     } catch (error) {
//       console.error('Error generating PDF:', error)
//       return new Response('Internal Server Error', { status: 500 })
//     }
//   },
// })
