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


// Have you paid towards the treatment?
router.post('/paidTreatment', function (req, res) {
  var paidTreatment = req.session.data['paid-treatment']
  if (paidTreatment == "Yes") {
    // res.redirect('kickouts/ineligible-paid')
    res.redirect('paid-treatment-details')
  }
  if (paidTreatment == "No") {
    res.redirect('treatment-facility-name')
  }
  else {
    res.redirect('paid-treatment')
  }
})

// Co-payment
router.post('/coPayment', function (req, res) {
  var coPayment = req.session.data['co-payment']
  if (coPayment == "Yes") {
    res.redirect('kickouts/ineligible-paid')
  }
  if (coPayment == "No") {
    res.redirect('treatment-facility-name-1')
  }
  else {
    res.redirect('paid-treatment-details')
  }
})

// Where do you ordinarily live?
router.post('/ordinaryResidence', function (req, res) {
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
    res.redirect('ordinarily-live')
  }
})

// Do you have healthcare cover from another country??
router.post('/coverAnother', function (req, res) {
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

  res.render(__dirname + '/receiving-treatment');
})

var treatmentFacilities = [];
// Do you require treatment from additional facilities?
router.post('/additionalTreatment', function (req, res) {

  var Treatment = require(path.resolve("app/model/treatment.js"));

  if(req.session.data['treatment-name'] && req.session.data['treatment-email']) {
    var treatment1 = new Treatment(req.session.data['treatment-name'], req.session.data['treatment-email']);
    treatmentFacilities.push(treatment1);
  }

  var additionalTreatment = req.session.data['additional-facility']
  if (additionalTreatment == "Yes") {
    res.redirect('treatment-facility-name')
  }
  if (additionalTreatment == "No") {
    res.redirect('treatment-start')
  }
  else {
    res.redirect('additional-facility')
  }
})
router.get('/cya', function (req, res) {
  const ReferenceDataService = require(path.resolve("app/service/referenceData.js"));

  res.render(__dirname + '/cya', {treatmentFacilities: treatmentFacilities});
})

// Do you require treatment from additional facilities? 2
router.post('/secondAdditionalTreatment', function (req, res) {
  var additionalTreatment = req.session.data['additional-facility-2']
  if (additionalTreatment == "Yes") {
    res.redirect('treatment-facility-name-2')
  }
  if (additionalTreatment == "No") {
    res.redirect('treatment-start')
  }
  else {
    res.redirect('additional-facility-2')
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
router.post('/data-capture/knowOhs', function (req, res) {
  var knowOhs = req.session.data['patient-know-ohs']
  if (knowOhs == "Yes") {
    res.redirect('ohs')
  }
  if (knowOhs == "No") {
    res.redirect('know-nino')
  }
  else {
    res.redirect('know-ohs')
  }
})

// Do you know your National Insurance number?
router.post('/data-capture/knowNino', function (req, res) {
  var knowNino = req.session.data['patient-know-nino']
  if (knowNino == "Yes") {
    res.redirect('nino')
  }
  if (knowNino == "No") {
    res.redirect('address-lookup')
  }
  else {
    res.redirect('know-nino')
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

router.get('/treatment-start', function (req, res) {
  let today = new Date();

  let date = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  let todayDate = date + "/" + month + "/" + year;

  res.render(__dirname + '/treatment-start', {todayDate: todayDate});
})

module.exports = router