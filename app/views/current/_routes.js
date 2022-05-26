const express = require('express')
const router = express.Router()

const axios = require('axios');

// Add your routes here - above the module.exports line


// Who are you applying for? 
router.post('/applyFor', function (req, res) {
  var applyFor = req.session.data['who-apply-for']
  if (applyFor == "Myself") {
    res.redirect('apply/receiving-treatment')
  }
  else if (applyFor == "Someone else") {
    res.redirect('apply-for-child')
  }
  else {
    res.redirect('who-apply-for')
  }
})

// Are you applying for a child under the age of 18? 
router.post('/applyForChild', function (req, res) {
  var applyForChild = req.session.data['apply-for-child']
  if (applyForChild == "Yes") {
    res.redirect('parent-guardian')
  }
  else if (applyForChild == "No") {
    res.redirect('apply-on-behalf/')
  }
  else {
    res.redirect('apply-for-child')
  }
})

// Are you the parent or legal guardian of the child?
router.post('/parentGuardian', function (req, res) {
  var parentGuardian = req.session.data['parent-guardian']
  if (parentGuardian == "Yes") {
    res.redirect('apply-parent/treatment-country')
  }
  else if (parentGuardian == "No") {
    res.redirect('')
  }
  else {
    res.redirect('parent-guardian')
  }
})


module.exports = router