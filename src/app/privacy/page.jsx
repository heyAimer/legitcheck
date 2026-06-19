
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Privacy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            Privacy Policy
          </CardTitle>

          <CardDescription className="mt-2">
            Last updated: June 2026
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-10">

          <section>
            <h2 className="text-xl font-semibold mb-3">
              1. Information We Collect
            </h2>

            <p className="text-muted-foreground">
              To provide contract analysis services, LegitCheck may collect:
            </p>

            <ul className="list-disc ml-6 mt-3 space-y-2 text-muted-foreground">
              <li>Email address and account information</li>
              <li>Uploaded contracts and supporting files</li>
              <li>Usage and analytics data</li>
              <li>Authentication cookies required for sign in</li>
            </ul>
          </section>


          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Contract Processing
            </h2>

            <p className="text-muted-foreground leading-7">
              Contracts uploaded to LegitCheck are processed solely for
              generating risk insights, clause explanations, and negotiation
              suggestions.
            </p>

            <p className="text-muted-foreground mt-4 leading-7">
              We do not sell, rent, or share contract contents with third
              parties.
            </p>

            <p className="text-muted-foreground mt-4 leading-7">
              Uploaded files may be automatically deleted after analysis is
              completed.
            </p>
          </section>


          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. AI Usage
            </h2>

            <p className="text-muted-foreground leading-7">
              LegitCheck uses artificial intelligence technologies to identify
              potential risks within contracts.
            </p>

            <p className="text-muted-foreground mt-4 leading-7">
              Contract contents are not used to train public AI models.
            </p>

          </section>


          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Cookies
            </h2>

            <p className="text-muted-foreground leading-7">
              We use cookies only for authentication, session management,
              security, and improving the user experience.
            </p>

          </section>



          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Third Party Services
            </h2>

            <p className="text-muted-foreground leading-7">
              LegitCheck may rely on third-party providers for hosting,
              analytics, authentication, and payment processing.
            </p>

          </section>


          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Data Security
            </h2>

            <p className="text-muted-foreground leading-7">
              We implement reasonable technical and organizational safeguards to
              protect uploaded contracts and user information.
            </p>

          </section>



          <section>
            <h2 className="text-xl font-semibold mb-3">
              7. Contact Us
            </h2>

            <p className="text-muted-foreground">
              Questions regarding this Privacy Policy can be directed to:
            </p>

            <p className="mt-3 font-medium">
              risingdevs01@gmail.com
            </p>

          </section>

        </CardContent>
      </Card>

    </main>
  );
}

