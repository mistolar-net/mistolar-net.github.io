# ImprovMX Free migration handoff

**Status:** ImprovMX forwarding is verified through delivery logs and personal inbox receipt. Old emails are preserved. On 2026-10-03, the owner reported deleting the GoDaddy Microsoft 365 subscription and confirmed forwarding still works in a subsequent test. Subscription deletion is recorded as owner-confirmed; the GoDaddy confirmation and effective service end date have not been inspected. Remaining work includes continued observation, additional outside-account testing, confirmation of billing/domain status, obsolete DNS cleanup, and a final zone export. Do not rely on rollback to the deleted Microsoft 365 service.

**Last updated:** 2026-10-03

**Last verified:** 2026-10-02: public website contact links, listed live DNS records, the August DNS backup, ImprovMX public plan details, and generic DNS instructions. The owner confirmed the renewal deadline and price on the same date. The owner subsequently supplied ImprovMX alias, DNS setup, and Active-status screenshots on 2026-10-02. After the owner corrected the MX setup, a new screenshot shows green checks for both MX records and SPF. Google and Cloudflare public DNS checks confirm `10 mx1.improvmx.com`, `20 mx2.improvmx.com`, and the reviewed SPF with TTL 1800. A subsequent delivery-log screenshot confirms an outside-account test entered ImprovMX at 20:25:00 PDT and was delivered to the destination mail server at 20:25:03 PDT on 2026-10-02. The owner confirmed that the same test arrived in the personal inbox. On 2026-10-03, the owner reported subscription deletion and a further successful ImprovMX forwarding test. The account signup email, destination-verification status, GoDaddy deletion/cancellation confirmation, and Microsoft 365 effective service end date remain unconfirmed here.

Replace the paid GoDaddy Microsoft 365 mailbox for `admin@mistolar.net` with free inbound forwarding through ImprovMX. This document tracks preparation, DNS cutover, testing, rollback, and closeout.

Check off steps only after completing them. Update the status and date when progress changes, and record DNS changes and test results in the change log. Change-log entries describe the state at the time; use the current status and checklists to identify remaining work. Keep the personal forwarding destination, credentials, account details, and private billing information outside this public repository; private operational notes can stay in `mistolar-capture`.

## Current situation

The website and listed public DNS records were checked on 2026-10-02. Renewal and email-preservation details were supplied by the owner on that date; subscription deletion and continued forwarding were reported on 2026-10-03. Existing forwarding and sending habits are carried forward from the handoff; account settings have not been inspected.

- Domain: `mistolar.net`.
- DNS host and registrar: GoDaddy.
- Website: GitHub Pages at <https://mistolar.net>.
- Published email address: `admin@mistolar.net`.
- The GoDaddy Microsoft 365 renewal was due on **2026-10-10 at $60/year**, as confirmed by the owner. On **2026-10-03**, the owner reported deleting the subscription, before the planned deadline. Retain the GoDaddy confirmation and verify that no renewal charge is scheduled; the effective service end date and billing status have not been inspected here.
- The original Microsoft 365 setup forwarded `admin@mistolar.net` to the personal destination address. The same forwarding alias is configured in ImprovMX. On 2026-10-02, the owner sent a test from another email account to `admin@mistolar.net` and received it shortly afterward in the personal inbox; the owner subsequently opened ImprovMX Logs and found no entries under the displayed filters. Received-message headers subsequently confirmed that this first test used the old Microsoft 365 route. After waiting about two hours, the owner sent another test; the ImprovMX log confirms it was received and delivered to the destination mail server at 20:25:03 PDT. The owner confirmed this fresh test arrived in the personal inbox, verifying delivery through ImprovMX end to end. On 2026-10-03, the owner confirmed another successful forwarding test after reporting subscription deletion.
- No messages are sent or replies made from `admin@mistolar.net`.
- The owner confirmed on 2026-10-02 that old emails have been preserved and the email-preservation step is complete. No message import into ImprovMX is needed.
- Only inbound forwarding is needed from the new provider: no mailbox storage, outbound SMTP, calendar, contacts, or migration/import of existing messages into ImprovMX.

