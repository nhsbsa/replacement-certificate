const express = require('express')
const router = express.Router()
const axios = require('axios');
const path = require('path');

// Add your routes here - above the module.exports line

// Where is your child receiving medical treatment?

router.post(['/treatmentCountry', '/treatmentCountryErr'], function (req, res) {

  var treatmentCountry = req.session.data['location-picker-1'];
  console.log(treatmentCountry);

  if (treatmentCountry == 'Austria' || treatmentCountry == 'Belgium' || treatmentCountry == 'Bulgaria' || treatmentCountry == 'Denmark') {
    res.redirect('paid-treatment')
  }
  if (treatmentCountry == 'Czech Republic' || treatmentCountry == 'Estonia' || treatmentCountry == 'Finland' || treatmentCountry == 'France') {
    res.redirect('paid-treatment')
  }
  if (treatmentCountry == 'Germany' || treatmentCountry == 'Greece' || treatmentCountry == 'Hungary' || treatmentCountry == 'Ireland' || treatmentCountry == 'Italy') {
    res.redirect('paid-treatment')
  }
  if (treatmentCountry == 'Latvia' || treatmentCountry == 'Lithuania' || treatmentCountry == 'Luxemburg' || treatmentCountry == 'Malta' || treatmentCountry == 'Montenegro') {
    res.redirect('paid-treatment')
  }
  if (treatmentCountry == 'Netherlands' || treatmentCountry == 'Poland' || treatmentCountry == 'Portugal' || treatmentCountry == 'Romania' || treatmentCountry == 'Slovakia') {
    res.redirect('paid-treatment')
  }
  if (treatmentCountry == 'Slovenia' || treatmentCountry == 'Spain' || treatmentCountry == 'Sweden' || treatmentCountry == 'Switzerland') {
    res.redirect('paid-treatment')
  }
  if (treatmentCountry == 'Norway' || treatmentCountry == 'Liechtenstein' || treatmentCountry == 'Iceland') {
    res.redirect('kickouts/ineligible-treatment-efta')
  }
  if (treatmentCountry == '') {
    res.redirect('treatment-country-error')
  }
  else {
    res.redirect('kickouts/ineligible-treatment-other')
  }
})

// Are you receiving medical care at the moment?
router.post('/receivingTreatment', function (req, res) {
  var receivingTreatment = req.session.data['receiving-treatment']
  if (receivingTreatment == "Yes") {
    res.redirect('paid-treatment')
  }
  if (receivingTreatment == "No") {
    res.redirect('last-six-months')
  }
  else {
    res.redirect('receiving-treatment')
  }
})

// Have you received treatment in the last 6 months?
// router.post('/sixMonths', function (req, res) {
//   var sixMonths = req.session.data['last-six-months']
//   if (sixMonths == "Yes") {
//     res.redirect('paid-treatment')
//   }
//   if (sixMonths == "No") {
//     res.redirect('kickouts/ineligible-six-months')
//   }
//   else {
//     res.redirect('last-six-months')
//   }
// })

// Have you paid towards the treatment?
router.post(['/paidTreatment', '/paidTreatmentErr'], function (req, res) {
  var paidTreatment = req.session.data['paid-treatment']
  if (paidTreatment == "Yes") {
    res.redirect('paid-treatment-details')
  }
  if (paidTreatment == "No") {
    res.redirect('ordinarily-live')
  }
  else {
    res.redirect('paid-treatment-error')
  }
})

// Co-payment
router.post(['/coPayment', '/coPaymentErr'], function (req, res) {
  var coPayment = req.session.data['co-payment']
  if (coPayment == "Yes") {
    res.redirect('kickouts/ineligible-paid')
  }
  if (coPayment == "No") {
    res.redirect('ordinarily-live')
  }
  else {
    res.redirect('paid-treatment-details-error')
  }
})

