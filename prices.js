/* Queen Tech – price list for price.html
   Equipment = lowest price found at UAE online shops / dealers on the "checked" date.
   "via Pricena" = price read from the Pricena UAE comparison page (Amazon.ae / Noon block direct reading).
   price: null  = the dealer only quotes on request (shown as "Price on request").
   Brand items live under v: { hikvision, dahua, honeywell, infinique, zkteco, generic }.
   To update: change price / url, then update "checked". */
window.QT_PRICES = {
  checked: "14 Oct 2026",
  offer: { label: "Limited offer · 50% off all installation" },
  brands: { hikvision: "Hikvision", dahua: "Dahua", honeywell: "Honeywell", infinique: "Infinique", zkteco: "ZKTeco", generic: "Other brand" },
  items: {
    /* ---------- CCTV ---------- */
    cam2_dome: { label: "2MP IP dome camera", v: {
      hikvision: { model: "DS-2CD1121G0-I", price: 95, shop: "Terrabyt", url: "https://www.terrabyt.com/hikvision-ds-2cd1121g0-i-2-8mm-dubai" },
      dahua:     { model: "IPC-HDW1230T1-A-S5 (eyeball)", price: 79, shop: "Terrabyt", url: "https://www.terrabyt.com/dahua-dh-ipc-hdw1230t1-a-s5-dubai" },
      honeywell: { model: "HC30W42R3", price: 1314.24, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/honeywell-hc30w42r3-30-series-2mp-ir-rugged-dome-ip-security-camera-2-8mm-lens-taiwan/" },
      infinique: { model: "INV703F-RTN", price: null, shop: "Infinique dealer", url: "https://www.infinique.com/products/inv703f-rtn" },
      zkteco:    { model: "ES-852T21C (eyeball)", price: null, shop: "SYS LLC", url: "https://www.sysllc.ae/zkteco-biopro-series-2mp-starlight-fixed-lens-face-detection-eyeball-ip-camera-es-852t21c.html" } } },
    cam2_bullet: { label: "2MP IP bullet camera", v: {
      hikvision: { model: "DS-2CD1021G0-I", price: 84, shop: "Terrabyt", url: "https://www.terrabyt.com/hikvision-ds-2cd1021g0-i-4mm-dubai" },
      dahua:     { model: "IPC-HFW1230S1-A-S5", price: 105, shop: "Terrabyt", url: "https://www.terrabyt.com/dahua-dh-ipc-hfw1230s1-a-s5-dubai" },
      honeywell: { model: "HC30WB2R1", price: 1314.24, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/honeywell-hc30wb2r1-30-series-2mp-ir-bullet-ip-security-camera-taiwan/" },
      infinique: { model: "INB703F-RTE", price: null, shop: "Infinique dealer", url: "https://www.infinique.com/products/network-camera" },
      zkteco:    { model: "BS-852T23C", price: null, shop: "SYS LLC", url: "https://www.sysllc.ae/zkteco-network-camera-biopro-series-with-2mp-fixed-lens-bs-852t23c.html" } } },
    cam4_dome: { label: "4MP IP dome camera", v: {
      hikvision: { model: "DS-2CD1143G0-I", price: 174, shop: "Terrabyt", url: "https://www.terrabyt.com/hikvision-ds-2cd1143g0-i-4mm-dubai" },
      dahua:     { model: "IPC-HDBW2431E-S-S2", price: 158, shop: "Terrabyt", url: "https://www.terrabyt.com/dahua-hdbw2431e-s-s2-dubai" },
      honeywell: { model: "H4W4PER2", price: null, shop: "Terrabyt", url: "https://www.terrabyt.com/honeywell-h4w4per2-wdr-4-mp-mini-camera-dubai" },
      infinique: { model: "INV413Z-RWTM", price: null, shop: "Infinique dealer", url: "https://www.infinique.com/products/network-camera" },
      zkteco:    { model: "ES-854N11-12-13H (eyeball)", price: null, shop: "SYS LLC", url: "https://www.sysllc.ae/zkteco-e-series-4mp-ir-eyeball-network-camera-es-854n11-12-13h.html" } } },
    cam4_bullet: { label: "4MP IP bullet camera", v: {
      hikvision: { model: "DS-2CD1043G2-LIU", price: 177, shop: "Noon (via Pricena)", url: "https://ae.pricena.com/en/product/4-mp-smart-hybrid-light-fixed-bullet-network-camera-2-8-mm-lens-h-265-compression-up-to-30m-ir-light-range-built-in-mic-ip67-water-and-dust-resistant-ds-2cd1043g2-liu-price-in-dubai-uae-212068860" },
      dahua:     { model: "IPC-HFW1431S1-S4", price: 140, shop: "Terrabyt", url: "https://www.terrabyt.com/dahua-dh-ipc-hfw1431s1-s4-dubai" },
      honeywell: { model: "HBW4PER2V", price: 990, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/honeywell-hbw4per2v-wdr-4mp-ir-bullet-camera-mfz-lens/" },
      infinique: { model: "INB413Z-RWTM", price: null, shop: "Infinique dealer", url: "https://www.infinique.com/products/network-camera" },
      zkteco:    { model: "BS-854N22C", price: null, shop: "ZKTeco dealer", url: "https://www.buyitproducts.com/zkteco-biopro-series-4mp-fixed-lens-face-detection-bullet-ip-camera-bs-854n22c.html" } } },
    cam4_colorvu: { label: "4MP colour-at-night camera", v: {
      hikvision: { model: "ColorVu DS-2CD1047G2-LUF", price: 263, shop: "Terrabyt", url: "https://www.terrabyt.com/hikvision-ds-2cd1047g2-luf-2-8mm-dubai" },
      dahua:     { model: "Full-color IPC-HFW1439S1-LED-S4", price: 168, shop: "Terrabyt", url: "https://www.terrabyt.com/dahua-dh-ipc-hfw1439s1-led-s4-dubai" },
      infinique: { model: "INB513Z-RWTA (5MP)", price: null, shop: "Infinique dealer", url: "https://www.infinique.com/products/network-camera" },
      zkteco:    { model: "ES-852T11C-C (2MP full colour)", price: null, shop: "SYS LLC", url: "https://www.sysllc.ae/zkteco-biopro-series-2mp-full-color-face-detection-eyeball-ip-camera-es-852t11c-c.html" } } },
    nvr4: { label: "4-channel PoE recorder (NVR)", bays: 1, v: {
      hikvision: { model: "DS-7104NI-Q1/4P/M", price: 204, shop: "Terrabyt", url: "https://www.terrabyt.com/DS-7104NI-Q1-4P-M-Dubai" },
      dahua:     { model: "NVR1104HS-P-S3/H", price: 176, shop: "Terrabyt", url: "https://www.terrabyt.com/dhi-nvr1104hs-p-s3h-dubai" },
      honeywell: { model: "HN35040100", price: null, shop: "Honeywell dealer", url: "https://www.a1securitycameras.com/honeywell-hn35040100-35-series-4k-4-channel-embedded-nvr-1hd-ndaa-compliant-hdd-not-included.html" },
      infinique: { model: "INR4-12F2I-S4P", price: null, shop: "Infinique dealer", url: "https://infinique.in/products/inr4-12f2i-s4p" },
      zkteco:    { model: "Z8504NER-4P", price: null, shop: "ZKTeco dealer", url: "https://www.zkteco.com/en/POENVR/Z8504-08NER-4P-8P" } } },
    nvr8: { label: "8-channel PoE recorder (NVR)", bays: 1, v: {
      hikvision: { model: "DS-7108NI-Q1/8P", price: 311, shop: "Terrabyt", url: "https://www.terrabyt.com/ds-7108ni-q1-8p-dubai" },
      dahua:     { model: "NVR1108HS-8P-S3/H", price: 344, shop: "Terrabyt", url: "https://www.terrabyt.com/dahua-dhi-nvr1108hs-8p-s3-h-dubai" },
      honeywell: { model: "HN30080200", price: 2417.63, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/honeywell-hn30080200-30-series-4k-8-channel-h-265-h-264-poe-nvr-taiwan/" },
      infinique: { model: "INR8-24F2I-SE18P", price: null, shop: "Infinique dealer", url: "https://www.infinique.com/products/inr8-24f2i-se18p" },
      zkteco:    { model: "Z8508NER-8P", price: null, shop: "ZKTeco dealer", url: "https://www.zkteco.com/en/POENVR/Z8504-08NER-4P-8P" } } },
    nvr16: { label: "16-channel PoE recorder (NVR)", bays: 2, v: {
      hikvision: { model: "DS-7616NI-Q2/16P", price: 662, shop: "Terrabyt", url: "https://www.terrabyt.com/DS-7616NI-Q2-16P-Dubai" },
      dahua:     { model: "NVR2216-16P-I", price: 641, shop: "Terrabyt", url: "https://www.terrabyt.com/dhi-nvr2216-16p-i-dubai" },
      honeywell: { model: "HN30160200", price: 2879.82, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/honeywell-hn30160200-30-series-4k-16-channel-h-265-h-264-poe-nvr-taiwan/" },
      infinique: { model: "INR16-48F2I-SE116P", price: null, shop: "Infinique dealer", url: "https://www.infinique.com/products/inr16-48f2i-se116p" },
      zkteco:    { model: "Z8516/32NFR-16P", price: null, shop: "SYS LLC", url: "https://www.sysllc.ae/zkteco-z8000nfr-p-series-16-32-channel-4k-h-265-network-video-recorder-z8516-32nfr-16p.html" } } },
    hdd1: { label: "Surveillance hard disk 1TB", tb: 1, v: { generic: { model: "Seagate SkyHawk ST1000VX013", price: 299, shop: "Noon (via Pricena)", url: "https://ae.pricena.com/en/product/skyhawk-5400-hard-drive-st1000vx013-1-tb-price-in-dubai-uae-175906932" } } },
    hdd2: { label: "Surveillance hard disk 2TB", tb: 2, v: { generic: { model: "Seagate SkyHawk ST2000VX017", price: 564, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/seagate-skyhawk-2tb-video-internal-hard-hdd-3-5-sata-6gb-s-256mb-cache-for-dvr-nvr-security-camera-system-st2000vx017-price-in-dubai-uae-219324310" } } },
    hdd4: { label: "Surveillance hard disk 4TB", tb: 4, v: { generic: { model: "Seagate SkyHawk ST4000VX016", price: 699, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/skyhawk-surveillance-internal-hard-drive-hdd-3-5-inch-sata-6-gb-s-64-mb-cache-for-dvr-nvr-security-camera-system-and-three-year-rescue-services-st4000vx016-4-0-tb-price-in-dubai-uae-158108713" } } },
    hdd8: { label: "Surveillance hard disk 8TB", tb: 8, v: { generic: { model: "Seagate SkyHawk ST8000VXZ10", price: 1449, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/seagate-skyhawk-8tb-video-internal-hard-hdd-3-5-sata-6gb-s-256mb-cache-for-dvr-nvr-security-camera-system-ffp-st8000vxz10-price-in-dubai-uae-210954391" } } },
    cat6:    { label: "Cat6 solid-copper cable, 305 m box", v: { generic: { model: "Hikvision DS-1LN6U-G", price: 560, shop: "Terrabyt", url: "https://www.terrabyt.com/DS-1LN6U-G-Dubai" } } },
    monitor: { label: "22\" monitor for the recorder", v: { generic: { model: "Samsung LS22A330NHMXUE", price: 230, shop: "Terrabyt", url: "https://www.terrabyt.com/samsung-ls22a330nhmxue-dubai" } } },

    /* ---------- Access control ---------- */
    ac_card: { label: "Card + PIN access reader", v: {
      generic: { model: "Standalone RFID keypad, 2,000 users", price: 106.35, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/2k-user-metal-case-em-125khz-rfid-standalone-access-control-price-in-dubai-uae-210506510" },
      zkteco:  { model: "KR502E (needs controller)", price: 273.6, shop: "neotech.ae", url: "https://neotech.ae/products/zkteco-kr502e-proximity-with-keypad-access-card-reader" },
      dahua:   { model: "ASI1201E", price: null, shop: "itstore.ae", url: "https://www.itstore.ae/product/dahua-asi1201e-asi1201e-d/" },
      honeywell: { model: "Omni Smart 40K", price: null, shop: "Honeywell dealer", url: "https://buildings.honeywell.com/ae/en/products/by-category/access-control/readers-and-keypads/card-readers/omni-smart-40k-reader" } } },
    ac_finger: { label: "Fingerprint + card + PIN terminal", v: {
      hikvision: { model: "DS-K1T807MBFWX-E1", price: 398.98, shop: "Carrefour UAE", url: "https://www.carrefouruae.com/mafuae/en/all-in-one-printers/hikvision-ds-k1t807mbfwx-e1-fingerprint-access-control-terminal-2-4-lcd-screen-ip65-standard-poe-wi-fi-ap-mode-m1-card-pin-authentication-5000-fingerprints-wall-mount-black-/p/880532014474" },
      zkteco:    { model: "SF300 (with attendance)", price: 374, shop: "costtocost.ae", url: "https://costtocost.ae/zkteco-sf300-access-control-with-time-attendance/" },
      dahua:     { model: "ASI1212D", price: null, shop: "itstore.ae", url: "https://www.itstore.ae/product/dahua-asi1212d-asi1212d-d/" } } },
    ac_face: { label: "Face recognition terminal", v: {
      hikvision: { model: "DS-K1T342MFWX-E1", price: 679.85, shop: "Noon (via Pricena)", url: "https://ae.pricena.com/en/product/ds-k1t342mfwx-e1-poe-face-access-terminal-with-face-4-3-lcd-touch-screenfinger-and-card-access-with-wi-fi-supports-isapi-isup5-0-max-1500-faces-capacity-ip65-black-ds-k1t342mfwx-e1-price-in-dubai-uae-190543487" },
      zkteco:    { model: "SpeedFace-V5L", price: 1365, shop: "costtocost.ae", url: "https://costtocost.ae/zkteco-speedface-v5l-attendance-door-access-control/" },
      dahua:     { model: "ASI6214J-MFW", price: 672, shop: "Terrabyt", url: "https://www.terrabyt.com/dahua-dhi-asi6214j-mfw-dubai" } } },
    maglock:   { label: "Magnetic door lock 600 lbs (280 kg)", v: { generic: { model: "EM lock 600 lbs", price: 92, shop: "costtocost.ae", url: "https://costtocost.ae/electro-magnetic-lock-600-lbs/" } } },
    bracket:   { label: "ZL bracket for magnetic lock", v: { generic: { model: "Quant Q-Y280ZL", price: 41.25, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/zl-bracket-use-for-electromagnetic-280-kg-600-lbs-250mm-x-47mm-180mm-x-53mm-q-y280zl/" } } },
    exitbtn:   { label: "Door exit push button", v: { generic: { model: "ZKTeco metal exit button", price: 22, shop: "costtocost.ae", url: "https://costtocost.ae/door-metal-exit-push-button/" } } },
    psu:       { label: "12V 5A power supply with battery backup", v: { generic: { model: "Xenocam 9-way 12V 5A", price: 199, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/xenocam-9-channel-9-way-12v-5amp-dc-metal-boxed-cabinet-regulated-power-supply-unit-with-backup-battery-link-for-burglar-alarms-cctv-cameras-ptz-access-control-price-in-dubai-uae-103989772" } } },
    breakglass:{ label: "Emergency break glass (fire safety)", v: { generic: { model: "Elock EL-EB4G", price: 21, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/el-eb4g-emergency-break-glass-door-release-green/" } } },
    cards50:   { label: "RFID cards / key fobs, 50 pcs", v: { generic: { model: "EM4100 125kHz", price: 73.26, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/50pcs-em-4100-4102-125khz-rfid-proximity-id-card-token-tags-key-fobs-price-in-dubai-uae-211241442" } } },
    chime:     { label: "Wireless door bell (chime + button)", v: { generic: { model: "Oshtraco wireless set", price: 52.49, shop: "Carrefour UAE", url: "https://www.carrefouruae.com/mafuae/en/door-bell/osh-wireless-doorbel-set-re-battery/p/1892303" } } },
    intercom:  { label: "Video intercom kit (door station + indoor screen)", v: {
      hikvision: { model: "DS-KIS604-P (7\")", price: 774.99, shop: "Carrefour UAE", url: "https://www.carrefouruae.com/mafuae/en/door-bell/hikvision-ds-kis604-p-video-intercom-villa-door-station-bundle-7-inch-colorful-touch-screen-with-resolution-1024-600-standard-poe-views-live-videos-of-door-stations-and-linked-cameras/p/6941264036401" },
      dahua:     { model: "KTP03 Pro", price: 497, shop: "Terrabyt", url: "https://www.terrabyt.com/dahua-dhi-ktp03-pro-dubai" },
      zkteco:    { model: "VK07-A51L kit", price: null, shop: "ZKTeco dealer", url: "https://zkteco.com/en/VillaSeries/VK07-A51L_Kit" } } },

    /* ---------- Home ---------- */
    wifi_in:   { label: "Wi-Fi indoor camera (pan/tilt)", v: { generic: { model: "EZVIZ C6N 1080p", price: 74, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/ezviz-c6n-baby-monitor-security-camera-1080p-wifi-camera-surveillance-camera-cctv-for-home-with-night-vision-360-coverage-smart-tracking-motion-detection-two-way-audio-h-264-works-with-alexa-price-in-dubai-uae-210624887" } } },
    wifi_out:  { label: "Wi-Fi outdoor camera", v: { generic: { model: "EZVIZ H3c 1080p", price: 149, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/ezviz-h3c-security-camera-1080p-2mp-outdoor-wifi-camera-cctv-for-home-with-ir-night-vision-ai-human-shape-detection-weatherproof-design-audio-pick-up-compatible-with-alexa-and-google-assistant-price-in-dubai-uae-210649036" } } },
    vdoorbell: { label: "Video doorbell with chime", v: { generic: { model: "EZVIZ DB2C", price: 399, shop: "Carrefour UAE", url: "https://www.carrefouruae.com/mafuae/en/ip-camera/ezviz-db2c-wirefree-video-doorbell-with-chime-rechargable-battery-powerd-wireless-smart-home-security-camera-two-way-talk-human-detection-full-hd-night-vision/p/8081280382453" } } },

    /* ---------- Gate barrier ---------- */
    barrier: { label: "Automatic boom barrier, 4 m arm", v: {
      hikvision: { model: "DS-TMG4B0 kit (incl. photocells, light, 2 remotes)", price: 3750, shop: "Merac Dubai", url: "https://www.meracdxb.com/products/hikvision-automatic-gate-barrier-4-mtr-sr4", includes: ["photocell", "remote"] },
      generic:   { model: "Elock EL-BG3S-4M", price: 3487, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/elock-el-bg3s-4m-barrier-gate-set/" },
      zkteco:    { model: "ProBG3000 / BG1000", price: null, shop: "itproducts.ae", url: "https://www.itproducts.ae/zkteco-high-performance-and-high-speed-barrier-gate-probg3000.html" },
      dahua:     { model: "IPMECS-2201", price: null, shop: "Dahua dealer", url: "" } } },
    anpr: { label: "ANPR number-plate camera", v: {
      dahua:     { model: "ITC215-PW6M-IRLZF-B", price: 1665, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/dahua-dhi-itc215-pw6m-irlzf-b-access-anpr-camera/" },
      hikvision: { model: "DS-TCG406-E", price: null, shop: "Hikvision dealer", url: "" },
      zkteco:    { model: "LPRS2000", price: null, shop: "ZKTeco dealer", url: "" } } },
    loopdet:  { label: "Vehicle loop detector", v: { generic: { model: "PD-132 single channel", price: 99, shop: "gatesautomatic.com", url: "https://www.gatesautomatic.com/loop-detector-uae" } } },
    loopwire: { label: "Loop cable, 100 m roll", v: { generic: { model: "Loop detector cable", price: 120, shop: "gatesautomatic.com", url: "https://www.gatesautomatic.com/loop-detector-cable" } } },
    photocell:{ label: "Photocell safety beam (pair)", v: { generic: { model: "Elock EL-AGO-20", price: 87, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/elock-el-ago-20-barrier-gate-door-opener-infrared-beam-photocell-sensor/" } } },
    qr: { label: "QR code reader for visitors", v: {
      generic:   { model: "Quant Q-QR80+IC", price: 425.5, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/quant-qr-code-mifare-reader-86mm-x-86mm-x-42mm-q-qr80ic-wiegand/" },
      honeywell: { model: "TALOS HON-QR926-7N", price: 1458, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/honeywell-talos-qr-static-code-reader-hon-qr926-7n-china/" },
      zkteco:    { model: "QR500", price: null, shop: "itproducts.ae", url: "https://www.itproducts.ae/zkteco-intelligent-access-control-card-reader-qr500-series-reader.html" },
      hikvision: { model: "DS-K1107AEK", price: null, shop: "Hikvision dealer", url: "" } } },
    controller: { label: "Access controller for the barrier", v: {
      generic:   { model: "Felix F-2002 (2 lanes)", price: 378.75, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/felix-two-doors-tcp-ip-network-access-control-panel-f-2002/", lanes: 2 },
      zkteco:    { model: "C3-400 (4 lanes)", price: 1157, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/zkteco-zk-c3-400-ip-based-door-access-control-panel/", lanes: 4 },
      honeywell: { model: "MPA2C1", price: 5036.68, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/honeywell-mpa2c1-mpa2-series-all-in-smart-access-control-panel-usa/", lanes: 4 },
      hikvision: { model: "DS-K2601T", price: null, shop: "Hikvision dealer", url: "", lanes: 1 } } },
    uhf: { label: "UHF long-range tag reader (residents' cars)", v: {
      generic: { model: "Quant Q-803C-LED", price: 1143.1, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/quant-uhf-long-range-1-led-9dbi-reader-255mm-x-255mm-x-42mm-q-803c-led/" },
      zkteco:  { model: "UHF5 Pro", price: null, shop: "neotech.ae", url: "https://neotech.ae/products/1-3252" } } },
    uhf_tag: { label: "UHF windshield tag (per car)", v: { generic: { model: "Quant Q-UHF-P1N", price: 7.5, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/pet-3m-sticker-uhf-windshield-card-sticker-868-mhz-915-mhz-100mm-x-40mm-q-uhf-p1n/" } } },
    remote: { label: "Remote control kit (receiver + 3 remotes)", v: { generic: { model: "Elock RC-RT13", price: 150, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/elock-rc-rt13-remote-control-set-c-w-3-transmitter/" } } },

    /* ---------- Network ---------- */
    ap5:    { label: "Ceiling Wi-Fi 5 access point", v: { generic: { model: "TP-Link Omada EAP225", price: 175, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/eap225-omada-ac1350-gigabit-wireless-access-point-business-wifi-solution-w-mesh-support-seamless-roaming-and-mu-mimo-poe-powered-sdn-integrated-cloud-access-and-omada-app-white-price-in-dubai-uae-224445044" } } },
    ap6:    { label: "Ceiling Wi-Fi 6 access point", v: { generic: { model: "TP-Link Omada EAP650", price: 294, shop: "Noon (via Pricena)", url: "https://ae.pricena.com/en/product/eap650-ax3000-mesh-ceiling-mount-wifi-6-access-point-seamless-roaming-up-to-2976-mbps-wifi-speeds-wpa3-mumimo-remote-and-app-control-poe-powered-multiple-controller-options-white-price-in-dubai-uae-203014278" } } },
    poe8:   { label: "10-port switch with 8 PoE ports", v: { generic: { model: "TP-Link TL-SG1210P", price: 193, shop: "Noon (via Pricena)", url: "https://ae.pricena.com/en/product/10-port-gigabit-desktop-switch-with-8-port-poe-ethernet-switch-910-100-1000mbps-rj45-ports-1gigabit-sfp-port-tl-sg1210p-black-price-in-dubai-uae-203014237" } } },
    poe16:  { label: "16-port PoE switch", v: { generic: { model: "D-Link DGS-F1016P", price: 449.6, shop: "Noon (via Pricena)", url: "https://ae.pricena.com/en/product/16-port-gigabit-unmanaged-poe-switch-with-2-sfp-ports-250-watts-1610-100-1000mbps-ports-2gigabit-sfp-uplink-ports-dgs-f1016p-black-price-in-dubai-uae-175308803" } } },
    sw24:   { label: "24-port gigabit switch", v: { generic: { model: "D-Link DGS-1024C", price: 215, shop: "Sharaf DG", url: "https://uae.sharafdg.com/product/d-link-24-port-unmanaged-desktop-switch/" } } },
    router: { label: "Business router (VPN, multi-WAN)", v: { generic: { model: "TP-Link Omada ER605", price: 180.4, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/search/?s=er605" } } },
    patch24:{ label: "24-port Cat6 patch panel (loaded)", v: { generic: { model: "D-Link NPP-C61BLK241", price: 102.98, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/24-port-cat-6-utp-loaded-patch-panel-black-price-in-dubai-uae-217458999" } } },
    cab6u:  { label: "6U wall-mount network cabinet", v: { generic: { model: "XFORM 6U 600×600", price: 245, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/wall-mount-server-rack-cabinet-6u-600mm-w-x-600mm-d-x-370mm-h-high-quality-6u-cabinet-loading-capacity-70kg-price-in-dubai-uae-124112434" } } },
    keystone:{ label: "Cat6 keystone jack", v: { generic: { model: "SATMAXIMUM Cat6 (from 50-pack)", price: 4.64, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/cat6-rj45-keystone-jack-punch-down-network-black-50-price-in-dubai-uae-85522291" } } },
    faceplate:{ label: "Network wall faceplate", v: { generic: { model: "Kuwes 1-port (from 10-pack)", price: 11, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/kuwes-pvc-single-port-face-plate-ethernet-wall-plate-cat-6-single-cat6-rj45-face-plate-made-in-taiwan-10pcs-price-in-dubai-uae-135978223" } } }
  },
  /* Queen Tech labour (AED). "was" shows crossed out (50% offer). */
  labour: {
    cam:      { name: "Camera installation (cabling, mounting, testing)", per: "camera", was: 150, price: 75 },
    nvr:      { name: "Recorder setup + phone app + handover", per: "system", was: 150, price: 75 },
    wificam:  { name: "Wi-Fi camera mounting + app setup", per: "camera", was: 75, price: 37.5 },
    door:     { name: "Access control door installation (reader, lock, button, cabling)", per: "door", was: 350, price: 175 },
    intercom: { name: "Video intercom / doorbell installation", per: "unit", was: 200, price: 100 },
    point:    { name: "Network point (Cat6 cabling + termination)", per: "point", was: 100, price: 50 },
    ap:       { name: "Wi-Fi access point installation + setup", per: "access point", was: 150, price: 75 },
    rack:     { name: "Network cabinet, switch & router setup", per: "system", was: 300, price: 150 },
    barrier:  { name: "Barrier installation (anchoring, wiring, arm, testing)", per: "barrier", was: 1200, price: 600 },
    loop:     { name: "Loop cutting in the road + sealing + tuning", per: "loop", was: 400, price: 200 },
    anprset:  { name: "ANPR camera mounting + plate list setup", per: "camera", was: 300, price: 150 },
    reader:   { name: "Reader / controller wiring + programming", per: "reader", was: 200, price: 100 }
  },
  /* Tools checklist for the hardware-only list (technicians). */
  tools: {
    common: ["Hammer drill + masonry bits (6/8/10 mm)", "Wall plugs, screws & anchors", "Ladder", "Screwdriver set (flat, Phillips, precision)", "Multimeter", "Wire stripper & side cutter", "Cable ties, clips & labels", "Laptop with the device software", "Safety gear: gloves, goggles"],
    cctv: ["RJ45 crimping tool + Cat6 connectors", "Network cable tester", "CCTV / IPC tester monitor (PoE)", "Fish tape / draw wire", "PVC conduit or trunking + accessories", "Outdoor junction boxes for cameras", "HDMI cable + mouse for the recorder", "SADP / ConfigTool to find cameras"],
    access: ["Wood / metal drill bits for door frames", "Hole saw for exit button box", "6-core / 8-core alarm cable", "Cable ferrules + crimper", "Back boxes for reader and button", "Silicone sealant (outdoor readers)", "Access software (iVMS-4200 / ZKBio / SmartPSS)"],
    home: ["Phone with the EZVIZ / Hik-Connect app", "MicroSD cards for Wi-Fi cameras", "Extension cord + power adapters", "Outdoor silicone sealant"],
    barrier: ["Road / concrete cutter with diamond blade (5–6 mm loop slots)", "Loop sealant / epoxy", "M12 anchor bolts + chemical anchor", "Spirit level + measuring tape", "Armoured power cable (outdoor)", "Underground conduit + draw pit", "Traffic cones & warning signs", "High-visibility vest"],
    network: ["Punch-down tool", "RJ45 crimper + Cat6 connectors", "Cable tester / certifier", "Label maker", "Patch cords 0.5 m / 1 m", "Cable management panel + velcro ties", "Console cable", "Controller software (Omada)"]
  }
};
/* After the offer ends (see QT_OFFER in i18n.js), installation goes back to the normal price. */
(function(){var O=window.QT_OFFER,L=window.QT_PRICES&&window.QT_PRICES.labour;if(!O||O.on||!L)return;
  for(var k in L){if(L[k]&&L[k].was){L[k].price=L[k].was;delete L[k].was}}})();