The website and email are independent. Do not change any GitHub Pages website records during this email migration. The published contact address remains `admin@mistolar.net`.

### Website email dependency

On 2026-10-02, both the repository and the live website published `mailto:admin@mistolar.net` in these pages:

- `index.html` (homepage): contributions of photos, histories, accounts, and journals.
- `Histories.html`: the same contribution contact.
- `Comments.html`: questions, feedback, and problem reports.
- `News.html`: requests for a DVD copy of a video.

No contact form or SMTP integration was found in the repository. These links open the visitor's email client; website contact-address edits are unnecessary while `admin@mistolar.net` is retained. Recheck these four links after cutover.

## ImprovMX Free plan

The public pricing and forwarding documentation checked on 2026-10-02 support these features:

- One custom domain.
- 25 forwarding aliases.
- Up to 500 forwarded messages per day.
- Seven-day email delivery logs.
- Standard email/chat support.
- No mailbox storage or outbound SMTP.
- No requirement to change GoDaddy nameservers.

These public details were verified on 2026-10-02. The owner reports a Free account, and its recommended DNS values have been recorded from the setup screenshot below. The dashboard reports Active and both required MX records and SPF are confirmed. The first inbox delivery test on 2026-10-02 used the old Microsoft 365 route. A later test is verified in ImprovMX Logs as delivered to the destination mail server; the owner also confirmed its receipt in the personal inbox. Additional outside-account testing and observation remain pending.

References:

