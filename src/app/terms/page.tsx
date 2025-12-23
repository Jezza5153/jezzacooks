import PageHeader from "@/components/page-header";

export default function TermsPage() {
  return (
    <div>
      <PageHeader title="Terms of Service" />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="prose prose-invert prose-lg max-w-3xl mx-auto">
          <p>Last updated: July 2024</p>

          <h2 className="font-headline">1. Agreement to Terms</h2>
          <p>
            By using the services offered by JEZZA COOKS ("Company", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services.
          </p>

          <h2 className="font-headline">2. Services</h2>
          <p>
            We provide restaurant consulting, catering, and web development services. All services are subject to a separate agreement or statement of work that will outline the scope, fees, and timeline of the project.
          </p>

          <h2 className="font-headline">3. Payments</h2>
          <p>
            Fees for our services will be invoiced as outlined in your project agreement. Payments are due upon receipt of invoice unless otherwise specified. Late payments may be subject to interest charges.
          </p>

          <h2 className="font-headline">4. Intellectual Property</h2>
          <p>
            All original content on this website, including text, graphics, logos, and images, is the property of JEZZA COOKS and is protected by copyright laws. Any deliverables created specifically for a client project (e.g., website code, custom SOP documents) will be the intellectual property of the client upon full payment, unless otherwise specified in the project agreement.
          </p>
          
          <h2 className="font-headline">5. Confidentiality</h2>
          <p>
            We will treat all client information as confidential. We will not disclose any proprietary or sensitive information to third parties without your express consent.
          </p>

          <h2 className="font-headline">6. Limitation of Liability</h2>
          <p>
            Our liability for any claim arising out of our services is limited to the amount paid for the services. We are not liable for any indirect, special, incidental, or consequential damages, including lost profits. While we provide expert advice and services, we do not guarantee specific business outcomes or profit levels, as these are subject to market conditions and operational factors beyond our control.
          </p>

          <h2 className="font-headline">7. Termination</h2>
          <p>
            Either party may terminate a service agreement with written notice. Specific terms regarding termination, including any applicable fees or refunds, will be detailed in the individual project agreement.
          </p>

          <h2 className="font-headline">8. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of The Netherlands.
          </p>

          <h2 className="font-headline">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of our services after any such changes constitutes your acceptance of the new terms.
          </p>
          
          <h2 className="font-headline">Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at: [Your Email Address]
          </p>
        </div>
      </div>
    </div>
  );
}
