import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Privacy Notice | Hyves",
  description:
    "Read the Hyves Privacy Notice covering personal data collection, processing, cookies, consent, retention, data sharing, international transfers, and contact details.",
  path: "/privacy",
  keywords: ["Hyves privacy notice", "Hyves privacy policy", "Hyves data protection"],
});

const personalInformation = [
  "Your first, middle and last names",
  "Your contact details, such as mobile or telephone numbers and email addresses",
  "Your date of birth",
  "Your gender",
  "Your local government and state of origin",
  "Next of kin details",
  "Your home address and telephone number for borrower or lender registration",
  "Your bank account information, including but not limited to Bank Verification Number (BVN), account name and number, and credit history",
  "ATM card details, including card number, expiry date and CVV",
  "The domain name of the Internet service provider (ISP)",
  "The Internet protocol address used to connect your device to the Internet",
  "Date and time of your visits",
  "Web pages visited, duration and frequency of visit",
  "Your login email address and password",
  "Additional personal information from third-party applications and other identification or verification services, for example from your financial institution or a Credit Bureau",
];

const processingPrinciples = [
  "Your personal data will be processed in a lawful, fair, and transparent manner.",
  "Your personal data will be processed for a specific purpose and not in a way that is incompatible with the purpose for which it is collected.",
  "Processing of your personal data will be adequate, relevant and limited to what is necessary for the purposes it is processed.",
  "The user's personal data will be kept accurate and, where necessary, kept up to date.",
  "The user's personal data will be held for no longer than it is required for the purposes for which it is processed.",
  "The user's personal data will be kept secure.",
];

const processingPurposes = [
  {
    basis: "Legitimate interest",
    description:
      "Processing your data is necessary for our legitimate interests or the legitimate interests of a third party, provided your rights and interests do not outweigh those interests.",
    purposes: [
      "Guard against potential fraud and money laundering.",
      "Process statistical data to improve our business.",
      "Enhance data security.",
      "Identify the user's device when the user visits our website.",
    ],
  },
  {
    basis: "Consent",
    description: "You have given explicit consent for us to process your data for a specific purpose.",
    purposes: [
      "Enable us to send targeted advertisements to you.",
      "Accept cookies on the user's device.",
      "Subscribe to our newsletter.",
    ],
  },
  {
    basis: "Contract",
    description:
      "If your data processing is necessary for a contract you have with us or because you have asked us to take specific steps before entering into that contract.",
    purposes: [
      "Create a personal profile on our website.",
      "Grant loans to individuals and cooperatives.",
      "Communicate with the user.",
      "Provide our services.",
      "Notify you of any changes to our service.",
      "Resolve issues via live chat support, phone or email, including bug fixing.",
      "Enable registered users to log in to our website.",
    ],
  },
  {
    basis: "Legal obligation",
    description: "If the processing of your data is necessary where there is a statutory obligation on us.",
    purposes: [
      "Verify borrowers' and investors' identities.",
      "Establish borrowers' and investors' ability to make and request loans by verifying that they are at least 18 years of age.",
      "Determine borrowers' eligibility for loans.",
      "Carry out Know Your Customer (KYC) obligations.",
      "Fulfil legal requirements where needed.",
    ],
  },
];

const userRights = [
  "Confirm whether or not the user's personal data is being processed and, where so, access personal data we hold about the user by requesting a copy.",
  "Rectify and complete the user's personal data where the user believes it to be inaccurate or incomplete.",
  "Restrict the processing of the user's personal data in certain circumstances.",
  "Object to the processing of the user's data where we intend to process such data for marketing purposes.",
  "Where feasible, receive all personal data the user has provided to us in a structured, commonly used, and machine-readable format and transmit the information to another data controller.",
  "Request the erasure of the user's personal data, also known as the right to be forgotten.",
  "Lodge a complaint with a relevant authority where you have reason to believe that we have violated the terms of this privacy notice by sending an email to dpo@ndpb.gov.ng.",
];

const dataSharingPartners = [
  "Hyves infrastructure for hosting services",
  "Zoom and Slack for communications within the organisation",
  "Mailchimp for email services",
  "Paystack, Interswitch and Flutterwave for payment services",
  "Google for the use of Google APIs and services on our website",
  "Jquery to make the use of Javascript on our website easier",
  "Cloudflare and Bootstrap for fast and reliable content delivery on our website",
];

const internationalTransferConditions = [
  "Your consent has been obtained.",
  "The transfer is necessary for the performance of a contract between us and the user or implementation of pre-contractual measures taken at the user's request.",
  "The transfer is necessary to conclude a contract between us and the third party in the user's interest.",
  "The transfer is necessary for reasons of public interest.",
  "The transfer is for the establishment, exercise or defence of legal claims.",
  "The transfer is essential to protect your vital interests or other persons, where the data subject is physically or legally incapable of giving consent.",
];

function LegalSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-slate-200 pt-8">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-sm font-semibold text-hyves-gold">{number}</span>
        <h2 className="text-xl font-bold text-hyves-black">{title}</h2>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600 md:text-base">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-hyves-bg">
      <section className="pt-28 pb-10 lg:pt-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-hyves-gold">
              Legal
            </p>
            <h1 className="text-3xl font-bold leading-tight text-hyves-black md:text-5xl">
              Privacy Notice
            </h1>
            <p className="mt-4 text-base text-slate-600">Last updated: 20 April 2026</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6">
          <article className="max-w-4x rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <div className="space-y-10">
              <LegalSection number="1" title="Introduction">
                <p>
                  HyCoop ("Hyves") is a limited liability company incorporated under Part A of the
                  Companies and Allied Matters Act, Cap C20, the Laws of the Federal Republic of
                  Nigeria and having its corporate office at 1, Sanni Close, Ogudu, Lagos, Nigeria.
                  Hyves is committed to safeguarding the privacy of our employees, clients, partners
                  and visitors to our websites and users of our products and services.
                </p>
                <p>
                  When this Privacy Notice (the "Notice") mentions "we," "us," or "our," it refers
                  to Hyves, which is the controller of your personal data. This notice governs your
                  use of our website: https://www.hyves.ng ("the Website") and your rights regarding
                  our collection, use, storage and protection of your data. Your privacy is important
                  to us.
                </p>
              </LegalSection>

              <LegalSection number="2" title="What Personal Information Do We Collect?">
                <p>
                  Personal information is any information about you that may be used to directly or
                  indirectly identify you. In connection with the service we provide and the products
                  we offer, we collect personal and financial information from you while you use our
                  products, services and websites. Most of this collection occurs during registration
                  or onboarding for individuals or cooperatives under our different products and
                  services and while using our website.
                </p>
                <BulletList items={personalInformation} />
              </LegalSection>

              <LegalSection number="3" title="Principles Of Data Processing">
                <p>The principles below guide our use of your personal data:</p>
                <BulletList items={processingPrinciples} />
              </LegalSection>

              <LegalSection number="4" title="Cookies">
                <p>
                  Cookies are tools that we use to collect information from the user when the user
                  visits our website automatically. Cookies help make our websites work and provide
                  information to us about how users interact with our site. We use this information
                  for the improvement of user experience on our website. The cookies we use help to
                  provide us with anonymized, aggregated technical information.
                </p>
              </LegalSection>

              <LegalSection number="5" title="Why We Collect Your Personal Data And The Lawful Bases">
                <p>We collect your data for the following purposes and lawful bases:</p>
                <div className="space-y-5">
                  {processingPurposes.map((group) => (
                    <div key={group.basis} className="rounded-lg border border-slate-200 p-5">
                      <h3 className="font-bold text-hyves-black">{group.basis}</h3>
                      <p className="mt-2">{group.description}</p>
                      <div className="mt-4">
                        <BulletList items={group.purposes} />
                      </div>
                    </div>
                  ))}
                </div>
              </LegalSection>

              <LegalSection number="6" title="Consent">
                <p>
                  Whenever we process your personal data based on consent, we will give you the
                  option to accept or reject such processing. When you give your consent, we process
                  your personal data for the stated purpose.
                </p>
              </LegalSection>

              <LegalSection number="7" title="Withdrawal Of Consent">
                <p>
                  You have a right to withdraw the consent at any time and we will cease to process
                  your personal data for the purpose we processed them. You can withdraw your
                  personal data at any time by sending an email to us.
                </p>
                <p>
                  However, when you withdraw your consent, it does not affect the validity of the
                  processing done before the withdrawal.
                </p>
              </LegalSection>

              <LegalSection number="8" title="The User's Rights">
                <p>
                  As a data subject, the law provides you with certain rights concerning the
                  processing of your personal data. They include the right to:
                </p>
                <BulletList items={userRights} />
                <p>
                  You may complain or seek redress from us within 30 days from the time you first
                  detected the alleged violation. To exercise any of the above, send an email to us
                  at info@hyves.ng or call us on 07058789944. The user may also visit our office at
                  1, Sanni Close, Ogudu, Lagos, Nigeria.
                </p>
              </LegalSection>

              <LegalSection number="9" title="Who We Share Your Personal Data With">
                <BulletList items={dataSharingPartners} />
                <p>
                  Note that we may disclose the user's data to legal or regulatory authorities if we
                  believe it is reasonably necessary to comply with a law, regulation, order,
                  subpoena, audit, or to protect the safety of any person, to address fraud, security
                  or technical issues.
                </p>
              </LegalSection>

              <LegalSection number="10" title="Marketing And Communications">
                <p>
                  Prior to sending direct marketing communications to the user, we will seek the
                  user's consent. The user may choose to opt out of our marketing emails by clicking
                  on the unsubscribe button at the bottom of the page.
                </p>
              </LegalSection>

              <LegalSection number="11" title="Retention Of Your Data">
                <p>
                  The user's personal data or any other information collected will be stored for as
                  long as necessary to fulfil the purposes described in this notice. However, we will
                  also retain data subject to relevant provisions of applicable laws, resolve
                  disputes, and enforce our legal agreements and policies.
                </p>
                <p>
                  We delete the user's data for targeted marketing purposes once the user
                  unsubscribes from our marketing communications.
                </p>
                <p>
                  Please note that the user's data may be retained for a more extended period,
                  notwithstanding the user's request to remove the user's data, where there is a
                  legal requirement to do so.
                </p>
              </LegalSection>

              <LegalSection number="12" title="How Do We Store Your Personal Data?">
                <p>
                  The personal information we collect from the user through our website is stored
                  within the HYVES Ecosystem and they are processed at our office in Nigeria and any
                  other data processing platforms used by our identifiable third parties. We protect
                  the user's data using physical, technical, and administrative security measures to
                  reduce the risks of loss, misuse, unauthorized access, disclosure and alteration.
                  Some of the safeguards we use are firewalls and data encryption, physical access
                  controls, information access authorization controls, and globally trusted
                  information security management systems.
                </p>
                <p>
                  In the event of an actual or suspected data breach capable of causing harm to the
                  user's rights and freedoms, we will notify the user without undue delay and use our
                  best effort to remedy the violation within one (1) month from the date we notify
                  the user.
                </p>
              </LegalSection>

              <LegalSection number="13" title="International Transfer Of Data">
                <p>
                  To achieve the purposes described in this notice, we may transfer the user's data
                  to countries that are not considered to have sufficient law by the Nigerian Data
                  Protection Bureau (NDPB). Where personal data is to be transferred to a country
                  outside Nigeria, we shall put adequate measures to ensure data security.
                </p>
                <p>
                  Our data transfers to the countries that do not offer an adequate protection level
                  are subject to the conditions under the Nigeria Data Protection Regulation (NDPR).
                  We will therefore only transfer Personal Data out of Nigeria on one of the
                  following conditions:
                </p>
                <BulletList items={internationalTransferConditions} />
                <p>
                  To obtain any relevant information regarding any transfers of your Personal Data to
                  third countries, including the appropriate transfer mechanisms, please contact us.
                </p>
              </LegalSection>

              <LegalSection number="14" title="Anti-Money Laundering Policies And Procedures">
                <p>
                  Our Anti-Money Laundering (AML) and Combating Financing of Terrorism (CFT)
                  policies are tailored to the recommendations of the Central Bank of Nigeria. We
                  conduct client due diligence enquiries about each new client and people connected
                  with them and conduct ongoing monitoring of existing clients. These enquiries are
                  based on the Money Laundering (Prevention and Prohibition) Act, 2022 ("MLPPA") and
                  Terrorism (Prevention and Prohibition) Act 2022 ("TPPA"), although if additional
                  information is required by CBN guidelines on same, that information will also be
                  obtained.
                </p>
                <p>
                  Where necessary for these purposes, we seek relevant information from third-party
                  data suppliers. Where individuals have supplied personal data for this purpose, we
                  will only use it for that purpose and will keep it only as long as the relevant AML
                  and CFT data protection legislations require.
                </p>
                <p>
                  We also have internal procedures to ensure that any suspicion of money laundering
                  and terrorism is reported to the appropriate authorities where there is an
                  obligation to do so. Our legal team and other relevant staff are provided with
                  training in these issues.
                </p>
              </LegalSection>

              <LegalSection number="15" title="Contact Us">
                <p>
                  We are hopeful that the user will not have a cause to be displeased about how we
                  manage the user's data. However, in the unlikely event that the user has a concern
                  over how the user's information is being managed, processed or where it is missing,
                  the user can reach our Data Protection Officer (DPO) at info@hyves.ng.
                </p>
              </LegalSection>

              <LegalSection number="16" title="Changes To The Privacy Notice">
                <p>
                  We may change this notice from time to time by updating this page. We do not
                  undertake to send a written notification of changes to this notice. Whenever the
                  user visits our website, do check the last date of update.
                </p>
              </LegalSection>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
