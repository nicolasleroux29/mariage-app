import { resend } from './resend'

const FROM = process.env.RESEND_FROM!
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

type RsvpData = {
  eglise: boolean | null
  vinHonneur: boolean | null
  repas: boolean | null
  retourNoce: boolean | null
  enfants: boolean | null
  nbEnfants: number | null
  allergies: string | null
}

function oui(v: boolean | null) {
  return v ? 'Oui' : v === false ? 'Non' : '—'
}

function confirmationHtml(prenom: string, nom: string, token: string, rsvp: RsvpData) {
  const rsvpUrl = `${BASE_URL}/rsvp/${token}`
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /></head>
<body style="font-family:sans-serif;color:#374151;max-width:560px;margin:auto;padding:32px 16px">
  <h1 style="font-size:24px;font-weight:300;color:#374151;margin-bottom:4px">Yann &amp; Judith</h1>
  <p style="color:#f9a8d4;font-size:13px;margin-top:0;margin-bottom:32px">19 juin 2027</p>

  <p>Bonjour ${prenom},</p>
  <p>Nous avons bien reçu votre réponse. Merci !</p>

  <table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:14px">
    <tr style="background:#fdf2f8">
      <td style="padding:10px 14px;color:#6b7280">Cérémonie religieuse</td>
      <td style="padding:10px 14px;font-weight:500">${oui(rsvp.eglise)}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;color:#6b7280">Vin d'honneur</td>
      <td style="padding:10px 14px;font-weight:500">${oui(rsvp.vinHonneur)}</td>
    </tr>
    <tr style="background:#fdf2f8">
      <td style="padding:10px 14px;color:#6b7280">Dîner de gala</td>
      <td style="padding:10px 14px;font-weight:500">${oui(rsvp.repas)}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;color:#6b7280">Retour de noce</td>
      <td style="padding:10px 14px;font-weight:500">${oui(rsvp.retourNoce)}</td>
    </tr>
    <tr style="background:#fdf2f8">
      <td style="padding:10px 14px;color:#6b7280">Enfants</td>
      <td style="padding:10px 14px;font-weight:500">
        ${oui(rsvp.enfants)}${rsvp.enfants && rsvp.nbEnfants ? ` (${rsvp.nbEnfants})` : ''}
      </td>
    </tr>
    ${rsvp.allergies ? `
    <tr>
      <td style="padding:10px 14px;color:#6b7280">Allergies</td>
      <td style="padding:10px 14px;font-weight:500">${rsvp.allergies}</td>
    </tr>` : ''}
  </table>

  <p style="font-size:14px;color:#6b7280">
    Vous pouvez modifier votre réponse à tout moment via ce lien :
    <br />
    <a href="${rsvpUrl}" style="color:#f472b6">${rsvpUrl}</a>
  </p>

  <hr style="border:none;border-top:1px solid #fce7f3;margin:32px 0" />
  <p style="font-size:13px;color:#9ca3af">Avec impatience de vous retrouver — Yann &amp; Judith</p>
</body>
</html>`
}

function notificationHtml(prenom: string, nom: string, rsvp: RsvpData, isUpdate: boolean) {
  const dashboardUrl = `${BASE_URL}/dashboard`
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /></head>
<body style="font-family:sans-serif;color:#374151;max-width:560px;margin:auto;padding:32px 16px">
  <h2 style="font-size:18px;font-weight:500;margin-bottom:4px">
    ${isUpdate ? 'RSVP modifié' : 'Nouveau RSVP'} — ${prenom} ${nom}
  </h2>
  <p style="color:#9ca3af;font-size:13px;margin-top:0;margin-bottom:24px">
    ${isUpdate ? 'Cet invité a mis à jour sa réponse.' : 'Un nouvel invité vient de répondre.'}
  </p>

  <table style="width:100%;border-collapse:collapse;font-size:14px">
    <tr style="background:#fdf2f8">
      <td style="padding:10px 14px;color:#6b7280">Cérémonie religieuse</td>
      <td style="padding:10px 14px;font-weight:500">${oui(rsvp.eglise)}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;color:#6b7280">Vin d'honneur</td>
      <td style="padding:10px 14px;font-weight:500">${oui(rsvp.vinHonneur)}</td>
    </tr>
    <tr style="background:#fdf2f8">
      <td style="padding:10px 14px;color:#6b7280">Dîner de gala</td>
      <td style="padding:10px 14px;font-weight:500">${oui(rsvp.repas)}</td>
    </tr>
    <tr>
      <td style="padding:10px 14px;color:#6b7280">Retour de noce</td>
      <td style="padding:10px 14px;font-weight:500">${oui(rsvp.retourNoce)}</td>
    </tr>
    <tr style="background:#fdf2f8">
      <td style="padding:10px 14px;color:#6b7280">Enfants</td>
      <td style="padding:10px 14px;font-weight:500">
        ${oui(rsvp.enfants)}${rsvp.enfants && rsvp.nbEnfants ? ` (${rsvp.nbEnfants})` : ''}
      </td>
    </tr>
    ${rsvp.allergies ? `
    <tr>
      <td style="padding:10px 14px;color:#6b7280">Allergies</td>
      <td style="padding:10px 14px;font-weight:500">${rsvp.allergies}</td>
    </tr>` : ''}
  </table>

  <p style="margin-top:24px">
    <a href="${dashboardUrl}" style="background:#f472b6;color:white;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px">
      Voir le dashboard →
    </a>
  </p>
</body>
</html>`
}

export async function sendRsvpConfirmation(
  invite: { prenom: string; nom: string; email: string; token: string },
  rsvp: RsvpData
) {
  await resend.emails.send({
    from: FROM,
    to: invite.email,
    subject: 'Yann & Judith — Confirmation de votre réponse',
    html: confirmationHtml(invite.prenom, invite.nom, invite.token, rsvp),
  })
}

export async function sendRsvpNotification(
  invite: { prenom: string; nom: string },
  rsvp: RsvpData,
  isUpdate: boolean
) {
  await resend.emails.send({
    from: FROM,
    to: process.env.ADMIN_EMAIL!,
    subject: `${isUpdate ? 'RSVP modifié' : 'Nouveau RSVP'} — ${invite.prenom} ${invite.nom}`,
    html: notificationHtml(invite.prenom, invite.nom, rsvp, isUpdate),
  })
}
