import { ClinicInfoList } from '../models/PhysicianByIdResponse';
import { PrescriptionHtmlTemplateResponse } from './../models/PrescriptionHtmlTemplateResponse';
import { element } from 'protractor';
import { AddPrescriptionPost } from './../models/AddPrescriptionPostModel';
import { GetSOSModel } from './../models/GetSOSModel';
import { SummaryAllDataResponse } from './../models/SummaryAllDataResponse';
import { OfflineMedicinesResponse } from './../models/OfflineMedicinesResponse';
import { SearchMedicine, SearchMedicineResponse } from './../models/SearchMedicineResponse';
import { SnomedSearchData } from 'app/models/SnomedSearchResponse';
import { SnomedSearchResponse } from './../models/SnomedSearchResponse';
import { PhysicianData } from './../models/LoginModelResponse';
import { LOGIN_DATA } from './../globals';
import { StaticCommonMain } from './../models/StaticCommonModel';
import { DiagnosisModel } from './../models/DiagnosisResponseModel';
import { GetVitalsModel, GetAllVitalsModel } from './../models/GetAllVitalsModel';
import { CustomDiagnosisView } from './../models/CustomDiagnosis';
import { JsonParser } from './ApiGenerator';
import { ClassType } from 'class-transformer/ClassTransformer';
import { classToPlain } from 'class-transformer';
import { QueueModelResponse, QueueModel } from './../models/queue.model';
import { MedUsedCountModel } from '../models/MedUsedCountModel';
import { GetAllPatientResponse } from '../models/PatientDataModel';

export class StorageUtil {
    static setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    static getItem(key: string) {
        return localStorage.getItem(key);
    }

    static convertObjToString(dataObj: any) {
        if (dataObj !== undefined) {
            return JSON.stringify(classToPlain(dataObj));
        } else {
            return null;
        }
    }

    static convertStringToObj(dataString: string, classTypeValue: ClassType<any>) {
        const json = JSON.parse(dataString);
        if (json) {
            return JsonParser.parseJson(json, classTypeValue);
        } else {
            return null;
        }
    }

    static saveJsonObjToLocalStorage(response: any, keyName: string) {
        if (response) {
            const dataString = JSON.stringify(response);
            if (dataString) {
                this.setItem(keyName, dataString);
            }
        }
    }


    static saveObjToLocalStorage(response: any, keyName: string) {
        const dataString = this.convertObjToString(response);
        if (dataString) {
            this.setItem(keyName, dataString);
        }
    }



    static getConvertedObjFromLocalStorage(keyName: string, classTypeValue: ClassType<any>) {
        const dataString = this.getItem(keyName);
        if (dataString) {
            return this.convertStringToObj(dataString, classTypeValue);
        } else {
            return null;
        }
    }

    static clearAll(){
        localStorage.clear();
    }


    static saveQueueList(response: QueueModelResponse) {
        this.saveObjToLocalStorage(response, KeyNames.QUEUE_LIST_RESPONSE);
    }
    static getQueueList() {
        return this.getConvertedObjFromLocalStorage(KeyNames.QUEUE_LIST_RESPONSE, QueueModelResponse);
    }

    // save patient data on click in queue
    static savePatientObj(response: QueueModel){
        this.saveJsonObjToLocalStorage(response, KeyNames.PATIENT_QUEUE_DATA);
    }

    static getPatientObj(){
        return this.getConvertedObjFromLocalStorage(KeyNames.PATIENT_QUEUE_DATA, QueueModel);
    }

    // for custom diagnosis by patient ID
    static saveCustDaignisis(response: CustomDiagnosisView[], patientID: string){
        this.saveJsonObjToLocalStorage(response, KeyNames.CUST_DIAGNOSIS_KEY + patientID);
    }

    static getCustDaignisis(patientID: string){
        return this.getConvertedObjFromLocalStorage(KeyNames.PATIENT_QUEUE_DATA + patientID, CustomDiagnosisView);
    }

    // for vital data
    static getVitalData(): GetAllVitalsModel{
        return this.getConvertedObjFromLocalStorage(KeyNames.VITAL_DATA_KEY, GetAllVitalsModel);
    }

    // for daignosis data
    static getDaignosisData(): DiagnosisModel{
        return this.getConvertedObjFromLocalStorage(KeyNames.DAIGNOSIS_DATA_KEY, DiagnosisModel);
    }

    // for system review data
    static getSystemReviewData(): StaticCommonMain{
        return this.getConvertedObjFromLocalStorage(KeyNames.SYSTEM_REVIEW_DATA_KEY, StaticCommonMain);
    }

