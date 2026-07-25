/*============================================================
ScaleFlow University
COURSES MODULE
Enterprise Edition
Version : 3.0
Status  : Stable
============================================================*/

(function () {

"use strict";

/*============================================================
MODULE INFORMATION
============================================================*/

const MODULE = {
    NAME: "Courses Module",
    VERSION: "3.0",
    AUTHOR: "ScaleFlow University",
    STATUS: "Stable"
};

/*============================================================
GLOBAL STATE
============================================================*/

let currentPage = 1;
const coursesPerPage = 6;

let activeFilter = "all";
let searchKeyword = "";

let selectedCourse = null;

/*============================================================
COURSE DATABASE
============================================================*/

const courseDatabase = [];

/*============================================================
LOGGER
============================================================*/

function log(message) {
    console.log(`[${MODULE.NAME}] ${message}`);
}

log("Courses Module Loaded");

})();

/*============================================================
PART B
COURSE DATABASE
============================================================*/

courseDatabase.push(

{
    id: "CRS001",
    title: "AI Fundamentals",
    category: "ai",
    difficulty: "Beginner",
    instructor: "Sanaullah Mastoi",
    lessons: 12,
    duration: "4 Hours",
    rating: 4.9,
    students: 1250,
    price: "Free",
    featured: true,
    recommended: true,
    image: "assets/courses/ai.jpg",
    status: "Active"
},

{
    id: "CRS002",
    title: "HTML & CSS Masterclass",
    category: "programming",
    difficulty: "Beginner",
    instructor: "Sanaullah Mastoi",
    lessons: 24,
    duration: "8 Hours",
    rating: 4.8,
    students: 980,
    price: "Free",
    featured: true,
    recommended: true,
    image: "assets/courses/html.jpg",
    status: "Active"
},

{
    id: "CRS003",
    title: "JavaScript Professional",
    category: "programming",
    difficulty: "Intermediate",
    instructor: "Sanaullah Mastoi",
    lessons: 35,
    duration: "15 Hours",
    rating: 5.0,
    students: 860,
    price: "$29",
    featured: true,
    recommended: true,
    image: "assets/courses/javascript.jpg",
    status: "Active"
},

{
    id: "CRS004",
    title: "Google Apps Script Automation",
    category: "automation",
    difficulty: "Advanced",
    instructor: "Sanaullah Mastoi",
    lessons: 40,
    duration: "20 Hours",
    rating: 5.0,
    students: 620,
    price: "$49",
    featured: true,
    recommended: true,
    image: "assets/courses/appsscript.jpg",
    status: "Active"
},

{
    id: "CRS005",
    title: "Business Automation",
    category: "business",
    difficulty: "Intermediate",
    instructor: "Sanaullah Mastoi",
    lessons: 18,
    duration: "9 Hours",
    rating: 4.8,
    students: 410,
    price: "$39",
    featured: false,
    recommended: true,
    image: "assets/courses/business.jpg",
    status: "Active"
},

{
    id: "CRS006",
    title: "Freelancing Masterclass",
    category: "business",
    difficulty: "Beginner",
    instructor: "Sanaullah Mastoi",
    lessons: 16,
    duration: "6 Hours",
    rating: 4.9,
    students: 1600,
    price: "Free",
    featured: true,
    recommended: false,
    image: "assets/courses/freelancing.jpg",
    status: "Active"
}

);

log(courseDatabase.length + " Courses Loaded");

/*============================================================
PART C
COURSE CARD RENDER ENGINE
============================================================*/

function createCourseCard(course) {

return `
<div class="course-card"
     data-id="${course.id}"
     data-category="${course.category}">

    <div class="course-image">

        <img
            src="${course.image}"
            alt="${course.title}"
            loading="lazy"
            onerror="this.src='assets/courses/default-course.jpg'">

    </div>

    <div class="course-body">

        <span class="course-category">
            ${course.category.toUpperCase()}
        </span>

        <h3 class="course-title">
            ${course.title}
        </h3>

        <p class="course-instructor">

            👨‍🏫 ${course.instructor}

        </p>

        <div class="course-meta">

            <span>📚 ${course.lessons} Lessons</span>

            <span>⏱ ${course.duration}</span>

        </div>

        <div class="course-rating">

            ⭐ ${course.rating}

        </div>

        <div class="course-footer">

            <span class="course-price">

                ${course.price}

            </span>

            <button
                class="course-start-btn"
                data-course="${course.id}">

                ▶ Start Learning

            </button>

        </div>

    </div>

</div>
`;

}

