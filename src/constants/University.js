export const AUS_STATES = ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania", "Northern Territory"];
export const FILTER_DURATION = [
    {
        title: "Less than 1 year",
        value: "less 12"
    },
    {
        title: "1 year",
        value: 12
    },
    {
        title: "2 year",
        value: 24
    },
    {
        title: "More than 1 year",
        value: "greater 24"
    },
];
export const GRADE_GPA = ["High Distinction", "Distinction", "Credit", "Pass", "Near Pass"];
export const GRADE_GPA_PERCENTAGE = ["(85-100%)", "(75-84%)", "(65-74%)", "(50-64%)", "(40-49%)"];
export const ENGLISH_TEST = ["IELTS", "PTE Academic", "TOEFL (paper based)", "TOEFL (internet based)"];
export const ENGLISH_TEST_SCORES = {
    "IELTS": {
        min: 0,
        max: 9
    },
    "PTE Academic": {
        min: 10,
        max: 90
    },
    "TOEFL (paper based)": {
        min: 310,
        max: 677
    },
    "TOEFL (internet based)": {
        min: 0,
        max: 120
    },
}