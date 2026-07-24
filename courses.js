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
