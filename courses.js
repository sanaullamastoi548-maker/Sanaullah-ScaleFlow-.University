/*============================================================
Sanaullah ScaleFlow University
courses.js
Part 1 — Foundation
Version : 1.0
Status  : Enterprise
============================================================*/

(function (global) {

"use strict";

/*==================================================
MODULE INFORMATION
==================================================*/

const MODULE_NAME = "Courses Module";
const MODULE_VERSION = "1.0";

/*==================================================
DOM REFERENCES
==================================================*/

const searchArea =
document.getElementById("courseSearchArea");

const filterArea =
document.getElementById("courseFilterArea");

const featuredArea =
document.getElementById("featuredCoursesArea");

const recommendedArea =
document.getElementById("recommendedCoursesArea");

const allCoursesArea =
document.getElementById("allCoursesArea");

const paginationArea =
document.getElementById("paginationArea");

/*==================================================
GLOBAL STATE
==================================================*/

let currentPage = 1;

const coursesPerPage = 9;

let activeFilter = "all";

let searchKeyword = "";

/*==================================================
COURSE DATABASE
==================================================*/

const courseDatabase = [];

/*==================================================
HELPER FUNCTIONS
==================================================*/

function log(message){

    console.log("[Courses] " + message);

}

function isReady(){

    return (

        featuredArea &&
        recommendedArea &&
        allCoursesArea

    );

}

/*==================================================
MODULE START
==================================================*/

function initializeCoursesModule(){

    if(!isReady()){

        console.warn(
            "Courses Areas Not Found"
        );

        return;

    }

    log("Courses Module Initialized");

}

/*==================================================
PUBLIC API
==================================================*/

global.CoursesModule = {

    initialize:
    initializeCoursesModule,

    database:
    courseDatabase

};

document.addEventListener(

    "DOMContentLoaded",

    initializeCoursesModule

);

})(window);


/*============================================================
Courses Module
Part 2 — Enterprise Course Database
Version : 1.0
============================================================*/

/*==================================================
COURSE DATABASE
==================================================*/

courseDatabase.push(

{
    id:"CRS001",
    title:"HTML & CSS Masterclass",
    category:"Web Development",
    difficulty:"Beginner",
    instructor:"Sanaullah",
    duration:"12 Hours",
    lessons:24,
    rating:4.9,
    students:1250,
    featured:true,
    recommended:true,
    image:"assets/courses/html-css.jpg",
    price:"Free",
    status:"Active"
},

{
    id:"CRS002",
    title:"JavaScript Professional",
    category:"Web Development",
    difficulty:"Intermediate",
    instructor:"Sanaullah",
    duration:"20 Hours",
    lessons:42,
    rating:4.8,
    students:980,
    featured:true,
    recommended:true,
    image:"assets/courses/javascript.jpg",
    price:"Free",
    status:"Active"
},

{
    id:"CRS003",
    title:"Google Apps Script",
    category:"Automation",
    difficulty:"Advanced",
    instructor:"Sanaullah",
    duration:"25 Hours",
    lessons:50,
    rating:5.0,
    students:640,
    featured:true,
    recommended:true,
    image:"assets/courses/apps-script.jpg",
    price:"Free",
    status:"Active"
},

{
    id:"CRS004",
    title:"AI Productivity",
    category:"Artificial Intelligence",
    difficulty:"Intermediate",
    instructor:"Sanaullah",
    duration:"15 Hours",
    lessons:30,
    rating:4.8,
    students:720,
    featured:false,
    recommended:true,
    image:"assets/courses/ai.jpg",
    price:"Free",
    status:"Active"
},

{
    id:"CRS005",
    title:"Business Automation",
    category:"Business",
    difficulty:"Advanced",
    instructor:"Sanaullah",
    duration:"18 Hours",
    lessons:36,
    rating:4.9,
    students:520,
    featured:false,
    recommended:false,
    image:"assets/courses/business.jpg",
    price:"Premium",
    status:"Active"
},

{
    id:"CRS006",
    title:"Freelancing Mastery",
    category:"Freelancing",
    difficulty:"Beginner",
    instructor:"Sanaullah",
    duration:"10 Hours",
    lessons:20,
    rating:4.7,
    students:1500,
    featured:true,
    recommended:false,
    image:"assets/courses/freelancing.jpg",
    price:"Free",
    status:"Active"
},

{
    id:"CRS007",
    title:"SEO Complete Guide",
    category:"Marketing",
    difficulty:"Intermediate",
    instructor:"Sanaullah",
    duration:"14 Hours",
    lessons:28,
    rating:4.8,
    students:890,
    featured:false,
    recommended:false,
    image:"assets/courses/seo.jpg",
    price:"Free",
    status:"Active"
},

{
    id:"CRS008",
    title:"Digital Marketing",
    category:"Marketing",
    difficulty:"Intermediate",
    instructor:"Sanaullah",
    duration:"16 Hours",
    lessons:32,
    rating:4.9,
    students:810,
    featured:false,
    recommended:true,
    image:"assets/courses/marketing.jpg",
    price:"Premium",
    status:"Active"
},

{
    id:"CRS009",
    title:"ScaleFlow Enterprise",
    category:"Business",
    difficulty:"Advanced",
    instructor:"Sanaullah",
    duration:"30 Hours",
    lessons:60,
    rating:5.0,
    students:220,
    featured:true,
    recommended:true,
    image:"assets/courses/scaleflow.jpg",
    price:"Premium",
    status:"Coming Soon"
}

/* مزید Courses بعد میں اسی Array میں شامل ہوں گے */

);

