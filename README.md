# Health Self-Check Kiosk

A responsive web application that lets users check their Body Mass Index (BMI) and receive a personalized wellness recommendation. Built for De La Salle University - Dasmariñas, IT Department, Laboratory 5.

## The Problem

Students and employees on campus have no quick, private way to check their BMI and get a basic wellness recommendation without visiting the clinic. This kiosk lets a user enter their name, age, sex, weight, and height, then instantly computes their BMI, classifies it into a health category, and displays a tailored recommendation. Every submission is also recorded to a shared Google Sheet so staff can monitor usage and follow up with at-risk individuals.

## Features

- Responsive, card-style UI (desktop, tablet, mobile) using HTML, CSS Flexbox, and media queries
- Client-side form validation (required fields, valid age/weight/height)
- BMI computed with `BMI = weight (kg) / [height (m)]²`
- BMI categories: Underweight, Normal, Overweight, Obese — each with its own color and message
- Recent submissions list rendered in the browser
- Submissions sent to a Google Apps Script Web App and appended to a Google Sheet

## Tech Stack

- HTML5 (semantic elements)
- CSS3 (Flexbox, media queries)
- Vanilla JavaScript (if-else, switch-case, loops)
- Google Apps Script + Google Sheets (data storage)

## Live Demo

https://pvievie.github.io/health-checker-kiosk/

## Author

Phoebe Delito — BSIT, De La Salle University - Dasmariñas
