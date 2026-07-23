/*============================================================
Sanaullah ScaleFlow University
courses.js
Part 1 — Foundation & DOM References
Version : 1.0 (Fixed & Optimized)
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
DOM REFERENCES (Matched with HTML IDs)
==================================================*/

const searchInput = document.getElementById("courseSearchInput");
const filterArea = document.querySelector(".course-filter-area");
const featuredArea = document.getElementById("featuredCoursesGrid");
const recommendedArea = document.getElementById("recommendedCoursesGrid");
const allCoursesArea = document.getElementById("allCoursesGrid");
const paginationArea = document.getElementById("coursesPagination");
const loadingArea = document.getElementById("coursesLoading");
const emptyStateArea = document.getElementById("noCoursesFound");

/*==================================================
GLOBAL STATE
==================================================*/

let currentPage = 1;
const coursesPerPage = 6;
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

function showToast(message, type = "success") {
    const toastArea = document.getElementById("courseToastArea");
    if (!toastArea) {
        alert(message);
        return;
    }
    const toast = document.createElement("div");
    toast.className = `course-toast ${type}`;
    toast.style.cssText = "background:#2E7D32; color:#fff; padding:12px 20px; margin-top:10px; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.15); font-weight:600; z-index:9999; animation:fadeUp 0.3s ease;";
    toast.textContent = message;
    toastArea.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function isReady(){
    return (
        featuredArea ||
        recommendedArea ||
        allCoursesArea
    );
}

/*============================================================
Part 2 — Enterprise Course Database Items
============================================================*/

courseDatabase.push(
{
    id:"CRS001",
    title:"HTML & CSS Masterclass",
    category:"programming",
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
    category:"programming",
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
    category:"automation",
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
    category:"ai",
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
    category:"business",
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
    category:"business",
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
    category:"business",
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
    category:"business",
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
    category:"business",
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
);

log("Course Database Loaded : " + courseDatabase.length + " Courses");


/*============================================================
Part 3 — Course Card Template & Render Functions (Fixed Yellow Theme)
============================================================*/

function createCourseCard(course){
return `
<div class="course-card" data-id="${course.id}" data-category="${course.category}" data-difficulty="${course.difficulty}" style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 15px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div class="course-image" style="border-radius: 8px; overflow: hidden; margin-bottom: 12px;">
        <img src="${course.image}" alt="${course.title}" onerror="this.src='https://via.placeholder.com/400x200?text=ScaleFlow+Course'" style="width:100%; height:140px; object-fit:cover;">
    </div>
    <div class="course-content">
        <span class="course-category" style="background: #fff8e1; color: #f57f17; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">${course.category}</span>
        <h3 class="course-title" style="font-size: 18px; margin: 10px 0 6px; color: #333;">${course.title}</h3>
        <p class="course-instructor" style="color: #666; font-size: 14px; margin-bottom: 10px;">👨‍🏫 ${course.instructor}</p>
        <div class="course-meta" style="display: flex; justify-content: space-between; font-size: 13px; color: #777; margin-bottom: 10px;">
            <span>📚 ${course.lessons} Lessons</span>
            <span>⏱ ${course.duration}</span>
        </div>
        <div class="course-footer" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-weight: 600;">
            <span class="course-rating" style="color: #fbc02d;">⭐ ${course.rating}</span>
            <span class="course-price" style="color: #2e7d32;">${course.price}</span>
        </div>
        <button class="btn-primary course-start" data-course="${course.id}" type="button" style="width:100%; margin-top:10px; padding:10px; background:#ffc107; color:#000; border:none; border-radius:8px; cursor:pointer; font-weight:700; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
            Start Learning
        </button>
    </div>
</div>
`;
}

    
function renderFeaturedCourses(){
    if(!featuredArea) return;
    const featured = courseDatabase.filter(c => c.featured === true);
    featuredArea.innerHTML = featured.map(createCourseCard).join("");
    log("Featured Courses Rendered");
}

function renderRecommendedCourses(){
    if(!recommendedArea) return;
    const recommended = courseDatabase.filter(c => c.recommended === true);
    recommendedArea.innerHTML = recommended.map(createCourseCard).join("");
    log("Recommended Courses Rendered");
}

function renderAllCourses(courseList = courseDatabase){
    if(!allCoursesArea) return;

    if(courseList.length === 0){
        allCoursesArea.innerHTML = "";
        if(emptyStateArea) emptyStateArea.style.display = "block";
        return;
    }

    if(emptyStateArea) emptyStateArea.style.display = "none";
    allCoursesArea.innerHTML = courseList.map(createCourseCard).join("");
}

/*============================================================
Part 4 — Search, Filter & Pagination Logic
============================================================*/

function renderPagination(courseList = courseDatabase){
    if(!paginationArea) return;
    const totalPages = Math.ceil(courseList.length / coursesPerPage);
    paginationArea.innerHTML = "";

    if(totalPages <= 1) return;

    for(let i=1; i<=totalPages; i++){
        const button = document.createElement("button");
        button.className = "pagination-btn";
        if(i === currentPage) button.classList.add("active");
        button.textContent = i;
        button.addEventListener("click", () => {
            currentPage = i;
            paginateCourses(courseList);
        });
        paginationArea.appendChild(button);
    }
}

function paginateCourses(courseList = courseDatabase){
    const start = (currentPage - 1) * coursesPerPage;
    const end = start + coursesPerPage;
    renderAllCourses(courseList.slice(start, end));
    renderPagination(courseList);
}

function searchCourses(keyword){
    searchKeyword = keyword.toLowerCase().trim();
    const result = courseDatabase.filter(course => {
        return (
            course.title.toLowerCase().includes(searchKeyword) ||
            course.category.toLowerCase().includes(searchKeyword) ||
            course.instructor.toLowerCase().includes(searchKeyword)
        );
    });
    currentPage = 1;
    paginateCourses(result);
}

function filterCourses(filter){
    activeFilter = filter;
    if(filter === "all"){
        paginateCourses(courseDatabase);
        return;
    }
    const result = courseDatabase.filter(course => {
        return (
            course.category.toLowerCase() === filter.toLowerCase() ||
            course.difficulty.toLowerCase() === filter.toLowerCase() ||
            course.price.toLowerCase() === filter.toLowerCase() ||
            course.status.toLowerCase() === filter.toLowerCase()
        );
    });
    currentPage = 1;
    paginateCourses(result);
}

/*==================================================
EVENT LISTENERS
==================================================*/

if(searchInput){
    searchInput.addEventListener("input", function(){
        searchCourses(this.value);
    });
}

document.querySelectorAll(".course-filter").forEach(button => {
    button.addEventListener("click", function(){
        document.querySelectorAll(".course-filter").forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        filterCourses(this.dataset.filter);
    });
});

document.addEventListener("click", function(e){
    if(e.target.classList.contains("course-start")){
        const courseId = e.target.dataset.course;
        const selectedCourse = courseDatabase.find(c => c.id === courseId);
        const courseTitle = selectedCourse ? selectedCourse.title : courseId;
        
        showToast("Opening Course : " + courseTitle, "success");
        
        // اگر آپ کے پاس نیویگیشن فنکشن موجود ہے تو یہ کورس پیج کھول دے گا
        if(typeof navigateTo === "function"){
            navigateTo("courseDetails");
        }
    }
});

/*==================================================
INITIALIZE MODULE
==================================================*/

function initializeCoursesModule(){
    if(!isReady()){
        console.warn("Courses Areas Not Found");
        return;
    }
    renderFeaturedCourses();
    renderRecommendedCourses();
    paginateCourses(courseDatabase);
    log("Courses Module Initialized & Fully Operational");
}

document.addEventListener("DOMContentLoaded", initializeCoursesModule);

/*==================================================
MODULE LOCK
==================================================*/

Object.freeze(courseDatabase);
console.log("✅ Courses Module LOCKED & Secured");

})(window);