log(
    "Course Database Loaded : " +
    courseDatabase.length +
    " Courses"
);

/*============================================================
Courses Module
Part 3 — Featured & Recommended Renderer
Version : 1.0
============================================================*/

/*==================================================
COURSE CARD TEMPLATE
==================================================*/

function createCourseCard(course){

return `

<div class="course-card"
     data-id="${course.id}"
     data-category="${course.category}"
     data-difficulty="${course.difficulty}">

    <div class="course-image">

        <img src="${course.image}"
             alt="${course.title}">

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
            class="btn-primary course-start"
            data-course="${course.id}">

            Start Learning

        </button>

    </div>

</div>

`;

}

/*==================================================
FEATURED COURSES
==================================================*/

function renderFeaturedCourses(){

    if(!featuredArea) return;

    const featured =
    courseDatabase.filter(

        c => c.featured === true

    );

    featuredArea.innerHTML =
    featured
        .map(createCourseCard)
        .join("");

    log(
        "Featured Courses Rendered"
    );

}

/*==================================================
RECOMMENDED COURSES
==================================================*/

function renderRecommendedCourses(){

    if(!recommendedArea) return;

    const recommended =
    courseDatabase.filter(

        c => c.recommended === true

    );

    recommendedArea.innerHTML =
    recommended
        .map(createCourseCard)
        .join("");

    log(
        "Recommended Courses Rendered"
    );

}

/*==================================================
INITIAL RENDER
==================================================*/

function renderHomeCourses(){

    renderFeaturedCourses();

    renderRecommendedCourses();

}

document.addEventListener(

    "DOMContentLoaded",

    renderHomeCourses

);

/*============================================================
Courses Module
Part 4 — All Courses Grid + Search + Filter
Version : 1.0 Enterprise
============================================================*/

/*==================================================
RENDER ALL COURSES
==================================================*/

function renderAllCourses(courseList = courseDatabase){

    if(!allCoursesArea) return;

    if(courseList.length === 0){

        allCoursesArea.innerHTML = `

        <div class="empty-state">

            <h3>No Courses Found</h3>

            <p>Please try another search.</p>

        </div>

        `;

        return;

    }

    allCoursesArea.innerHTML = courseList
        .map(createCourseCard)
        .join("");

}

/*==================================================
SEARCH
==================================================*/

function searchCourses(keyword){

    searchKeyword = keyword.toLowerCase().trim();

    const result = courseDatabase.filter(course=>{

        return (

            course.title.toLowerCase().includes(searchKeyword) ||

            course.category.toLowerCase().includes(searchKeyword) ||

            course.instructor.toLowerCase().includes(searchKeyword)

        );

    });

    renderAllCourses(result);

}

/*==================================================
FILTER
==================================================*/

function filterCourses(filter){

    activeFilter = filter;

    if(filter==="all"){

        renderAllCourses();

        return;

    }

    const result = courseDatabase.filter(course=>{

        return (

            course.category===filter ||

            course.difficulty===filter ||

            course.price===filter ||

            course.status===filter

        );

    });

    renderAllCourses(result);

}

/*==================================================
SEARCH EVENTS
==================================================*/

const courseSearchInput =
document.getElementById("courseSearchInput");

if(courseSearchInput){

    courseSearchInput.addEventListener(

        "input",

        function(){

            searchCourses(this.value);

        }

    );

}

/*==================================================
FILTER EVENTS
==================================================*/

document.querySelectorAll(

".course-filter"

).forEach(button=>{

    button.addEventListener(

        "click",

        function(){

            document
            .querySelectorAll(".course-filter")
            .forEach(btn=>{

                btn.classList.remove("active");

            });

            this.classList.add("active");

            filterCourses(

                this.dataset.filter

            );

        }

    );

});

/*==================================================
START COURSE BUTTON
==================================================*/

document.addEventListener(

    "click",

    function(e){

        if(

            e.target.classList.contains(

                "course-start"

            )

        ){

            const courseId =

            e.target.dataset.course;

            showToast(

                "Opening Course : " +

                courseId,

                "success"

            );

            navigateTo("page4");

        }

    }

);

/*==================================================
INITIAL LOAD
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    function(){

        renderAllCourses();

        log("All Courses Rendered");

    }

);