// Where do you ordinarily live?
router.post(['/ordinaryResidence', '/ordinaryResidenceErr'], function (req, res) {
  var ordinaryResidence = req.session.data['ordinarily-live']
  if (ordinaryResidence == "UK") {
    res.redirect('cover-from-another')
  }
  if (ordinaryResidence == "EU, Norway, Iceland, Liechtenstein or Switzerland") {
    res.redirect('ineligible-living-efta')
  }
  if (ordinaryResidence == "Other") {
    res.redirect('kickouts/ineligible-living-other')
  }
  else {
    res.redirect('ordinarily-live-error')
  }
})

// Do you have healthcare cover from another country??
router.post(['/coverAnother', '/coverAnotherErr'], function (req, res) {
  var coverAnother = req.session.data['cover-from-another']
  if (coverAnother == "yes") {
    res.redirect('kickouts/ineligible-another-cover')
  }
  if (coverAnother == "no") {
    res.redirect('nationality')
  }
  else {
    res.redirect('cover-from-another-error')
  }
})

// What is your nationality?
function arraysContainSame(a, b) {
  a = Array.isArray(a) ? a : [];
  b = Array.isArray(b) ? b : [];
  return a.length === b.length && a.every(el => b.includes(el));
}

router.post(['/nationality','/nationalityErr', '/nationalityErrEU', '/nationalityErrOther', '/nationalityErrEUOther'], function (req, res) {

  var nationality = req.session.data['nationality'];
  var treatmentCountry = req.session.data['location-picker-1'];
  var nationalityEUErr = req.session.data['myInputsEURT'];
  var nationalityOtherErr = req.session.data['myInputsOther'];

  if (arraysContainSame(nationality, ['UK','EU, EEA', 'Other']) == true && nationalityEUErr == '' && nationalityOtherErr == '') {
    res.redirect('nationality-eu-other-error')
  }
  else if (arraysContainSame(nationality, ['UK','EU, EEA', 'Other']) == true && nationalityEUErr != '' && nationalityOtherErr == '') {
    res.redirect('nationality-eu-error')
  }
  else if (arraysContainSame(nationality, ['UK','EU, EEA', 'Other']) == true && nationalityEUErr == '' && nationalityOtherErr != '') {
    res.redirect('nationality-other-error')
  }
  else if (arraysContainSame(nationality, ['UK', 'EU, EEA', 'Other']) == true) {
    res.redirect('treatment-start')
  }
  else if (arraysContainSame(nationality, ['EU, EEA', 'Other']) == true && nationalityEUErr == '' && nationalityOtherErr == '') {
    res.redirect('nationality-eu-other-error')
  }
  else if (arraysContainSame(nationality, ['EU, EEA', 'Other']) == true && nationalityEUErr != '' && nationalityOtherErr == '') {
    res.redirect('nationality-other-error')
  }
  else if (arraysContainSame(nationality, ['EU, EEA', 'Other']) == true && nationalityEUErr == '' && nationalityOtherErr != '') {
    res.redirect('nationality-eu-error')
  }
  else if (arraysContainSame(nationality, ['EU, EEA', 'Other']) == true) {
    res.redirect('treatment-start')
  }
  else if (arraysContainSame(nationality, ['UK', 'EU, EEA']) == true && nationalityEUErr == '') {
    res.redirect('nationality-eu-error')
  }
  else if (nationality == 'EU, EEA' && nationalityEUErr == '') {
    res.redirect('nationality-eu-error')
  }
  else if (arraysContainSame(nationality, ['UK', 'EU, EEA']) == true) {
    res.redirect('treatment-start')
  }
  else if (nationality == 'EU, EEA') {
    res.redirect('treatment-start')
  }
  else if (arraysContainSame(nationality, ['UK', 'Other']) == true && nationalityOtherErr == '') {
    res.redirect('nationality-other-error')
  }
  else if (arraysContainSame(nationality, ['UK', 'Other']) == true) {
    res.redirect('treatment-start')
  }
  else if (nationality == 'Other' && treatmentCountry == 'Switzerland') {
    res.redirect('kickouts/ineligible-swiss')
  }
  else if (nationality == 'Other' && nationalityOtherErr == '') {
    res.redirect('nationality-other-error')
  }
  else if (nationality == 'Other') {
    res.redirect('treatment-start')
  }
  else if (nationality == 'UK') {
    res.redirect('treatment-start')
  }
  else {
    res.redirect('nationality-error')
  }
})

