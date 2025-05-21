import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, VerticalAlign, TabStopType, HeightRule } from 'docx';
import { saveAs } from 'file-saver';

/**
 * Generate an invoice PDF based on application data
 * @param {Object} application - The application data
 * @returns {Blob} - PDF file as a Blob
 */
export const generateInvoice = (application) => {
  // Create a new PDF document
  const doc = new jsPDF();
  
  // Set font to support Cyrillic characters
  doc.setFont('helvetica');
  
  // Add company logo (red building icon)
  // This would be a base64 encoded image in a real implementation
  // For now, we'll draw a simple red square as a placeholder
  doc.setFillColor(231, 76, 60); // Red color similar to the logo
  doc.rect(15, 15, 20, 20, 'F');
  
  // Bank information table
  doc.setFontSize(10);
  doc.setDrawColor(0);
  doc.setLineWidth(0.1);
  
  // Table headers and cells
  const tableTop = 15;
  const tableLeft = 50;
  const colWidths = [75, 30, 45];
  
  // First row - Bank name and BIK
  doc.rect(tableLeft, tableTop, colWidths[0], 10, 'S');
  doc.rect(tableLeft + colWidths[0], tableTop, colWidths[1], 10, 'S');
  doc.rect(tableLeft + colWidths[0] + colWidths[1], tableTop, colWidths[2], 10, 'S');
  
  doc.text('ООО "Банк Точка" г. Москва', tableLeft + 2, tableTop + 6);
  doc.text('БИК', tableLeft + colWidths[0] + 2, tableTop + 6);
  doc.text('044525104', tableLeft + colWidths[0] + colWidths[1] + 2, tableTop + 6);
  
  // Second row - Account number
  doc.rect(tableLeft, tableTop + 10, colWidths[0], 10, 'S');
  doc.rect(tableLeft + colWidths[0], tableTop + 10, colWidths[1], 10, 'S');
  doc.rect(tableLeft + colWidths[0] + colWidths[1], tableTop + 10, colWidths[2], 10, 'S');
  
  doc.text('Банк получателя', tableLeft + 2, tableTop + 16);
  doc.text('Сч. №', tableLeft + colWidths[0] + 2, tableTop + 16);
  doc.text('30101810745374525104', tableLeft + colWidths[0] + colWidths[1] + 2, tableTop + 16);
  
  // Third row - INN and KPP
  doc.rect(tableLeft, tableTop + 20, colWidths[0], 10, 'S');
  doc.rect(tableLeft + colWidths[0], tableTop + 20, colWidths[1], 10, 'S');
  doc.rect(tableLeft + colWidths[0] + colWidths[1], tableTop + 20, colWidths[2], 10, 'S');
  
  doc.text('ИНН    5027291204', tableLeft + 2, tableTop + 26);
  doc.text('КПП 502701001', tableLeft + colWidths[0] + 2, tableTop + 26);
  doc.text('Сч. №', tableLeft + colWidths[0] + colWidths[1] + 2, tableTop + 26);
  
  // Fourth row - Company name and account number
  doc.rect(tableLeft, tableTop + 30, colWidths[0], 10, 'S');
  doc.rect(tableLeft + colWidths[0], tableTop + 30, colWidths[1] + colWidths[2], 10, 'S');
  
  doc.text('ООО ГК ОС "ПРОМБЕЗОПАСНОСТЬ"', tableLeft + 2, tableTop + 36);
  doc.text('40702810302500084074', tableLeft + colWidths[0] + colWidths[1] + 2, tableTop + 36);
  
  // Fifth row - Recipient
  doc.rect(tableLeft, tableTop + 40, colWidths[0], 10, 'S');
  doc.rect(tableLeft + colWidths[0], tableTop + 40, colWidths[1] + colWidths[2], 10, 'S');
  
  doc.text('Получатель', tableLeft + 2, tableTop + 46);
  
  // Title
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  
  // Get current date
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = currentDate.getMonth() + 1;
  let monthName = '';
  
  // Convert month number to Russian month name
  switch(month) {
    case 1: monthName = 'января'; break;
    case 2: monthName = 'февраля'; break;
    case 3: monthName = 'марта'; break;
    case 4: monthName = 'апреля'; break;
    case 5: monthName = 'мая'; break;
    case 6: monthName = 'июня'; break;
    case 7: monthName = 'июля'; break;
    case 8: monthName = 'августа'; break;
    case 9: monthName = 'сентября'; break;
    case 10: monthName = 'октября'; break;
    case 11: monthName = 'ноября'; break;
    case 12: monthName = 'декабря'; break;
  }
  
  const year = currentDate.getFullYear();
  
  // Create invoice number with application ID or current date if no ID
  const invoiceNumber = application.id || '26';
  
  doc.text(`Счет на оплату № ${invoiceNumber} от ${day} ${monthName} ${year} г.`, 15, 70);
  doc.line(15, 75, 195, 75); // Horizontal line
  
  // Supplier information
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Поставщик', 15, 85);
  doc.setFont('helvetica', 'bold');
  doc.text('ООО ГК ОС "ПРОМБЕЗОПАСНОСТЬ", ИНН 5027291204, КПП 502701001, 140002,', 70, 85);
  doc.text('(Исполнитель)', 15, 90);
  doc.text('Московская область, г Люберцы, пр-кт Октябрьский, д. 121, к. 1, кв. 42, тел.: +7 977', 70, 90);
  doc.text('363-84-63', 70, 95);
  
  // Customer information
  doc.setFont('helvetica', 'normal');
  doc.text('Покупатель', 15, 105);
  doc.setFont('helvetica', 'bold');
  
  // Use application data for customer info if available
  const customerName = application.applicant || 'ООО КОМПАНИЯ "СТАТУС"';
  const customerINN = application.inn || '0276138366';
  const customerKPP = application.kpp || '027401001';
  const customerAddress = application.legalAddress || 'Республика Башкортостан, г.о. Город Уфа, г Уфа, ул Гоголя, дом 21, офис 16';
  const customerPhone = application.phone || '+7 (929) 9511828';
  
  doc.text(`${customerName}, ИНН ${customerINN}, КПП ${customerKPP}, 450076, Республика`, 70, 105);
  doc.text('(Заказчик):', 15, 110);
  doc.text(`Башкортостан, г.о. Город Уфа, г Уфа, ул Гоголя, дом 21, офис 16, тел.: ${customerPhone}`, 70, 110);
  
  // Order basis
  doc.setFont('helvetica', 'normal');
  doc.text('Основание:', 15, 120);
  doc.setFont('helvetica', 'bold');
  
  // Use application data for order basis if available
  const orderNumber = application.id ? `${application.id}/ПМБТ-Ех` : '245/ПМБТ-Ех';
  const orderDate = '07.04.2025'; // Fixed date for the example
  
  doc.text(`${orderNumber} от ${orderDate}`, 70, 120);
  
  // Table for services
  const tableStartY = 130;
  const tableColWidths = [15, 350, 40, 30, 40, 40]; // Adjusted to fit page
  let tableCurrentY = tableStartY;
  
  // Table header
  doc.rect(15, tableCurrentY, tableColWidths[0], 10, 'S');
  doc.rect(15 + tableColWidths[0], tableCurrentY, 100, 10, 'S');
  doc.rect(15 + tableColWidths[0] + 100, tableCurrentY, 25, 10, 'S');
  doc.rect(15 + tableColWidths[0] + 100 + 25, tableCurrentY, 20, 10, 'S');
  doc.rect(15 + tableColWidths[0] + 100 + 25 + 20, tableCurrentY, 35, 10, 'S');
  
  doc.setFontSize(8);
  doc.text('№', 15 + tableColWidths[0]/2, tableCurrentY + 6, { align: 'center' });
  doc.text('Товары (работы, услуги)', 15 + tableColWidths[0] + 50, tableCurrentY + 6, { align: 'center' });
  doc.text('Кол-во', 15 + tableColWidths[0] + 100 + 12.5, tableCurrentY + 6, { align: 'center' });
  doc.text('Ед.', 15 + tableColWidths[0] + 100 + 25 + 10, tableCurrentY + 6, { align: 'center' });
  doc.text('Цена', 15 + tableColWidths[0] + 100 + 25 + 20 + 17.5, tableCurrentY + 6, { align: 'center' });
  doc.text('Сумма', 15 + tableColWidths[0] + 100 + 25 + 20 + 35 + 17.5, tableCurrentY + 6, { align: 'center' });
  
  // Table data
  tableCurrentY += 10;
  const serviceDescription = application.title 
    ? `Услуги по подтверждению соответствия продукции: ${application.title}`
    : 'Услуги по подтверждению соответствия продукции: инфракрасный термометр, изготовленный в соответствии с требованиями ТР ТС 012/2011 в соответствии со схемой сертификации 1с, согласно Приложения №1 от 07.04.2025 г. к договору №245/ПМБТ-Ех от 07.04.2025 г.';
  
  // Split text to fit in cell
  const textLines = doc.splitTextToSize(serviceDescription, 100);
  const textHeight = textLines.length * 5; // Approximate height based on number of lines
  
  doc.rect(15, tableCurrentY, tableColWidths[0], textHeight, 'S');
  doc.rect(15 + tableColWidths[0], tableCurrentY, 100, textHeight, 'S');
  doc.rect(15 + tableColWidths[0] + 100, tableCurrentY, 25, textHeight, 'S');
  doc.rect(15 + tableColWidths[0] + 100 + 25, tableCurrentY, 20, textHeight, 'S');
  doc.rect(15 + tableColWidths[0] + 100 + 25 + 20, tableCurrentY, 35, textHeight, 'S');
  
  doc.text('1', 15 + tableColWidths[0]/2, tableCurrentY + 6, { align: 'center' });
  doc.text(textLines, 15 + tableColWidths[0] + 2, tableCurrentY + 6);
  doc.text('1', 15 + tableColWidths[0] + 100 + 12.5, tableCurrentY + 6, { align: 'center' });
  doc.text('усл. ед', 15 + tableColWidths[0] + 100 + 25 + 10, tableCurrentY + 6, { align: 'center' });
  doc.text('210 000,00', 15 + tableColWidths[0] + 100 + 25 + 20 + 17.5, tableCurrentY + 6, { align: 'center' });
  doc.text('210 000,00', 15 + tableColWidths[0] + 100 + 25 + 20 + 35 + 17.5, tableCurrentY + 6, { align: 'center' });
  
  // Update current Y position after the table
  tableCurrentY += textHeight + 10;
  
  // Total amount
  doc.text('Итого:', 150, tableCurrentY);
  doc.text('210 000,00', 180, tableCurrentY);
  
  tableCurrentY += 5;
  doc.text('Без налога (НДС)', 150, tableCurrentY);
  doc.text('-', 180, tableCurrentY);
  
  tableCurrentY += 5;
  doc.text('Всего к оплате:', 150, tableCurrentY);
  doc.text('210 000,00', 180, tableCurrentY);
  
  // Total in words
  tableCurrentY += 10;
  doc.text('Всего наименований 1, на сумму 210 000,00 руб.', 15, tableCurrentY);
  doc.setFont('helvetica', 'bold');
  tableCurrentY += 5;
  doc.text('Двести десять тысяч рублей 00 копеек', 15, tableCurrentY);
  
  // Payment deadline
  doc.setFont('helvetica', 'normal');
  tableCurrentY += 10;
  doc.text('Оплатить не позднее 11.04.2025', 15, tableCurrentY);
  
  // Signature line
  tableCurrentY += 15;
  doc.line(15, tableCurrentY, 195, tableCurrentY);
  
  tableCurrentY += 15;
  doc.text('Руководитель', 15, tableCurrentY);
  doc.text('Ваньков Д. В.', 100, tableCurrentY);
  
  doc.text('Бухгалтер', 15, tableCurrentY + 10);
  doc.text('Ваньков Д. В.', 100, tableCurrentY + 10);
  
  // Add a simple stamp image (circle)
  doc.setDrawColor(0, 0, 128); // Dark blue color for the stamp
  doc.setLineWidth(0.5);
  doc.circle(40, tableCurrentY + 25, 15);
  
  // Return the PDF as a blob
  return doc.output('blob');
};

