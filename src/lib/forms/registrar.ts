import type { EntrySpec, FormSpec } from "@/lib/forms/types"

/**
 * Registrar module specs (blueprint Phase 1). Field lists mirror the real
 * installed DocTypes plus the PH-specific custom fields added in
 * campus_erp/setup/custom_fields.py — see IMPLEMENTATION-MAPPING.md's
 * Registrar section for the terminology swap: blueprint "Course" (degree
 * program) == Education "Program"; blueprint "Subject" == Education "Course".
 * Link fields are entered as the exact document name (Program/Course/Student
 * Group all autoname off their own name field, so this is human-typable).
 */

export const studentSpec: FormSpec = {
  doctype: "Student",
  title: "Students",
  fields: [
    { fieldname: "student_name", label: "Student Name", fieldtype: "Data", readOnly: true, inListView: true },
    { fieldname: "first_name", label: "First Name", fieldtype: "Data", required: true, inListView: true },
    { fieldname: "middle_name", label: "Middle Name", fieldtype: "Data" },
    { fieldname: "last_name", label: "Last Name", fieldtype: "Data", inListView: true },
    { fieldname: "student_email_id", label: "Email Address", fieldtype: "Data", required: true, inListView: true },
    { fieldname: "student_mobile_number", label: "Mobile Number", fieldtype: "Data" },
    { fieldname: "date_of_birth", label: "Date of Birth", fieldtype: "Date" },
    { fieldname: "gender", label: "Gender", fieldtype: "Link", options: "Gender" },
    { fieldname: "birth_place", label: "Birth Place", fieldtype: "Data" },
    { fieldname: "town", label: "Town", fieldtype: "Data" },
    { fieldname: "province", label: "Province", fieldtype: "Data" },
    { fieldname: "lrn", label: "LRN (DepEd Learner Reference No.)", fieldtype: "Data" },
    { fieldname: "sms_status", label: "Status", fieldtype: "Select", options: "Active\nInactive\nGraduated\nDropped", inListView: true },
    { fieldname: "branch", label: "Branch", fieldtype: "Link", options: "Branch" },
    { fieldname: "stdnt_cno", label: "Student Control No.", fieldtype: "Data", readOnly: true },
    { fieldname: "scholarship", label: "Scholarship", fieldtype: "Link", options: "SMS Code" },
    { fieldname: "discount_type", label: "Discount Type", fieldtype: "Link", options: "SMS Code" },
    { fieldname: "transferee", label: "Transferee", fieldtype: "Check" },
    { fieldname: "prev_course", label: "Previous Course", fieldtype: "Data" },
    { fieldname: "last_course_attended", label: "Last Course Attended", fieldtype: "Data" },
    { fieldname: "year_last_attended", label: "Year Last Attended", fieldtype: "Int" },
    { fieldname: "address_line_1", label: "Address", fieldtype: "Data" },
    { fieldname: "city", label: "City", fieldtype: "Data" },
    { fieldname: "country", label: "Country", fieldtype: "Link", options: "Country" },
  ],
}

export const curriculumSpec: EntrySpec = {
  doctype: "SMS Curriculum",
  title: "Curriculum",
  fields: [
    { fieldname: "curriculum_code", label: "Curriculum Code", fieldtype: "Data", required: true },
    { fieldname: "course", label: "Program", fieldtype: "Link", options: "Program", required: true },
    { fieldname: "curriculum_year", label: "Curriculum Year", fieldtype: "Data" },
    {
      fieldname: "sem_type",
      label: "Term Structure",
      fieldtype: "Select",
      options: "Quarter\nPrelim-Midterm-Finals\nTrisemester\nFull Payment Only",
    },
    { fieldname: "max_units", label: "Max Units per Term", fieldtype: "Float" },
    { fieldname: "is_active", label: "Is Current Curriculum", fieldtype: "Check" },
  ],
  childTable: {
    fieldname: "subjects",
    doctype: "SMS Curriculum Subject",
    columns: [
      { fieldname: "year_level", label: "Year Level", fieldtype: "Int", required: true },
      { fieldname: "semester", label: "Semester", fieldtype: "Int", required: true },
      { fieldname: "subject", label: "Subject", fieldtype: "Link", options: "Course", required: true },
      { fieldname: "prerequisite", label: "Prerequisite", fieldtype: "Link", options: "Course" },
    ],
  },
}

export const permitSpec: EntrySpec = {
  doctype: "SMS Permit",
  title: "Permit to Take Exam",
  fields: [
    { fieldname: "student", label: "Student", fieldtype: "Link", options: "Student", required: true },
    { fieldname: "course", label: "Program", fieldtype: "Link", options: "Program" },
    { fieldname: "year_level", label: "Year Level", fieldtype: "Int" },
    { fieldname: "semester", label: "Semester", fieldtype: "Int" },
    { fieldname: "school_year", label: "School Year", fieldtype: "Data" },
    { fieldname: "term", label: "Exam Period", fieldtype: "Data" },
    { fieldname: "total_fee", label: "Total Fee", fieldtype: "Currency" },
    { fieldname: "payment", label: "Payment", fieldtype: "Currency" },
    { fieldname: "due_payment", label: "Due Payment", fieldtype: "Currency" },
    { fieldname: "status", label: "Status", fieldtype: "Select", options: "Pending\nEligible\nIssued" },
    { fieldname: "permit_no", label: "Permit No.", fieldtype: "Data" },
  ],
  childTable: {
    fieldname: "subjects",
    doctype: "SMS Permit Subject",
    columns: [
      { fieldname: "subject", label: "Subject", fieldtype: "Link", options: "Course", required: true },
      { fieldname: "class", label: "Class (Student Group)", fieldtype: "Link", options: "Student Group" },
    ],
  },
}
