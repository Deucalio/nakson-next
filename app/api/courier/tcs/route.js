import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
import { PrismaClient } from "../../../../prisma/generated/client";
import { inngest } from "../../inngest/client"; // Import our client

const orders = [
  {
    id: 5760101155108,
    admin_graphql_api_id: "gid://shopify/Order/5760101155108",
    app_id: 580111,
    browser_ip: "154.80.74.31",
    buyer_accepts_marketing: false,
    cancel_reason: null,
    cancelled_at: null,
    cart_token: "Z2NwLXVzLWVhc3QxOjAxSFNFOTAyODlYTUpaSlpXTjhRSjNRWFlS",
    checkout_id: 37352146993444,
    checkout_token: "3263677f296ce37c5cea42753c6aae88",
    client_details: {
      accept_language: "en-PK",
      browser_height: null,
      browser_ip: "154.80.74.31",
      browser_width: null,
      session_hash: null,
      user_agent:
        "Mozilla/5.0 (Linux; Android 13; Infinix X6528 Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/122.0.6261.106 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/427.0.0.31.63;]",
    },
    closed_at: null,
    confirmation_number: "M9KU48MXX",
    confirmed: true,
    contact_email: null,
    created_at: "2024-03-20T20:53:07+05:00",
    currency: "PKR",
    current_subtotal_price: "699.00",
    current_subtotal_price_set: {
      shop_money: {
        amount: "699.00",
        currency_code: "PKR",
      },
      presentment_money: {
        amount: "699.00",
        currency_code: "PKR",
      },
    },
    current_total_additional_fees_set: null,
    current_total_discounts: "0.00",
    current_total_discounts_set: {
      shop_money: {
        amount: "0.00",
        currency_code: "PKR",
      },
      presentment_money: {
        amount: "0.00",
        currency_code: "PKR",
      },
    },
    current_total_duties_set: null,
    current_total_price: "899.00",
    current_total_price_set: {
      shop_money: {
        amount: "899.00",
        currency_code: "PKR",
      },
      presentment_money: {
        amount: "899.00",
        currency_code: "PKR",
      },
    },
    current_total_tax: "0.00",
    current_total_tax_set: {
      shop_money: {
        amount: "0.00",
        currency_code: "PKR",
      },
      presentment_money: {
        amount: "0.00",
        currency_code: "PKR",
      },
    },
    customer_locale: "en-PK",
    device_id: null,
    discount_codes: [],
    email: "",
    estimated_taxes: false,
    financial_status: "pending",
    fulfillment_status: null,
    landing_site:
      "/products/short-tailed-menstrual-cup?utm_content=Facebook_UA&utm_source=facebook&variant=43723996004644&fbclid=IwAR1ZbaRXod0YmRmSNameCkGRjeScPMk051B4ScXiPsYQf1oJTC056aSOm1M_aem_Aazq3gmgJ32lp8tzzktTy_rrnfa381GfLQlXPu8FOxjoKI521U9wDj3GsU2LJibuKFOou9AGcDb2V-XM0Z5xtDUZ&utm_medium=paid&campaign_id=120205126108640263&ad_id=120205126108630263",
    landing_site_ref: null,
    location_id: null,
    merchant_of_record_app_id: null,
    name: "#MD4349",
    note: null,
    note_attributes: [
      {
        name: "hxs_robo_try",
        value: "1",
      },
      {
        name: "hxs_robo_call",
        value: "ANSWER",
      },
      {
        name: "hxs_robo_status",
        value: "Confirmed",
      },
    ],
    number: 3349,
    order_number: 4349,
    order_status_url:
      "https://momdaughts.com/66907734308/orders/145acfe2bd5baa9a1894bcd6adf72625/authenticate?key=22bae52867caecbff853b66ff20369f4",
    original_total_additional_fees_set: null,
    original_total_duties_set: null,
    payment_gateway_names: ["Cash on Delivery (COD)"],
    phone: "+923088989634",
    po_number: null,
    presentment_currency: "PKR",
    processed_at: "2024-03-20T20:53:06+05:00",
    reference: "e00fd4bfbcec27306918ed02fc288008",
    referring_site: "https://l.facebook.com/",
    source_identifier: "e00fd4bfbcec27306918ed02fc288008",
    source_name: "web",
    source_url: null,
    subtotal_price: "699.00",
    subtotal_price_set: {
      shop_money: {
        amount: "699.00",
        currency_code: "PKR",
      },
      presentment_money: {
        amount: "699.00",
        currency_code: "PKR",
      },
    },
    tags: "Call Confirmed",
    tax_exempt: false,
    tax_lines: [],
    taxes_included: false,
    test: false,
    token: "145acfe2bd5baa9a1894bcd6adf72625",
    total_discounts: "0.00",
    total_discounts_set: {
      shop_money: {
        amount: "0.00",
        currency_code: "PKR",
      },
      presentment_money: {
        amount: "0.00",
        currency_code: "PKR",
      },
    },
    total_line_items_price: "699.00",
    total_line_items_price_set: {
      shop_money: {
        amount: "699.00",
        currency_code: "PKR",
      },
      presentment_money: {
        amount: "699.00",
        currency_code: "PKR",
      },
    },
    total_outstanding: "899.00",
    total_price: "899.00",
    total_price_set: {
      shop_money: {
        amount: "899.00",
        currency_code: "PKR",
      },
      presentment_money: {
        amount: "899.00",
        currency_code: "PKR",
      },
    },
    total_shipping_price_set: {
      shop_money: {
        amount: "200.00",
        currency_code: "PKR",
      },
      presentment_money: {
        amount: "200.00",
        currency_code: "PKR",
      },
    },
    total_tax: "0.00",
    total_tax_set: {
      shop_money: {
        amount: "0.00",
        currency_code: "PKR",
      },
      presentment_money: {
        amount: "0.00",
        currency_code: "PKR",
      },
    },
    total_tip_received: "0.00",
    total_weight: 100,
    updated_at: "2024-03-20T21:00:09+05:00",
    user_id: null,
    billing_address: {
      first_name: "Muhammad",
      address1: "Fathpur layyah",
      phone: "+923088989634",
      city: "Fatehpur",
      zip: "30150",
      province: null,
      country: "Pakistan",
      last_name: "Qasim",
      address2: null,
      company: null,
      latitude: null,
      longitude: null,
      name: "Muhammad Qasim",
      country_code: "PK",
      province_code: null,
    },
    customer: {
      id: 8149070872868,
      email: null,
      created_at: "2024-03-20T20:53:06+05:00",
      updated_at: "2024-03-20T20:53:07+05:00",
      first_name: "Muhammad",
      last_name: "Qasim",
      state: "disabled",
      note: null,
      verified_email: true,
      multipass_identifier: null,
      tax_exempt: false,
      phone: "+923088989634",
      email_marketing_consent: null,
      sms_marketing_consent: {
        state: "not_subscribed",
        opt_in_level: "single_opt_in",
        consent_updated_at: null,
        consent_collected_from: "SHOPIFY",
      },
      tags: "",
      currency: "PKR",
      accepts_marketing: false,
      accepts_marketing_updated_at: null,
      marketing_opt_in_level: null,
      tax_exemptions: [],
      admin_graphql_api_id: "gid://shopify/Customer/8149070872868",
      default_address: {
        id: 10217251995940,
        customer_id: 8149070872868,
        first_name: "Muhammad",
        last_name: "Qasim",
        company: null,
        address1: "Fathpur layyah",
        address2: null,
        city: "Fatehpur",
        province: null,
        country: "Pakistan",
        zip: "30150",
        phone: "+923088989634",
        name: "Muhammad Qasim",
        province_code: null,
        country_code: "PK",
        country_name: "Pakistan",
        default: true,
      },
    },
    discount_applications: [],
    fulfillments: [],
    line_items: [
      {
        id: 14735506538788,
        admin_graphql_api_id: "gid://shopify/LineItem/14735506538788",
        fulfillable_quantity: 1,
        fulfillment_service: "manual",
        fulfillment_status: null,
        gift_card: false,
        grams: 100,
        name: "MomDaughts' Short Tailed Menstrual Cup - Pink / Large",
        price: "699.00",
        price_set: {
          shop_money: {
            amount: "699.00",
            currency_code: "PKR",
          },
          presentment_money: {
            amount: "699.00",
            currency_code: "PKR",
          },
        },
        product_exists: true,
        product_id: 7981575209252,
        properties: [],
        quantity: 1,
        requires_shipping: true,
        sku: "SPL",
        taxable: true,
        title: "MomDaughts' Short Tailed Menstrual Cup",
        total_discount: "0.00",
        total_discount_set: {
          shop_money: {
            amount: "0.00",
            currency_code: "PKR",
          },
          presentment_money: {
            amount: "0.00",
            currency_code: "PKR",
          },
        },
        variant_id: 43723996037412,
        variant_inventory_management: "shopify",
        variant_title: "Pink / Large",
        vendor: "MomDaughts",
        tax_lines: [],
        duties: [],
        discount_allocations: [],
      },
    ],
    payment_terms: null,
    refunds: [],
    shipping_address: {
      first_name: "Muhammad",
      address1: "Fathpur layyah",
      phone: "+923088989634",
      city: "Fatehpur",
      zip: "30150",
      province: null,
      country: "Pakistan",
      last_name: "Qasim",
      address2: null,
      company: null,
      latitude: null,
      longitude: null,
      name: "Muhammad Qasim",
      country_code: "PK",
      province_code: null,
    },
    shipping_lines: [
      {
        id: 4639085330724,
        carrier_identifier: "650f1a14fa979ec5c74d063e968411d4",
        code: "Shipping 1-4 Days",
        discounted_price: "200.00",
        discounted_price_set: {
          shop_money: {
            amount: "200.00",
            currency_code: "PKR",
          },
          presentment_money: {
            amount: "200.00",
            currency_code: "PKR",
          },
        },
        phone: null,
        price: "200.00",
        price_set: {
          shop_money: {
            amount: "200.00",
            currency_code: "PKR",
          },
          presentment_money: {
            amount: "200.00",
            currency_code: "PKR",
          },
        },
        requested_fulfillment_service_id: null,
        source: "shopify",
        title: "Shipping 1-4 Days",
        tax_lines: [],
        discount_allocations: [],
      },
    ],
    store_info: {
      platform: "shopify",
      domain: "momdaughts.myshopify.com",
      shopLogo:
        "https://momdaughts.com/cdn/shop/files/shapater_logo.png?v=1666980932&width=500",
      name: "Momdaughts",
    },
    selected: true,
    sr_number: 1,
    service_type: "Express",
    courier_type: "TCS",
    correct_city: {
      cityID: 2484,
      cityName: "FATEHPUR",
      cityCode: "FPR",
      area: "MUX",
    },
  },
];
export async function GET(request) {
  // if request is from localhost, we will return the server URL as localhost
  // but if the request is from the production server, we will return the server URL as the production server
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      email: "subhankhanyz@gmail.com",
    },
    include: {
      stores: true,
      Courier: true,
    },
  });

  const func = await inngest.send({
    name: "test/tcsbook.orders",
    // "domain": "quickstart-65d173cf.myshopify.com",
    // "access_token": "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",
    // "trackingNo": "HD12"
    data: { user: user, orders: orders },
  });

  console.log("func", func);

  return Response.json({
    user,
  });
}
