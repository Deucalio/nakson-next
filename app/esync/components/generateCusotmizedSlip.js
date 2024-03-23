import { PDFDocument, cmyk } from "pdf-lib";
import { PDFFont } from "pdf-lib";
import { StandardFonts, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import axios from "axios";
import BwipJs from "bwip-js";
// import { fontKit } from "@pdf-lib/fontkit/fontkit";

function calculateDimensions(width, height) {
  const availableWidth = 110;
  const availableHeight = 110;
  const aspectRatio = width / height;

  if (width > height) {
    return { width: availableWidth, height: availableWidth / aspectRatio };
  } else if (height > width) {
    return { width: availableHeight * aspectRatio, height: availableHeight };
  }
}

function stringToBase64(str) {
  // Using btoa() to convert string to Base64
  const base64String = btoa(str);
  return base64String;
}

function base64ToString(base64Str) {
  // Using atob() to decode Base64 string to original string
  const originalString = atob(base64Str);
  return originalString;
}

const generateQRCode = async (order, courier) => {
  console.log("order: ", order);
  let qrCodeBytes = "";

  if (courier === "leopards") {
    try {
      // Tracking Number, Destination City Code, Amount
      qrCodeBytes = await fetchPdfBytes(
        `https://api.qrserver.com/v1/create-qr-code/?size=95x95&data=${order.track_number},${order.destination.id},${order.amount}.00`
      );
    } catch (e) {
      console.log("Error Fetching Bytes for QRCode: ", e);
    }
    return qrCodeBytes;
  } else if (courier === "tcs") {
    try {
      const base64Data = `${order.track_number}|${order.origin_city.city_code}${
        order.destination.city_code
      }|${order.amount}|${order.service_type}|${
        order.consignee_info.name
      }|${order.consignee_info.address.trim()},${order.destination.name}|${
        order.consignee_info.phone
      }`;

      const encodedData = stringToBase64(base64Data);

      // console.log("base64Data: ", base64Data);
      // console.log("encodedData: ", encodedData);
      qrCodeBytes = await fetchPdfBytes(
        `https://api.qrserver.com/v1/create-qr-code/?size=95x95&data=${order.track_number}-${order.origin_city.city_code}${order.destination.city_code}-${order.amount}-${encodedData}`
      );
    } catch (e) {
      console.log("Error Fetching Bytes for QRCode: ", e);
    }
    return qrCodeBytes;
  }
};

async function fetchPdfBytes(url) {
  const response = await fetch(url);
  const pdfBytes = await response.arrayBuffer();
  return pdfBytes;
}
async function generateCusotmizedSlip(slipData, courier) {
  const serverRes = await axios.get("/api/server-url");
  const { serverURL } = serverRes.data;
  // Current Performance:
  // 56 orders in 30 seconds
  // 14 orders in 10 seconds
  // 112 orders in 1 minute
  // 200 orders in 2 minute 30 seconds

  let mergedPdfDoc = "";
  let mergedPdfBytes = "";
  mergedPdfDoc = await PDFDocument.create();
  // Fonts

  mergedPdfDoc.registerFontkit(fontkit);

  //load font and embed it to pdf documentx
  const Poppins =
    "https://cdn.jsdelivr.net/fontsource/fonts/poppins@latest/latin-400-normal.ttf";
  const PoppinsBold =
    "https://cdn.jsdelivr.net/fontsource/fonts/poppins@latest/latin-700-normal.ttf ";

  const OpenSans = Poppins;
  const OpenSansBold = PoppinsBold;

  // const OpenSans =
  //   "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-400-normal.ttf";
  // const OpenSansBold =
  //   "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-700-normal.ttf";

  const BebasNeue =
    "https://cdn.jsdelivr.net/fontsource/fonts/bebas-neue@latest/latin-400-normal.ttf";

  const fontBytes = await fetchPdfBytes(OpenSans);
  const fontBytes1 = await fetchPdfBytes(OpenSansBold);
  const fontBytes2 = await fetchPdfBytes(BebasNeue);

  const OpenSansFont = await mergedPdfDoc.embedFont(fontBytes);
  const OpenSansBoldFont = await mergedPdfDoc.embedFont(fontBytes1);
  const BebasNeueFont = await mergedPdfDoc.embedFont(fontBytes2);

  const fontInUse = OpenSansFont;
  const fontinBoldUse = OpenSansBoldFont;
  const Impact = BebasNeueFont;
  // Calculate the height of each page
  // const height1 = mergedPdfDoc.getPage(0).getHeight();
  // const width1 = mergedPdfDoc.getPage(0).getWidth();
  // console.log("page height: ", height1);
  let courierLogo = "";

  if (courier === "leopards") {
    courierLogo = await fetchPdfBytes("https://i.imgur.com/GXyWx1J.png");
  } else if (courier === "tcs") {
    courierLogo = await fetchPdfBytes("https://i.imgur.com/oLzX6zv.png");
  }

  for (let order of slipData) {
    // order.consignee_info.address =
    // "Lorem Ipsum  galley of type and andandandand andand  andand andand andand,Lorem Ipsum  galley of type and andandandand andand  andand andand andandLorem Ipsum  galley of type and andandandand andand  andand andand andandLorem Ipsum  galley of type and andandandand andand  andand andand andandLorem Ipsum  galley of type and andandandand andand  andand andand andandLorem Ipsum  galley of type and andandandand andand  andand andand andandLorem Ipsum  galley of type and andandandand andand  andand andand andand";
    if (order.consignee_info.address.length <= 74) {
      order.consignee_info.address = order.consignee_info.address + "      ";
    }
    const addressWidth = Math.ceil(
      fontinBoldUse.widthOfTextAtSize(order.consignee_info.address, 10)
    );
    const addressMaxWidth = 225;
    const addressLineHeight = 10;
    const adressNumberOfLines = Math.ceil(addressWidth / addressMaxWidth);
    const addressHeight = adressNumberOfLines * addressLineHeight;

    // console.log("address width: ", addressWidth);
    // console.log("address height: ", addressHeight);
    const page = mergedPdfDoc.addPage([595, 375]);

    const { width, height } = page.getSize();

    // console.log("page width: ", width);
    // console.log("page height: ", height);

    // Fetch QR Code
    let qrCodeBytes = "";
    try {
      qrCodeBytes = await generateQRCode(order, courier);

      const logoBytes = await fetchPdfBytes(order.shop_logo);

      const courierImage = await mergedPdfDoc.embedPng(courierLogo);
      const logoImage = await mergedPdfDoc.embedPng(logoBytes);

      const courierImageDimensions = calculateDimensions(
        courierImage.width,
        courierImage.height
      );
      const logoImageDimensions = calculateDimensions(
        logoImage.width,
        logoImage.height
      );

      // Find

      page.drawImage(logoImage, {
        x: 69 - logoImageDimensions.width / 2,
        y: 315 - logoImageDimensions.height / 2,
        width: logoImageDimensions.width,
        height: logoImageDimensions.height,
      });

      page.drawImage(courierImage, {
        x: 526 - courierImageDimensions.width / 2,
        y: 315 - courierImageDimensions.height / 2,
        width: courierImageDimensions.width,
        height: courierImageDimensions.height,
      });

      // Rectangle
      // page.drawRectangle({
      //   x: 1,
      //   y: 1,
      //   width: 591,
      //   height: 371 + addressHeight,
      //   borderWidth: 2,
      //   opacity: 0,
      //   borderOpacity: 1,
      // });

      const qrCodeImage = await mergedPdfDoc.embedPng(qrCodeBytes);
      // add qr code
      page.drawImage(qrCodeImage, {
        x: 250.5,
        y: 156.5,
        width: 95,
        height: 95,
      });

      // const barcode = await fetchPdfBytes(
      //   // `https://barcode.orcascan.com/?type=code128&data=${order.amount}&text=${order.track_number}`
      //   `https://barcodeapi.org/api/128/${order.track_number}`
      // );

      const barcodeBuffer = await fetchPdfBytes(
        `${serverURL}/create-barcode/${order.track_number}`
      );

      let barcodeBuffer_aboveRS = "";
      if (courier === "tcs") {
        barcodeBuffer_aboveRS = await fetchPdfBytes(
          `${serverURL}/create-barcode/RS${order.amount}?key=value`
        );
      } else if (courier === "leopards") {
        barcodeBuffer_aboveRS = await fetchPdfBytes(
          `${serverURL}/create-barcode/${order.amount}.00?key=value`
        );
      }

      // let barcodeImg = "";
      // try {
      //   barcodeImg = await mergedPdfDoc.embedPng(barcode);
      // } catch (e) {
      //   console.log("Barcode Error: ", e);
      // }

      const barcodeImg = await mergedPdfDoc.embedPng(barcodeBuffer);
      const barcodeBuffer_aboveRSImg = await mergedPdfDoc.embedPng(
        barcodeBuffer_aboveRS
      );

      // // add barcode
      page.drawImage(barcodeImg, {
        x: (width - 270) / 2,
        y: 262,
        width: 270,
        height: 40,
      });

      // add barcode above RS
      page.drawImage(barcodeBuffer_aboveRSImg, {
        x: 437.42,
        y: 52.55,
        width: 135,
        height: 35,
      });

      // use the images folder to store the images
      // courierImage = fs.readFileSync("../backened/images/leopards-logo.png");

      // page.drawImage(courierImage, {
      //   x: 470,
      //   y: 210 + addressHeight,
      //   width: 100,
      //   height: 30,
      // });
    } catch (err) {
      console.log("Error spotted: ", err);
    }

    // Order Service Type
    page.drawText(order.service_type, {
      font: fontinBoldUse,
      size: 28,
      x:
        (width -
          Math.ceil(fontinBoldUse.widthOfTextAtSize(order.service_type, 28))) /
        2,
      y: 245 + 87,
    });
    // COD OR NON COD
    page.drawText(order.collectType, {
      font: fontInUse,
      size: 10,
      x:
        (width -
          Math.ceil(fontinBoldUse.widthOfTextAtSize(order.collectType, 10))) /
        2,
      y: 230 + 87,
    });

    // page.drawRectangle({
    //   x: (width - 282) / 2,
    //   y: 173 + addressHeight,
    //   width: 282,
    //   height: 45,
    //   borderWidth: 1.5,
    //   opacity: 0,
    //   borderOpacity: 1,
    // });

    page.drawRectangle({
      x: 14,
      y: 14,
      width: 567,
      height: 240,
      borderWidth: 2,
      opacity: 0,
      borderOpacity: 1,
    });
    // START FORM HERE

    // QR CODE Square
    // page.drawSquare({
    //   x: (width - 100) / 2,
    //   y: 128 + addressHeight - 35,
    //   borderWidth: 1.5,
    //   size: 100,
    //   opacity: 0,
    // });

    page.drawRectangle({
      x: 247.7,
      y: 50.726,
      width: 180.9,
      height: 103,
      borderWidth: 1.5,
      opacity: 0,
      borderOpacity: 1,
    });

    // _____

    page.drawLine({
      start: { x: 428.6, y: 153.726 },
      end: { x: 581, y: 153.726 },
      thickness: 1.5,
    });

    page.drawLine({
      start: { x: 14, y: 49.78 },
      end: { x: 250.88, y: 49.78 },
      thickness: 1.5,
    });

    page.drawRectangle({
      x: 247,
      y: 14,
      width: 182.4,
      height: 36.726,
      opacity: 1,
    });

    // Shipper Information Line (below Contact#)
    // page.drawLine({
    //   start: { x: 354, y: 95 + addressHeight },
    //   end: { x: 574, y: 95 + addressHeight },
    //   thickness: 1,
    // });

    // Consignee Information
    page.drawText("Consignee Information", {
      font: fontinBoldUse,
      size: 16,
      x: 19,
      y: 235,
    });

    // page.drawText("Name:", {
    //   font: fontinBoldUse,
    //   size: 10,
    //   x: 20,
    //   y: 190 + addressHeight - 35,
    // });
    page.drawText(order.consignee_info.name, {
      font: fontInUse,
      x: 19,
      size: 12,
      y: 213.67,
    });

    // page.drawText("Address:", {
    //   font: fontinBoldUse,
    //   size: 10,
    //   x: 20,
    //   y: 175 + addressHeight - 35,
    // });

    page.drawText(order.consignee_info.address, {
      font: fontInUse,
      x: 19,
      size: 10,
      lineHeight: addressLineHeight,
      maxWidth: addressMaxWidth,
      y: 200,
    });

    page.drawText(order.consignee_info.phone, {
      font: fontInUse,
      x: 19,
      size: 9,
      y: 152 - addressHeight + 30,
    });

    // __________________

    // Remarks
    page.drawText("Remarks: ", {
      font: fontinBoldUse,
      size: 14,
      x: 247.5 + 5,
      y: 139,
    });

    page.drawText(order.shipping_instructions.slice(0, 110), {
      font: fontInUse,
      x: 247.5 + 5,
      size: 10,
      maxWidth: 175,
      y: 127.4,
    });

    // Shipper Information
    page.drawText("Shipper Information", {
      font: fontinBoldUse,
      size: 16,
      x: 353.64,
      y: 235,
    });

    page.drawText(order.shipper_info.name, {
      font: fontInUse,
      x: 353.64,
      size: 12,
      y: 213.67,
    });

    page.drawText(order.shipper_info.address.slice(0, 60), {
      font: fontInUse,
      x: 353.64,
      size: 9,
      lineHeight: addressLineHeight,
      maxWidth: addressMaxWidth,
      y: 202.86,
    });

    page.drawText(order.shipper_info.phone, {
      font: fontInUse,
      x: 353.64,
      size: 9,
      y: 170.75,
    });

    const destinationNameWidth = Math.ceil(
      fontinBoldUse.widthOfTextAtSize(order.destination.name, 20)
    );

    page.drawText(order.destination.name, {
      font: fontinBoldUse,
      size: 20,
      x: 130.815 - destinationNameWidth / 2,
      y: 24.2,
    });

    // RS
    let amountWidth = Math.ceil(
      Impact.widthOfTextAtSize("RS" + String(order.amount), 36)
    );

    page.drawText("RS " + String(order.amount), {
      font: Impact,
      size: 36,
      x: 505.06 - amountWidth / 2,
      y: 22,
    });

    // Tracking #, Date, Pieces and Weight
    page.drawText("Tracking: ", {
      font: fontinBoldUse,
      size: 11,
      x: 434.12,
      y: 144,
    });
    page.drawText(order.track_number, {
      size: 10,
      x: 490,
      y: 144,
    });

    page.drawText("Date:", {
      font: fontinBoldUse,
      size: 11,
      x: 434.12,
      y: 131,
    });
    page.drawText(order.date, {
      size: 10,
      x: 490,
      y: 131,
    });

    page.drawText("Pieces:", {
      font: fontinBoldUse,
      size: 11,
      x: 434.12,
      y: 118,
    });
    page.drawText(String(order.pieces), {
      size: 10,
      x: 490,
      y: 118,
    });

    page.drawText("Weight:", {
      font: fontinBoldUse,
      size: 11,
      x: 434.12,
      y: 105,
    });
    page.drawText(String(order.weight), {
      size: 10,
      x: 490,
      y: 105,
    });

    // Order Name
    let orderNameWidth = Math.ceil(
      fontinBoldUse.widthOfTextAtSize(order.booked_packet_order_name, 24)
    );
    page.drawText(order.booked_packet_order_name, {
      font: fontinBoldUse,
      size: 24,
      x: 341 - orderNameWidth / 2,
      y: 22.89,
      color: cmyk(0, 0, 0, 0),
    });
    page.drawText("Managed by www.nakson.services", {
      size: 8,
      x: 14,
      y: 4,
    });

    page.drawText(
      `UAN: ${courier === "leopards" ? "111-300-786" : "111-123-456"}`,
      {
        size: 8,
        x: 511,
        y: 4,
      }
    );
  }

  mergedPdfBytes = await mergedPdfDoc.save();
  return mergedPdfBytes;
}
export default generateCusotmizedSlip;
