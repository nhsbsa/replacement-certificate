const express = require('express')
const router = express.Router()

const axios = require('axios');

// Add your routes here - above the module.exports line


// Who are you applying for? 
router.post('/applyFor', function (req, res) {
  var applyFor = req.session.data['who-apply-for']
  if (applyFor == "Myself") {
    res.redirect('apply-self/treatment-country')
  }
  else if (applyFor == "Someone else") {
    res.redirect('apply-for-child')
  }
  else {
    res.redirect('who-apply-for-error')
  }
})

// Who are you applying for (error)? 
router.post('/applyForErr', function (req, res) {
  var applyForErr = req.session.data['who-apply-for-error']
  if (applyForErr == "Myself") {
    res.redirect('apply-self/treatment-country')
  }
  else if (applyForErr == "Someone else") {
    res.redirect('apply-for-child')
  }
  else {
    res.redirect('who-apply-for-error')
  }
})

// Are you applying for a child under the age of 18? 
router.post(['/applyForChild', '/applyForChildErr'], function (req, res) {
  var applyForChild = req.session.data['apply-for-child']
  if (applyForChild == "Yes") {
    res.redirect('parent-guardian')
  }
  else if (applyForChild == "No") {
    res.redirect('apply-third-party/treatment-country')
  }
  else {
    res.redirect('apply-for-child-err')
  }
})

// Are you the parent or legal guardian of the child?
router.post(['/parentGuardian', '/parentGuardianErr'], function (req, res) {
  var parentGuardian = req.session.data['parent-guardian']
  if (parentGuardian == "Yes") {
    res.redirect('apply-parent/treatment-country')
  }
  else if (parentGuardian == "No") {
    res.redirect('apply-third-party/treatment-country')
  }
  else {
    res.redirect('parent-guardian-err')
  }
})


module.exports = router