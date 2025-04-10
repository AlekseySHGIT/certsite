import { Document, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

export async function generateDeclarationDoc(application) {
  try {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 },
            children: [
              new TextRun({
                text: "ЕВРАЗИЙСКИЙ ЭКОНОМИЧЕСКИЙ СОЮЗ",
                bold: true,
                size: 32
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 400 },
            children: [
              new TextRun({
                text: "ДЕКЛАРАЦИЯ О СООТВЕТСТВИИ",
                bold: true,
                size: 32
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 200, after: 200 },
            children: [
              new TextRun({
                text: "Заявитель ",
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Место нахождения и адрес места осуществления деятельности: ${application.legalAddress || 'г.Москва, Романшково - Уделеный проезд, д.10 офис 324'}, `
              }),
              new TextRun({
                text: `основной государственный регистрационный номер: ${application.ogrn || '1234567890123'}, `
              }),
              new TextRun({
                text: `номер телефона: ${application.phone || '+7 (495) 123-45-67'}, `
              }),
              new TextRun({
                text: `адрес электронной почты: ${application.email || 'manager@manager.cc'}`
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `в лице ${application.position || 'генерального директора'} ${application.applicant || 'Романшин - Ивановского Ивана Сергеевича'}`
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 200, after: 200 },
            children: [
              new TextRun({
                text: "заявляет, что",
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 200 },
            children: [
              new TextRun({
                text: "изготовитель",
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "Место нахождения и адрес места осуществления деятельности по изготовлению продукции:"
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: application.manufacturer || application.legalAddress || 'г.Москва, Романшково - Уделеный проезд, д.10 офис 324'
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "Продукция изготовлена в соответствии с «Общие технические условия»."
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Код ТН ВЭД ЕАЭС: ${application.tnvedCode || '8481 80 990 8'}`
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 200, after: 200 },
            children: [
              new TextRun({
                text: "соответствует требованиям",
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: application.technicalRegulation || 'ТР ТС 010/2011 "О безопасности машин и оборудования"'
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 200 },
            children: [
              new TextRun({
                text: "Декларация о соответствии принята на основании",
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Протокола испытаний № ${application.protocolNumber || '282'} от ${application.protocolDate || '05.07.2019'}г.,`
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `Выдан испытательной лабораторией ${application.laboratory || 'ООО ГК ОС «ПромБезопасность»'} (регистрационный номер аттестата аккредитации 12345),`
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 200 },
            children: [
              new TextRun({
                text: "Схема декларирования",
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: application.scheme || '1д'
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 200 },
            children: [
              new TextRun({
                text: "Дополнительная информация",
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: application.additionalInfo || 'Условия хранения продукции в соответствии с ГОСТ 15150-69. Срок хранения (службы, годности) указан в прилагаемой к продукции товаросопроводительной и/или эксплуатационной документации.'
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 200, after: 400 },
            children: [
              new TextRun({
                text: "Декларация о соответствии действительна с даты регистрации по включительно",
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 400, after: 200 },
            children: [
              new TextRun({
                text: "М. П.                                                                                    "
              }),
              new TextRun({
                text: application.applicant || 'Романшин - Ивановский И.С.',
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 200 },
            children: [
              new TextRun({
                text: "Регистрационный номер декларации о соответствии: ЕАЭС N RU Д-RU.РА01.",
                bold: true
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 200 },
            children: [
              new TextRun({
                text: "Дата регистрации декларации о соответствии: ",
                bold: true
              })
            ]
          })
        ]
      }]
    });

    const buffer = await doc.save();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, `declaration_${application.id || Date.now()}.docx`);
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  }
}