router.post('/treatment-country', function (req, res) {

  var Country = require(path.resolve("app/model/country.js"));
  const ReferenceDataService = require(path.resolve("app/service/referenceData.js"));

  console.log(req.session.data);

  // Make this better later
  if(req.session.data['location-picker-1']) {
    var countryName = ReferenceDataService.getCountrynameByCode(req.session.data['location-picker-1']);
    req.session.data['location-picker-1'] = new Country(req.session.data['location-picker-1'], countryName[0].name);
  }

  res.redirect('paid-treatment')
})

//

router.get('/treatment-start', function (req, res) {
  let today = new Date();

  let date = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  let todayDate = date + " / " + month + " / " + year;

  res.render(__dirname + '/treatment-start', {todayDate: todayDate});
})

router.get('/treatment-start-error', function (req, res) {
  let today = new Date();

  let date = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  let todayDate = date + " / " + month + " / " + year;

  res.render(__dirname + '/treatment-start-error', {todayDate: todayDate});
})

router.get('/treatment-start-future-error', function (req, res) {
  let today = new Date();

  let date = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  let todayDate = date + " / " + month + " / " + year;

  res.render(__dirname + '/treatment-start-future-error', {todayDate: todayDate});
})

router.get('/treatment-start-invalid-error', function (req, res) {
  let today = new Date();

  let date = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  let todayDate = date + " / " + month + " / " + year;

  res.render(__dirname + '/treatment-start-invalid-error', {todayDate: todayDate});
})

router.get('/treatment-start-date-error', function (req, res) {
  let today = new Date();

  let date = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  let todayDate = date + " / " + month + " / " + year;

  res.render(__dirname + '/treatment-start-date-error', {todayDate: todayDate});
})

//Check if value is numeric
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//Check if string has numbers
function hasNumber(myString) {
  return /\d/.test(myString);
}

