/*============================================================
ScaleFlow University
COURSES MODULE
Part A — Foundation
Version : 2.0 Enterprise
Status  : Stable
============================================================*/

(function (window) {

"use strict";

/*============================================================
MODULE INFORMATION
============================================================*/

const MODULE = Object.freeze({
    NAME: "Courses Module",
    VERSION: "2.0",
    AUTHOR: "ScaleFlow University",
    STATUS: "Development"
});

/*============================================================
GLOBAL STATE
============================================================*/

let currentPage = 1;
const coursesPerPage = 6;

let activeFilter = "all";
let searchKeyword = "";
let currentCourses = [];

/*============================================================
COURSE DATABASE
============================================================*/

const courseDatabase = [];

/*============================================================
UTILITY FUNCTIONS
============================================================*/

function log(message) {
    console.log(`[${MODULE.NAME}] ${message}`);
}

function error(message) {
    console.error(`[${MODULE.NAME}] ${message}`);
}

function warn(message) {
    console.warn(`[${MODULE.NAME}] ${message}`);
}

/*============================================================
FOUNDATION READY
============================================================*/

log("Part A Loaded Successfully");

    /*============================================================
Part B — DOM References
============================================================*/

let searchInput = null;
let filterArea = null;

let featuredArea = null;
let recommendedArea = null;
let allCoursesArea = null;

let paginationArea = null;
let loadingArea = null;
let emptyStateArea = null;

let toastArea = null;

let detailsModal = null;
let enrollModal = null;

/*============================================================
LOAD DOM REFERENCES
============================================================*/

function loadCourseDOM() {

    searchInput = document.getElementById("courseSearchInput");
    filterArea = document.querySelector(".course-filter-area");

    featuredArea = document.getElementById("featuredCoursesGrid");
    recommendedArea = document.getElementById("recommendedCoursesGrid");
    allCoursesArea = document.getElementById("allCoursesGrid");

    paginationArea = document.getElementById("coursesPagination");
    loadingArea = document.getElementById("coursesLoading");
    emptyStateArea = document.getElementById("noCoursesFound");

    toastArea = document.getElementById("courseToastArea");

    detailsModal = document.getElementById("courseDetailsModal");
    enrollModal = document.getElementById("courseEnrollModal");

    log("DOM References Loaded");
}

/*============================================================
DOM VALIDATION
============================================================*/

function validateCourseDOM() {

    const required = [
        featuredArea,
        recommendedArea,
        allCoursesArea
    ];

    const ready = required.every(item => item !== null);

    if (!ready) {

        warn("Course HTML ابھی Load نہیں ہوا۔");

        return false;

    }

    log("DOM Validation Passed");

    return true;

}

 /*============================================================
Part C — Course Database Manager
============================================================*/

/*============================================================
DATABASE FUNCTIONS
============================================================*/

function addCourse(course) {

    if (!course) return;

    courseDatabase.push(course);

}

function addCourses(courseArray) {

    if (!Array.isArray(courseArray)) return;

    courseArray.forEach(addCourse);

}

function getAllCourses() {

    return [...courseDatabase];

}

function getFeaturedCourses() {

    return courseDatabase.filter(course => course.featured === true);

}

function getRecommendedCourses() {

    return courseDatabase.filter(course => course.recommended === true);

}

function getCourseById(id) {

    return courseDatabase.find(course => course.id === id);

}

function getCoursesByCategory(category) {

    if (category === "all") {

        return getAllCourses();

    }

    return courseDatabase.filter(course => course.category === category);

}

function searchCourses(keyword) {

    if (!keyword || keyword.trim() === "") {

        return getAllCourses();

    }

    keyword = keyword.toLowerCase();

    return courseDatabase.filter(course => {

        return (

            course.title.toLowerCase().includes(keyword) ||

            course.category.toLowerCase().includes(keyword) ||

            course.instructor.toLowerCase().includes(keyword)

        );

    });

}

/*============================================================
DATABASE READY
============================================================*/

log("Course Database Manager Ready");

    
/*============================================================
Part D — Course Card Renderer
============================================================*/

function createCourseCard(course) {

    return `
    <div class="course-card"
         data-id="${course.id}"
         data-category="${course.category}"
         data-difficulty="${course.difficulty}">

        <div class="course-image">
            <img src="${course.image}"
                 alt="${course.title}"
                 onerror="this.src='https://via.placeholder.com/400x220?text=ScaleFlow+University'">
        </div>

        <div class="course-content">

            <span class="course-category">
                ${course.category}
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

            <div class="course-footer">

                <span class="course-rating">
                    ⭐ ${course.rating}
                </span>

                <span class="course-price">
                    ${course.price}
                </span>

            </div>

            <button
                class="course-start btn-primary"
                type="button"
                data-course="${course.id}">

                ▶ Start Learning

            </button>

        </div>

    </div>
    `;

}

/*============================================================
Render Helpers
============================================================*/

function renderCards(container, list) {

    if (!container) return;

    container.innerHTML = list.map(createCourseCard).join("");

}

    /*============================================================
Part E — Render Engine
============================================================*/

/*============================================================
FEATURED COURSES
============================================================*/

function renderFeaturedCourses() {

    if (!featuredArea) return;

    const featured = getFeaturedCourses();

    renderCards(featuredArea, featured);

    log("Featured Courses Rendered");

}

/*============================================================
RECOMMENDED COURSES
============================================================*/

function renderRecommendedCourses() {

    if (!recommendedArea) return;

    const recommended = getRecommendedCourses();

    renderCards(recommendedArea, recommended);

    log("Recommended Courses Rendered");

}

/*============================================================
ALL COURSES
============================================================*/

function renderAllCourses(courseList = getAllCourses()) {

    if (!allCoursesArea) return;

    currentCourses = [...courseList];

    if (courseList.length === 0) {

        allCoursesArea.innerHTML = "";

        if (emptyStateArea) {

            emptyStateArea.style.display = "block";

        }

        return;

    }

    if (emptyStateArea) {

        emptyStateArea.style.display = "none";

    }

    renderCards(allCoursesArea, courseList);

    log("All Courses Rendered : " + courseList.length);

}

/*============================================================
MASTER RENDER
============================================================*/

function renderCoursesModule() {

    renderFeaturedCourses();

    renderRecommendedCourses();

    renderAllCourses();

    log("Courses Module Render Complete");

}

    
/*============================================================
Part F — Integration Engine
Version : 1.0
============================================================*/

function initializeCoursesModule() {

    log("Initializing Courses Module...");

    if (!isReady()) {
        console.error("[Courses] HTML containers not found.");
        return;
    }

    if (loadingArea) {
        loadingArea.style.display = "block";
    }

    setTimeout(() => {

        if (loadingArea) {
            loadingArea.style.display = "none";
        }

        renderFeaturedCourses();
        renderRecommendedCourses();
        renderAllCourses();

        attachSearchEngine();
        attachFilterEngine();

        log("Courses Module Initialized Successfully.");

    }, 400);

}

/*==================================================
SEARCH ENGINE
==================================================*/

function attachSearchEngine(){

    if(!searchInput) return;

    searchInput.addEventListener("input",function(){

        searchKeyword=this.value.toLowerCase().trim();

        renderAllCourses();

    });

}

/*==================================================
FILTER ENGINE
==================================================*/

function attachFilterEngine(){

    const filters=document.querySelectorAll(".course-filter");

    filters.forEach(btn=>{

        btn.addEventListener("click",function(){

            filters.forEach(x=>x.classList.remove("active"));

            this.classList.add("active");

            activeFilter=this.dataset.filter;

            renderAllCourses();

        });

    });

}

/*==================================================
AUTO START
==================================================*/

document.addEventListener("DOMContentLoaded",function(){

    initializeCoursesModule();

});

 /*============================================================
Part G — Navigation Engine
Version : 1.0
============================================================*/

function openCoursesPage() {

    document.querySelectorAll(".page-section").forEach(section => {
        section.style.display = "none";
    });

    const coursesPage = document.getElementById("page3");
    if (coursesPage) {
        coursesPage.style.display = "block";
    }

    document.querySelectorAll(".sidebar-menu a").forEach(link => {
        link.classList.remove("active");
    });

    const navCourses = document.getElementById("navPage3");
    if (navCourses) {
        navCourses.classList.add("active");
    }

    initializeCoursesModule();

    log("Courses Page Opened.");

}

const navCourses = document.getElementById("navPage3");

if (navCourses) {

    navCourses.addEventListener("click", function (e) {

        e.preventDefault();

        openCoursesPage();

    });

}

    /*============================================================
Part H — AI Placeholder Engine
============================================================*/

function showComingSoon(featureName){

    const message =
`🚧 ${featureName}

This feature is under development.

The interface is ready, but its engine has not been connected yet.

It will become available in a future ScaleFlow University update.`;

    showToast(message,"success");

}

document.addEventListener("click",function(e){

    const card=e.target.closest(".course-card");

    if(!card) return;

    const courseId=card.dataset.courseid;

    const course=courseDatabase.find(c=>c.id===courseId);

    if(!course) return;

    if(course.status==="Coming Soon"){

        showComingSoon(course.title);

        return;

    }

    showToast(
        "📚 "+course.title+
        "\n\nLearning Engine will be connected in the next update."
    );

});

    /*============================================================
Part I — Course Details Modal Engine
Version : 1.0
============================================================*/

function openCourseDetails(courseId){

    const course = courseDatabase.find(c => c.id === courseId);

    if(!course){
        showToast("Course not found.","error");
        return;
    }

    const modal = document.getElementById("courseDetailsModal");
    const content = document.getElementById("courseDetailsContent");

    if(!modal || !content){
        console.error("[Courses] Course Details Modal not found.");
        return;
    }

    content.innerHTML = `
        <div class="course-details-card">

            <h2>${course.title}</h2>

            <p><strong>Instructor:</strong> ${course.instructor}</p>

            <p><strong>Category:</strong> ${course.category}</p>

            <p><strong>Difficulty:</strong> ${course.difficulty}</p>

            <p><strong>Duration:</strong> ${course.duration}</p>

            <p><strong>Lessons:</strong> ${course.lessons}</p>

            <p><strong>Students:</strong> ${course.students}</p>

            <p><strong>Rating:</strong> ⭐ ${course.rating}</p>

            <p><strong>Price:</strong> ${course.price}</p>

            <p><strong>Status:</strong> ${course.status}</p>

            <div style="margin-top:20px;">
                <button id="enrollNowBtn"
                        class="btn-primary"
                        data-courseid="${course.id}">
                        🎓 Enroll Now
                </button>
            </div>

        </div>
    `;

    modal.style.display = "flex";

}

/*==================================================
Close Modal
==================================================*/

const closeCourseModalBtn =
document.getElementById("closeCourseModal");

if(closeCourseModalBtn){

    closeCourseModalBtn.addEventListener("click",function(){

        document.getElementById("courseDetailsModal").style.display="none";

    });

}

window.addEventListener("click",function(e){

    const modal=document.getElementById("courseDetailsModal");

    if(e.target===modal){

        modal.style.display="none";

    }

});

/*==================================================
Open Details From Course Card
==================================================*/

document.addEventListener("click",function(e){

    const card=e.target.closest(".course-card");

    if(!card) return;

    const id=card.dataset.courseid;

    if(id){

        openCourseDetails(id);

    }

});

/*==================================================
Enrollment Placeholder
==================================================*/

document.addEventListener("click",function(e){

    if(e.target.id!=="enrollNowBtn") return;

    const id=e.target.dataset.courseid;

    const course=courseDatabase.find(c=>c.id===id);

    showToast(
        "🎓 Enrollment Engine\n\n"+
        "Course: "+course.title+
        "\n\nThis feature will be activated after the Enrollment Engine is connected."
    );

});
 
