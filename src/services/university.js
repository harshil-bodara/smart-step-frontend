import baseAxios from "./base";

export const getDiscipline = () => baseAxios.get("/getDesciplines");
export const getFilteredUniversities = (data) => baseAxios.post("/getFilteredUniversities", data);
export const getUniversityDetails = (slug) => baseAxios.post("/getUniversityBySlug", { slug: slug });
export const matchUniversityScore = (data) => baseAxios.post("/matchScore", data);
export const getMatchUniversityScore = () => baseAxios.get("/getUserUniversityChecks");
export const randomAgentAssigned = (data) => baseAxios.post("/randomAgentAssigned", data);
export const withdrawAppliedRequest = (data) => baseAxios.post("/withdrawAppliedRequest", data);
export const getAppliedUniversities = () => baseAxios.get("/getUniversityData");
export const sendMessageToAgent = (data) => baseAxios.post("/sendMessageToAgent", data);
export const getAllMessages = () => baseAxios.get("/getAllMessages");