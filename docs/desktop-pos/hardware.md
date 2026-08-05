# POS Hardware & Peripheral Specification

## Overview

Hardware support matrix covering barcode scanners, thermal receipt printers, cash drawers, customer pole displays, and weight scales.

---

## Hardware Matrix

| Device Type | Protocol / Cable | Standard Commands |
| :--- | :--- | :--- |
| **Thermal Printer** | USB / Ethernet / Bluetooth | ESC/POS (Epson / Star Micronics) |
| **Cash Drawer** | RJ11 / USB Solenoid | Solenoid Kick Pulse (0x1B 0x70 0x00) |
| **Barcode Scanner** | USB HID / Bluetooth | EAN-13, UPC-A, QR Code, DataMatrix |
| **Customer Display** | USB / RS232 | VFD / LCD ASCII Text Scrolling |
| **Weight Scale** | RS232 Serial Port | NCI / CAS PD-II Weight Protocol |
