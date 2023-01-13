const express = require('express')
const router = express.Router()
const axios = require('axios');
const path = require('path');

// Add your routes here - above the module.exports line


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
router.post('/sixMonths', function (req, res) {
  var sixMonths = req.session.data['last-six-months']
  if (sixMonths == "Yes") {
    res.redirect('paid-treatment')
  }
  if (sixMonths == "No") {
    res.redirect('kickouts/ineligible-six-months')
  }
  else {
    res.redirect('last-six-months')
  }
})

// Has the patient paid towards the treatment?
router.post(['/paidTreatment', '/paidTreatmentErr'], function (req, res) {
  var paidTreatment = req.session.data['paid-treatment']
  if (paidTreatment == "Yes") {
    res.redirect('paid-treatment-details')
  }
  if (paidTreatment == "No") {
    res.redirect('treatment-start')
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
    res.redirect('treatment-start')
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
    res.redirect('registered-s1')
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
  if (coverAnother == "Yes") {
    res.redirect('kickouts/ineligible-another-cover')
  }
  if (coverAnother == "No") {
    res.redirect('nationality')
  }
  else {
    res.redirect('cover-from-another')
  }
})

router.post('/treatment-country', function (req, res) {

  var Country = require(path.resolve("app/model/country.js"));
  const ReferenceDataService = require(path.resolve("app/service/referenceData.js"));

  // Make this better later
  if(req.session.data['location-picker-1']) {
    var countryName = ReferenceDataService.getCountrynameByCode(req.session.data['location-picker-1']);
    req.session.data['location-picker-1'] = new Country(req.session.data['location-picker-1'], countryName[0].name);
  }

  res.redirect('paid-treatment')
})


// Do you require treatment from additional facilities (1)?

router.post(['/additionalFacilityOne', '/additionalFacilityOneErr'], function (req, res) {
  var additionalFacilityOne = req.session.data['additional-facility']
  if (additionalFacilityOne == "Yes") {
    res.redirect('treatment-start-2')
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
    res.redirect('treatment-start-3')
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
  var firstName = req.session.data['patient-firstname']
  var lastName = req.session.data['patient-lastname']
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

// What is your date of birth?

router.post(['/data-capture/dateBirth', '/data-capture/dateBirthErr'], function (req, res) {
  var dateBirth = req.session.data['example']
  console.log(dateBirth);
  if (dateBirth == '') {
    res.redirect('dob-error')
  }
  else {
    res.redirect('know-ohs')
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

// // Do you require treatment from additional facilities?

// var treatmentFacilities = [];

// router.post('/treatment-facility-details', function (req, res) {

//   var Treatment = require(path.resolve("app/model/treatment.js"));

//   if(req.session.data['treatment-name'] && req.session.data['treatment-email']) {
//     var treatment1 = new Treatment(req.session.data['treatment-name'], req.session.data['treatment-email']);
//     treatmentFacilities.push(treatment1);
//   }

//   res.redirect('additional-facility')
// })
// router.get('/additional-facility', function (req, res) {

//   res.render(__dirname + '/additional-facility', {treatmentFacilities: treatmentFacilities});
// })

// // Do you require treatment from additional facilities?
// router.post('/additionalTreatment', function (req, res) {

//   var additionalTreatment = req.session.data['additional-facility']
//   if (additionalTreatment == "Yes") {
//     res.redirect('treatment-facility-details')
//   }
//   if (additionalTreatment == "No") {
//     res.redirect('ordinarily-live')
//   }
//   else {
//     res.redirect('additional-facility')
//   }
// })
// router.get('/cya', function (req, res) {
//   const ReferenceDataService = require(path.resolve("app/service/referenceData.js"));

//   var countryList = ReferenceDataService.getCountries();

//   res.render(__dirname + '/cya', {treatmentFacilities: treatmentFacilities, countryList: countryList});
// })


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

// What is the patient's name?

router.post(['/data-capture/fullName', '/data-capture/fullNameErr', '/data-capture/firstNameErr', '/data-capture/lastNameErr'], function (req, res) {
  var firstName = req.session.data['patient-firstname']
  var lastName = req.session.data['patient-lastname']
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

// Do you know your OHS reference number?
router.post(['/data-capture/knowOhs', '/data-capture/knowOhsErr'], function (req, res) {
  var knowOhs = req.session.data['patient-know-ohs']
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
  var knowNino = req.session.data['patient-know-nino']
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

// What is the patient's home address (lookup)?

router.post(['/data-capture/addressLookup', '/data-capture/addressLookupErr'], function (req, res) {
  var addressLookup = req.session.data['address-lookup']
  if (addressLookup == '') {
    res.redirect('address-lookup-error')
  }
  else {
    res.redirect('address-list')
  }
})

// What is the patient's home address (list)?

router.post(['/data-capture/addressList', '/data-capture/addressListErr'], function (req, res) {
  var addressList = req.session.data['select-1']
  if (addressList == '') {
    res.redirect('address-list-error')
  }
  else {
    res.redirect('phone-number')
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
// router.post('/data-capture/child/knowNino', function (req, res) {
//   var knowNino = req.session.data['child-know-nino']
//   if (knowNino == "Yes") {
//     res.redirect('nino')
//   }
//   if (knowNino == "No") {
//     res.redirect('same-address')
//   }
//   else {
//     res.redirect('know-nino')
//   }
// })

// Does [child] live with you?
// router.post('/data-capture/child/childAddress', function (req, res) {
//   var childAddress = req.session.data['child-address']
//   if (childAddress == "Yes") {
//     res.redirect('../cya')
//   }
//   if (childAddress == "No") {
//     res.redirect('address-lookup')
//   }
//   else {
//     res.redirect('same-address')
//   }
// })

// router.get('/treatment-start', function (req, res) {
//   let today = new Date();

//   let date = today.getDate();
//   let month = today.getMonth() + 1;
//   let year = today.getFullYear();

//   let todayDate = date + " / " + month + " / " + year;

//   res.render(__dirname + '/treatment-start', {todayDate: todayDate});
// })

// router.get('/treatment-start-error', function (req, res) {
//   let today = new Date();

//   let date = today.getDate();
//   let month = today.getMonth() + 1;
//   let year = today.getFullYear();

//   let todayDate = date + " / " + month + " / " + year;

//   res.render(__dirname + '/treatment-start-error', {todayDate: todayDate});
// })

// router.get('/treatment-start-future-error', function (req, res) {
//   let today = new Date();

//   let date = today.getDate();
//   let month = today.getMonth() + 1;
//   let year = today.getFullYear();

//   let todayDate = date + " / " + month + " / " + year;

//   res.render(__dirname + '/treatment-start-future-error', {todayDate: todayDate});
// })

// router.get('/treatment-start-invalid-error', function (req, res) {
//   let today = new Date();

//   let date = today.getDate();
//   let month = today.getMonth() + 1;
//   let year = today.getFullYear();

//   let todayDate = date + " / " + month + " / " + year;

//   res.render(__dirname + '/treatment-start-invalid-error', {todayDate: todayDate});
// })

// router.get('/treatment-start-date-error', function (req, res) {
//   let today = new Date();

//   let date = today.getDate();
//   let month = today.getMonth() + 1;
//   let year = today.getFullYear();

//   let todayDate = date + " / " + month + " / " + year;

//   res.render(__dirname + '/treatment-start-date-error', {todayDate: todayDate});
// })

// Check if string contains number
// const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
// const regex = /[A-Z]/g;
// const found = paragraph.match(regex);

  //Example of implementing
  // var matches = val.match(/\d+/g);
  // if (matches != null) {
  //     alert('number');
  // }

//Check if value is numeric
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//Check if string has numbers
function hasNumber(myString) {
  return /\d/.test(myString);
}

  //Example of implementing
  //var val = $('yourinputelement').val();
  //if(isNumeric(val)) { alert('number'); } 
  //else { alert('not number'); }

router.post(['/treatmentStart', '/treatmentStartErr','/treatmentStartDateErr', '/treatmentStartDayErr', '/treatmentStartDayMonthErr', '/treatmentStartDayYearErr','/treatmentStartMonthErr', '/treatmentStartMonthYearErr', '/treatmentStartYearErr', '/treatmentStartErr', '/treatmentStartFutureErr', '/treatmentStartInvalidErr'], function (req, res) {
  var treatmentStart = req.session.data['start-date'];
  var chooseDay = req.session.data['choose-start-date-day'];
  var chooseMonth = req.session.data['choose-start-date-month'];
  var chooseYear = req.session.data['choose-start-date-year'];
  
  var yearReg = /^(202[1-3])$/;            ///< Allows a number between 2021 and 2022
  var monthReg = /^([1-9]|1[0-2])$/;               ///< Allows a number between 00 and 12
  var dayReg = /^([1-9]|1[0-9]|2[0-9]|3[0-1])$/;   ///< Allows a number between 00 and 31
  
  // console.log(`The treatment start value is: ${treatmentStart}`);
  
  //Today's date
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; 
  const dd = today.getDate();
  const formattedToday = dd + '/' + mm + '/' + yyyy;
  // console.log(`The date for today's is: ${formattedToday}`);
  var lastRunStartToday = new Date(formattedToday.split('/')[2], formattedToday.split('/')[1] - 1, formattedToday.split('/')[0]);
  // console.log(`The formatted date for today is: ${lastRunStartToday}`);
  
  //User input treatment start date
  const date = chooseDay + '/' + chooseMonth + '/' + chooseYear;
  // console.log(`The input date for treatment start is: ${date}`);
  var lastRunStartDate = new Date(date.split('/')[2], date.split('/')[1] - 1, date.split('/')[0]);
  // console.log(`The formatted input date for treatment start is: ${lastRunStartDate}`);
  
  if (treatmentStart == 'todayDate') {
    res.redirect('treatment-facility-name')
  }
  else if (treatmentStart == 'text' && dayReg.test(chooseDay) && monthReg.test(chooseMonth) && yearReg.test(chooseYear) && lastRunStartDate < lastRunStartToday) {
    res.redirect('treatment-facility-name')
  }
  else if (treatmentStart == 'text' && dayReg.test(chooseDay) && monthReg.test(chooseMonth) && yearReg.test(chooseYear) && lastRunStartDate > lastRunStartToday) {
    res.redirect('treatment-start-date-future-error')
  }
  else if (treatmentStart == 'text' && (!dayReg.test(chooseDay) || !monthReg.test(chooseMonth) || !yearReg.test(chooseYear))) {
    res.redirect('treatment-start-date-invalid-error')
  }
  else if (treatmentStart == 'text' && chooseDay == '' && monthReg.test(chooseMonth) && yearReg.test(chooseYear)) {
    res.redirect('treatment-start-date-day-error')
  }
  else if (treatmentStart == 'text' && chooseDay == '' && monthReg.test(chooseMonth) && chooseYear == '') {
    res.redirect('treatment-start-date-day-year-error')
  }
  else if (treatmentStart == 'text' && dayReg.test(chooseDay) && chooseMonth == '' && yearReg.test(chooseYear)) {
    res.redirect('treatment-start-date-month-error')
  }   
  else if (treatmentStart == 'text' && chooseDay == '' && chooseMonth == '' && yearReg.test(chooseYear)) {
    res.redirect('treatment-start-date-day-month-error')
  } 
  else if (treatmentStart == 'text' && dayReg.test(chooseDay) && chooseMonth == '' && chooseYear == '') {
    res.redirect('treatment-start-date-month-year-error')
  } 
  else if (treatmentStart == 'text' && dayReg.test(chooseDay) && monthReg.test(chooseMonth) && chooseYear == '') {
    res.redirect('treatment-start-date-year-error')
  } 
  else if (treatmentStart == 'text' && chooseDay == '' && chooseMonth == '' && chooseYear == '') {
    res.redirect('treatment-start-date-error')
  }
  else {
    res.redirect('treatment-start-error')
  }
})

// What is your date of birth?

router.post(['/data-capture/dateBirth', '/data-capture/dateBirthErr', '/data-capture/dateBirthInvalid', '/data-capture/dateBirthDayErr', '/data-capture/dateBirthDayYearErr', '/data-capture/dateBirthFutureErr', '/data-capture/dateBirthInvalidErr', '/data-capture/dateBirthMonthErr', '/data-capture/dateBirthMonthYearErr', '/data-capture/dateBirthYearErr'], function (req, res) {
  var birthDay = req.session.data['patient-day']
  var birthMonth = req.session.data['patient-month']
  var birthYear = req.session.data['patient-year']

  var yearReg = /^([1900-2023])$/;            ///< Allows a number between 1900 and 2023
  var monthReg = /^([1-9]|1[0-2])$/;               ///< Allows a number between 00 and 12
  var dayReg = /^([1-9]|1[0-9]|2[0-9]|3[0-1])$/;   ///< Allows a number between 00 and 31

  // console.log(`Day: ${birthDay}, month: ${birthMonth}, year: ${birthYear}.`);

  //Today's date
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; 
  const dd = today.getDate();
  const formattedToday = dd + '/' + mm + '/' + yyyy;
  // console.log(`The date for today is: ${formattedToday}`);
  var lastRunStartToday = new Date(formattedToday.split('/')[2], formattedToday.split('/')[1] - 1, formattedToday.split('/')[0]);
  // console.log(`The formatted date for today is: ${lastRunStartToday}`);

  //User input DOB
  const dob = birthDay + '/' + birthMonth + '/' + birthYear;
  // console.log(`The input date for DOB is: ${dob}`);
  var lastRunStartDob = new Date(dob.split('/')[2], dob.split('/')[1] - 1, dob.split('/')[0]);
  // console.log(`The formatted input date for DOB is: ${lastRunStartDob}`);

  if (dayReg.test(birthDay) && monthReg.test(birthMonth) && yearReg.test(birthYear) && lastRunStartDob < lastRunStartToday) {
    res.redirect('know-ohs')
  }
  else if ( dayReg.test(birthDay) && monthReg.test(birthMonth) && yearReg.test(birthYear) && lastRunStartDob > lastRunStartToday) {
    res.redirect('dob-future-error')
  }
  else if (!dayReg.test(birthDay) || !monthReg.test(birthMonth) || !yearReg.test(birthYear)) {
    res.redirect('dob-invalid')
  }
  else if (birthDay == '' && monthReg.test(birthMonth) && yearReg.test(birthYear)) {
    res.redirect('dob-day-error')
  }
  else if (birthDay == '' && monthReg.test(birthMonth) && birthYear == '') {
    res.redirect('dob-day-year-error')
  }
  else if (dayReg.test(birthDay) && birthMonth == '' && yearReg.test(birthYear)) {
    res.redirect('dob-month-error')
  }   
  else if (birthDay == '' && birthMonth == '' && yearReg.test(birthYear)) {
    res.redirect('dob-day-month-error')
  } 
  else if (dayReg.test(birthDay) && birthMonth == '' && birthYear == '') {
    res.redirect('dob-month-year-error')
  } 
  else if (dayReg.test(birthDay) && monthReg.test(birthMonth) && birthYear == '') {
    res.redirect('dob-year-error')
  } 
  else if (birthDay == '' && birthMonth == '' && birthYear == '') {
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
router.post(['/treatmentFacilityEmail', '/treatmentFacilityEmailErr', '/treatmentFacilityEmailInvalid'], function (req, res) {
  var treatmentFacilityEmail = req.session.data['treatment-facility-email']
  const emailRegEx = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  
  if (treatmentFacilityEmail == '') {
    res.redirect('treatment-facility-email-error')
  }
  else if (treatmentFacilityEmail != '' && !emailRegEx.test(treatmentFacilityEmail)) {
    res.redirect('treatment-facility-email-invalid')
  }
  else {
    res.redirect('additional-facility')
  }
})


// What is the email address of the hospital, clinic, or treatment facility 2?
router.post(['/treatmentFacilityEmailTwo', '/treatmentFacilityEmailTwoErr', '/treatmentFacilityEmailTwoInvalid'], function (req, res) {
  var treatmentFacilityEmailTwo = req.session.data['treatment-facility-email-2']
  const emailRegEx = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  if (treatmentFacilityEmailTwo == '') {
    res.redirect('treatment-facility-email-2-error')
  }
  else if (treatmentFacilityEmailTwo != '' && !emailRegEx.test(treatmentFacilityEmailTwo)) {
    res.redirect('treatment-facility-email-2-invalid')
  }
  else {
    res.redirect('additional-facility-2')
  }
})

// What is the email address of the hospital, clinic, or treatment facility 3?
router.post(['/treatmentFacilityEmailThree', '/treatmentFacilityEmailThreeErr', '/treatmentFacilityEmailThreeInvalid'], function (req, res) {
  var treatmentFacilityEmailThree = req.session.data['treatment-facility-email-3']
  const emailRegEx = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  if (treatmentFacilityEmailThree == '') {
    res.redirect('treatment-facility-email-3-error')
  }
  else if (treatmentFacilityEmailThree != '' && !emailRegEx.test(treatmentFacilityEmailThree)) {
    res.redirect('treatment-facility-email-3-invalid')
  }
  else {
    res.redirect('additional-facility-3')
  }
})

//What is your email address?
router.post(['/data-capture/emailAddress', '/data-capture/emailAddressErr', '/data-capture/emailAddressInvalid'], function (req, res) {
  var emailAddress = req.session.data['email-address']
  const emailRegEx = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  if (emailAddress == '') {
    res.redirect('email-address-error')
  }
  else if (emailAddress != '' && !emailRegEx.test(emailAddress)) {
    res.redirect('email-address-invalid')
  }
  else {
    res.redirect('../cya')
  }
})

// Check your answers //
router.get(/cya/, function (req,res){
  const ReferenceDataService = require(path.resolve("app/service/referenceData.js"));
  var countryList = ReferenceDataService.getCountries();
  res.render(__dirname + '/cya', {treatmentFacilities: treatmentFacilities, countryList: countryList});

  var startDate = req.session.data['start-date'];
  // console.log(`This is the start date: ${startDate}`);

  var startDay = req.session.data['choose-start-date-day'];
  var startMonth = req.session.data['choose-start-date-month'];
  var startYear = req.session.data['choose-start-date-year'];

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  if (startDate == 'text') {
    const d = new Date(startMonth);
    var startDateFormatted = startDay + ' ' + monthNames[d.getMonth()] + ' ' + startYear;
    // console.log(`This is the formatted choose-start-date: ${startDateFormatted}`);

    res.render(__dirname + '/cya', {startDateFormatted: startDateFormatted});
  } 
  
  if (startDate == 'todayDate') {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    
    const m = new Date(month);
    let todayDateFormatted = day + ' ' +  monthNames[m.getMonth()] + ' ' + year;
    // console.log(`This is the formatted date of today: ${todayDateFormatted}`);

    res.render(__dirname + '/cya', {todayDateFormatted: todayDateFormatted});
  }

});

// Treatment facility details dates //
router.get(/treatment-facility-details/, function (req,res){
  var startDate = req.session.data['start-date'];
  // console.log(`This is the start date: ${startDate}`);

  var startDay = req.session.data['choose-start-date-day'];
  var startMonth = req.session.data['choose-start-date-month'];
  var startYear = req.session.data['choose-start-date-year'];

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  if (startDate == 'text') {
    const d = new Date(startMonth);
    var startDateFormatted = startDay + ' ' + monthNames[d.getMonth()] + ' ' + startYear;
    // console.log(`This is the formatted choose-start-date: ${startDateFormatted}`);

    res.render(__dirname + '/treatment-facility-details', {startDateFormatted: startDateFormatted});
  } 
  
  if (startDate == 'todayDate'){
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    
    const m = new Date(month);
    let todayDateFormatted = day + ' ' +  monthNames[m.getMonth()] + ' ' + year;
    // console.log(`This is the formatted date of today: ${todayDateFormatted}`);

    res.render(__dirname + '/treatment-facility-details', {todayDateFormatted: todayDateFormatted});
  }
});

router.get(/treatment-facility-details-2/, function (req,res){
  var startDate = req.session.data['start-date'];
  // console.log(`This is the start date: ${startDate}`);

  var startDay = req.session.data['choose-start-date-day'];
  var startMonth = req.session.data['choose-start-date-month'];
  var startYear = req.session.data['choose-start-date-year'];

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  if (startDate == 'text') {
    const d = new Date(startMonth);
    var startDateFormatted = startDay + ' ' + monthNames[d.getMonth()] + ' ' + startYear;
    // console.log(`This is the formatted choose-start-date: ${startDateFormatted}`);

    res.render(__dirname + '/treatment-facility-details-2', {startDateFormatted: startDateFormatted});
  } 
  
  if (startDate == 'todayDate') {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    
    const m = new Date(month);
    let todayDateFormatted = day + ' ' +  monthNames[m.getMonth()] + ' ' + year;
    // console.log(`This is the formatted date of today: ${todayDateFormatted}`);

    res.render(__dirname + '/treatment-facility-details-2', {todayDateFormatted: todayDateFormatted});
  }
});

router.get(/treatment-facility-details-3/, function (req,res){
  var startDate = req.session.data['start-date'];
  // console.log(`This is the start date: ${startDate}`);

  var startDay = req.session.data['choose-start-date-day'];
  var startMonth = req.session.data['choose-start-date-month'];
  var startYear = req.session.data['choose-start-date-year'];

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  if (startDate == 'text') {
    const d = new Date(startMonth);
    var startDateFormatted = startDay + ' ' + monthNames[d.getMonth()] + ' ' + startYear;
    // console.log(`This is the formatted choose-start-date: ${startDateFormatted}`);

    res.render(__dirname + '/treatment-facility-details-3', {startDateFormatted: startDateFormatted});
  } 
  
  if (startDate == 'todayDate'){
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    
    const m = new Date(month);
    let todayDateFormatted = day + ' ' +  monthNames[m.getMonth()] + ' ' + year;
    // console.log(`This is the formatted date of today: ${todayDateFormatted}`);

    res.render(__dirname + '/treatment-facility-details-3', {todayDateFormatted: todayDateFormatted});
  }
});

module.exports = router
