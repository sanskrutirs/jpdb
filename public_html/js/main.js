/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var DBname = 'Project';
var Relname = 'Data';
var connToken = '90933091|-31949318149909881|90951662';

$('#projId').focus();

function saveRec(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getprojIdAsJsonObj(){
    var projId = $('#projId').val();
    var jsonStr ={
        projId: projId
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRec(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#projName').val(record.projName);
    $('#assign').val(record.assign);
    $('#assignDate').val(record.assignDate);
    $('#deadDate').val(record.deadDate);
}

function validateData() {
    var projIdVar = $("#projId").val();
    if (projIdVar === "") {
        alert("Project ID Required Value");
        $("#projId").focus();
        return "";
    }
    var projNameVar = $("#projName").val();
    if (projNameVar === "") {
        alert("Project Name is Required Value");
        $("#projName").focus();
        return "";
    }
    var assignVar = $("#assign").val();
    if (assignVar === "") {
        alert("Assigned to is Required Value");
        $("#assign").focus();
        return "";
    }
    var assignDateVar = $("#assignDate").val();
    if (assignDateVar === "") {
        alert("Assignment Date is Required Value");
        $("#assignDate").focus();
        return "";
    }
    var deadDateVar = $("#deadDate").val();
    if (deadDateVar === "") {
        alert("Deadline is Required Value");
        $("#deadDate").focus();
        return "";
    }
    var jsonStrObj = {
        projId: projIdVar,
        projName: projNameVar,
        assign: assignVar,
        assignDate: assignDateVar,
        deadDate: deadDateVar
    };
    return JSON.stringify(jsonStrObj);
}

function getEmp() {
    var projIdJsonObj = getprojIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, DBname, Relname, projIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $("#projName").focus();

    } else if (resJsonObj.status === 200) {
        $('#projId').prop('disabled', true);
        fillData(resJsonObj);
        
        $('#update').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $("#projName").focus();
    }
}

function resetForm() {
    $("#projId").val("");
    $("#projName").val("");
    $("#assign").val("");
    $("#assignDate").val("");
    $("#deadDate").val("");
    $('#projId').prop('disabled', false);
    $('#save').prop('disabled', true);
    $('#update').prop('disabled', true);
    $('#reset').prop('disabled', true);
    $("#projId").focus();

}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === "") {
        return;
    }
    var putReqStr = createPUTRequest(connToken, jsonStrObj, DBname, Relname);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putReqStr, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#projId').focus();
}

function updateData() {
    $('#update').prop('disabled', true);
    jsonChg = validateData();

    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, DBname, Relname, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#projId').focus();
}