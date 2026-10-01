const API_URL = "http://127.0.0.1:8000/api";


// ========================================
// ISSUE OPTIONS
// ========================================

const issueOptions = {

    maintenance: [
        "Fan",
        "Light / Switch",
        "Furniture",
        "AC",
        "Other"
    ],

    cleaning: [
        "Room Cleaning",
        "Bathroom Cleaning",
        "Common Area",
        "Garbage",
        "Other"
    ],

    food: [
        "Taste",
        "Quantity",
        "Too Spicy",
        "Too Salty",
        "Undercooked",
        "Food Hygiene",
        "Missing Item",
        "Other"
    ],

    technical: [
        "Wi-Fi",
        "Internet",
        "TV",
        "Other"
    ],

    plumbing: [
        "Tap Leakage",
        "No Water",
        "Drainage",
        "Flush Problem",
        "Shower Problem",
        "Other"
    ],

    room: [
        "Bed",
        "Mattress",
        "Cupboard",
        "Door",
        "Window",
        "Other"
    ],

    other: [
        "Other"
    ]

};


// ========================================
// DYNAMIC ISSUE TYPE
// ========================================

const categorySelect =
    document.getElementById("category");

const issueSelect =
    document.getElementById("issueType");


if (categorySelect && issueSelect) {

    categorySelect.addEventListener(
        "change",
        function () {

            const category = this.value;

            issueSelect.innerHTML = `
                <option value="">Select issue</option>
            `;

            if (!category) {
                return;
            }

            const issues = issueOptions[category];

            issues.forEach(function (issue) {

                const option =
                    document.createElement("option");

                option.value = issue
                    .toLowerCase()
                    .replaceAll(" ", "_")
                    .replaceAll("/", "_");

                option.textContent = issue;

                issueSelect.appendChild(option);

            });

        }
    );

}


// ========================================
// COMPLAINT DATA
// ========================================

let allComplaints = [];


// ========================================
// LOAD COMPLAINTS FROM API
// ========================================