/*============================================================
RENDER FUNCTION
============================================================*/

function renderCourses(containerId, list) {

    const container = document.getElementById(containerId);

    if (!container) {

        log(containerId + " not found.");

        return;

    }

    if (!list || list.length === 0) {

        container.innerHTML = `
        <div class="empty-state">
            <h3>📭 No Courses Found</h3>
        </div>`;

        return;

    }

    container.innerHTML = list
        .map(createCourseCard)
        .join("");

}

/*============================================================
SECTION RENDERERS
============================================================*/

function renderFeaturedCourses() {

    renderCourses(

        "featuredCoursesGrid",

        courseDatabase.filter(course => course.featured)

    );

}

function renderRecommendedCourses() {

    renderCourses(

        "recommendedCoursesGrid",

        courseDatabase.filter(course => course.recommended)

    );

}

function renderAllCourses() {

    renderCourses(

        "allCoursesGrid",

        courseDatabase

    );

}

log("Part C Loaded");

/*============================================================
PART D
SEARCH & FILTER ENGINE
============================================================*/

function getFilteredCourses() {

    let filtered = [...courseDatabase];

    // Search
    if (searchKeyword.trim() !== "") {

        const keyword = searchKeyword.toLowerCase();

        filtered = filtered.filter(course =>

            course.title.toLowerCase().includes(keyword) ||

            course.category.toLowerCase().includes(keyword) ||

            course.instructor.toLowerCase().includes(keyword)

        );

    }

    // Category Filter
    if (activeFilter !== "all") {

        filtered = filtered.filter(course =>

            course.category === activeFilter

        );

    }

    return filtered;

}

/*============================================================
RENDER FILTERED COURSES
============================================================*/

function renderFilteredCourses() {

    const result = getFilteredCourses();

    renderCourses("allCoursesGrid", result);

}

/*============================================================
SEARCH INPUT
============================================================*/

function initializeSearch() {

    const input = document.getElementById("courseSearchInput");

    if (!input) return;

    input.addEventListener("input", function () {

        searchKeyword = this.value;

        renderFilteredCourses();

    });

}

/*============================================================
FILTER BUTTONS
============================================================*/

function initializeFilters() {

    const buttons = document.querySelectorAll(".course-filter");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            buttons.forEach(btn =>

                btn.classList.remove("active")

            );

            this.classList.add("active");

            activeFilter = this.dataset.filter;

            renderFilteredCourses();

        });

    });

}

log("Part D Loaded");

/*============================================================
PART E
INITIALIZATION ENGINE
Version : 3.0
============================================================*/

function initializeCoursesModule() {

    log("Initializing Courses Module...");

    // Featured Courses
    renderFeaturedCourses();

    // Recommended Courses
    renderRecommendedCourses();

    // All Courses
    renderAllCourses();

    // Search Engine
    initializeSearch();

    // Filter Engine
    initializeFilters();

    log("Courses Module Initialized Successfully.");

}

/*============================================================
AUTO START
============================================================*/

document.addEventListener("DOMContentLoaded", function () {

    initializeCoursesModule();

});

/*============================================================
Part F
RENDER ENGINE
Version : 3.0
============================================================*/

function renderFeaturedCourses() {
    const container = document.getElementById("featuredCoursesGrid");
    if (!container) return;

    const featured = courseDatabase.filter(course => course.featured === true);

    renderCards(container, featured);
}

function renderRecommendedCourses() {
    const container = document.getElementById("recommendedCoursesGrid");
    if (!container) return;

    const recommended = courseDatabase.filter(course => course.recommended === true);

    renderCards(container, recommended);
}

