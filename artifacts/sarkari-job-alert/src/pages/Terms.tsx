import { Layout } from "@/components/layout/Layout";
import { Shield, AlertTriangle, Building2, FileText, Globe, Mail } from "lucide-react";

export default function Terms() {
  const currentYear = new Date().getFullYear();

  return (
    <Layout>
      <section className="bg-secondary text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <span className="text-primary text-sm font-medium uppercase tracking-widest">Legal</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold">Terms &amp; Conditions</h1>
          <p className="mt-3 text-secondary-foreground/70 max-w-xl">
            Please read these terms carefully before using the Sarkari Job Alert website or mobile application.
          </p>
          <p className="mt-2 text-xs text-secondary-foreground/50">Last updated: April 2026</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">

        <div className="mb-10 p-5 rounded-2xl border-2 border-orange-200 bg-orange-50 flex gap-4">
          <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-orange-800 mb-1">Important Disclaimer</p>
            <p className="text-sm text-orange-700 leading-relaxed">
              <strong>Sarkari Job Alert is not affiliated with, endorsed by, or connected to the Government of India,
              any State Government, or any government body.</strong> This is an independent, privately owned
              informational platform operated by <strong>NOHRIA LABS</strong>. All government names, logos,
              and exam titles are the property of their respective owners and are referenced here purely for
              informational purposes.
            </p>
          </div>
        </div>

        <div className="space-y-10">

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold text-secondary">1. Ownership &amp; Operator</h2>
            </div>
            <div className="text-muted-foreground text-sm leading-relaxed space-y-3 pl-12">
              <p>
                The Sarkari Job Alert website (<em>sarkarialert.in</em>) and the <strong>Sarkari Job Alerts</strong> Android
                application (package: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">com.sarkarialert</code>) are
                owned, developed, and operated exclusively by:
              </p>
              <div className="bg-secondary/5 border border-secondary/10 rounded-xl p-4">
                <p className="font-bold text-secondary text-base">NOHRIA LABS</p>
                <p className="text-xs mt-1 text-muted-foreground">Private Technology Company · India</p>
              </div>
              <p>
                All intellectual property rights, including but not limited to the website design, source code, branding,
                and application, are the sole property of NOHRIA LABS. Unauthorized reproduction, distribution,
                or modification is strictly prohibited.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold text-secondary">2. Nature of Service</h2>
            </div>
            <div className="text-muted-foreground text-sm leading-relaxed space-y-3 pl-12">
              <p>
                Sarkari Job Alert is an <strong>independent information aggregation platform</strong>. We collect
                and display publicly available information about government recruitment admit cards and related
                exam data for educational and informational purposes only.
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>We do not represent any government body or official agency.</li>
                <li>We are not a recruitment agency and do not process any job applications.</li>
                <li>Links to admit cards lead directly to official government websites (.gov.in / .nic.in).</li>
                <li>We do not host or store government documents on our servers.</li>
                <li>Information is auto-aggregated and may occasionally be delayed or incomplete.</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold text-secondary">3. Disclaimer of Accuracy</h2>
            </div>
            <div className="text-muted-foreground text-sm leading-relaxed space-y-3 pl-12">
              <p>
                While NOHRIA LABS makes every effort to provide accurate and up-to-date information, we make
                <strong> no warranties or guarantees</strong> regarding the completeness, accuracy, or timeliness
                of the data displayed on this platform.
              </p>
              <p>
                Users are strongly advised to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Always verify admit card details, exam dates, and eligibility from the <strong>official government website</strong> of the recruiting organization.</li>
                <li>Not rely solely on this platform for critical exam-related decisions.</li>
                <li>Check the official organization notification for any updates or corrections.</li>
              </ul>
              <p>
                NOHRIA LABS shall not be held liable for any loss, damage, or inconvenience caused by reliance on
                information displayed on this platform.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold text-secondary">4. Intellectual Property</h2>
            </div>
            <div className="text-muted-foreground text-sm leading-relaxed space-y-3 pl-12">
              <p>
                All content on this website and application — including the name "Sarkari Job Alert", the logo,
                design, layout, and source code — is the intellectual property of <strong>NOHRIA LABS</strong> and
                is protected under applicable copyright and intellectual property laws.
              </p>
              <p>
                Government names, exam titles, and logos referenced on this platform belong to their respective
                government bodies and are used here only for identification and informational purposes. Their
                use does not imply any endorsement by or affiliation with those bodies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-secondary mb-4 pl-12 -ml-12 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              5. User Obligations
            </h2>
            <div className="text-muted-foreground text-sm leading-relaxed space-y-3 pl-12">
              <p>By accessing this website or app, you agree to:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Use the platform only for lawful, personal, and non-commercial purposes.</li>
                <li>Not scrape, copy, or reproduce our website content without written permission from NOHRIA LABS.</li>
                <li>Not misrepresent our platform as an official government website or affiliated service.</li>
                <li>Not use automated tools to access or overload our services.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-secondary mb-4 pl-12 -ml-12 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              6. Third-Party Links
            </h2>
            <div className="text-muted-foreground text-sm leading-relaxed space-y-3 pl-12">
              <p>
                This platform links to official government websites and third-party resources (e.g. Google Play Store,
                Testbook). NOHRIA LABS has no control over the content of those external sites and is not responsible
                for their availability, accuracy, or privacy practices.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-secondary mb-4 pl-12 -ml-12 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              7. Privacy
            </h2>
            <div className="text-muted-foreground text-sm leading-relaxed space-y-3 pl-12">
              <p>
                Sarkari Job Alert does not require users to create accounts or submit personal information to browse
                admit cards or mock tests. We may collect anonymous usage analytics to improve our service.
                The Android app may request standard permissions (notifications, internet access) required for its
                core functionality.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-secondary mb-4 pl-12 -ml-12 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              8. Changes to Terms
            </h2>
            <div className="text-muted-foreground text-sm leading-relaxed space-y-3 pl-12">
              <p>
                NOHRIA LABS reserves the right to update or modify these Terms &amp; Conditions at any time without
                prior notice. Continued use of the platform after changes constitutes acceptance of the revised terms.
                It is your responsibility to check this page periodically.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold text-secondary">9. Contact</h2>
            </div>
            <div className="text-muted-foreground text-sm leading-relaxed space-y-3 pl-12">
              <p>
                For any questions, concerns, or legal inquiries regarding these Terms &amp; Conditions or the platform,
                please contact:
              </p>
              <div className="bg-secondary/5 border border-secondary/10 rounded-xl p-4">
                <p className="font-bold text-secondary">NOHRIA LABS</p>
                <p className="text-xs text-muted-foreground mt-1">Owner &amp; Operator of Sarkari Job Alert</p>
              </div>
            </div>
          </section>

          <div className="mt-12 pt-6 border-t text-xs text-muted-foreground text-center">
            © {currentYear} NOHRIA LABS. All rights reserved. Sarkari Job Alert is an independent platform and is not
            affiliated with any government body.
          </div>
        </div>
      </div>
    </Layout>
  );
}
