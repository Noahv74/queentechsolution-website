/* Queen Tech – prices for ExpressFix, CCTV Care Plan, IT Support Plans and Wi-Fi Checkup.
   approved: false  → the pages show "Price on request" instead of the numbers below.
   approved: true   → the numbers are shown on the site.
   All prices in AED. Change a number, keep the commas and quotes as they are. */
window.QT_PLANS = {
  approved: false,

  /* ExpressFix – PC, laptop, phone and tablet repair */
  express: {
    dropoffDiagnosis: 0,          /* on-site visit: free check */
    pickupFee: 49,                /* pickup + return in Dubai */
    pickupFreeOver: 500,          /* pickup free when the repair costs more than this */
    declineFee: 59,               /* only if you pick it up from us and decide not to repair */
    warrantyDays: 90,
    from: {                       /* "from" prices, labour only; parts priced for your model */
      windows: 150,               /* Windows / macOS reinstall + drivers */
      virus: 120,                 /* virus and junk clean-up */
      clean: 150,                 /* deep clean + new thermal paste */
      ssd: 100,                   /* SSD or RAM upgrade, data moved */
      phoneBattery: 150,          /* phone battery, fitting (part priced by model) */
      data: 200                   /* data recovery from a working drive */
    }
  },

  /* CCTV maintenance contracts – yearly, "from" prices (final price depends on the site).
     careApproved: true shows these prices even while approved is false. */
  careApproved: true,
  care: [
    { id: "standard",   visits: 4,  from: 2000, response: "48 working hours" },
    { id: "pro",        visits: 6,  from: 4500, response: "24 hours", featured: true },
    { id: "enterprise", visits: 12, from: 9000, response: "4-6 hours on site", custom: true }
  ],

  /* Business IT Support – per month */
  it: [
    { id: "starter",  users: 5,  visits: 1, price: 499,  extraUser: 90 },
    { id: "business", users: 15, visits: 2, price: 1199, extraUser: 80, featured: true },
    { id: "pro",      users: 30, visits: 4, price: 2199, extraUser: 70, priority: true }
  ],

  /* Wi-Fi Checkup – one visit; fee taken off the installation if you go ahead with us */
  wifi: [
    { id: "small",  price: 199 },   /* apartment, small office or shop */
    { id: "medium", price: 349 },   /* villa or office up to about 3,000 sq ft */
    { id: "large",  price: 599 }    /* large villa, office floor or warehouse */
  ]
};