    // for Allergy data
    static getAllergyData(): StaticCommonMain{
        return this.getConvertedObjFromLocalStorage(KeyNames.ALLERGY_DATA_KEY, StaticCommonMain);
    }

    // for Illness data
    static getIllnessData(): StaticCommonMain{
        return this.getConvertedObjFromLocalStorage(KeyNames.ILLNESS_DATA_KEY, StaticCommonMain);
    }

    // for Chief Comp data
    static getChiefCompData(): DiagnosisModel{
        return this.getConvertedObjFromLocalStorage(KeyNames.ILLNESS_DATA_KEY, DiagnosisModel);
    }

    // for Login data
    static saveLoginPhysicianData(response: PhysicianData){
        this.saveJsonObjToLocalStorage(response, KeyNames.LOGIN_DETAILS_KEY);        
    }

    static getLoginPhysicianData(): PhysicianData {
        return this.getConvertedObjFromLocalStorage(KeyNames.LOGIN_DETAILS_KEY, PhysicianData);
    }

    // for Investigation data
    static getInvestigationData(): StaticCommonMain{
        return this.getConvertedObjFromLocalStorage(KeyNames.INVESTIGATION_KEY, StaticCommonMain);
    }

    // for physicians data
    static getSnomedPhysicianData(fieldType: number): SnomedSearchResponse{
        return this.getConvertedObjFromLocalStorage(KeyNames.PHYSICIANS_DATA_KEY + fieldType, SnomedSearchResponse);
    }
    static getSnomedPhysicianPresData(fieldType: number): SnomedSearchResponse{
        return this.getConvertedObjFromLocalStorage(KeyNames.PHYSICIANS_PRES_DATA_KEY + fieldType, SnomedSearchResponse);
    }

    static saveSnomedPhysicianData(response: SnomedSearchData[], fieldType: number){
        const mainRes: SnomedSearchResponse = this.getSnomedPhysicianData(fieldType);
        mainRes.data = response;
        this.saveJsonObjToLocalStorage(mainRes, KeyNames.PHYSICIANS_DATA_KEY + fieldType);
    }

    // prescription id for PDF
    static getPrescriptIdForPDF(queueId: string){
        return this.getConvertedObjFromLocalStorage(KeyNames.PDF_KEY + queueId, String);
    } 

    static savePrescriptIdForPDF(queueId: string, prescriptionId: string){
        this.saveJsonObjToLocalStorage(prescriptionId, KeyNames.PDF_KEY + queueId);        
    }

    // for medicine data
    static getSearchMedicineData(): SearchMedicine[]{
        return this.getConvertedObjFromLocalStorage(KeyNames.RECOMMENDED_ALL_MEDICINE_KEY, OfflineMedicinesResponse).data;
    }
    static getMedicineByUsedCount() {
        return this.getConvertedObjFromLocalStorage(KeyNames.MEDICINES_BY_USED_COUNT_KEY, MedUsedCountModel);
    }
    // to get all summary data
    static getAllSummaryData(patientId: string): SummaryAllDataResponse{
        return this.getConvertedObjFromLocalStorage(KeyNames.GET_ALL_SUMMARY_DATA_KEY + patientId, SummaryAllDataResponse);
    }
    static saveAllSummaryData(patientId: string, data: SummaryAllDataResponse) {
        this.saveJsonObjToLocalStorage(data, KeyNames.GET_ALL_SUMMARY_DATA_KEY + patientId);
    }

    // to get current clinic 
    static getCurrentClinicData(): ClinicInfoList{
        return this.getConvertedObjFromLocalStorage(KeyNames.CURRENT_CLINIC_DATA_KEY, ClinicInfoList);
    }
    
    // to get sos data 
    static getSOSData(): GetSOSModel{
        return this.getConvertedObjFromLocalStorage(KeyNames.SOS_DATA_KEY, GetSOSModel);
    }

    // for offline prescription hamdle
    static saveOfflinePrescription(data: AddPrescriptionPost, patientId: string){
        this.saveJsonObjToLocalStorage(data, KeyNames.OFFLINE_PRESCRIPTION_KEY + patientId);        
    }
    static getOfflinePrescription(patientId: string): AddPrescriptionPost{
        return this.getConvertedObjFromLocalStorage(KeyNames.OFFLINE_PRESCRIPTION_KEY + patientId, AddPrescriptionPost);
    }

