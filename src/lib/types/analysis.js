/**
    Defines data shape

    Will later mirror Go structs

    Later:
 */

    // src/lib/types/analysis.js

/**
 * @typedef {Object} RiskCategory
 * @property {string} key            // e.g. "PAYMENT", "IP", "TERMINATION"
 * @property {"LOW"|"MEDIUM"|"HIGH"} level
 */

/**
 * @typedef {Object} Clause
 * @property {string} id
 * @property {string} clause
 * @property {string} category
 * @property {"LOW"|"MEDIUM"|"HIGH"} riskLevel
 * @property {string} explanation
 */

/**
 * @typedef {Object} NegotiationTip
 * @property {string} clause
 * @property {string} suggestion
 */

/**
 * @typedef {Object} Analysis
 * @property {string} analysisId
 * @property {string} createdAt
 * @property {number} overallRiskScore
 * @property {string} summary
 * @property {RiskCategory[]} riskCategories
 * @property {Clause[]} redFlags
 * @property {Clause[]} harmfulClauses
 * @property {Clause[]} safeClauses
 * @property {NegotiationTip[]} negotiationSuggestions
 * @property {boolean} isUnlocked
 */

export {};

