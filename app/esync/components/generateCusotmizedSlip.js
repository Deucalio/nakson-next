import { PDFDocument } from "pdf-lib";
import { PDFFont } from "pdf-lib";
import { StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import axios from "axios";
import BwipJs from "bwip-js";
// import { fontKit } from "@pdf-lib/fontkit/fontkit";

async function fetchPdfBytes(url) {
  const response = await fetch(url);
  const pdfBytes = await response.arrayBuffer();
  return pdfBytes;
}
async function generateCusotmizedSlip(slipData) {
  // Current Performance:
  // 56 orders in 30 seconds
  // 14 orders in 10 seconds
  // 112 orders in 1 minute
  // 200 orders in 2 minute 30 seconds

  slipData = [
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Syeda Ruqaiya",
        address:
          "Eithad city Muhammad Pur Road house no:22 Naubahar House Sahiwal ",
        phone: "03216923280",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1236",
        name: "Sahiwal",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216481",
      booked_packet_order_name: "NAK5792",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Momal Haider",
        address: "House.204, block3, sector c2 , township ",
        phone: "03218849800",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "789",
        name: "Lahore",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1798,
      track_number: "HD753216482",
      booked_packet_order_name: "NAK5791",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Iqbal Ahmed Qureshi",
        address: "G-16 Noman terrace phase II Gulshan-e-iqbal Block 11 ",
        phone: "+923350379050",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "592",
        name: "Karachi",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 625,
      track_number: "HD753216483",
      booked_packet_order_name: "NAK5778",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Khawar Khan",
        address: "Abdul Razzaq Fazaia college MM Alam Mianwali ",
        phone: "03234029631",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "939",
        name: "Mianwali",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216484",
      booked_packet_order_name: "NAK5762",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Arif Ali",
        address:
          "Lt col Arif Ali AQ Azad Kashmir regmintel centre mansar camp attock ",
        phone: "03365404516",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "35",
        name: "Attock",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1074,
      track_number: "HD753216485",
      booked_packet_order_name: "NAK5745",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Ayesha Noreen",
        address:
          "Deewan Pulli Ashraf plaza 2nd floor opposite Allama iqbal town civil hospital road Bahawalpur ",
        phone: "03046800088",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "99",
        name: "Bahawalpur",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216486",
      booked_packet_order_name: "NAK5739",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "M.aban Aban shah",
        address: "Higher secondary school pindi road togh bala kohat ",
        phone: "03339615789",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "724",
        name: "Kohat",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216487",
      booked_packet_order_name: "NAK5728",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Abdullah Qureshi",
        address: "Madrsa Zia ul aloom mohala Muhammad Pura ward no 2 khanghr ",
        phone: "03043395933",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1067",
        name: "Muzaffargarh",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216488",
      booked_packet_order_name: "NAK5714",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "KAmran Shah",
        address: "Kohsar colony new abadi chakra Rawalpindi ",
        phone: "03015291588",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1202",
        name: "Rawalpindi",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216489",
      booked_packet_order_name: "NAK5694",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Asma Maqbool",
        address: "House no 26 street no 31 burni road gari shahu lahore ",
        phone: "03214791401",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "789",
        name: "Lahore",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 5198,
      track_number: "HD753216490",
      booked_packet_order_name: "NAK5679",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Hafsa Nasir",
        address: "225 satellite town backside holy family hospital rawalpindi ",
        phone: "03014466993",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1202",
        name: "Rawalpindi",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 2197,
      track_number: "HD753216491",
      booked_packet_order_name: "NAK5633",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Bilal Qasim",
        address: "615E shah rukne alam near Faisal masjid ",
        phone: "03038026512",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1017",
        name: "Multan",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 695,
      track_number: "HD753216492",
      booked_packet_order_name: "NAK5603",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Momdaughts",
      shop_logo:
        "https://momdaughts.com/cdn/shop/files/shapater_logo.png?v=1666980932&width=500",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Haris Khan",
        address: "Phase 6 sector f7 street 15 house 347 hayatabad peshawar ",
        phone: "03149214310",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1140",
        name: "Peshawar",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 774,
      track_number: "HD753216493",
      booked_packet_order_name: "#MD3766",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Momdaughts",
      shop_logo:
        "https://momdaughts.com/cdn/shop/files/shapater_logo.png?v=1666980932&width=500",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Zeeshan Zeeshan",
        address: "15-A Khyber park sunt nager lahore ",
        phone: "03004267890",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "789",
        name: "Lahore",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 774,
      track_number: "HD753216494",
      booked_packet_order_name: "#MD3758",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Momdaughts",
      shop_logo:
        "https://momdaughts.com/cdn/shop/files/shapater_logo.png?v=1666980932&width=500",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Kamran Chishti",
        address: "Huzaifa cloth Iqbal bazar ",
        phone: "03478098205",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "252",
        name: "KAMALIA",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1198,
      track_number: "HD753216495",
      booked_packet_order_name: "#MD3733",
      collectType: "COD Parcel",
    },
    // SAD
    {
      shop_name: "Momdaughts",
      shop_logo:
        "https://momdaughts.com/cdn/shop/files/shapater_logo.png?v=1666980932&width=500",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Kamran Chishti",
        address: "Huzaifa cloth Iqbal bazar ",
        phone: "03478098205",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "252",
        name: "KAMALIA",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1198,
      track_number: "HD753216495",
      booked_packet_order_name: "#MD3733",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Syeda Ruqaiya",
        address:
          "Eithad city Muhammad Pur Road house no:22 Naubahar House Sahiwal ",
        phone: "03216923280",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1236",
        name: "Sahiwal",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216481",
      booked_packet_order_name: "NAK5792",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Momal Haider",
        address: "House.204, block3, sector c2 , township ",
        phone: "03218849800",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "789",
        name: "Lahore",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1798,
      track_number: "HD753216482",
      booked_packet_order_name: "NAK5791",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Iqbal Ahmed Qureshi",
        address: "G-16 Noman terrace phase II Gulshan-e-iqbal Block 11 ",
        phone: "+923350379050",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "592",
        name: "Karachi",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 625,
      track_number: "HD753216483",
      booked_packet_order_name: "NAK5778",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Khawar Khan",
        address: "Abdul Razzaq Fazaia college MM Alam Mianwali ",
        phone: "03234029631",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "939",
        name: "Mianwali",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216484",
      booked_packet_order_name: "NAK5762",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Arif Ali",
        address:
          "Lt col Arif Ali AQ Azad Kashmir regmintel centre mansar camp attock ",
        phone: "03365404516",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "35",
        name: "Attock",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1074,
      track_number: "HD753216485",
      booked_packet_order_name: "NAK5745",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Ayesha Noreen",
        address:
          "Deewan Pulli Ashraf plaza 2nd floor opposite Allama iqbal town civil hospital road Bahawalpur ",
        phone: "03046800088",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "99",
        name: "Bahawalpur",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216486",
      booked_packet_order_name: "NAK5739",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "M.aban Aban shah",
        address: "Higher secondary school pindi road togh bala kohat ",
        phone: "03339615789",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "724",
        name: "Kohat",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216487",
      booked_packet_order_name: "NAK5728",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Abdullah Qureshi",
        address: "Madrsa Zia ul aloom mohala Muhammad Pura ward no 2 khanghr ",
        phone: "03043395933",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1067",
        name: "Muzaffargarh",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216488",
      booked_packet_order_name: "NAK5714",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "KAmran Shah",
        address: "Kohsar colony new abadi chakra Rawalpindi ",
        phone: "03015291588",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1202",
        name: "Rawalpindi",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216489",
      booked_packet_order_name: "NAK5694",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Asma Maqbool",
        address: "House no 26 street no 31 burni road gari shahu lahore ",
        phone: "03214791401",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "789",
        name: "Lahore",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 5198,
      track_number: "HD753216490",
      booked_packet_order_name: "NAK5679",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Hafsa Nasir",
        address: "225 satellite town backside holy family hospital rawalpindi ",
        phone: "03014466993",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1202",
        name: "Rawalpindi",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 2197,
      track_number: "HD753216491",
      booked_packet_order_name: "NAK5633",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Bilal Qasim",
        address: "615E shah rukne alam near Faisal masjid ",
        phone: "03038026512",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1017",
        name: "Multan",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 695,
      track_number: "HD753216492",
      booked_packet_order_name: "NAK5603",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Momdaughts",
      shop_logo:
        "https://momdaughts.com/cdn/shop/files/shapater_logo.png?v=1666980932&width=500",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Haris Khan",
        address: "Phase 6 sector f7 street 15 house 347 hayatabad peshawar ",
        phone: "03149214310",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1140",
        name: "Peshawar",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 774,
      track_number: "HD753216493",
      booked_packet_order_name: "#MD3766",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Momdaughts",
      shop_logo:
        "https://momdaughts.com/cdn/shop/files/shapater_logo.png?v=1666980932&width=500",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Zeeshan Zeeshan",
        address: "15-A Khyber park sunt nager lahore ",
        phone: "03004267890",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "789",
        name: "Lahore",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 774,
      track_number: "HD753216494",
      booked_packet_order_name: "#MD3758",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Momdaughts",
      shop_logo:
        "https://momdaughts.com/cdn/shop/files/shapater_logo.png?v=1666980932&width=500",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Kamran Chishti",
        address: "Huzaifa cloth Iqbal bazar ",
        phone: "03478098205",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "252",
        name: "KAMALIA",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1198,
      track_number: "HD753216495",
      booked_packet_order_name: "#MD3733",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Syeda Ruqaiya",
        address:
          "Eithad city Muhammad Pur Road house no:22 Naubahar House Sahiwal ",
        phone: "03216923280",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1236",
        name: "Sahiwal",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216481",
      booked_packet_order_name: "NAK5792",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Momal Haider",
        address: "House.204, block3, sector c2 , township ",
        phone: "03218849800",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "789",
        name: "Lahore",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1798,
      track_number: "HD753216482",
      booked_packet_order_name: "NAK5791",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Iqbal Ahmed Qureshi",
        address: "G-16 Noman terrace phase II Gulshan-e-iqbal Block 11 ",
        phone: "+923350379050",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "592",
        name: "Karachi",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 625,
      track_number: "HD753216483",
      booked_packet_order_name: "NAK5778",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Khawar Khan",
        address: "Abdul Razzaq Fazaia college MM Alam Mianwali ",
        phone: "03234029631",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "939",
        name: "Mianwali",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216484",
      booked_packet_order_name: "NAK5762",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Arif Ali",
        address:
          "Lt col Arif Ali AQ Azad Kashmir regmintel centre mansar camp attock ",
        phone: "03365404516",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "35",
        name: "Attock",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1074,
      track_number: "HD753216485",
      booked_packet_order_name: "NAK5745",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Ayesha Noreen",
        address:
          "Deewan Pulli Ashraf plaza 2nd floor opposite Allama iqbal town civil hospital road Bahawalpur ",
        phone: "03046800088",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "99",
        name: "Bahawalpur",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216486",
      booked_packet_order_name: "NAK5739",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "M.aban Aban shah",
        address: "Higher secondary school pindi road togh bala kohat ",
        phone: "03339615789",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "724",
        name: "Kohat",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216487",
      booked_packet_order_name: "NAK5728",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Abdullah Qureshi",
        address: "Madrsa Zia ul aloom mohala Muhammad Pura ward no 2 khanghr ",
        phone: "03043395933",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1067",
        name: "Muzaffargarh",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216488",
      booked_packet_order_name: "NAK5714",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "KAmran Shah",
        address: "Kohsar colony new abadi chakra Rawalpindi ",
        phone: "03015291588",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1202",
        name: "Rawalpindi",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216489",
      booked_packet_order_name: "NAK5694",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Asma Maqbool",
        address: "House no 26 street no 31 burni road gari shahu lahore ",
        phone: "03214791401",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "789",
        name: "Lahore",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 5198,
      track_number: "HD753216490",
      booked_packet_order_name: "NAK5679",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Hafsa Nasir",
        address: "225 satellite town backside holy family hospital rawalpindi ",
        phone: "03014466993",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1202",
        name: "Rawalpindi",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 2197,
      track_number: "HD753216491",
      booked_packet_order_name: "NAK5633",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Bilal Qasim",
        address: "615E shah rukne alam near Faisal masjid ",
        phone: "03038026512",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1017",
        name: "Multan",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 695,
      track_number: "HD753216492",
      booked_packet_order_name: "NAK5603",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Momdaughts",
      shop_logo:
        "https://momdaughts.com/cdn/shop/files/shapater_logo.png?v=1666980932&width=500",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Haris Khan",
        address: "Phase 6 sector f7 street 15 house 347 hayatabad peshawar ",
        phone: "03149214310",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1140",
        name: "Peshawar",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 774,
      track_number: "HD753216493",
      booked_packet_order_name: "#MD3766",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Momdaughts",
      shop_logo:
        "https://momdaughts.com/cdn/shop/files/shapater_logo.png?v=1666980932&width=500",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Zeeshan Zeeshan",
        address: "15-A Khyber park sunt nager lahore ",
        phone: "03004267890",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "789",
        name: "Lahore",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 774,
      track_number: "HD753216494",
      booked_packet_order_name: "#MD3758",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Momdaughts",
      shop_logo:
        "https://momdaughts.com/cdn/shop/files/shapater_logo.png?v=1666980932&width=500",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Kamran Chishti",
        address: "Huzaifa cloth Iqbal bazar ",
        phone: "03478098205",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "252",
        name: "KAMALIA",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1198,
      track_number: "HD753216495",
      booked_packet_order_name: "#MD3733",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Syeda Ruqaiya",
        address:
          "Eithad city Muhammad Pur Road house no:22 Naubahar House Sahiwal ",
        phone: "03216923280",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1236",
        name: "Sahiwal",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216481",
      booked_packet_order_name: "NAK5792",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Momal Haider",
        address: "House.204, block3, sector c2 , township ",
        phone: "03218849800",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "789",
        name: "Lahore",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1798,
      track_number: "HD753216482",
      booked_packet_order_name: "NAK5791",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Iqbal Ahmed Qureshi",
        address: "G-16 Noman terrace phase II Gulshan-e-iqbal Block 11 ",
        phone: "+923350379050",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "592",
        name: "Karachi",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 625,
      track_number: "HD753216483",
      booked_packet_order_name: "NAK5778",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Khawar Khan",
        address: "Abdul Razzaq Fazaia college MM Alam Mianwali ",
        phone: "03234029631",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "939",
        name: "Mianwali",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216484",
      booked_packet_order_name: "NAK5762",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Arif Ali",
        address:
          "Lt col Arif Ali AQ Azad Kashmir regmintel centre mansar camp attock ",
        phone: "03365404516",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "35",
        name: "Attock",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1074,
      track_number: "HD753216485",
      booked_packet_order_name: "NAK5745",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Ayesha Noreen",
        address:
          "Deewan Pulli Ashraf plaza 2nd floor opposite Allama iqbal town civil hospital road Bahawalpur ",
        phone: "03046800088",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "99",
        name: "Bahawalpur",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216486",
      booked_packet_order_name: "NAK5739",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "M.aban Aban shah",
        address: "Higher secondary school pindi road togh bala kohat ",
        phone: "03339615789",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "724",
        name: "Kohat",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216487",
      booked_packet_order_name: "NAK5728",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Abdullah Qureshi",
        address: "Madrsa Zia ul aloom mohala Muhammad Pura ward no 2 khanghr ",
        phone: "03043395933",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1067",
        name: "Muzaffargarh",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216488",
      booked_packet_order_name: "NAK5714",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "KAmran Shah",
        address: "Kohsar colony new abadi chakra Rawalpindi ",
        phone: "03015291588",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "1202",
        name: "Rawalpindi",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 1474,
      track_number: "HD753216489",
      booked_packet_order_name: "NAK5694",
      collectType: "COD Parcel",
    },
    {
      shop_name: "Nakson",
      shop_logo:
        "https://nakson.pk/cdn/shop/files/nakson_12.png?v=1671209093&width=300",
      service_type: "OVERNIGHT",
      courier: "Leopards",
      consignee_info: {
        name: "Asma Maqbool",
        address: "House no 26 street no 31 burni road gari shahu lahore ",
        phone: "03214791401",
      },
      shipper_info: {
        name: "Nakson",
        address: "172-D Nakson Office, Unit# 5 Latifabad, Hyderabad.",
        phone: "03481273957",
      },
      destination: {
        id: "789",
        name: "Lahore",
        shipment_type: [Array],
        allow_as_origin: true,
        allow_as_destination: true,
      },
      shipping_instructions: "Call the consignee before delivery",
      date: "2/21/2024",
      pieces: 1,
      weight: 100,
      amount: 5198,
      track_number: "HD753216490",
      booked_packet_order_name: "NAK5679",
      collectType: "COD Parcel",
    },
  ];
  console.log("HERE ", slipData.length, "Orders");
  let mergedPdfDoc = "";
  let mergedPdfBytes = "";
  mergedPdfDoc = await PDFDocument.create();

  // Fonts

  mergedPdfDoc.registerFontkit(fontkit);

  //load font and embed it to pdf documentx

  const OpenSans =
    "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-400-normal.ttf";
  const OpenSansBold =
    "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-600-normal.ttf";

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

  let courierLogo = await fetchPdfBytes("https://i.imgur.com/GXyWx1J.png");

  for (let order of slipData) {
    const addressWidth = Math.ceil(
      fontinBoldUse.widthOfTextAtSize(order.consignee_info.address, 9)
    );
    const addressMaxWidth = 170;
    const addressLineHeight = 10;
    const adressNumberOfLines = Math.ceil(addressWidth / addressMaxWidth);
    const addressHeight = adressNumberOfLines * addressLineHeight;

    // console.log("address width: ", addressWidth);
    // console.log("address height: ", addressHeight);
    const page = mergedPdfDoc.addPage([595, 305 + addressHeight - 35]);

    const { width, height } = page.getSize();

    // console.log("page width: ", width);
    // console.log("page height: ", height);

    // Fetch QR Code
    let qrCodeBytes = "";
    try {
      try {
        qrCodeBytes = await fetchPdfBytes(
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${order.track_number},${order.destination.id},${order.amount}`
        );
      } catch (e) {
        console.log("Error Fetching Bytes for QRCode: ", e);
      }

      const courierImage = await mergedPdfDoc.embedPng(courierLogo);

      page.drawImage(courierImage, {
        x: 470,
        y: 210 + addressHeight,
        width: 100,
        height: 30,
      });

      const qrCodeImage = await mergedPdfDoc.embedPng(qrCodeBytes);
      // add qr code
      page.drawImage(qrCodeImage, {
        x: 253,
        y: 80 + addressHeight,
        width: 90,
        height: 90,
      });

      // const barcode = await fetchPdfBytes(
      //   // `https://barcode.orcascan.com/?type=code128&data=${order.amount}&text=${order.track_number}`
      //   `https://barcodeapi.org/api/128/${order.track_number}`
      // );

      const barcodeBuffer = await fetchPdfBytes(
        `http://localhost:4000/create-barcode/${order.track_number}`
      );
      // let barcodeImg = "";
      // try {
      //   barcodeImg = await mergedPdfDoc.embedPng(barcode);
      // } catch (e) {
      //   console.log("Barcode Error: ", e);
      // }

      const barcodeImg = await mergedPdfDoc.embedPng(barcodeBuffer);

      // // add barcode
      page.drawImage(barcodeImg, {
        x: (width - 270) / 2,
        y: 176 + addressHeight,
        width: 270,
        height: 40,
      });

      // Logo Image
      const logoBytes = await fetchPdfBytes(order.shop_logo);

      const logoImage = await mergedPdfDoc.embedPng(logoBytes);
      page.drawImage(logoImage, {
        x: 14,
        y: 210 + addressHeight,
        width: 100,
        height: 50,
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
      y: 241 + addressHeight,
    });
    // COD OR NON COD
    page.drawText(order.collectType, {
      font: fontInUse,
      size: 10,
      x:
        (width -
          Math.ceil(fontinBoldUse.widthOfTextAtSize(order.collectType, 10))) /
        2,
      y: 226 + addressHeight,
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
      y: 7,
      width: 566,
      height: 166 + addressHeight,
      borderWidth: 2.5,
      opacity: 0,
      borderOpacity: 1,
    });

    page.drawSquare({
      x: (width - 100) / 2,
      y: 108 + addressHeight - 35,
      borderWidth: 1.5,
      size: 100,
      opacity: 0,
    });

    page.drawLine({
      start: { x: (width - 1.5) / 2, y: 108 + addressHeight - 35 },
      end: { x: (width - 1.5) / 2, y: 35 },
      thickness: 1,
    });

    page.drawLine({
      start: { x: 14, y: 35 },
      end: { x: 14 + 565, y: 35 },
      thickness: 1.5,
    });

    page.drawLine({
      start: { x: 399, y: 35 },
      end: { x: 399, y: 7 },
      thickness: 1,
    });

    // Shipper Information Line (below Contact#)
    page.drawLine({
      start: { x: 354, y: 75 + addressHeight },
      end: { x: 574, y: 75 + addressHeight },
      thickness: 1,
    });

    // Consignee Information
    page.drawText("Consignee Information", {
      font: fontinBoldUse,
      size: 16,
      x: 20,
      y: 191 + addressHeight - 35,
    });

    page.drawText("Name:", {
      font: fontinBoldUse,
      size: 10,
      x: 20,
      y: 170 + addressHeight - 35,
    });
    page.drawText(order.consignee_info.name, {
      font: fontInUse,
      x: 75,
      size: 9,
      y: 170 + addressHeight - 35,
    });

    page.drawText("Address:", {
      font: fontinBoldUse,
      size: 10,
      x: 20,
      y: 155 + addressHeight - 35,
    });
    page.drawText(order.consignee_info.address, {
      font: fontInUse,
      x: 75,
      size: 9,
      lineHeight: addressLineHeight,
      maxWidth: addressMaxWidth,
      y: 155 + addressHeight - 35,
    });

    page.drawText("Contact:", {
      font: fontinBoldUse,
      size: 10,
      x: 20,
      y: 118,
    });

    page.drawText(order.consignee_info.phone, {
      font: fontInUse,
      x: 75,
      size: 9,
      y: 118,
    });

    // Line
    page.drawLine({
      start: { x: 20, y: 113 },
      end: { x: 238, y: 113 },
      thickness: 1,
    });

    // Remarks
    page.drawText("Remarks: ", {
      font: fontinBoldUse,
      size: 10,
      x: 20,
      y: 100,
    });
    page.drawText(order.shipping_instructions, {
      font: fontInUse,
      x: 75,
      size: 9,
      maxWidth: addressMaxWidth, //170
      y: 100,
    });

    // Shipper Information
    page.drawText("Shipper Information", {
      font: fontinBoldUse,
      size: 16,
      x: 354,
      y: 191 + addressHeight - 35,
    });

    page.drawText("Name:", {
      font: fontInUse,
      size: 10,
      x: 354,
      y: 170 + addressHeight - 35,
    });
    page.drawText(order.shipper_info.name, {
      font: fontInUse,
      x: 409,
      size: 9,
      y: 170 + addressHeight - 35,
    });

    page.drawText("Address:", {
      font: fontInUse,
      size: 10,
      x: 354,
      maxWidth: addressMaxWidth,
      y: 155 + addressHeight - 35,
    });
    page.drawText(order.shipper_info.address.slice(0, 200), {
      font: fontInUse,
      x: 409,
      size: 9,
      lineHeight: addressLineHeight,
      maxWidth: addressMaxWidth,
      y: 155 + addressHeight - 35,
    });

    page.drawText("Contact:", {
      font: fontInUse,
      size: 10,
      x: 354,
      y: 115 + addressHeight - 35,
    });
    page.drawText(order.shipper_info.phone, {
      font: fontInUse,
      x: 409,
      size: 9,
      y: 115 + addressHeight - 35,
    });

    // Destination
    page.drawText("Destination:", {
      font: fontinBoldUse,
      size: 18,
      x: 20,
      y: 14,
    });

    page.drawText(order.destination.name, {
      font: fontinBoldUse,
      size: 16,
      x: 146,
      y: 14,
    });

    // RS
    let amountWidth = Math.ceil(
      fontinBoldUse.widthOfTextAtSize("RS" + String(order.amount), 28)
    );

    page.drawText("RS " + String(order.amount), {
      font: Impact,
      size: 28,
      x: 396 + (181 - amountWidth),
      y: 9,
    });

    // Tracking #, Date, Pieces and Weight
    page.drawText("Tracking #:", {
      size: 10,
      x: 301,
      y: 97 + addressHeight - 35,
    });
    page.drawText(order.track_number, {
      size: 10,
      x: 354,
      y: 97 + addressHeight - 35,
    });

    page.drawText("Date:", {
      size: 10,
      x: 301,
      y: 85 + addressHeight - 35,
    });
    page.drawText(order.date, {
      size: 10,
      x: 354,
      y: 85 + addressHeight - 35,
    });

    page.drawText("Pieces:", {
      size: 10,
      x: 301,
      y: 73 + addressHeight - 35,
    });
    page.drawText(String(order.pieces), {
      size: 10,
      x: 354,
      y: 73 + addressHeight - 35,
    });

    page.drawText("Weight:", {
      size: 10,
      x: 301,
      y: 61 + addressHeight - 35,
    });
    page.drawText(String(order.weight), {
      size: 10,
      x: 354,
      y: 61 + addressHeight - 35,
    });

    // Order Name
    let orderNameWidth = Math.ceil(
      fontinBoldUse.widthOfTextAtSize(order.booked_packet_order_name, 18)
    );
    page.drawText(order.booked_packet_order_name, {
      size: 18,
      x: 15 + 566 - orderNameWidth,
      y: 40,
    });
  }

  mergedPdfBytes = await mergedPdfDoc.save();
  return mergedPdfBytes;
}
export default generateCusotmizedSlip;
