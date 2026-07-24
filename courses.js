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