function renderAllCourses() {
    const container = document.getElementById("allCoursesGrid");
    const emptyState = document.getElementById("noCoursesFound");

    if (!container) return;

    const filteredCourses = getFilteredCourses();

    if (filteredCourses.length === 0) {

        container.innerHTML = "";

        if (emptyState) {
            emptyState.style.display = "block";
        }

        return;
    }

    if (emptyState) {
        emptyState.style.display = "none";
    }

    renderCards(container, filteredCourses);
}

log("Part F Loaded Successfully");

/*============================================================
PART H
INITIALIZATION ENGINE
Version : 3.0
============================================================*/

function initializeCoursesModule() {

    log("Initializing Courses Module...");

    // Render all sections
    renderFeaturedCourses();
    renderRecommendedCourses();
    renderAllCourses();

    // Attach events
    initializeSearchEngine();
    initializeFilterEngine();

    // Module Ready
    log("Courses Module Ready.");

}

/*============================================================
AUTO START
============================================================*/

document.addEventListener("DOMContentLoaded", function () {

    initializeCoursesModule();

});

/*============================================================
RENDER AGAIN WHEN COURSES PAGE OPENS
============================================================*/

const navCourses = document.getElementById("navPage3");

if (navCourses) {

    navCourses.addEventListener("click", function () {

        setTimeout(function () {

            initializeCoursesModule();

        }, 100);

    });

}

/*============================================================
PART I
COURSE INTERACTION ENGINE
Version : 3.0
============================================================*/

function getCourseById(courseId) {

    return courseDatabase.find(course => course.id === courseId);

}

/*============================================================
OPEN COURSE DETAILS
============================================================*/

function openCourseDetails(courseId) {

    const course = getCourseById(courseId);

    if (!course) return;

    const modal = document.getElementById("courseDetailsModal");
    const content = document.getElementById("courseDetailsContent");

    if (!modal || !content) return;

    content.innerHTML = `
        <div class="course-details">

            <img src="${course.image}"
                 alt="${course.title}"
                 class="course-details-image">

            <h2>${course.title}</h2>

            <p><strong>Instructor:</strong> ${course.instructor}</p>

            <p><strong>Category:</strong> ${course.category}</p>

            <p><strong>Difficulty:</strong> ${course.difficulty}</p>

            <p><strong>Lessons:</strong> ${course.lessons}</p>

            <p><strong>Duration:</strong> ${course.duration}</p>

            <p><strong>Rating:</strong> ⭐ ${course.rating}</p>

            <p><strong>Price:</strong> ${course.price}</p>

            <button
                class="btn-primary"
                id="startLearningNow"
                data-course="${course.id}">
                ▶ Start Learning
            </button>

        </div>
    `;

    modal.style.display = "flex";

}

/*============================================================
CLOSE MODAL
============================================================*/

function closeCourseDetails() {

    const modal = document.getElementById("courseDetailsModal");

    if (modal) {

        modal.style.display = "none";

    }

}

/*============================================================
INTERACTION EVENTS
============================================================*/

function initializeCourseInteraction() {

    document.addEventListener("click", function (event) {

        // Start Learning Button
        const startBtn = event.target.closest(".course-start-btn");

        if (startBtn) {

            const courseId = startBtn.dataset.course;

            log("Start Learning : " + courseId);

            alert("Start Learning : " + courseId);

            return;

        }

        // Course Card
        const card = event.target.closest(".course-card");

        if (card) {

            openCourseDetails(card.dataset.id);

            return;

        }

        // Close Modal
        if (
            event.target.id === "closeCourseModal" ||
            event.target.id === "courseDetailsModal"
        ) {

            closeCourseDetails();

        }

    });

}

initializeCourseInteraction();

log("Part I Loaded Successfully");

/*============================================================
PART J
ENROLLMENT ENGINE
Version : 3.0
============================================================*/

/*------------------------------------------
Open Enrollment Modal
------------------------------------------*/