router.post(['/treatmentStart', '/treatmentStartErr','/treatmentStartDateErr', '/treatmentStartDayErr', '/treatmentStartDayMonthErr', '/treatmentStartDayYearErr','/treatmentStartMonthErr', '/treatmentStartMonthYearErr', '/treatmentStartYearErr', '/treatmentStartErr', '/treatmentStartFutureErr', '/treatmentStartInvalidErr'], function (req, res) {
  var treatmentStart = req.session.data['start-date'];
  var chooseDay = req.session.data['choose-start-date-day'];
  var chooseMonth = req.session.data['choose-start-date-month'];
  var chooseYear = req.session.data['choose-start-date-year'];

  var yearReg = /^(202[1-2])$/;            ///< Allows a number between 2021 and 2022
  var monthReg = /^(0[1-9]|1[0-2])$/;               ///< Allows a number between 00 and 12
  var dayReg = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;   ///< Allows a number between 00 and 31

  console.log(treatmentStart);
  console.log(isNumeric(chooseDay, chooseMonth, chooseYear));
  console.log(`Day: ${chooseDay}, month: ${chooseMonth}, year: ${chooseYear}.`);

  if (treatmentStart == 'text' && isNumeric(chooseDay, chooseMonth, chooseYear) == true && dayReg.test(chooseDay) && monthReg.test(chooseMonth) && yearReg.test(chooseYear)) {
    res.redirect('treatment-facility-name')
  }
  else if (hasNumber(treatmentStart) == true && isNumeric(chooseDay, chooseMonth, chooseYear) == false) {
    res.redirect('treatment-facility-name')
  }
  else if (treatmentStart == 'text' && !dayReg.test(chooseDay) && monthReg.test(chooseMonth) && yearReg.test(chooseYear)) {
    res.redirect('treatment-start-date-day-error')
  }
  else if (treatmentStart == 'text' && !dayReg.test(chooseDay) && monthReg.test(chooseMonth) && !yearReg.test(chooseYear)) {
    res.redirect('treatment-start-date-day-year-error')
  }
  else if (treatmentStart == 'text' && dayReg.test(chooseDay) && !monthReg.test(chooseMonth) && yearReg.test(chooseYear)) {
    res.redirect('treatment-start-date-month-error')
  }   
  else if (treatmentStart == 'text' && !dayReg.test(chooseDay) && !monthReg.test(chooseMonth) && yearReg.test(chooseYear)) {
    res.redirect('treatment-start-date-day-month-error')
  } 
  else if (treatmentStart == 'text' && dayReg.test(chooseDay) && !monthReg.test(chooseMonth) && !yearReg.test(chooseYear)) {
    res.redirect('treatment-start-date-month-year-error')
  } 
  else if (treatmentStart == 'text' && dayReg.test(chooseDay) && monthReg.test(chooseMonth) && !yearReg.test(chooseYear)) {
    res.redirect('treatment-start-date-year-error')
  } 
  else if (treatmentStart == 'text' && !dayReg.test(chooseDay) && !monthReg.test(chooseMonth) && !yearReg.test(chooseYear)) {
    res.redirect('treatment-start-date-error')
  }
  else {
    res.redirect('treatment-start-error')
  } 
}
  
// What is your date of birth?

router.post(['/data-capture/dateBirth', '/data-capture/dateBirthErr'], function (req, res) {
  var birthDay = req.session.data['patient-day']
  var birthMonth = req.session.data['patient-month']
  var birthYear = req.session.data['patient-year']

  if (isNumeric(birthDay, birthMonth, birthYear) == true) {
    res.redirect('know-ohs')
  }
  else {
    res.redirect('dob-error')
  }
})


// What is the name of the hospital, clinic, or treatment facility?
router.post(['/treatmentFacilityName', '/treatmentFacilityNameErr', '/treatmentFacilityNameNrErr'], function (req, res) {
  var treatmentFacilityName = req.session.data['treatment-facility-name']
  if (treatmentFacilityName == '') {
    res.redirect('treatment-facility-name-error')
  }
  else if (hasNumber(treatmentFacilityName) == true) {
    res.redirect('treatment-facility-name-nr-error')
  }
  else {
    res.redirect('treatment-facility-email')
  }
})

// What is the name of the hospital, clinic, or treatment facility 2?
router.post(['/treatmentFacilityNameTwo', '/treatmentFacilityNameTwoErr', '/treatmentFacilityNameTwoNrErr'], function (req, res) {
  var treatmentFacilityNameTwo = req.session.data['treatment-facility-name-2']
  if (treatmentFacilityNameTwo == '') {
    res.redirect('treatment-facility-name-2-error')
  }
  else if (hasNumber(treatmentFacilityNameTwo) == true) {
    res.redirect('treatment-facility-name-2-nr-error')
  }
  else {
    res.redirect('treatment-facility-email-2')
  }
})

// What is the name of the hospital, clinic, or treatment facility 3?
router.post(['/treatmentFacilityNameThree', '/treatmentFacilityNameThreeErr', '/treatmentFacilityNameThreeNrErr'], function (req, res) {
  var treatmentFacilityNameThree = req.session.data['treatment-facility-name-3']
  if (treatmentFacilityNameThree == '') {
    res.redirect('treatment-facility-name-3-error')
  }
  else if (hasNumber(treatmentFacilityNameThree) == true) {
    res.redirect('treatment-facility-name-3-nr-error')
  }
  else {
    res.redirect('treatment-facility-email-3')
  }
})

// What is the email address of the hospital, clinic, or treatment facility??
router.post('/treatmentFacilityEmail', function (req, res) {
  var treatmentFacilityEmail = req.session.data['treatment-facility-email']
  if (treatmentFacilityEmail == '') {
    res.redirect('treatment-facility-email-error')
  }
  else {
    res.redirect('additional-facility')
  }
})

// What is the email address of the hospital, clinic, or treatment facility (error)?
router.post('/treatmentFacilityEmailErr', function (req, res) {
  var treatmentFacilityEmailErr = req.session.data['treatment-facility-email-error']
  if (treatmentFacilityEmailErr == '') {
    res.redirect('treatment-facility-email-error')
  }
  else {
    res.redirect('additional-facility')
  }
})

// What is the email address of the hospital, clinic, or treatment facility 2?
router.post(['/treatmentFacilityEmailTwo', '/treatmentFacilityEmailTwoErr'], function (req, res) {
  var treatmentFacilityEmailTwo = req.session.data['treatment-facility-email-2']
  if (treatmentFacilityEmailTwo == '') {
    res.redirect('treatment-facility-email-2-error')
  }
  else {
    res.redirect('additional-facility-2')
  }
})

// What is the email address of the hospital, clinic, or treatment facility 3?
router.post(['/treatmentFacilityEmailThree', '/treatmentFacilityEmailThreeErr'], function (req, res) {
  var treatmentFacilityEmailThree = req.session.data['treatment-facility-email-3']
  if (treatmentFacilityEmailThree == '') {
    res.redirect('treatment-facility-email-3-error')
  }
  else {
    res.redirect('additional-facility-3')
  }
})

// Do you require treatment from additional facilities (1)?

router.post(['/additionalFacilityOne', '/additionalFacilityOneErr'], function (req, res) {
  var additionalFacilityOne = req.session.data['additional-facility']
  if (additionalFacilityOne == "Yes") {
    res.redirect('treatment-facility-name-2')
  }
  if (additionalFacilityOne == "No") {
    res.redirect('treatment-facility-details')
  }
  else {
    res.redirect('additional-facility-error')
  }
})

// Do you require treatment from additional facilities (2)?

router.post(['/additionalFacilityTwo', '/additionalFacilityTwoErr'], function (req, res) {
  var additionalFacilityTwo = req.session.data['additional-facility-2']
  if (additionalFacilityTwo == "Yes") {
    res.redirect('treatment-facility-name-3')
  }
  if (additionalFacilityTwo == "No") {
    res.redirect('treatment-facility-details-2')
  }
  else {
    res.redirect('additional-facility-2-error')
  }
})

// Do you require treatment from additional facilities (3)?

router.post(['/additionalFacilityThree', '/additionalFacilityThreeErr'], function (req, res) {
  var additionalFacilityThree = req.session.data['additional-facility-3']
  if (additionalFacilityThree == "Yes") {
    res.redirect('additional-facility-3')
  }
  if (additionalFacilityThree == "No") {
    res.redirect('treatment-facility-details-3')
  }
  else {
    res.redirect('additional-facility-3-error')
  }
})

// What is your name?

router.post(['/data-capture/fullName', '/data-capture/fullNameErr', '/data-capture/firstNameErr', '/data-capture/lastNameErr'], function (req, res) {
  var firstName = req.session.data['parent-firstname']
  var lastName = req.session.data['parent-lastname']
  if (firstName == '' && lastName == '') {
    res.redirect('full-name-error')
  }
  if (firstName == '') {
    res.redirect('first-name-error')
  }
  if (lastName == '') {
    res.redirect('last-name-error')
  }
  else {
    res.redirect('dob')
  }
})

// What is your home address (lookup)?

router.post(['/data-capture/addressLookup', '/data-capture/addressLookupErr'], function (req, res) {
  var addressLookup = req.session.data['address-lookup']
  if (addressLookup == '') {
    res.redirect('address-lookup-error')
  }
  else {
    res.redirect('address-list')
  }
})

// What is your home address (list)?

router.post(['/data-capture/addressList', '/data-capture/addressListErr'], function (req, res) {
  var addressList = req.session.data['select-1']
  if (addressList == '') {
    res.redirect('address-list-error')
  }
  else {
    res.redirect('phone-number')
  }
})

// What is your home address?

router.post(['/data-capture/manualAddress', '/data-capture/manualErr', '/data-capture/manualLineErr', '/data-capture/manualLineTownErr', '/data-capture/manualPostcodeErr', '/data-capture/manualLinePostcodeErr', '/data-capture/manualPostcodeTownErr', '/data-capture/manualTownErr'], function (req, res) {
  var lineOne = req.session.data['address-line-one']
  var townCity = req.session.data['town-city']
  var postcode = req.session.data['postcode']
  if (lineOne == '' && townCity == '' && postcode == '') {
    res.redirect('address-manual-error')
  }
  else if (lineOne == '' && townCity == '') {
    res.redirect('address-manual-line-town-error')
  }
  else if (lineOne == '' && postcode == '') {
    res.redirect('address-manual-postcode-line-error')
  }
  else if (postcode == '' && townCity == '') {
    res.redirect('address-manual-postcode-town-error')
  }
  else if (lineOne == '') {
    res.redirect('address-manual-line-error')
  }
  else if (townCity == '') {
    res.redirect('address-manual-town-error')
  }
  else if (postcode == '') {
    res.redirect('address-manual-postcode-error')
  }
  else {
    res.redirect('phone-number')
  }
})

// What is your email address?

router.post(['/data-capture/emailAddress', '/data-capture/emailAddressErr'], function (req, res) {
  var emailAddress = req.session.data['email-address']

  if (emailAddress == '') {
    res.redirect('email-address-error')
  }
  else {
    res.redirect('info-child')
  }
})


// Do you have a registerd S1?
router.post('/regS1', function (req, res) {
  var regS1 = req.session.data['reg-s1']
  if (regS1 == "Yes") {
    res.redirect('nationality')
  }
  if (regS1 == "No") {
    res.redirect('kickouts/ineligible-reg-s1')
  }
  else {
    res.redirect('registered-s1')
  }
})

// Do you know your OHS reference number?
router.post(['/data-capture/knowOhs', '/data-capture/knowOhsErr'], function (req, res) {
  var knowOhs = req.session.data['parent-know-ohs']
  if (knowOhs == "Yes") {
    res.redirect('ohs')
  }
  if (knowOhs == "No") {
    res.redirect('know-nino')
  }
  else {
    res.redirect('know-ohs-error')
  }
})

// Do you know your National Insurance number?
router.post(['/data-capture/knowNino', '/data-capture/knowNinoErr'], function (req, res) {
  var knowNino = req.session.data['parent-know-nino']
  if (knowNino == "Yes") {
    res.redirect('nino')
  }
  if (knowNino == "No") {
    res.redirect('address-lookup')
  }
  else {
    res.redirect('know-nino-error')
  }
})

// Have you lived at this address for the past 6 months?
router.post('/data-capture/twoYearsAddress', function (req, res) {
  var twoYearsAddress = req.session.data['two-years-address']
  if (twoYearsAddress == "Yes") {
    res.redirect('phone-number')
  }
  if (twoYearsAddress == "No") {
    res.redirect('previous-address-lookup')
  }
  else {
    res.redirect('two-years-address')
  }
})

// Do you know [child]'s National Insurance number?
router.post('/data-capture/child/knowNino', function (req, res) {
  var knowNino = req.session.data['child-know-nino']
  if (knowNino == "Yes") {
    res.redirect('nino')
  }
  if (knowNino == "No") {
    res.redirect('same-address')
  }
  else {
    res.redirect('know-nino')
  }
})

// Does [child] live with you?
router.post('/data-capture/child/childAddress', function (req, res) {
  var childAddress = req.session.data['child-address']
  if (childAddress == "Yes") {
    res.redirect('../../cya')
  }
  if (childAddress == "No") {
    res.redirect('address-lookup')
  }
  else {
    res.redirect('same-address')
  }
})

module.exports = router