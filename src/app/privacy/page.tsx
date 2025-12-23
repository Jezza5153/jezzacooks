import PageHeader from "@/components/page-header";

export default function PrivacyPage() {
  return (
    <div>
      <PageHeader title="Privacy Policy" />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="prose prose-invert prose-lg max-w-3xl mx-auto">
          <p>Last updated: July 2024</p>
          
          <h2 className="font-headline">Introduction</h2>
          <p>
            JEZZA COOKS ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [Your Website URL] or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>

          <h2 className="font-headline">Collection of Your Information</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <h3>Personal Data</h3>
          <p>
            Personally identifiable information, such as your name, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you fill out a contact form or when you choose to participate in various activities related to the Site.
          </p>
          <h3>Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
          </p>

          <h2 className="font-headline">Use of Your Information</h2>
          <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul>
            <li>Respond to your inquiries and offer support for your project.</li>
            <li>Email you regarding your account or order.</li>
            <li>Improve our website and service offerings.</li>
            <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
          </ul>

          <h2 className="font-headline">Disclosure of Your Information</h2>
          <p>
            We will not share your information with any third parties except in the cases where it is legally required or to protect our rights.
          </p>

          <h2 className="font-headline">Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2 className="font-headline">Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: [Your Email Address]
          </p>
        </div>
      </div>
    </div>
  );
}