function openEnrollmentModal(courseId) {

    const course = getCourseById(courseId);

    if (!course) return;

    const modal = document.getElementById("courseEnrollModal");
    const content = document.getElementById("courseEnrollContent");

    if (!modal || !content) return;

    content.innerHTML = `
        <div class="course-enroll-box">

            <h2>📚 ${course.title}</h2>

            <p><strong>Instructor:</strong> ${course.instructor}</p>

            <p><strong>Lessons:</strong> ${course.lessons}</p>

            <p><strong>Duration:</strong> ${course.duration}</p>

            <p><strong>Price:</strong> ${course.price}</p>

            <button
                id="confirmEnrollmentBtn"
                class="btn-primary"
                data-course="${course.id}">
                ✅ Enroll Now
            </button>

        </div>
    `;

    modal.style.display = "flex";

}

/*------------------------------------------
Close Enrollment Modal
------------------------------------------*/

function closeEnrollmentModal() {

    const modal = document.getElementById("courseEnrollModal");

    if (modal) {

        modal.style.display = "none";

    }

}

/*------------------------------------------
Enrollment Events
------------------------------------------*/

document.addEventListener("click", function(event){

    // Start Learning Button داخل Modal
    if(event.target.id === "startLearningNow"){

        const courseId = event.target.dataset.course;

        openEnrollmentModal(courseId);

    }

    // Confirm Enrollment
    if(event.target.id === "confirmEnrollmentBtn"){

        const courseId = event.target.dataset.course;

        log("Enrollment Confirmed : " + courseId);

        showToast("Enrollment Successful");

        closeEnrollmentModal();

    }

    // Close Modal
    if(

        event.target.id === "closeEnrollModal" ||

        event.target.id === "courseEnrollModal"

    ){

        closeEnrollmentModal();

    }

});

log("Part J Loaded Successfully");

/*============================================================
PART K
SMART SECTIONS ENGINE
Version : 3.0
============================================================*/

/*------------------------------------------
AI Suggestions
------------------------------------------*/

function renderAISuggestions() {

    const container = document.getElementById("aiSuggestionsGrid");

    if (!container) return;

    const list = courseDatabase.filter(course => course.recommended);

    renderCards(container, list);

}

/*------------------------------------------
Continue Learning
------------------------------------------*/

function renderContinueLearning() {

    const container = document.getElementById("continueLearningGrid");

    if (!container) return;

    const list = courseDatabase.slice(0,2);

    renderCards(container, list);

}

/*------------------------------------------
Recently Viewed
------------------------------------------*/

function renderRecentCourses() {

    const container = document.getElementById("recentCoursesGrid");

    if (!container) return;

    const list = courseDatabase.slice(0,3);

    renderCards(container, list);

}

/*------------------------------------------
Learning Paths
------------------------------------------*/

function renderLearningPaths() {

    const container = document.getElementById("recommendedLearningPaths");

    if (!container) return;

    container.innerHTML = `

    <div class="learning-path-card">
        <h3>🚀 Programming Path</h3>
        <p>HTML → CSS → JavaScript → Apps Script</p>
    </div>

    <div class="learning-path-card">
        <h3>🤖 AI Automation Path</h3>
        <p>AI → Automation → Business</p>
    </div>

    <div class="learning-path-card">
        <h3>💼 Freelancing Path</h3>
        <p>Skills → Portfolio → Upwork</p>
    </div>

    `;

}

/*------------------------------------------
Categories
------------------------------------------*/

function renderCategories() {

    const container = document.getElementById("courseCategories");

    if (!container) return;

    container.innerHTML = `

    <div class="category-card">💻 Programming</div>

    <div class="category-card">🤖 AI</div>

    <div class="category-card">⚙ Automation</div>

    <div class="category-card">💼 Business</div>

    `;

}

/*------------------------------------------
Initialize Smart Sections
------------------------------------------*/

function initializeSmartSections(){

    renderAISuggestions();

    renderContinueLearning();

    renderRecentCourses();

    renderLearningPaths();

    renderCategories();

}

initializeSmartSections();

log("Part K Loaded Successfully");