async function loadComplaints() {

    const complaintList =
        document.getElementById("complaintList");

    if (!complaintList) {
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/complaints/`
        );

        if (!response.ok) {
            throw new Error(
                "Failed to load complaints"
            );
        }

        const complaints =
            await response.json();

        allComplaints = complaints;

        displayComplaints(allComplaints);

    } catch (error) {

        console.error(error);

        complaintList.innerHTML = `
            <div class="loading-message">
                Unable to load complaints.
            </div>
        `;

    }

}


// ========================================
// DISPLAY COMPLAINTS
// ========================================

function displayComplaints(complaints) {

    const complaintList =
        document.getElementById("complaintList");

    if (!complaintList) {
        return;
    }

    complaintList.innerHTML = "";


    if (complaints.length === 0) {

        complaintList.innerHTML = `
            <div class="loading-message">
                No complaints found.
            </div>
        `;

        return;
    }


    complaints.forEach(function (complaint) {

        const card =
            document.createElement("div");

        card.className = "complaint-card";


        // Make card clickable
        card.style.cursor = "pointer";

        card.addEventListener(
            "click",
            function () {

                window.location.href =
                    `complaint-details.html?id=${complaint.id}`;

            }
        );


        card.innerHTML = `

            <div class="complaint-info">

                <span class="issue-number">
                    #${complaint.id}
                </span>

                <div>

                    <h3>
                        ${complaint.issue_type}
                    </h3>

                    <p>
                        Room ${complaint.room_number}
                        ·
                        ${formatCategory(
                            complaint.category
                        )}
                    </p>

                </div>

            </div>


            <div class="complaint-meta">

                <span
                    class="priority ${complaint.priority}"
                >
                    ${formatStatus(
                        complaint.priority
                    )}
                </span>

                <span
                    class="status ${complaint.status}"
                >
                    ${formatStatus(
                        complaint.status
                    )}
                </span>

            </div>

        `;


        complaintList.appendChild(card);

    });

}


// ========================================
// FORMAT STATUS
// ========================================

function formatStatus(status) {

    return status
        .replaceAll("_", " ")
        .replace(/\b\w/g, function (letter) {
            return letter.toUpperCase();
        });

}


// ========================================
// FORMAT CATEGORY
// ========================================

function formatCategory(category) {

    return category
        .replaceAll("_", " ")
        .replace(/\b\w/g, function (letter) {
            return letter.toUpperCase();
        });

}


// ========================================
// CREATE COMPLAINT
// ========================================

const complaintForm =
    document.getElementById("complaintForm");


if (complaintForm) {

    complaintForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const formData =
                new FormData(complaintForm);


            try {

                const response =
                    await fetch(
                        `${API_URL}/complaints/`,
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                if (!response.ok) {

                    const errorData =
                        await response.json();

                    console.error(
                        "API Error:",
                        errorData
                    );

                    alert(
                        "Unable to submit complaint."
                    );

                    return;
                }


                const result =
                    await response.json();


                console.log(
                    "Complaint created:",
                    result
                );


                alert(
                    "Complaint submitted successfully!"
                );


                complaintForm.reset();


            } catch (error) {

                console.error(error);

                alert(
                    "Something went wrong."
                );

            }

        }
    );

}


// ========================================
// FILTER ELEMENTS
// ========================================

const searchInput =
    document.getElementById("searchInput");

const roomFilter =
    document.getElementById("roomFilter");

const categoryFilter =
    document.getElementById("categoryFilter");

const statusFilter =
    document.getElementById("statusFilter");

const priorityFilter =
    document.getElementById("priorityFilter");


// ========================================
// APPLY FILTERS
// ========================================

function applyFilters() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedRoom =
        roomFilter.value;


    const selectedCategory =
        categoryFilter.value;


    const selectedStatus =
        statusFilter.value;


    const selectedPriority =
        priorityFilter.value;


    const filteredComplaints =
        allComplaints.filter(
            function (complaint) {


                // Search
                const matchesSearch =

                    complaint.issue_type
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    complaint.description
                        .toLowerCase()
                        .includes(searchText);


                // Room
                const matchesRoom =
                    !selectedRoom ||
                    complaint.room_number ===
                    selectedRoom;


                // Category
                const matchesCategory =
                    !selectedCategory ||
                    complaint.category ===
                    selectedCategory;


                // Status
                const matchesStatus =
                    !selectedStatus ||
                    complaint.status ===
                    selectedStatus;


                // Priority
                const matchesPriority =
                    !selectedPriority ||
                    complaint.priority ===
                    selectedPriority;


                return (
                    matchesSearch &&
                    matchesRoom &&
                    matchesCategory &&
                    matchesStatus &&
                    matchesPriority
                );

            }
        );


    displayComplaints(
        filteredComplaints
    );

}


// ========================================
// FILTER EVENT LISTENERS
// ========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        applyFilters
    );

}


if (roomFilter) {

    roomFilter.addEventListener(
        "change",
        applyFilters
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        applyFilters
    );

}


if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        applyFilters
    );

}


if (priorityFilter) {

    priorityFilter.addEventListener(
        "change",
        applyFilters
    );

}


// ========================================
// LOAD COMPLAINTS
// ========================================

loadComplaints();
// ========================================
// COMPLAINT DETAILS
// ========================================

const complaintDetails =
    document.getElementById("complaintDetails");


if (complaintDetails) {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const complaintId =
        urlParams.get("id");


    async function loadComplaintDetails() {

        if (!complaintId) {

            complaintDetails.innerHTML = `
                <div class="loading-message">
                    Complaint not found.
                </div>
            `;

            return;
        }


        try {

            const response =
                await fetch(
                    `${API_URL}/complaints/${complaintId}/`
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to load complaint"
                );

            }


            const complaint =
                await response.json();


            displayComplaintDetails(
                complaint
            );


        } catch (error) {

            console.error(error);


            complaintDetails.innerHTML = `
                <div class="loading-message">
                    Unable to load complaint.
                </div>
            `;

        }

    }


function displayComplaintDetails(complaint) {

    let photoHTML = "";

    if (complaint.photo) {

        photoHTML = `
            <div class="detail-section">

                <h3>Photo</h3>

                <img
                    src="${complaint.photo}"
                    alt="Complaint photo"
                    class="complaint-photo"
                >

            </div>
        `;

    }


    complaintDetails.innerHTML = `

        <div class="detail-card">

            <div class="detail-header">

                <div>

                    <span class="issue-number">
                        #${complaint.id}
                    </span>

                    <h2>
                        ${complaint.issue_type}
                    </h2>

                </div>


                <div class="complaint-meta">

                    <span
                        class="priority ${complaint.priority}"
                    >
                        ${formatStatus(
                            complaint.priority
                        )}
                    </span>

                    <span
                        class="status ${complaint.status}"
                    >
                        ${formatStatus(
                            complaint.status
                        )}
                    </span>

                </div>

            </div>


            <div class="detail-grid">

                <div class="detail-section">

                    <span class="detail-label">
                        Room
                    </span>

                    <strong>
                        ${complaint.room_number}
                    </strong>

                </div>


                <div class="detail-section">

                    <span class="detail-label">
                        Category
                    </span>

                    <strong>
                        ${formatCategory(
                            complaint.category
                        )}
                    </strong>

                </div>


                <div class="detail-section">

                    <span class="detail-label">
                        Issue
                    </span>

                    <strong>
                        ${complaint.issue_type}
                    </strong>

                </div>


                <div class="detail-section">

                    <span class="detail-label">
                        Submitted
                    </span>

                    <strong>
                        ${new Date(
                            complaint.created_at
                        ).toLocaleString()}
                    </strong>

                </div>

            </div>


            <div class="detail-section">

                <h3>Description</h3>

                <p class="description-text">
                    ${complaint.description}
                </p>

            </div>


            <!-- Status Update -->

            <div class="detail-section status-update">

                <h3>Update Status</h3>

                <select
                    id="statusUpdate"
                    class="status-select"
                >

                    <option
                        value="submitted"
                        ${complaint.status === "submitted" ? "selected" : ""}
                    >
                        Submitted
                    </option>

                    <option
                        value="under_review"
                        ${complaint.status === "under_review" ? "selected" : ""}
                    >
                        Under Review
                    </option>

                    <option
                        value="assigned"
                        ${complaint.status === "assigned" ? "selected" : ""}
                    >
                        Assigned
                    </option>

                    <option
                        value="resolved"
                        ${complaint.status === "resolved" ? "selected" : ""}
                    >
                        Resolved
                    </option>

                </select>

                <button
                    type="button"
                    id="updateStatusButton"
                    class="primary-button"
                >
                    Update Status
                </button>

            </div>


            ${photoHTML}

        </div>

    `;


    // Status update button

    const updateStatusButton =
        document.getElementById(
            "updateStatusButton"
        );


    const statusUpdate =
        document.getElementById(
            "statusUpdate"
        );


    updateStatusButton.addEventListener(
        "click",
        function () {

            updateComplaintStatus(
                complaint.id,
                statusUpdate.value
            );

        }
    );

}
async function updateComplaintStatus(
    complaintId,
    newStatus
) {

    try {

        const response = await fetch(
            `${API_URL}/complaints/${complaintId}/`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    status: newStatus
                })
            }
        );


        if (!response.ok) {

            const errorData =
                await response.json();

            console.error(
                "Status update error:",
                errorData
            );

            alert(
                "Unable to update status."
            );

            return;
        }


        const updatedComplaint =
            await response.json();


        alert(
            "Status updated successfully!"
        );


        displayComplaintDetails(
            updatedComplaint
        );


    } catch (error) {

        console.error(error);

        alert(
            "Something went wrong."
        );

    }

}

    loadComplaintDetails();

}
// ========================================
// DASHBOARD
// ========================================

async function loadDashboard() {

    const totalRooms =
        document.getElementById("totalRooms");

    const openIssues =
        document.getElementById("openIssues");

    const inProgress =
        document.getElementById("inProgress");

    const resolved =
        document.getElementById("resolved");


    // If we are not on the dashboard,
    // stop here.
    if (!totalRooms) {
        return;
    }


    try {

        // Get dashboard statistics
        const statsResponse =
            await fetch(
                `${API_URL}/dashboard/`
            );


        if (!statsResponse.ok) {

            throw new Error(
                "Failed to load dashboard stats"
            );

        }


        const stats =
            await statsResponse.json();


        // Display statistics
        totalRooms.textContent =
            stats.total_rooms;

        openIssues.textContent =
            stats.open_issues;

        inProgress.textContent =
            stats.in_progress;

        resolved.textContent =
            stats.resolved;


        // Load recent complaints
        await loadRecentComplaints();


        // Load rooms
        await loadRooms();


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

        totalRooms.textContent = "-";
        openIssues.textContent = "-";
        inProgress.textContent = "-";
        resolved.textContent = "-";

    }

}


// ========================================
// RECENT COMPLAINTS
// ========================================

async function loadRecentComplaints() {

    const recentComplaints =
        document.getElementById(
            "recentComplaints"
        );


    if (!recentComplaints) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/complaints/`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load complaints"
            );

        }


        const complaints =
            await response.json();


        // Show only latest 3 complaints
        const recent =
            complaints.slice(0, 3);


        recentComplaints.innerHTML = "";


        if (recent.length === 0) {

            recentComplaints.innerHTML = `
                <div class="loading-message">
                    No complaints found.
                </div>
            `;

            return;
        }


        recent.forEach(
            function (complaint) {

                const card =
                    document.createElement("div");


                card.className =
                    "complaint-card";


                card.style.cursor =
                    "pointer";


                card.addEventListener(
                    "click",
                    function () {

                        window.location.href =
                            `complaint-details.html?id=${complaint.id}`;

                    }
                );


                card.innerHTML = `

                    <div class="complaint-info">

                        <span class="issue-number">
                            #${complaint.id}
                        </span>

                        <div>

                            <h3>
                                ${complaint.issue_type}
                            </h3>

                            <p>
                                Room ${complaint.room_number}
                                ·
                                ${formatCategory(
                                    complaint.category
                                )}
                            </p>

                        </div>

                    </div>


                    <div class="complaint-meta">

                        <span
                            class="priority ${complaint.priority}"
                        >
                            ${formatStatus(
                                complaint.priority
                            )}
                        </span>

                        <span
                            class="status ${complaint.status}"
                        >
                            ${formatStatus(
                                complaint.status
                            )}
                        </span>

                    </div>

                `;


                recentComplaints.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(error);

        recentComplaints.innerHTML = `
            <div class="loading-message">
                Unable to load recent complaints.
            </div>
        `;

    }

}


