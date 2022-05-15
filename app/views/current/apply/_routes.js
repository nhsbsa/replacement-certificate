const express = require('express')
const router = express.Router()

const axios = require('axios');

// Add your routes here - above the module.exports line


// Left an example route here
// What do you want to do? - new-application.html
// router.post('/newApplication', function (req, res) {
//   var newApplication = req.session.data['new-application']
//   if (newApplication == "new") {
//     res.redirect('apply/where-do-you-live')
//   }
//   else if (newApplication == "replacement") {
//     res.redirect('replacement/next-steps')
//   }
//   else {
//     res.redirect('new-application')
//   }
// })

// Who are you applying for? 
router.post('/applyFor', function (req, res) {
  var applyFor = req.session.data['who-apply-for']
  if (applyFor == "Myself") {
    res.redirect('receiving-treatment')
  }
  else {
    res.redirect('who-apply-for')
  }
})

// Are you receiving medical care at the moment?
router.post('/receivingTreatment', function (req, res) {
  var receivingTreatment = req.session.data['receiving-treatment']
  if (receivingTreatment == "Yes") {
    res.redirect('medically-necessary')
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
    res.redirect('medically-necessary')
  }
  if (sixMonths == "No") {
    res.redirect('ineligible-six-months')
  }
  else {
    res.redirect('last-six-months')
  }
})

// Is the treatment medically necessary?
router.post('/medicallyNecessary', function (req, res) {
  var medicallyNecessary = req.session.data['medically-necessary']
  if (medicallyNecessary == "Yes") {
    res.redirect('state-funded')
  }
  if (medicallyNecessary == "No") {
    res.redirect('ineligible-medically-necessary')
  }
  else {
    res.redirect('medically-necessary')
  }
})

// Is the treatment state-funded?
router.post('/stateFunded', function (req, res) {
  var stateFunded = req.session.data['state-funded']
  if (stateFunded == "Yes") {
    res.redirect('paid-treatment')
  }
  if (stateFunded == "No") {
    res.redirect('ineligible-state-funded')
  }
  else {
    res.redirect('state-funded')
  }
})

// Have you paid towards the treatment?
router.post('/paidTreatment', function (req, res) {
  var paidTreatment = req.session.data['paid-treatment']
  if (paidTreatment == "Yes") {
    res.redirect('ineligible-paid')
  }
  if (paidTreatment == "No") {
    res.redirect('ordinarily-live')
  }
  else {
    res.redirect('paid-treatment')
  }
})

// Where do you ordinarily live?
router.post('/ordinaryResidence', function (req, res) {
  var ordinaryResidence = req.session.data['ordinarily-live']
  if (ordinaryResidence == "UK") {
    res.redirect('nationality')
  }
  if (ordinaryResidence == "EU, EEA or Switzerland") {
    res.redirect('cover-from-another')
  }
  if (ordinaryResidence == "Other") {
    res.redirect('cover-from-another')
  }
  else {
    res.redirect('ordinarily-live')
  }
})

// Do you have healthcare cover from another country??
router.post('/coverAnother', function (req, res) {
  var coverAnother = req.session.data['cover-from-another']
  if (coverAnother == "Yes") {
    res.redirect('ineligible-another-cover')
  }
  if (coverAnother == "No") {
    res.redirect('nationality')
  }
  else {
    res.redirect('cover-from-another')
  }
})

// What is your nationality?
function arraysContainSame(a, b) {
  a = Array.isArray(a) ? a : [];
  b = Array.isArray(b) ? b : [];
  return a.length === b.length && a.every(el => b.includes(el));
}

router.post('/nationality', function (req, res) {

  var nationality = req.session.data['nationality'];
  console.log(nationality);

  if (arraysContainSame(nationality, ['UK', 'Other']) == true) {
    res.redirect('studying-uk-citizen')
  }
  else if (nationality == 'UK') {
    res.redirect('studying-uk-citizen')
  }
  else if (arraysContainSame(nationality, ['UK', 'EU, EEA or Swiss', 'Other']) == true) {
    res.redirect('uk-citizenship')
  }
  else if (arraysContainSame(nationality, ['EU, EEA or Swiss', 'Other']) == true) {
    res.redirect('uk-citizenship')
  }
  else if (nationality == 'EU, EEA or Swiss') {
    res.redirect('uk-citizenship')
  }
  else if (nationality == 'Other') {
    res.redirect('studying-uk-citizen')
  }
  else if (arraysContainSame(nationality, ['UK', 'EU, EEA or Swiss']) == true) {
    res.redirect('birth-country')
  }
  else {
    res.redirect('nationality')
  }
})

// Have you ever held UK citizenship?
router.post('/ukCitizenship', function (req, res) {
  var ukCitizenship = req.session.data['uk-citizenship']
  if (ukCitizenship == "Yes") {
    res.redirect('studying-uk-citizen')
  }
  if (ukCitizenship == "No") {
    res.redirect('birth-country')
  }
  else {
    res.redirect('uk-citizenship')
  }
})

// Were you born in the UK?
router.post('/birthCountry', function (req, res) {
  var birthCountry = req.session.data['birth-country']
  if (birthCountry == "Yes") {
    res.redirect('studying-uk-citizen')
  }
  if (birthCountry == "No") {
    res.redirect('studying-uk-citizen')
  }
  else {
    res.redirect('birth-country')
  }
})

// Are you studying, or do you intend to study in the EU, Norway, Iceland, Liechtenstein or Switzerland?
router.post('/studyingUkCitizen', function (req, res) {
  var studyingUkCitizen = req.session.data['studying-uk-citizen']
  if (studyingUkCitizen == "Yes") {
    res.redirect('ineligible-studying')
  }
  if (studyingUkCitizen == "No") {
    res.redirect('facility-details')
  }
  else {
    res.redirect('studying-uk-citizen')
  }
})

// Do you require treatment from additional facilities?
router.post('/additionalTreatment', function (req, res) {
  var additionalTreatment = req.session.data['additional-facility']
  if (additionalTreatment == "Yes") {
    res.redirect('additional-facility-details')
  }
  if (additionalTreatment == "No") {
    res.redirect('return-date')
  }
  else {
    res.redirect('additional-facility')
  }
})

// Have you lived at this address for the past 2 years?
router.post('/twoYearsAddress', function (req, res) {
  var twoYearsAddress = req.session.data['two-years-address']
  if (twoYearsAddress == "Yes") {
    res.redirect('phone-number')
  }
  if (twoYearsAddress == "No") {
    res.redirect('previous-address')
  }
  else {
    res.redirect('two-years-address')
  }
})

module.exports = router