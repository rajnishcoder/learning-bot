import { PrescriptionHtmlTemplateResponse } from './../models/PrescriptionHtmlTemplateResponse';
import { PatientByIdResponse } from './../models/PatientByIdResponse';
import { PrecriptionByIdResponse } from './../models/PrecriptionByIdResponse';
import { SummaryAllDataResponse } from './../models/SummaryAllDataResponse';
import { OfflineMedicinesResponse } from './../models/OfflineMedicinesResponse';
import { SearchMedicine } from './../models/SearchMedicineResponse';
import { GetSOSModel } from './../models/GetSOSModel';
import { RecommendedMedicineResponse } from './../models/RecommendedMedicineResponse';
import { ClinicByIdResponse } from './../models/ClinicByIdResponse';
import { CustomInvestigationModel } from './../models/CustomInvestigationModel';
import { SnomedSearchResponse } from './../models/SnomedSearchResponse';
import { UpdatePhysician } from './../models/UpdatePhysician';
import { AddNewClinicResponse } from './../models/AddNewClinicResponse';
import { PhysicianPastPrescriptionModel } from './../models/physicianPast-prescription.model';
import { Utils } from './../utils/Utils';
import { ChartResponse } from './../models/ChartResponse';
import { GetPatientSummaryModel } from './../models/GetPatientSummaryModel';
import { PatientLatestPrescriptionResponse } from './../models/PatientLatestPrescriptionResponse';
import { CustomDiagnosis } from './../models/CustomDiagnosis';
import { AddPatientResponse } from './../models/AddPatientResponse';
import { PatientSearchResponse } from './../models/PatientSearchResponse';
import { VitalChartResponse } from './../models/VitalChartResponse';
import { DiagnosisModel } from './../models/DiagnosisResponseModel';
import { GetAllVitalsModel } from './../models/GetAllVitalsModel';
import { StaticCommonMain } from './../models/StaticCommonModel';
import { QueueModelResponse } from './../models/queue.model';
import { HttpRequest, HttpGenericRequest } from '../models/HttpRequest';
import { TaskCode } from '../globals';
import * as global from '../globals';
import { classToPlain, plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { KeyNames } from '../framework/StorageUtil';
import { SpecializationModel, SpecializationModel1 } from '../models/SpecializationModel';
import { QualificationModel, RegisterPhyModel } from '../models/RegistrationResponse';
import { MedUsedCountModel, MedBrandsCountModel } from '../models/MedUsedCountModel';

export class ApiGenerator {

    // queue page
    
    static loadQueueByPhysician(physicianID) {
        const url = global.GET_QUEUE_BY_PHYSICIAN_URL.concat(physicianID);
        const req = new HttpRequest(url);
        req.classTypeValue = QueueModelResponse;
        req.taskCode = TaskCode.PATIENT_QUEUE_CODE;
        req.storageKeyName = KeyNames.QUEUE_LIST_RESPONSE;
        return req;
    }

    static getAllergyDataApi(){
		const url = global.GET_ALLERGY_URL;
		const req = new HttpRequest(url);
        req.classTypeValue = StaticCommonMain;
        req.taskCode = TaskCode.ALLERGY_CODE;
        req.storageKeyName = KeyNames.ALLERGY_DATA_KEY;
        return req;
	}

	static getIllnessDataApi(){
		const url = global.GET_PAST_CURRENT_ILLNESS_URL;
		const req = new HttpRequest(url);
        req.classTypeValue = StaticCommonMain;
        req.taskCode = TaskCode.ILLNESS_CODE;
        req.storageKeyName = KeyNames.ILLNESS_DATA_KEY;
        return req;
	}

	static getSystemReviewDataApi(){
		const url = global.GET_SYSTEM_REVIEWS_URL;
		const req = new HttpRequest(url);
        req.classTypeValue = StaticCommonMain;
        req.taskCode = TaskCode.SYSTEM_REVIEW_CODE;
        req.storageKeyName = KeyNames.SYSTEM_REVIEW_DATA_KEY;        
        return req;
	}
	static getInvestigationDataApi(){
		const url = global.GET_INVESTIGATIONS_URL;
		const req = new HttpRequest(url);
        req.classTypeValue = StaticCommonMain;
        req.taskCode = TaskCode.INVESTIGATION_CODE;
        req.storageKeyName = KeyNames.INVESTIGATION_KEY;        
        return req;
	}
	static getAllVitalsDataApi(){
		const url = global.GET_ALL_VITALS_URL;
		const req = new HttpRequest(url);
        req.classTypeValue = GetAllVitalsModel;
        req.taskCode = TaskCode.ALL_VITAL_CODE;
        req.storageKeyName = KeyNames.VITAL_DATA_KEY;        
        return req;
	}
	static getDaignosisDataApi(){
		const url = global.GET_STATIC_DIAGNOSIS_URL;
		const req = new HttpRequest(url);
        req.classTypeValue = DiagnosisModel;
        req.taskCode = TaskCode.DAIGNOSIS_CODE;
        req.storageKeyName = KeyNames.DAIGNOSIS_DATA_KEY;        
        return req;
	}
	static getChiefCompDataApi(){
		const url = global.GET_CHIEF_COMPLAINTS_URL;
		const req = new HttpRequest(url);
        req.classTypeValue = DiagnosisModel;
        req.taskCode = TaskCode.CHIEF_COMPLAINTS_CODE;
        req.storageKeyName = KeyNames.CHIEF_COMP_DATA_KEY;        
        return req;
	}
	static removePatientQueue(queueId: string){
		const url = global.REMOVE_PATIENT_QUEUE_URL.concat(queueId);
		const req = new HttpRequest(url);
		req.setPatchMethod();
        // req.classTypeValue = QueueModelResponse;
        req.taskCode = TaskCode.REMOVE_PATIENT_QUEUE;
        return req;
	}
	static loadVitalChartApi(patientId: string){
		const url = global.GET_VITAL_CHART_URL.concat(patientId);
		const req = new HttpRequest(url);
        req.classTypeValue = VitalChartResponse;
        req.taskCode = TaskCode.VITAL_CHART_CODE;
        req.storageKeyName = KeyNames.VITAL_CHART_KEY + patientId; 
        return req;
    }
    static getAllRecommendedMedApi( physicianID: string){
		const url = global.GET_ALL_RECOMMENDED_MED_URL + '?physicianId=' + physicianID;
        const req = new HttpRequest(url);
        req.classTypeValue = OfflineMedicinesResponse;
        req.taskCode = TaskCode.RECOMMENDED_MEDICINE;
        req.storageKeyName = KeyNames.RECOMMENDED_ALL_MEDICINE_KEY;
        return req;
    }
    static getHTMLTemplate(physicianId: string, clinicId: string){
		const url = global.GET_HTML_TEMPLATE_URL + 'physicianId=' + physicianId + '&clinicId=' + clinicId;
		const req = new HttpRequest(url);
        req.classTypeValue = PrescriptionHtmlTemplateResponse;
        req.taskCode = TaskCode.PRESCRIPTION_HTML_TEMPLATE_CODE;
        req.storageKeyName = KeyNames.PRESCRIPTION_HTML_TEMPLATE_KEY; 
        return req;
    }

    // to get all summary data
    static getAllSummaryData(patientId: string, physicianId: string){
		const url = global.GET_ALL_SUMMARY_DATA_URL + '?patientId=' + patientId + '&physicianId=' + physicianId;
		const req = new HttpRequest(url);
        req.classTypeValue = SummaryAllDataResponse;
        req.taskCode = TaskCode.GET_ALL_SUMMARY_DATA_CODE;
        req.storageKeyName = KeyNames.GET_ALL_SUMMARY_DATA_KEY + patientId;
        return req;
    }

	// add patient
	static searchPatientApi(patientName: string, patientNumber: number){
		const url = global.SEARCH_PATIENT_BY_NUMBER_MATCH_URL + patientNumber + '&prefix=' + patientName;
		const req = new HttpRequest(url);
        req.classTypeValue = PatientSearchResponse;
        req.taskCode = TaskCode.SEARCH_PATIENT_CODE;
        return req;
	}

	static addPatientToQueueApi(json){
		const url = global.POST_ADD_PATIENT_TO_QUEUE;
		const req = new HttpRequest(url);
		req.params = json;
		req.setPostMethod();
        req.taskCode = TaskCode.ADD_PATIENT_TO_QUEUE;
        return req;
	}
	static addNewPatientApi(json){
		const url = global.POST_ADD_NEW_PATIENT;
		const req = new HttpRequest(url);
		req.params = json;
		req.setPostMethod();
        req.classTypeValue = AddPatientResponse;
        req.taskCode = TaskCode.ADD_NEW_PATIENT;
        return req;
	}
	// custom Diagnosis
	static getCustomDiagnosis(patientId){
		const url = global.GET_CUSTOM_DIAGNOSIS_URL + patientId;
        const req = new HttpRequest(url);
        req.classTypeValue = CustomDiagnosis;
        req.taskCode = TaskCode.CUSTOM_DAIGNOSIS;
        return req;
    }

    // summary page APIs
    static loadPastPrescription(pIDfromRoute: string){
		const url = global.GET_PATIENT_PAST_PRESCRIPTION_URL.concat(pIDfromRoute);
        const req = new HttpRequest(url);
        req.classTypeValue = PhysicianPastPrescriptionModel;
        req.taskCode = TaskCode.PAST_PRESCRIPTION;
        req.storageKeyName = KeyNames.HISTORY_PAST_PRESCRIPTION_KEY + pIDfromRoute;        
        return req;
	}
	static loadPatientSummary(pIDfromRoute: string){
		const url = global.GET_PATIENT_SUMMARY_URL.concat(pIDfromRoute);
        const req = new HttpRequest(url);
        req.classTypeValue = GetPatientSummaryModel;
        req.taskCode = TaskCode.PATIENT_SUMMARY;
        req.storageKeyName = KeyNames.PATIENT_SUMMARY_KEY + pIDfromRoute;        
        return req;
	}
	static loadChartsForWeight(pId: string, vitalId: string){
		const url = global.GET_GROWTH_CHART_URL.concat(vitalId);
		const req = new HttpRequest(url);
		req.classTypeValue = ChartResponse;
        req.taskCode = TaskCode.CHART_FOR_WEIGHT;
        req.storageKeyName = KeyNames.SUMMARY_CHART_FOR_WEIGHT_KEY + pId;        
        return req;
    }
    static loadChartsForHeight(pId: string, vitalId: string){
		const url = global.GET_GROWTH_CHART_URL.concat(vitalId);
		const req = new HttpRequest(url);
		req.classTypeValue = ChartResponse;
        req.taskCode = TaskCode.CHART_FOR_HEIGHT;
        req.storageKeyName = KeyNames.SUMMARY_CHART_FOR_HEIGHT_KEY + pId;        
        return req;
    }
    
    // static getSearchMedicinsDataApi(val){
	// 	const url = global.GET_MED_SEARCH_URL.concat(val);
	// 	const req = new HttpRequest(url);
	// 	req.classTypeValue = ChartResponse;
    //     req.taskCode = TaskCode.SEARCH_MEDICINE;
    //     return req;
    // }
    
    // past prescription Page APIs	
    static loadPhysicianPastPrescription(physicianID: string){
        const url = global.GET_PHYSICIAN_PAST_PRESCRIPTION_URL.concat(physicianID);
        const req = new HttpRequest(url);
        req.classTypeValue = PhysicianPastPrescriptionModel;
        req.taskCode = TaskCode.PHYSICIAN_PAST_PRESCRIPTION;
        return req;
    }

    // todays prescription
    static getTodaysPrescription(){
        const url = global.GET_TODAYS_PRESCRIPTION_URL.concat(Utils.getCurrentDate('DD-MM-YYYY'));
        const req = new HttpRequest(url);
        req.classTypeValue = PhysicianPastPrescriptionModel;
        req.taskCode = TaskCode.TODAYS_PRESCIPTION;
        return req;
    }

    // add new clinic APIs
    static postAddNewClinic(json: any){
		const url = global.POST_ADD_CLINIC_URL;
		const req = new HttpRequest(url);
		req.params = json;
        req.setPostMethod();
        req.classTypeValue = AddNewClinicResponse;
		req.taskCode = TaskCode.POST_ADD_NEW_CLINIC;
        return req;
	}

	static postUpdatePhysician(json: any){
		const url = global.POST_UPDATE_PHYSICIAN_URL;
		const req = new HttpRequest(url);
		req.params = json;
        req.setPostMethod();
        req.classTypeValue = UpdatePhysician;
		req.taskCode = TaskCode.UPDATE_PHYSICIAN;
        return req;
    }
    // physician profile APIs
    

    // setting APIs
    static callChangePinApi(params)
    {
        const req = new HttpRequest(global.PATCH_CHANGE_PIN_URL);
        req.params = params;
        req.setPatchMethod();
		req.taskCode = TaskCode.CHANGE_PIN;
        return req; 
    }

    // static getSettingCustomDiagnosis(patientId){
	// 	const url = global.GET_CUSTOM_DIAGNOSIS_URL + patientId;
    //     const req = new HttpRequest(url);
    //     req.classTypeValue = CustomDiagnosis;
    //     req.taskCode = TaskCode.SETTING_CUSTOM_DAIGNOSIS;
    //     return req;
    // }

       
    static addCustomDiagnosis(json){
        const url = global.POST_CUSTOM_DIAGNOSIS_URL;
        const req = new HttpRequest(url);
        req.params = json;
        req.setPutMethod();
        req.taskCode = TaskCode.ADD_CUSTOM_DAIGNOSIS_CODE;
        return req;
    }
    static getCustomInvestigation(physicianId){
        const url = global.GET_CUSTOM_INVESTIGATION_URL + physicianId;
        const req = new HttpRequest(url);
        req.classTypeValue = CustomInvestigationModel;
        req.taskCode = TaskCode.SETTING_CUSTOM_INVESTIGATION_CODE;
        return req;
    }
    static updateCustomInvestigation(json){
        const url = global.UPDATE_CUSTOM_INVESTIGATION_URL;
        const req = new HttpRequest(url);
        req.params = json;
        req.setPutMethod();
        req.taskCode = TaskCode.UPDATE_CUSTOM_INVESTIGATION_CODE;
        return req;
    }
    static addCustomInvestigation(json){
        const url = global.POST_CUSTOM_INVESTIGATION_URL;
        const req = new HttpRequest(url);
        req.params = json;
        req.setPostMethod();
        req.taskCode = TaskCode.ADD_CUSTOM_INVESTIGATION_CODE;
        return req;
    }
    
    static deleteCustomInvestigation(physicianId){
        const url = global.DELETE_CUSTOM_INVESTIGATION_URL + physicianId;
        const req = new HttpRequest(url);
        req.setDeleteMethod();
        req.taskCode = TaskCode.DELETE_CUSTOM_INVESTIGATION_CODE;
        return req;
    }
    static getAllPhySpecialization() {
        const req = new HttpRequest(global.GET_ALL_PHYSICIAN_SPECIALIZATION_API);
        req.taskCode = TaskCode.GET_ALL_PHYSICIAN_SPECIALIZATION;
        req.classTypeValue = SpecializationModel1;
        return req;
    }
    static getQualificationListResponseApi() {
        const req = new HttpRequest(global.GET_QUALIFICATION_LIST_URL);
        req.classTypeValue = QualificationModel;
        req.taskCode = TaskCode.GET_QUALIFICATION_LIST;
        return req;
    }
    static postAddPhyApi(physicianData) {
        const req = new HttpRequest(global.POST_ADD_PHYSICIAN_URL);
        req.params = physicianData;
        req.setPostMethod();
        req.taskCode = TaskCode.POST_ADD_PHYSICIAN;
        return req;
    }
    static updatePhyQualApi(physicianData) {
        const req = new HttpRequest(global.POST_ADD_PHYSICIAN_URL);
        req.params = physicianData;
        req.setPostMethod();
        req.taskCode = TaskCode.UPDATE_PHY_QUALIFICATION;
        return req;
    }
    static updatePhyDocuments(physicianData) {
        const req = new HttpRequest(global.POST_ADD_PHYSICIAN_URL);
        req.params = physicianData;
        req.setPostMethod();
        req.taskCode = TaskCode.UPDATE_PHY_DOCUMENT;
        return req;
    }
    // for add new prescription
    static snomedSearch(query: string, fieldType: number, physicianId: string){
        const url = global.SNOMED_SEARCH + 'query=' + query + '&fieldType=' + fieldType + '&physicianId=' + physicianId;
        const req = new HttpRequest(url);
        req.classTypeValue = SnomedSearchResponse;
        req.taskCode = TaskCode.SNOMED_SEARCH;
        return req;
    }

    static downloadPhysiciansData(fieldType: number, physicianId: string){
        const url = global.SEARCH_BY_PHYSICIAN + '&fieldType=' + fieldType + '&physicianId=' + physicianId;
        const req = new HttpRequest(url);
        req.classTypeValue = SnomedSearchResponse;
        req.taskCode = TaskCode.SEARCH_BY_PHYSICIAN;
        req.storageKeyName = KeyNames.PHYSICIANS_DATA_KEY + fieldType;
        return req;
    }
    static downloadPhysiciansPrescriptionData(fieldType: number, physicianId: string){
        const url = global.SEARCH_BY_PHYSICIAN_PRES + '&fieldType=' + fieldType + '&physicianId=' + physicianId;
        const req = new HttpRequest(url);
        req.classTypeValue = SnomedSearchResponse;
        req.taskCode = TaskCode.SEARCH_BY_PHYSICIAN_PRES;
        req.storageKeyName = KeyNames.PHYSICIANS_PRES_DATA_KEY + fieldType;
        return req;
    }

    static addNewpLoadPastPrescription(pID: string){
		const url = global.GET_PATIENT_PAST_PRESCRIPTION_URL.concat(pID);
        const req = new HttpRequest(url);
        req.classTypeValue = PhysicianPastPrescriptionModel;
        req.taskCode = TaskCode.ADD_NEW_P_PAST_PRESCRIPTION;
        req.storageKeyName = KeyNames.PAST_PRESCRIPTION_ADD_NEW_P_KEY;
        return req;
    }
    static loadClinicById(clinicId){
		const url = global.GET_CLINIC_BY_ID_URL.concat(clinicId);
		const req = new HttpRequest(url);
        req.classTypeValue = ClinicByIdResponse;
        req.taskCode = TaskCode.GET_CLINIC_BY_ID;
        req.storageKeyName = KeyNames.CLINIC_BY_ID_KEY;
        return req;
    }
    static loadPatientLatestPrescription(patientId: string){
		const url = global.GET_PATIENT_LATEST_PRESCRIPTION_URL.concat(patientId);
		const req = new HttpRequest(url);
        req.classTypeValue = PatientLatestPrescriptionResponse;
        req.taskCode = TaskCode.ADD_NEW_P_PATIENT_LATEST_PRESCRIPTION;
        req.storageKeyName = KeyNames.PATIENT_LATEST_PRESCRIPTION_KEY;
        return req;
    }
    static loadRecommendedMedApi(patientId: string, physicianID: string){
		const url = global.GET_RECOMMENDED_MED_URL.concat(patientId) + '&physicianId=' + physicianID;
        const req = new HttpRequest(url);
        req.classTypeValue = RecommendedMedicineResponse;
        req.taskCode = TaskCode.RECOMMENDED_MEDICINE;
        req.storageKeyName = KeyNames.RECOMMENDED_MEDICINE_KEY;
        return req;
    }
    static getPrescriptionById(prescripId: string){
		const url = global.GET_PRESCRIPTION_BY_ID_URL.concat(prescripId);
		const req = new HttpRequest(url);
        req.classTypeValue = PatientLatestPrescriptionResponse;
        req.taskCode = TaskCode.ADD_NEW_P_GET_PRESCRIPTION_BY_ID_CODE;
        req.storageKeyName = KeyNames.PRESCRIPTION_BY_ID_KEY;
        return req;
    }
    static getSOSAPI(){
		const url = global.GET_SOS_DATA_URL;
		const req = new HttpRequest(url);
        req.classTypeValue = GetSOSModel;
        req.taskCode = TaskCode.GET_SOS_DATA_CODE;
        req.storageKeyName = KeyNames.SOS_DATA_KEY;
        return req;
    }
    static searchMedicinsOnAddNewApi(val: string){
		const url = global.GET_MED_SEARCH_URL.concat(val);
		const req = new HttpRequest(url);
		req.classTypeValue = SearchMedicine;
        req.taskCode = TaskCode.SEARCH_MEDICINE;
        return req;
    }
    static postGeneratePdf(json: any){
		const url = global.POST_GENERATE_PDF_URL;
		const req = new HttpRequest(url);
        req.params = json;
        req.setPostMethod();
        req.taskCode = TaskCode.GENERATE_PDF_CODE;
        return req;
    }
    static postOfflinePrescription(json: any){
		const url = global.POST_OFFLINE_PRESCRIPTION_URL;
		const req = new HttpRequest(url);
        req.params = json;
        req.setPostMethod();
        req.taskCode = TaskCode.GENERATE_PDF_CODE;
        return req;
    }
    
    // prescription view
    static loadPrescriptionViewById(prescriptionId: string){
		const url = global.GET_PRESCRIPTION_BY_ID_URL.concat(prescriptionId);
		const req = new HttpRequest(url);
		req.classTypeValue = PrecriptionByIdResponse;
        req.taskCode = TaskCode.GET_PRESCRIPTION_BY_ID_CODE;
        return req;
    }
    static loadPatientById(patientId: string){
		const url = global.GET_PATIENT_BY_ID_URL.concat(patientId);
		const req = new HttpRequest(url);
		req.classTypeValue = PatientByIdResponse;
        req.taskCode = TaskCode.GET_PATIENT_BY_ID_CODE;
        return req;
	}
    



    static callUploadingImageApi(fd: FormData) {
        const req = new HttpRequest(global.POST_CERTIFICATE_URL);
        req.params = fd;
        req.removeHeader('content-Type');
        req.setPostMethod();
        req.taskCode = TaskCode.POST_CERTIFICATE;
        return req;
    }
    static callUploadingDigitalSignature(fd: FormData) {
        const req = new HttpRequest(global.POST_CERTIFICATE_URL);
        req.params = fd;
        req.removeHeader('content-Type');
        req.setPostMethod();
        req.taskCode = TaskCode.POST_DIGITAL_SIGNATURE;
        return req;
    }
    static getMedicineByUsedCount(phyId) {
        // const fieldType = '&feildType=7';
        const req = new HttpRequest(global.GET_MED_BY_USED_COUNT_API.concat(phyId));
        req.taskCode = TaskCode.GET_MED_BY_USED_COUNT;
        req.storageKeyName = KeyNames.MEDICINES_BY_USED_COUNT_KEY;
        req.classTypeValue = MedUsedCountModel;
        return req;
    }
    static getMedicineByBrandsCount(phyId) {
        // const fieldType = '&feildType=7';
        const req = new HttpRequest(global.GET_MED_BY_BRANDS_COUNT_API.concat(phyId));
        req.taskCode = TaskCode.GET_MED_BY_BRANDS_COUNT;
        req.storageKeyName = KeyNames.MEDICINES_BY_BRANDS_COUNT_KEY;
        req.classTypeValue = MedBrandsCountModel;
        return req;
    }
}
export class JsonParser {
    static parseJson<T>(response: any, type: ClassType<T>): T {
        const parsedResponse = plainToClass(type, response as object);
        return parsedResponse;
    }

    static parseJsonString(response: any, type: ClassType<any>): any {
        const parsedResponse = plainToClass(type, response as object);
        return parsedResponse;
    }

    static parseJsonArray(response: any, type: ClassType<any>): any {
        const parsedResponse = plainToClass(type, response);
        return parsedResponse;
    }

    // static parseResponse(taskCode: TaskCode, response: any) {
    //     switch (taskCode) {
    //         case TaskCode.GET_CITY:
    //             return JsonParser.parseJson<CitiesResponse>(response, CitiesResponse);
    //         case TaskCode.GET_AREAS:
    //             return JsonParser.parseJson<AreaResponse>(response, AreaResponse);
    //     }
    //     return response;
    // }
}
