export const metadata = {
  title: "Terms of Service",
  description: "Terms and limitations for using this personal website and its project demos.",
};

export default function TermsPage() {
  return (
    <div className="page-wrap">
      <section className="panel p-8 sm:p-10">
        <span className="kicker">Legal</span>
        <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">Terms of Service</h1>
        <p className="muted mt-4">Last updated: October 16, 2026</p>
        <p className="muted mt-5">
          These terms apply to this personal website and the project demonstrations linked from it. By using the site, you agree to use it lawfully and responsibly. If you do not agree, do not use the site or its tools.
        </p>

        <div className="mt-8 space-y-5">
          <article className="info-card">
            <h2 className="text-xl font-semibold">1. Informational and educational use</h2>
            <p className="muted mt-2">
              Content is provided for general information, demonstration, and educational purposes. It is not professional legal, medical, financial, security, or other specialist advice. You are responsible for deciding whether information or tools are suitable for your situation.
            </p>
          </article>
          <article className="info-card">
            <h2 className="text-xl font-semibold">2. No warranty</h2>
            <p className="muted mt-2">
              The site and its projects are provided on an “as is” and “as available” basis to the extent permitted by law. I do not promise that they will always be available, error-free, secure, complete, or suitable for a particular purpose. Project features may change or be removed.
            </p>
          </article>
          <article className="info-card">
            <h2 className="text-xl font-semibold">3. Your data and backups</h2>
            <p className="muted mt-2">
              Some tools store data locally in your browser. You are responsible for maintaining backups and protecting access to your device and browser profile. Do not use a demonstration tool as the sole repository for important records or enter information that you are not prepared to store in that environment.
            </p>
          </article>
          <article className="info-card">
            <h2 className="text-xl font-semibold">4. Acceptable use</h2>
            <p className="muted mt-2">
              Do not misuse the site, disrupt its operation, attempt unauthorized access, infringe others’ rights, or use it in violation of applicable law.
            </p>
          </article>
          <article className="info-card">
            <h2 className="text-xl font-semibold">5. Intellectual property</h2>
            <p className="muted mt-2">
              Unless otherwise stated, original writing, code, and visual materials on this site belong to their respective rights holders. You may not copy, redistribute, or commercially use protected material without permission or another valid legal basis. Third-party names, software, and links remain subject to their owners’ rights and terms.
            </p>
          </article>
          <article className="info-card">
            <h2 className="text-xl font-semibold">6. Third-party services and links</h2>
            <p className="muted mt-2">
              The site may rely on third-party hosting, analytics, advertising, or linked services. Those services operate under their own terms and privacy policies. I do not control and am not responsible for the content, availability, or practices of independent third-party sites.
            </p>
          </article>
          <article className="info-card">
            <h2 className="text-xl font-semibold">7. Limitation of liability</h2>
            <p className="muted mt-2">
              To the maximum extent permitted by applicable law, I am not liable for indirect, incidental, special, consequential, or punitive damages, loss of data, loss of profits, or interruption arising from use of or inability to use this site or its projects. Nothing in these terms excludes or limits liability where doing so would be unlawful.
            </p>
          </article>
          <article className="info-card">
            <h2 className="text-xl font-semibold">8. Changes and contact</h2>
            <p className="muted mt-2">
              These terms may change as the site evolves. The latest version will be posted here with an updated revision date. Questions can be sent to <a className="primary-link" href="mailto:c6m1lo@proton.me">c6m1lo@proton.me</a>.
            </p>
          </article>
        </div>
        <p className="muted mt-6 text-sm">
          These terms are a general starting point, not a guarantee against claims or a substitute for advice from a qualified attorney familiar with the site and its audience.
        </p>
      </section>
    </div>
  );
}
