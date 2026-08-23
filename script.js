// ==========================================================================
// Historical Society of Millersburg & Upper Paxton Township
// Photo Archive Engine & Metadata Indexer
// ==========================================================================

// Pre-populated Historical Dataset for Millersburg & Upper Paxton Township
let archiveDatabase = [
    {
        id: "MHS-1895-001",
        title: "Millersburg Ferry Boat Crossing the Susquehanna River",
        category: "Transportation",
        year: 1895,
        location: "Susquehanna River, Millersburg, PA",
        photographer: "Frank B. Paxton",
        donor: "Paxton Family Historical Bequest",
        description: "Historic wooden paddle-wheel ferry transporting horse-drawn carriages and passengers across the Susquehanna River between Millersburg and Perry County.",
        fileSpec: "TIFF / 3420 x 2280 px / 4.2 MB Scan",
        rights: "Public Domain / Educational Preservation",
        tags: ["Ferry", "Susquehanna River", "Transportation", "Paddlewheel", "1890s", "Perry County"],
        imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "MHS-1912-004",
        title: "Northern Central Railway Station & Freight Yard",
        category: "Transportation",
        year: 1912,
        location: "Center & Market Street, Millersburg, PA",
        photographer: "E. G. Wire Printing Co.",
        donor: "Millersburg Railroad Historical Society",
        description: "Steam locomotive #402 stopping at the Northern Central Railroad depot in Millersburg with passengers and coal freight cars.",
        fileSpec: "JPEG / 4000 x 2800 px / 5.1 MB Scan",
        rights: "Public Domain",
        tags: ["Railroad", "Steam Train", "Northern Central", "Depot", "Station", "Coal"],
        imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "MHS-1925-009",
        title: "Historic Center Street & Market Square Parade",
        category: "Events",
        year: 1925,
        location: "Market Square, Center St, Millersburg, PA",
        photographer: "Upper Paxton Gazette",
        donor: "Township Memorial Archive",
        description: "Centennial celebration parade featuring vintage Model T automobiles, brass band, and townfolk gathered along Center Street commercial storefronts.",
        fileSpec: "JPEG / 3800 x 2600 px / 3.8 MB Scan",
        rights: "Historical Society Archive",
        tags: ["Parade", "Market Square", "Center Street", "Model T", "1920s", "Celebration"],
        imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "MHS-1880-002",
        title: "Upper Paxton Township Homestead & Stone Barn",
        category: "Architecture",
        year: 1880,
        location: "Upper Paxton Township, PA",
        photographer: "Unknown Pioneer Photographer",
        donor: "Rothermel Heritage Collection",
        description: "Original stone farmstead and timber barn built by early German-Pennsylvania settlers in Upper Paxton Township.",
        fileSpec: "PNG / 3200 x 2400 px / 6.0 MB Scan",
        rights: "Public Domain",
        tags: ["Homestead", "Stone Barn", "Farm", "Pioneer", "Upper Paxton", "German Settlers"],
        imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "MHS-1948-015",
        title: "Ned Smith Nature & Wildlife Sanctuary Riverbed",
        category: "Landscape",
        year: 1948,
        location: "Berry Mountain & Susquehanna Shore",
        photographer: "Ned Smith",
        donor: "Ned Smith Center Trust",
        description: "Scenic autumn view of Berry Mountain and the Susquehanna River captured by famous local wildlife artist and naturalist Ned Smith.",
        fileSpec: "JPEG / 4500 x 3000 px / 7.2 MB Scan",
        rights: "Ned Smith Center / Educational Use",
        tags: ["Ned Smith", "Susquehanna", "Berry Mountain", "Landscape", "Nature", "Autumn"],
        imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "MHS-1905-007",
        title: "Millersburg High School Graduating Class of 1905",
        category: "People",
        year: 1905,
        location: "Millersburg Public School Grounds",
        photographer: "J. H. Miller Studio",
        donor: "Millersburg School District Archives",
        description: "Formal portrait of the eight graduating seniors and faculty members on the steps of the historic Millersburg brick schoolhouse.",
        fileSpec: "JPEG / 3600 x 2500 px / 4.5 MB Scan",
        rights: "Public Domain",
        tags: ["High School", "Students", "1900s", "Portrait", "Education", "Graduation"],
        imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
    }
];

