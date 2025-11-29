# **SANKET – Smart Community Health Monitoring & Early Warning System**

SANKET (Smart Alert & Notification for Knowledge-Enabled Tracking) is an integrated, real-time water quality monitoring and disease outbreak early-warning system designed for rural and flood-prone regions of Northeast India. It combines **IoT sensors**, **AI-powered analytics**, **community symptom reporting**, and **multilingual alerts** to detect water contamination early and prevent waterborne disease outbreaks.

This project was developed under the **Hack for Social Cause – Viksit Bharat 2047 National Hackathon** with mentorship from **IIT Bombay**.

🔗 **Project Resources & Files:**
Google Drive Folder → **[https://drive.google.com/drive/folders/1VN11sHktPMXu0ETlEAhAYYzoFMsP0zrM?usp=sharing](https://drive.google.com/drive/folders/1VN11sHktPMXu0ETlEAhAYYzoFMsP0zrM?usp=sharing)**

---

## 📌 **Table of Contents**

* [Introduction](#introduction)
* [Problem Statement](#problem-statement)
* [Proposed Solution](#proposed-solution)
* [Architecture](#architecture)
* [Tech Stack](#tech-stack)
* [Key Features](#key-features)
* [System Workflow](#system-workflow)
* [How It Helps Communities](#how-it-helps-communities)
* [SDG Alignment](#sdg-alignment)
* [Future Scope](#future-scope)
* [Team](#team)
* [License](#license)

---

## 🌍 **Introduction**

Every year, floods contaminate rural water sources across Northeast India, leading to recurrent outbreaks of cholera, diarrhoea, hepatitis, and dysentery. Water testing is slow and manual, villagers often lack awareness, and outbreak detection arrives too late.

**SANKET** bridges this gap by creating a **real-time early-warning ecosystem** that protects vulnerable rural communities through continuous monitoring and intelligent prediction.

---

## 🚨 **Problem Statement**

Rural communities in Northeast India face recurring waterborne disease outbreaks due to:

* Flood-driven contamination of wells, handpumps, and river sources
* Manual, delayed water-quality testing
* Lack of early-warning or prediction systems
* Absence of accessible reporting channels for villagers
* Overburdened and slow health monitoring systems

These issues lead to **preventable deaths, severe illnesses, economic loss, and long-term health impact**.

---

## 💡 **Proposed Solution: SANKET**

SANKET delivers a **3-layer smart ecosystem**:

### **1️⃣ IoT-Based Water Quality Monitoring**

Low-cost IoT sensor nodes (“Jal Suraksha Kits”) measure:

* pH
* Turbidity
* Dissolved Oxygen
* Conductivity
* Temperature
* Chlorine residual

Data is sent to the cloud through **LoRaWAN** or **GSM**.

### **2️⃣ Community Symptom Reporting**

Villagers, ASHA workers, and SHGs report symptoms using:

* Mobile App
* SMS (offline-first reporting)
* Manual test-kit uploads through image scanning

### **3️⃣ AI-Powered Prediction & Alerts**

An AI/ML engine cross-analyses water data, environmental parameters, and symptom clusters to:

* Predict disease outbreaks
* Issue real-time multilingual alerts
* Notify health officials with hotspot mapping

---

## 🏗️ **Architecture**

```
[IoT Sensors] → [LoRaWAN/GSM] → [Raspberry Pi Gateway]  
    → [Cloud Server (AWS/Azure)]  
        → [AI Prediction Engine]  
            → [Mobile App + SMS Alerts]  
            → [Web Dashboard for Officials]
```

A detailed architecture diagram is included in the Drive folder above.

---

## 🛠️ **Tech Stack**

### **Hardware**

* ESP32 Microcontroller
* pH, Turbidity, DO, Conductivity & Temperature Sensors
* LoRaWAN Modules
* GSM Fallback Modules
* Solar Charging System
* Raspberry Pi Data Gateway

### **Software**

* **Flutter** – Mobile App
* **React.js + Node.js** – Admin Dashboard
* **Python (TensorFlow, Scikit-Learn)** – AI Engine
* **Firebase** – Real-time Sync
* **AWS/Azure** – Cloud Hosting
* **MongoDB + PostgreSQL** – Data Storage

---

## 🚀 **Key Features**

### 🌊 **Real-Time Water Quality Monitoring**

Continuous IoT-based measurement of contamination indicators.

### 🤖 **AI-Powered Disease Prediction**

Risk scoring and outbreak forecasting using ML models.

### 📱 **Mobile App (Multilingual)**

Symptom reporting, water alerts, hygiene advisories.

### 📨 **SMS Fallback System**

Works even in low-internet zones with offline-first design.

### 🗺️ **Dashboard for Health Authorities**

Heatmaps, hotspot detection, downloadable reports.

### 👩‍🦰 **Women SHG Involvement**

Self-Help Groups are trained to operate test kits and assist in reporting.

### 🔋 **Low-Cost & Solar Powered**

Designed for scalability and rural conditions.

---

## 🔄 **System Workflow**

1. **Sensor detects abnormal turbidity spike.**
2. Data reaches cloud via LoRaWAN/GSM.
3. Community logs symptoms via app/SMS.
4. AI engine correlates water + health patterns.
5. SANKET issues alerts:

   * To villagers (Boil Water, Unsafe Water)
   * To PHC / District Health Officer
6. Response teams take action: chlorination, ORS distribution, testing.
7. Model learns from confirmed outbreaks and improves predictions.

---

## ❤️ **How It Helps Communities**

* Prevents large-scale outbreaks
* Reduces deaths caused by contaminated drinking water
* Saves medical expenses for low-income families
* Protects vulnerable groups (children, elderly, tribal communities)
* Lowers school absenteeism
* Empowers women through SHG involvement
* Strengthens trust in public health systems

---

## 🌐 **SDG Alignment**

SANKET contributes directly to the following UN Sustainable Development Goals:

### **SDG 3 – Good Health & Well-Being**

Prevents diseases through early detection and timely intervention.

### **SDG 6 – Clean Water & Sanitation**

Ensures safe drinking water through continuous monitoring.

### **SDG 9 – Industry, Innovation & Infrastructure**

Brings affordable IoT + AI innovation to rural areas.

 **SDG 11 – Sustainable Communities**

Builds health resilience in flood-prone regions.

 **SDG 13 – Climate Action**

Adapts to climate-driven floods and contamination patterns.

 **SDG 5 – Gender Equality (Indirect)**

Empowers women’s SHGs in data collection and community health tasks.


**Future Scope**

* Satellite data integration for flood forecasting
* Blockchain-backed data integrity for government use
* Expansion into vector-borne disease monitoring (malaria, dengue)
* National Water-Health Dashboard for India
* School-level water safety programs linked to midday meals
* Edge computing on IoT nodes for faster offline analysis


👥 **Team**

**Project Name:** SANKET
**Developed under:** Viksit Bharat 2047 – Hack for Social Cause


Team roles may include:

* Hardware & IoT Development
* AI/ML Modeling
* Mobile App Development
* Backend & Dashboard
* Community Research
* Project Management



License

This project is open for academic, research, and government use.
For commercial or large-scale deployment permissions, please contact the team.

