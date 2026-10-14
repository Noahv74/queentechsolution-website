/* Queen Tech – price list for price.html
   Equipment = lowest price found at UAE online shops on the "checked" date.
   "via Pricena" = price read from the Pricena UAE comparison page (Amazon.ae / Noon block direct reading).
   To update a price: change "price" (AED) and "url", then update "checked". */
window.QT_PRICES = {
  checked: "14 Oct 2026",
  offer: { label: "Limited offer · 50% off all installation" },
  items: {
    cam2_dome:   { name: "Hikvision 2MP IP dome camera", model: "DS-2CD1121G0-I", price: 95, shop: "Terrabyt", url: "https://www.terrabyt.com/hikvision-ds-2cd1121g0-i-2-8mm-dubai" },
    cam2_bullet: { name: "Hikvision 2MP IP bullet camera", model: "DS-2CD1021G0-I", price: 84, shop: "Terrabyt", url: "https://www.terrabyt.com/hikvision-ds-2cd1021g0-i-4mm-dubai" },
    cam4_dome:   { name: "Hikvision 4MP IP dome camera", model: "DS-2CD1143G0-I", price: 174, shop: "Terrabyt", url: "https://www.terrabyt.com/hikvision-ds-2cd1143g0-i-4mm-dubai" },
    cam4_bullet: { name: "Hikvision 4MP IP bullet camera", model: "DS-2CD1043G2-LIU", price: 177, shop: "Noon (via Pricena)", url: "https://ae.pricena.com/en/product/4-mp-smart-hybrid-light-fixed-bullet-network-camera-2-8-mm-lens-h-265-compression-up-to-30m-ir-light-range-built-in-mic-ip67-water-and-dust-resistant-ds-2cd1043g2-liu-price-in-dubai-uae-212068860" },
    cam4_colorvu:{ name: "Hikvision 4MP ColorVu camera (colour at night)", model: "DS-2CD1047G2-LUF", price: 263, shop: "Terrabyt", url: "https://www.terrabyt.com/hikvision-ds-2cd1047g2-luf-2-8mm-dubai" },
    nvr4:  { name: "Hikvision 4-channel PoE recorder (NVR)", model: "DS-7104NI-Q1/4P/M", price: 204, shop: "Terrabyt", url: "https://www.terrabyt.com/DS-7104NI-Q1-4P-M-Dubai", bays: 1 },
    nvr8:  { name: "Hikvision 8-channel PoE recorder (NVR)", model: "DS-7108NI-Q1/8P", price: 311, shop: "Terrabyt", url: "https://www.terrabyt.com/ds-7108ni-q1-8p-dubai", bays: 1 },
    nvr16: { name: "Hikvision 16-channel PoE recorder (NVR)", model: "DS-7616NI-Q2/16P", price: 662, shop: "Terrabyt", url: "https://www.terrabyt.com/DS-7616NI-Q2-16P-Dubai", bays: 2 },
    hdd1:  { name: "Seagate SkyHawk 1TB surveillance hard disk", model: "ST1000VX013", price: 299, shop: "Noon (via Pricena)", url: "https://ae.pricena.com/en/product/skyhawk-5400-hard-drive-st1000vx013-1-tb-price-in-dubai-uae-175906932", tb: 1 },
    hdd2:  { name: "Seagate SkyHawk 2TB surveillance hard disk", model: "ST2000VX017", price: 564, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/seagate-skyhawk-2tb-video-internal-hard-hdd-3-5-sata-6gb-s-256mb-cache-for-dvr-nvr-security-camera-system-st2000vx017-price-in-dubai-uae-219324310", tb: 2 },
    hdd4:  { name: "Seagate SkyHawk 4TB surveillance hard disk", model: "ST4000VX016", price: 699, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/skyhawk-surveillance-internal-hard-drive-hdd-3-5-inch-sata-6-gb-s-64-mb-cache-for-dvr-nvr-security-camera-system-and-three-year-rescue-services-st4000vx016-4-0-tb-price-in-dubai-uae-158108713", tb: 4 },
    hdd8:  { name: "Seagate SkyHawk 8TB surveillance hard disk", model: "ST8000VXZ10", price: 1449, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/seagate-skyhawk-8tb-video-internal-hard-hdd-3-5-sata-6gb-s-256mb-cache-for-dvr-nvr-security-camera-system-ffp-st8000vxz10-price-in-dubai-uae-210954391", tb: 8 },
    cat6:  { name: "Cat6 solid-copper cable, 305 m box", model: "Hikvision DS-1LN6U-G", price: 560, shop: "Terrabyt", url: "https://www.terrabyt.com/DS-1LN6U-G-Dubai" },
    monitor: { name: "22\" Full HD monitor for the recorder", model: "Samsung LS22A330NHMXUE", price: 230, shop: "Terrabyt", url: "https://www.terrabyt.com/samsung-ls22a330nhmxue-dubai" },

    ac_card:   { name: "Card + PIN access keypad (standalone)", model: "RFID EM 125kHz, 2,000 users", price: 106.35, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/2k-user-metal-case-em-125khz-rfid-standalone-access-control-price-in-dubai-uae-210506510" },
    ac_finger: { name: "Hikvision fingerprint + card + PIN terminal", model: "DS-K1T807MBFWX-E1", price: 398.98, shop: "Carrefour UAE", url: "https://www.carrefouruae.com/mafuae/en/all-in-one-printers/hikvision-ds-k1t807mbfwx-e1-fingerprint-access-control-terminal-2-4-lcd-screen-ip65-standard-poe-wi-fi-ap-mode-m1-card-pin-authentication-5000-fingerprints-wall-mount-black-/p/880532014474" },
    ac_face:   { name: "Hikvision face + fingerprint + card terminal", model: "DS-K1T342MFWX-E1", price: 679.85, shop: "Noon (via Pricena)", url: "https://ae.pricena.com/en/product/ds-k1t342mfwx-e1-poe-face-access-terminal-with-face-4-3-lcd-touch-screenfinger-and-card-access-with-wi-fi-supports-isapi-isup5-0-max-1500-faces-capacity-ip65-black-ds-k1t342mfwx-e1-price-in-dubai-uae-190543487" },
    maglock:   { name: "Magnetic door lock 600 lbs (280 kg)", model: "EM lock 600 lbs", price: 92, shop: "costtocost.ae", url: "https://costtocost.ae/electro-magnetic-lock-600-lbs/" },
    bracket:   { name: "ZL bracket for magnetic lock", model: "Q-Y280ZL", price: 41.25, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/zl-bracket-use-for-electromagnetic-280-kg-600-lbs-250mm-x-47mm-180mm-x-53mm-q-y280zl/" },
    exitbtn:   { name: "Door exit push button", model: "ZKTeco metal exit button", price: 22, shop: "costtocost.ae", url: "https://costtocost.ae/door-metal-exit-push-button/" },
    psu:       { name: "12V 5A power supply with battery backup", model: "Xenocam 9-way 12V 5A", price: 199, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/xenocam-9-channel-9-way-12v-5amp-dc-metal-boxed-cabinet-regulated-power-supply-unit-with-backup-battery-link-for-burglar-alarms-cctv-cameras-ptz-access-control-price-in-dubai-uae-103989772" },
    breakglass:{ name: "Emergency break glass (fire safety)", model: "Elock EL-EB4G", price: 21, shop: "securitysupplies.ae", url: "https://www.securitysupplies.ae/product/el-eb4g-emergency-break-glass-door-release-green/" },
    cards50:   { name: "RFID cards / key fobs, 50 pcs", model: "EM4100 125kHz", price: 73.26, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/50pcs-em-4100-4102-125khz-rfid-proximity-id-card-token-tags-key-fobs-price-in-dubai-uae-211241442" },
    chime:     { name: "Wireless door bell (chime + button)", model: "Oshtraco wireless set", price: 52.49, shop: "Carrefour UAE", url: "https://www.carrefouruae.com/mafuae/en/door-bell/osh-wireless-doorbel-set-re-battery/p/1892303" },
    intercom:  { name: "Hikvision video intercom kit, 7\" screen", model: "DS-KIS604-P", price: 774.99, shop: "Carrefour UAE", url: "https://www.carrefouruae.com/mafuae/en/door-bell/hikvision-ds-kis604-p-video-intercom-villa-door-station-bundle-7-inch-colorful-touch-screen-with-resolution-1024-600-standard-poe-views-live-videos-of-door-stations-and-linked-cameras/p/6941264036401" },

    wifi_in:   { name: "EZVIZ Wi-Fi indoor camera (pan/tilt)", model: "C6N 1080p", price: 74, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/ezviz-c6n-baby-monitor-security-camera-1080p-wifi-camera-surveillance-camera-cctv-for-home-with-night-vision-360-coverage-smart-tracking-motion-detection-two-way-audio-h-264-works-with-alexa-price-in-dubai-uae-210624887" },
    wifi_out:  { name: "EZVIZ Wi-Fi outdoor camera", model: "H3c 1080p", price: 149, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/ezviz-h3c-security-camera-1080p-2mp-outdoor-wifi-camera-cctv-for-home-with-ir-night-vision-ai-human-shape-detection-weatherproof-design-audio-pick-up-compatible-with-alexa-and-google-assistant-price-in-dubai-uae-210649036" },
    vdoorbell: { name: "EZVIZ video doorbell with chime", model: "DB2C", price: 399, shop: "Carrefour UAE", url: "https://www.carrefouruae.com/mafuae/en/ip-camera/ezviz-db2c-wirefree-video-doorbell-with-chime-rechargable-battery-powerd-wireless-smart-home-security-camera-two-way-talk-human-detection-full-hd-night-vision/p/8081280382453" },

    ap5:    { name: "TP-Link Omada ceiling Wi-Fi 5 access point", model: "EAP225", price: 175, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/eap225-omada-ac1350-gigabit-wireless-access-point-business-wifi-solution-w-mesh-support-seamless-roaming-and-mu-mimo-poe-powered-sdn-integrated-cloud-access-and-omada-app-white-price-in-dubai-uae-224445044" },
    ap6:    { name: "TP-Link Omada ceiling Wi-Fi 6 access point", model: "EAP650", price: 294, shop: "Noon (via Pricena)", url: "https://ae.pricena.com/en/product/eap650-ax3000-mesh-ceiling-mount-wifi-6-access-point-seamless-roaming-up-to-2976-mbps-wifi-speeds-wpa3-mumimo-remote-and-app-control-poe-powered-multiple-controller-options-white-price-in-dubai-uae-203014278" },
    poe8:   { name: "TP-Link 10-port switch, 8 PoE ports", model: "TL-SG1210P", price: 193, shop: "Noon (via Pricena)", url: "https://ae.pricena.com/en/product/10-port-gigabit-desktop-switch-with-8-port-poe-ethernet-switch-910-100-1000mbps-rj45-ports-1gigabit-sfp-port-tl-sg1210p-black-price-in-dubai-uae-203014237", ports: 9 },
    poe16:  { name: "D-Link 16-port PoE switch", model: "DGS-F1016P", price: 449.6, shop: "Noon (via Pricena)", url: "https://ae.pricena.com/en/product/16-port-gigabit-unmanaged-poe-switch-with-2-sfp-ports-250-watts-1610-100-1000mbps-ports-2gigabit-sfp-uplink-ports-dgs-f1016p-black-price-in-dubai-uae-175308803", ports: 16 },
    sw24:   { name: "D-Link 24-port gigabit switch", model: "DGS-1024C", price: 215, shop: "Sharaf DG", url: "https://uae.sharafdg.com/product/d-link-24-port-unmanaged-desktop-switch/", ports: 24 },
    router: { name: "TP-Link Omada business router (VPN, multi-WAN)", model: "ER605", price: 180.4, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/search/?s=er605" },
    patch24:{ name: "24-port Cat6 patch panel (loaded)", model: "D-Link NPP-C61BLK241", price: 102.98, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/24-port-cat-6-utp-loaded-patch-panel-black-price-in-dubai-uae-217458999" },
    cab6u:  { name: "6U wall-mount network cabinet", model: "XFORM 6U 600×600", price: 245, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/wall-mount-server-rack-cabinet-6u-600mm-w-x-600mm-d-x-370mm-h-high-quality-6u-cabinet-loading-capacity-70kg-price-in-dubai-uae-124112434" },
    keystone:{ name: "Cat6 keystone jack", model: "SATMAXIMUM Cat6 (from 50-pack)", price: 4.64, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/cat6-rj45-keystone-jack-punch-down-network-black-50-price-in-dubai-uae-85522291" },
    faceplate:{ name: "Network wall faceplate", model: "Kuwes 1-port (from 10-pack)", price: 11, shop: "Amazon.ae (via Pricena)", url: "https://ae.pricena.com/en/product/kuwes-pvc-single-port-face-plate-ethernet-wall-plate-cat-6-single-cat6-rj45-face-plate-made-in-taiwan-10pcs-price-in-dubai-uae-135978223" }
  },
  /* Queen Tech labour (AED). "was" shows crossed out when the offer applies. */
  labour: {
    cam:      { name: "Camera installation (cabling, mounting, testing)", per: "camera", was: 150, price: 75 },
    nvr:      { name: "Recorder setup + phone app + handover", per: "system", was: 150, price: 75 },
    wificam:  { name: "Wi-Fi camera mounting + app setup", per: "camera", was: 75, price: 37.5 },
    door:     { name: "Access control door installation (reader, lock, button, cabling)", per: "door", was: 350, price: 175 },
    intercom: { name: "Video intercom / doorbell installation", per: "unit", was: 200, price: 100 },
    point:    { name: "Network point (Cat6 cabling + termination)", per: "point", was: 100, price: 50 },
    ap:       { name: "Wi-Fi access point installation + setup", per: "access point", was: 150, price: 75 },
    rack:     { name: "Network cabinet, switch & router setup", per: "system", was: 300, price: 150 }
  }
};
