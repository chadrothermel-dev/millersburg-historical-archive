# Historical Society of Millersburg & Upper Paxton Township
### Digital Photo Archive, Metadata Indexer & Upload System

A web application built for the **Historical Society of Millersburg & Upper Paxton Township (HSMUPT)** to catalog, index, search, and preserve historical photographs documenting the Susquehanna River, Millersburg Ferry, Northern Central Railway, Market Square, and pioneer life in Upper Paxton Township, Pennsylvania.

---

## Key Features

### 1. Metadata Indexing & Search Engine
- **Instant Keyword & Tag Search:** Query historical records by title, year (1800s to 2000s), location (*Susquehanna River, Center St, Market Square, Berry Mountain*), photographer, donor, and tags.
- **Categorical & Era Filtering:** Filter collections by Era (*19th Century, Early 20th, Mid 20th*) and Category (*Transportation, Architecture, People, Events, Landscape*).
- **EXIF & Archive Inspector Modal:** Displays complete archival records (Year Taken, GPS/Location, Donor, Photographer, Rights, File Specifications) with 1-click high-res downloads.

### 2. Single & Bulk Photo Uploader
- **Drag-and-Drop Dropzone:** Upload single or bulk historical image files (`.jpg`, `.png`, `.webp`, `.tiff`).
- **Batch Metadata Editor:** Apply common default tags, era/year, location, and category across all staged files in one click or customize individually.
- **Client-Side Base64 Reader:** Auto-previews thumbnail images and stages records for catalog indexing.

### 3. Microsoft Entra ID & Local Authentication
- **Microsoft Entra ID (Azure AD) SSO:** Integrated Single Sign-On flow targeting organizational tenant credentials (`millersburgpahistory.onmicrosoft.com`).
- **Local Account & Registration Portal:** Alternate registration and sign-in tab for township volunteers and community contributors.
- **Role-Based Access Control (RBAC):** Restricts uploading, cataloging, editing, and deleting records to authenticated archivists.

---

## Repository File Structure

```
millersburg-historical-archive/
├── index.html       # HTML5 Application Structure & Modals (Search, Upload, Auth, Inspector)
├── style.css        # Heritage Design System (Parchment, Mahogany, Gold, Glassmorphic UI)
├── script.js        # Core Application Logic (Database, Filter Engine, Uploader, Auth State)
└── README.md        # Technical Documentation & Azure Deployment Guide
```

---

## Quick Start (Local Running)

To test the application locally on your computer:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/chadrothermel-dev/millersburg-historical-archive.git
   cd millersburg-historical-archive
   ```

2. **Launch a local HTTP server:**
   ```bash
   # Using Python 3
   python -m http.server 8085
   ```

3. **Open in browser:**
   Navigate to **`http://localhost:8085`** in your browser.

---

## Azure Deployment Guide ($0/month Hosting)

This application is optimized for low-cost / zero-cost hosting using **Azure Static Web Apps** and **Azure Blob Storage**:

### Step 1: Deploy Frontend to Azure Static Web Apps (Free Tier)
1. Sign into the **[Azure Portal](https://portal.azure.com)**.
2. Click **Create a Resource** > Search for **Static Web App** > Click **Create**.
3. Select your Azure Subscription and Resource Group.
4. Under **Deployment Details**, select **GitHub** and authorize your account.
5. Select repository `chadrothermel-dev/millersburg-historical-archive` and branch `master`.
6. Click **Review + Create**. Azure will automatically build and host the site with a free SSL certificate.

### Step 2: Configure Microsoft Entra ID (Azure AD)
1. Open [Microsoft Entra Admin Center](https://entra.microsoft.com).
2. Go to **Identity** > **Applications** > **App registrations** > **New registration**.
3. Set Name to `Millersburg Historical Archive` and set Redirect URI to `https://your-azure-static-app.azurestaticapps.net`.
4. Copy your **Application (client) ID** and **Directory (tenant) ID** into your `script.js` configuration.

### 501(c)(3) Non-Profit Cloud Grant
The Historical Society can apply for **$2,000 USD/year in FREE Azure cloud credits** via **[Microsoft for Nonprofits](https://www.microsoft.com/nonprofit)**, making storage and hosting 100% free.

---

## License
This project is licensed under the MIT License - free for educational, community, and historical preservation use.
