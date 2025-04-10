import { Document, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx'
import { saveAs } from 'file-saver'

export function generateTemplateDoc() {
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
              text: "Заявитель {applicant}",
              bold: true
            })
          ]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "Место нахождения и адрес места осуществления деятельности: {legalAddress}, "
            }),
            new TextRun({
              text: "основной государственный регистрационный номер: {ogrn}, "
            }),
            new TextRun({
              text: "номер телефона: {phone}, "
            }),
            new TextRun({
              text: "адрес электронной почты: {email}"
            })
          ]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "в лице {position} {applicant}"
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
              text: "{manufacturer}"
            })
          ]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "{productInfo}"
            })
          ]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "Код ТН ВЭД ЕАЭС: {tnvedCode}"
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
              text: "{technicalRegulation}"
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
              text: "Протокола испытаний № {protocolNumber} от {protocolDate}г.,"
            })
          ]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: "Выдан испытательной лабораторией {laboratory} (регистрационный номер аттестата аккредитации 12345),"
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
              text: "{scheme}"
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
              text: "{additionalInfo}"
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
              text: "{applicant}",
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
  })

  return doc
}

export async function generateTemplate() {
  const doc = generateTemplateDoc()
  const buffer = await doc.save()
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
  saveAs(blob, 'declaration_template.docx')
}
