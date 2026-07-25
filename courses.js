/*============================================================
ScaleFlow University
COURSES MODULE - Enterprise Edition (Direct HTML Integration)
Version : 2.2 Final
Status  : Stable & Optimized
============================================================*/

(function (window) {

"use strict";

const MODULE = Object.freeze({
    NAME: "Courses Module",
    VERSION: "2.2",
    AUTHOR: "ScaleFlow University",
    STATUS: "Active"
});

let activeFilter = "all";
let searchKeyword = "";

/*============================================================
COURSE DATABASE
============================================================*/

const courseDatabase = [
    {
        id: "c1",
        title: "AI Fundamentals & Automation",
        category: "ai",
        difficulty: "Beginner",
        instructor: "Sanaullah Mastoi",
        lessons: 12,
        duration: "4 Hours",
        rating: 4.9,
        price: "Free",
        featured: true,
        recommended: true,
        image: "https://via.placeholder.com/400x220?text=AI+Fundamentals"
    },
    {
        id: "c2",
        title: "Google Sheets & Apps Script Pro",
        category: "automation",
        difficulty: "Intermediate",
        instructor: "Sanaullah Mastoi",
        lessons: 15,
        duration: "6 Hours",
        rating: 4.8,
        price: "$29.99",
        featured: true,
        recommended: true,
        image: "https://via.placeholder.com/400x220?text=Google+Sheets+Automation"
    },
    {
        id: "c3",
        title: "Modern Web Development (HTML/JS)",
        category: "programming",
        difficulty: "Beginner",
        instructor: "Sanaullah Mastoi",
        lessons: 20,
        duration: "10 Hours",
        rating: 4.9,
        price: "$49.99",
        featured: false,
        recommended: true,
        image: "https://via.placeholder.com/400x220?text=Web+Development"
    },
    {
        id: "c4",
        title: "Freelancing Masterclass (Upwork & Client Handling)",
        category: "business",
        difficulty: "All Levels",
        instructor: "Sanaullah Mastoi",
        lessons: 10,
        duration: "3 Hours",
        rating: 5.0,
        price: "Free",
        featured: true,
        recommended: false,
        image: "https://via.placeholder.com/400x220?text=Freelancing+Masterclass"
    }
];

/*============================================================
UTILITY FUNCTIONS
============================================================*/

function log(message) {
    console.log(`[${MODULE.NAME}] ${message}`);
}

/*============================================================
COURSE CARD RENDERER
============================================================*/

function createCourseCard(course) {
    return `
    <div class="course-card"
         data-courseid="${course.id}"
         data-category="${course.category}"
         data-difficulty="${course.difficulty}">

        <div class="course-image">
            <img src="${course.image}"
                 alt="${course.title}"
                 onerror="this.src='https://via.placeholder.com/400x220?text=ScaleFlow+University'">
        </div>

        <div class="course-content">
            <span class="course-category">${course.category}</span>
            <h3 class="course-title">${course.title}</h3>
            <p class="course-instructor">👨‍🏫 ${course.instructor}</p>

            <div class="course-meta">
                <span>📚 ${course.lessons} Lessons</span>
                <span>⏱ ${course.duration}</span>
            </div>

            <div class="course-footer">
                <span class="course-rating">⭐ ${course.rating}</span>
                <span class="course-price">${course.price}</span>
            </div>

            <button class="course-start btn-primary" type="button" data-courseid="${course.id}">
                ▶ Start Learning
            </button>
        </div>
    </div>
    `;
}

function renderCards(container, list) {
    if (!container) return;
    if (list.length === 0) {
        container.innerHTML = `<p style="padding:15px; color:#777;">No courses available in this section.</p>`;
        return;
    }
    container.innerHTML = list.map(createCourseCard).join("");
}

/*============================================================
FILTER & SEARCH LOGIC
============================================================*/

function getFilteredCourses() {
    let list = courseDatabase;

    // Category Filter
    if (activeFilter && activeFilter !== "all") {
        list = list.filter(c => c.category.toLowerCase() === activeFilter.toLowerCase());
    }

    // Search Keyword Filter
    if (searchKeyword && searchKeyword.trim() !== "") {
        const kw = searchKeyword.toLowerCase();
        list = list.filter(c => 
            c.title.toLowerCase().includes(kw) ||
            c.category.toLowerCase().includes(kw) ||
            c.instructor.toLowerCase().includes(kw)
        );
    }

    return list;
}

/*============================================================
MAIN RENDER ENGINE
============================================================*/

function renderAllSections() {
    const featuredGrid = document.getElementById("featuredCoursesGrid");
    const recommendedGrid = document.getElementById("recommendedCoursesGrid");
    const allCoursesGrid = document.getElementById("allCoursesGrid");
    const noCoursesFound = document.getElementById("noCoursesFound");

    // 1. Featured Courses (Only featured = true)
    if (featuredGrid) {
        const featuredList = courseDatabase.filter(c => c.featured);
        renderCards(featuredGrid, featuredList);
    }

    // 2. Recommended Courses (Only recommended = true)
    if (recommendedGrid) {
        const recommendedList = courseDatabase.filter(c => c.recommended);
        renderCards(recommendedGrid, recommendedList);
    }

    // 3. All Courses / Filtered / Searched Courses
    if (allCoursesGrid) {
        const filteredList = getFilteredCourses();
        if (filteredList.length === 0) {
            allCoursesGrid.innerHTML = "";
            if (noCoursesFound) noCoursesFound.style.display = "block";
        } else {
            if (noCoursesFound) noCoursesFound.style.display = "none";
            renderCards(allCoursesGrid, filteredList);
        }
    }

    log("All sections rendered successfully.");
}

/*============================================================
EVENT LISTENERS & BINDINGS
============================================================*/

function initCourseEvents() {
    // Search Input Listener
    const searchInput = document.getElementById("courseSearchInput");
    if (searchInput) {
        searchInput.addEventListener("input", function() {
            searchKeyword = this.value;
            renderAllSections();
        });
    }

    // Filter Buttons Listener
    const filterButtons = document.querySelectorAll(".course-filter");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            filterButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            activeFilter = this.dataset.filter || "all";
            renderAllSections();
        });
    });

    // Click on Card or Start Learning Button
    document.addEventListener("click", function(e) {
        const card = e.target.closest(".course-card");
        if (card && card.dataset.courseid) {
            const courseId = card.dataset.courseid;
            const course = courseDatabase.find(c => c.id === courseId);
            if (course) {
                // آپ یہاں کورس ڈیٹیل یا انرولمنٹ کا فنکشن چلا سکتے ہیں
                log(`Clicked on course: ${course.title}`);
            }
        }
    });
}

/*============================================================
INITIALIZATION ON LOAD & NAVIGATION
============================================================*/

document.addEventListener("DOMContentLoaded", function() {
    renderAllSections();
    initCourseEvents();
});

// اگر سائیڈ بار یا پیج 3 پر کلک کرنے سے کورسز دوبارہ لوڈ کروانے ہوں
const navCourses = document.getElementById("navPage3");
if (navCourses) {
    navCourses.addEventListener("click", function(e) {
        setTimeout(() => {
            renderAllSections();
        }, 50);
    });
}

})(window);
