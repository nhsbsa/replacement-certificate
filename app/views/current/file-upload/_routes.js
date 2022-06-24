const express = require('express')
const router = express.Router()

const axios = require('axios');

// Add your routes here - above the module.exports line


// Do you live in the UK? - uk-address.html
router.post('/ukAddress', function (req, res) {
  var ukAddress = req.session.data['uk-address']
  if (ukAddress == "yes") {
    res.redirect('address-lookup')
  }
  else if (ukAddress == "no") {
    res.redirect('address-eu')
  }
  else {
    res.redirect('uk-address')
  }
})

// Do you have the evidence requested for [Name]? - evidence.html
router.post('/evidenceYN', function (req, res) {
  var evidenceYN = req.session.data['evidence-yn']
  if (evidenceYN == "Yes") {
    res.redirect('upload-res-uk')
  }
  else if (evidenceYN == "No") {
    res.redirect('additional-info')
  }
  else {
    res.redirect('evidence')
  }
})

// Do you need to provide evidence of your right to reside in the UK? - provide-rtr-evid.html
// router.post('/provideRTR', function (req, res) {
//   var provideRTR = req.session.data['provide-RTR']
//   if (provideRTR == "yes") {
//     res.redirect('evidence-type')
//   }
//   else if (provideRTR == "no") {
//     res.redirect('provide-res-uk-evid')
//   }
//   else {
//     res.redirect('provide-rtr-evid')
//   }
// })

// What kind of evidence would you like to provide? - evidence-type.html
router.post('/evidenceType', function (req, res) {
  var evidenceType = req.session.data['evidence-type']
  if (evidenceType == "sharecode") {
    res.redirect('share-code')
  }
  else if (evidenceType == "document") {
    res.redirect('upload-reside')
  }
  else {
    res.redirect('evidence-type')
  }
})

// Do you need to provide evidence of your right to reside in the UK? - provide-rtr-evid.html
router.post('/provideDual', function (req, res) {
  var provideDual = req.session.data['provide-dual']
  if (provideDual == "yes") {
    res.redirect('dual-nationality-info')
  }
  else if (provideDual == "no") {
    res.redirect('provide-res-uk-evid')
  }
  else {
    res.redirect('provide-dual-nationality')
  }
})

// Do you need to provide evidence of your UK residency? - provide-res-uk-evid.html
router.post('/provideUkRes', function (req, res) {
  var provideUkRes = req.session.data['provide-uk-res']
  if (provideUkRes == "yes") {
    res.redirect('upload-res-uk')
  }
  else if (provideUkRes == "no") {
    res.redirect('provide-student')
  }
  else {
    res.redirect('provide-res-uk-evid')
  }
})



// Has [Name] been asked to provide evidence of their studies abroad? - provide-student.html
router.post('/provideStudent', function (req, res) {
  var provideStudent = req.session.data['provide-student']
  if (provideStudent == "yes") {
    res.redirect('upload-student')
  }
  else if (provideStudent == "no") {
    res.redirect('cya')
  }
  else {
    res.redirect('provide-student')
  }
})


// Do you want to add another? (evidence for Right to Reside in UK) 
// - upload-reside-another.html, upload-reside-another2.html
// router.post('/addEvidRight', function (req, res) {
//   var addEvidRight = req.session.data['add-evid-right']
//   if (addEvidRight == "Yes") {
//     res.redirect('upload-reside2')
//   }
//   else if (addEvidRight == "No") {

//     res.redirect('provide-dual-nationality')
//   }
//   else {
//     res.redirect('upload-reside-another')
//   }
// })

// Do you want to add another? (evidence for UK residency) - 1 file added 
// - upload-res-uk-another.html
// router.post('/addEvidResUKWithError', function (req, res) {
//   var addEvidResUKWithError = req.session.data['add-evid-res-uk']
//   if (addEvidResUKWithError == "Yes") {
//     res.redirect('upload-res-uk2')
//   }
//   else if (addEvidResUKWithError == "No") {
//     res.redirect('upload-res-uk-another-error')
//   }
//   else {
//     res.redirect('upload-res-uk-another')
//   }
// })

// Do you want to add another? (evidence for UK residency) - 1 file added 
// upload-res-uk-another.html
router.post('/addEvidResUK', function (req, res) {
  var addEvidResUK = req.session.data['add-evid-res-uk']
  if (addEvidResUK == "Yes") {
    res.redirect('upload-res-uk2')
  }
  else if (addEvidResUK == "No") {
    res.redirect('additional-info')
  }
  else {
    res.redirect('upload-res-uk-another')
  }
})

// Do you want to add another? (evidence for UK residency) - 2 files added 
// upload-res-uk-another2.html
router.post('/addEvidResUKAnother', function (req, res) {
  var addEvidResUK = req.session.data['add-evid-res-uk-another']
  if (addEvidResUK == "Yes") {
    res.redirect('upload-res-uk2')
  }
  else if (addEvidResUK == "No") {
    res.redirect('additional-info')
  }
  else {
    res.redirect('upload-res-uk-another2')
  }
})

// Do you need to add more evidence for 's study period abroad? 
// - upload-student-another.html, upload-student-another.html
// router.post('/addEvidStudent', function (req, res) {
//   var addEvidStudent = req.session.data['add-evid-student']
//   if (addEvidStudent == "Yes") {
//     res.redirect('upload-student2')
//   }
//   else if (addEvidStudent == "No") {
//     res.redirect('cya')
//   }
//   else {
//     res.redirect('upload-student-another')
//   }
// })

module.exports = router