const RiskAssessment = require('../models/RiskAssessment');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/**
 * Simulated FL risk engine.
 * Replace flRiskEngine() with a real Python microservice call or ML API later.
 */
const flRiskEngine = (inputs) => {
  const { age = 40, bmi = 25, smokingStatus, diabetesStatus, bloodPressure, familyHistory = [], symptoms = [] } = inputs;

  let baseScore = 10;
  if (age > 60)            baseScore += 15;
  else if (age > 45)       baseScore += 8;
  if (bmi > 30)            baseScore += 12;
  else if (bmi > 27)       baseScore += 6;
  if (smokingStatus === 'Current Smoker')   baseScore += 18;
  else if (smokingStatus === 'Ex-Smoker')   baseScore += 7;
  if (diabetesStatus === 'Type 2 Diabetes') baseScore += 14;
  else if (diabetesStatus === 'Pre-Diabetic') baseScore += 6;
  if (bloodPressure === 'High')             baseScore += 10;
  if (familyHistory.includes('Heart Disease')) baseScore += 8;
  if (familyHistory.includes('Diabetes'))      baseScore += 6;
  if (symptoms.includes('Chest Pain'))         baseScore += 12;
  if (symptoms.includes('Shortness of Breath')) baseScore += 8;

  const score = Math.min(Math.round(baseScore + Math.random() * 5), 100);
  const level = score < 20 ? 'Low' : score < 40 ? 'Moderate' : score < 65 ? 'High' : 'Critical';

  const diseaseRisks = [
    { disease: 'Cardiovascular Disease', riskPercent: Math.min(score * 0.9, 95), confidence: 87 },
    { disease: 'Type 2 Diabetes',        riskPercent: Math.min(score * 0.7, 90), confidence: 82 },
    { disease: 'Hypertension',           riskPercent: Math.min(score * 0.8, 90), confidence: 79 },
    { disease: 'Metabolic Syndrome',     riskPercent: Math.min(score * 0.65, 85), confidence: 74 }
  ].map(d => ({ ...d, riskPercent: parseFloat(d.riskPercent.toFixed(1)) }));

  const recommendations = [];
  if (score >= 20)  recommendations.push('Schedule a cardiac health check-up within 30 days.');
  if (bmi > 27)     recommendations.push('Work with a nutritionist to reach a healthy BMI.');
  if (smokingStatus === 'Current Smoker') recommendations.push('Enrol in a smoking cessation program.');
  if (diabetesStatus !== 'No Diabetes') recommendations.push('Monitor HbA1c levels every 3 months.');
  recommendations.push('Maintain at least 150 minutes of moderate exercise per week.');
  recommendations.push('Limit sodium and processed sugar intake.');

  return { overallRiskScore: score, riskLevel: level, diseaseRisks, recommendations, fedAvgVersion: 'v4.2', modelNodes: 3 };
};

// @route  POST /api/risk/assess
exports.assess = async (req, res, next) => {
  try {
    const inputs = req.body;
    const results = flRiskEngine(inputs);

    const assessment = await RiskAssessment.create({
      patient: req.user._id,
      inputs,
      results
    });

    sendSuccess(res, assessment, 'Risk assessment complete', 201);
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/risk/history
exports.getHistory = async (req, res, next) => {
  try {
    const assessments = await RiskAssessment.find({ patient: req.user._id }).sort({ analyzedAt: -1 }).limit(10);
    sendSuccess(res, assessments, 'Risk history fetched');
  } catch (err) {
    next(err);
  }
};

// @route  GET /api/risk/:id
exports.getById = async (req, res, next) => {
  try {
    const a = await RiskAssessment.findById(req.params.id);
    if (!a) return sendError(res, 'Assessment not found', 404);
    if (a.patient.toString() !== req.user._id.toString()) return sendError(res, 'Not authorised', 403);
    sendSuccess(res, a, 'Assessment fetched');
  } catch (err) {
    next(err);
  }
};
