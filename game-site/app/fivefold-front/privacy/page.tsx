import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fivefold Front Privacy Policy — AtomSprout',
  description: 'Privacy policy for Fivefold Front, an offline single-player game by AtomSprout.',
};

export default function PrivacyPolicyPage() {
  return <main className="policyPage">
    <nav className="nav shell">
      <a className="wordmark" href="https://atomsprout.com/"><span>AtomSprout</span></a>
      <div className="navLinks"><a href="/games/fivefold-front/">Fivefold Front</a></div>
    </nav>
    <header className="policyHeader shell">
      <p className="worldCode">WORLD 003<i/>LEGAL</p>
      <h1>Privacy<br/><em>Policy</em></h1>
      <p>Fivefold Front</p>
      <p className="policyMeta">Effective August 26, 2026</p>
    </header>
    <div className="policyBody shell">
      <article lang="en">
        <p className="policyLead"><strong>Fivefold Front does not collect, store, or transmit personal information.</strong> It is a fully offline, single-player game published by AtomSprout.</p>
        <h2>Information we collect</h2>
        <p>We do not collect personal data, including names, email addresses, phone numbers, locations, device identifiers, contacts, photos, microphone data, or camera data. The game does not request access to these resources.</p>
        <h2>Data stored on your device</h2>
        <p>Decks, settings, quest progress, and skill progression are stored locally on your device so the game can function. This data never leaves your device and is not accessible to AtomSprout or any third party. Uninstalling the game may remove this local data.</p>
        <h2>Network services and third parties</h2>
        <p>The game has no accounts, servers, advertising, in-app purchases, analytics, tracking technologies, cloud services, or third-party SDKs. Microsoft Store and your operating system may process information independently under their own terms and privacy policies.</p>
        <h2>Children&apos;s privacy</h2>
        <p>Because the game does not collect personal information from any user, it does not knowingly collect personal information from children.</p>
        <h2>Changes and contact</h2>
        <p>If the game&apos;s data practices change, this policy will be updated before the relevant release. For privacy or support questions, email <a href="mailto:atomsprout@gmail.com">atomsprout@gmail.com</a>.</p>
      </article>
    </div>
    <footer className="policyFooter shell">
      <p>© 2026 AtomSprout</p>
      <a href="/games/fivefold-front/">Back to Fivefold Front ↗</a>
    </footer>
  </main>;
}
