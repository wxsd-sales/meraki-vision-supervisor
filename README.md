# Meraki Vision Supervisor

**Cross browser extension to add call buttons on Meraki Vision Dashboard, enabling click-to-call.**

This is a proof-of-concept extension for web browsers (like Chrome, Edge, Firefox etc.) that adds call buttons to the Meraki Vision Dashboard. When clicked, the button cross-launches a call to the SIP address associated with the selected camera. This extension is particularly useful for scenarios such as patient-room monitoring, prison systems, and more.

<p align="center">
   <a href="https://app.vidcast.io/share/296228d8-18d0-4a76-b350-3fec18274613" target="_blank">
       <img 
          src="https://github.com/wxsd-sales/meraki-vision-supervisor/assets/6129517/3be5f907-6e04-447b-aba3-679d1979de22" 
          alt="meraki-vision-supervisor-demo"
          />
    </a>
</p>

<!-- ⛔️ MD-MAGIC-EXAMPLE:START (TOC:collapse=true&collapseText=Click to expand) -->
<details>
<summary>Table of Contents (click to expand)</summary>

- [Overview](#overview)
- [Setup](#setup)
- [Demo](#demo)
- [Disclaimer](#disclaimer)
- [License](#license)
- [Support](#support)

</details>
<!-- ⛔️ MD-MAGIC-EXAMPLE:END -->

## Overview

This browser extension enhances the Meraki Vision Dashboard by adding a call button next to each camera tile. The button uses the SIP address associated with the camera (via tags) to initiate a Webex call. This enables quick and seamless video communication directly from the dashboard.

## Setup

These instructions assume that you have:

- Administrator access to a browser where you can install the extension, locally in Developer Mode.
- [Node.js installed](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) on a Windows (via WSL2), macOS, or Linux machine.

Open a new terminal window and follow the instructions below to set up the project locally for development/demo.

1. Clone this repository and change directory:

   ```
   git clone https://github.com/wxsd-sales/meraki-vision-supervisor && cd meraki-vision-supervisor
   ```

2. Install Node.js dependencies:

   ```
   npm install
   ```

3. Build the extension from source:

   ```
   npm run build
   ```

4. Install the extension:
   - You should now see some files in the `.output` directory.
   - Follow your respective browser's guide to install the extension from this directory.

If you are actively making changes to the source code, you may be better off using `npm run dev` in step 3 above. Please
do note that some changes need re-installation of the extension to take effect.

## Demo

A video where we demo this PoC is available on Vidcast — [https://app.vidcast.io/share/296228d8-18d0-4a76-b350-3fec18274613](https://app.vidcast.io/share/296228d8-18d0-4a76-b350-3fec18274613).

## Disclaimer

Everything included in this repository is for demo and Proof of Concept (PoC) purposes only. Use of the PoC is solely
at your own risk. This project may contain links to external content, which we do not warrant, endorse, or assume
liability for. This project is for Cisco Webex use-case, but is not official Cisco Webex branded project.

## License

[MIT](./LICENSE)

## Support

Please reach out to the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?cc=ashessin@cisco.com&subject=Meraki%20Vision%20Supervisor) or contact me on Webex (ashessin@cisco.com).