/**
 * Generate a DOCX invoice with professional styling
 * @param {Object} application - The application data
 * @returns {Promise<Blob>} - DOCX file as a Blob
 */
export const generateDocxInvoice = async (application) => {
  // Get current date
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = currentDate.getMonth() + 1;
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  const monthName = months[month - 1];
  const year = currentDate.getFullYear();
  
  // Supplier info
  const supplierName = 'ООО ГК ОС "ПРОМБЕЗОПАСНОСТЬ"';
  const supplierINN = '5027291204';
  const supplierKPP = '502701001';
  const supplierAddress = '140002, Московская область, г.Люберцы, пр-кт Октябрьский, д. 121, к. 1, кв. 42';
  const supplierPhone = '+7 977 363-84-63';
  
  // Customer info
  const customerName = application.applicant || 'ООО КОМПАНИЯ "СТАТУС"';
  const customerINN = application.inn || '0276138366';
  const customerKPP = application.kpp || '027401001';
  const customerAddress = application.legalAddress || '450076, Республика Башкортостан, г.о. Город Уфа, г Уфа, ул Гоголя, дом 21, офис 16';
  const customerPhone = application.phone || '(929) 9511828';
  
  // Invoice details
  const invoiceNumber = application.id || 'app-569';
  const orderNumber = application.id ? `${application.id}/ПМБТ-Ех` : 'app-569/ПМБТ-Ех';
  const orderDate = '07.04.2025';
  const paymentDueDate = '11.04.2025';
  
  // Common styles
  const defaultFont = 'Times New Roman';
  const fontSize = 10;
  const smallFontSize = 9;
  
  // Helper function to create a cell with text
  const createCell = (text, options = {}) => {
    return new TableCell({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text,
              size: options.fontSize || fontSize * 2, // docx uses half-points
              font: defaultFont,
              bold: options.bold,
              color: options.color
            })
          ],
          alignment: options.alignment || AlignmentType.LEFT,
          spacing: { line: 240 } // 12pt line spacing
        })
      ],
      borders: options.borders || {
        top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
        left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
        right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
      },
      width: options.width,
      verticalAlign: VerticalAlign.CENTER,
      margins: {
        top: 40,    // 20pt
        bottom: 40, // 20pt
        left: 60,   // 30pt
        right: 60   // 30pt
      }
    });
  };
  
  // Helper function to create a horizontal line
  const createHorizontalLine = () => {
    return new Paragraph({
      children: [
        new TextRun({
          text: '_'.repeat(90),
          color: '000000'
        })
      ],
      spacing: { before: 120, after: 120 } // 6pt before and after
    });
  };
  
  // Create document
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 850,      // 1.5 cm
            bottom: 850,   // 1.5 cm
            left: 1134,    // 2 cm
            right: 1134,   // 2 cm
            header: 720,   // 1.27 cm
            footer: 720,   // 1.27 cm
            gutter: 0
          }
        }
      },
      children: [
        // Logo and Bank Info Top Section
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
          rows: [
            new TableRow({
              children: [
                // Empty cell for spacing
                new TableCell({
                  children: [new Paragraph({})],
                  width: { size: 15, type: WidthType.PERCENTAGE },
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }
                }),
                // Bank Info Table
                new TableCell({
                  children: [
                    new Table({
                      width: { size: 100, type: WidthType.PERCENTAGE },
                      rows: [
                        new TableRow({
                          children: [
                            createCell('ООО "Банк Точка" г. Москва', {}),
                            createCell('БИК', {}),
                            createCell('044525104', {})
                          ]
                        }),
                        new TableRow({
                          children: [
                            createCell('Банк получателя', {}),
                            createCell('Сч. №', {}),
                            createCell('30101810745374525104', {})
                          ]
                        }),
                        new TableRow({
                          children: [
                            createCell('ИНН', {}),
                            createCell('КПП', {}),
                            createCell('502701001', {})
                          ]
                        }),
                        new TableRow({
                          children: [
                            createCell('ООО ГК ОС "ПРОМБЕЗОПАСНОСТЬ"', {}),
                            createCell('Сч. №', {}),
                            createCell('40702810302500084074', {})
                          ]
                        }),
                        new TableRow({
                          children: [
                            createCell('Получатель', {})
                          ]
                        })
                      ]
                    })
                  ],
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }
                })
              ]
            }),
            // Logo Row
            new TableRow({
              children: [
                // Logo cell
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: '□', // Placeholder for red square logo
                          color: 'FF0000',
                          size: 48,
                          font: defaultFont
                        })
                      ],
                      alignment: AlignmentType.CENTER
                    })
                  ],
                  width: { size: 10, type: WidthType.PERCENTAGE },
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  verticalAlign: VerticalAlign.CENTER
                }),
                // Empty space
                new TableCell({
                  children: [new Paragraph({})],
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }
                })
              ]
            })
          ]
        }),
        
        new Paragraph({
          children: [
            new TextRun({ text: 'Поставщик (Исполнитель): ', size: fontSize * 2, font: defaultFont }),
            new TextRun({ text: `${supplierName}, ИНН ${supplierINN}, КПП ${supplierKPP}, `, size: fontSize * 2, font: defaultFont }),
            new TextRun({ text: `${supplierAddress}, тел.: ${supplierPhone}`, size: fontSize * 2, font: defaultFont })
          ],
          spacing: { after: 100 }
        }),
        
        // Customer info block
        new Paragraph({
          children: [
            new TextRun({ text: 'Покупатель (Заказчик): ', size: fontSize * 2, font: defaultFont }),
            new TextRun({ text: `${customerName}, ИНН ${customerINN}, КПП ${customerKPP}, `, size: fontSize * 2, font: defaultFont }),
            new TextRun({ text: `${customerAddress}, тел.: ${customerPhone}`, size: fontSize * 2, font: defaultFont })
          ],
          spacing: { after: 100 }
        }),
        
        // Order basis
        new Paragraph({
          children: [
            new TextRun({ text: 'Основание: ', size: fontSize * 2, font: defaultFont }),
            new TextRun({ text: `${orderNumber} от ${orderDate}`, size: fontSize * 2, font: defaultFont })
          ],
          spacing: { after: 100 }
        }),
        
        // Invoice title
        new Paragraph({
          children: [
            new TextRun({ text: `Счет на оплату № ${invoiceNumber} от 21 мая 2025 г.`, bold: true, size: 12 * 2, font: defaultFont })
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 200 }
        }),
        
        // Customer-Supplier-Order details table
        // Customer-Supplier-Order details table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createCell('Поставщик (Исполнитель):', {}),
                createCell(`${supplierName}, ИНН ${supplierINN}, КПП ${supplierKPP}`, {})
              ]
            }),
            new TableRow({
              children: [
                createCell('Покупатель (Заказчик):', {}),
                createCell(`${customerName}, ИНН ${customerINN}`, {})
              ]
            }),
            new TableRow({
              children: [
                createCell('Основание:', {}),
                createCell(`${orderNumber} от ${orderDate}`, {})
              ]
            })
          ]
        }),
        
        // Items table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            // Header row
            new TableRow({
              children: [
                createCell('№', { bold: true, alignment: AlignmentType.CENTER }),
                createCell('Товары (работы, услуги)', { bold: true, alignment: AlignmentType.CENTER }),
                createCell('Кол-во', { bold: true, alignment: AlignmentType.CENTER }),
                createCell('Ед.', { bold: true, alignment: AlignmentType.CENTER }),
                createCell('Цена', { bold: true, alignment: AlignmentType.CENTER }),
                createCell('Сумма', { bold: true, alignment: AlignmentType.CENTER })
              ]
            }),
            
            // Item row
            new TableRow({
              children: [
                createCell('1', { alignment: AlignmentType.CENTER }),
                createCell('Услуги по подтверждению соответствия продукции: инфракрасный термометр, изготовленный в соответствии', {}),
                createCell('1', { alignment: AlignmentType.CENTER }),
                createCell('усл.ед.', { alignment: AlignmentType.CENTER }),
                createCell('210 000,00', { alignment: AlignmentType.RIGHT }),
                createCell('210 000,00', { alignment: AlignmentType.RIGHT })
              ]
            })
          ]
        }),
        
        // Totals table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                createCell('Итого:', { alignment: AlignmentType.RIGHT }),
                createCell('210 000,00', { alignment: AlignmentType.RIGHT })
              ]
            }),
            new TableRow({
              children: [
                createCell('Без налога (НДС)', { alignment: AlignmentType.RIGHT }),
                createCell('-', { alignment: AlignmentType.RIGHT })
              ]
            }),
            new TableRow({
              children: [
                createCell('Всего к оплате:', { alignment: AlignmentType.RIGHT }),
                createCell('210 000,00', { alignment: AlignmentType.RIGHT })
              ]
            })
          ]
        }),
        // Supplier/Customer/Reason as bold label + value
        new Paragraph({
          children: [ new TextRun({ text: 'Поставщик (Исполнитель): ', bold: true, font: defaultFont, size: fontSize * 2 }), new TextRun({ text: 'ООО ГК ОС "ПРОМБЕЗОПАСНОСТЬ", ИНН 5027291204, КПП 502701001, 140002, Московская область, г Люберцы, пр-кт Октябрьский, д. 121, к. 1, кв. 42, тел.: +7 977 363-84-63', font: defaultFont, size: fontSize * 2 }) ],
          spacing: { after: 80 }
        }),
        new Paragraph({
          children: [ new TextRun({ text: 'Покупатель (Заказчик): ', bold: true, font: defaultFont, size: fontSize * 2 }), new TextRun({ text: 'ООО КОМПАНИЯ "СТАТУС", ИНН 0276138366, КПП 027401001, 450076, Республика Башкортостан, г.о. Город Уфа, г Уфа, ул Гоголя, дом 21, офис 16, тел.: (929) 9511828', font: defaultFont, size: fontSize * 2 }) ],
          spacing: { after: 80 }
        }),
        new Paragraph({
          children: [ new TextRun({ text: 'Основание: ', bold: true, font: defaultFont, size: fontSize * 2 }), new TextRun({ text: `${orderNumber} от ${orderDate}`, font: defaultFont, size: fontSize * 2 }) ],
          spacing: { after: 200 }
        }),
        
        // Invoice title
        new Paragraph({
          children: [
            new TextRun({
              text: `Счет на оплату № ${invoiceNumber} от ${day} ${monthName} ${year} г.`,
              bold: true,
              size: 12 * 2, // 12pt in half-points
              font: defaultFont
            })
          ],
          alignment: AlignmentType.LEFT,
          spacing: { before: 400, after: 200 } // 20pt before, 10pt after
        }),
        
        // Horizontal line
        createHorizontalLine(),
        
        // Two-column layout for supplier/customer info
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
          rows: [
            // Supplier row
            new TableRow({
              children: [
                createCell('Поставщик\n(Исполнитель):', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 20, type: WidthType.PERCENTAGE }
                }),
                createCell('ООО ГК ОС "ПРОМБЕЗОПАСНОСТЬ", ИНН 5027291204, КПП 502701001, 140002,\nМосковская область, г Люберцы, пр-кт Октябрьский, д. 121, к. 1, кв. 42, тел.: +7 977 363-84-63', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 80, type: WidthType.PERCENTAGE }
                })
              ],
              height: { value: 600, rule: HeightRule.EXACT } // Set exact height for proper spacing
            }),
            // Customer row
            new TableRow({
              children: [
                createCell('Покупатель\n(Заказчик):', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 20, type: WidthType.PERCENTAGE }
                }),
                createCell(`${customerName}, ИНН ${customerINN}, КПП ${customerKPP}, 450076, Республика\nБашкортостан, г.о. Город Уфа, г Уфа, ул Гоголя, дом 21, офис 16, тел.: ${customerPhone}`, { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 80, type: WidthType.PERCENTAGE }
                })
              ],
              height: { value: 600, rule: HeightRule.EXACT } // Set exact height for proper spacing
            }),
            // Order basis row
            new TableRow({
              children: [
                createCell('Основание:', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 20, type: WidthType.PERCENTAGE }
                }),
                createCell(`${orderNumber} от ${orderDate}`, { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 80, type: WidthType.PERCENTAGE }
                })
              ],
              height: { value: 400, rule: HeightRule.EXACT } // Set exact height for proper spacing
            })
          ]
        }),
        
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
          rows: [
            new TableRow({
              children: [
                createCell('', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 70, type: WidthType.PERCENTAGE }
                }),
                createCell('Итого:', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 15, type: WidthType.PERCENTAGE }
                }),
                createCell('210 000,00', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 15, type: WidthType.PERCENTAGE },
                  alignment: AlignmentType.RIGHT
                })
              ]
            }),
            new TableRow({
              children: [
                createCell('', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 70, type: WidthType.PERCENTAGE }
                }),
                createCell('Без налога (НДС)', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 15, type: WidthType.PERCENTAGE }
                }),
                createCell('-', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 15, type: WidthType.PERCENTAGE },
                  alignment: AlignmentType.RIGHT
                })
              ]
            }),
            new TableRow({
              children: [
                createCell('', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 70, type: WidthType.PERCENTAGE }
                }),
                createCell('Всего к оплате:', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 15, type: WidthType.PERCENTAGE }
                }),
                createCell('210 000,00', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                  width: { size: 15, type: WidthType.PERCENTAGE },
                  alignment: AlignmentType.RIGHT
                })
              ]
            })
          ]
        }),
        
        // Amount in words
        new Paragraph({
          children: [
            new TextRun({
              text: 'Всего наименований 1, на сумму 210 000,00 руб.',
              size: fontSize * 2,
              font: defaultFont
            })
          ],
          spacing: { before: 200, after: 80 }
        }),
        
        new Paragraph({
          children: [
            new TextRun({
              text: 'Двести десять тысяч рублей 00 копеек',
              size: fontSize * 2,
              font: defaultFont,
              bold: true
            })
          ],
          spacing: { before: 0, after: 200 }
        }),
        
        // Payment deadline
        new Paragraph({
          children: [
            new TextRun({
              text: 'Оплатить не позднее 11.04.2025',
              size: fontSize * 2,
              font: defaultFont
            })
          ],
          spacing: { before: 0, after: 400 }
        }),
        
        // Horizontal line
        createHorizontalLine(),
        
        // Signatures with signature images
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
          columnWidths: [1500, 3000, 1500],
          rows: [
            new TableRow({
              children: [
                createCell('Руководитель', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }
                }),
                // Signature line with text
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: '~', size: 24, font: defaultFont, color: 'AAAAAA' })
                      ],
                      alignment: AlignmentType.CENTER
                    })
                  ],
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }
                }),
                createCell('Ваньков Д. В.', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }
                })
              ]
            }),
            new TableRow({
              children: [
                createCell('Бухгалтер', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }
                }),
                // Signature line with text
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: '~', size: 24, font: defaultFont, color: 'AAAAAA' })
                      ],
                      alignment: AlignmentType.CENTER
                    })
                  ],
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }
                }),
                createCell('Ваньков Д. В.', { 
                  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }
                })
              ]
            })
          ]
        }),
        
        // Stamp (blue circle)
        new Paragraph({
          children: [
            new TextRun({
              text: '○',
              size: 120, // 60pt
              color: '0000AA',
              font: defaultFont
            })
          ],
          alignment: AlignmentType.LEFT,
          spacing: { before: 200 }
        })
      ]
    }]
  });
  
  // Generate the document
  const blob = await Packer.toBlob(doc);
  return blob;
};

/**
 * Generate and download an invoice for an application
 * @param {Object} application - The application data
 * @param {string} [format='pdf'] - The output format ('pdf' or 'docx')
 */
export const downloadInvoice = async (application, format = 'pdf') => {
  let blob;
  let extension;
  
  if (format.toLowerCase() === 'docx') {
    blob = await generateDocxInvoice(application);
    extension = 'docx';
  } else {
    blob = generateInvoice(application);
    extension = 'pdf';
  }
  
  // Create a filename
  const fileName = application.title 
    ? `Счет_${application.title.replace(/\\s+/g, '_')}.${extension}`
    : `Счет_${application.id || 'заявка'}.${extension}`;
  
  // Save the file
  saveAs(blob, fileName);
};