    static saveOfflinePreStatus(patientId: string){
        let pIdArr = this.getprescriptionStatus();
        if (!pIdArr) {
            pIdArr = [];
        }
        pIdArr.push(patientId); 
        this.saveJsonObjToLocalStorage(pIdArr, KeyNames.OFFLINE_PRESCRIPTION_STATUS_KEY);        
    }
    static clearOfflinePreStatus(){
        const pIdArr = [];
        this.saveJsonObjToLocalStorage(pIdArr, KeyNames.OFFLINE_PRESCRIPTION_STATUS_KEY);
    }
    static getprescriptionStatus(): Array<string>{
        return this.getConvertedObjFromLocalStorage(KeyNames.OFFLINE_PRESCRIPTION_STATUS_KEY, Array);
    }
    static checkSavedPrescription(patientId: string): boolean {
        const arr = this.getprescriptionStatus();
        if (arr) {
            for (const key in arr) {
                const element = arr[key];
                if (element === patientId) {
                    return true;
                }
            }
        }
        return false;
    }
    // for HTML template 
    static getHTMLTemplateData(): PrescriptionHtmlTemplateResponse{
        return this.getConvertedObjFromLocalStorage(KeyNames.PRESCRIPTION_HTML_TEMPLATE_KEY, PrescriptionHtmlTemplateResponse);
    }
    static getAllPatientsList(): GetAllPatientResponse {
        return this.getConvertedObjFromLocalStorage(KeyNames.PATIENTS_BY_CLINIC_ID_KEY, GetAllPatientResponse);
    }
}


export class KeyNames {
    static QUEUE_LIST_RESPONSE = "KeyQueueList";
    static PAST_PRESCRIPTION_DATA = "KeyPastPrescriptionData";
    static CUST_DIAGNOSIS_KEY = "customDiagnosis";
	static PATIENT_QUEUE_DATA = "patientQueueData";
	static INVESTIGATION_KEY = "investigationData";
    static LOGIN_DETAILS_KEY  = "loginDetails";
    static LOGIN_CLINIC_ID_KEY  = "loginClinicId";
    static LOGIN_TOKEN_KEY  = "loginT";
    static CURRENT_CLINIC_DATA_KEY  = "currentClinicData";
    static ALLERGY_DATA_KEY   = "allergyData";
    static ILLNESS_DATA_KEY   = "illnessData";
    static SYSTEM_REVIEW_DATA_KEY = "systemReviewData";
    static VITAL_DATA_KEY     = "vitalData";
    static DAIGNOSIS_DATA_KEY = "daignosisData";
    static CHIEF_COMP_DATA_KEY = "chiefCompData";
    static VITAL_CHART_KEY    = "vitalChart";
    static PHYSICIANS_DATA_KEY = "physiciansData";
    static PHYSICIANS_PRES_DATA_KEY = "physiciansPresData";
    static PDF_KEY = "PDF";
    static PAST_PRESCRIPTION_ADD_NEW_P_KEY = "addNewPastPrescription";
    static CLINIC_BY_ID_KEY = "clinicById";
    static PATIENT_LATEST_PRESCRIPTION_KEY = "patientLatestPrescription";
    static RECOMMENDED_MEDICINE_KEY = "recommendedMedicine";
    static RECOMMENDED_ALL_MEDICINE_KEY = "recommendedAllMedicine";
    static PRESCRIPTION_BY_ID_KEY = "prescriptionById";
    static SOS_DATA_KEY = "SOSData";
    static HISTORY_PAST_PRESCRIPTION_KEY = "historyPastPrescription";
    static PATIENT_SUMMARY_KEY = "patientSummary";
    static SUMMARY_CHART_FOR_WEIGHT_KEY = "summaryChartForWeight";
    static SUMMARY_CHART_FOR_HEIGHT_KEY = "summaryChartForHeight";
    static GET_ALL_SUMMARY_DATA_KEY = "allSummaryData";
    static OFFLINE_PRESCRIPTION_KEY = "offlinePrescription";
    static OFFLINE_PRESCRIPTION_STATUS_KEY = "offlinePrescriptionStatus";
    static PRESCRIPTION_HTML_TEMPLATE_KEY = "prescriptionHTMLTemplate";
    // static PHYSICIAN_PAST_PRESCRIPTION_KEY = "PhysicianPastPrescription";
    static MEDICINES_BY_USED_COUNT_KEY = "medicinebyusedcount";
    static MEDICINES_BY_BRANDS_COUNT_KEY = "medicinebybrandscount";
    static PATIENTS_BY_CLINIC_ID_KEY = "patientsbyclinicid";    
}
