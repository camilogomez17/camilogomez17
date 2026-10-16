export const metadata = {
  title: "Privacy Policy",
  description: "How this personal website and its browser-based tools handle information, analytics, and advertising.",
};

export default function PrivacyPage() {
  return (
    <div className="page-wrap">
      <section className="panel p-8 sm:p-10">
        <span className="kicker">Legal</span>
        <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">Privacy Policy</h1>
        <p className="muted mt-4">Last updated: October 16, 2026</p>

        <div className="mt-8 space-y-5">
          <article className="info-card">
            <h2 className="text-xl font-semibold">Who operates this site</h2>
            <p className="muted mt-2">
              This is a personal portfolio and project website operated by Camilo Valencia. For privacy questions or requests, contact c6m1lo@proton.me.
            </p>
          </article>

          <article className="info-card">
            <h2 className="text-xl font-semibold">Information processed when you visit</h2>
            <p className="muted mt-2">
              The hosting provider may process technical request information, such as IP address, browser and device details, requested pages, timestamps, and security logs, to deliver and protect the site. This site does not currently run a separate first-party analytics service. The hosting provider processes technical information under its own terms and privacy documentation.
            </p>
          </article>

          <article className="info-card">
            <h2 className="text-xl font-semibold">Advertising and cookies</h2>
            <p className="muted mt-2">
              This site loads Google AdSense. Google and its advertising partners may use cookies, local storage, IP addresses, or other identifiers to deliver, measure, limit, and personalize advertising, subject to your location, settings, and applicable consent requirements. Google may use information about visits to this and other websites to provide advertising services.
            </p>
            <p className="muted mt-2">
              You can review or change advertising personalization settings at Google’s Ads Settings and learn how Google uses information at Google’s advertising privacy resources. Browser settings can also restrict or delete cookies and site data, although some site features may be affected.
            </p>
            <p className="muted mt-2">
              Google AdSense privacy information: <a className="primary-link" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google advertising technologies</a> and <a className="primary-link" href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
            </p>
          </article>

          <article className="info-card">
            <h2 className="text-xl font-semibold">Information you enter into project tools</h2>
            <p className="muted mt-2">
              Habit Analytics stores activity entries, notes, tags, journal entries, and timer state in your browser’s local storage. The current implementation does not send those entries to a site account or remote application database. Anyone with access to the same browser profile may be able to access them. Clearing browser data may erase them; use the app’s export feature to keep a backup.
            </p>
            <p className="muted mt-2">
              Do not enter passwords, financial account details, sensitive personal information, or information about other people unless you understand the risks of storing it in your browser.
            </p>
          </article>

          <article className="info-card">
            <h2 className="text-xl font-semibold">How information is used and shared</h2>
            <p className="muted mt-2">
              Information may be processed to operate, secure, maintain, and advertise on this site. If you email me, the message and any details you include will also be processed by the email providers involved in sending and receiving it. Information may also be processed by the hosting, analytics, and advertising providers described above. I do not sell personal information directly. This statement does not limit processing performed independently by those providers under their own policies or disclosures required by law.
            </p>
          </article>

          <article className="info-card">
            <h2 className="text-xl font-semibold">Retention and security</h2>
            <p className="muted mt-2">
              Technical logs, analytics, and advertising information may be retained by the relevant providers according to their settings and policies. Project-tool data remains in your browser until you delete it or clear the relevant site data. No website or storage method can be guaranteed completely secure, so avoid entering information you cannot afford to lose or disclose.
            </p>
          </article>

          <article className="info-card">
            <h2 className="text-xl font-semibold">Your choices and privacy requests</h2>
            <p className="muted mt-2">
              You can manage browser cookies and site storage through your browser, adjust Google advertising settings, and contact me with privacy questions or requests. Depending on where you live and which laws apply, you may have additional rights regarding access, deletion, correction, or opting out of certain processing. Requests can be sent to c6m1lo@proton.me.
            </p>
          </article>

          <article className="info-card">
            <h2 className="text-xl font-semibold">Children</h2>
            <p className="muted mt-2">
              This site is a general personal portfolio and is not designed to knowingly collect personal information from children under 13. If you believe a child has provided personal information through a contact channel, please contact me so the issue can be reviewed.
            </p>
          </article>

          <article className="info-card">
            <h2 className="text-xl font-semibold">Changes to this policy</h2>
            <p className="muted mt-2">
              This policy may be updated when site features, providers, or legal requirements change. The date at the top indicates the most recent revision.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
