import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using LegitCheck, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the platform.",
  },

  {
    title: "2. Use of the Service",
    content:
      "You may use LegitCheck solely for lawful purposes. You agree not to misuse the service, attempt unauthorized access, upload malicious files, or interfere with the platform's operation.",
  },

  {
    title: "3. Contract Analysis",
    content:
      "LegitCheck uses artificial intelligence to identify potential risks, explain clauses, and suggest negotiation opportunities. Analyses are informational only and may not identify every legal issue.",
  },

  {
    title: "4. No Legal Advice",
    content:
      "LegitCheck is not a law firm and does not provide legal advice. No attorney-client relationship is created through the use of the platform. Users should consult a qualified attorney before making legal decisions.",
  },

  {
    title: "5. User Accounts",
    content:
      "Users are responsible for maintaining the confidentiality of their account credentials and for all activities conducted through their accounts.",
  },

  {
    title: "6. Payments and Subscriptions",
    content:
      "Paid plans may be offered in the future. Subscription fees are billed according to the selected plan and are generally non-refundable unless required by law.",
  },

  {
    title: "7. Intellectual Property",
    content:
      "All platform content, branding, software, and underlying technology remain the exclusive property of LegitCheck and its licensors.",
  },

  {
    title: "8. Limitation of Liability",
    content:
      "To the fullest extent permitted by law, LegitCheck shall not be liable for any indirect, incidental, consequential, or special damages arising from the use of the service.",
  },

  {
    title: "9. Changes to Terms",
    content:
      "We may update these Terms periodically. Continued use of the service after changes become effective constitutes acceptance of the revised Terms.",
  },

  {
    title: "10. Contact",
    content:
      "Questions regarding these Terms may be directed to risingdevs01@gmail.com . ",
  },
];

export default function Terms() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Terms of Service
        </h1>

        <p className="mt-3 text-muted-foreground">
          Last updated: June 2026
        </p>

        <p className="mt-4 text-muted-foreground max-w-2xl">
          These Terms govern your access to and use of LegitCheck. Please read
          them carefully before using the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Terms and Conditions
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">

          {sections.map((section) => (
            <section
              key={section.title}
              className="space-y-2"
            >
              <h2 className="text-lg font-semibold">
                {section.title}
              </h2>

              <p className="text-sm leading-7 text-muted-foreground">
                {section.content}
              </p>
            </section>
          ))}

        </CardContent>
      </Card>

    </main>
  );
}