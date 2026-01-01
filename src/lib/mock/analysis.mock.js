//pretends to be golang api
//returns analysis by id
// src/lib/mock/analysis.mock.js

import "../types/analysis";

/**
 * Simulate database
 */
const MOCK_ANALYSIS_DB = {
  "demo-locked": {
    analysisId: "demo-locked",
    createdAt: new Date().toISOString(),
    overallRiskScore: 74,
    summary:
      "This contract contains multiple clauses that may expose you to financial, intellectual property, and termination risks.",
    riskCategories: [
      { key: "PAYMENT", level: "HIGH" },
      { key: "INTELLECTUAL_PROPERTY", level: "HIGH" },
      { key: "TERMINATION", level: "MEDIUM" },
      { key: "LIABILITY", level: "HIGH" }
    ],
    redFlags: [
      {
        id: "rf1",
        clause: "The client may terminate this agreement at any time without notice.",
        category: "TERMINATION",
        riskLevel: "HIGH",
        explanation:
          "This allows the client to end the contract suddenly, which could leave you unpaid for completed work."
      }
    ],
    harmfulClauses: [
      {
        id: "hc1",
        clause: "All intellectual property created shall belong exclusively to the client.",
        category: "INTELLECTUAL_PROPERTY",
        riskLevel: "HIGH",
        explanation:
          "You lose ownership of all work you create, even after the project is completed."
      }
    ],
    safeClauses: [
      {
        id: "sc1",
        clause: "Both parties agree to maintain confidentiality of shared information.",
        category: "CONFIDENTIALITY",
        riskLevel: "LOW",
        explanation:
          "This is a standard clause that protects both parties."
      }
    ],
    negotiationSuggestions: [
      {
        clause: "Payment shall be made within 60 days of invoice.",
        suggestion:
          "Ask to reduce the payment period to 15–30 days to improve cash flow."
      }
    ],
    isUnlocked: false
  },

  "demo-unlocked": {
    analysisId: "demo-unlocked",
    createdAt: new Date().toISOString(),
    overallRiskScore: 74,
    summary:
      "This contract contains several high-risk clauses related to payment delays, intellectual property ownership, and liability exposure.",
    riskCategories: [
      { key: "PAYMENT", level: "HIGH" },
      { key: "INTELLECTUAL_PROPERTY", level: "HIGH" },
      { key: "TERMINATION", level: "MEDIUM" },
      { key: "LIABILITY", level: "HIGH" }
    ],
    redFlags: [
      {
        id: "rf1",
        clause: "The client may terminate this agreement at any time without notice.",
        category: "TERMINATION",
        riskLevel: "HIGH",
        explanation:
          "This allows the client to terminate the contract immediately, risking unpaid work."
      },
      {
        id: "rf2",
        clause: "The service provider shall indemnify the client for all claims.",
        category: "LIABILITY",
        riskLevel: "HIGH",
        explanation:
          "You may be financially responsible for claims even if you are not at fault."
      }
    ],
    harmfulClauses: [
      {
        id: "hc1",
        clause: "All intellectual property created shall belong exclusively to the client.",
        category: "INTELLECTUAL_PROPERTY",
        riskLevel: "HIGH",
        explanation:
          "You permanently lose ownership rights over your work."
      }
    ],
    safeClauses: [
      {
        id: "sc1",
        clause: "Both parties agree to maintain confidentiality of shared information.",
        category: "CONFIDENTIALITY",
        riskLevel: "LOW",
        explanation:
          "This clause is balanced and standard."
      },
      {
        id: "sc2",
        clause: "The scope of work is clearly defined in Schedule A.",
        category: "SCOPE",
        riskLevel: "LOW",
        explanation:
          "Clearly defining scope reduces misunderstanding."
      }
    ],
    negotiationSuggestions: [
      {
        clause: "Payment shall be made within 60 days of invoice.",
        suggestion:
          "Request reducing the payment term to 15–30 days."
      },
      {
        clause: "Unlimited liability clause.",
        suggestion:
          "Ask to cap liability to the total contract value."
      }
    ],
    isUnlocked: true
  }
};

/**
 * Mock fetch function
 * Simulates an API call
 */
export function getMockAnalysisById(analysisId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const analysis = MOCK_ANALYSIS_DB[analysisId];

      if (!analysis) {
        reject(new Error("Analysis not found"));
        return;
      }

      resolve(analysis);
    }, 800); // simulate network delay
  });
}