// ========================================
// ROOMS
// ========================================

async function loadRooms() {

    const roomsGrid =
        document.getElementById(
            "roomsGrid"
        );


    if (!roomsGrid) {
        return;
    }


    try {

        // Get rooms
        const roomsResponse =
            await fetch(
                `${API_URL}/rooms/`
            );


        if (!roomsResponse.ok) {

            throw new Error(
                "Failed to load rooms"
            );

        }


        const rooms =
            await roomsResponse.json();


        // Get complaints
        const complaintsResponse =
            await fetch(
                `${API_URL}/complaints/`
            );


        if (!complaintsResponse.ok) {

            throw new Error(
                "Failed to load complaints"
            );

        }


        const complaints =
            await complaintsResponse.json();


        roomsGrid.innerHTML = "";


        rooms.forEach(
            function (room) {

                // Count unresolved complaints
                const roomComplaints =
                    complaints.filter(
                        function (complaint) {

                            return (
                                complaint.room_number ===
                                room.room_number
                                &&
                                complaint.status !==
                                "resolved"
                            );

                        }
                    );


                const count =
                    roomComplaints.length;


                const roomCard =
                    document.createElement("div");


                roomCard.className =
                    "room-card";


                if (count === 0) {

                    roomCard.innerHTML = `

                        <span>
                            ${room.room_number}
                        </span>

                        <p>
                            No issues
                        </p>

                    `;

                } else {

                    roomCard.innerHTML = `

                        <span>
                            ${room.room_number}
                        </span>

                        <p>
                            ${count}
                            ${count === 1
                                ? "open issue"
                                : "open issues"}
                        </p>

                    `;

                }


                roomsGrid.appendChild(
                    roomCard
                );

            }
        );


    } catch (error) {

        console.error(error);

        roomsGrid.innerHTML = `
            <div class="loading-message">
                Unable to load rooms.
            </div>
        `;

    }

}


// ========================================
// LOAD DASHBOARD
// ========================================

loadDashboard();