- [ImprovMX pricing and free-plan details](https://improvmx.com/pricing/)
- [ImprovMX GoDaddy DNS setup guide](https://improvmx.com/guides/godaddy/)
- [ImprovMX forwarding and SMTP distinction](https://improvmx.com/guides/forwarding-vs-smtp/)
- [ImprovMX account signup email guidance](https://improvmx.com/guides/using-same-domain-email/)
- [ImprovMX viewing MX and SPF records](https://improvmx.com/guides/mx-spf-records/)
- [GoDaddy subscription cancellation instructions](https://www.godaddy.com/help/cancel-a-subscription-for-my-godaddy-product-20008)
- [GoDaddy immediate product deletion instructions](https://www.godaddy.com/help/delete-products-in-my-godaddy-account-7468)

## DNS baseline and backups

Before cutover, the following mail records matched the saved handoff and the August backup in public DNS on 2026-10-02. The pre-cutover MX and apex TXT records had a TTL of **3,600 seconds (one hour)**. They are preserved here as the rollback baseline, not the current mail routing:

```text
MX  @  priority 0  mistolar-net.mail.protection.outlook.com

TXT @  "NETORGFT11252502.onmicrosoft.com"
TXT @  "v=spf1 include:secureserver.net -all"

CNAME autodiscover  autodiscover.outlook.com
```

### Mail record inventory for later review

This inventory was taken from the **2026-08-07 zone export** and confirmed against the fresh pre-cutover export supplied on **2026-10-02**. All exported record lines match the August baseline. Retain them during cutover, and confirm they are unused before removing any of them.

| Type | Host as exported | Value | Priority / weight / port |
| --- | --- | --- | --- |
| TXT | `@` | `NETORGFT11252502.onmicrosoft.com` | N/A |
| CNAME | `autodiscover` | `autodiscover.outlook.com` | N/A |
| CNAME | `e` | `email.secureserver.net` | N/A |
| CNAME | `email` | `email.secureserver.net` | N/A |
| CNAME | `imap` | `imap.secureserver.net` | N/A |
| CNAME | `lyncdiscover` | `webdir.online.lync.com` | N/A |
| CNAME | `mail` | `pop.secureserver.net` | N/A |
| CNAME | `mobilemail` | `mobilemail-v01.prod.mesa1.secureserver.net` | N/A |
| CNAME | `msoid` | `clientconfig.microsoftonline-p.net` | N/A |
| CNAME | `pda` | `mobilemail-v01.prod.mesa1.secureserver.net` | N/A |
| CNAME | `pop` | `pop.secureserver.net` | N/A |
| CNAME | `sip` | `sipdir.online.lync.com` | N/A |
| CNAME | `smtp` | `smtp.secureserver.net` | N/A |
| CNAME | `webmail` | `webmail.secureserver.net` | N/A |
| SRV | `_sip._tls.@` | `sipdir.online.lync.com` | `100 / 1 / 443` |
| SRV | `_sipfederationtls._tcp.@` | `sipfed.online.lync.com` | `100 / 1 / 5061` |

Check the SRV host spelling against the GoDaddy dashboard; the table preserves the export's spelling. This inventory is a review list, not approval to delete every listed record.

The post-website-migration backup is stored locally at:

```text
~/repos/mistolar-capture/dns/mistolar.net-post-migration-2026-08-07.txt
```

Backup references:

| Backup | Local path | Status |
| --- | --- | --- |
| Post-website migration | `~/repos/mistolar-capture/dns/mistolar.net-post-migration-2026-08-07.txt` | Existence and contents checked 2026-10-02; listed live records match |
| Immediately before email cutover | `/home/ricky/repos/mistolar-capture/dns/mistolar.net-pre-email-cutover-2026-10-02.txt` | Export supplied and archived 2026-10-02; 30 records including SOA; record lines match the August backup |
| Final email migration | To be recorded | Pending |

Keep zone exports in `mistolar-capture`; record their paths here.

## Records that must not be changed

Preserve all website and infrastructure records, especially:

```text
A @ 185.199.108.153
A @ 185.199.109.153
A @ 185.199.110.153
A @ 185.199.111.153

CNAME www mistolar-net.github.io
A forum 192.169.209.100

NS @ ns45.domaincontrol.com
NS @ ns46.domaincontrol.com
TXT _github-pages-challenge-mistolar-net "78d6dad5fac1fdf2e5dd43ae4f9f33"
CNAME _domainconnect _domainconnect.gd.domaincontrol.com
```

Also preserve:

- The GoDaddy nameservers, GitHub Pages verification TXT, and `_domainconnect` records shown above, all checked in public DNS on 2026-10-02.
- The `ftp` CNAME pointing to `@`, confirmed in both the August and fresh pre-cutover exports; it is outside the email cleanup scope.
- All unrelated DNS records.

Only `mistolar.net` email is in scope. Do not change email records for these seven alias domains:

- `mistolar.com`
- `mistolar.org`
- `nivacle.com`
- `nivacle.net`
- `nivacle.org`
- `laabundancia.net`
- `laabundancia.org`

These names correspond to the separate DNS backups in `mistolar-capture/dns`; their current email settings have not been audited for this migration.

## Preparation checklist

- [x] Record the owner-confirmed renewal deadline and price: 2026-10-10, $60/year (confirmed 2026-10-02).
- [ ] Confirm the next charge date/time, automatic-renewal status, subscription scope, and service end date in GoDaddy; retain private account details outside this repo.
- [x] Plan cutover early enough to allow DNS propagation, delivery testing, and several days of observation before cancelling renewal ahead of October 10 (cutover and the first verified ImprovMX delivery test completed on 2026-10-02; observation and cancellation remain pending).
- [x] Save all important emails from Microsoft 365 and verify the saved copies can be opened before cancelling (step reported complete by the owner on 2026-10-02). No message import into ImprovMX is needed.
- [x] Check ImprovMX public Free-plan details against the inbound-forwarding requirements (2026-10-02).
- [x] Create a free ImprovMX account (reported complete by the owner on 2026-10-02).
- [ ] Confirm the ImprovMX account email is the personal address on another domain, rather than `admin@mistolar.net`; keep the actual address private.
- [x] Add `mistolar.net` (confirmed by the owner and dashboard screenshot on 2026-10-02).
- [x] Create an alias named `admin` that forwards to the personal email address (confirmed by the owner and dashboard screenshot on 2026-10-02).
- [ ] Verify the destination address if ImprovMX requests it.
- [x] Record the exact MX and SPF values shown in the ImprovMX dashboard below (setup screenshot reviewed 2026-10-02).
- [x] Review those values before changing GoDaddy DNS (2026-10-02: MX targets match the generic guide; dashboard SPF preserves the existing GoDaddy include and uses `-all`).
- [x] Export the current GoDaddy zone before cutover and record the backup path above; confirm the original MX and SPF values for rollback (2026-10-02: export archived and compared with the August baseline).

### Dashboard values to use at cutover

| Record | Host | Priority | Dashboard value | Date checked |
| --- | --- | --- | --- | --- |
| MX | `@` | 10 | `mx1.improvmx.com.` | 2026-10-02 |
| MX | `@` | 20 | `mx2.improvmx.com.` | 2026-10-02 |
| SPF TXT | `@` | N/A | `v=spf1 include:secureserver.net include:spf.improvmx.com -all` | 2026-10-02 |

The setup screenshot identifies GoDaddy **nameservers**, which identifies the DNS host rather than independently proving registrar ownership. The initial setup screenshot reported the Microsoft MX and GoDaddy SPF as incorrect for ImprovMX. The latest screenshot shows Active with green checks for both required MX records and SPF; public DNS matches. See the observed cutover status below.

Use the dashboard SPF in the table for this cutover. It differs from the generic guide: it retains `include:secureserver.net`, adds `include:spf.improvmx.com`, and keeps the existing `-all` ending. Replace the single existing SPF TXT value; do not add a second SPF record. Retaining the GoDaddy SPF include does not route incoming mail to Microsoft; incoming routing is controlled by MX.

See [ImprovMX combining SPF records](https://improvmx.com/guides/combining-spf-records/) for the single-record requirement.

The ImprovMX GoDaddy guide checked on 2026-10-02 gives these **generic reference values**, superseded for this cutover by the dashboard table above:

```text
MX  @  priority 10  mx1.improvmx.com
MX  @  priority 20  mx2.improvmx.com

TXT @  "v=spf1 include:spf.improvmx.com ~all"
```

The dashboard values above take precedence over this generic example. If the dashboard recommendations change before cutover, review them and update the table before applying them.

### Cutover timing

The pre-cutover MX/SPF TTL was 3,600 seconds. The observed post-change MX and SPF TTL is 1,800 seconds. ImprovMX's GoDaddy guide recommends a TTL of **1,800 seconds (30 minutes)** for its new MX/SPF records. Record the actual TTL selected at cutover. Changing the TTL at cutover does not shorten the lifetime of records already cached with the old TTL.

Allow for the old one-hour cache lifetime and for propagation that the guide says can take up to 24–48 hours. Keep Microsoft 365 and its existing forwarding operational during propagation, testing, and observation; senders with cached MX records may still deliver there. Begin early enough to finish cancellation before the October 10 renewal deadline.

### Observed cutover status on 2026-10-02

After the owner corrected the MX configuration, the latest ImprovMX screenshot shows **Active** and green checks for both MX records and SPF. Both Google and Cloudflare public DNS checks confirm:

```text
MX  @  priority 10  mx1.improvmx.com.  TTL 1800
MX  @  priority 20  mx2.improvmx.com.  TTL 1800
TXT @  "v=spf1 include:secureserver.net include:spf.improvmx.com -all"  TTL 1800
```

The Microsoft MX is absent and only one SPF record is returned. MX cutover, SPF replacement, and public MX/SPF verification are complete. Earlier MX configuration issues and their correction are preserved in the change log.

Public checks during cutover also confirmed the four GitHub Pages A values, `www`, `forum`, nameservers, GitHub verification TXT, `_domainconnect`, Microsoft tenant TXT, and autodiscover target are retained. Other mail records, unrelated records, and excluded domains have not all been rechecked after cutover. Exact cutover time has not been recorded. The owner reported one successful inbox delivery test on 2026-10-02 through the old Microsoft route. A subsequent ImprovMX log confirms receipt and delivery of a fresh test to the destination mail server. The owner confirmed inbox receipt of that fresh test. Additional outside-account testing remains pending.

## DNS cutover checklist and precautions

- [x] Replace the Microsoft 365 MX record with the reviewed ImprovMX MX records (2026-10-02: Google and Cloudflare return only `10 mx1.improvmx.com` and `20 mx2.improvmx.com`; Microsoft MX is absent).
- [x] Replace the existing SPF TXT record with `v=spf1 include:secureserver.net include:spf.improvmx.com -all`, as reviewed from the dashboard. A single SPF record was confirmed through Google and Cloudflare on 2026-10-02.
- [ ] Confirm the Microsoft tenant TXT, autodiscover CNAME, and other Microsoft mail records are initially retained. Remove them only after forwarding has been proven reliable.
- [ ] Confirm website, infrastructure, nameserver, verification, unrelated, and alias-domain records are preserved.
- [ ] Record the cutover date/time, exact changes, selected TTL, and backup path in the change log.

Microsoft 365 subscription deletion was reported on 2026-10-03, after old emails were preserved and ImprovMX forwarding was verified. A subsequent test still succeeded. Continue observation and closeout; do not restore the old Microsoft MX to a service that may no longer operate.

## Testing and closeout checklist

- [x] Wait for ImprovMX to report that forwarding is active (latest owner screenshot on 2026-10-02 shows Active and all MX/SPF rows green; the first inbox delivery test subsequently succeeded).
- [x] Confirm the public MX and SPF records match the reviewed values (2026-10-02: both Google and Cloudflare checks match; TTL 1800).
- [ ] Send test messages to `admin@mistolar.net` from multiple outside accounts (one outside account has now tested the ImprovMX route on 2026-10-02; another remains pending).
- [x] Confirm delivery to the personal destination inbox through ImprovMX (2026-10-02: the owner confirmed inbox receipt of the fresh test whose ImprovMX log shows delivery at 20:25:03 PDT).
- [x] Review the ImprovMX delivery logs and confirm the test passed through ImprovMX (2026-10-02: fresh outside-account test entered the queue at 20:25:00 PDT and shows DELIVERED at 20:25:03 PDT).
- [x] Record completed test dates and results below without publishing private addresses or message contents; add subsequent results as testing and observation continue.
- [ ] Recheck the four website contact links listed above and confirm they still address `admin@mistolar.net`.
- [ ] Observe forwarding for several days and record the observation period (verified ImprovMX test on 2026-10-02 and owner-reported successful test after subscription deletion on 2026-10-03; several-day observation is not yet complete).
- [x] Confirm all important Microsoft 365 emails have been saved and the saved copies verified before cancelling (step reported complete by the owner on 2026-10-02).
- [x] Cancel/delete the GoDaddy Microsoft 365 email subscription before the 2026-10-10 renewal (owner reported subscription deletion on 2026-10-03, after the first verified ImprovMX test; several-day observation remains incomplete).
- [ ] Retain the GoDaddy deletion/cancellation confirmation, record the effective service end date, and confirm that the $60/year renewal will not be charged (subscription deletion reported by the owner on 2026-10-03; confirmation and billing status have not been inspected here).
- [ ] Confirm the `mistolar.net` domain registration and DNS hosting remain active and unchanged.
- [ ] Later compare the mail record inventory with the fresh zone export and remove only records confirmed obsolete, recording exactly which records were removed.
- [ ] Export another GoDaddy zone file as the final email-migration backup and record its path above.
- [ ] Update this document's status to complete once all required work is finished.

### GoDaddy cancellation procedure

The owner reported deleting the subscription on 2026-10-03. The procedure below is retained as reference; the exact action selected in GoDaddy and the effective service end date have not been reviewed.

The public GoDaddy instructions checked on 2026-10-02 describe **Renewals and Billing → Manage Subscriptions → select the Microsoft 365 product → Cancel Plan → Continue to Cancel → Confirm Cancel**. Verify that the selected subscription contains only the email service intended for cancellation, without domain registration, DNS hosting, or other services that must be preserved.

Before confirming, read and record the displayed service end date. This procedure stops renewal while allowing use until that date. Immediate product deletion is a separate action and can end access immediately; it is not required to avoid the October 10 renewal charge.

Scheduling cancellation does not mean the email service has already ended. Keep its effective end date separate from the cancellation request date so the available rollback period is clear.

### Test results

The initial Microsoft-route test and subsequent verified ImprovMX test are recorded below. Add one row per subsequent test or observation.

| Date | Test or observation | Result | Follow-up |
| --- | --- | --- | --- |
| 2026-10-02 | Owner sent a message from another email account to `admin@mistolar.net`. | Owner confirmed receipt shortly afterward in the personal email account. | Received-message headers confirm Gmail delivered directly to Microsoft, which then forwarded to the personal inbox. This test used the old Microsoft 365 route and does not verify ImprovMX. The subsequent test below confirms delivery through ImprovMX. Private addresses and message contents are omitted. |
| 2026-10-02, 20:25:00–20:25:03 PDT | Fresh outside-account test after the owner waited about two hours. | ImprovMX Logs show incoming delivery from Gmail to `mx1.improvmx.com`, then DELIVERED to the personal destination mail server in three seconds. | ImprovMX route, destination-server acceptance, and personal inbox receipt confirmed by log evidence and the owner. Continue remaining tests and observation. Private sender/destination addresses and subject are omitted. |
| 2026-10-03 | Owner tested forwarding after reporting deletion of the GoDaddy Microsoft 365 subscription. | Owner confirmed ImprovMX forwarding continues to work. | Continued operation recorded. Sender account, exact test time, and new log/header evidence were not supplied; do not count this as a confirmed second outside account. Continue observation and closeout. |

### Log visibility follow-up

On 2026-10-02, the owner supplied a Logs screenshot showing no entries, a date range of **2026-09-25 through 2026-10-02**, blank keyword/address fields, and All status/type filters. At review time it was October 2 in Pacific time but **2026-10-03 01:32 UTC**. At that time, the owner confirmed that **October 2 was the latest date the picker allowed**, so the suggested extension to October 3 was unavailable. A subsequent test appears in Logs under the same date range and its timestamps are displayed in PDT. There is no evidence that a date-filter problem caused the first test to be absent.

The received-message headers now establish the route of the first test. The owner's additional screenshots show `mail-pj2-x0f.google.com` delivering directly to `CO1PEPF00012E63.mail.protection.outlook.com` at **2026-10-03 01:28:50 UTC**, for `admin@mistolar.net`. Subsequent headers show Microsoft internal processing and outbound delivery from `PH0PR06CU001.outbound.protection.outlook.com` (`40.107.208.76`) to the personal inbox at **01:28:56–57 UTC**. These are October 2 in Pacific time. Together, the supplied headers confirm the old Microsoft 365 forwarding route for this message and explain why it has no ImprovMX delivery-log entry. The cause of the old routing is not proven; cached pre-cutover MX records are a plausible explanation.

After waiting about two hours, the owner supplied a new ImprovMX Logs screenshot. At **2026-10-02 20:25:00 PDT**, Gmail delivered the fresh test to `mx1.improvmx.com`. At **20:25:03 PDT**, `mail13.mxsw1.infra.improvmx.com` forwarded it to `hotmail-com.olc.protection.outlook.com`, and the log reports **DELIVERED +3.0 seconds** with a successful SMTP response. This verifies public incoming routing through ImprovMX and acceptance by the destination mail server. The owner subsequently confirmed that this message arrived in the personal inbox. Log/route verification and the first end-to-end ImprovMX delivery test are complete. Continue the remaining outside-account testing and several-day observation. The owner subsequently reported subscription deletion on 2026-10-03 and another successful forwarding test. The delay is consistent with cached old MX records expiring, though that cache explanation is not independently proven.

For any further header inspection, the owner's Outlook menu contains **View → View message source**. Examine `Received:` blocks and skip long `ARC-` signature sections. Microsoft entries alone do not establish the old route because the personal destination also uses Microsoft; the direct Gmail-to-Microsoft hop for `admin@mistolar.net` is the decisive evidence in this test. See [Microsoft message-header instructions](https://support.microsoft.com/en-us/outlook/view-internet-message-headers-in-outlook).

## Rollback

**Current status:** The owner reported deleting the Microsoft 365 subscription on 2026-10-03. Do not assume the old mailbox or forwarding service remains available. Restoring its DNS records alone cannot reactivate a deleted service.

The historical rollback instructions below applied while Microsoft 365 was still operational, including any remaining paid period after renewal cancellation was scheduled. Use them only if the old service is independently confirmed operational; otherwise retain them solely as a record of the original DNS values. The immediate pre-cutover backup is the rollback baseline.

The original values reported in the handoff are:

```text
MX  @  priority 0  mistolar-net.mail.protection.outlook.com
TXT @  "v=spf1 include:secureserver.net -all"
```

For rollback, remove the ImprovMX MX records, restore the original Microsoft MX, and replace the ImprovMX SPF with the original SPF; retain a single SPF record. Confirm public DNS and test delivery through Microsoft 365. Preserve all unrelated records and record the rollback and results in the change log.

Rollback remains available only while Microsoft 365 service actually operates. Do not rely on it after the effective service end date or immediate deletion; restoring DNS alone does not reactivate an ended service.

## Change log

| Date | Change or decision | Evidence or follow-up |
| --- | --- | --- |
| 2026-10-02 | Saved the migration handoff as a repository checklist. | All migration steps remain pending. Provider details, DNS, backup contents, and renewal date require verification before cutover. |
| 2026-10-02 | Reviewed the repository, live website, public DNS, August zone export, and provider documentation. | Listed DNS and website contact records match the handoff. Added dated verification, excluded domains, nameservers, mail-record inventory, signup guidance, cutover timing, and cancellation/rollback clarification. Dashboard values and fresh zone export remain pending. |
| 2026-10-02 | Owner confirmed Microsoft 365 renewal on October 10 at $60/year and requested cancellation before then. | Save and verify all important emails before cancellation; no message migration into the new provider. Account renewal settings and service end date remain pending. Attachment and additional sender-test changes from review point 7 are deferred at the owner's request. |
| 2026-10-02 | Owner confirmed old emails are preserved and the email-preservation step is complete. | Marked preservation complete in the status and both checklist entries. No message import into ImprovMX is needed. |
| 2026-10-02 | Owner created a free ImprovMX account and reached the domain-entry step. | Account creation is complete. Enter `mistolar.net` as the domain; domain addition and the `admin` forwarding alias remain pending. Account email has not been confirmed here. |
| 2026-10-02 | Owner added `mistolar.net` and configured `admin` forwarding to the personal inbox. | Dashboard screenshot confirms the domain and alias, and also shows a `*` catch-all alias. Red Setup indicator is present; DNS setup and actual forwarding activation remain pending. Personal destination address is omitted from this public document. |
| 2026-10-02 | Reviewed the ImprovMX DNS Setup screenshot and recorded both MX records and the recommended SPF. | GoDaddy nameservers detected. Dashboard SPF is `v=spf1 include:secureserver.net include:spf.improvmx.com -all`, which takes precedence over the generic guide. Microsoft MX and the old SPF are still reported in use; fresh zone export, DNS cutover, and activation remain pending. |
| 2026-10-02 | Archived the fresh GoDaddy pre-email-cutover zone export supplied from Windows Downloads. | Saved at `/home/ricky/repos/mistolar-capture/dns/mistolar.net-pre-email-cutover-2026-10-02.txt`; copy verified byte-for-byte. All 30 exported record lines (including SOA) match the August baseline. Original Microsoft MX, SPF, and protected website/infrastructure records confirmed. DNS cutover remains pending. |
| 2026-10-02 | Owner changed mail DNS and ImprovMX now reports Active; screenshots and public DNS were reviewed. | SPF matches the dashboard with TTL 1800. Google and Cloudflare return only `20 mx1.improvmx.com`; change it to priority 10 and add `20 mx2.improvmx.com` before completing MX verification. Listed protected DNS values are retained. Inbox testing and cancellation remain pending. |
| 2026-10-02 | Owner corrected the MX configuration; the latest ImprovMX screenshot shows Active with all MX/SPF rows green. | Google and Cloudflare both confirm `10 mx1.improvmx.com`, `20 mx2.improvmx.com`, and the reviewed single SPF record, all with TTL 1800. Microsoft MX is absent. MX cutover and public MX/SPF verification are complete; inbox delivery tests, observation, and cancellation remain pending. |
| 2026-10-02 | Owner confirmed the first outside-account message to `admin@mistolar.net` arrived shortly afterward in the personal inbox. | Recorded the successful test and marked inbox delivery confirmed. Additional outside-account testing, ImprovMX delivery-log review, observation, and GoDaddy subscription cancellation remain pending. |
| 2026-10-02 | Owner opened the ImprovMX Logs tab and found no entries under the displayed filters. | Screenshot end date is October 2 while review time is already October 3 UTC. Widen the end date through October 3 and refresh; timezone mismatch is unconfirmed. If still empty, check received-message headers. Inbox delivery is confirmed, but passage through ImprovMX remains unverified. |
| 2026-10-02 | Owner confirmed the Logs date picker will not allow an end date later than October 2. | The suggested October 3 workaround is unavailable. Leave the date at October 2 and inspect the received test message headers in Outlook/Hotmail to establish the forwarding route. Log/route verification remains pending. |
| 2026-10-02 | Owner supplied an Outlook desktop screenshot while locating message headers. | The open View submenu contains View message source; use that option to obtain the received message headers. No headers have been reviewed yet. |
| 2026-10-02 | Reviewed partial received-message headers from the first delivery test. | Microsoft outbound server and `smtp.mailfrom=mistolar.net` suggest the old forwarding route; no ImprovMX hop is visible in these sections. Earlier hops or an ImprovMX log entry from a fresh test are needed to verify the new route. |
| 2026-10-02 | Earlier received-message headers confirm the first test used Microsoft 365 forwarding. | Gmail delivered directly to Microsoft for `admin@mistolar.net` at 01:28:50 UTC on October 3 (October 2 locally), followed by Microsoft outbound forwarding. Empty ImprovMX logs are consistent with this route. Allow the old MX cache lifetime and send a fresh outside-account test; ImprovMX delivery remains unverified. |
| 2026-10-02 | Fresh test is verified in ImprovMX Logs after about two hours of waiting. | Queue entry at 20:25:00 PDT and DELIVERED at 20:25:03 PDT confirm the ImprovMX route and destination-server acceptance. Marked log verification complete; fresh-test inbox confirmation, additional outside-account testing, observation, and subscription cancellation remain pending. |
| 2026-10-02 | Owner confirmed personal inbox receipt of the test verified in ImprovMX Logs. | The first end-to-end ImprovMX delivery test is complete; marked inbox confirmation complete. Additional outside-account testing, several-day observation, and GoDaddy Microsoft 365 renewal cancellation remain pending. |
| 2026-10-03 | Owner reported deleting the GoDaddy Microsoft 365 subscription and confirmed forwarding still works in a subsequent test. | Marked subscription cancellation/deletion complete as owner-reported. Retain the GoDaddy confirmation and verify billing/service end details. Removed reliance on Microsoft 365 rollback; observation, remaining testing, obsolete DNS cleanup, and final zone export remain pending. |