// Current Authentication State
let currentUser = null; // null or { name: '...', email: '...', provider: 'Entra ID' | 'Local Account' }
let stagedFiles = []; // Staged files in upload modal

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderPhotoGrid(archiveDatabase);
    updateStatsRibbon();
    initSearchAndFilters();
    initModals();
    initUploader();
    initAuthSystem();
});

/* ==========================================================================
   1. Render Photo Gallery Grid
   ========================================================================== */
function renderPhotoGrid(items) {
    const grid = document.getElementById('photo-grid');
    const emptyState = document.getElementById('empty-results');
    const resultsBadge = document.getElementById('results-count-text');

    grid.innerHTML = '';
    resultsBadge.textContent = `Showing ${items.length} Archive Item${items.length === 1 ? '' : 's'}`;

    if (items.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    items.forEach(photo => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.innerHTML = `
            <div class="photo-thumb-wrapper">
                <img src="${photo.imageUrl}" alt="${photo.title}" class="photo-thumb" loading="lazy">
                <span class="photo-badge-era">${photo.year}</span>
                <span class="photo-badge-cat">${photo.category}</span>
            </div>
            <div class="photo-details">
                <h3 class="photo-title">${photo.title}</h3>
                <div class="photo-meta-row">
                    <span>📍 ${photo.location}</span>
                    <span>🆔 ${photo.id}</span>
                </div>
                <div class="photo-tags">
                    ${photo.tags.slice(0, 4).map(tag => `<span class="tag-pill">#${tag}</span>`).join('')}
                </div>
            </div>
        `;

        card.addEventListener('click', () => openPhotoDetailModal(photo));
        grid.appendChild(card);
    });
}

/* ==========================================================================
   2. Search & Filtering Engine
   ========================================================================== */
function initSearchAndFilters() {
    const searchInput = document.getElementById('archive-search-input');
    const clearBtn = document.getElementById('clear-search-btn');
    const categorySelect = document.getElementById('category-filter');
    const eraSelect = document.getElementById('era-filter');
    const sortSelect = document.getElementById('sort-filter');
    const resetBtn = document.getElementById('reset-filters-btn');

    function applyFilters() {
        const query = searchInput.value.toLowerCase().trim();
        const category = categorySelect.value;
        const era = eraSelect.value;
        const sort = sortSelect.value;

        if (query) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }

        let filtered = archiveDatabase.filter(photo => {
            // Text Search
            const matchText = !query || 
                photo.title.toLowerCase().includes(query) ||
                photo.description.toLowerCase().includes(query) ||
                photo.location.toLowerCase().includes(query) ||
                photo.year.toString().includes(query) ||
                photo.photographer.toLowerCase().includes(query) ||
                photo.tags.some(t => t.toLowerCase().includes(query));

            // Category Filter
            const matchCategory = category === 'all' || photo.category === category;

            // Era Filter
            let matchEra = true;
            if (era === '1800s') matchEra = photo.year >= 1800 && photo.year <= 1899;
            else if (era === '1900-1930') matchEra = photo.year >= 1900 && photo.year <= 1930;
            else if (era === '1931-1960') matchEra = photo.year >= 1931 && photo.year <= 1960;
            else if (era === '1961-2000') matchEra = photo.year >= 1961 && photo.year <= 2000;

            return matchText && matchCategory && matchEra;
        });

        // Sorting
        filtered.sort((a, b) => {
            if (sort === 'year-asc') return a.year - b.year;
            if (sort === 'year-desc') return b.year - a.year;
            if (sort === 'title-asc') return a.title.localeCompare(b.title);
            if (sort === 'newest-added') return b.id.localeCompare(a.id);
            return 0;
        });

        renderPhotoGrid(filtered);
    }

    searchInput.addEventListener('input', applyFilters);
    categorySelect.addEventListener('change', applyFilters);
    eraSelect.addEventListener('change', applyFilters);
    sortSelect.addEventListener('change', applyFilters);

    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        applyFilters();
    });

    resetBtn.addEventListener('click', () => {
        searchInput.value = '';
        categorySelect.value = 'all';
        eraSelect.value = 'all';
        sortSelect.value = 'year-asc';
        applyFilters();
    });
}

function updateStatsRibbon() {
    document.getElementById('total-photos-count').textContent = archiveDatabase.length;
    
    const allTags = new Set();
    archiveDatabase.forEach(p => p.tags.forEach(t => allTags.add(t)));
    document.getElementById('total-tags-count').textContent = allTags.size;
}

/* ==========================================================================
   3. Single & Bulk File Uploader Engine
   ========================================================================== */
function initUploader() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const stagedList = document.getElementById('staged-files-list');
    const queueSection = document.getElementById('upload-queue-section');
    const startUploadBtn = document.getElementById('start-upload-btn');
    const stagedCount = document.getElementById('staged-count');
    const uploadLabel = document.getElementById('upload-count-btn-label');
    const batchBox = document.getElementById('batch-metadata-box');
    const applyBatchBtn = document.getElementById('apply-batch-metadata-btn');
    const confirmBatchBtn = document.getElementById('apply-batch-confirm-btn');

    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFiles(e.target.files);
        }
    });

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const stagedItem = {
                        id: `STAGED-${Date.now()}-${Math.floor(Math.random()*1000)}`,
                        name: file.name,
                        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                        dataUrl: event.target.result,
                        title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
                        year: 1920,
                        category: 'Transportation',
                        location: 'Millersburg, PA',
                        tags: ['Millersburg', 'Historic']
                    };
                    stagedFiles.push(stagedItem);
                    updateStagedQueueUI();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    function updateStagedQueueUI() {
        stagedList.innerHTML = '';
        stagedCount.textContent = stagedFiles.length;
        uploadLabel.textContent = stagedFiles.length;

        if (stagedFiles.length > 0) {
            queueSection.classList.remove('hidden');
            startUploadBtn.disabled = false;
        } else {
            queueSection.classList.add('hidden');
            startUploadBtn.disabled = true;
        }

        stagedFiles.forEach((file, index) => {
            const row = document.createElement('div');
            row.className = 'staged-item';
            row.innerHTML = `
                <img src="${file.dataUrl}" class="staged-thumb" alt="Thumbnail">
                <div class="staged-info">
                    <div class="staged-name">${file.title}</div>
                    <div class="staged-size">${file.size} • ${file.category} (${file.year})</div>
                </div>
                <button class="btn-icon" data-index="${index}">✕</button>
            `;
            row.querySelector('.btn-icon').addEventListener('click', () => {
                stagedFiles.splice(index, 1);
                updateStagedQueueUI();
            });
            stagedList.appendChild(row);
        });
    }

    applyBatchBtn.addEventListener('click', () => {
        batchBox.classList.toggle('hidden');
    });

    confirmBatchBtn.addEventListener('click', () => {
        const cat = document.getElementById('batch-category').value;
        const yr = parseInt(document.getElementById('batch-year').value, 10) || 1920;
        const loc = document.getElementById('batch-location').value.trim() || 'Millersburg, PA';
        const rawTags = document.getElementById('batch-tags').value.split(',').map(t => t.trim()).filter(Boolean);

        stagedFiles.forEach(item => {
            item.category = cat;
            item.year = yr;
            item.location = loc;
            if (rawTags.length) item.tags = rawTags;
        });

        batchBox.classList.add('hidden');
        updateStagedQueueUI();
        alert('Batch metadata applied to all staged items!');
    });

    startUploadBtn.addEventListener('click', () => {
        if (!currentUser) {
            alert('Authentication Required: Please sign in with Entra ID or a Local Account to publish uploads.');
            openAuthModal();
            return;
        }

        stagedFiles.forEach(item => {
            const newRecord = {
                id: `MHS-${item.year}-${Math.floor(100 + Math.random() * 900)}`,
                title: item.title,
                category: item.category,
                year: item.year,
                location: item.location,
                photographer: currentUser.name,
                donor: `${currentUser.name} (${currentUser.provider})`,
                description: `Historical photo uploaded via Archive Portal by ${currentUser.name}. Indexing complete.`,
                fileSpec: `JPEG / 3500 x 2400 px / ${item.size}`,
                rights: 'Preserved under Historical Society Digital Commons',
                tags: item.tags,
                imageUrl: item.dataUrl
            };
            archiveDatabase.unshift(newRecord);
        });

        stagedFiles = [];
        updateStagedQueueUI();
        renderPhotoGrid(archiveDatabase);
        updateStatsRibbon();
        closeModal('upload-modal');

        alert(`Successfully indexed and uploaded ${stagedFiles.length || 'all'} historical photograph(s) to the catalog!`);
    });
}

/* ==========================================================================
   4. Microsoft Entra ID & Local Authentication Engine
   ========================================================================== */
function initAuthSystem() {
    const authBtn = document.getElementById('auth-modal-btn');
    const authStatusText = document.getElementById('auth-status-text');
    const authStatusIcon = document.getElementById('auth-status-icon');
    const userBadge = document.getElementById('user-profile-badge');
    const userNameEl = document.getElementById('user-display-name');
    const userTagEl = document.getElementById('user-provider-tag');
    const userInitialsEl = document.getElementById('user-avatar-initials');
    const logoutBtn = document.getElementById('logout-btn');
    const entraBtn = document.getElementById('entra-sso-login-btn');
    const localForm = document.getElementById('local-login-form');
    const uploadAuthNotice = document.getElementById('upload-auth-notice');

    // Entra ID Login Trigger
    entraBtn.addEventListener('click', () => {
        // Simulate MSAL Entra ID OAuth Redirect / Token Acquisition
        const entraUser = {
            name: 'Chad Rothermel (Archivist)',
            email: 'chadr@millersburgpahistory.org',
            provider: 'Microsoft Entra ID',
            roles: ['Archive.Admin', 'Metadata.Editor']
        };

        loginUser(entraUser);
        closeModal('auth-modal');
        alert(' Successfully authenticated via Microsoft Entra ID Single Sign-On (Azure AD)! You now have full upload and catalog management privileges.');
    });

    // Local Account Login Trigger
    localForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('local-email').value;
        const localUser = {
            name: email.split('@')[0],
            email: email,
            provider: 'Local Account',
            roles: ['Contributor']
        };

        loginUser(localUser);
        closeModal('auth-modal');
    });

    // Local Account Registration Trigger
    const registerForm = document.getElementById('local-register-form');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('reg-fullname').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const role = document.getElementById('reg-role').value;

        const registeredUser = {
            name: fullName,
            email: email,
            provider: 'Local Account',
            roles: [role]
        };

        // Save account locally
        localStorage.setItem(`user_${email}`, JSON.stringify(registeredUser));

        loginUser(registeredUser);
        closeModal('auth-modal');
        alert(`Account successfully created for ${fullName}! You are now logged in with full ${role} privileges.`);
    });

    function loginUser(user) {
        currentUser = user;
        authBtn.classList.add('hidden');
        userBadge.classList.remove('hidden');

        userNameEl.textContent = user.name;
        userTagEl.textContent = user.provider;
        userInitialsEl.textContent = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

        uploadAuthNotice.classList.add('hidden');
        updateDeleteButtons();
    }

    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        userBadge.classList.add('hidden');
        authBtn.classList.remove('hidden');
        uploadAuthNotice.classList.remove('hidden');
        updateDeleteButtons();
    });

    document.getElementById('notice-signin-btn').addEventListener('click', () => {
        closeModal('upload-modal');
        openAuthModal();
    });
}

function updateDeleteButtons() {
    const deleteBtn = document.getElementById('modal-delete-btn');
    if (currentUser) {
        deleteBtn.classList.remove('hidden');
    } else {
        deleteBtn.classList.add('hidden');
    }
}

/* ==========================================================================
   5. Detail Modal & Modal Manager
   ========================================================================== */
function openPhotoDetailModal(photo) {
    document.getElementById('modal-photo-img').src = photo.imageUrl;
    document.getElementById('modal-photo-era').textContent = photo.year;
    document.getElementById('modal-photo-id').textContent = `ID: ${photo.id}`;
    document.getElementById('modal-photo-category').textContent = photo.category;
    document.getElementById('modal-photo-title').textContent = photo.title;
    document.getElementById('modal-photo-desc').textContent = photo.description;

    document.getElementById('modal-photo-year').textContent = photo.year;
    document.getElementById('modal-photo-location').textContent = photo.location;
    document.getElementById('modal-photo-source').textContent = photo.photographer;
    document.getElementById('modal-photo-donor').textContent = photo.donor;
    document.getElementById('modal-photo-filespecize').textContent = photo.fileSpec;
    document.getElementById('modal-photo-rights').textContent = photo.rights;

    const tagsContainer = document.getElementById('modal-photo-tags');
    tagsContainer.innerHTML = photo.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('');

    const downloadLink = document.getElementById('modal-download-link');
    downloadLink.href = photo.imageUrl;
    downloadLink.setAttribute('download', `${photo.id}-${photo.title}.jpg`);

    const deleteBtn = document.getElementById('modal-delete-btn');
    deleteBtn.onclick = () => {
        if (!currentUser) {
            alert('Authentication required to delete records.');
            return;
        }
        if (confirm(`Are you sure you want to delete historical record "${photo.title}"?`)) {
            archiveDatabase = archiveDatabase.filter(p => p.id !== photo.id);
            renderPhotoGrid(archiveDatabase);
            updateStatsRibbon();
            closeModal('detail-modal');
        }
    };

    updateDeleteButtons();
    openModal('detail-modal');
}

function initModals() {
    const navUploadBtn = document.getElementById('nav-upload-btn');
    const uploadCardBtn = document.getElementById('upload-action-card-btn');
    const authModalBtn = document.getElementById('auth-modal-btn');
    const footerUploadLink = document.getElementById('footer-upload-link');

    navUploadBtn.addEventListener('click', () => openUploadModal());
    uploadCardBtn.addEventListener('click', () => openUploadModal());
    authModalBtn.addEventListener('click', () => openAuthModal());
    footerUploadLink.addEventListener('click', (e) => {
        e.preventDefault();
        openUploadModal();
    });

    document.getElementById('close-upload-modal').addEventListener('click', () => closeModal('upload-modal'));
    document.getElementById('cancel-upload-btn').addEventListener('click', () => closeModal('upload-modal'));
    document.getElementById('close-detail-modal').addEventListener('click', () => closeModal('detail-modal'));
    document.getElementById('close-auth-modal').addEventListener('click', () => closeModal('auth-modal'));

    // Auth Tab Switcher
    const authTabs = document.querySelectorAll('.auth-tab-btn');
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.getAttribute('data-tab');
            document.getElementById('auth-tab-entra').classList.toggle('hidden', target !== 'entra');
            document.getElementById('auth-tab-local').classList.toggle('hidden', target !== 'local');
            document.getElementById('auth-tab-register').classList.toggle('hidden', target !== 'register');
        });
    });
}

function openUploadModal() {
    const notice = document.getElementById('upload-auth-notice');
    if (!currentUser) {
        notice.classList.remove('hidden');
    } else {
        notice.classList.add('hidden');
    }
    openModal('upload-modal');
}

function openAuthModal() {
    openModal('auth-modal');
}

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}
